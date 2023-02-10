---
layout: project
title: InduláSch
lead: Információs kijelző a kollégium lakóinak.
github: https://github.com/kir-dev/indulasch-v3
website: http://admin.indulasch.kir-dev.hu
status:
  label: Aktív
  color: green
techs:
  - Node
  - React
  - SwiftUI
featuredImage: ../images/projects/indulasch.png
---

# Az elképzelés

Elkészült egy koncepció 2021. tavaszán, mely egy utastájékoztató kijelzőt valósított meg házilag.
Hamar jött a felismerés, miszerint ezt alkalmazni is lehetne élőben, tetszőleges helyszínen.
Kiváló helyszínt a Schönherz Kollégium földszinti folyosója jelenti, így elindult egy olyan projekt a körben,
mely nem csak a webalkalmazás elkészítését jelenti, hanem annak fizikai elhelyezését is. Ez lett az induláSch projekt.

![result.jpg](https://warp.sch.bme.hu/images/indulasch-v3)

# A fő célkitűzés

Jelenleg úton van egy saját TV a kollégiumi földszintre, melyen a kollégisták a földszinten közlekedve tájékozódhatnak a jelenlegi tömegközlekedési indulásokról és egyéb információkról.
Mindenki találkozott már azzal a pillanattal, amikor az adott járat az orra előtt ment el. Ez a projekt az ilyen pillanatokat hivatott megszüntetni: egy pillantás a kijelzőre, és máris megtudjuk, futni kell-e vagy sem.

![bb_indul.jpg](https://warp.sch.bme.hu/img/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa2dCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6292c18285d9549f499c1d8cd15848c5ffec8c74/IMG_20220125_180337.jpg)

## Update 2022

A projekt sikeresen átment 2021-ben a Küldöttgyűlésen, azóta már a TV is megvan, illetve a program is működik a kiállított TV-n. Nagy örömmel fogadta körünk a projekt végcélhoz érését.

![tv_config.jpg](https://warp.sch.bme.hu/img/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa2tCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--06a42087635b3b332ab620c00dc216eb52fe04c3/IMG_20220224_214032.jpg)

# 1.0

Az [első verzió](https://github.com/berenteb/indulasch) a vanilla JavaScript-re és JavaScript (NodeJS) alapú backend-re épített, amibe templating-et is be kellett építeni.
A felület optimalizálva lett mobilra is, így már élesben is üzemelt az alkalmazás.

# 2.0

Az [első verzió](https://github.com/berenteb/indulasch) technológiájával nehéz volt karbantartani és fejleszteni az alkalmazást az új ötletekkel.
Ugyanazon év őszén az egész projektet újraírtuk React és TypeScript alapokon. Ugyanakkor a [frontend](https://github.com/kir-dev/indulasch-frontend) és [backend](https://github.com/kir-dev/indulasch-api) külön tárolóként lett kezelve.
Ez azért hasznos, mert az induláSch API-t egy natív mobilalkalmazás is használja, így célszerű volt nem egybeszőni a webes felülettel.
A második verzió alapjai sok lehetőséget adnak: elkészült egy widget felület, mely csempékben jelenít meg további információkat a pozícióhoz, mint például időjárás és közeli Bubi állomás elérhető biciklijei.
Tovább lett fejlesztve a mobilverzió is, progresszív webalkalmazásként szinte natív élményt kapunk az alkalmazást használva.

# 3.0

Egy évvel később, 2023. januárjában már az első évfordulót ünnepelte a projekt. Egy év alatt rengeteg tapasztalatot és ötletet gyűjtöttünk össze annak érdekében, hogy a projekt tovább fejlődjön.
A kioszkban sok lehetőség rejlett, amit év közben csak rengeteg foltozással és bele-bele javítgatással tudtunk volna elérni. 2022. végén nekiálltunk újraírni a projektet robosztusabb alapokkal.
A projekt mostmár adatbázissal (MongoDB) működik egy NestJS alapú backend-del, illetve a kioszk kliens szépítgetésén kívül készült hozzá egy admin felület is. A bejelentkezés AuthSch-n keresztül történik,
és bárki, aki belép, létrehozhat saját klienst.

Újdonságok között szerepelnek új csempék is. Az időjárás, SchPincér és Bubi mellett már képeket és QR-kódokat is elhelyezhetünk a kioszkon, sőt,
ezek elrendezése egy 3x3-as rácsban változtatható. Az üzenetek funkció időzítéssel bővült, illetve a távoli karbantartás problémája is megoldódott.

# Az admin felület

Az admin felületen kioszkokat hozhatunk létre, melyek csempe-elrendezéseit vizuálisan szerkeszthetjük, illetve a csempéket beállíthatjuk.
Üzemezhetünk üzeneteket, változtathatjuk a megjelenést téma és színek szerint, valamint a kioszk alapbeállításait is megadhatjuk. Meghívhatunk másokat is (pl. marketingeseket)
a kezeléshez, akiknek csak a szükséges dolgokhoz lesz jogosultságuk. A kioszk állapotát is nyomon követhetjük a Dashboard-on, illetve távolról újra is indíthatjuk (ez esetben a böngészőablak frissül egyet).

![Admin](https://warp.sch.bme.hu/images/admin-png)

# A kioszk

Minden, az admin felületen létrehozott kioszkhoz tartozik egy kliens, mellyel nagy kijelzőkhöz optimalizáltan tudjuk megynitni a felületet.
A kioszk időközönként lekéri a legfrisebb konfigurációt és az üzeneteket úgy, mint a rajta megjelenő adatokat.
Mivel a "szoftverfrissítés" nehézkes egy falra felfúrt TV esetén, így az admin felületről való újraindítás után a legfrissebb szoftvert fogja futtatni a TV.

![Kiosk mód](https://warp.sch.bme.hu/images/kiosk)

# iOS és watchOS

A projekt indulásának nyarán elindult egy koncepció fejlesztése, melyben megpróbáltuk az induláSch API-t felhasználni egy natív iOS és watchOS alkalmazás elkészítésére.
Ennek részeként elkészült egy Apple Watch alkalmazás is kíváncsiságként, ami elég hasznosnak bizonyul a tesztelés során.
Tapasztalatunk szerint a progresszív webalkalmazás elég jól közelíti egy natív app által nyúltott élményt.
Az alkalmazás az ugyancsak fiatalnak számító SwiftUI-ban íródott. Készült 2022-ben egy Android implementáció is.
Jelenleg még fejlesztés alatt áll az app, egy nap lehet elérhető lesz az AppStore-okban.

![watchOS app](https://warp.sch.bme.hu/img/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBUZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a227e5a001c2ce1cfb5b594f8fa4c4a0be338107/aw_mockup.jpg)
