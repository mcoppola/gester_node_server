#!/usr/bin/env python

import webkit, Gtk, os

transparent_window_style_provider = Gtk.CssProvider()

def load_finished(web):
    js = 'alert("a");'
    b.execute_script(js)

winA = Gtk.Window()
winA.fullscreen()
winA.connect('destroy', lambda w: Gtk.main_quit())

winB = Gtk.Window()
winB.fullscreen()
winB.set_keep_above(1)
winB.set_opacity(0.33)
winB.connect('destroy', lambda w: Gtk.main_quit())


webA = webkit.WebView()
webB = webkit.WebView()

webB.set_transparent(1)
webA.load_uri("https://www.google.com")
webB.open("file:///home/ubuntu/gester/static/menu.html")


winA.add(webA)
winA.show_all()

winB.add(webB)
winB.show_all()
Gtk.main()
