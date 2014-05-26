import serial, time, sys

time.sleep(2) # wait
arduino = serial.Serial('/dev/ttyACM0', 9600)
while 1:
	sensorValue = arduino.readline()
	print sensorValue
	sys.stdout.flush()
