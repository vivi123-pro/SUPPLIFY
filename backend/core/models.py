# suppliers/models.py
from django.db import models
from django.conf import settings

class Supplier(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="supplier_profile")
    company_name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)  # e.g. "Plastics", "Metals"
    location = models.CharField(max_length=255)
    rating = models.FloatField(default=0.0)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.company_name


class Product(models.Model):
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE, related_name="products")
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    min_qty = models.PositiveIntegerField(default=1)
    location = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class WasteListing(models.Model):
    STATUS_CHOICES = (
        ("available", "Available"),
        ("sold", "Sold"),
    )

    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="waste_listings")
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    qty = models.PositiveIntegerField()
    location = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="available")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class WasteOffer(models.Model):
    listing = models.ForeignKey(WasteListing, on_delete=models.CASCADE, related_name="offers")
    buyer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    contact_info = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    
class Order(models.Model):
    STATUS_CHOICES = (
        ("pending", "Pending"),
        ("accepted", "Accepted"),
        ("rejected", "Rejected"),
        ("completed", "Completed"),
    )

    buyer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="orders")
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    waste = models.ForeignKey(WasteListing, on_delete=models.SET_NULL, null=True, blank=True)
    qty = models.PositiveIntegerField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)