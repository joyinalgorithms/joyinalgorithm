from django.urls import path

from . import views


urlpatterns = [
    path("", views.index, name="index"),
    path("wiki/<str:title>/", views.page, name="page"),
    path("search/", views.result, name="result"),
    path("newpage/", views.newpage, name="newpage"),
    path('editpage/<str:title>/', views.editpage, name='editpage'),
    path("randompage/", views.randompage, name="randompage")
]
