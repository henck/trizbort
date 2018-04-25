---
layout: post
title:  "Premilinary export to Inform7"
date:   2018-04-25 10:37:09 +0200
categories: trizbort update
---
Trizbort.io can now exports maps to Inform 7 format. It can deal with rooms and connections - even in cases where the connection is angled, .e.g. going west takes you from A to B, but from B you need to go north to get to A. Work is in progress on one-way connections and objects.

Here is a sample snippet of Inform 7 code generation.

{% highlight i7 %}
"Untitled map" 

Part West of house

There is a room called West of house. 
The player is in West of house.
North of West of house is west of North of house.
South of West of house is west of South of house.
Southwest of West of house is northeast of Stone Barrow.
West of West of house is southeast of Forest 1.

Part North of house

There is a room called North of house. 

West of North of house is north of West of house.
East of North of house is north of Behind house.
North of North of house is south of Forest Path.

Part Behind house

There is a room called Behind house. 

North of Behind house is east of North of house.
South of Behind house is east of South of house.
West of Behind house is east of Kitchen.
East of Behind house is west of Clearing B.

Part South of house

There is a room called South of house. 

East of South of house is south of Behind house.
West of South of house is south of West of house.
South of South of house is northwest of Forest 3.

Part Living room

There is a room called Living room. 

East of Living room is west of Kitchen.

Part Kitchen

There is a room called Kitchen. 

West of Kitchen is east of Living room.
North of Kitchen is south of Attic.
East of Kitchen is west of Behind house.

Part Attic

There is a room called Attic. It is dark.

South of Attic is north of Kitchen.

Part Clearing B

There is a room called Clearing B. 

West of Clearing B is east of Behind house.
North of Clearing B is south of Forest 2.
South of Clearing B is north of Forest 3.
Southeast of Clearing B is northwest of Canyon View.

Part Forest 2

There is a room called Forest 2. 

South of Forest 2 is north of Clearing B.
East of Forest 2 is west of Forest 4.
East of Forest 2 is north of Forest 4.
East of Forest 2 is south of Forest 4.
Northwest of Forest 2 is east of Clearing A.
West of Forest 2 is east of Forest Path.

Part Forest 4

There is a room called Forest 4. 

West of Forest 4 is east of Forest 2.
North of Forest 4 is east of Forest 2.
South of Forest 4 is east of Forest 2.

Part Stone Barrow

There is a room called Stone Barrow. 

Northeast of Stone Barrow is southwest of West of house.
West of Stone Barrow is east of Inside the Barrow.

Part Inside the Barrow

There is a room called Inside the Barrow. 

East of Inside the Barrow is west of Stone Barrow.

Part Forest 3

There is a room called Forest 3. 

North of Forest 3 is south of Clearing B.
Northwest of Forest 3 is south of South of house.
East of Forest 3 is west of Canyon View.

Part Canyon View

There is a room called Canyon View. 

Northwest of Canyon View is southeast of Clearing B.
West of Canyon View is east of Forest 3.
South of Canyon View is north of Rocky Ledge.

Part Rocky Ledge

There is a room called Rocky Ledge. 

North of Rocky Ledge is south of Canyon View.
South of Rocky Ledge is west of Canyon Bottom.

Part Canyon Bottom

There is a room called Canyon Bottom. 

West of Canyon Bottom is south of Rocky Ledge.
North of Canyon Bottom is southwest of End of Rainbow.

Part End of Rainbow

There is a room called End of Rainbow. 

Southwest of End of Rainbow is north of Canyon Bottom.

Part Forest 1

There is a room called Forest 1. 

Southeast of Forest 1 is west of West of house.
East of Forest 1 is west of Forest Path.
North of Forest 1 is west of Clearing A.

Part Forest Path

There is a room called Forest Path. 

South of Forest Path is north of North of house.
West of Forest Path is east of Forest 1.
North of Forest Path is south of Clearing A.
Northeast of Forest Path is southwest of Up a Tree.
East of Forest Path is west of Forest 2.

Part Clearing A

There is a room called Clearing A. 

South of Clearing A is north of Forest Path.
West of Clearing A is north of Forest 1.
East of Clearing A is northwest of Forest 2.

Part Up a Tree

There is a room called Up a Tree. 

Southwest of Up a Tree is northeast of Forest Path.
{% endhighlight %}
