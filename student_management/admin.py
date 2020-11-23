from django.contrib import admin
from student_management.models import Student, Admin, Teacher, Course, CourseStudentRelation


# Register your models here.
admin.site.register(Student)
admin.site.register(Admin)
admin.site.register(Teacher)
admin.site.register(Course)
admin.site.register(CourseStudentRelation)
