---
layout: post
author: feketesamu
date: 2023-02-23 14:21:16
title: Az új Konzisite fejlesztése
lead:
tags:
  - hírek
  - projekt
comment: true
featuredImage:
ogImage:
---

```toc

```

## Mi is a Konzisite?

A BME VIK hallgatói találkozhattak már a régi Konzisite-tal, melyet Hallgatói Képviselet készített valamikor a 2010-es évek elején. Az oldal fő feladat az, hogy egy felületet adjon a kar hallgatóinak, ahol konzultációkat kérhetnek, vagy ha konzultációt tartanak, meghirdethetjék azt az egész karnak. Ezen kívül a résztvevők értékelhetik is a konzikat, amelyet más statisztikákkal együtt a HK felhasznál ösztöndíjak kiosztásánál. Sajnos ez az oldal már sok szempontból elavultá vált, fejlesztése, javítása pedig nagyon nehézkes volt. Ezért kért meg minket a HK, hogy fejlesszünk egy új verziót. Amellett, hogy az eddig létező funkciókat megtartsuk, volt pár új funkció ötletük is. Valamint természetesen az is cél volt, hogy a jövőben is könnyen bővíthető legyen az oldal. Mi a Kir-Dev-nél fontosnak tartjuk, hogy az új tagjaiknak átadjuk azt a tudást, amit mi a körben szereztünk, így tudás nem veszik el, a projektjeink pedig éveken keresztül üzemelhetnek, hiszen mindig lesz, aki tud javítani vagy új funkciót fejleszteni.

## Külsős projektek a Kir-Dev-nél

Mint sok más projektünk a Kir-Dev-nél, a Konzisite is egy külsős projekt, azaz nem mi találtuk ki, hanem egy másik kör vagy szervezet (ez esetben a HK) keresett meg minket. Ilyenkor tipikusan egy minél pontosabb specifikációt kérünk a megrendelőtől, ami alapján mi meg tudjuk kezdeni a tervezést. Emellett kinevezünk egy projektfelelőst, aki a szívén viseli a projektet a jövőben. Az ő felelőssége lesz a kapcsolattartás a megrendelővel, a feladatok felosztása a körön belül, valamint a projekt haladásának felülete. Ennél a projektnél én kaptam ezt a feladatot, ami nekem is új volt, hiszen akkor még csak fél év voltam tagja a körnek.

## Tervezés

A specifikáció alapján egyértelmű volt számunkra, hogy ez a bonyolultabb projektjeink közé fog tartozni. A tavaszi félév közepén, a NodeJS és React tanfolyamok végezetével sok új érdeklődő újoncunk volt ezekben a technológiákból, viszont nem volt ilyen futó projektünk, így a Node-React stack mellett döntöttünk. A komplexitás miatt az általunk sokat használt PostgreSQL relációs adatbázist választottuk, ami ideális nagy, bonyolult adatbázis sémájú projektekhez.

Az első és legfontosabb tervezési lépés egy adatvezérelt rendszer fejlesztése előtt az adatbázis sémájának megtervezése. Erre épül minden, később aránylag nehéz változtatni, de ha nem ideális, nagyban meg tudja nehezíteni a fejlesztést. Ezt az újoncokkal közösen tettük meg, akik így a tanfolyam elvégzése után rögtön részt vehettek egy valódi projektben, ráadásul már a legelső fázistól. Az eredmény: TODO

Ezután az oldal alapvető felépítését terveztük meg. A HK csak funcionalitást specifikált számunkra, így szabad kezet kaptunk az oldal felépítésének megtervezésében. Megbeszéltük, milyen oldalakra bontsuk fel az alkalmazást és hogy az egyes oldalon milyen funckiók, gombok és linkek kapjanak helyet. Ezt is fontos viszonylag korán eldönteni, hiszen az alkalmazás backendjét, vagyis a szerveroldali kódot ez alapján lehet elkészíteni.

## Választott technológiák

### Node.js

NodeJS-t választottuk backend technológiának. A NodeJS egy JavaScript futtatókörnyezet, ami lehetővé teszi, hogy böngészőn kívül futtassunk JS-t. Manapság egyre gyakrabban használt ez webalkalmazások backendjeként, hiszen könnyen tanulható, a JavaScript-tel minden webfejlesztőnek van tapasztalata, hiszen frontenden kikerülhetetlen, valamint nagyon sok könyvtár elérhető, amiknek köszönhetően nem kell mindent a nulláról lekódolnunk. Azonban nagy projektben a JavaScript-tel nehéz fejleszteni, hiszen gyengén típusos, azaz a változók futás közben típust változtathanak. Ilyen kódbázist nehéz konzisztensen tartani sok fejlesztővel, ezért a NodeJS-t TypeScript-tel hasznátuk (és használjuk is minden más projektünkben is). Ez a nyelv a JS-nek egy kiterjesztése, ami egy jobb típusrendszert biztosít, de végül JS-re fordul.

### NestJS

A NodeJS magában viszont még nem elég egy komplex webalkalmazás elkészítéséhez. Ehhez a NestJS nevű keretrendszert használtuk, ami .... Korábban nem volt Nest-es projektünk, de a tanfolyamon már ezt tanítottuk, és az itt elkészített projekt számunkra is egy Proof of Concept projekt volt, azaz már korábban kicsiben kipróbáltuk, és megfelelt az igényeinknek.

### Prisma

Mint már említettem, az alkalmazás adatbázisa meglehetősen összetett lett. Egy ilyen sémához SQL lekérdezéseket írni igen nehéz lenne, de szerencsére erre nem is volt szükség. Szintén ebben a projektben próbáltuk ki először a Prisma ORM-et (Object Relational Mapping TODO). Ez egy olyan JavaScript könyvtár, ami kezeli a kapcsolatot a kódunk és az adatbázis között. Az adatbázisból kinyert rekordokat TypeScript objektumokká alakítja, valamint a lekérdezések egy nagyon kényelmes JS szintaxissal adhatóak meg. Talán elsőre megérteni nem könnyű, de nagyon tömören meg lejet fogalmani a komplex lekérdezéseket is. TODO példa

### React

Chakra UI, ReactQuery, ReactHookForm

## Tapasztalatok

Projektvezetőként nagyon élveztem ezen a projekten dolgozni, hiszen nekem is ez volt az első fullstack projektem, ahol a legelső fázistól kezdve részt vettem a munkában. A tech-stack választást nagyon jól eltaláltuk, bár ez nem az én érdemem, hanem a kör tapasztaltabb tagjaié. Büszke vagyok a projektre amit összeraktunk a körrel, és remélem sokáig tudják használni a hallgatók.

## Kitekintés

Ha ez a poszt felkeltette az érdeklődésedet és szeretnél becsatlakozni egy hasonló projektbe, akkor mindenképpen vedd fel velünk a kapcsolatot! Március 1-jén kint leszünk a Gólyakörtén, gyertek és beszélgessünk egy jót! A tavaszi félév elején indulnak a tanfolyamaink, ahol a nulláról megtanítjuk a legfontosabb dolgokat az itt említett technológiákról. Ezekről többet a Tanfolyamok oldalon tudhatsz meg. Ha ezekről lemaradtál volna, a Kapcsolat oldalon megtalálod a kontaktjainkat!
