from rest_framework import serializers
from inventory.models import  Signup , Customer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken


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
    



           



