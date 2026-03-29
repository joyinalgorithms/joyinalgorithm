from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("newlisting", views.newlisting, name="newlisting"),
    path("listing/<int:id>/", views.listing, name="listing"),
    path("listing/<int:id>/comment", views.comment, name="comment"),
    path("watchlist", views.watchlist, name="watchlist"),
    path("watchlist/<int:id>/toggle", views.toggle_watchlist, name="toggle_watchlist"),
    path("listing/<int:id>/bid", views.place_bid, name="place_bid"),
    path("listing/<int:id>/close", views.close_auction, name="close_auction"),
    path("categories/", views.categories, name="categories"),
    path("categories/<str:category_name>/", views.category_items, name="category_items")

]
