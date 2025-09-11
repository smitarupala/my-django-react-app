from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib import admin


class Customer(models.Model):
    First= models.CharField(max_length=50)
    Last= models.CharField(max_length=50)
    email= models.CharField(max_length=100)
    mob1= models.IntegerField()
    mob2= models.IntegerField()

    class Meta:
        db_table = 'customer'
        
    def __str__ (self):
        return f"{self.First} {self.Last}  {self.email} {self.mob1} {self.mob2}"

    
class Signup(AbstractUser):
    branchname = models.CharField(max_length=100 , unique=True)
    
