#! /bin/bash


dbus-send --type=method_call --dest=org.onboard.Onboard /org/onboard/Onboard/Keyboard org.onboard.Onboard.Keyboard.Show 
xinput set-mode 9 ABSOLUTE
