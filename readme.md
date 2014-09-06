Big Oh
======

In an attempt to learn about OpenLayers 3 and as a nod to the simplicity of
Leaflet I've decided to try to wrap OL3 in Leaflet clothing.

For now, the following is possible: 

    var map = O.map('map').setView([51.505, -0.09], 13);
    O.tileLayer(
        'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }
    ).addTo(map);
    
    O.marker([51.5, -0.09]).addTo(map);

Notice anything? Yep, the big Oh means that you are in fact using a wrapper 
around OpenLayers 3 to do things tings the Leaflet way. 

Why?
----
Mainly to learn how to use OpenLayers 3 (and missing a good project), but also 
perhaps to point out that Ol3 may be a bit more complicated and verbose than
developers care about.

Future plans
------------
Goal 1 is to replicate the leaflet front page example completely with 
OpenLayers 3 (just popups missing), then perhaps I have to learn some more 
advanced Leaflet stuff to add those as well.

But seriously, why?
-------------------
I pulled an all-nighter to not oversleep for my flight to PDX and FOSS4G 2014 ;)

License
-------
I've nicked the marker icon from Leaflet (full license here: https://github.com/Leaflet/Leaflet/blob/master/LICENSE)

This lib is free for anyone to use (just include static/js/src/O.js on your 
page), and lisences under the MIT license.