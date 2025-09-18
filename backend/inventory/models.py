from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib import admin
from django.contrib.auth.models import User
from django.utils import timezone
import datetime
import random
from django.conf import settings


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
    branchname = models.CharField(max_length=101,unique=False)
    


class OTP(models.Model):
    user=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    code=models.CharField(max_length=50)
    is_created=models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)


    def generate_otp(self):
        self.code=str(random.randint(100000,999999))
        self.save()
        return self.code
    
    def is_valid(self):
       return timezone.now() < self.is_created + datetime.timedelta(minutes=5)
    