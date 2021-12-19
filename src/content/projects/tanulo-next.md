---
layout: project
title: TanulóSCH
lead: Közös tanuláshoz partnerkeresést segítő alkalmazás
github: https://github.com/kir-dev/tanulo-next
website: https://tanulo.sch.bme.hu
status:
  label: Aktív
  color: green
techs:
  - Typescript
  - Node
  - Tailwind
featuredImage: ../images/projects/tanulo-next.png
---

## A projekt története

A Tanuló web eredetileg egy, azóta már a körvezetőséget is megjárt tagunk újoncprojektjeként indult még 2016-ban. A munka egy jóideig haladt, azonban az 1.0 release-t ez a verzió sosem érte meg, a fejlesztés abbamaradt (a régi kód megtekinthető [itt](https://github.com/kir-dev/tanulo)).

2019 decemberében azonban egy, a körvezetőséget szintén megjárt tagunk újra elővette a projektet az archívumból és úgy döntött, az egészet modern alapokról teljesen újraépítve nekiáll a megvalósításnak. A projekt ezúttal viszonylag gyorsan haladt, és a 2020-as év eseményei miatt kissé lelassult fejlesztés után 2020. szeptemberében sikeresen elindítottuk a TanulóSCH-t.

## Használt technológiák

A használt könyvtárak és technológiák az új alkalmazásban építettek a korábbi projektre, azonban pár területen a kezdetektől változtattunk, bizonyos elemeket pedig a feljesztés közben cseréltünk ki a kódolás kényelmesebbé tétele és a későbbi jobb karbantarthatóság érdekében.

Ami a kezdetektől fogva fix, az a TypeScript, Postgres valamit pug használata. Backend oldalon a TypeORM lett időközben Objection.js-re cserélve, frontenden pedig a Bulma frameworköt nyugdíjaztuk a kissé más megközelítést használó, de a fejlesztést nagyon nagy mértékben meggyorsító [TailwindCSS](http://tailwindcss.com)-re. Ez utóbbi igencsak nagy segítség volt, amikor az schdesign-tól megrendelt új felhasználói felületet implementáltuk.

## A projekt jövője

Már az oldal indulásakor nagyon örültünk, hogy rendkívül pozitív fogadtatása volt a kollégisták körében. Reméljük, hogy ezzel a kis webalkalmazással könnyebbé tudjuk tenni a hallgatók mindennapi életét és idővel a kollégista élet mindennapi részévé válik a használata.
