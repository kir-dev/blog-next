---
layout: post
author: tmichel
date: 2014-01-29 22:45:00
category: pek

title: 'PÉK jelene és jövője, IV. rész'
excerpt: '<p>A negyedik résszel elérkeztünk a sorozat végére. Ebben a részben áttekintjük, hogy mire jutottunk az utóbbi 1-2 hónapban. Rengeteget beszéltünk arról, hogy merre vigyük a PÉK-et, mert több ötlet is felmerült. Megrágtunk jó néhány variációt, de végül győzött a józan ész.</p>'
---

Előzmények:

1. [PÉK jelene és jövője, I. rész](/post/2014-01-23-pek-jelen-es-jovo-i)
2. [PÉK jelene és jövője, II. rész](/post/2014-01-25-pek-jelen-es-jovo-ii)
3. [PÉK jelene és jövője, III. rész](/post/2014-01-27-pek-jelen-es-jovo-iii)

A negyedik résszel elérkeztünk a sorozat végére. Ebben a részben áttekintjük, hogy mire jutottunk az utóbbi 1-2 hónapban. Rengeteget beszéltünk arról, hogy merre vigyük a PÉK-et, mert több ötlet is felmerült. Megrágtunk jó néhány variációt, de végül győzött a józan ész.

A PÉK technológiai hiányosságai mellett sokkal nagyobb problémát jelent a megfelelő fejlesztői utánpótlás biztosítása. Ez nagyon csúnyán hangzik, de valójában arról van szó, hogy a java és a vele járó technológiák iránt egyre kisebb az érdeklődés. Ennek a megoldása jelenleg fontosabb, mint a technológiai hiányosságok javítása.

Egy esetleges PÉK vérfrissítésről (felhasználói felület és dizájn vonalon) már évek óta beszélgetünk. Most, hogy összeértek a problémák, gyorsan össze is vontuk őket, annak a reményében, hogy egy csapásra kettőt is meg tudunk oldani.

A PÉK felületét és annak hiányosságait nem kell bemutatni: azok, akik sűrűbben (de legalábbis minden félév végén) találkoznak vele, nyilván érzékelték már, hogy az amúgy is ad-hoc felület több helyen is _döcög_. Az alkalmazás eddigi fejlesztőinek mentségére legyen szólva, hogy többnyire backend oldalon szeretnek dolgozni.

A fentiek fényében az elkövetkezendő pár hónapban lecseréljük és modernizáljuk a PÉK frontendjét. A jelenlegi felület hiányosságairól és legnagyobb problémáiról a ti véleményeteket is szeretnénk majd kikérni, ennek az első lépcsője a következő napokban fog hozzátok eljutni. Figyeljétek a blogot és az email fiókotokat!

## Oszd meg és uralkodj!

A jelenlegi alkalmazást egy könnyed vágással ketté fogjuk osztani: a frontendet teljesen leválasztjuk a backendről. A backend oldalon marad a JavaEE EJB-kkel és XML hegyekkel. Az üzleti logika fölött egy vékony REST API lesz, amit JSON üzeneteken keresztül lehet majd megszólítani.

Az API az első időkben valószínűleg zárt lesz, mert arra számítunk, hogy az elején nem fogunk tudni egy stabil API-t biztosítani. Idővel viszont szeretnénk majd megnyitni, mert a PÉK alatt lévő adatbázis kincseket rejteget, csak meg kell őket találni. Valami hasonlóra már volt próbálkozás, de valójában sosem valósult meg belőle semmi. Ebben az esetben viszont a saját API-nk első felhasználói mi leszünk, így kénytelenek leszünk ezúttal tényleg befejezni a projektet.

A nyílt API-tól azt reméljük, hogy a karon más (nem Kir-Devhez tartozó) hallgatók is kedvet kapnak majd olyan fejlesztésekhez, amik a közösségnek is jól jönnek. Sőt, talán ezekkel a külső fejlesztéssekkel együtt új igények is jelentkeznek majd, amik tovább lendíthetik a PÉK-et a következő szintre.

## Node all the way

A frontenddel az a nagy szerencsénk, hogy lényegében bármilyen technológiát választhatunk, mert a feladat mérete megengedi ezt. A backendtől elválasztva, külön alkalmazásként futhat majd a frontend, saját életciklussal és akár azonnali új verzióval ([continuous delivery](http://en.wikipedia.org/wiki/Continuous_delivery)). Ezzel szeretnénk felgyorsítani a fejlesztést, az ötlettől a release-ig tartó utat lerövidíteni. Ez mindenkinek jó: a fejlesztőnek azért, mert szinte azonnal látja a munkája eredményét, a terméknek pedig azért, mert az új ötleteket gyorsan lehet kipróbálni.

A technológia választása esetünkben nem azért volt fontos, hogy megtaláljuk a problémához legjobban illőt, hanem inkább egy olyat kerestünk, amit majd az utánunk jövők is szívesen használnak majd. A választásunk végül a [Node.js](http://nodejs.org/)-re esett.

A Node.js az utóbbi egy-két évben szinte a semmiből bukkant elő, és napjainkra meglepő népszerűségre tette szert. Több nagy cég is letette mellette a voksát, a két legnagyobb talán a [PayPal](https://www.paypal-engineering.com/2013/11/22/node-js-at-paypal/) és a [Walmart](http://venturebeat.com/2012/01/24/why-walmart-is-using-node-js/).

Számunkra a Node.js elsősorban népszerűsége és - ezen keresztül - a vonzereje miatt lehet igazán előnyös. Az már csak hab a tortán, hogy valószínűleg érdekes kihívások elé fog állítani minket a fejlesztés során. Nem titkolt cél, hogy ezzel vonjunk be új embereket a fejlesztésbe és a kör életébe. Ebbe beletartoznak a potenciális új körtagok és körben lézengő emberek is. :) Ha esetleg érdekelne a téma és szívesen beszállnál a fejlesztésbe, akkor keress meg minket!
