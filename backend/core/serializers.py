# suppliers/serializers.py
from rest_framework import serializers
from .models import ( 
    Supplier, Product, 
    WasteListing, WasteOffer,
    Order
)

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = "__all__"
        read_only_fields = ["is_verified", "rating", "user"]


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
        read_only_fields = ["supplier"]


class WasteListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = WasteListing
        fields = "__all__"
        read_only_fields = ["owner", "status", "created_at"]


class WasteOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = WasteOffer
        fields = "__all__"
        read_only_fields = ["buyer", "listing", "created_at"]


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"
        read_only_fields = ["buyer", "status", "created_at"]
        
class ProductComparisonSerializer(serializers.ModelSerializer):
    supplier_name = serializers.CharField(source='supplier.company_name', read_only=True)
    supplier_rating = serializers.FloatField(source='supplier.rating', read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'min_qty', 'location', 'supplier_name', 'supplier_rating']

