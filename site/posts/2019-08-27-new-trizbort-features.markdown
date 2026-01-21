---
layout: post
title:  "New Trizbort.io features"
date: 2019-08-27
categories: trizbort update
---
There've been many updates to Trizbort.io over the past months, and I'd like to take a moment to list
some of them here. Since Trizbort.io is now on Github, there have been wonderful contributions from
several developers, making the application steadily better.

### Important bugfixes

* **Panning the map** - Previously, the map could only be panned by holding down the mouse wheel. This
may not have been the best design choice, since it's not obvious, and not everyone has a clickable 
mouse wheel. It's now possible to drag the map by holding down the right mouse button, as well.

* **Chrome file loading** - It was reported that Chrome would only allow the user to load a map once,
then allow no further loads. This has now been fixed.

* **Object containment relationships** - It's always been possible to organize objects in a containment relationship (e.g. the wooden chest contains an envelope, which in turn contains a small key), but it wasn't
obvious how it should be done in the user interface (hint: dragging an object into another object). Worse,
dragging failed to work on Chrome. This has now been fixed, and a tutorial has now been added to point out
the dragging possibility.

### New features

* **Code generation for object containment** - Authoring system languages that support object containment
now have their code exported with containment relations (TADS, Inform, Quest). Also, the YAML export
feature takes object relationships into account.

* **Image export** - The full map can now be exported to an image of any size, large enough to accommodate
all the map elements, i.e. you can now make a poster out of it. There was a bug with export only working
if there was a room in the precise center of the map, but that's been fixed. Curved paths are neatly contained
within the map, and not chopped off.

* **Navigation** - The application main menu has been reorganized to provide a better overview of the available options.

* **Tutorial system** - Originally, Trizbort.io came with no instructions, and users were expected to 
simply figure out how it all worked. We've now added a tutorial system that pops up occasional messages with
helpful hint. In particular object containment was a non-obvious feature.

* **YAML support** - Trizbort.io can now export maps to YAML, which can be useful if your development pipeline can easily consume YAML (rather than JSON, which is Trizbort.io's default save format). I've read about a team using Trizbort.io to create maps for their adventuring system, and they wrote a Python script
to convert JSON to their format. Perhaps this will be useful to them.

* **ZIL support** - Trizbort.io always claimed that one day it would support ZIL code generation. There is now an implementation for that.


