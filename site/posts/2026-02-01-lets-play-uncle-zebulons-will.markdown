---
layout: post
title:  "Let's play: Uncle Zebulon's Will"
date: 2026-02-01
categories: walkthrough
---

Let's play _Uncle Zebulon's Will_, a small but solid text adventure.

<!--more-->

It's pretty amazing that TADS ("Text Adventure Design System") has been around 
for such a long time. Looking at the intro for _Uncle Zebulon's Will_, we're told 
that TADS is copyright 1993, 2012 by Michael J. Roberts -- thats's 19 years. 
TADS (well, TADS3) is still used today to develop text adventures, so that
makes it 33 years. _Uncle Zebulon_'s initial release year is 1995, first written 
then when TADS was celebrating its second birthday. 

On to the game. For an intro, we're told that:

  <blockquote>
  The news of your uncle Zebulon's death came as a shock.  You've been out of 
  touch lately, and since you left for college a year ago you haven't heard a 
  word from him.  During your childhood, however, your eccentric uncle - once 
  the black sheep of the family, an unsuccessful alchemist and self-proclaimed 
  wizard, reputed to be a very wealthy man - was your favourite relative.  
  Perhaps you were his favourite nephew as well.  You miss his stories of 
  distant realms and the magic gadgets he loved to demonstrate...
  </blockquote>

I looked up the name "Zebulon", and it is not a made-up name: it is 
a Hebrew name meaning "exalted house," "dwelling," or "honor". In the 
Bible, Zebulon was a son of Jacob and Leah. I wonder if knowing this
will help solve the game in any way? (EDIT: No, not at all)

At all events, our brave protagonist must visit the deceased uncle's house:

  <blockquote>
  You leave for home immediately on receiving the message, but the trip is long and you're delayed by the inevitable train strikes.  When you finally arrive, you find your family in a state of frustrated confusion.  Not only is your uncle's will written in a quite unsuitably sarcastic tone, seriously insulting most of your relatives, but it turns out there isn't much of an inheritance to fight over; despite a thorough search of your uncle's house, no fabulous treasures are found.  The bequests for you and your cousins are almost pathetic:  one small memento each, to be selected after everybody else have made their choices.  Yet what is there to lose?  At least you'd like to have one last look at uncle Zeb's house; maybe you'll find some treasure overlooked by the others, perhaps something magical...
  </blockquote>

After that introduction, I'm placed in the garden of the uncle's house, 
neatly restricting the story's action to the house alone. In this starting room,
the first thing I like to do is see what's implemented, and what's not. I'll
look at everything and see if there are any response. The depth of the 
implementation helps to understand what can be expected further on.

  <blockquote>
  You are standing just inside the gate of uncle Zebulon's garden, on the weed-infested gravel path that leads east up to the porch of the house.  On the north side of the lawn, almost hidden behind the huge, unkempt rosebushes, is the garden shed.  The bright summer sun glistens on the wet grass, and the air, fresh from the recent rain, is alive with the buzzing of insects and filled with sweet fragrances.
  </blockquote>

Looking at the **garden**, I get:

  <blockquote>
  Uncle Zebulon wasn't very much of a gardener, so the garden isn't exactly a 
  showpiece:  the lawn is shaggy, the flower beds full of weeds, the rose 
  bushes would need some trimming.  Still, it's a pleasant place on a summer 
  morning like this.
  </blockquote>

Interestingly, I can look at:

  <blockquote>
  > x garden<br/>
  > x flower beds<br/>
  > x rose bushes<br/>
  > x flower rose beds<br/>
  > x rose lawn
  </blockquote>

... and all give the same response. Clearly this was implemented as a 
large collection of nouns and adjectives, all belonging to the same object. 
It leads to my being able to combine adjectives and nouns nonsensically.
However, I can understand that there is no need to implement a separate
object for each decoration item. 

What is missing is the actual **gate** mentioned in the room description.
I can't look at that, but I can try to leave:

  <blockquote>
  You shouldn't leave now - you haven't even claimed your inheritance yet!
  </blockquote>

It is quite lovely that when I try to go south (a direction with no exit
from this room), I'm told:

  <blockquote>
  > S<br/>
  You can either enter the porch (to the east) or the shed (to the north), or 
  leave the garden via the gate (to the west).
  </blockquote>

