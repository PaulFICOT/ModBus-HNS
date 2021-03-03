import datetime

from django.shortcuts import render
from rest_framework import viewsets

from .serializers import *
from .plc_class import Plc_connection

from django.utils import timezone

# Create your views here.

class PLCViewSet(viewsets.ModelViewSet):
    queryset = PLC.objects.all()
    serializer_class = PLCSerializer


class MeasureViewSet(viewsets.ModelViewSet):
    queryset = Measure.objects.all()
    serializer_class = MeasureSerializer


class MeasureValueViewSet(viewsets.ModelViewSet):
    queryset = MeasureValue.objects.all()
    serializer_class = MeasureValueSerializer


def measures(request, id):
    plc = PLC.objects.get(id=id)
    measures = Measure.objects.filter(PLC=plc)
    values = MeasureValue.objects.filter(measure__PLC=id)

    connection = Plc_connection(plc.name,plc.ip_address,plc.slave_number)
    for m in measures:
        value = 0
        val_type = "bit"
        if(m.is_bit):
            value = connection.readBit(m.address)
            print("bit n°", m.address, ": ", value)

        else:
            value = connection.readWord(m.address)
            val_type = "word"
            print("word n°", m.address, ":", value)

        val = MeasureValue(measure=m, value=value, value_type=val_type, update_time=timezone.now())
        val.save()


    context = {
        'PLC': plc,
        'VALUES': values,
        'MEASURES': measures,
    }
    return render(request, 'measures.html', context)


def index(request):
    plcs = PLC.objects.all()

    context = {
        'PLCs': plcs
    }

    return render(request, 'index.html', context)
