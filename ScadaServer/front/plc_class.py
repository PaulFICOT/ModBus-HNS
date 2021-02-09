#!/usr/bin/env python
import socket
from umodbus import conf
from umodbus.client import tcp

# Enable values to be signed (default is False).
conf.SIGNED_VALUES = True

class Plc_connection:
    def __init__(self, name, ipAddr, slaveNbr):
        self.name = name
        self.ipAddr = ipAddr
        self.slaveNbr = slaveNbr
        self.port = 8502

    #Method use to simplify the request for others methods
    def __doRequest(self,message):
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.connect((self.ipAddr, self.port))

        response = tcp.send_message(message, sock)
        sock.close()
        return response



    # Words Methods

    def readWord(self,address):
        return self.readWords(address,1)[0]

    def readWords(self,address,length):
        message = tcp.read_holding_registers(self.slaveNbr, address,length)
        response = self.__doRequest(message)
        return response

    def writeWord(self,address,value):
        return self.writeWords(address,[value])

    def writeWords(self,address, values):
        message = tcp.write_multiple_registers(self.slaveNbr, address, values)
        response = self.__doRequest(message)
        return response



    #Bits Methods

    def readBit(self,address):
        return self.readBits(address,1)[0]


    def readBits(self, address, length):
        message = tcp.read_coils(self.slaveNbr, address, length)
        response = self.__doRequest(message)
        return response

    def writeBit(self,address,value):
        message = tcp.write_single_coil(self.slaveNbr, address, value)
        response = self.__doRequest(message)
        return response

    def writeBits(self,address,values):
        message = tcp.write_multiple_coils(self.slaveNbr, address, values)
        response = self.__doRequest(message)
        return response
