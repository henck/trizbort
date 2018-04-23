---
layout: post
title:  "Premilinary export to TADS"
date:   2018-04-23 10:37:09 +0200
categories: trizbort update
---
Trizbort.io is now able to export your map straight to TADS .t format. The export includes rooms, connections and objects in the rooms. Notes and blocks play no role in TADS (or any other adventure design system). Under the hood, [Handlebars][handlebars] templates are used to generate all the code, which makes it simple to add additional code generators (with an understanding of
the language involved first).

Here is a sample snippet of TADS code generation.

{% highlight c %}
#charset "us-ascii"

#include <tads.h>
#include "advlite.h"

versionInfo : GameID
  name = 'Deadly Cave Adventure'
  byline = 'By a Trizbort.io user'
  version = '1'
  desc = ''
;

OutsideCave: Room 'Outside Cave'
  description = "You are standing outside a dark, forboding cave. "
  north = EntryChamber
;

+ lamp: Item 'lamp'
  description = "An old-fashioned oil lamp. Rusty but servicable. "
;

me: Actor
  location = OutsideCave
;

gameMain: GameMainDef
  initialPlayerChar = me
;
{% endhighlight %}

<!-- Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll Talk][jekyll-talk].

[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/ -->
[handlebars]:  https://handlebarsjs.com/