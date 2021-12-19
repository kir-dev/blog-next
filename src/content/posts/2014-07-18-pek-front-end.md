---
layout: post
author: kresshy
date: 2014-07-18 11:08:00
title: WIP PéK Front-end
comment: true
---

Nagyon sokat írtunk már a PéK-ről, de eddig nem nagyon osztottunk meg információkat róla, hogy miként fog kinézni az alkalmazás. Az elmúlt napokban viszonylag jól haladtunk a fejlesztéssel, így kaphattok egy kis betekintést a front-end jelenlegi állapotáról. Szó lesz a használt technológiákról, illetve a folytatásról is.

## Egy kis UX és UI

A folyamat úgy kezdődött, hogy kukáztuk a jelenlegi felületet és az alapjaitól átgondolva kezdtük el fejleszteni az újat. A célunk, hogy teljesen eltüntessük a nyomait, hogy korábban ez két különálló alkalmazás volt, így elég sokat ötleteltünk a megfelelő irányról. Szeretnénk egy modern és felhasználóbarát felületet készíteni a számotokra és ezzel megkönnyíteni az alkalmazás használatát.

Az alkalmazást logikailag két külön részre különítjük el. Van egy publikus része, amit mindenki lát és használ: ez a profil, körök, profil szerkesztés, közösségi pontjaid, tagságaid, stb. A zárt részét pedig a körvezetők és adminisztrátorok érik csak el, ilyen például: a közösségi pontozás leadása, illetve jóváhagyása, új kör létrehozása, pék admin felület, svie admin felület, stb. Ezekkel az oldalakkal az emberek többsége nem találkozik, de a nagyobbik részét ezek teszik ki az alkalmazásnak. Most a publikus részéről láthattok egy kis betekintést.

## The UI flow

![ui-flow](https://warp.sch.bme.hu/ad342c8a557d49268e40fd229540b11fbfd5618f/800)

A designon hamarabb kezdtünk el dolgozni, de mikor úgy éreztük, hogy megtaláltuk a megfelelő utat el kellett gondolkozni arról, hogy ez az egész miként fog összeállni egy nagy webalkalmazássá. Egy délután összeültünk közösen és átbeszéltük, hogy milyen elemek kellenek még a front-endre, és milyen legyen a navigáció az oldalon. A korábbi felmérésünkből, amit szép számmal kitöltöttetek kiderült, hogy a legtöbben keresésre használjátok az alkalmazást ezért úgy döntöttünk, hogy az oldal fő funkcionalitása a keresés lesz. Mindenhol tudtok majd keresni, a főoldaltól kezdve, a profilon át, a körös oldalakon keresztül mindenhol lesz egy kereső mező, ahonnan bármit könnyedén el tudtok érni.

## A kezdőoldal

![landing](https://warp.sch.bme.hu/0c06143f10dc155436a8c39d38998ec703ab6b84/800)

A kezdőoldalt ennek megfelelően egy nagy kereső felületté alakítottuk át, ahol a keresési találatok kis kártyákként fognak megjelenni. Az oldal tetején állandó jelleggel találhattok majd egy navbart, aminek a jobb oldalán elérhetitek a profilotokat, illetve egy menüt, ahonnan elnavigálhattok az alkalmazás további oldalaihoz. Természetesen a keresési találatokra kattintáskor is megtörténik a navigáció a profilra vagy a kör profiljára. A menüben egy új feature lesz, az értesítések megjelenítése. Ez főleg a fontos időszakokat fogja mutatni a körvezetők számára, de később egyre több eseményre fogja majd a figyelmeteket felhívni.

## A profil

![profile](https://warp.sch.bme.hu/dfbda73d50cce96e19119536d938603a062e514e/800)

A profil is átalakul, sokkal modernebb lesz a megjelenése a felületnek. Ezen a képen a lenyíló menüt is láthatjátok. A profilon tabok lesznek, amin az információkat csoportokba szervezve megjelenítjük. Az alkalmazás többi oldala is ilyen stílusban lesz elkészítve, és amikor kész vagyunk vele, akkor reményeink szerint lesz mobilra optimalizált verzió is, de ez még nagyon a jövő zenéje.

## Stuffs 4 geeks

Fizikailag három részre lehet elkülöníteni jelenleg az alkalmazást, A back-end JavaEE-ben van írva, amit rendesen megdolgozott tmichel és balo azért, hogy kevesebb bug legyen benne, és a későbbiekben sokkal egyszerűbb legyen karbantartani. A front-end Node.js-ben készül, ami kommunikálni fog a back-enddel. A kliens oldalon, ami a böngésződben fut, természetesen JavaScriptben készülnek a dolgok a HTML és CSS mellett, de hogy a saját életünket is kicsit megkönnyítsük az Angular.js keretrendszert használjuk. Erősen Ajaxos lesz az alkalmazás és reményeink szerint ezzel remek felhasználói élményt fog nyújtani számotokra. Az egyes elemeknek meglesznek a saját controllereik, illetve különböző direktívákat is alkalmazunk a komplex funkcionalitással rendelkező elemekhez. Ilyen például a tabokat megvalósító `tabset` direktíva, amelynél a ui.bootstrap-et hívtuk segítségül. Ebben nagyon sok előre definiált direktíva van, így kevesebb sajátot kell írni, csak CSS-ből megfelelően felül kell definiálni a bootstrapes kinézetet. A kliens oldalról történő erőforrás eléréseket pedig angular-serviceként implementáljuk.

Remélem élveztétek az elcsepegtetett információ morzsákat, netán ha túl sok a szabadidőtök így a nyáron, és kedvet kaptatok a fejlesztéshez keressetek minket irc-en, githubon, vagy emailben!
