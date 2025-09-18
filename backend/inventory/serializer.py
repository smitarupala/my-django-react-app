from rest_framework import serializers
from inventory.models import  Signup , Customer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from inventory.views import  OTP
from inventory.utils import generate_otp 
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()



class CustomerSerializer(serializers.ModelSerializer):
   class Meta:
      model=Customer
      fields=['id','First','Last','email','mob1','mob2']

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
       model=Signup
       fields=['branchname','username','password']
       extra_kwargs={'password':{'write_only':True}}

    def create(self,validated_data):
       user=Signup.objects.create_user(
          branchname=validated_data['branchname'],
          username=validated_data['username'],
          password=validated_data['password']
         )
       return user
     
       
class LoginSerializer(serializers.Serializer):
  
 # branchname=serializers.CharField()
  username = serializers.CharField()
  password=serializers.CharField(write_only=True)

  def validate(self,data):

    print("raw data:",data)
    #branchname=(data.get("branchname") or "").strip()
    username=(data.get("username") or "").strip()
    password=(data.get("password") or "").strip()

    if  not username or not password :
       raise serializers.ValidationError({"detail": "Please enter username and password"})

  
    user = authenticate( username=username, password=password)

    print("authentic:",user)

    if not user :
       raise serializers.ValidationError({"detail": "Invalid credentials"})
    

    #user_branch = getattr(user,"branchname",None)
    #if user_branch != branchname:
     # raise serializers.ValidationError("invalid branch")
    
    if not user.is_active:
           raise serializers.ValidationError({"detail": "User account is disabled"})
         
    refresh=RefreshToken.for_user(user)
    return{
           'refresh': str(refresh),
           'access' :str(refresh.access_token),
           'username':user.username,
           #'email': user.email,
          
    }
  
class SendOTPSerializer(serializers.Serializer):
   username = serializers.CharField()

   

   def create(self,validated_data):
      username =validated_data.get("username") # data["username"]

      print("username:",username)
      user=User.objects.get(username=username)
      print ("user ::",user)
     
      otp = generate_otp()
      new_otp = OTP.objects.create(user=user , code=otp)

      return new_otp

class VerifyOTPSerializer(serializers.Serializer):
   username = serializers.CharField()
   otp=serializers.CharField()

   def validate(self,validated_data):
      username=validated_data.get("username")
      otp=validated_data.get("otp")

      try:
         user=User.objects.get(username=username)
      except User.DoesNotExit:
         serializers.ValidationError("User not Found")

      otp_obj=OTP.objects.filter(user=user , code=otp ,is_used=0).order_by("-is_created").first()
      
      if not otp_obj :
         raise serializers.ValidationError("invalid OTP")

      if timezone.now() - otp_obj.is_created > timezone.timedelta(minutes=5):
            raise serializers.ValidationError("OTP expired")
      
      otp_obj.is_used = 1
      otp_obj.save()

      refersh=RefreshToken.for_user(user)


      return{
      "refresh" : str("refersh"),
      "access"  : str(refersh.access_token),
      "username" : user.username
       
      
      }



           



