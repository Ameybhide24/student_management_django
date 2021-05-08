from django.shortcuts import render, redirect
from student_management.models import Student, Admin, CourseStudentRelation, Course, Teacher
from django.contrib import messages
from student_management.forms import stform
from .forms import CreateUserForm
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseNotFound, JsonResponse, HttpResponseRedirect
from django.views.decorators.http import require_http_methods
from django.views import View
from django.core import serializers
from rest_framework.decorators import api_view
from .serializers import StudentSerializer, AdminSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.core.serializers.json import DjangoJSONEncoder
from rest_framework.parsers import JSONParser
from rest_framework.authentication import SessionAuthentication, BaseAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
import json


class StudentView(View):

    @csrf_exempt
    def get(self, request):
        results = Student.objects.all()
        results_list = serializers.serialize('json', results)
        return HttpResponse(results_list, content_type='text/json-comment-filtered')


class AddStudent(View):

    @csrf_exempt
    def get(self, request):
        return render(request, 'Create.html')

    @csrf_exempt
    def post(self, request):
        req = json.loads(request.body)
        savest = Student()
        savest.student_name = req.get('student_name')
        savest.student_mail = req.get('student_mail')
        savest.student_address = req.get('student_address')
        savest.student_mobile = req.get('student_mobile')
        savest.student_gender = req.get('student_gender')
        savest.save()
        return HttpResponse(savest.student_name+' Saved Successfully')


class EditStudent(View):

    @csrf_exempt
    def get(self, request, id):
        getstudentdetails = Student.objects.get(id=id)
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


class CourseView(View):

    @csrf_exempt
    def get(self, request, id=-1):
        if id != -1:
            courseDetails = Course.objects.get(course_id=id)
            getCoursedetails_obj = {
                'course_id': courseDetails.course_id,
                'course_name': courseDetails.course_name,
                'course_duration': courseDetails.course_duration,
                'course_fees': courseDetails.course_fees,
                'teacher_id': courseDetails.teacher_id_id
            }
            getCoursedetails_json = json.dumps(getCoursedetails_obj)
            return HttpResponse(getCoursedetails_json, content_type='text/json-comment-filtered')
        else:
            courseDetails = Course.objects.all()
            courseList = serializers.serialize('json', courseDetails)
            return HttpResponse(courseList, content_type='text/json-comment-filtered')

    @csrf_exempt
    def post(self, request):
        req = json.loads(request.body)
        courseObj = Course()
        courseObj.course_name = req.get('course_name')
        courseObj.course_fees = req.get('course_fees')
        courseObj.course_duration = req.get('course_duration')
        courseObj.teacher_id_id = req.get('teacher_id')
        courseObj.save()
        return HttpResponse(courseObj.course_name+' Saved Successfully')

    @csrf_exempt
    def put(self, request, id):
        req = json.loads(request.body)
        courseObj = Course.objects.get(course_id=id)
        courseObj.course_name = req.get('course_name')
        courseObj.course_fees = req.get('course_fees')
        courseObj.course_duration = req.get('course_duration')
        courseObj.teacher_id_id = req.get('teacher_id')
        courseObj.save()
        return HttpResponse(courseObj.course_name+' Edited Successfully')

    @csrf_exempt
    def delete(self, request, id):
        courseObj = Course.objects.get(course_id=id)
        courseObj.delete()
        return HttpResponse('Deleted successfully')


class TeacherView(View):
    @csrf_exempt
    def get(self, request, id=-1):
        if id != -1:
            teacherDetails = Teacher.objects.get(teacher_id=id)
            getTeacherdetails_obj = {
                'teacher_id': teacherDetails.teacher_id,
                'teacher_name': teacherDetails.teacher_name,
                'teacher_course': teacherDetails.teacher_course,
                'teacher_education': teacherDetails.teacher_education,
            }
            getTeacherdetails_json = json.dumps(getTeacherdetails_obj)
            return HttpResponse(getTeacherdetails_json, content_type='text/json-comment-filtered')
        else:
            teacherDetails = Teacher.objects.all()
            TeacherList = serializers.serialize('json', teacherDetails)
            return HttpResponse(TeacherList, content_type='text/json-comment-filtered')

    @csrf_exempt
    def post(self, request):
        req = json.loads(request.body)
        teacherObj = Teacher()
        teacherObj.teacher_name = req.get('teacher_name')
        teacherObj.teacher_course = req.get('teacher_course')
        teacherObj.teacher_education = req.get('teacher_education')
        teacherObj.save()
        return HttpResponse(teacherObj.teacher_name+' Saved Successfully')

    @csrf_exempt
    def put(self, request, id):
        req = json.loads(request.body)
        teacherObj = Teacher.objects.get(teacher_id=id)
        teacherObj.teacher_name = req.get('teacher_name')
        teacherObj.teacher_course = req.get('teacher_course')
        teacherObj.teacher_education = req.get('teacher_education')
        teacherObj.save()
        return HttpResponse(teacherObj.teacher_name+' Edited Successfully')

    @csrf_exempt
    def delete(self, request, id):
        teacherObj = Teacher.objects.get(teacher_id=id)
        teacherObj.delete()
        return HttpResponse('Deleted successfully')