I wonder if the game will do this for every room. We're really seeing two
good uses of what TADS calls a _travel barrier_: when the player tries to
go in a direction, rather than saying "You can't go that way," the game will
explain why. Here, it doesn't actually tell me why, instead giving me
alternative options.

Going north into the **shed**, I get a long room description, prefaced with:

  <blockquote>
  The shed door opens only reluctantly, with a creaking sound from the rusty hinges.
  </blockquote>

That particular messages only happens once, the first time I enter the shed.
That is a nice touch. 

The garden shed has been ransacked: its long room description mentions that
my dear uncle was though to make gold here, as alchemists do, and while
there was no proof of him ever having succeeded, but people seemed to think so.
The game goes out of its way to tell me there's a **statue of a three-eyed
dog** - it's pretty strongly telegraphed that this'll be important.

A **note** on a workbench tells me that old Zebulon actually did _not_ succeed
in making gold:

  <blockquote>
  "I'm a great step closer to the goal:  I have discovered an acid that 
  actually transmutes noble metals into base ones.  If only the process could 
  be reversed!"
  </blockquote>

... but we can be sure that this acid will be a puzzle.

I'll look at the dog statue first. It does indeed have three eyes, and
one of these contains a **blue glass lens**, which is stuck. I am beginning
to suspect that there may be other lenses to be found. Turning the dog's
left ear causes a beam of light to shine through the lens and onto the workbench.

Finding nothing further, I head back to the garden and toward the porch of
the house. I find it guarded by a mean-looking demon sitting in a rocking
chair.

  <blockquote>
  The demon is picking his claws with a rather nasty-looking dagger.
  </blockquote>

I love how that's phrased: the demon hasn't even opened its mouth yet, 
but already it's clear that it's not to be messed with. Looking at it, I
get:

  <blockquote>
  If you remember your Basic Demonology classes correctly, he must be a member of one of the lower castes of familiar demons, usually employed as servants by wizards. 
  </blockquote>

Well, if I went through Basic Demonology, then apparently in this game's world
there's quite a bit of wizarding going on, which puts uncle Zebulon's 
alchemistic tendencies in a new, much less odd light. Oh well. Walking past the demon, it stops me and tells me I'm allowed to take only
_one_ thing from the house. It also gives me a **letter**. I'm not allowed to pass
before taking the letter from the demon - another great use of a travel
barrier. 

The letter is from Zebulon, and he writes that while I was his favourite
nephew, I'm still being tested to see if I'm worthy of my inheritance.
_Follow the rules by the letter and you may find that new possibilities open up._
I don't yet see any rules spelled out in this letter, so perhaps that's
a clue pointing somewhere else.

Onwards, and into the house.

The house is quite empty; in the foyer there's just a **lead coin** on the floor.
The _lead_ is a major clue to my mind: this story is about an alchemist, and
the note in the garden shed mentioned converting noble metals to base ones.
There are doors in all directions, so I guess the action will be mostly inside
the house.

There's something to be said for the back story of Zebulon's relatives 
ransacking his house for valuables: most everything has been removed from
the rooms, saving the author the trouble of describing refrigerators, sofas,
stoves, etc., and focusing solely on the objects needed for the story.

In the kitchen I find a **carrot** and a **blue bottle** containing a **silver coin**.
I take the silver coin out of the bottle, which has an unsually wide neck.

Once again, going into a direction with no exit, I get:

  <blockquote>
  The only exit is the door back to the hall, to the south.
  </blockquote>

It's still a smart feature, making mapmaking (yes, I'm making map, even
though this is a tiny game) less frustrating.

In the study, I find a **green glass lens** (well, it's obvious where that's
needed, thinking back on the three-eyed dog with the blue lens stuck in one of
its eyes) and a crystal ball.

