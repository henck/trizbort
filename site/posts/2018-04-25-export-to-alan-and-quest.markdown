---
layout: post
title:  "Code generation for Alan and Quest"
date: 2018-04-25
categories: trizbort update
---
Trizbort.io can now generate code for the Alan (both versions 2 and 3) and Quest adventure design systems, complete with rooms, connections and objects. The resulting code is ready for compilation with Alan, and can be imported straight into the Quest editor.

Alan 2 snippet:

{% highlight "text" %}
LOCATION WestOfHouse NAME West of house
  DESCRIPTION
    "You are standing in an open field west of a white house, with a boarded front door."
  EXIT north TO NorthOfHouse.
  EXIT south TO SouthOfHouse.
  EXIT southwest TO StoneBarrow.
  EXIT west TO Forest1.
END LOCATION.
START AT WestOfHouse.

OBJECT Mailbox NAME 'mailbox'  AT WestOfHouse
END OBJECT.
{% endhighlight %}

Alan 3 snippet:

{% highlight "text" %}
The WestOfHouse Isa location
  Name 'West of house'
  Description
    "You are standing in an open field west of a white house, with a boarded front door."
  Exit north To NorthOfHouse.
  Exit south To SouthOfHouse.
  Exit southwest To StoneBarrow.
  Exit west To Forest1.
End The WestOfHouse.

The Mailbox Isa object At WestOfHouse
  Name 'mailbox' 
End The Mailbox.
{% endhighlight %}

Quest snippet:

{% highlight "xml" %}
<!--Saved by Trizbort.io -->
<asl version="550">
  <include ref="English.aslx" />
  <include ref="Core.aslx" />
  <game name="Zork">
    <gameid>9bb19c30-fec2-492b-b3f3-3a94e624b662</gameid>
    <version>1.0</version>
    <firstpublished>2018</firstpublished>
  </game>
  <object name="West of house">
    <inherit name="editor_room" />
    <description>You are standing in an open field west of a white house, with a boarded front door.</description>
    <object name="player">
      <inherit name="editor_object" />
      <inherit name="editor_player" />
    </object>  
    <exit alias="north" to="North of house">
      <inherit name="northdirection" />
    </exit>
    <exit alias="south" to="South of house">
      <inherit name="southdirection" />
    </exit>
    <exit alias="southwest" to="Stone Barrow">
      <inherit name="southwestdirection" />
    </exit>
    <exit alias="west" to="Forest (1)">
      <inherit name="westdirection" />
    </exit>
    <object name="mailbox">
      <inherit name="editor_object" />
    </object>
  </object>
</asl>
{% endhighlight %}
