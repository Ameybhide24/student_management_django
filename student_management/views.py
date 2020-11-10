from django.shortcuts import render, redirect
from student_management.models import Student
from django.contrib import messages
from student_management.forms import stform
from .forms import CreateUserForm
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseNotFound, JsonResponse
from django.views.decorators.http import require_http_methods
from django.views import View
from django.core import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import StudentSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.parsers import JSONParser
import json


class StudentView(View):

    @csrf_exempt
    def get(self, request):
        results = Student.objects.all()
        # return render(request, 'index.html', {'Student': results})
        results_list = serializers.serialize('json', results)
        # results_list = StudentSerializer(results, many=True)
        return HttpResponse(results_list, content_type='text/json-comment-filtered')
        # return Response(results_list)
        # return JsonResponse(results_list, safe=False, content_type='text/json-comment-filtered')


class AddStudent(View):

    @csrf_exempt
    def get(self, request):
        return render(request, 'Create.html')

    @csrf_exempt
    def post(self, request):
        # if request.POST:
        #serializers.deserialize('json', req)

        req = json.loads(request.body)
        savest = Student()
        savest.student_name = req.get('student_name')
        savest.student_mail = req.get('student_mail')
        savest.student_address = req.get('student_address')
        savest.student_mobile = req.get('student_mobile')
        savest.student_gender = req.get('student_gender')
        savest.save()

        return HttpResponse(savest.student_name+' Saved Successfully')

        # messages.success(request, 'The Record' +
        # savest.student_name+'is saved successfully')

        # req = JsonResponse().parse(request)
        # # req_serializer = StudentSerializer(data=req)
        # print(req)
        # savest = Student()
        # savest.student_name = req.get('student_name')
        # savest.student_mail = req.get('student_mail')
        # savest.student_address = req.get('student_address')
        # savest.student_mobile = req.get('student_mobile')
        # savest.student_gender = req.get('student_gender')
        # savest.save()

        # if req_serializer.is_valid():
        #     req_serializer.save()
        #     return JsonResponse(req_serializer.data, status=status.HTTP_201_CREATED)
        # return JsonResponse(req_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # return render(request, 'Create.html')


class EditStudent(View):

    @csrf_exempt
    def get(self, request, id):
        getstudentdetails = Student.objects.get(id=id)
        # getstudentdetails_json = serializers.serialize(
        #     'json', getstudentdetails)
        # return render(request, 'edit.html', {'Student': getstudentdetails})
        getstudentdetails_obj = {
            'student_name': getstudentdetails.student_name,
            'student_mail': getstudentdetails.student_mail,
            'student_address': getstudentdetails.student_address,
            'student_mobile': getstudentdetails.student_mobile,
            'student_gender': getstudentdetails.student_gender
        }
        getstudentdetails_json = json.dumps(getstudentdetails_obj)
        return HttpResponse(getstudentdetails_json, content_type='text/json-comment-filtered')

    @csrf_exempt
    def post(self, request, id):
        student_update = Student.objects.get(id=id)
        req_json = json.loads(request.body)
        form = stform(req_json, instance=student_update)
        if form.is_valid():
            form.save()
            # messages.success(
            #     request, 'The Student record is updated successfully')
            # return render(request, 'edit.html', {'Student': student_update})
            return HttpResponse('Edited successfullt')


class DeleteStudent(View):

    @csrf_exempt
    def post(self, request, id):
        delStudent = Student.objects.get(id=id)
        delStudent.delete()
        results = Student.objects.all()
        return render(request, 'index.html', {'Student': results})

    @csrf_exempt
    def get(self, request, id):
        delStudent = Student.objects.get(id=id)
        delStudent.delete()
        results = Student.objects.all()
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


#
# Function Based Views
#
# @login_required(login_url='login')
# @require_http_methods(['GET'])
# def student_display(request):
#     results = Student.objects.all()
#     return render(request, 'index.html', {'Student': results})


# @login_required(login_url='login')
# @require_http_methods(['POST'])
# def student_insert(request):
#     # if request.POST.get('student_name') and request.POST.get('student_mail') and request.POST.get('student_address') and request.POST.get('student_mobile') and request.POST.get('student_gender'):
#     if request.POST:
#         savest = Student()
#         savest.student_name = request.POST.get('student_name')
#         savest.student_mail = request.POST.get('student_mail')
#         savest.student_address = request.POST.get('student_address')
#         savest.student_mobile = request.POST.get('student_mobile')
#         savest.student_gender = request.POST.get('student_gender')
#         savest.save()
#         messages.success(request, 'The Record' +
#                          savest.student_name+'is saved successfully')
#         return render(request, 'Create.html')


# @login_required(login_url='login')
# @require_http_methods(['GET'])
# def get_Create(request):
#     return render(request,
#                   'Create.html')


# @login_required(login_url='login')
# def student_edit(request, id):
#     getstudentdetails = Student.objects.get(id=id)
#     return render(request, 'edit.html', {'Student': getstudentdetails})


# @login_required(login_url='login')
# def student_update(request, id):
#     student_update = Student.objects.get(id=id)
#     form = stform(request.POST, instance=student_update)
#     if form.is_valid():
#         form.save()
#         messages.success(request, 'The Student record is updated successfully')
#         return render(request, 'edit.html', {'Student': student_update})


# @login_required(login_url='login')
# def student_del(request, id):
#     delStudent = Student.objects.get(id=id)
#     delStudent.delete()
#     results = Student.objects.all()
#     return render(request, 'index.html', {'Student': results})