A piece of paper details what's probably the main sequence of puzzles in the
game:

  <blockquote>
  The FIRST PORTAL deceives us all<br/>
	By making pairs of singles<br/>
	A perfect match!  Yet all illusion<br/>
	A total likeness!  And yet<br/>
	As different as left from right<br/>
	Forever kept apart by glass<br/>
	Until the touch of magic stars<br/>
	Turns glass to air<br/>
	And image to reality<br/>
  <br/>
	When the light of the Moon illuminates<br/>
	The Sun that never shines<br/>
	Then open will the SECOND PORTAL<br/>
	A dark, forbidding one, that scares<br/>
	And rightly so!  Yet victory<br/>
	Awaits the one who enters it<br/>
  <br/>
	The THIRD and FINAL PORTAL stands<br/>
	In a lone and dreary waste beyond the worlds<br/>
	Gateway to great adventures<br/>
	Guarded by Gods of Time and War and Love<br/>
	An offering for each, and you may pass<br/>
	Each gift should match one guardian.
  </blockquote>

The **crystal ball** can be gazed into, and shows Zebulon putting coins in a bottle.
Is this a built-in hint system? I put my lead coin in the bottle, but nothing
special happens. Or perhaps this is a way of taking multiple items from the
house without the demon on the porch stopping me?

A little further on, in the living room, I find a **green bottle** labelled 
"fill me". I have a rising suspicion that whatever I put in the green bottle
will appear in the blue bottle. Let's put that to the test. Indeed, that
is exactly what happens. This'll be a way to sneak small objects past
the demon.

I also find a ma**gic wand**, revealed as soon as I sat in the only armchair
present - something the game strongly encouraged me to do. Pointing this
at the carrot turns it into a **tomato**: I'm told it is a wand of _vegetable polymorphism_!
There's also a large mirror in the living room. Remembering what Zebulon's
notes said about the "first portal", I'll point my wand at that, too. Success!
The mirror turns into a portal. Hm... this is surprisingly easy so far.

Reluctant to step through this portal right away, I decide to exlore the last
remaining room of the house first: the attic. Here, I find a **packing crate**
and a **bronze plate**. Inside the crate is a **red lens**, so now there are three
lenses in the game: blue, green and red. The bronze plate bears an engraving:

  <blockquote>
  GOLD    The Sun, Ruler of the Daylit Sky<br/>
	SILVER  Luna, Mistress of the Night<br/>
	MERCURY Wing-footed Messenger of the Gods<br/>
	COPPER  Venus, Carnal Love<br/>
	IRON    Mars, Blood-red Bringer of War<br/>
	TIN     Jupiter, Ruler of the Gods<br/>
	LEAD    Saturn, Lord of Time Itself
  </blockquote>

More references to metals. I also remember Zebulon's notes mentioning gifts
to be made to "the gods of time, war and love", so it's clear now what these
will be.

