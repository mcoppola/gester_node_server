#!/usr/bin/env python

# Listener for browser commands

import webkit, gtk, glib, gobject, threading, os, zerorpc

#gobject.threads_init()

# class GtkThread(threading.Thread):

# 	def __init__(self):
# 		threading.Thread.__init__(self)

# 	def run(self):
# 		gtk.threads_enter()
# 		gtk.main()
# 		gtk.threads_leave()

# 	def update(self): 
# 		gtk.threads_enter()
# 		gtk.main()
# 		gtk.threads_leave()

# gtk.gdk.threads_init()
# g = GtkThread();
# g.start()

class WebView(webkit.WebView):
	def get_html(self):
		self.execute_script('oldtitle="document.title;document.title=document.documentElement.innterHTML;')
		html = self.get_main_frame().get_title()
		self.execute_script('document.title=oldtitle')
		return html

	def load_finished(web):
		js = 'alart("a");'
		b.execute_script(js)

class Tab(threading.Thread):

	def __init__(self, title="0", url=""):
		threading.Thread.__init__(self)
		self.win = gtk.Window()
		#self.win.fullscreen()
		self.win.connect('destroy', lambda w: gtk.main_quit())
		self.win.set_title(title)

		self.web = webkit.WebView()
		self.web.load_uri(url)

		self.win.add(self.web)
		self.win.show_all()

	# def run(self):
	# 	gtk.threads_enter()
	# 	gtk.main()
	# 	gtk.threads_leave()


	def addToolbar(self):
		toolbar = gtk.Toolbar()

		self.back_button = gtk.ToolButton(gtk.STOCK_GO_BACK)
		self.back_button.connect("clicked", self.go_back)
		self.forward_button = gtk.ToolButton(gtk.STOCK_GO_FORWARD)
		self.forward_button.connect("clicked", self.go_forward)

		self.refresh_button = gtk.ToolButton(gtk.STOCK_REFRESH)
		self.refresh_button.connect("clicked", self.refresh)

		toolbar.add(self.back_button)
		toolbar.add(self.forward_button)
		toolbar.add(self.refresh_button)

		#entry bar for typing in and display URLs, when they type in a site
		#and hit enter the on_active function is called
		self.url_bar = gtk.Entry()
		self.url_bar.connect("activate", self.on_active)

		#anytime a site is loaded the update_buttons will be called
		self.web.connect("load_committed", self.update_buttons)

	def on_active(self, tab, widge, data=None):
		url = self.url_bar.get_text()
		try:
			url.index("://")
		except:
			url = "http://"+url
		self.url_bar.set_text(url)
		self.web.open(url)

	def go_back(self, vi, widget, data=None):
		'''Webkit will remember the links and this will allow us to go
		   backwards.'''
		self.web.go_back()

	def go_forward(self, tab, widget, data=None):
		'''Webkit will remember the links and this will allow us to go
		   forwards.'''
		self.web.go_forward()

	def refresh(self, tab, widget, data=None):
		'''Simple makes webkit reload the current back.'''
		self.web.reload()

	def update_buttons(self, tab, widget, data=None):
		'''Gets the current url entry and puts that into the url bar.
		   It then checks to see if we can go back, if we can it makes the
		   back button clickable.  Then it does the same for the foward
		   button.'''
		self.url_bar.set_text( widget.get_main_frame().get_uri() )
		self.back_button.set_sensitive(self.web_view.can_go_back())
		self.forward_button.set_sensitive(self.web_view.can_go_forward())


# BROWSER - interface for node
class Browser(object):

	def newTab(self, url):
		global tabs, currentTab
		if (url == None):
			url = "http://google.com"
		gtk.threads_enter()
		tab = Tab("1", url)
		gtk.threads_leave()
		tabs.append(tab)
		currentTab = len(tabs)
		return "PY BROWSER: New Tab done"

	def changeTab(self, tab):
		return "done"

	def google(self):
		global tabs, currentTab
		tabs[currentTab].web.load_uri("https://google.com")
		return "PY BROWSER: google done"

	def go(self, url):
		global tabs, currentTab
		if (url == None):
			url = "http://espn.go.com"
		tabs[currentTab].web.load_uri(url)
		return "PY BROWSER: Go done"

# BROWSER COM - communicates with node
class BrowserCom(threading.Thread):

	def __init__(self):
		threading.Thread.__init__(self)
	
	def run(self):
		s = zerorpc.Server(Browser())
		s.bind("tcp://0.0.0.0:4242")
		s.run()


########################################
## ---- MAIN THREAD ----------------- ## 
########################################

tabs = []
currentTab = 0

gtk.gdk.threads_init()

def initWindows():
	global tabs, currentTab
	# Browser tab
	tab = Tab("0", "http://google.com")
	tab.addToolbar()
	tabs.append(tab)

	# UI Window
	ui = Tab("ui", 'http://127.0.0.1:3000/menu')


# Initiate starting windows
initWindows()

# Browser to node communication thread
b = BrowserCom()
b.start()

# Gtk thread
gtk.threads_enter()
gtk.main()
gtk.threads_leave()

