from django.shortcuts import render
from rest_framework import viewsets

from .serializers import *


# Create your views here.

class PLCViewSet(viewsets.ModelViewSet):
    queryset = PLC.objects.all()
    serializer_class = PLCSerializer


def measures(request, id):
    plc = PLC.objects.get(id=id)
    measures = Measure.objects.filter(PLC=plc)
    values = MeasureValue.objects.filter(measure__PLC=id)

    context = {
        'PLC': plc,
        'MEASURES': measures,
        'VALUES': values
    }

    return render(request, 'measures.html', context)


def index(request):
    plcs = PLC.objects.all()

    context = {
        'PLCs': plcs
    }

    return render(request, 'index.html', context)
