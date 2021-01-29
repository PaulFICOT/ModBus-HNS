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


def index(request):
    PLCs = PLC.objects.all()

    context = {
        'PLCs': PLCs
    }

    return render(request, 'index.html', context)
