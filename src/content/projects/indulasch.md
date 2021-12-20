---
layout: project
title: InduláSch
lead: Utastájékoztató kijelző és alkalmazás közeli BKK indulásokhoz.
github: https://github.com/kir-dev/indulasch-frontend
website: https://indula.sch.bme.hu/
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

# A fő célkitűzés

Jelenleg úton van egy saját TV a kollégiumi földszintre, melyen a kollégisták a földszinten közlekedve tájékozódhatnak a jelenlegi tömegközlekedési indulásokról és egyéb információkról.
Mindenki találkozott már azzal a pillanattal, amikor az adott járat az orra előtt ment el. Ez a projekt az ilyen pillanatokat hivatott megszüntetni: egy pillantás a kijelzőre, és máris megtudjuk, futni kell-e vagy sem.

# 1.0

Az [első verzió](https://github.com/berenteb/indulasch) a vanilla JavaScript-re és JavaScript (NodeJS) alapú backend-re épített, amibe templating-et is be kellett építeni.
A felület optimalizálva lett mobilra is, így már élesben is üzemelt az alkalmazás.

# 2.0

Az [első verzió](https://github.com/berenteb/indulasch) technológiájával nehéz volt karbantartani és fejleszteni az alkalmazást az új ötletekkel.
Ugyanazon év őszén az egész projektet újraírtuk React és TypeScript alapokon. Ugyanakkor a [frontend](https://github.com/kir-dev/indulasch-frontend) és [backend](https://github.com/kir-dev/indulasch-api) külön tárolóként lett kezelve.
Ez azért hasznos, mert az induláSch API-t egy natív mobilalkalmazás is használja, így célszerű volt nem egybeszőni a webes felülettel.
A második verzió alapjai sok lehetőséget adnak: elkészült egy widget felület, mely csempékben jelenít meg további információkat a pozícióhoz, mint például időjárás és közeli Bubi állomás elérhető biciklijei.
Tovább lett fejlesztve a mobilverzió is, progresszív webalkalmazásként szinte natív élményt kapunk az alkalmazást használva.

![2.0 app](https://warp.kir-dev.sch.bme.hu/img/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBTdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--133cebeeb425a7e39b267eddc354d9759b88b455/iPhone.png)

# Kiosk mód

Kijelzőre és mobilra más és más funkciók kellenek. Célszerű volt valamilyen módon megkülönböztetni a kettőt. A kiosk mód jobban van optimalizálva olyan kijelzőhöz, melyhez ritkán vagy egyáltalán nem nyúlunk.
Ezen mód különlegessége az SchPincér widget, mely esetleges nyitások elérhető rendeléseit jelzi ki a kollégisták számára.

![Kiosk mód](https://warp.kir-dev.sch.bme.hu/img/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBUQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--cf52887cf07293ce99f1da21ff656b80bb44025b/TV.png)

# iOS és watchOS

Ugyanazon év nyarán elindult egy koncepció fejlesztése, melyben megpróbáltuk az induláSch API-t felhasználni egy natív iOS és watchOS alkalmazás elkészítésére.
Ennek részeként elkészült egy Apple Watch alkalmazás is kíváncsiságként, ami elég hasznosnak bizonyul a tesztelés során.
Tapasztalatunk szerint a progresszív webalkalmazás elég jól közelíti egy natív app által nyúltott élményt.
Az alkalmazás az ugyancsak fiatalnak számító SwiftUI-ban íródott.
Jelenleg még fejlesztés alatt áll az app, egy nap lehet elérhető lesz az AppStore-okban.

![watchOS app](https://warp.kir-dev.sch.bme.hu/img/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBUZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a227e5a001c2ce1cfb5b594f8fa4c4a0be338107/aw_mockup.jpg)
