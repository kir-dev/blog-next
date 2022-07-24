---
layout: post
author: kresshy
date: 2014-02-14 21:45:00
title: 'mloc.js konferencia I. nap'

excerpt: <p>Ha követitek a magyarországi konferenciákat, akkor láthattátok, hogy február 13-14-én a Prezi a "House of Ideas"-ban rendezi az <a href="http://mloc-js.com/2014/">mloc.js</a> JavaScript konferenciát. Ebben a cikkben az első nap eseményeiről szeretnénk megosztani az élményeinket.</p>
---

![mloc.js badges](https://dl.dropboxusercontent.com/u/31443466/2014-02-13%2013.10.06.jpg)

Ha követitek a magyarországi konferenciákat, akkor láthattátok, hogy február 13-14-én a Prezi a "House of Ideas"-ban rendezi az [mloc.js](http://mloc-js.com/2014/) JavaScript konferenciát. Ebben a cikkben az első nap eseményeiről szeretnénk megosztani az élményeinket.

Mielőtt belekezdenék, köszönetet szeretnék mondani a szervezőknek, hogy ilyen remek konferenciát hoztak össze. Valamint az előadóknak is, hogy eljöttek és bepillantást engedtek a munkájukba, igazán színvonalas előadásokat láthattunk.

## PayPal - Release The Kraken

![Release the Kraken](https://dl.dropboxusercontent.com/u/31443466/2014-02-13%2010.31.11.jpg)

A PayPal az egyik legnépszerűbb online fizetési megoldás és nemrégiben kezdték meg az átállást Node.js-re a szerver oldalon is. Erről lehet vitatkozni, hogy jó döntés volt-e vagy sem, de ők azzal érveltek, hogy sokkal produktívabb így a fejlesztés. Természetesen az előadás végén rengeteg kérdést kapott [Jeff Harrell](https://twitter.com/juxtajeff). Főként az általuk használt technológiáról beszélt, amely most már JavaScripten alapul. Ez a [Kraken](https://github.com/paypal/kraken-js), amely az [express.js](http://expressjs.com/) (amit mi is használni fogunk valószínűleg a [PÉK frontend]() újraírásakor) egy kiegészítése, amivel struktúrát és konvenciókat lehet a rendszerbe vinni.

## Google - New Optimizations of Google Chrome's V8

![V8 optimizations](https://dl.dropboxusercontent.com/u/31443466/2014-02-13%2011.53.22.jpg)

Ben L. Titzer az előadásában bevezetett a heap optimalizálásába és a Garbage Collector működésébe (eléggé hasonló a JVM GC működéséhez: [Old & Young generations](http://www.cubrid.org/blog/dev-platform/understanding-java-garbage-collection/)). Szintén rengeteg kérdést kapott és elárulta, hogy azon túl, hogy a Chrome-ban remekül fut a JavaScript, a Google-nél egyéb dolgokra is szeretnék használni a nyelvet. Ha már itt volt érdeklődtek a szomszédban lévő magyar cégek arról is, hogy hogyan érdemes optimális, gyors kódot írni. :)

## Ebédszünet

Ehhez sok kommentet nem fűznénk. A kaja nagyon finom volt és közben lehetett csevegni a többi résztvevővel.

![lunch at mloc.js](https://dl.dropboxusercontent.com/u/31443466/2014-02-13%2013.51.37.jpg)

## JavaScript as an Intermediate Language

[Shriram Krishnamurthi](https://twitter.com/ShriramKMurthi) a Brown University-ről érkezett. Egy remek témát hozott arról, hogy hogyan lehetne a JavaScriptet köztes nyelvként használni. Akadémiai vonalról jött, de számomra ez az előadás volt a nap legjobbja. Magával ragadott a felvezetés, ahogy elmondta, hogy a JavaScriptet funkcionális nyelvként próbálták használni a matematika oktatására. A tanulókat nem érdekli a stack és az alacsony szintű dolgok, ők egyszerűen csak programozni akarnak és alkotni úgy, hogy a részletekről nem akarnak tudni.

Természetesen az oktatás problémáiról is beszélt, de mikor már a közepénél jártunk azért párszor kifagyasztotta a Chrome-ot `while(true){print "loop";}` illetve néha stackoverflow-t is tudott produkálni. A többi böngészővel meg sem próbálkozott.

![JavaScript as an Intermediate Language](https://dl.dropboxusercontent.com/u/31443466/2014-02-13%2015.14.51.jpg)

Valljuk be egy végtelen ciklus nem szép dolog és szétfagyasztja az egész UI-t. Aztán jött a csavar és bemutatta, hogy mikre képes az [általuk fejlesztett rendszer](http://www.pyret.org/). A felhasználói felület végig reszponzív maradt, még végtelen ciklus esetén is. Képes volt megállítani a futást, sőt pause-t nyomni, majd pedig ugyanonnan folytatni a program futását. Ezek után pedig részletezte, hogy mi mindenre lehetne használni ezt a projektet. Innentől a ti fantáziátokra bíznánk és ha van kedvetek tippelni, akkor szóljatok hozzá a cikk alatt!

![JavaScript as an Intermediate Language](https://dl.dropboxusercontent.com/u/31443466/2014-02-13%2015.16.04.jpg)

A nap végén az emberek elégedetten távoztak és rengetegen dicsérték a konferencia első napját. Mi is nagyon élveztük az előadásokat, de a végére nagyon elfáradtunk. Ideje volt már elindulni haza pihenni, hogy másnap újult erővel figyelhessünk többek között a Facebooktól jött előadó szavaira. Hamarosan folytatjuk...
