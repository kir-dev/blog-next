---
layout: post
author: feketesamu
date: 2023-03-05 14:21:16
title: Az új Konzisite fejlesztése
lead:
tags:
  - hírek
  - projekt
comment: true
featuredImage: ../images/projects/konzisite.png
ogImage: ../images/projects/konzisite.png
---

<style>
.caption {
  font-style: italic;
  text-align: center;
  margin: -0.5rem 0 2rem 0;
}
</style>

```toc

```

![konzisite header](https://warp.sch.bme.hu/images/konzisite_email_header)

## Mi is a Konzisite?

A BME VIK hallgatói találkozhattak már a régi Konzisite-tal, melyet Hallgatói Képviselet készített valamikor a 2010-es évek elején. Az oldal fő feladata, hogy egy felületet adjon a kar hallgatóinak, ahol konzultációkat kérhetnek, illetve ha konzultációt tartanak, meghirdethessék azt az egész karnak. Ezen kívül a résztvevők értékelhetik is a konzikat, amely alapján a HK ösztöndíjban tudja részesíteni a konzi tartóit. Sajnos ez az oldal már sok szempontból elavulttá vált, fejlesztése, javítása pedig nagyon nehézkes volt. Ezért kért meg minket a HK, hogy fejlesszünk egy új verziót. Az eddig létező funkciók mellett volt pár új ötletük is. Valamint természetesen az is cél volt, hogy a jövőben is könnyen bővíthető legyen az oldal. Mi a Kir-Dev-nél fontosnak tartjuk, hogy az új tagjaiknak átadjuk azt a tudást, amit mi a körben szereztünk, így tudás nem veszik el, a projektjeink pedig éveken keresztül üzemelhetnek, hiszen mindig lesz, aki tud javítani vagy új funkciót fejleszteni.

![oreg_konzisite](https://warp.sch.bme.hu/images/kepernyokep-2022-12-04-031952)

<div class="caption">A Konzisite korábbi nyitólapja</div>

## Külsős projektek a Kir-Dev-nél

Mint sok más projektünk a Kir-Dev-nél, a Konzisite is egy külsős projekt, azaz nem mi találtuk ki, hanem egy másik kör vagy szervezet (ez esetben a HK) keresett meg minket. Ilyenkor tipikusan egy minél pontosabb specifikációt kérünk a megrendelőtől, ami alapján mi meg tudjuk kezdeni a tervezést. Emellett kinevezünk egy projektfelelőst, aki a szívén viseli a projektet a jövőben. Az ő felelőssége lesz a kapcsolattartás a megrendelővel, a feladatok felosztása a körön belül, valamint a projekt haladásának felügyelete. Ennél a projektnél ezt a feladatot [Fekete Sámuel](https://pek.sch.bme.hu/profiles/feketesamu) kapta meg, ami számára is új volt, hiszen akkor még csak fél éve volt tagja a körnek.

## Tervezés

A specifikáció alapján egyértelmű volt számunkra, hogy ez a bonyolultabb projektjeink közé fog tartozni. A tavaszi félév közepén, a NodeJS és React tanfolyamok végezetével sok érdeklődő újoncunk volt, akik szerették volna hasznosítani újonnan szerzett tudásukat, viszont nem volt futó projektünk ezekben a technológiákban. Így döntöttünk a Node-React stack mellett, adatbázisnak pedig az általunk sokat használt [PostgreSQL](https://www.postgresql.org/) relációs adatbázist választottuk, ami ideális nagy, bonyolult adatbázis sémájú projektekhez.

Az első és legfontosabb tervezési lépés egy adatvezérelt rendszer fejlesztése előtt az adatbázis sémájának megtervezése. Erre épül minden, később aránylag nehéz változtatni, de ha nem ideális, nagyban meg tudja nehezíteni a fejlesztést. Ezt az újoncokkal közösen terveztük meg, akik így a tanfolyam elvégzése után rögtön részt vehettek egy valódi projektben, ráadásul már a legelső fázistól. Az eredmény:
![adatbázis séma egyszerűsített ábrája](https://warp.sch.bme.hu/images/konzisite_diagram)

<div class="caption">Az adatbázis séma egyszerűsített ábrája</div>

Ezután az oldal alapvető felépítését terveztük meg. A HK csak funkcionalitást specifikált számunkra, így szabad kezet kaptunk az oldal felépítésének megtervezésében. Megbeszéltük, milyen oldalakra bontsuk fel az alkalmazást és hogy az egyes oldalon milyen funkciók, gombok és linkek kapjanak helyet. Ezt is fontos viszonylag korán eldönteni, hiszen az alkalmazás backendjét, vagyis a szerveroldali kódot ez alapján lehet elkészíteni.

## Választott technológiák

### Node.js

A [NodeJS](https://nodejs.org/en/)-t választottuk backend technológiának. A NodeJS egy JavaScript futtatókörnyezet, ami lehetővé teszi, hogy böngészőn kívül futtassunk JS-t. Manapság egyre gyakrabban használt ez webalkalmazások backendjeként, hiszen könnyen tanulható. JavaScript-tel minden webfejlesztőnek van tapasztalata, hiszen frontenden kikerülhetetlen. Továbbá nagyon sok könyvtár elérhető az ökoszisztémában, amiknek köszönhetően nem kell mindent a nulláról lekódolnunk. Azonban nagy projektben a JavaScript-tel nehéz fejleszteni, hiszen gyengén típusos, azaz a változók futás közben típust változtathatnak. Ilyen kódbázist nehéz konzisztensen tartani sok fejlesztővel, ezért a NodeJS-t [TypeScript](https://www.typescriptlang.org/)-tel használtuk (és használjuk is minden más projektünkben is). Ez a nyelv a JS-nek egy kiterjesztése, ami egy jobb típusrendszert biztosít, de végül JS-re fordul.

### NestJS

A NodeJS magában viszont még nem elég egy komplex webalkalmazás elkészítéséhez. Ehhez a [NestJS](https://nestjs.com/) nevű keretrendszert használtuk, amivel könnyedén lehet nagyszabású webalkalmazásokat fejleszteni. Korábban nem volt Nest-es projektünk, de a tanfolyamon már ezt tanítottuk, és az itt elkészített projekt számunkra is egy Proof of Concept projekt volt, azaz már korábban kicsiben kipróbáltuk, és megfelelt az igényeinknek.
Nagyon hasznos volt még a Nest-nek a könnyen konfigurálható OpenAPI leírója. Ez egy automatikusan generált felület, ahol fel vannak sorolva a REST API végpontjai, és pontosan le van írva, melyik meghívásához milyen paraméterek kellenek, illetve milyen formában adja vissza az adatokat. Ez óriási segítség frontend fejlesztés közben. Az éles verzió OpenAPI leíróját [itt megnézhetitek](https://api.konzisite.kir-dev.hu/api).

### Prisma

Mint már említettem, az alkalmazás adatbázisa meglehetősen összetett lett. Egy ilyen sémához SQL lekérdezéseket írni igen nehéz lenne, de szerencsére erre nem is volt szükség. Szintén ebben a projektben próbáltuk ki először a [Prisma](https://www.prisma.io/) ORM-et (Object Relational Mapping). Ez egy olyan JavaScript könyvtár, ami kezeli a kapcsolatot a kódunk és az adatbázis között. Az adatbázisból kinyert rekordokat TypeScript objektumokká alakítja, valamint a lekérdezések egy nagyon kényelmes JS szintaxissal adhatóak meg. Talán elsőre megérteni nem könnyű, de nagyon tömören meg lehet fogalmazni a komplex lekérdezéseket is. A főoldalon például szükségünk van azokra a konzultációkra, amelyeken a felhasználó részt vett, de még nem értékelte valamelyik előadót. Ez a lekérdezés öt táblát érint, ezeknek a megfelelő join-olása nem embernek való feladat, hanem a Prismának: az alábbi szűrővel megkaphatjuk a megfelelő konzikat, ő majd megoldja a joinokat.

```typescript
const results = await this.prisma.consultation.findMany({
  where: {
    presentations: {
      some: {
        NOT: {
          ratings: {
            some: {
              ratedBy: {
                userId: user.id
              }
            }
          }
        }
      }
    },
    participants: {
      some: {
        userId: user.id
      }
    }
  }
})
```

### React

A frontenden a [React](https://reactjs.org/) nevű könyvtárat használtuk, mely jelenleg messze a legelterjedtebb. Számos projektben dolgoztunk már vele, így van tapasztalatunk bőven. Könnyen tanítható az újoncoknak is, szintaxisa nagyban hasonlít a HTML-hez, de rengeteg mindennel kiegészíti azt, és gyorsan lehet vele egy jól használható felhasználói felületet készíteni. Nagy előnye még, hogy rengeteg kisebb könyvtárat készítettek hozzá, melyekkel gyakori problémákat lehet egyszerűen megoldani. Csak a legfontosabbakat szeretném kiemelni azok közül, amiket használtunk ebben a projektben. A [Chakra UI](https://chakra-ui.com/) az egységes, de mégis stílusos megjelenést segíti, a [ReactQuery](https://react-query-v3.tanstack.com/) a hálózati kéréseket, a [ReactHookForm](https://react-hook-form.com/) pedig az űrlapok kezelését egyszerűsíti.

## Végeredmény

![konzisite landing page](https://warp.sch.bme.hu/images/konzisite_16_10)

<div class="caption">Az új Konzisite nyitólapja</div>

A tavaszi félév kezdetére készültünk el az első olyan verzióval, mely már kikerülhetett élesbe. A régi konzisite-hoz képest szerintem egy sokkal könnyebben használható UI-t raktunk össze. Van lehetősége bárkinek csoportokat létrehoznia, nem kell ehhez a HK-nak emailt írni. Egy konzinak több előadója is lehet, mindegyiküket külön lehet értékelni. Egy felhasználóra érkezett értékelések megjelennek a profilján. Van egy külön felhasználó böngésző oldal, ahol publikus a konzitartók átlagos értékelése és egyéb statisztikák is. A konzi tartóknak van lehetősége jegyzet feltöltésére egy konzihoz, amit a résztvevők az alkalom után tölthetnek le, ha értékelték az előadókat.

Az oldal még nincs kész, vannak funkciók, amik tervben vannak, sőt némelyik már készül is. Lesznek még például email értesítések és exportálható naptár fájlok. Ha van még ötleted, mit lehetne belerakni, keress meg minket!

## Tapasztalatok

"Projektvezetőként nagyon élveztem ezen a projekten dolgozni, hiszen nekem is ez volt az első fullstack projektem, ahol a legelső fázistól kezdve részt vettem a munkában. A tech-stack választást nagyon jól eltaláltuk, bár ez nem az én érdemem, hanem a kör tapasztaltabb tagjaié. Büszke vagyok a projektre amit összeraktunk a körrel, remélem sokáig tudják használni a hallgatók." - _Samu_

"Tavaly tavasszal csatlakoztam a körhöz és ez volt az első ilyen projektem, nem csak körön belül, hanem összességében. Habár gyakorlatilag minden új volt - és még most is vannak meglepetések -, de rengetek segítséget kaptam a kör tagjaitól, hogy ne veszítsem el a fejem. A projekten dolgozni olyan érzés volt, mintha profi közegben lennék, mind szervezésileg, mind szakmailag." - _Smuky_

## Kitekintés

Ha ez a poszt felkeltette az érdeklődésedet és szeretnél becsatlakozni egy hasonló projektbe, akkor mindenképpen vedd fel velünk a kapcsolatot! A tavaszi félév elején indulnak a tanfolyamaink, ahol a nulláról megtanítjuk a legfontosabb dolgokat az itt említett technológiákról. Ezekről többet a [Tanfolyamok](https://kir-dev.hu/courses/) oldalon tudhatsz meg. Ha ezekről lemaradtál volna, a [Kapcsolat](https://kir-dev.hu/about/) oldalon megtalálod a kontaktjainkat!
