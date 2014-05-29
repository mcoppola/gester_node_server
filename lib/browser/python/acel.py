import serial, time, sys

keyboard = False
time.sleep(2) # wait
arduino = serial.Serial('/dev/ttyACM0', 9600)
while 1:
	sensorValue = arduino.readline()
	if (("yUp" in sensorValue) || ("yDn" in sensorValue)):
		if (not keyboard):
			arduino.write("1")
			keyboard = True
		else 
			arduino.write("0")
			keyboard = False
	print sensorValue
	sys.stdout.flush()
