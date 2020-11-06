from django.db import models

# Create your models here.


class Student(models.Model):
    student_name = models.CharField(max_length=100)
    student_mail = models.CharField(max_length=100)
    student_address = models.CharField(max_length=100)
    student_mobile = models.IntegerField()
    student_gender = models.CharField(max_length=1)
