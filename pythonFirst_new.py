
users={"smita": "ssss",
       "mayur":"mmmm",
       "piyan":"pppp",
       "rugveda" : "rrrr"}

print("==========login=========")

username=input("enter Username:")
password=input("enter password:")

if username in users and users[username]==password :
  
    print(f"welcome:{username}")

    while True:
        print("======MENU======")
        print("1.show Profile")
        print("2.add two numbers")
        print("3.logout")
         
        choice=input("enter your choice:")

        if choice== "1" :
            print(f"user Profile:{username} \naccess:superuser")

        elif choice== "2" :

            a= int(input("enter first number:"))
            b= int(input("enter second number:"))
        
            sum =a + b
            print(f"total:{sum}")

        elif choice== "3" :

                print("logged out successfully")
                break
        else :
             print("invalid choice --")
else :
         
    print("invalid username & password")

             

