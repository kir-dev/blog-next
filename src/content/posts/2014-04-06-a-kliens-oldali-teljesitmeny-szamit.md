---
layout: post
author: snapdragon
date: 2014-04-06 20:18:40
title: 'A kliens oldali teljesítmény számít'
comment: true
---

Sokan hallhattatok már a backend oldali skálázásról, a különböző cluster és sharding megoldásról (a témában érdemes követni a [HighScalability](http://highscalability.com/) oldalt), de valójában erre az esetek nagy részében nincs szükség egy új alkalmazás bevezetésekor a piacra. Ekkor sokkal nagyobb hangsúlyt érdemes fektetni a felhasználói elégedettségre, amit inkább az alkalmazásunk kliens oldali teljesítménye határoz meg. A határok persze nem ilyen élesek, olvass tovább!

A felhasználók számára elsőrendű kérdés, hogy mennyit kell várniuk egy oldal betöltődésére. A Google felmérései szerint 500 ms késleltetés a keresési eredmények megjelenítésében 20%-os reklámbevétel kiesést jelent, az Amazon mérései szerint minden 100 ms késleltetés 1%-al csökkenti az eladott áruk mennyiségét a webes kereskedő portálon. 2 másodperc várakozás után a felhasználók már türelmetlenek kezdenek lenni, 3 másodperc után 40%-uk [egyszerűen elhagyja](http://alistapart.com/article/improving-ux-through-front-end-performance) az oldalt.

Két számot érdemes megjegyezni a front-end optimalizációval kapcsolatban:

- **1000 ms**: ennyi idő alatt feltétlen valamilyen használható tartalmat kell mutatni a felhasználónak
- **16,6 ms**: ennyi időnként elő kell állítani egy frame-et a jó minőségű, 60 FPS sebesség eléréséhez

A bevezetőben sugalltuk, hogy a kliens oldali teljesítménynél nem csak a felhasználóhoz megérkezett adatoktól számított feldolgozási és renderelési időt vesszük figyelembe, hanem azt is, hogy a bitek milyen formában közlekednek a böngésző és a szerver(ek) között. Mielőtt elkezdenénk megvizsgálni a különböző optimalizálási lehetőségeket, nagy vonalakban áttekintjük a HTTP lekérdezések felépítését.

![httprequest](/img/2014-03-06-httprequest.png)

1. DNS lekérdezés: A kliens megpróbálja feloldani a domain nevet, a DNS szerver válaszol egy IP címmel.
2. Kapcsolódás: Megtörténik a háromfázisú TCP handshake, a kliens SYN csomagot küld a szervernek, a szerver SYN-ACK csomaggal válaszol, végül a kliens ACK csomagot küld és ezzel létrejött a TCP kapcsolat.
3. Küldés: A kliens HTTP üzeneteket küld a web szervernek.
4. Várakozás: A szerver feldolgozza a kérést, elkészíti a választ, majd elküldi a kliensnek.
5. Betöltés: A kliens feldolgozza szerver válaszát.
6. Lezárás: A kliens lezárja a kapcsolatot.

## 1. fázis: DNS lekérdezés

A DNS lekérdezés folyamatának ideje elég széles skálán mozog. DNS cache találatkor 1 ms-től kezdődően, a teljes lekérdezés esetén akár több másodperces idejéig változhat a művelet ideje. Az egyik lehetőség DNS lekérdezés gyorsítására a [DNS prefetch](http://www.chromium.org/developers/design-documents/dns-prefetching), ahol az oldalon található linkek domainjei már betöltődés közben párhuzamosan fel lesznek oldva. Ezt a böngésző egy külön szálon végzi el. Hasznos lehet ez a funkció, ha gyakran hivatkozott más domainekre vannak linkjeink, ilyen például egy hírportál, vagy egy keresőprogram. A domain nevek előzetes feloldását manuálisan elősegíthetjük a következőképpen:

```html
<link rel="dns-prefetch" href="//<prefetch-elni kívánt oldal címe>" />
```

A prefetchelést ki és bekapcsolhatjuk a következő meta tag _content_ attribútumának _off_ vagy _on_ értékével:

```html
<meta http-equiv="x-dns-prefetch-control" content="off" />
```

## 2. - 3. fázis: Kapcsolódás és küldés

Láthatjuk, hogy az idő jelentős részében a kliens csak hálózati kommunikációt folytat, így a DNS lekérdezések és TCP kapcsolatok létrehozása jelentős overhead-del jár. Ezen akkor tudunk spórolni, hogy ha minél inkább kötegelten, egyszerre végzünk el műveleteket, ugyanis a hálózati kommunikációt nem igazán tudjuk gyorsítani (2.-3. fázis). Ehhez kapcsolódó módszereket a kliens oldali optimalizáció részénél mutatom be.

## 4. fázis: Várakozás a szerver válaszára

Ez a lépés főleg a szerver oldali alkalmazás gyorsítását jelenti: a minél gyorsabb válaszidő elérését. Ennek elég terjedelmes szakirodalma van és nem is tartozik nagyon a kliensoldali optimalizációhoz, így most nem fogok bővebben írni róla. Statikus fájlok kiszolgálásakor érdemes a cachelést finomhangolni, illetve beállítani a gzip tömörítést a webszervernél.

## 5. fázis: Betöltés

A kliens oldali teljesítményt legnagyobb részben ez a tényező határozza meg. Itt dolgozza fel a kliens a szerver válaszát, betölti az oldalhoz szükséges erőforrásokat, előállítja a megjelenítendő oldalt, másnéven rendereli azt. Két művelet van a megjelenítés során, amelyeket meg kell érteni:

- repaint: Egy elem kinézete megváltozott, de az oldal elrendezése nem változott. Például ilyen, ha _outline_, background-color CSS osztályok lettek hozzáadva egy elemhez.
- reflow: Az elem megváltozása miatt újra kell számolni az oldal elrendezését. Ez a művelet mindig egy repaint-et is vonz maga után, így különösen drága művelet, ezért spórolni kell a használatával.

Ezek után az a kérdés, hogy mi okoz reflow-t? A rossz hír az, hogy szinte minden: például DOM műveletek, lekérdezések; stílusok hozzáadása, elvétele; görgetés, átméretezés. A rengeteg DOM műveletet végző alkalmazásoknál spórolni kell a nagy számításigényű műveletekkel, mert csak így lehet nagyobb teljesítményt elérni.

A következőkben bemutatok pár jól használható technikát, amelyekkel csökkenthetjük a fenti erőforrásigényes műveletek számát. A legfontosabb, hogy a DOM-fa minél kisebb részfáját módosítsuk. Az egyik leghasznosabb trükk, ha semmiképpen sem tudjuk elkerülni a nagyszámú DOM műveletet, ha azokat a fáról leválasztva végezzük el. CSS segítségével _display:none;_ stílust adhatunk egy részfának, így a különböző műveletek esetén nem okoznak reflow-t a módosítások. Javascript esetén a részfákat kell előállítanunk memóriában, majd később hozzá lehet adni a DOM fához. A részfa lemásolásához használható a _cloneNode()_ metódus. Hasznos lehet tudni, hogy a DOM műveleteket a böngészőmotor csoportosítva, kötegelten végzi el, így az olvasás illetve írás jellegű műveleteket minél inkább egyszerre érdemes végrehajtani. Erre példa lehet, amikor CSS osztályokkal alkalmazunk egy stílust egyszerre több elemre, vagy Javascriptnél próbáljuk a lekérdezés, módosítás jellegű műveleteket csoportosítani.

### Erőforrások betöltése

Az egyik első dolog, amit optimalizálni érdemes az az oldal betöltődéséhez szükséges kapcsolatok számának minimalizálása. Alapesetben minden erőforrást egy külön kapcsolaton keresztül kell megszerezni, így ez rengeteg overhead-et jelent. Ennek megoldásában segíthetnek a HTTP2 / SPDY protokollok használata. A [HTTP2](http://http2.github.io/) a [SPDY](http://hu.wikipedia.org/wiki/SPDY) protokollon alapszik, mely képes multiplexelni a kapcsolatokat, illetve tömöríti a fejléceket. [Apache HTTPD modulként](https://developers.google.com/speed/spdy/mod_spdy/) és [NGINX modulként](http://nginx.org/en/docs/http/ngx_http_spdy_module.html) is szerezhető támogatás hozzá. A kapcsolatok multiplexelésével az oldalhoz szükséges erőforrások egyszerre letöltődnek, így azok nem jelentenek külön overhead-et. Azonban, ha nem a saját webszerünkön futtatjuk az alkalmazást és nem tudjuk kihasználni a fenti protokollok előnyeit, akkor más módszerek használatára is szükség van.

Egyrészt a SPDY protokoll nyújtotta előnyök egy részét mi is előállíthatjuk magunknak, ha tömörítjük és összefűzzük az erőforrásokat. CSS és JS fájloknál a tömörítés a whitespace-ek eltávolítását jelenti, illetve JS esetén az obfuszkálással (kódösszezavarással) is kisebb lesz a fájl mérete. Ezen feladatokat a [múltkori cikkben](http://kir-dev.sch.bme.hu/2014/02/22/yeoman/) is bemutatott [Grunt](http://gruntjs.com/sample-gruntfile) segítségével könnyen végrehajthatjuk a _concat_ és _uglify_ taskok segítségével.

A nélkülözhetetlen funkciókat tartalmazó kritikus JS és CSS fájlok kiválasztása rendkívül fontos: a _critical rendering path_ minimalizálásával a legnagyobb, sok erőforrást használó oldalt is gyorsabbá tehetjük, mint akár egy egyszerűbb weboldalt. Milyen funkciókat tartunk kritikusnak? Azokat amelyek az oldal kezdeti betöltődésekor görgetés nélkül látszódnak és alapvető funkciókat nyújtanak az oldal használatában. A görgetés nélkül látszódó tartalmat okosan kell megválasztani, ehhez úgy kell átstruktúrálni az oldal HTML kódját, hogy a fő tartalom ott helyezkedjen el és a másodlagos dolgok csak később kerüljenek betöltésre. Például egy navigációs sávot hiába feljebb helyezkedik el az oldalon a tartalom után kell elhelyezni a HTML-ben és csak ezután CSS segítségével pozícionálni. Ezzel a trükkel a felhasználóknak gyorsan tudunk tartalmat kiszolgálni.

A lehető leggyorsabb alkalmazás betöltődéshez és a minél hamarabbi használhatósághoz a kritikus funkciókat tartalmazó rövidebb JS és CSS részeket tehát érdemes inline az oldal _head_ részében megírni, mivel azon kódrészletek futnak le a leghamarabb a HTML fájl letöltődése után. A hosszabb kritikus JS és CSS fájlokat azonban érdemesebb már külső erőforrásként betölteni, mivel azokat a böngésző cacheli. A többi fájl betöltése történhet _lazy loading_ segítségével (azaz JavaScript-ből adjuk hozzá a script tag-et a HTML-hez), vagy használhatjuk a késleltetett betöltés technikáját.

![scriptexecution](/img/2014-03-06-scriptexecution.jpg)

Alapvetően háromféle módon tölthetünk be külső JavaScript-et:

- alapértelmezett: Ebben az esetben, ha a HTML fájl parse-olása a script tag-hez ér, akkor megszakad a parse-olás, betölti a JS fájlt, lefuttatja, majd folytatja a script tag utáni HTML beolvasását.

```html
<script type="text/javascript" src="<JS fájl elérési útvonala>"></script>
```

- késleltetett: Amikor a HTML fájl parse-olása a script tag-hez ér, párhuzamosan letöltődik a JS fájl, majd csak a HTML fájl parse-olásának végén kerül futtatásra.

```html
<script defer type="text/javascript" src="<JS fájl elérési útvonala>"></script>
```

- aszinkron: Amikor a HTML fájl parse-olása a script tag-hez ér, párhuzamosan letöltődik a JS fájl, majd a parse-olás megszakad és csak akkor folytatódik, ha lefutott a JavaScript kód.

```html
<script async type="text/javascript" src="<JS fájl elérési útvonala>"></script>
```

A tapasztalatok alapján azonban nem minden böngészőben működik jól az erőforrás betöltődés késleltetése (defer) így, ha a critical rendering path-ról teljesen el akarjuk tüntetni a betöltődést, használhatjuk a Google által is [javasolt megoldást](http://www.feedthebot.com/pagespeed/defer-loading-javascript.html):

```js
<script type="text/javascript">
  function downloadJSAtOnload() {
    var element = document.createElement("script");
    element.src = "<JS fájl elérési útvonala>";
    document.body.appendChild(element);
  }
  if (window.addEventListener)
    window.addEventListener("load", downloadJSAtOnload, false);
  else if (window.attachEvent)
    window.attachEvent("onload", downloadJSAtOnload);
  else window.onload = downloadJSAtOnload;
</script>
```

Ha külső domainről töltünk be erőforrást, akkor pedig mindenképp érdemes valamilyen CDN-t ( _content delivery network_ ) használni, mely egy olyan szolgáltatás, amivel a felhasználóhoz földrajzilag legközelebb eső szerverről szerezheti meg a kívánt erőforrást. Ilyen CDN-t a [Google is üzemeltet](https://developers.google.com/speed/libraries/devguide?csw=1), de itt inkább csak a legismertebb library-ket találhatjuk meg, így célravezető [máshol is körbenézni](http://cdnjs.com/).

### Képek

A következő nagyobb optimalizálható rész egy honlapon a képek kezelése. A critical render path-ra eső képeket a HTML-lel együtt töltsük be, az egyéb kevésbé fontos, vagy nem látszódó képeket lazy loading segítségével Javascript kódból. A megjelenítendő képeket minden esetben optimalizáljuk a webes megjelenítésre. Böngészőkből a képeket átméretezni sok számítással jár és minden esetben reflow-t okoz, így azokat minél inkább kerüljük. Minőségüket a szemmel nem látható mértékig csökkentsük, és tömörítsük őket. A tömörítésben segíthetnek a különböző fejlettebb képszerkesztő programok, vagy olyan webes eszközök, mint a [Yahoo Smush.it](http://www.smushit.com/ysmush.it/) és a [PunyPNG](http://punypng.com/). Egyes esetekben a képméretet más fájlok méretének rovására csökkenthetjük, például megadhatjuk a képünket [base64 kódolással](http://webcodertools.com/imagetobase64converter) a CSS méretének megnövelésével, vagy ha a képeket SVG formátumban használjuk, elkészíthetjük őket akár [Javascript segítségével](http://snapsvg.io/) is.

Spórolhatunk a különböző képek betöltéséhez szükséges kapcsolatokon is, ha azokat egyszerre, kötegelten végezzük el. Ebben segíthet a korábban már említett SPDY protokoll, vagy választhatjuk a korábbi módszert, a spriteokat. Sprite-ok esetén egy nagyobb képre összemásoljuk az összes szükséges képet, így azok egyetlen fájlként töltődnek le, majd CSS segítségével jelenítjük meg belőlük a szükséges részeket kivágással.

Érdekességként említeném meg a külön webre optimalizált formátumokat, mint a [WebP](https://developers.google.com/speed/webp/), mely 25-34%-al kisebb mint az egyéb képformátumok. Sajnos nem mindenhol [támogatott](http://caniuse.com/webp) a technológia (például Firefox-ban nem használható még), így nem ajánlott az éles bevetése, de mindenképp érdemes figyelemmel [kísérni fejlődésüket](http://blog.chromium.org/2014/03/webp-improves-while-rolling-out-across.html).

## Összefoglalás, további olvasnivalók

Először is gratulálok mindenkinek, aki eljutott az olvasással idáig. Hosszú út volt, amely során láthattuk, hogy a HTTP lekérdezések egyes fázisait milyen módszerekkel lehet optimalizálni. A rengeteg lehetőség közül, amiket a leginkább kiemelnék és a Google ajánlások közül is a legfontosabbak:

- oldal tartalmának priorizálása (critical rendering path)
- erőforrások okos betöltése
- képek optimalizálása

![pagespeedinsights](/img/2014-03-06-pagespeedinsights.png)

Természetesen a fenti műveletek végrehajtása után is érdemes méréseket végezni, ehhez ajánlom a [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) és [Webpagetest](http://www.webpagetest.org/) elemzőprogramokat, melyek értékelési szempontjai alapján ezen cikk is készült. További olvasnivalónak pedig ajánlom az alábbi linkeket:

- [Google PageSpeed Insights optimalizáció](http://www.feedthebot.com/pagespeed/)
- [Teljesítményoptimalizálás mobilon](http://www.slideshare.net/matenadasdi1/optimizing-browser-experience-hwsw-app-conf)
