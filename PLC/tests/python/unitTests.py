from plcClass import *


#Creation of a local PLC
api = Plc("automate 1 ","localhost",1)

# Values ARRAYS
bits = [1,1,0,1]
words = [123,124,10,29]

testSuccess = []

def conditionChecker(condition):
    testSuccess.append(("success" , "fail") [condition])
    print(testSuccess[-1])

#Test of Requests
print("----------------------------")
print("TEST 1")
print("----------------------------")
print("Sending a writeBit request at the address 1, value = ",bits[0])
response = api.writeBit(bits[0],1)
print("Response = " , response)
#Return the number of writed coils if success
successCondition = response == "1"

conditionChecker(successCondition)

print("----------------------------")
print("TEST 2")
print("----------------------------")
print("Sending a writedBits request at the address 2, values = ", bits[1:])
response = api.writeBits(2,bits[1:])
print("Response = " ,response)
#Return the number of writed coils if success
successCondition = response == "3"
conditionChecker(successCondition)


print("----------------------------")
print("TEST 3")
print("----------------------------")
print("Sending a readBit request at the address 1")
response = api.readBit(1)
print("Response = " ,response)
#Return the coil writed previously
successCondition = response == bits[0]
conditionChecker(successCondition)

print("----------------------------")
print("TEST 4")
print("----------------------------")
print("Sending a readBits request at the address 1, length of 4")
response = api.readBits(1,4)
print("Response = " ,response)

#Return the coils writed previously
successCondition = response == bits
conditionChecker(successCondition)


print("----------------------------")
print("TEST 5")
print("----------------------------")
print("Sending a writeWord request at the address 1, value = ",words[0])
response = api.writeWord(1,words[0])
print("Response = " ,response)
#Return the number of writed words if success
successCondition = response == "1"
conditionChecker(successCondition)

print("----------------------------")
print("TEST 6")
print("----------------------------")
print("Sending a writedWords request at the address 2, values = ",words[1:])
response = api.writeWords(2, words[1:])
print("Response = " ,response)
#Return the number of writed words if success
successCondition = response == "3"
conditionChecker(successCondition)

print("----------------------------")
print("TEST 7")
print("----------------------------")
print("Sending a readWord request at the address 1")
response=api.readWord(1)
print("Response = " ,response)
#Return the word writed previously
successCondition = response == words[0]
conditionChecker(successCondition)

print("----------------------------")
print("TEST 8")
print("----------------------------")
print("Sending a readWords request at the address 1, length of 3")
response = api.readWords(1,4)
print("Response = " ,response)
#Return the words writed previously
successCondition = response == words
conditionChecker(successCondition)

print("")
print("----------------------------")
print("Results")
print("----------------------------")
for i in range(8):
    print("Test n°",i+1," ====>",  testSuccess[i])

print("----------------------------")
print("Succesfull tests:", testSuccess.count("success"))
print("Failed tests:", testSuccess.count("fail"))
