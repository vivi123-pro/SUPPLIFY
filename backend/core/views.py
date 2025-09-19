# suppliers/views.py
from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import (
    Supplier, Product,
    WasteListing, Order,
)
from .serializers import (
    SupplierSerializer, ProductSerializer,
    WasteListingSerializer, WasteOfferSerializer,
    OrderSerializer, ProductComparisonSerializer
)

class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["category", "location", "rating"]
    search_fields = ["company_name", "category", "location"]
    ordering_fields = ["rating"]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
    @action(detail=True, methods=["get"])
    def products(self, request, pk=None):
        supplier = self.get_object()
        products = supplier.products.all()
        
         # Filter query params
        category = request.query_params.get("category")
        min_price = request.query_params.get("min_price")
        max_price = request.query_params.get("max_price")

        if category:
            products = products.filter(category__iexact=category)
        if min_price:
            products = products.filter(price__gte=min_price)
        if max_price:
            products = products.filter(price__lte=max_price)

        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

class SupplierSearchView(APIView):
    """
    GET /api/v1/search/suppliers/?product_name=xxx&location=yyy
    Returns suppliers offering the product, ranked by price + rating.
    """

    def get(self, request):
        product_name = request.query_params.get("product_name")
        location = request.query_params.get("location", "")

        if not product_name:
            return Response({"error": "product_name query param is required"}, status=400)

        products = Product.objects.filter(name__icontains=product_name)
        if location:
            products = products.filter(location__icontains=location)

        # Ranking: cheaper price + higher rating
        product_list = list(products)
        for p in product_list:
            # Simple scoring formula
            p.score = float(p.price) - (p.supplier.rating or 0) * 0.1  # tweak factor

        product_list.sort(key=lambda x: x.score)  # lower score = better deal

        serializer = ProductComparisonSerializer(product_list, many=True)
        return Response(serializer.data)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["category", "location", "price", "min_qty"]
    search_fields = ["name", "description"]

    def perform_create(self, serializer):
        supplier = self.request.user.supplier_profile
        serializer.save(supplier=supplier)

    @action(detail=True, methods=["get"])
    def compare(self, request, pk=None):
        """
        GET /api/v1/products/{product_id}/compare/?location=xxx
        Returns all suppliers offering this product, ranked by price & rating.
        """
        product = self.get_object()
        products = Product.objects.filter(name__iexact=product.name)

        location = request.query_params.get("location")
        if location:
            products = products.filter(location__icontains=location)

        # Ranking logic: cheaper price + higher rating
        product_list = list(products)
        for p in product_list:
            # Score formula: price - (rating * factor)
            p.score = float(p.price) - (p.supplier.rating or 0) * 0.1  # tweak factor as needed

        product_list.sort(key=lambda x: x.score)  # lowest score = best deal

        serializer = ProductComparisonSerializer(product_list, many=True)
        return Response(serializer.data)


class WasteListingViewSet(viewsets.ModelViewSet):
    queryset = WasteListing.objects.all()
    serializer_class = WasteListingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    # Express interest / bid
    @action(detail=True, methods=["post"])
    def offer(self, request, pk=None):
        listing = self.get_object()
        serializer = WasteOfferSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(buyer=request.user, listing=listing)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # Mark as sold
    @action(detail=True, methods=["post"])
    def mark_sold(self, request, pk=None):
        listing = self.get_object()
        if listing.owner != request.user:
            return Response({"detail": "Not authorized"}, status=status.HTTP_403_FORBIDDEN)
        listing.status = "sold"
        listing.save()
        return Response({"status": "sold"})

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(buyer=self.request.user)

    @action(detail=True, methods=["post"])
    def update_status(self, request, pk=None):
        order = self.get_object()
        status_update = request.data.get("status")
        if status_update not in ["accepted", "rejected", "completed"]:
            return Response({"detail": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST)
        order.status = status_update
        order.save()
        return Response(OrderSerializer(order).data)