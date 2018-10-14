# -*- coding: utf-8 -*-

# System imports
from functools import wraps

# Django imports
from django.http import HttpResponseRedirect

# Client imports
from clients.utils.mongo import user


def login_required(func):
    def decorator(func):
        @wraps(func)
        def return_wrapper(request, *args, **kwargs):
            if "user_id" in request.session:
                request.user_id = request.session["user_id"]
                #print("test2",request.user_id)
            else:
                return HttpResponseRedirect("/signin")
            return func(request, *args, **kwargs)
        return return_wrapper
    return decorator(func)
