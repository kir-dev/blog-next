---
layout: post
title: 'Hypermedia API'
author: snapdragon
date: 2014-01-28 13:20:00
comment: true
---

Az informatikai rendszerek architektúrájában egy evolúciós lépés a szolgáltatás-orientált programozás ([SOA](http://en.wikipedia.org/wiki/Service-oriented_architecture)), melyet gyakran webszolgáltatások formájában implementálnak. A SOA architektúra azonban önmagában nem a webre született, így kialakult az erőforrás-orientált architektúra ([ROA](http://en.wikipedia.org/wiki/Resource-oriented_architecture)), mely inkább programozási paradigmának, vagy megvalósítási stílusnak nevezhető. A ROA lényege, hogy a szoftvert erőforrások formájában tervezzük meg és az alkalmazást alkotó szolgáltatások [REST](http://en.wikipedia.org/wiki/Representational_state_transfer) interfészen keresztül kommunikálnak.

Két gép kommunikációjához valamilyen protokollra és adatformátumra van szükség. Az erőforrás-orientált programozás során használt REST a HTTP protokoll webes szemantikáját terjeszti ki azzal, hogy az alkalmazás állapotát HTTP kérésekkel lehet lekérdezni, illetve módosítani. Ez webszolgáltatások esetén sokkal könnyebben használható, mint a SOA, ami sokáig egyet jelentett a [SOAP](http://en.wikipedia.org/wiki/SOAP)-pal. A REST-ben megfogalmazott vezérelvek nem határoznak meg konkrét adatátviteli formátumokat, így webszolgáltatások esetén felhasználástól függően különböző formátumokat használnak, mint például XML vagy JSON.

Hagyományos SOA rendszereknél egy távoli lekérdezés adatokkal tér vissza, ROA esetén viszont az alkalmazás további állapotaiba vezető átmenetek is a visszatérési érték részét képezik. Az alkalmazás állapota részletesen leírható a hypermedia formátumok metaadat leíró képességével, az állapotátmenetek pedig könnyen reprezentálhatóak a hypermedia adatformátumokban meglévő linkekkel: innen ered a technológia elnevezése a _Hypermedia API_. Használatával a klienseknek csak linkeken keresztül kell kommunikálnia a backend szolgáltatással, így weben rendkívül jól használható. Segítségével valóban vékony kliensek hozhatók létre, amik nagyon keveset tudnak a háttérben dolgozó szolgáltatásról. A szolgáltatás részleteinek változásakor nem kell változtatni a kliensen, ezért a Hypermedia API könnyebben használható programok számára és azokat így könnyebb is karbantartani.

## Adatformátumok

Lényegében bármilyen adatátviteli formátumot használhatunk, de a legelterjedtebbek, melyeket HTTP protokoll felett használnak a HTML, XML és a JSON. Más lehetséges formátumok például a CSV, YAML, Markdown, ATOM, de ezek kevésbé elterjedtek ilyen célból. Koncentráljunk a három legelterjedtebbre, és lássuk melyiknek milyen előnyei vannak.

### XML

- - Rendkívül kiforrott formátum és nagyon sokféle támogató technológia érhető el hozzá. Például transzformáció (XSLT), lekérdezés (XPath, XQuery), validáció (XSD, DTD).
- - Szabványos és minden programozási nyelvből elérhető.
- - Kliens oldalon nehezebb használni.
- - Nehézsúlyú: kommunikációs overhead.
- - Nincs natív állapotátmenet reprezentáció kiterjesztés nélkül.

### JSON

- - Kliens oldalon könnyű használni.
- - Könnyűsúlyú.
- - Nincs szabványos lekérdezés, validálás.
- - Nincs natív állapotátmenet reprezentáció kiterjesztés nélkül.

### HTML

- - Kiforrott formátum, sok támogató technológia.
- - Kliens oldalon használata triviális.
- - Javascript segítségével módosítható.
- - Natív állapotátmenet reprezentáció.
- - Jól jön, ha olvashatónak kell lennie az API-nak.
- - Nem mindig készíthető egyszerűen el az alkalmazás állapotának reprezentációja.

## Néhány példa

### Labirintus

Labirintus játék API XML felhasználásával:

- Különféle labirintusok közül választhatunk a _collection_ listából.

```html
<maze>
  <collection href="...">
    <link href="..." rel="maze" />
    <link href="..." rel="maze" />
  </collection>
</maze>
```

- A kiválasztott labirintusba beléphetünk, vagy visszaléphetünk a labirintus-listához.

```html
<maze>
  <item href="...">
    <link href="..." rel="collection" />
    <link href="..." rel="start" />
  </item>
</maze>
```

- Járkálhatunk a különböző cellákon (_cell_), újrakezdhetjük a labirintust, vagy választhatunk másik labirintust. Megjegyzés: természetesen nem mindig lehet minden irányban lépkedni, itt az összes lehetőséget felsoroltam.

```html
<maze>
  <cell href="...">
    <link href="..." rel="north" />
    <link href="..." rel="south" />
    <link href="..." rel="east" />
    <link href="..." rel="west" />
    <link href="..." rel="exit" />
    <link href="..." rel="maze" />
    <link href="..." rel="collection" />
  </cell>
</maze>
```

### Todo app

Todo alkalmazás API-ja [JSON+Collection](http://amundsen.com/media-types/collection/) adatformátumot használva (itt az _items_ tömbben vannak az adatok eltárolva és _queries_-ben a lehetséges műveletek):

```js
{
  "list" : {
    "link" : {
      "href": "{collection-uri}",
      "rel": "list"
    },
    "items" : [
      {
        "link" : {
          "href": "{item-uri}",
          "rel": "item"
        },
        "title" : "First task",
        "description" : "start JSON implementation of the list",
        "date-due" : "2010-05-01",
        "completed" : false
      },
        ...
    ],
    "queries" : [
      {
        "link" : {
          "href": "{query-link}",
          "rel": "today"
        }
      },
      {
        "link" : {
          "href": "{query-link}",
          "rel": "open"
        }
      },
      ...
    ]
  }
}
```

## Tervezés

A Hypermedia API-k tervezésének lépései:

1. Üzleti logika vizsgálata
2. Állapotgép készítése
3. Adatreprezentáció készítése

Az ábrázolás részletei a választott adatformátumtól függnek, de sok közös vonás van, amik megegyeznek az egyes formátumok között, közös elnevezésük angolul _H-Factors_. Ezek a tényezők alapvetően két részre bonthatók: vannak a _link factor_-ok, melyek a kliens-szerver kommunikáció létrehozásáért felelősek; és vannak a _control factor_-ok, melyek a metaadatok részleteit módosítják. Lássuk hogyan épül fel belőlük egy API, mely HTML-t használ adatformátumként:

### Link factors

#### LE (Embedding links)

Egy adott URL-en lévő tartalmat be kell olvasni és az adott helyen megjeleníteni, más néven beillesztés.

```html
<img alt="..." src="..." />
```

#### LO (Outbound links)

Egy adott URL-en lévő tartalmat ki kell olvasni és egy új nézetben megjeleníteni, más néven navigáció.

```html
<a href="...">...</a>
```

#### LT (Templated links)

Egy adott URL-en lévő tartalmat valamilyen klienstől származó információkkal paraméterezve kell kiolvasni.

```html
<form method="get" action="http://www.example.org/">
  <input type="text" name="search" />
  <input type="submit" />
</form>
```

vagy

```html
<a href="http://www.example.org/?search={searchParam}"></a>
```

#### LI (Idempotent links)

Idempotens metódusok, melyek többszöri végrehajtása ugyanazt az eredményt adja, mint az egyszeri végrehajtás. HTTP protokoll esetén ezek a _PUT_ és _DELETE_ verb-ekkel végrehajtott kérések. HTML-ben csak Javascript segítségével megvalósítható.

#### LN (Non-idempotent links)

Nem idempotens metódusok, ilyenek a HTTP protokoll esetén a _POST_ verb-ekkel végrehajtott kérések.

```html
<form method="post" action="http://example.org/comments/">
  <textarea name="comment"></textarea>
  <input type="submit" />
</form>
```

### Control factors

#### CR (Read controls)

Az adatok olvasását befolyásoló tényezők. Ilyenek HTTP protokoll esetén a fejléc (header) változók, mint például a _Content-Type_.

#### CU (Update controls)

Az adatok olvasásának befolyásolását segíti ez a tényező. Ilyen HTML esetén a formokban található _enctype_ attribútum, mely a kéréshez tartozó _Content-Type_ fejlécet tudja módosítani.

```html
<form method="post" action="http://example.org/comments/" enctype="text/plain">
  <textarea name="comment"></textarea>
  <input type="submit" />
</form>
```

#### CM (Method controls)

Az adatkezelés módjának megváltoztatását segíti ez a tényező. HTML esetén a _method_ attribútum erre szolgál.

```html
<!-- frissítés -->
<form method="post" action="..." />
...
</form>

<!-- olvasás -->
<form method="get" action="..." />
...
</form>
```

#### CL (Link annotation controls)

Egy node annotációjával is módosíthatjuk egy URL-en található tartalom értelmezését. Ilyen HTML esetén a link tag _rel_ attribútuma.

```html
<link rel="stylesheet" href="..." />
```

## Konklúzió

Egy rövid bevezető után láthattuk hogyan épül fel a Hypermedia API, megismertük a főbb jellemzőket. Láthattuk hogy:

- hogyan csökkenti a csatolást a kliens és a szerver oldali kód között a paradigma a belső megvalósítás függetlensége miatt (nincs konkrét url-től, paraméterektől való függőség)
- hogyan lesz könnyebben használható kliensek számára
- hogyan lesz olvashatóbb felhasználók számára

Egy szóval linkek használata az API-ban egy jó dolog, próbáljátok ki a [GitHub API-ját](https://api.github.com/)! Akit továbbiakban is érdekel a téma [itt találhat](https://github.com/mamund/Building-Hypermedia-APIs) 3 teljes implementációt XML, JSON és HTML nyelven, valamint teszt klienseket is hozzájuk.