![Uncle Zebulon's Will map]({{ "/assets/zebulon-map.png" | absolute_url }})

That's it for the rooms of the house, though I haven't gone through the mirror
portal yet. I think I've collected everything
there was to be found; it also seems that the puzzle-solving will have to
be done in the garden shed. An obvious puzzle blocks me there: the demon
will let me leave with only one object. It's clear to me now that this object
will have to be the blue bottle, into which I can teleport things by putting
them into the green bottle. 

Let's put the demon to the test by carrying multiple objects. Indeed, it
won't let me pass. I'll carry just the blue bottle then, put I'll put a coin
inside it. That, too, the demon detects, and won't let me pass. Carrying
only the blue bottle is OK, though. This is an important choice, as I'm
not allowed to exchange it later!

First, I'll teleport the green lens and the red lens to the blue bottle,
which I've left in the shed. I'm pretty sure the lenses are useful only there,
and won't have to brought back into the house.

I insert the lenses into the three-eyed dog's eye sockets and they fit perfectly. 
Turning its left ear causes a beam of light (which is now, unsurprisingly, white, as 
it is a mix of red, green and blue) to shine onto the workbench, producing
an **image** of uncle Zebulon. Funnily enough, the image has a caption "TEST PICTURE".

The image doesn't do anything but sit there, and I can't speak to it. I'll
turn the dog's other ear. It turns out that this changed the channel on whatever
kind of project this is: I go from Zebulon's face to an aquarium with fish,
then a depiction of Zork, a starfield showing Gemini, with
the twin stars Castor and Pollux, and eventually the moon, which is projected
onto the bronze stand on the workbench. This points fairly strongly to the
_second portal_ mentioned in Zebulon's notes. Now I'll just need to find
"the sun that never shines" and teleport it here. It'll have to be small sun
to fit into a bottle, though.

Having nothing more to do - I am reluctant to teleport anything else out here,
since I may not be allowed to bring it back into the house - I decide to go
through the mirror portal. This takes me to _Moor gnittis_, which is clever,
though thankfully this word reversal isn't applied anywhere in the room's
description. I find a **small glass** flask here, containing greenish liquid.
Leaving the mirror-image sitting room through the door doesn't take me into
the foyer, but rather into a "Tower room".

The tower room is actually the top floor of a tower with windows in all directions,
looking out over a strange landscape - likely another world. In the distance
lies a city, with is "curiously devoid of life. If only you could get there
to investigate..." Hold your horses now, I've only just arrived!

There's a pedestal here, bearing a model of the solar system (which is a bit odd,
since I thought I was on another world now, in another star system, but perhaps
I'm just on another planet in _this_ solar system). The sun in this model
is represented by a **small golden ball**, which is obviously what I need for
the shed puzzle. I grab it.

There's also a **scroll**. I read it, and it's from Uncle Zebulon congratulating
me on having made it this far. All I've done is wave his magic wand
at a mirror, which any of my relatives could have done, but oh well. He writes
that this is the world of _Vhyl_ and the city is _Cyr-Dhool_, and that I'll want
to get there. The portal to _Vhyl_ is hidden though, and more puzzle solving
will be required to get there. Good thing too, because I wouldn't want
to think of my other uncle Phlatulentos the Third finding the magic mirror
and blundering into the magical city.  

There aren't any more rooms, so I'll just take the little gold ball
representing the sun to the shed (by teleporting is there using my 
trusty green bottle). Placing the gold ball on the bronze stand in the shed
causes a cold draught, and the door slams shut. Well, this was supposed to
open a "second portal"... which I suppose it does, because after a few turns,
the gold ball explodes, and a large hole appears in the workbench. I'm
also showered with 15 points, so the game is pleased with my progress.

Fearlessly (and saving my game), I jump into the hole. I takes me to an endless 
desert plain, in the middle of which sits a marble basin, three Greek statues
looming over it. These are statues of Venus, Mars and Saturn (who get their
Roman names although they're Greek statues), which is convenient because
they're in the short list of gods and their favourite metals I found on the 
bronze plate:

  <blockquote>
	COPPER  Venus, Carnal Love<br/>
	IRON    Mars, Blood-red Bringer of War<br/>
	LEAD    Saturn, Lord of Time Itself
  </blockquote>

There's also a **gold coin** in the basin, which I am prevented from taking. The
basin bears an inscription:

  <blockquote>
  "IN ME, O STRANGER, IS BOTH OBLIVION AND ADVENTURE;
  DRINK MY WATER AND THY QUEST SHALL END IN SAFETY;
  SACRIFICE AND THOU SHALT CONQUER."
  </blockquote>

Drinking the water causes amnesia, and the next thing I know I've left the house,
gone to college and become an accountant, albeit one with a nagging feeling that
I've missed out on something exciting. Clearly this is a game over scenario,
as no one wants to be an accountant. UNDO!

I've got a silver coin and a lead coin, while what I need is copper, iron
and lead. I remember the small flask with greenish liquid I found -- I figure
that's acid, and it may help me transmute my coins. After all, that's what
alchemists like uncle Zeb did for a living. I go back to the house and start
dipping coins.

Dipping the lead coin into the acid dissolves it completely, which is probably
not good at all. Dipping the silver coin transmutes it to iron though, and
that's probably good! I still don't have any copper coin, though.

Finding the copper coin was a bit of an odd puzzle. I looked through the items
I had that hadn't been useful before. Among these was a tomato. The only
obvious thing was to eat it, and it is was a copper coin. I don't see why
this was so.  

Going back to the basin, I throw all three coins in. Each Greek god speak
a few works, and each brings life to the desert plain I'm on: the smell of
the sea is on the sudden breeze, palm trees appear in the distance, and thousands
of stars come out. 

The **gold coin** that was lying in the basic was apparently just a hint: I never
get a chance to take it, as the game now ends immediately.

  <blockquote>
  And thus ends the story of uncle Zebulon's will.  Many adventures await you 
  in the city of Cyr-Dhool - but that's another story!<br/>
  ***** You have won *****<br/>
  In a total of 404 turns, you have achieved a score of 75 points out of a 
  possible 75, and visited 12 locations out of 12.
  </blockquote>


