---
layout: post
author: yeti
date: 2019-11-11 21:41:05
title: Költözünk
tags:
  - hírek
  - ops
comment: true
---

## A múlt

Egy szomorú hírrel kell kezdenem ezt a blogbejegyzést. Történt ugyanis, hogy hőn szeretett Brian szerverünk, aki sokáig kitartóan szolgált és látta el webszerveri kötelességét, mára annyira instabil állapotba került, hogy kénytelenek voltunk kényszernyugdíjazni az öreg harcost.

## A jelen

Szerencsére a sors keze nem volt teljesen kegyetlen velünk, és szert tettünk ~~két~~ egy, bár szintén veterán, de még egészen jól működő utódra. Sajnos az együkükbe egyelőre nem tudtunk életet lehelni (táphiba a gyanú), de pótalkatrésznek még tökéletes lehet.

Az új szerver neve, megtartva a Kir-Dev hagyományos nomenklatúráját, szintén a Family Guy sorozat szereplői közül került ki. Ezúttal Lois-ra esett a választás, és szerencsénkre hardware-es felszereltségében nem kelt csalódást: 2U-s belsejében 24 processzmag mellett 64GB RAM teljesít szolgálatot. Ahogy az alábbi képen is látszik, számítási teljesítményből nem lesz hiány.

![Lois htop](https://warp.sch.bme.hu/img/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBOZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--88c907db1188597e2435cdd81dae97c9264b1df0/lois_htop.png)

## A jövő

Bár az új szerverünkre az átállás még folyamatban van, nem árthat máris a jövőbe tekinteni. Felmerült ugyanis, hogy lehetőség lenne a KSZK Kubernetes rendszerén is hosztolni az általunk készített weboldalakat. Ez amiatt nagyon csábító, hogy így a saját hardware esetleges hibáitól függetleníteni tudnánk magunkat, és egy jól skálázódó rendszeren tudnánk kiszolgálni az oldalakat. Mivel a jelenlegi rendszeren is mindent Dockerben futtatunk, az átállás vélhetően elég simán menne. A jelenlegi szervereinket pedig használhatnánk development environmentnek, CI szervernek, etc.
