import serial, time, sys

keyboard = False
time.sleep(2) # wait
arduino = serial.Serial('/dev/ttyACM0', 9600)
while 1:
	sensorValue = arduino.readline()
	if (("yUp" in sensorValue) or ("yDn" in sensorValue)):
		if (not keyboard):
			print "keyboard open"
			sys.stdout.flush()
			arduino.write("1")
			keyboard = True
		else:
			print "keyboard close"
			sys.stdout.flush()
			arduino.write("0")
			keyboard = False
	print sensorValue
	sys.stdout.flush()
