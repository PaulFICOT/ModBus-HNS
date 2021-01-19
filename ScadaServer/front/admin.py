from django.contrib import admin
from .models import *


# Register your models here.

class PLCAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'ip_address', 'slave_number')


admin.site.register(PLC, PLCAdmin)
