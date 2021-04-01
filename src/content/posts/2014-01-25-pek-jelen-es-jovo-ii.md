---
layout: post
title: "PÉK jelene és jövője, II. rész"
author: tmichel
date: 2014-01-25 12:20:00 CET
category: pek
comment: true
---

Az [előző részben]({% post_url 2014-01-23-pek-jelen-es-jovo-i %}) a VIR és a
PÉK különbségére próbáltam rávilágítani. Mielőtt még tényleg rátérnénk a címben
említett jelenre és jövőre, még egy picit a múltba kell merülnünk. A múlt fontos
szerepet játszik abban, hogy megértsük a PÉK jövőjével kapcsolatos, már-már
radikálisnak nevezhető döntéseket.

A PÉK valójában két alkalmazás volt. Ezek ugyan szorosan kapcsolódtak, de
különböző céllal születtek.

A Profil egy hallgató Schönherzbeli online identitását képviselte, kihegyezve
mindezt a felhasználói azonosításra. A Profil mögött egy LDAP címtár húzódott.
Az autentikáció ebből a címtárból történt egészen 2013 nyaráig.

A Profil mellett, vele szorosan együttműködve futott a Körök nevű alkalmazás. Ez
valójában a már régen is létező közösségi pontozást nyilvántartó rendszer
újragondolása és újraírása. A kör tagjai a JavaEE technológia mellett tették le
a voksukat. Ez 2007-2008 táján volt. Lehet vitatkozni, hogy ez jó döntés volt-e
vagy sem, de az biztos, hogy az eredeti PHP-ban tákolt rendszernél minden jobb.
Azóta ez a technológia határozza meg a kör életét, annak minden örömével és
nyűgével - ebbe beleértve a népszerűségét, vagyis inkább annak hiányát is.

Az újraírás egyik velejárója, hogy az adatbázist örökölte a rendszer az
elődjétől. A konvenciók változtak az idők során, így fordulhatott elő, hogy a
tábla és mezőnevek elég kaotikus képet festenek ma. Egy-egy régebbi táblában
magyar és angol mezőnevek váltakoznak, néhol még egy mezőn  belül is keverednek
a nyelvek.

Idővel a két alkalmazás egy kódbázissá olvadt össze, de ebből kifele nem sok
látszott, mert a felület megőrizte a kettősséget, ahogy a domainek is
(profile.sch és korok.sch). Ezek azóta sem változtak. Az óvatlan szemlélőnek még
mindig úgy tűnhet, mintha két különböző alkalmazás lenne. Ez az egyik dolog,
amit a közeljövőben szeretnénk kijavítani.

Több mint két év stagnálás után, 2013 nyarán vettük elő újra az alkalmazást. A
munkálatok újfent a háttérben folytak. A felhasználók alig vettek észre valamit
a dologból (és ez így is van rendjén). A Profil és Körök egyesítése végre
teljesen megtörtént. Az egyszerűsítés volt a vesszőparipánk: A LDAP címtárat
megszüntettük, Glassfish-ről JBoss-ra váltottunk és a telepítést pár lépésre
redukáltuk. Az adatok visszakerültek az adatbázisba, ezzel megszűnt a két
adattár közötti szinkronizáció is.

Most értünk el a jelenbe. A következő részben egy gyors áttekintést fogok adni a
PÉK jelenlegi felépítéséről.
