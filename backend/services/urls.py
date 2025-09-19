from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import (
    ReviewViewSet, DashboardSummary,
    WasteTrends, SupplierSearch,
    PendingSuppliers, VerifySupplier,
    FileUploadView
)

router = DefaultRouter()
router.register(r"reviews", ReviewViewSet, basename="review")

urlpatterns = [
    path("dashboard/summary/", DashboardSummary.as_view()),
    path("analytics/waste-trends/", WasteTrends.as_view()),
    path("search/suppliers/", SupplierSearch.as_view()),
    path("admin/pending_suppliers/", PendingSuppliers.as_view()),
    path("admin/verify_supplier/", VerifySupplier.as_view()),
    path("uploads/", FileUploadView.as_view()),
]

urlpatterns += router.urls
