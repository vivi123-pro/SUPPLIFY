from rest_framework import serializers
from .models import ( 
    Review, Insight
)

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"
        read_only_fields = ["reviewer", "created_at"]
        
class InsightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Insight
        fields = ["id", "title", "body", "metadata", "created_at"]
        read_only_fields = ["id", "created_at"]