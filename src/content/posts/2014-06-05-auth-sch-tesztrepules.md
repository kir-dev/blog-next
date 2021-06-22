---
layout: post
author: tmichel
date: 2014-06-05 00:56:00
title: 'auth.sch tesztrepülés'
comment: true
---

Már többször volt szó arról (legutóbb az [auth.sch koncepciójának
felvázolásakor][1]), hogy a Schönherzben megújítjuk és egyben le is cseréljük a
jelenlegi SSO megoldásunkat. Ez lényegében azt jelenti, hogy a következő
félévtől a jól megszokott VIR-es bejelentkező felületet nyugdíjazzuk és helyette
egy rugalmasabb megoldást adunk. Felhasználói szemszögből nem sok minden
változik. A következő félévtől már nem tudsz[^1] majd belépni a VIR
felhasználóddal, helyette a _schaccodat_ vagy a _BME címtár azonosítódat_ tudod
majd használni.

A fejlesztések már nagyban folynak - mind a KSZK, mind pedig a Kir-Dev oldalán.
Ennek előszelét láthatjátok most a megváltozott bejelentkező képernyőn. Az
[auth.sch][2] már készen áll egy nyílt tesztre, valamint [Balo][3]
meghegesztette az OpenAM-et, hogy be lehessen jelentkezni VIR-be auth.sch-n
keresztül is.

Tehát röviden összefoglalva, mostantól lehetőség van a VIR-be bejelentkezni az
ősztől élesedő rendszeren keresztül is. Minden bejelentkezésnél választhatsz,
hogy az auth.sch-n keresztül jelentkezel be, vagy maradsz a régi jól bevált
formnál.

Bátorítanék mindenkit, hogy próbálja ki az új bejelentkezési módszert. Ezzel
nagyban segíted a munkánkat. Az a jó, ha minél előbb kijönnek a bajok és
mindenféle bugok a rendszerből, és ősszel már egy stabil és jól használható
szoftvert tudnánk átadni.

Előre is köszönjük a segítségedet. Még egyszer hangsúlyoznám, hogy fejlesztés
alatt lévő szoftverről van szó, így ha nem megy valami, akkor mielőtt melegebb
éghajlatra kívánsz minket, inkább írj nekünk. Leggyorsabban a [#kir-dev][4] irc
csatornán érsz el bennünket.

## Fejlesztőknek

A körös és egyéb VIR bejelentkezést használó oldalak fejlesztőit és
karbantartóit arra szeretnénk kérni, hogy minél előbb kezdjék meg az átállást az
auth.sch-ra. **Erre már most is van lehetőség**. Az auth.sch-hoz [zolij][5]
készített egy jó leírást, amit a projekt wiki oldalain találtok meg a
git.sch.bme.hu-n: [itt][6] és [itt][7]. Ha bármilyen kérdés van, akkor újfent a
[#kir-dev][4] irc csatornán tudtok kérdezni.

[^1]: Ez nem teljesen igaz, mert a következő félév folyamán, míg a teljes átállás

meg nem történik, a régi VIR is használható lesz, de csak korlátozottan.

[1]: /post/2014-03-16-auth-sch
[2]: https://auth.sch.bme.hu/
[3]: https://twitter.com/vbalazs
[4]: http://webchat.freenode.net/?channels=kir-dev
[5]: https://twitter.com/zolij
[6]: https://git.sch.bme.hu/kszk/authsch/wikis/oauth_client
[7]: https://git.sch.bme.hu/kszk/authsch/wikis/api
