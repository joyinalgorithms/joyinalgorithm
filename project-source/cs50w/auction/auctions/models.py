from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator
from django.db import models


STATUS_CHOICES = [
    ("Open", "Open"),
    ("Closed", "Closed"),
]

class User(AbstractUser):
    pass

class Auctionlist(models.Model):
    title = models.CharField(max_length=64)
    description = models.CharField(max_length=255)
    startbid = models.DecimalField(max_digits=14, decimal_places=4, validators=[MinValueValidator(0)])
    currentbid = models.DecimalField(max_digits=14, decimal_places=4, validators=[MinValueValidator(0)])
    status = models.CharField(max_length=6, choices=STATUS_CHOICES, default="Open")
    category = models.CharField(max_length=64)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="auctions_created")
    image = models.ImageField(upload_to="images/", blank=True, null=True)
    winner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="won_auctions")
    watchlist = models.ManyToManyField(User, blank=True, related_name="watchlisted_auctions")
    created_at = models.DateTimeField(auto_now_add=True)


class Biddings(models.Model):
    amount = models.DecimalField(max_digits=14, decimal_places=4, validators=[MinValueValidator(0)])
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bids")
    auction = models.ForeignKey(Auctionlist, on_delete=models.CASCADE, related_name="bids")

class Comments(models.Model):
    text = models.CharField(max_length=1000)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments")
    auction = models.ForeignKey(Auctionlist, on_delete=models.CASCADE, related_name="comments")
    date = models.DateField(auto_now_add=True)
