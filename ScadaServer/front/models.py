from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

import socket
from umodbus import conf
from umodbus.client import tcp

# Enable values to be signed (default is False).
conf.SIGNED_VALUES = True
port = 8502


# Create your models here.

class PLC(models.Model):
    name = models.CharField(max_length=50)
    ip_address = models.GenericIPAddressField(protocol='IPv4')
    slave_number = models.PositiveSmallIntegerField(unique=True)

    # Method use to simplify the request for others methods
    def __doRequest(self, message):
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.connect((self.ip_address, port))

        response = tcp.send_message(message, sock)
        sock.close()
        return response

    # Words Methods
    def readWord(self, address):
        return self.readWords(address, 1)

    def readWords(self, address, length):
        message = tcp.read_holding_registers(self.slave_number, address, length)
        response = self.__doRequest(message)
        return response

    def writeWord(self, address, value):
        return self.writeWords(address, [value])

    def writeWords(self, address, values):
        message = tcp.write_multiple_registers(self.slave_number, address, values)
        response = self.__doRequest(message)
        return response

    # Bits Methods

    def readBit(self, address):
        return self.readBits(address, 1)

    def readBits(self, address, length):
        message = tcp.read_coils(self.slave_number, address, length)
        response = self.__doRequest(message)
        return response

    def writeBit(self, address, value):
        message = tcp.write_single_coil(self.slave_number, address, value)
        response = self.__doRequest(message)
        return response

    def writeBits(self, address, values):
        message = tcp.write_multiple_coils(self.slave_number, address, values)
        response = self.__doRequest(message)
        return response

    def __str__(self):
        return self.name + " (id " + str(self.id) + ")"


class Surpresseur(PLC):
    pression = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(65535)])


class Measure(models.Model):
    class Meta:
        unique_together = ('PLC', 'address', 'is_bit')

    PLC = models.OneToOneField(PLC, on_delete=models.CASCADE)
    address = models.IntegerField()
    is_bit = models.BooleanField()
    name = models.CharField(max_length=255)
    length = models.IntegerField()

    def __str__(self):
        return self.name


class MeasureValue(models.Model):
    measure = models.OneToOneField(Measure, on_delete=models.CASCADE)
    value = models.TextField()
    value_type = models.CharField(max_length=30)
    update_time = models.DateTimeField()
