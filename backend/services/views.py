from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Review
from .serializers import ReviewSerializer
from core.models import Supplier, WasteListing, Product
from core.serializers import SupplierSerializer
from django.db.models import Sum
from django.core.files.storage import default_storage

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(reviewer=self.request.user)

class SupplierReviewViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def list(self, request, supplier_pk=None):
        reviews = Review.objects.filter(supplier_id=supplier_pk)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)


class DashboardSummary(APIView):
    def get(self, request):
        user = request.user
        total_savings = 0  # calculate as needed
        total_waste_earnings = WasteListing.objects.filter(owner=user, status="sold").aggregate(
            total=Sum("price")
        )["total"] or 0
        active_listings = WasteListing.objects.filter(owner=user, status="available").count()
        recent_activity = []  # optional, you can fetch latest orders/offers

        return Response({
            "total_savings": total_savings,
            "total_waste_earnings": total_waste_earnings,
            "active_listings": active_listings,
            "recent_activity": recent_activity
        })

class WasteTrends(APIView):
    def get(self, request):
        start = request.query_params.get("start")
        end = request.query_params.get("end")
        data = WasteListing.objects.filter(created_at__range=[start, end]).values("category").annotate(total_qty=Sum("qty"))
        return Response(data)
    
class SupplierSearch(APIView):
    def get(self, request):
        product_id = request.query_params.get("product_id")
        location = request.query_params.get("location")
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"detail": "Product not found"}, status=404)

        suppliers = Supplier.objects.filter(
            products__category=product.category,
            location__icontains=location
        ).distinct().order_by("rating")  # rank by rating
        serializer = SupplierSerializer(suppliers, many=True)
        return Response(serializer.data)
    
class PendingSuppliers(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        pending = Supplier.objects.filter(is_verified=False)
        return Response([{"id": s.id, "company_name": s.company_name} for s in pending])


class VerifySupplier(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        supplier_id = request.data.get("supplier_id")
        supplier = Supplier.objects.get(id=supplier_id)
        supplier.is_verified = True
        supplier.save()
        return Response({"status": "verified"})
    
class FileUploadView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        file_obj = request.FILES["file"]
        path = default_storage.save(f"uploads/{file_obj.name}", file_obj)
        url = default_storage.url(path)
        return Response({"url": url})