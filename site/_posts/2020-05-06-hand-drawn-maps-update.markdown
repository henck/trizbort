---
layout: post
title:  "Introducing hand-drawn maps"
date:   2020-05-06 09:20 +0200
categories: trizbort update
---
One feature that Trizbort.io was lacking was a hand-drawn style for its maps. A friendly developer named **Paolo Sfredda** has now created this functionality, among much else. 

![Hand-drawn maps]({{ "/assets/hand-drawn.png" | absolute_url }})

<!--more-->

Here is a list of changes:

* Hand-drawn theme.
* Multi-layer canvas: the canvas now only updates when you make a change (rather than running on a timer) so that Trizbort.io is now much faster.
* Toolbar buttons remain highlighted once selected.
* <kbd>Shift</kbd> + <kbd>Enter</kbd> centers the map.
* The current map name and author appear in the header.
* The mouse pointer gives visual feedback when over a room, note or block.
* Bugfix: there was a bug drawing object lists with child objects
* Bugfix: object lists would be duplicated when copy-pasting a room

To use the hand-drawn theme, go to _Settings_ -> _Render settings_, then pick _Hand Drawn_ from the list of Quick Themes.

[Try it out!](/app/index.html){:class="btn"}






