from flask import request, abort
from functools import wraps


class Authenticator:
    def __init__(self, apikey):
        self.apikey = apikey

    def authenticate(self, view_function):
        @wraps(view_function)
        def decorated_function(*args, **kwargs):
            if request.args.get('apikey') and request.args.get('apikey') == self.apikey:
                return view_function(*args, **kwargs)
            else:
                abort(401)
        return decorated_function