from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator
from decimal import Decimal

class User(AbstractUser):
    pass

class Info(models.Model):
    data = models.JSONField(null=True, default=dict)

class Stock(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE)
    name = models.CharField(max_length=100, default=None)
    symbol = models.CharField(max_length=50)
    market_exchange = models.CharField(max_length=50)
    currency = models.CharField(max_length=25, blank=True)
    activity = models.JSONField(null=True, default=list, blank=True)
    average_buy_price = models.DecimalField(max_digits=20, decimal_places=2, null=True, default=0)
    holding_units = models.PositiveIntegerField(null=True, default=0)
    timestamp = models.DateTimeField(auto_now_add=True, null=True)


