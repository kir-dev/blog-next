---
layout: project
title: Konzisite
lead: Konzultációk rendezésére használt weboldal a HK megbízásából
github: https://github.com/kir-dev/konzisite-frontend
website: https://konzi.kir-dev.hu/
status:
  label: Aktív
  color: green
techs:
  - NestJS
  - React
  - Prisma
featuredImage: ../images/projects/konzisite.png
---

<style>
.caption {
  font-style: italic;
  text-align: center;
  margin: -0.5rem 0 2rem 0;
}
</style>

# Konzisite a Kir-Dev kezelésében

## Korábbiakban

Korábban a VIK HK régi oldalán futott a konzik rendezése és menedzsmentje, amely viszont idővel megöregedett, így felkértek minket, készítsünk új alapokon, kicsit több funkcionalitással egy új Konzisite-ot!

![oreg_konzisite](https://warp.sch.bme.hu/images/kepernyokep-2022-12-04-031952)

<div class="caption">Konzisite korábbi nyitólapja</div>

## Választott technológiák

A projekt alapja egy NodeJS REST API, mely egy PostgreSQL adatbázisban tárolja az adatokat. A webes kommunikációt a NestJS, az adatbázissal való kapcsolatot pedig a Prisma keretrendszer egyszerűsíti. A backend kódbázisa [itt böngészhető](https://github.com/kir-dev/konzisite-api). A felhasználói felület pedig React-tal készült, az egységes megjelenés a Chakra UI-nak köszönhető. A frontend kódbázisát [itt tudod megnézni](https://github.com/kir-dev/konzisite-frontend).

## Új funkciók

Amellett, hogy az eddigi funkciókat könnyebb használni és az oldal megjelenése szebb, elkészült pár új funkció is. Van lehetősége bárkinek csoportokat létrehoznia, nem kell ehhez a HK-nak emailt írni. Egy konzinak több előadója is lehet, mindegyiküket külön lehet értékelni. Egy felhasználóra érkezett értékelések megjelennek a profilján. Van egy külön felhasználó böngésző oldal, ahol publikus a konzitartók átlagos értékelése és egyéb statisztikák is. A konzi tartóknak van lehetősége jegyzet feltöltésére egy konzihoz, amit a résztvevők az alkalom után tölthetnek le, ha értékelték az előadókat.

## Bővebben

A fejlesztés folyamatáról és a választott technológiákról bővebben is írtunk az első éles verzió megjelenésekor íródott [blogposztunkban](https://kir-dev.hu/post/2023-03-05-az-uj-konzisite-fejlesztese/).

![Az új konzisite nyitólapja](https://warp.sch.bme.hu/images/konzisite_16_10)

<div class="caption">Az új konzisite nyitólapja</div>
