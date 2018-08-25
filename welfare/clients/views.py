# -*- coding: utf-8 -*-

# System imports

# Django imports
from django.http import HttpResponse
from django.shortcuts import render
from django.shortcuts import render_to_response

# Client imports
from utils.auth import login_required


def signin_page(request):
    return render_to_response("sign/sign_in.html", locals())

def signup_page(request):
    return render_to_response("sign/sign_up.html", locals())

# TODO:
# Add login_required at utils
# @login_required
# def index()
