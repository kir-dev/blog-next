---
layout: post
author: kresshy
date: 2014-03-25 11:20:00
title: 'Node.js is a badass rock star tech! - I.rész'
comment: true
---

Elérkezett az ideje annak, hogy írjak egy kicsit a [Node.js](http://nodejs.org/)-ről. A szándékainkról már tudtok. Szeretnénk újra írni a PÉK-et és ehhez a Node.js-t használnánk a front-end elkészítéséhez. Ahhoz, hogy tisztán lássunk jó pár dolgot meg kell érteni, és jelen cikk ezeket célozza meg, majd egy következő cikkben pedig bevezetést fogok adni, a Node.js alapjairól. De még mielőtt elkezdenénk belemenni a részletekbe, nézzétek meg ezt a videót, amely a már jól bevált webszervereket állítja szembe az új, még kiforróban lévő Node.js-szel.

[![Node.js is a badass rock star tech](http://img.youtube.com/vi/bzkRVzciAZg/0.jpg)](http://www.youtube.com/watch?v=bzkRVzciAZg)

Sok ismeretlen fogalom elhangzik a videóban, amelyek egy részére megpróbálok magyarázatot adni. A videó egyik tanulsága, hogy a régi jól bevált dolgoktól nem feltétlenül kell megszabadulni az új technológiák miatt - mindennek megvan a maga helye. Egy Apache webszerver már kiforrott, jól működik és rengeteg fejlesztő megtanulta használni. Jól bevált technológia, folyamatos patchekkel a bugok és biztonsági hibák ellen. Egy olyan szoftver, amely rengeteg igényt kielégít és tökéletes lenne a számunkra is, sőt jelenleg is fut nálunk. Akkor mégis miért szeretnénk mindezt a biztonságot feláldozni és új vizekre evezni? Egy szó a válasz rá: kíváncsiságból.

## A motorháztető alatt

A Node.js, ha még nem hallottál volna róla, szerver oldali JavaScript futtatásának a lehetőségét kínálja. A bevezető videóban a két maci már az elején dobálózik olyan szavakkal, hogy Non-Blocking I/O, Event-Driven. Ezek nagyon jól hangzanak, de mit is jelentenek igazából? Node.js-ben az I/O műveletek nem blokkolhatnak (később kifejtem, hogy miért). Ez azt jelenti, hogy a HTTP kérések, adatbázis lekérdezések, file I/O és egyéb műveletek nem blokkolják a végrehajtást mindaddig, amíg végbe nem mennek (`return`).

Ennek megfelelően függetlenül futnak és egy eseményt indítanak, ha az adat a rendelkezésünkre áll. Az Event-Driven gyakorlatilag azt jelenti, hogy valamilyen esemény hatására végrehajtódik egy cselekvés. A böngészőben ez egy kattintás egy gombra, vagy egy billentyű lenyomása. Azonban a Node.js nem a böngészőkben fut a kliens oldalon, hanem a szerveren, ahol nincsenek ilyesféle események. Ez egy nagyon nagy különbség és másféle programozó stílust is követel. Olyan dolgokra van szükség, ami segíti a hatékony szerver oldali futtatást. Ezt a segítséget az event loop (esemény ciklus) biztosítja számunkra.

## Event loop

A legtöbb ember könnyedén megérti azt, hogy milyen az esemény vezérelt programozás. Olyan, mint a mindennapi élet. Főzöl, elkezded melegíteni a vizet a tésztának, és amikor felforr a víz, annak hatására belerakod a tésztát. Az események a víz forrásaval kezdődnek és ennek hatására meghívódik a _callback_, ami a tészta belerakása a vízbe. Nagyon fontos, hogy egyszerre mindig csak egy dolgot csinálunk. Olyan nincs, hogy egyszerre tesszük bele a tésztát a levesbe, de közben a másik kezünkkel vágjuk a paradicsomot. Ez a JavaScript világából maradt ránk: itt minden egy szálon történik. Ha bármit egyszerre szeretnél csinálni, annak csúnya vége lesz (elvágod a kezed).

Az event loop megértésének egy módja a postás analógiája. Az event-loop a postás, és az event maga a levél. A postás fogja a megkapott levelet és a megfelelő _route_-hoz viszi, ami maga lesz a callback, ez lefut, aztán pedig mindez újra és újra megtörténik.

```js
var http = require('http')
http
  .createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello World\n')
  })
  .listen(1337, '127.0.0.1')
console.log('Server running at http://127.0.0.1:1337/')
```

A fenti kódrészlet a Node.js hivatalos weboldaláról van. Ez egy rendkívül egyszerű HTTP szerver kódja, ami nem csinál mást, mint a böngésző kérésére elküldi válaszként a "Hello World"-öt. De mi is történik, itt valójában. Beesik egy HTTP kérés hozzánk, ekkor a Node.js a _request_ eventet bocsájtja ki. Ennek hatására meghívódik a callback-ünk ami jelen esetben egy anonim függvény a `createServer`-ben argumentumként átadva. Ez egy nagyon egyszerű callback, ami rendkívül gyorsan fut.

Most tegyük fel, hogy az oldalunk nagyon népszerű lesz és rengeteg kérést kapunk. Tételezzük fel azt is, hogy a callback függvényük egy másodpercig fut és egyszerre két kérés jön be. Mind a két kérést nem tudjuk kiszolgálni és a második további egy másodpercig fog várakozni. Ez egy veszélyes jelenség, mivel blokkoljuk az event-loopot, és a felhasználók látják a kárát.

E miatt próbáljuk a Node.js-t, amennyire csak lehet esemény vezéreltnek és blokkolás mentesnek meghagyni. Nagyon érdekes technológiáról van szó, amivel érdemes foglalkozni. Azonban megkérdőjelezhető a kód karbantarthatósága. Ha nem vigyázunk olyan szörnyeteget tudunk létrehozni, amit senki nem szeretne piszkálni. Muszáj lesz olyan metodológiákat alkalmazni, amikkel elérhetjük, hogy minőségi kód kerüljön ki a kezünk közül.

Források:
[understanding-event-loops](http://developer.yahoo.com/blogs/ydn/part-1-understanding-event-loops-writing-great-code-11401.html)
[Node cookbook](http://www.packtpub.com/node-to-guide-in-the-art-of-asynchronous-server-side-javascript-cookbook/book)
[nodejs.org](http://nodejs.org/)
