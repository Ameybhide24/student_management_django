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
from django.urls import path
from . import views
from django.views import View
from .views import StudentView, AddStudent, EditStudent, DeleteStudent
from django.contrib.auth.decorators import login_required

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', login_required(StudentView.as_view(),
                            login_url='login'), name='student_display'),
    path('CreatePage', login_required(
        AddStudent.as_view(), login_url='login'), name='get_Create'),
    path('Create', login_required(AddStudent.as_view(),
                                  login_url='login'), name='student_insert'),
    path('Edit/<int:id>', login_required(EditStudent.as_view(),
                                         login_url='login'), name='student_edit'),
    path('Update/<int:id>', login_required(EditStudent.as_view(),
                                           login_url='login'), name='student_update'),
    path('Delete/<int:id>', login_required(DeleteStudent.as_view(),
                                           login_url='login'), name='student_del'),
    path('register', views.register, name="register"),
    path('login', views.loginPage, name="login"),
    path('logout', views.logoutUser, name="logout")

]
