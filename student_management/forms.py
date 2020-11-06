from django import forms
from student_management.models import Student
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class stform(forms.ModelForm):
    class Meta:
        model = Student
        fields = "__all__"


class CreateUserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']
