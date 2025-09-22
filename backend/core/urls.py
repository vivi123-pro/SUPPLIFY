# suppliers/urls.py
from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import ( 
    SupplierViewSet, ProductViewSet,
    WasteListingViewSet, OrderViewSet,
    SupplierSearchView
)

router = DefaultRouter()
router.register(r"suppliers", SupplierViewSet, basename="supplier")
router.register(r"products", ProductViewSet, basename="product")
router.register(r"waste", WasteListingViewSet, basename="waste")
router.register(r"orders", OrderViewSet, basename="orders")


urlpatterns = router.urls + [
    path("search/suppliers/", SupplierSearchView.as_view(), name="search-suppliers"),
]