from django.urls import path
from . import views

urlpatterns = [
    path('',views.Home,name='Home'),
    path('suche/',views.startScraper,name="startScraper"),
    path('produkte/',views.produkteAnnehmen,name="produkteAnnehmen"),
    path('datenbankRequest/',views.infiniteScrolling,name="infiniteScrolling")
   
]

