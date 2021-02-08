from .models import *
from rest_framework import serializers


class PLCSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PLC
        fields = ['id', 'name', 'ip_address', 'slave_number']

class MeasureSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Measure
        fields = ['id', 'PLC', 'address', 'is_bit', 'name', 'length']

class MeasureValueSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MeasureValue
        fields = ['measure', 'value', 'value_type', 'update_time']
