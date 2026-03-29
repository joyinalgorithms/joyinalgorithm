from decimal import Decimal
from django import forms
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django.urls import reverse
from datetime import datetime
from .models import User, Auctionlist, Biddings, Comments


class NewListingForm(forms.Form):
    title = forms.CharField(max_length=64, widget=forms.TextInput(attrs={'class': 'input-box'}))
    description = forms.CharField(
        max_length=500, widget=forms.TextInput(attrs={'class': 'input-box'}))
    startbid = forms.IntegerField(min_value=0, widget=forms.TextInput(attrs={'class': 'input-box'}))
    category = forms.CharField(max_length=64, widget=forms.TextInput(attrs={'class': 'input-box'}))
    image = forms.ImageField()


@login_required(login_url='/login')
def index(request):
    auctionlist = Auctionlist.objects.filter(status="Open")
    return render(request, "auctions/index.html", {
        "auctionlist": auctionlist
    })


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "auctions/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "auctions/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "auctions/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "auctions/register.html")


@login_required(login_url='/login')
def newlisting(request):
    if request.method == "POST":
        form = NewListingForm(request.POST, request.FILES)
        if form.is_valid():
            title = form.cleaned_data["title"]
            description = form.cleaned_data["description"]
            startbid = form.cleaned_data["startbid"]
            category = form.cleaned_data["category"]
            image = form.cleaned_data["image"]
            user = request.user

            listing = Auctionlist(
                title=title,
                description=description,
                startbid=startbid,
                currentbid=startbid,
                category=category,
                user=user,
                image=image
            )
            listing.save()
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "auctions/newlisting.html", {
                "form": form
            })

    return render(request, "auctions/newlisting.html", {
        "form": NewListingForm(),
    })


@login_required(login_url='/login')
def listing(request, id):
    listing = Auctionlist.objects.get(pk=id)
    comments = Comments.objects.filter(auction=listing)
    if listing.status == "Closed" and listing.winner == request.user:
        you_won = True
    else:
        you_won = False

    print("Winner:", listing.winner)
    print("User:", request.user)
    print("you_won:", you_won)

    return render(request, "auctions/listing.html", {
        "listing": listing,
        "comments": comments,
        "you_won": you_won
    })


@login_required(login_url='/login')
def comment(request, id):
    if request.method == "POST":
        comment = request.POST["comment"]
        user = request.user
        auction = get_object_or_404(Auctionlist, pk=id)
        new_comment = Comments(
            text=comment,
            user=user,
            auction=auction
        )
        new_comment.save()
        return HttpResponseRedirect(reverse("listing", args=[id]))


@login_required(login_url='/login')
def watchlist(request):
    watchlist = request.user.watchlisted_auctions.all()
    return render(request, "auctions/watchlist.html", {
        "watchlist": watchlist
    })


@login_required(login_url='/login')
def toggle_watchlist(request, id):
    listing = get_object_or_404(Auctionlist, pk=id)

    if request.user in listing.watchlist.all():
        listing.watchlist.remove(request.user)
    else:
        listing.watchlist.add(request.user)

    return HttpResponseRedirect(reverse("listing", args=[id]))


@login_required(login_url='/login')
def place_bid(request, id):
    listing = get_object_or_404(Auctionlist, pk=id)
    if request.method == "POST":
        try:
            bid_amount = Decimal(request.POST["bid"])
        except:
            return render(request, "auctions/listing.html", {
                "listing": listing,
                "error": "Please enter a valid number."
            })

        if bid_amount >= listing.currentbid:
            Biddings.objects.create(
                amount=bid_amount,
                user=request.user,
                auction=listing
            )
            listing.currentbid = bid_amount
            listing.save()
            return HttpResponseRedirect(reverse("listing", args=[id]))
        else:
            return render(request, "auctions/listing.html", {
                "listing": listing,
                "error": "Your bid must be at least the current price."
            })


@login_required(login_url='/login')
def close_auction(request, id):
    if request.method == "POST":
        listing = get_object_or_404(Auctionlist, pk=id)
        if request.user == listing.user:
            highest_bid = listing.bids.order_by("-amount").first()

            listing.status = "Closed"
            if highest_bid is not None:
                listing.winner = highest_bid.user
                winner = highest_bid.user
            else:
                winner = None

            listing.save()
            return HttpResponseRedirect(reverse("listing", args=[id]))


@login_required(login_url='/login')
def category_items(request, category_name):
    listings = Auctionlist.objects.filter(category=category_name, status="Open")
    return render(request, "auctions/index.html", {
        "auctionlist": listings,
        "selected_category": category_name
    })


@login_required(login_url='/login')
def categories(request):
    categories = Auctionlist.objects.values_list("category", flat=True).distinct()
    return render(request, "auctions/categories.html", {
        "categories": categories
    })
