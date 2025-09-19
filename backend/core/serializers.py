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
