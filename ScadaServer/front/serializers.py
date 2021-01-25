from .models import *
from rest_framework import serializers


class PLCSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PLC
        fields = ['id', 'name', 'ip_address', 'slave_number']
