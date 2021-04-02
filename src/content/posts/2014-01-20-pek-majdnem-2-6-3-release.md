---
layout: post
author: tmichel
date: 2014-01-20 22:45:00
title: 'PÉK (majdnem 2.6.3) release'
category: pek
---

A PÉK-et (<b>P</b>rofil **é**s **K**örök) a legtöbben a félév végi értékelésleadási időszakban használják, ilyenkor fokozottan próbálunk figyelni a jelentkező hibákra és felhasználói visszajelzésekre.

Az utóbbi időben többször is frissítettük az alkalmazást, javítva a jelentkező hibákat. Volt néhány érdekes is, de többnyire apró, a felhasználóknak kellemetlen problémák jelentkeztek.

A legutolsó hivatalos release óta [itt tekinthetitek meg](https://github.com/kir-dev/korok/compare/sch-pek-2.6.2...60e0dfa66e7c12722188108159c1c50402ee0e90) az elvégzett javításokat.

A [legérdekesebb hiba](https://github.com/kir-dev/korok/issues/82) nem szerepel a fenti összefoglalóban. Hosszabb nyomozás után kiderült, hogy konfigurációs problémáról van szó. Az [SSSL](https://korok.sch.bme.hu/korok/showgroup/id/18) olyan nagy kör, hogy az értékelés leadásnál a formon több, mint 512 mező volt. Az 512 azért fontos szám, mert a szerver csak ennyi HTTP POST paramétert tartott meg, a többit levágta. Valószínűleg az ilyen módon törölt paraméterek között volt a bejelentkezett felhasználó azonosítója is, így a rendszer nem engedte, hogy a formot beküldhesse, mert úgy érzékelte, mintha nem lenne bejelentkezve. Az ezzel a hibával kapcsolatos éjszakákba nyúló hibakeresést köszönöm [balonak](https://profile.sch.bme.hu/profile/show/uid/balo).

A következő pár hétben még várható pár kisebb-nagyobb átalakítás, a munka főleg a backend oldalon zajlik. A PÉK-kel kapcsolatos jövőbeli terveinket hamarosan egy hosszabb bejegyzésben is kifejtem majd.
