---
title: 'Hogy is van ez az új Kir-Dev blog?'
author: tmichel
layout: post
date: 2014-01-06 22:45:00
---

Már az [első bejegyzésben](/post/2013-12-23-megujulunk) is említettem, hogy az új blogunkat a [Jekyll](http://jekyllrb.com/) blog "motor" hatja.

A statikus oldalakat generáló eszközök a [fénykorukat élik](http://staticsitegenerators.net/) manapság. Ahogy nevük is utal rá, ezek az eszközök egy statikus HTML-ekből álló oldalt generálnak. Képesek sablonokat és bejegyzéseket is kezelni (ha nem tudnának, akkor nem sok értelmük lenne...). Elég ha a mi [blogunk repoját](https://github.com/kir-dev/kir-dev.sch.bme.hu) nézzük. Pár HTML fájl és egy kitüntettet `_posts` mappa. Ennyi az egész, a dolgok nehezét pedig rábízzuk pár automatizált eszközre.

## Ötlettől a publikálásig

Ha belenéztek a [README](https://github.com/kir-dev/kir-dev.sch.bme.hu/blob/master/README.md) fájlunkba, akkor láthatjátok, hogy egy új bejegyzést nem sokkal bonyolultabb megírni és publikálni, mint egy klasszikus blog esetén.

A történet azután kezd érdekes lenni, hogy egy bejegyzés bekerül a `master` branch-re. Léteznek úgynevezett [hookok githez is](http://git-scm.com/book/en/Customizing-Git-Git-Hooks). Miután a reponk a Githubon van, így nincs közvetlen hozzáférésünk a ezekhez, de szerencsére a Github ezt is elegánsan [megoldotta](https://help.github.com/articles/post-receive-hooks).

Egy webhook beregisztrálásával minden `push`-ról értesülünk. A webhooknak egy URL-t kell megadni, amit meg tud hívni (a részletek ez előző linken találhatóak). Itt jön képbe egy újabb kis eszköz. A [gohub](https://github.com/adeven/gohub) nevű mini webszerver, ami figyeli a beérkező hívásokat (nyugi, csak bizonyos IP-kről:) és egy shell parancsot futtat le. Esetünkben ez az oldal teljes újragenerálása, amit aztán Apache-on keresztül szolgálunk ki.

Lényegében tehát a következő történik:

1. megszületik az új bejegyzés
2. a `master` branch-be push-oljuk
3. a szerverünkre beesik egy kérés a Githubtól, jelezve, hogy valami történt
4. lehúzzuk a változtatásokat
5. automatikusan újra legeneráljuk az oldalt
6. profit

## De mégis miért jó ez?

A statikus HTML-eknek több előnye is van. A kiszolgálásuk minimális erőforrást igényel és egy Apache-ot beállítani sem túl bonyolult. Nem kell adatbázisokkal és biztonsági mentésekkel bajlódni. Az utóbbiról a git és a Github gondoskodik számunkra. Ezen kívül a blogmotor frissítésével sem kell bajlódni. Nem kell HTTPS és a támadási felületet is minimalizáljuk.

Tagadhatatlan, hogy egy ilyen blog beállítása több kezdeti ráfordítást igényel, de hosszú távon sokkal kevesebb karbantartási munka van vele.

Az már csak hab a tortán, hogy az új bejegyzések átnézése és javítása sokkal könnyebbé vált. Az előző Wordpress nem biztosított semmilyen eszközt az együttműködésre a git pedig pont erre van. :)
