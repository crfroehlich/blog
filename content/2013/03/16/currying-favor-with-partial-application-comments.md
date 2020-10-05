---
title: 'Currying Favor with Partial Application to get JavaScript SQL'
date: 2013-03-16T21:16:00.000-05:00
draft: false
aliases: [ "/2013/03/currying-favor-with-partial-application.html" ]
---

#### Very elegant API.  
  
There is a bug in your cu...
[Thomas Burette]( "noreply@blogger.com") - <time datetime="2013-03-17T02:04:07.779-05:00">Mar 0, 2013</time>

Very elegant API.  
  
There is a bug in your curryLeft function, you pass args twice. The line  
  
return func.apply(this, args.concat(args, slice.call(arguments, 0)));  
  
should be  
  
return func.apply(this, args.concat(slice.call(arguments, 0)));  
  
Also you don't need the curryLeft in the query function : you get the \_query value from the this, not from the arguments.
<hr />
#### Thanks Thomas, you are correct. I fixed the bug in...
[Christopher Froehlich](http://www.blogger.com/profile/14416324318396615662 "noreply@blogger.com") - <time datetime="2013-03-17T12:17:20.823-05:00">Mar 0, 2013</time>

Thanks Thomas, you are correct. I fixed the bug in curryLeft and changed the query. Thanks for the spot check.
<hr />
#### BTW modern browsers (IE9 and later, Chrome, Firefo...
[Daniel](http://www.blogger.com/profile/11384619047799752406 "noreply@blogger.com") - <time datetime="2013-03-22T14:26:33.571-05:00">Mar 5, 2013</time>

BTW modern browsers (IE9 and later, Chrome, Firefox) have map, filter and reduce (same as fold) built into the Array object, as already standardized in ES5.
<hr />
#### This is an interesting bit of code. As an alternat...
[Mani Tadayon](http://www.blogger.com/profile/13959643072897047166 "noreply@blogger.com") - <time datetime="2013-03-24T02:33:05.439-05:00">Mar 0, 2013</time>

This is an interesting bit of code. As an alternative, you can use Array.map for a similar result:  
  
people.map(function(o){ return \[o.FirstName, o.LastName\] });  
  
https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global\_Objects/Array/map
<hr />
#### Yes, it's true; but using the built-ins doesn&...
[Christopher Froehlich](http://www.blogger.com/profile/14416324318396615662 "noreply@blogger.com") - <time datetime="2013-03-26T19:15:53.427-05:00">Mar 2, 2013</time>

Yes, it's true; but using the built-ins doesn't make the use of partial application obvious enough. I'm not suggesting that anyone rewrite what has already been well written; my methods are merely here to support the overall idea.  
  
Further, Object implements none of the Array iterators/mutators, and as I build out this SQL sementantic in future posts, we'll need some abstracted methods to keep the blogging sane.  
  
Regardless, you are correct. Very many of the partial app methods that you'd want to use are either already in ES5 amd ES6 or part of a mature 3rd party library.
<hr />
#### Absolutely, I don't think it wise to roll-your...
[Christopher Froehlich](http://www.blogger.com/profile/14416324318396615662 "noreply@blogger.com") - <time datetime="2013-03-26T19:18:39.260-05:00">Mar 2, 2013</time>

Absolutely, I don't think it wise to roll-your-own methods when proven alternatives exist already. I mainly used these as a way to identify how partial application works in the scope of my prototype; and I think they will continue to be useful as I expand the SQL semantic prototype out.
<hr />
