---
layout: post
title: "Modernizr"
author: kresshy
date: 2014-01-05 04:03:00 CET
comment: true
---

Pár napja olvashattatok a [HTML5 Boilerplate](http://kir-dev.sch.bme.hu/2014/01/03/a-html5-boilerplate/) cikkünkben a [Modernizr](http://modernizr.com/) JavaScript library-ról. A Modernizr-t (nem nincs benne typo) arra használjuk, hogy ellenőrizzük vele a felhasználó böngészőjének HTML5 és CSS3 képességeit. 
Remek érzés a böngészők legújabb funkcionalitásait használni mindaddig, amíg nem kell támogatni a régebbi verziókat is. A library az oldal betöltésekor gyorsan detektálja mire képes a kliens és az elérhető funkciókról információkat szolgáltat, amik lekérdezhetőek a saját scriptekben.

## Hogyan használd?

Először is töltsd le a scriptet a honlapjáról vagy közvetlenül [innen](http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-geolocation-inlinesvg-smil-svg-svgclippaths-touch-webgl-shiv-cssclasses-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load). 
Az oldalad `<head>` részében töltsd be a letöltött scriptet.

~~~html
<script src="modernizr.min.js" type="text/javascript"></script>
~~~

A következő lépésben add hozzá a `no-js` class-t a `<html>` taghez.

~~~html
<html class="no-js">
~~~

Joggal kérdezhetitek, hogy miért adjuk hozzá ezt a class-t. Ez lesz az alapértelmezett állapota az oldalnak. Ha a Javascript (js) nincs engedélyezve, a Modernizr egyáltalán nem fog működni (sőt talán más funkciói sem az oldaladnak) ezért jó, hogy ha van egy fallback erre az esetre. Ha a JavaScript engedélyezve van, akkor az oldal betöltése után a class dinamikusan lecserélődik a támogatott funkciókra. Vizsgáld meg az oldal forrását (dev toolbarban), valahogy így kell kinézzen:

~~~html 
<html class="js canvas canvastext geolocation rgba hsla no-multiplebgs
borderimage borderradius boxshadow opacity no-cssanimations csscolumns 
no-cssgradients no-cssreflections csstransforms no-csstransforms3d 
no-csstransitions  video audio cufon-active fontface cufon-ready"> 
~~~

### Mit jelent ez a sok kifejezés?

Azok a támogatott funkciók, amelyek előtt nem található meg a `no` prefix. A Modernizr által visszaadott információk alapján el tudjuk dönteni, hogy például a css színátmeneteket használhatjuk vagy sem: `no-cssgradients` - láthatjuk, hogy jelen esetben nem támogatott ez a funkció. Egy példa a hivatalos dokumentációból:

~~~css
/* In your CSS: */
.no-audio #music {
   display: none; /* Don't show Audio options */
}
.audio #music button {
   /* Style the Play and Pause buttons nicely */
}
~~~

~~~html
<!-- In your HTML: -->
<div id="music">
   <audio>
      <source src="audio.ogg" />
      <source src="audio.mp3" />
   </audio>
   <button id="play">Play</button>
   <button id="pause">Pause</button>
</div>
~~~

### Modernizr.load()

A `Modernizr.load` használható arra is, hogy JavaScript fájlokat töltsünk be. Nézzünk meg egy példát erre is:

~~~js
Modernizr.load({
    test: Modernizr.geolocation,
    yep : 'geo.js',
    nope: 'geo-polyfill.js'
});
~~~

Ebben a példában különböző scripteket töltünk be annak függvényében, hogy a böngésző támogatja-e a `test`-ben található funkciót. Ezzel azt érheted el, hogy a felhasználók számára nem működő felesleges kódokat nem kell betöltened, ezáltal növeli a teljesítményét az oldalnak. Szerencsére ez semmit nem lassít a betöltésen és néha még gyorsíthat is rajta, mert a betöltés aszinkron módon történik, párhuzamosan. További érdekesség a `-polyfill` suffix. Ezek általában olyan scripteket jelölnek, amelyek különböző funkcionalitásokat állítanak helyre vagy nyújtanak a régebbi böngészőkben (HTML5 fallbackkel). Akiket érdekelnek ezek a scriptek a Modernizr [GitHub repojában](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills) megtalálhatóak.

## HTML5

A Modernizr lehetővé teszi, hogy használd az új HTML5 elemeket (header, hgroup, footer, video stb.) és stílusokat adj nekik. Ez nem jelenti azt, hogy hirtelen minden HTML5 specifikus elem működni kezd IE-ben, de tudsz hozzájuk stílusokat rendelni, az IE megérti ezeket és nem fogja eldobni őket. Betöltés közben egy kicsi JavaScript kódot futtat a háttérben, hogy beállítsa az elemeket.

## JavaScript

JavaScriptből is vizsgálhatod a különböző funkciókat. Elég egy feltételt írnod és máris láthatod, hogy az adott funkció támogatott-e:

~~~js
if (Modernizr.audio) {
    /* properties for browsers that
    support audio */
}else{
    /* properties for browsers that
    does not support audio */
}
~~~

A [hivatalos dokumentációban](http://modernizr.com/docs/) elolvasható az összes ellenőrizhető tulajdonság ami CSS-ből vagy JavaScriptből haszálható.

