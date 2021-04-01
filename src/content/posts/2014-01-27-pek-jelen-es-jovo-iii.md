---
layout: post
title: "PÉK jelene és jövője, III. rész"
author: tmichel
date: 2014-01-27 20:50:00 CET
category: pek
comment: true
---

Most, hogy már tisztában vagyunk a [PÉK és a VIR különbségével]({% post_url 2014-01-23-pek-jelen-es-jovo-i %}), valamint a [PÉK múltjával]({% post_url 2014-01-25-pek-jelen-es-jovo-ii %}), ideje rátérni a jelenére is. Nézzük meg, hogyan épül fel az alkalmazás és ez milyen problémákhoz vezet!

Mielőtt belefognék, meg kell jegyeznem, hogy a PÉK hagyományosan egy tanuló projekt volt a körön belül, emiatt sok egyetemi beadandót élt már meg. Fejlesztői sokszor ezen keresztül ismerkedtek meg a JavaEE világával és a webfejlesztéssel is. Ennek az eredménye, hogy néhol a kódbázis hagy némi kívánni valót maga után.

## Kívülről befelé

Haladjunk kívülről befelé. Nézzük meg, hogy mi is hajtja a PÉK-et.

Maga az alkalmazás JBoss-on fut, jelenleg talán ez a legjobb választás a most elérhető alkalmazásszerverek közül, de még így is gyakran fejfájást okoz. Sok szempontból nagyon szigorú, például a PostgreSQL drivert [balo](https://profile.sch.bme.hu/profile/show/uid/balo) csak hosszabb küzdés után tudta működésre bírni.

Néhány hiányossága és hibája ellenére mégis úgy érzem, hogy jó döntés volt Glassfish-ről átállni az elmúlt nyár folyamán.

Az alkalmazás alatt egy PostgreSQL adatbázisszerver működik. Ezt igazából csak a teljesség kedvéért említem meg, mert a [#67-es issue](https://github.com/kir-dev/korok/issues/67) lezárásával a PostgreSQL specifikus dolgok majdnem teljesen eltűnnek a rendszerből.

Az egyszerűsítés lassan a projekt mottójává válik. Az elmúlt nyár előtt nem volt egyszerű akár csak egy lokális példányt összelőni, nemhogy a kódhoz hozzányúlni. A célunk az, hogy az utánunk következő körtagok merjenek hozzányúlni és ne a _teljes_ újraírás legyen az első gondolatuk.

Ugyan csak lazán tartozik a PÉK-hez, de ide sorolnám még az OpenAM-et, ami az SSO szolgáltatásunkat hajtja. [Saját autentikációs modult](https://github.com/kir-dev/vir-auth) fejlesztettünk hozzá, így már képes adatbázisból is beléptetni a felhasználókat. Ez az adatbázis közös a PÉK-kel, ez is a nyári egyszerűsítések folyamán történt (korábban LDAP-ból történt az autentikáció). Az LDAP komponens megszüntetése egy fájó, de szükséges lépés volt. A PÉK esetében a _"kevesebb több"_ hozzáállás a kulcs.

Az SSO-tól eltekintve (amiről későbbiekben még írunk majd), sikerült egy klasszikus modell keretei közé visszaszorítani az alkalmazást.

## Belsőségek

A belső felépítés már régen sem volt túl bonyolult, a klasszikus három rétegű architektúrát követi, csak az arányok tolódtak el rossz irányba. Az üzleti réteg meglepően karcsú, már-már belecsúszik az adatelérési rétegbe. A webréteg túlságosan felduzzadt, rengeteg üzleti logika került bele. Ez nagyban megnehezíti az átláthatóságot és az automatikus tesztelhetőséget is alapjaiban gáncsolja el.

Az alkalmazás egésze a JavaEE stackre támaszkodik. Így JPA-t ([Hibernate](http://hibernate.org/)) használunk az adatbázis eléréséhez, EJB-ket az üzleti rétegben és [Wicketet](https://wicket.apache.org/) webes keretrendszerként.

Lassan, 6-7 év távlatából a JavaEE egy vitatható döntés, de tanulás szempontjából (ami esetünkben kiváltképp fontos) mindenképpen hasznos. Ugyan a tanulási görbe egy picit meredek, és az előítéletek is riasztóak mind magával a Javaval, mind a JavaEE-vel szemben. Ha valaki túl tudja tenni magát ezeken, a JavaEE egy kifejezetten jó technológia. Megvannak a saját butaságai, de ez alól egyik platform sem kivétel. A JavaEE erősségei a backend oldalon mutatkoznak meg a leginkább (tranzakciók, aszinkron üzenet feldolgozás, deklaratív autorizáció).

A PÉK esetében ez nem érzékelhető egyértelműen, mert a rendszer bonyolultsága nem éri el azt a pontot, ahol ennek az összetett technológiának igazán kijönnének az előnyei. Sőt, valószínűleg sosem fog akkorára nőni, hogy ez megtörténjen.

A problémáink legnagyobb része nem a backend oldalon mutatkozik, hanem régóta látható, hogy a frontend a szűk keresztmetszet. A Wicket a java világban a webes keretrendszerek közül az egyik leghasználhatóbb, de még így is alulmarad a többi nyelven elérhetőekhez képest.

A javas webes fejlesztés egyik legnagyobb fájdalma a folyamatos és sokszor időigényes _deploy_ (telepítés), ez alól a Wicket sem kivétel. A komponens-orientált dizájn pedig valami '90-es évekbeli maradvány érthetetlen túlélése. Manapság már ritka, hogy a klasszikus formokkal és jelentősebb ajax használat nélkül is elboldoguljunk. Így a Wicket az utóbbi időben inkább csak hátráltatott minket - egy utat erőltet, amitől eltérni _nem_ lehet.

Meg merem kockáztatni, hogy jelenleg a Wicket az egyik legnagyobb akadály, amit a rendszer fejlesztésébe bekapcsolódni vágyóknak át kell ugrania. Sokszor feleslegesen bonyolult és olyan koncepciókat hoz be, amiket egyszerűbb felépítéssel könnyen kikerülhettek volna. Pont ezek miatt fogunk megszabadulni ettől a keretrendszertől az elkövetkeződő hónapok alatt.

## Összegezzünk!

Ahogy láttuk az alkalmazás önmagában nincs túlbonyolítva, inkább az egyes technológiák nyűgjeivel küzd és sajnos nem csak technológiai értelemben. A Java és a JavaEE nem vonzó, így új embereket rávenni a fejlesztésre évről-évre nehezebb. A PÉK legnagyobb problémája ebben mutatkozik meg.

A kódbázis is ijesztő méretű lehet egy átlagos egyetemi beadandóhoz képest, most nagyjából 22 [KLOC](http://en.wikipedia.org/wiki/Source_lines_of_code)-ra rúg.

A népszerűségi gondokon segíteni nem nagyon tudunk, így inkább megpróbáljuk megtalálni azt a pár embert, aki magától is érdeklődik a téma iránt. Ez az utóbbi években nem vezetett egyértelmű sikerre, de az egész rendszert egy vonzóbb nyelven nem írhatjuk újra. Arra, hogy miért nem, a következő bejegyzésben fogok kitérni. Lassan a sorozat végére érünk, mert a következő cikkben már a PÉK jövője kerül elő.