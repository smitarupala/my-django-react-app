from django.db import models



class Student(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    marks=models.IntegerField(default=0)

    def __str__(self):
        return f" {self.name} | {self.age} | {self.marks}"
    
    
    
