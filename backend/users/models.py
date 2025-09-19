from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ("sme", "SME"),
        ("supplier", "Supplier"),
        ("admin", "Admin"),
    )
    username = None  # remove username, we’ll use email
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="sme")
    
    groups = models.ManyToManyField(Group, related_name='user_groups')
    user_permissions = models.ManyToManyField(Permission, related_name='user_permissions')

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []  # email and password are required by default

    def __str__(self):
        return self.email
