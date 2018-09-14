# -*- coding: utf-8 -*-

# System imports

# Django imports
from django.http import HttpResponse
from django.shortcuts import render
from django.shortcuts import render_to_response
# Client imports
from clients.utils.auth import login_required
from clients.models import *

def signin_page(request):
    if request.method == "POST":
        email = request.POST.get('account_mail',None)
        password = request.POST.get('password',None)
        sign_data = Signup.query({"account_mail":email})
        print(sign_data)
        if password == sign_data[0]["password"]:
            return render_to_response("index/index.html")
    return render(request, "sign/sign_in.html", locals())

def signup_page(request):
    if request.method == "POST":
        email = request.POST.get('account_mail',None)
        username = request.POST.get('account_username',None)
        password = request.POST.get('password',None)
        checked, content = check_signup_content(request)
        if checked == True:
            sign_context = Signup()
            if not Signup.query({"account_mail":email}):
                sign_context.insert(content)
                return HttpResponse("succeed!") #need a template for succeed and 3 seconds later redirect
            else:
                return HttpResponse("email is registered!")
        return HttpResponse("there is comething wrong in ur data!")
    return render(request,"sign/sign_up.html", locals())

def main_category(request):
    return render_to_response('main_category/main_category.html')

def check_signup_content(request):
    checked = True
    content = {}
    for key, value in request.POST.items():
        if value is None and value.strip() == "":
            checked = False
        elif key != "csrfmiddlewaretoken":
            content[key] = value
    return checked, content

# TODO:
# Add login_required at utils
# @login_required
# def index()
