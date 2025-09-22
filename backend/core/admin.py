from django.contrib import admin

from .models import ( 
    Supplier, Product, 
    WasteListing, WasteOffer,
    Order
)
# Register your models here.
admin.site.register(Supplier)
admin.site.register(Product)
admin.site.register(WasteListing)
admin.site.register(WasteOffer)
admin.site.register(Order)