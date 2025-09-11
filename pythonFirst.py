class Employee :
   def __init__(self , role , dept , salary):
      
      self.role=role
      self.dept=dept
      self.salary=salary

   def showDetails (self) :
      print("role=",self.role)
      print("dept=",self.dept)
      print("salary=",self.salary)
      print("name=",self.name),
      print("age=",self.age)

class Engineer(Employee) :
        def __init__(self, name , age) :
            self.name=name
            self.age=age
            super().__init__("engineer","it",25000)
                             
e1=Engineer("elon musk" ,40)
e1.showDetails();                            
