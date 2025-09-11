
from django.contrib import admin
from django.urls import path 
from . import views


# Customize the admin site text
admin.site.site_header = " Icecream"
admin.site.site_title = "welcome to piyans ice cream"
admin.site.index_title = "Welcome to piyans ice cream"


urlpatterns = [
    path("",views.index),
    path("admin/",admin.site.urls),
    path("home", views.index , name='home'),
    path('student_form',views.student_form , name='student_form'),
    path('services',views.services , name='services'),
    path('contact',views.user_login , name='user_login'),
    
]


