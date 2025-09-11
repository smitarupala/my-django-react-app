from django.urls import path
from . import views 
#from .views import hello_world
from inventory.views import hello_world , customer_list
from inventory.views import LoginView , SignupView


urlpatterns = [
    path('signup/',SignupView.as_view() , name="signup"),
    path('login/' , LoginView.as_view(), name="login"),
    path('customers/',views.customer_list , name="customer_list"),
    path('customers/add/',views.add_data , name="add_data"),
    path('customers/update/<int:id>',views.update_data , name="update_data"),
    path('customers/delete/<int:id>',views.delete_data , name="delete_data"),
    path('api/hello/', hello_world),
     path(' ', hello_world),
]

         