#!/usr/bin/env python

# Listener for browser commands

import webkit, gtk, os, zerorpc

class Browser(object):

	tabs = [];
	currentTab = 0;

	# We are going to start with 2 windows
	# One for the UI and One for browsing
	def init():
		transparent_window_style_provider = gtk.CssProvider()
		winA = gtk.Window()
		winA.fullscreen()
		winA.connect('destroy', lambda w: gtk.main_quit())
		tabs.append(winA);

		winB = gtk.Window()
		winB.fullscreen()
		winB.set_keep_above(1)
		winB.set_opacity(0.33)
		winB.connect('destroy', lambda w: gtk.main_quit())

		webA = webkit.WebView()
		webB = webkit.WebView()

		webB.set_transparent(1)
		webA.load_uri("https://www.google.com")
		webB.open("file:///home/ubuntu/gester/static/menu.html")


		winA.add(webA)
		winA.show_all()

		winB.add(webB)
		winB.show_all()
		gtk.main()

	def newTab():
		win = gtk.Window()
		win.fullscreen()
		win.connect('destroy', lambda w: gtk.main_quit())
		tabs.append(win);



# Open port for communitcation with node
s = zerorpc.Server(Browser())
s.bind("tcp://0.0.0.0:4242")
s.run()