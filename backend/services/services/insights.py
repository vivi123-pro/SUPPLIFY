import json
from datetime import datetime
from dateutil.relativedelta import relativedelta
from django.db.models import Sum, F, ExpressionWrapper, DecimalField
from langchain_google_genai import ChatGoogleGenerativeAI

from waste.models import WasteListing, WasteOffer
from orders.models import Order
from suppliers.models import Supplier, Product

# Helper: compute supplier metrics
def collect_supplier_metrics(user):
    now = datetime.utcnow()
    start_current = (now.replace(day=1)).date()   # start of current month
    start_prev = (start_current - relativedelta(months=1))
    end_prev = start_current

    # Waste earnings this month vs last month (sum of sold listings or offers)
    waste_current = WasteOffer.objects.filter(
        listing__owner=user,
        listing__status="sold",
        created_at__date__gte=start_current
    ).aggregate(total=Sum("price"))["total"] or 0

    waste_prev = WasteOffer.objects.filter(
        listing__owner=user,
        listing__status="sold",
        created_at__date__gte=start_prev,
        created_at__date__lt=end_prev
    ).aggregate(total=Sum("price"))["total"] or 0

    # Active waste listings
    active_listings = WasteListing.objects.filter(owner=user, status="available").count()

    # Top waste categories by qty (all-time or limit to month)
    top_categories_qs = WasteListing.objects.filter(owner=user).values("category").annotate(total_qty=Sum("qty")).order_by("-total_qty")[:5]
    top_categories = [{"category": r["category"], "qty": int(r["total_qty"] or 0)} for r in top_categories_qs]

    # Top buyers by spend on this user's listings (completed/sold)
    top_buyers_qs = WasteOffer.objects.filter(
        listing__owner=user,
        listing__status="sold"
    ).values("buyer__id", "buyer__email").annotate(total_spent=Sum("price")).order_by("-total_spent")[:5]
    top_buyers = [{"buyer_id": r["buyer__id"], "email": r["buyer__email"], "total_spent": float(r["total_spent"] or 0)} for r in top_buyers_qs]

    # Product revenue from completed orders for this supplier
    product_orders = Order.objects.filter(product__supplier__user=user, status="completed")
    revenue_expr = ExpressionWrapper(F("qty") * F("product__price"), output_field=DecimalField(max_digits=20, decimal_places=2))
    total_product_revenue = product_orders.aggregate(total=Sum(revenue_expr))["total"] or 0

    metrics = {
        "waste_earnings": {
            "current_month": float(waste_current),
            "previous_month": float(waste_prev),
        },
        "active_waste_listings_count": active_listings,
        "top_waste_categories": top_categories,
        "top_buyers": top_buyers,
        "total_product_revenue": float(total_product_revenue),
        "generated_at": now.isoformat(),
    }
    return metrics


# Humanize metrics via Gemini (LangChain adapter)
def generate_insights_with_gemini(metrics_dict, user_name=None, google_api_key=None, model="gemini-2.5-flash"):
    """
    Uses langchain_google_genai.ChatGoogleGenerativeAI to create short insights + recommendations.
    Returns dict: {"insights": [...], "recommendations": [...], "raw": "<llm output>"}
    """

    # Build system + human prompts
    system_prompt = (
        "You are Supplify Insights Assistant. Given raw numeric metrics about a supplier's sales and waste activity, "
        "produce a short, human-readable list of up to 4 *high-impact* insights and up to 4 concise recommendations (1 sentence each). "
        "Each insight should include a numeric highlight (e.g., 'You earned ₦50k this month from scrap'). "
        "Return output strictly as JSON with keys: insights (list of strings), recommendations (list of strings)."
    )

    human_prompt = (
        f"Supplier name: {user_name or 'Supplier'}.\n\n"
        f"Metrics JSON:\n{json.dumps(metrics_dict, indent=2)}\n\n"
        "Produce the JSON output now."
    )

    # instantiate the LangChain Gemini model wrapper
    # The constructor will read GOOGLE_API_KEY env var if google_api_key not passed
    llm = ChatGoogleGenerativeAI(model=model, google_api_key=google_api_key) if google_api_key else ChatGoogleGenerativeAI(model=model)

    # llm.invoke accepts a list of (role, text) tuples as shown in langchain docs
    try:
        resp = llm.invoke([
            ("system", system_prompt),
            ("human", human_prompt),
        ])
        llm_output = getattr(resp, "content", str(resp))
    except Exception as e:
        # If LLM call fails, return a simple fallback text
        llm_output = f"LLM generation failed: {str(e)}"

    # Try to parse JSON from LLM (recommended to force JSON in prompt)
    parsed = {}
    try:
        parsed = json.loads(llm_output)
        insights = parsed.get("insights", [])
        recommendations = parsed.get("recommendations", [])
    except Exception:
        # fallback: return raw text in single insight
        insights = [llm_output]
        recommendations = []

    return {"insights": insights, "recommendations": recommendations, "raw": llm_output}
