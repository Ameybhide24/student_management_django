from django.db import models

# Create your models here.


class Student(models.Model):
    student_name = models.CharField(max_length=100)
    student_mail = models.CharField(max_length=100)
    student_address = models.CharField(max_length=100)
    student_mobile = models.IntegerField()
    student_gender = models.CharField(max_length=1)


class Admin(models.Model):
    admin_username = models.CharField(max_length=50)
    admin_password = models.CharField(max_length=50)
    admin_email = models.CharField(max_length=30, default='@gmail.com')


class Teacher(models.Model):
    teacher_id = models.AutoField(primary_key=True)
    teacher_name = models.CharField(max_length=50)
    teacher_course = models.CharField(max_length=50)
    teacher_education = models.CharField(max_length=120)


class Course(models.Model):
    course_id = models.AutoField(primary_key=True)
    course_name = models.CharField(max_length=50)
    course_fees = models.IntegerField()
    course_duration = models.IntegerField()
    teacher_id = models.ForeignKey(
        Teacher, on_delete=models.CASCADE, to_field='teacher_id')
    # teacher_id = models.ForeignKey(
    #     Teacher, on_delete=models.CASCADE)


class CourseStudentRelation(models.Model):
    class Meta:
        unique_together = (('student_id', 'course_id'))

    student_id = models.ForeignKey(
        Student, on_delete=models.CASCADE)
    course_id = models.ForeignKey(
        Course, on_delete=models.CASCADE, to_field='course_id')
