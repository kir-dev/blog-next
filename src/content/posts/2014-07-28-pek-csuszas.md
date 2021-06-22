---
layout: post
author: tmichel
date: 2014-07-28 14:30:00
title: 'PÉK fejlesztés várhatóan csúszik némileg'
comment: true
---

A [legutolsó bejegyzésünkben][1] arról számoltunk be, hogy szépen halad a munka.
Nagyon sok szoftverprojekt életében elérkezik a pillanat, amikor be kell ismerni
az elkerülhetetlen csúszás tényét. Mi most megérkeztünk ehhez a pillanathoz. Az
új PÉK az átgondolt felületével és vállalható felhasználói élményével egyelőre a
jövő homályába veszik.

Januárban, amikor indult az átalakítási projekt, nagyon optimistán egy július
végi időpontot tűztünk ki az éles indulásra. Pontosabban a gólyák érkezésével
együtt akartuk indítani az új rendszert. Ahogy közeledett ez a dátum egyre
valószínűtlenebbé vált, hogy ezt nem sikerül majd tartani. Ekkor kitoltuk
augusztus végére az indulást. Ennél tovább már nem lehet halogatni, mert a
gólyák már nem tudnak regisztrálni a mostani (2.7.0-ás) PÉK-be, így például a
[lists.sch][2] szolgáltatásait nem tudnák igénybe venni, ahogy a [wiki][3]-t sem
tudnák szerkeszteni.

A szomorú tény az, hogy az augusztus végi határidőt sem tudjuk tartani. Ez
nekünk fáj a legjobban. Kényszermegoldásként a jelenlegi rendszert alakítottuk
át, hogy együtt tudjon működni az [auth.sch][4]-val. Ez 2.8.0-ás verziószámmal
fog kikerülni hamarosan. Már most is tesztelhető, ha valakit érdekel a dolog.
Keressetek minket ircen!

Ezzel a kényszermegoldással a rendszer továbbra is használható marad, mi pedig
nyerünk némi időt az új verzió befejezésére. A pontos roadmap egyelőre még nem
tisztázott.

A PÉKben az a szép, hogy open source. A kód kint van [githubon][5], és pull-
requesteket szívesen fogadunk. Aki kedvet kapott hozzá, hogy alakítsa a
Schönherz közéletének egyik fontos pillérét, az ne habozzon. Csak egy `git clone`-nyi távolságra vagyunk.

[1]: /post/2014-07-18-pek-front-end
[2]: https://lists.sch.bme.hu/wws
[3]: https://wiki.sch.bme.hu
[4]: /post/2014-06-05-auth-sch-tesztrepules
[5]: https://github.com/kir-dev/korok
