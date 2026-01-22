---
layout: post
title: "Major Trizbort.io Update"
date: 2026-01-22
categories: trizbort update
---

There's been a major update to Trizbort.io with numerous new features, 
improvements, and quality-of-life enhancements. 

<!--more-->

## New Features

##### SVG export

You can now export your maps as SVG files, giving you scalable vector graphics 
that look crisp at any size. Perfect for including maps in documents or 
printing at high resolution.

##### Inform 6 code generator

Trizbort.io now supports code generation for Inform 6, adding to the 
existing support for Inform 7, TADS 3, Quest, Alan 2/3, and other systems.

##### Markdown support

Note texts, room names and subtitles, and object names now support limited 
Markdown formatting, giving you more control over how your text appears on
the map. Note text also respects linefeeds now.

##### Map scrolling 

Navigate your maps more intuitively with mouse wheel zooming. Scroll up to 
zoom in, scroll down to zoom out.  In addition, the map canvas now features 
scrollbars for easier navigation, especially useful for larger maps. These
scrollbars appear only when the map is too big to fit inside the viewport.

##### Toast notifications

A new notification system provides helpful feedback when you perform actions 
like saving, exporting, or when errors occur.

##### Connection names in code generation

Connection names are now properly included in generated code, giving you more 
accurate output for your adventure game projects.

## Improvements

##### Cleaner map rendering

Removed the jitter effect from hand-drawn style rendering, resulting in 
cleaner, more stable-looking maps. Previously, the hand-drawn lines would
change form as the map was panned or zoomed.

##### Redesigned UI

- Animated menu transitions for a smoother experience
- Tooltips throughout the application for better discoverability
- Keyboard shortcuts have been refined to not interfere with text input
- Keyboard help has moved to the status bar
- Improved tool panel layout
- Better image export quality on high-DPI displays

##### Under the hood

The entire build system has been modernized, moving from Grunt (old!) to Vite. 
This results in faster development builds and a more maintainable codebase 
for contributors.

## Try it now

Head over to [the app](/app/index.html) to try out all the new features. 
As always, your maps are saved locally in your browser, and you can export 
them as JSON files for backup or sharing.
