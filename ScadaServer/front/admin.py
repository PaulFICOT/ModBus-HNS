from django.contrib import admin
from .models import *


# Register your models here.

class PLCAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'ip_address', 'slave_number')


class MeasureAdmin(admin.ModelAdmin):
    list_display = ('id', 'PLC', 'address', 'is_bit', 'name', 'length')


class MeasureValueAdmin(admin.ModelAdmin):
    list_display = ('id', 'measure', 'value', 'value_type', 'update_time')


admin.site.register(PLC, PLCAdmin)
admin.site.register(Measure, MeasureAdmin)
admin.site.register(MeasureValue, MeasureValueAdmin)
