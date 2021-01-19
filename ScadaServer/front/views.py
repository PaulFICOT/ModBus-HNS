from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import routers, serializers, viewsets

# Create your views here.

class PLCViewSet(viewsets.ModelViewSet):
    queryset = PLC.objects.all()
    serializer_class = PLCSerializer

def index(request):
    PLCs = PLC.objects.all()

    context = {
        'PLCs': PLCs
    }

    return render(request, 'index.html', context)
