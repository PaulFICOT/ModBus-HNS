from django.db import models


# Create your models here.

class PLC(models.Model):
    name = models.CharField(max_length=50)
    ip_address = models.GenericIPAddressField(protocol='IPv4')
    slave_number = models.PositiveSmallIntegerField(unique=True)
