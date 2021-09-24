from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Info, Stock

admin.site.register(User, UserAdmin)
admin.site.register(Info)
admin.site.register(Stock)

