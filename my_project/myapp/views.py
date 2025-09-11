from django.http import HttpResponse
from django.shortcuts import render,redirect
from django.contrib.auth import authenticate , login
from django.contrib import messages
from  .forms import StudentForm



def index(request):
   

    return render(request , "index.html" )
   # return HttpResponse("Hello, this is your first Django app responding!")

def student_form(request):

    if request.method=="POST":
        form=StudentForm(request.POST)
       

        if form.is_valid():
            form.save()
            messages.success(request , "record added success !")
            return redirect("student_form")
        else:
            #form = StudentForm()
            return render(request , 'about.html',{'form':form})
    


    else:
        form = StudentForm()  
        return render(request, 'about.html', {'form': form}) 
    #return render(request , "about.html")
    

def services(request):
    return render(request,"service.html")


def user_login(request):

    if request.method=="POST" :

        username= request.POST.get('username')
        password = request.POST.get('password')

        print ("username::", username)
        print("password::",password)

        user=authenticate(request,username=username,password=password)
         
        print("user::",user)
        if user is not None:
            login (request , user)
            return  redirect('home')
        else:                 
            messages.error(request,"wrong email and password")
          
    return render(request,'contact.html')

