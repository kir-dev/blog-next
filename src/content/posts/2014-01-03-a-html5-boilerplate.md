---
layout: post
title: 'A HTML5 Boilerplate'
author: kresshy
date: 2014-01-03 22:00:00
comment: true
---

A HTML5 Boilerplate egy front-end template, amit arra találtak ki, hogy gyors, robusztus és
alkalmazkodó weboldalakat tudj készíteni az új HTML5 funkcionalitásokkal. Ez egy nyílt forrású projekt, amit Paul Irish és Divya Manian készített és tökéletes arra, hogy valódi cross-browser weboldalakat hozz létre, amik működnek a régebbi verziókkal is. A projekt letölthető a [HTML5 Boilerplate](http://html5boilerplate.com/) weboldaláról teljes csomagként vagy egy kisebb változatban, amely nem tartalmazza a dokumentációt. Az utóbbi csak azoknak ajánlott akik már dolgoztak vele korábban. A cikkben igyekszünk bemutatni a projekt képességeit.

## Mi található a csomagban?

Megtalálható minden olyan elem amelyre szükséged lehet a fejlesztés során beleértve a
dokumentációkat is az egyes részekhez.

- HTML
- CSS
- JavaScript
- .htaccess (Apache web szerver konfiguráció)
- crossdomain.xml
- Egyéb (gitignore és hasonló fájlok)

A [Modernizr](http://modernizr.com/) (erről részletesebben egy másik bejegyzésben írunk majd) is megtalálható a csomagban ami képes detektálni a böngészők által támogatott HTML5 és CSS3 funkciókat. Segít abban is, hogy az oldal dizájnja alkalmazkodjon a böngésző képességeihez.

A [Normalize.css](http://necolas.github.io/normalize.css/) betöltésével a böngészők sokkal konzisztensebben renderelik az oldalt. Csak azokat a stílusokat célozza meg amelyeket szükséges és a többit érintetlenül hagyja. Érdemes átnézni a tartalmát mivel ha bármilyen problémánk akad fejlesztés közben akkor jusson eszünkbe, hogy a saját stílusainkon kívűl ez is beleszól abba, hogyan jelenlenek meg az elemek.

## Hogyan kezdd el használni?

Általában egy weboldal készítése mindig azzal kezdődik, hogy létrehozod az alap struktúrát,
feltöltöd tartalommal, stílust és funkcionalitásokat hozol létre majd pedig nekiállsz tesztelni. Itt kapsz készen egy ilyen struktúrát amit majd elkezdhetsz használni. Nézzük meg kicsit közelebbről:

    .
    ├── css
    │   ├── main.css
    │   └── normalize.css
    ├── doc
    ├── img
    ├── js
    │   ├── main.js
    │   ├── plugins.js
    │   └── vendor
    │       ├── jquery.min.js
    │       └── modernizr.min.js
    ├── .htaccess
    ├── 404.html
    ├── index.html
    ├── humans.txt
    ├── robots.txt
    ├── crossdomain.xml
    ├── favicon.ico

A <strong>css</strong> könyvtárban fogjuk tárolni az oldal összes `*.css` állományát. A `normalize.css` és `main.css` tartalmazzák a HTML5 Boilerplateben alapértelmezett stílusokat, általános segéd osztályokat, media query placeholdereket és print stílusokat.

A <strong>doc</strong> könyvtárban találhatod a projekthez tartozó dokumentációkat illetve ajánlásokat, érdemes egyszer átolvasnod ezeket, hogy jobban kiigazodj a struktúrában illetve könnyebben tudd használni a fejlesztés során.

Az <strong>img</strong> könyvtárba helyezd az összes képet amelyet a weboldaladon meg akarsz majd jeleníteni. A későbbiekben könnyedén tudsz majd hivatkozni a mappában található képekre.

A <strong>js</strong> mappában tárold az oldalon futó scripteket. A gyökerébe a saját scriptjeidet helyezd el míg a vendor könyvtárba azokat tedd amelyek egyéb forrásból származnak. Így könnyebb rendszerezni a fájlokat és nem lesz egy nagy ömlesztett átláthatatlan rengeteg.

A `*.html` fájlokat az egész struktúrának a gyökerében tárold, ezek lesznek azok az oldalak amelyeket majd a tartalom megjelenítésére fogsz használni. Ugyanitt található a `favicon.ico` (az a kis icon amit a böngésződ megjelenít pl.: a tabokon az oldal neve mellett) a `robots.txt` illetve a `humans.txt` is, amelyekből az előbbi a keresőrobotok számára szolgáltat információkat az oldalról, a második pedig információt tartalmaz azokról az emberekről akik a weboldal létrehozásában segítettek.

A számodra ismeretlen vagy nem használatos kódrészleteket nyugodtan kommentezd ki vagy töröld ha a továbbiakban már nem lesz szükéged rá. Amennyiben szükségesnek érzed nyugodtan módosíthatod ezeket a fájlokat (pl.: az eddig megszokott módszereiddel teljesen ellentétesen használ dolgokat) hiszen ez az egész inkább tekinthető egy ajánlásnak mint kőbe vésett betartandó szabályoknak amiken nem lehet módosítani.

## Segéd CSS osztályok

Nézzük az `.ir` CSS osztályt (image replacement). Ezt az összes olyan elemnek a stílusához hozzáadhatod melyeket képekkel akarsz helyettesíteni. A szélességet és a magasságát kötelező megadni annak érdekében, hogy a kép látszódjon.

```css
.ir {
  background-image: url(http://yoursite.com/images/logo.jpg);
  background-size: 100% auto;
  width: 450px;
  height: 450px;
}
```

A következő segéd CSS osztályokat foglalja magába a sablon:

- `.hidden` (add hozzá azokhoz az elemekhez amelyeket el akarsz rejteni)
- `.visuallyhidden` (elrejti a szöveget a böngészőben de a képernyő olvasók még látják)
- `.invisible` (úgy rejti el az elemet, hogy közben nem befolyásolja az oldal felépítését)
- `.clearfix` (biztosítja, hogy a lebegtetett (`float`) gyereket az adott elem tartalmazza)

## Hova írjam a kódomat?

A projekt kommentezett így sok helyen ezeket a részeket megjelölték a készítők. A `main.css` fájlba
egy kommentel van jelölve, hogy a saját stílusaidat hol definiáld:

    /* ======================================================
       Author's custom styles
       ====================================================== */

Ugyanígy megvan az `index.html`-ben is, hogy hova kezdd el írni az oldaladnak a kódját:

    <!-- Add your site or application content here -->

Az oldaladon futó JavaScript kódokat érdemes a `main.js` fájlba írni, ez a fájl teljesen üres.
Mielőtt nekilátsz egy új projektnek mindenképp érdemes teljesen átnézned az egészet illetve elolvasnod a szükséges dokumentációkat is.

## Media query

A `main.css`-ben megtalálhatóak azok a placeholderek amelyek ahhoz kellenek, hogy különböző méretű képernyőket támogassunk (Reszponzív Web Design). A dokumentáció azt ajánlja, hogy az oldalad tartalmához igazodjanak ezek a media query-k és ne a képernyő méretének tükrében hozzuk őket létre. A "mobile first" megközelítés nagyon fontos viszont nem mindenki szeretné támogatni a különböző eszközöket. Ilyenkor csak egyszerűen vedd ki a placeholdert a CSS-ből.

A HTML5 Boilerplate egy remek template arra, hogy bármilyen új projektet elkezdj. Rengeteg böngésző létezik amelyekhez támogatást nyújt és egy vázat ahhoz, hogy weboldalakat hozz létre mobilra, tabletre és desktopra.
