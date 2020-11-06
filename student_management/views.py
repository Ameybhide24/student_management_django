from django.shortcuts import render, redirect
from student_management.models import Student
from django.contrib import messages
from student_management.forms import stform
from .forms import CreateUserForm
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseNotFound
from django.views.decorators.http import require_http_methods


@login_required(login_url='login')
@require_http_methods(['GET'])
def student_display(request):
    results = Student.objects.all()
    return render(request, 'index.html', {'Student': results})


@login_required(login_url='login')
@require_http_methods(['POST'])
def student_insert(request):
    # if request.POST.get('student_name') and request.POST.get('student_mail') and request.POST.get('student_address') and request.POST.get('student_mobile') and request.POST.get('student_gender'):
    if request.POST:
        savest = Student()
        savest.student_name = request.POST.get('student_name')
        savest.student_mail = request.POST.get('student_mail')
        savest.student_address = request.POST.get('student_address')
        savest.student_mobile = request.POST.get('student_mobile')
        savest.student_gender = request.POST.get('student_gender')
        savest.save()
        messages.success(request, 'The Record' +
                         savest.student_name+'is saved successfully')
        return render(request, 'Create.html')


@login_required(login_url='login')
@require_http_methods(['GET'])
def get_Create(request):
    return render(request,
                  'Create.html')


@login_required(login_url='login')
def student_edit(request, id):
    getstudentdetails = Student.objects.get(id=id)
    return render(request, 'edit.html', {'Student': getstudentdetails})


@login_required(login_url='login')
def student_update(request, id):
    student_update = Student.objects.get(id=id)
    form = stform(request.POST, instance=student_update)
    if form.is_valid():
        form.save()
        messages.success(request, 'The Student record is updated successfully')
        return render(request, 'edit.html', {'Student': student_update})


@login_required(login_url='login')
def student_del(request, id):
    delStudent = Student.objects.get(id=id)
    delStudent.delete()
    results = crudst.objects.all()
    return render(request, 'index.html', {'Student': results})


def register(request):
    form = CreateUserForm()
    if request.method == 'POST':
        form = CreateUserForm(request.POST)
        if form.is_valid():
            form.save()
            user = form.cleaned_data.get('username')
            messages.success(request, 'Account was created for' + user)
            return redirect('login')
    context = {'form': form}
    return render(request, 'register.html', context)


def loginPage(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('/student_management')
        else:
            messages.info(request, 'Username or Password Incorrect')

    context = {}
    return render(request, 'login.html', context)


def logoutUser(request):
    logout(request)
    return redirect('login')

# Create your views here.