class CourseStudentRelationView(View):

    @csrf_exempt
    def post(self, request):
        req = json.loads(request.body)
        CourseStudentObj = CourseStudentRelation()
        CourseStudentObj.student_id_id = req.get('student_id')
        CourseStudentObj.course_id_id = req.get('course_id')
        CourseStudentObj.save()
        return HttpResponse(
            CourseStudentObj.student_id_id+' Enrolled into '+CourseStudentObj.course_id_id + ' Successfully')

    @csrf_exempt
    def get(self, request, id=-1):
        if id != -1:
            CourseStudentDetails = CourseStudentRelation.objects.filter(
                course_id=id).values('student_id', 'student_id__student_name',
                                     'student_id__student_mail', 'student_id__student_address',
                                     'student_id__student_mobile', 'student_id__student_gender')
            jsonRes = []
            for res in CourseStudentDetails:
                jsonRes.append(res)
            CourseStudentList = json.dumps(jsonRes)
            return HttpResponse(CourseStudentList, content_type='text/json-comment-filtered')
        else:
            CourseStudentDetails = CourseStudentRelation.objects.prefetch_related(
                'student_id').prefetch_related('course_id').values('course_id',
                                                                   'course_id__course_name', 'course_id__course_fees',
                                                                   'course_id__course_fees', 'course_id__course_duration',
                                                                   'course_id__teacher_id', 'course_id__teacher_id__teacher_name',
                                                                   'student_id', 'student_id__student_name', 'student_id__student_mail',
                                                                   'student_id__student_address', 'student_id__student_mobile',
                                                                   'student_id__student_gender'
                                                                   )
            return HttpResponse(CourseStudentDetails, content_type='text/json-comment-filtered')


class studentCourse(View):
    @csrf_exempt
    def get(self, request, id):
        StudentDetails = CourseStudentRelation.objects.filter(
            course_id=id).select_related('student_id')
        StudentList = serializers.serialize('json', StudentDetails)
        return HttpResponse(StudentList, content_type='text/json-comment-filtered')


class AdminView(View):
    serializers_class = AdminSerializer

    @csrf_exempt
    def get(self, request):
        AdminDetails = Admin.objects.all()
        admin_list = serializers.serialize('json', AdminDetails)
        return HttpResponse(admin_list, content_type='text/json-comment-filtered')

    @csrf_exempt
    def post(self, request):
        req = json.loads(request.body)
        adminObj = Admin()
        adminObj.admin_username = req.get('username')
        adminObj.admin_email = req.get('email')
        adminObj.admin_password = req.get('password')
        adminObj.save()

        return HttpResponse(adminObj.admin_username+' Saved Successfully')


class MyBasicAuth(BaseAuthentication):
    def authenticate(self, request):
        req = json.loads(request.body)
        admin_username = req.get('username', None)
        admin_password = req.get('password', None)
        credentials = {
            Admin().admin_username: admin_username,
            Admin().admin_password: admin_password
        }
        user = authenticate(**credentials)
        # if not username or not password:
        #     raise exceptions.authenticationFailed(_('No credentials Provided'))
        # user = authenticate(
        #     request, admin_username=admin_username, admin_password=admin_password)
        if user is not None:
            login(request, user)
            return HttpResponse(user, None)
        # user, _ =super(MyBasicAuth,self).authenticate(request)
        # login(request,user)
        # return user, _

    # def loginAPI(request):
    #     req = json.loads(request.body)


class MyView(View):
    authentication_classes = (SessionAuthentication, MyBasicAuth)
    permission_classes = (IsAuthenticated)

    def post(self, request, format=None):
        content = {
            'user': unicode(request.user),
            'auth': unicode(request.auth),
        }
        return HttpResponse(content)


def register(request):
    # form = CreateUserForm()
    # #req = json.loads(request.body)
    # form = CreateUserForm(request.body)
    # if form.is_valid():
    #     form.save()
    #     # user = form.cleaned_data.get('username')
    #     # messages.success(request, 'Account was created for' + user)

    # #context = {'form': form}
    # # return render(request, 'register.html', context)
    # return HttpResponseRedirect('/login')
    print(request.body)
    req = json.loads(request.body)
    print(req)
    reqS = serializers.deserialize('json', req)
    print(reqS)
    # form = CreateUserForm()
    # form = CreateUserForm(reqS)
    # # print(form)
    # print(form.is_valid())
    # if form.is_valid():
    #     form.save()
    #     return HttpResponse('saved successfully!')
    # return HttpResponse('form')


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
