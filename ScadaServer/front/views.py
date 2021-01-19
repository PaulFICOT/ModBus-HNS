from django.shortcuts import render
from .models import *

# Create your views here.

def index(request):
    PLCs = PLC.objects.all()

    context = {
        'PLCs': PLCs
    }

    return render(request, 'index.html', context)
