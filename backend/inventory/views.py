#from django.shortcuts import render
from django.http import JsonResponse 
from inventory.models import Customer
import json

from rest_framework.response import Response
from rest_framework.decorators import api_view
from inventory.serializer import CustomerSerializer , SignupSerializer ,LoginSerializer
from rest_framework import status
from rest_framework.views import APIView



# Create your views here.


@api_view(['GET'])
def customer_list(request): 
  if request.method=="GET" :
    print("request",request)
    customer = Customer.objects.all()
    
    serializer=CustomerSerializer(customer,many=True)
    return Response(serializer.data)

  


@api_view(["POST"])
def add_data(request):
     
   print("aaaaaaaa:",request.data)

   if request.method=="POST" :
   
    serializer = CustomerSerializer(data=request.data)
    if serializer.is_valid() :
       serializer.save()
       return  Response(serializer.data , status=status.HTTP_201_CREATED)
    print("ERRORS:", serializer.errors)   
    return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST)
    
    
    #return JsonResponse({"message":"added sucessfully12" ,"id":customer.id},status=201)
  #return JsonResponse({"error":"invalid request"} , status=400)
  
@api_view(['PUT'])
def update_data(request,id):
   print("dddd",request)
   try:
      customer=Customer.objects.get(id=id)
   except Customer.DoesNotExist:
      return Response("Customer Does not exit")
   
   serializer=CustomerSerializer(customer , data=request.data)
     
   if serializer.is_valid():
      serializer.save()
      return Response(serializer.data , status=status.HTTP_200_OK)
   return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)




   

  



@api_view(["DELETE"])
def delete_data(request,id):
    print("request , id:",id)

    try:
      customer=Customer.objects.get(id=id)
      customer.delete()
      return Response({"message":"record deleted successfully"} , status=200)
    except Customer.DoesNotExist:
            return Response({"error": "Customer not found"}, status=404)
  

@api_view(['GET'])
def hello_world(request):
    return Response({"message": "Hello, world!"})

class SignupView(APIView):
   def post(self,request):
      serializer = SignupSerializer(data=request.data)
      if serializer.is_valid():
         serializer.save()
         return Response({"message":"user created successfully"},status=201)
        
      else:
         return Response(serializer.errors,status=400)
         

class LoginView(APIView):
   def post(self,request):
      print(request.data)
      serializer = LoginSerializer(data=request.data)
      if serializer.is_valid():
         return Response(serializer.validated_data , status=status.HTTP_200_OK)
      print("error:",serializer.errors)
      return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST)
   

      
      