---
layout: project
title: Pulcsi és FoltMékör web
lead: Rendelési és marketing weboldal a Pulcsi és FoltMékör számára
github: https://github.com/kir-dev/himzosch
website: https://himzosch-staging.kir-dev.sch.bme.hu/
status:
  label: Aktív
  color: green
techs:
  - Rails 7
  - Tailwind
featuredImage: ../images/projects/himzosch.png
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

## Új célok

A frontend React alapú lesz, ahogy most már nagyon sok új website-unk, [itt elérhető a repó hozzá](https://github.com/kir-dev/konzisite-frontend). Vercelen hosztoljuk. A backend pedig NestJS alapú lesz, repója [itt található](https://github.com/kir-dev/konzisite-api). Prisma került az adatelérési rétegbe, amely nagyszerű ORM-et és sématípusokat generál számunkra, könnyű benne a migrációk kezelése is. Természetesen mindkét oldalon TypeScript nyelven programozunk.

![dbscheme](https://raw.githubusercontent.com/kir-dev/konzisite-api/master/docs/er.png)

<div class="caption">Adatbázisséma</div>
