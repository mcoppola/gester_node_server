#!/usr/bin/env python

# Listener for browser commands

import webkit, gtk, os, zerorpc

class WebView(webkit.WebView):
	def get_html(self):
		self.execute_script('oldtitle="document.title;document.title=document.documentElement.innterHTML;')
		html = self.get_main_frame().get_title()
		self.execute_script('document.title=oldtitle')
		return html
	def load_finished(web):
		js = 'alart("a");'
		b.execute_script(js)

class Tab(object):


	def __init__(self, title="0", url=""):
		self.win = gtk.Window()
		#self.win.fullscreen()
		self.win.connect('destroy', lambda w: gtk.main_quit())
		self.win.set_title(title)

		self.web = webkit.WebView()
		self.web.load_uri(url)

		self.win.add(self.web)
		self.win.show_all()


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


# BROWSER - communicates with node

class Browser(object):

	tabs = [];
	currentTab = 0;

	# We are going to start with 2 windows
	# One for the UI and One for browsing
	def init(self):
		#transparent_window_style_provider = gtk.CssProvider()

		mainTab = Tab("1", "https://www.google.com")
		mainTab.addToolbar()
		self.tabs.append(mainTab)
		print 'winA'

		uiWin = Tab("0", "127.0.0.1:3000/menu")
		#webB.open("file:///home/ubuntu/gester/static/menu.html")

		#scroll_window = gtk.ScrolledWindow(None, None)
		#scroll_window.add(webA)
		
		gtk.main()
		return "Browser: init done"



	def newTab(self, url=""):
		tab = Tab(str(len(self.tabs)), url)
		self.tabs.append(tab)
		return "New Tab done"






# Open port for communitcation with node
s = zerorpc.Server(Browser())
s.bind("tcp://0.0.0.0:4242")
s.run()