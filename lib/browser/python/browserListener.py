#!/usr/bin/env python
import webkit, gtk, glib, threading, Queue, os, sys, zerorpc
#gobject.threads_init()

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

	def delete_event(self, widget, event, data=None):
		return False

	def __init__(self, title, url, makeToolbar=False, fullscreen=False):
		threading.Thread.__init__(self)
		self.win = gtk.Window(gtk.WINDOW_TOPLEVEL)
		self.win.set_resizable(True)
		self.win.connect("delete_event", self.delete_event)
		#self.win.connect('destroy', lambda w: gtk.main_quit())
		self.win.set_title(title)
		
		if (fullscreen):
			self.win.maximize()
			#self.win.fullscreen()

		self.web = webkit.WebView()
		

		if (makeToolbar):
			self.addToolbar()
			self.web.load_uri(url)
		else:
			self.makeUI()
			self.web.load_uri(url)
			self.win.add(self.web)

		self.win.show_all()

	def makeUI(self):
		global w, h
		self.win.set_decorated(False)
		self.win.set_default_size(200, 350)
		self.win.move(w - 200, h - 350)
		self.win.set_opacity(0.8)
		self.screen = self.win.get_screen()
		colormap = self.screen.get_rgba_colormap()
		if (colormap is not None and self.screen.is_composited()):
			self.win.set_colormap(colormap)

		self.web.set_transparent(True)


	def addToolbar(self):
		self.toolbar = gtk.Toolbar()

		self.back_button = gtk.ToolButton(gtk.STOCK_GO_BACK)
		self.back_button.connect("clicked", self.go_back)
		self.forward_button = gtk.ToolButton(gtk.STOCK_GO_FORWARD)
		self.forward_button.connect("clicked", self.go_forward)
		self.refresh_button = gtk.ToolButton(gtk.STOCK_REFRESH)
		self.refresh_button.connect("clicked", self.refresh)

		self.toolbar.add(self.back_button)
		self.toolbar.add(self.forward_button)
		self.toolbar.add(self.refresh_button)

		self.url_bar = gtk.Entry()
		self.url_bar.connect("activate", self.on_active)

		self.web.connect("load_committed", self.update_buttons)

		self.scroll_window = gtk.ScrolledWindow(None, None)
		self.scroll_window.add(self.web)

		self.vbox = gtk.VBox(False, 0)
		self.vbox.pack_start(self.toolbar, False, True, 0)
		self.vbox.pack_start(self.url_bar, False, True, 0)
		self.vbox.add(self.scroll_window)

		self.win.add(self.vbox)
		self.win.set_default_size(1060, 800)

	def on_active(self, widge, data=None):
		url = self.url_bar.get_text()
		try:
			url.index("://")
		except:
			url = "http://"+url
		self.url_bar.set_text(url)
		self.web.load_uri(url)

	def go_back(self, widget, data=None):	
		self.web.go_back()

	def go_forward(self, widget, data=None):
		self.web.go_forward()

	def refresh(self, widget, data=None):
		self.web.reload()

	def update_buttons(self, widget, data=None):
		self.url_bar.set_text( widget.get_main_frame().get_uri() )
		self.back_button.set_sensitive(self.web.can_go_back())
		self.forward_button.set_sensitive(self.web.can_go_forward())


# BROWSER - interface for node
class Browser(object):
	keyboard = False

	def newTab(self, url):
		global tabs, currentTab
		if (url == None):
			url = "http://google.com"
		gtk.threads_enter()
		try:
			tab = Tab(str(len(tabs)), url, True, True)
		except (KeyboardInterrupt, SystemExit):
			cleanup_stop_thread();
			sys.exit()
		#tab = Tab(str(len(tabs)), url, True, True)
		tabs.append(tab)
		currentTab = len(tabs) - 1
		tabs[currentTab].web.grab_focus()
		gtk.threads_leave()
		return "PY BROWSER: New Tab done"

	def switchTab(self, d):
		global tabs, currentTab
		if (currentTab < 1):
			if (d < 0):
				currentTab = len(tabs) - 1
				d = 0
		elif (currentTab >= (len(tabs) - 1)):
			if (d > 0):
				currentTab = 0
				d = 0
		currentTab = currentTab + int(d)
		gtk.threads_enter()
		tabs[currentTab].win.present()
		tabs[currentTab].web.grab_focus()
		gtk.threads_leave()
		return "PY BROWSER: Change Tab done"

	def toggleKeyboard(self):
		if (not self.keyboard):
			os.system("./lib/browser/sh/onboard_show.sh")
			self.keyboard = True
		else:
			os.system("./lib/browser/sh/onboard_hide.sh")
			self.keyboard = False
		return "PY BROWSER: toggleKeyboard done"

	def go(self, url):
		global tabs, currentTab
		if (url == None):
			url = "http://espn.go.com"
		gtk.threads_enter()
		tabs[currentTab].web.load_uri(url)
		gtk.threads_leave()
		return "PY BROWSER: Go done"

	def quit(self):
		global tabs
		# for tab in tabs:
		# 	loadQueue(lambda: tab.win.destroy())
		loadQueue(lambda: gtk.main_quit())
		loadQueue(lambda: gsys.exit())
		return "PY BROWSER: quit done"

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

#glib.thread_init()
gtk.gdk.threads_init()

tabs = []
currentTab = 0
w = 0
h = 0
callbackQueue = Queue.Queue()

def loadQueue(function):
	callbackQueue.put(function)

def readQueue():
	while True:
		try:
			callback = callbackQueue.get(False)
		except Queue.Empty:
			break
		callback()

def initWindows():
	global tabs, currentTab, w, h
	# Browser tab
	tab = Tab("0", "http://127.0.0.1:3000/", True, True)
	tabs.append(tab)

	# Grab window dimentions
	w = tab.win.get_screen().get_width()
	h = tab.win.get_screen().get_height()

	# UI Window
	ui = Tab("ui", 'http://127.0.0.1:3000/menu')
	ui.win.set_name('ui-win')
	ui.win.set_keep_above(True)
	# style_provider = gtk.CssProvider()

	# css = open('./public/css/uiWindow.css', 'rb')
	# css_data = css.read()
	# css.close()

	# style_provider.load_from_data(css_data)

	# Gtk.StyleContext.add_provider_for_screen(
	#     Gdk.Screen.get_default(), style_provider,     
	#     Gtk.STYLE_PROVIDER_PRIORITY_APPLICATION
	# )


# Initiate starting windows
initWindows()
os.system("./lib/browser/sh/onboard_init.sh")

# Browser to node communication thread
b = BrowserCom()
b.start()

# Gtk thread
gtk.threads_enter()
gtk.main()
# try: 
# 	gtk.main() 
# except KeyboardInterrupt: 
# 	gtk.main_quit()
gtk.threads_leave()

