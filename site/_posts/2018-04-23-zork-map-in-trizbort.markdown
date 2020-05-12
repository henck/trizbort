---
layout: post
title:  "A Zork map in Trizbort.io"
date:   2018-04-23 10:37:09 +0200
categories: trizbort update
---
A good test case for Trizbort.io is drawing up a map of Zork. The original map contains lots of ideosyncracies for map drawing: angled connections, (nested) objects in the rooms, one-way passages, connectors that lead off the map, and a shaded block around the White House. 

[Open this map directly in Trizbort](/app/index.html?map=https://www.trizbort.io/app/maps/zork.json){:class="btn"}

![Original Zork map]({{ "/assets/zork-map-original.jpg" | absolute_url }})

This map was drawn with Trizbort.io:

![Zork map in Trizbort.io]({{ "/assets/zork-map-trizbort.jpg" | absolute_url }})

And here is the result of the TADS code generation:

{% highlight c %}
#charset "us-ascii"

#include <adv3.h>
#include <en_us.h>

versionInfo: GameID
  name = 'Zork'
  byline = 'by Trizbort.io'
  version = '1.0'
  desc = '"'

gameMain: GameMainDef
  initialPlayerChar = me

+ me: Actor
  location = WestOfHouse
;

WestOfHouse: Room 'West of house'
  ""
  north: NorthOfHouse
  south: SouthOfHouse
  southwest: StoneBarrow
  west: Forest1
;

+ Item 'Mailbox'
  ""
;

NorthOfHouse: Room 'North of house'
  ""
  west: WestOfHouse
  east: BehindHouse
  north: ForestPath
;

BehindHouse: Room 'Behind house'
  ""
  north: NorthOfHouse
  south: SouthOfHouse
  west: Kitchen
  east: Clearing
;

SouthOfHouse: Room 'South of house'
  ""
  east: BehindHouse
  west: WestOfHouse
  south: Forest3
;

LivingRoom: Room 'Living room'
  ""
  east: Kitchen
;

+ Item 'Trophy Case'
  ""
;

+ Item 'Lamp'
  ""
;

+ Item 'Sword'
  ""
;

Kitchen: Room 'Kitchen'
  ""
  west: LivingRoom
  north: Attic
  east: BehindHouse
;

+ Item 'Glass Bottle'
  ""
;

++ Item 'Brown Sack'
  ""
;

++ Item 'Block of cheese'
  ""
;

Attic: Room 'Attic'
  ""
  south: Kitchen
;

+ Item 'Rope'
  ""
;

+ Item 'Nasty Knife'
  ""
;

Clearing: Room 'Clearing'
  ""
  west: BehindHouse
  north: Forest2
  south: Forest3
  southeast: CanyonView
;

Forest2: Room 'Forest (2)'
  ""
  south: Clearing
  east: Forest4
  east: Forest4
  east: Forest4
  northwest: Clearing
  west: ForestPath
;

Forest4: Room 'Forest (4)'
  ""
  west: Forest2
  north: Forest2
  south: Forest2
;

StoneBarrow: Room 'Stone Barrow'
  ""
  northeast: WestOfHouse
  west: InsideTheBarrow
;

InsideTheBarrow: Room 'Inside the Barrow'
  ""
  east: StoneBarrow
;

Forest3: Room 'Forest (3)'
  ""
  north: Clearing
  northwest: SouthOfHouse
  east: CanyonView
;

CanyonView: Room 'Canyon View'
  ""
  northwest: Clearing
  west: Forest3
  south: RockyLedge
;

RockyLedge: Room 'Rocky Ledge'
  ""
  north: CanyonView
  south: CanyonBottom
;

CanyonBottom: Room 'Canyon Bottom'
  ""
  northnorthwest: RockyLedge
  north: EndOfRainbow
;

EndOfRainbow: Room 'End of Rainbow'
  ""
  southwest: CanyonBottom
;

Forest1: Room 'Forest (1)'
  ""
  southeast: WestOfHouse
  east: ForestPath
  north: Clearing
;

ForestPath: Room 'Forest Path'
  ""
  south: NorthOfHouse
  west: Forest1
  north: Clearing
  northeast: UpATree
  east: Forest2
;

Clearing: Room 'Clearing'
  ""
  south: ForestPath
  west: Forest1
  east: Forest2
;

+ Item 'Pile of Leaves'
  ""
;

UpATree: Room 'Up a Tree'
  ""
  southwest: ForestPath
;

+ Item 'Bird&#x27;s Nest'
  ""
;

++ Item 'Jewel-encrusted Egg'
  ""
;
{% endhighlight %}
