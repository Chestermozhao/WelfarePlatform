# -*- coding: utf-8 -*-

# System imports
import hashlib

# Django imports
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.shortcuts import render_to_response

# Client imports
from clients.utils.auth import login_required
from clients.models import *

def signin_page(request):
    if request.method == "POST":
        email = request.POST.get('account_mail',None)
        password = secreted(request.POST.get('password',None))
        sign_data = Signup.query({"account_mail":email})
        if password == sign_data[0]["password"]:
            request.session["user_id"] = sign_data[0]["account_username"]
            print(request.session["user_id"])
            return render_to_response("index/index.html")
    return render(request, "sign/sign_in.html", locals())

@login_required
def index(request):
    return render_to_response("index/index.html")

def logout(request):
    if "user_id" in request.session:
        del request.session["user_id"]
        return HttpResponse("you already logout!")
    else:
        return HttpResponseRedirect("/index")

def signup_page(request):
    if request.method == "POST":
        email = request.POST.get("account_mail", None)
        checked, request_content = check_signup_content(request)
        if checked == True:
            sign_context = Signup()
            if not Signup.query({"account_mail":email}):
                sign_context.insert(request_content)
                return HttpResponse("succeed!") #need a template for succeed and 3 seconds later redirect
            else:
                return HttpResponse("email is registered!")
        return HttpResponse("there is something wrong in ur data!")
    return render(request,"sign/sign_up.html", locals())

@login_required
def main_category(request):
    if request.method == "GET":
        checked = True
        request_content = {}
        for key,value in request.GET.items():
            if value is None or value.strip() == "":
                checked = False
            else:
                request_content[key] = value
        if checked == True and request_content != {}:
            request_content["username"] = request.session["user_id"]
            index = {"cate_content":request_content["cate_text"]}
            search_result = list(Goods.get_by(index))
            if search_result == []:
                Goods.insert(request_content)
            else:
                Goods.update(index, request_content)
        else:
            content_box = """<div class="card border-secondary mb-3 float" style="max-width: 20rem;">
                          <div class = "card-header"> {0} <button type = "button"
                          class = "btn btn-outline-danger floatright">管理介面</button></div >
                          <div class="card-body overflow">
                          <img src = "/static/css/img/main_category/{1}" alt = "" class = "cardsize photosize"></img>
                          </div></div>"""
            pc_route_name = {"option1":"main_category_food.jpg","option2":"main_category_goods.jpeg","option3":"main_category_shampoo.jpeg"};
            index = {"username":request.session["user_id"]}
            search_results = list(Goods.get_by(index))
            if search_results != []:
                main_cate_content = ""
                for result in search_results:
                    main_cate_content += content_box.format(result["cate_text"],pc_route_name[result["cate_img"]])
            return render(request, 'main_category/main_category.html', locals())
    return render(request,'main_category/main_category.html',locals())

def secreted(password):
    if password is None:
        return None
    else:
        salt = "Chester".encode()
        hash = hashlib.md5(salt)
        hash.update(password.encode())
        return hash.hexdigest()

def check_signup_content(request):
    checked = True
    content = {}
    for key, value in request.POST.items():
        if value is None and value.strip() == "":
            checked = False
        elif key != "csrfmiddlewaretoken":
            if key == 'password':
                content[key] = secreted(value)
            else:
                content[key] = value
    return checked, content

# TODO:
# Add login_required at utils
# @login_required
# def index()
