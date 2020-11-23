"""crud URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from . import views
from django.views import View
from .views import StudentView, AddStudent, EditStudent, DeleteStudent, AdminView, CourseView, TeacherView, CourseStudentRelationView, studentCourse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
    path('admin/', admin.site.urls),

    path('', StudentView.as_view(), name='student_display'),
    path('CreatePage', AddStudent.as_view(), name='get_Create'),
    path('Create', csrf_exempt(AddStudent.as_view()), name='student_insert'),
    path('Edit/<int:id>', csrf_exempt(EditStudent.as_view()), name='student_edit'),
    path('Update/<int:id>', csrf_exempt(EditStudent.as_view()),
         name='student_update'),
    path('Delete/<int:id>', csrf_exempt(DeleteStudent.as_view()), name='student_del'),

    path('Course/Create', csrf_exempt(CourseView.as_view()), name='course_create'),
    path('Course', csrf_exempt(CourseView.as_view()), name="get_courses"),
    path('Course/Edit/<int:id>',
         csrf_exempt(CourseView.as_view()), name='course_edit'),
    path('Course/Delete/<int:id>',
         csrf_exempt(CourseView.as_view()), name='course_delete'),
    path('Course/<int:id>', csrf_exempt(CourseView.as_view()), name='getCourseByID'),

    path('Teacher/Create', csrf_exempt(TeacherView.as_view()), name='teacher_create'),
    path('Teacher', csrf_exempt(TeacherView.as_view()), name="get_teacher"),
    path('Teacher/Edit/<int:id>',
         csrf_exempt(TeacherView.as_view()), name='teacher_edit'),
    path('Teacher/Delete/<int:id>',
         csrf_exempt(TeacherView.as_view()), name='teacher_delete'),
    path('Teacher/<int:id>', csrf_exempt(TeacherView.as_view()),
         name='getTeacherByID'),

    path('enroll', csrf_exempt(CourseStudentRelationView.as_view()),
         name='enrollIntoCourse'),
    path('enroll/<int:id>', csrf_exempt(CourseStudentRelationView.as_view()),
         name='enrollIntoCourse'),
    path('viewMyCourses',
         csrf_exempt(CourseStudentRelationView.as_view()), name='myCourses'),
    path('studentsenrolled/<int:id>', csrf_exempt(CourseStudentRelationView.as_view()),
         name='getStudentsEnrolledinCourse'),
    path('Coursestudent/<int:id>', csrf_exempt(studentCourse.as_view()),
         name='getStdentsenrolledinCourse'),

    # path('register', csrf_exempt(views.register), name="register"),
    path('register', csrf_exempt(AdminView.as_view()), name="register"),
    # path('register', include('rest_auth.registration.urls'), name="register"),
    # path('login', csrf_exempt(views.loginAPI), name="login"),
    path('login', csrf_exempt(views.MyView.as_view()), name="login"),
    path('logout', views.logoutUser, name="logout"),

    # path('', login_required(StudentView.as_view(),
    #                         login_url='login'), name='student_display'),
    # path('CreatePage', login_required(
    #     AddStudent.as_view(), login_url='login'), name='get_Create'),
    # path('Create', login_required(AddStudent.as_view(),
    #                               login_url='login'), name='student_insert'),
    # path('Edit/<int:id>', login_required(EditStudent.as_view(),
    #                                      login_url='login'), name='student_edit'),
    # path('Update/<int:id>', login_required(EditStudent.as_view(),
    #                                        login_url='login'), name='student_update'),
    # path('Delete/<int:id>', login_required(DeleteStudent.as_view(),
    #                                        login_url='login'), name='student_del'),

]
