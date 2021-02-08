from django.shortcuts import render
from rest_framework import viewsets

from .serializers import *


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
