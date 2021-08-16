---
layout: project
title: 'Kir-Dev Blog'
lead: 'A Kir-Dev következő generációs blogja'
github: https://github.com/kir-dev/blog-next
website: https://kir-dev.sch.bme.hu
status: { label: 'Üzemel', color: 'green' }
techs: ['React', 'Gatsby']
featuredImage: ../images/projects/blog-next.png
---

<style>
.caption {
  font-style: italic;
  text-align: center;
  margin: -0.5rem 0 2rem 0;
}
</style>

# Blogunk története

## Korábbiakban

Blogunk legelőször még Wordpress-ben szerkesztődött, azonban [2013-ban költöztünk](/post/2013-12-23-megujulunk/) a Ruby alapú Jekyll keretrendszeres blogra. Ez a blog csupán a posztokat tartalmazta, nagyon sok más információt nem közöltünk rajta. Még most is elérhető [forráskódja itt](https://github.com/kir-dev/kir-dev.sch.bme.hu), ha szívesen böngésznéd.

Régebbi posztjainkat áthoztuk az új platformra is, az [archívumban](/archive) elérhetőek.

![](https://warp.kir-dev.sch.bme.hu/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBKdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fc8239d0a90f3a8354184a36ddb1093ed3cab8f7/rGoWmhW.png)

<div class="caption">Korábbi blogunk nyitólapja</div>

## Új célok

Szeretnénk, ha körünkkel legrészletesebben és legkönnyebben egy új barátságos blog- és portfolióoldalon tudjatok megismerkedni. Éppen ezért itt, a Kir-Dev blogján

- megismerheted jelenlegi tagjainkat
- megismerheted a jelenlegi projektjeinket
- olvashatod blogposztjainkat
- elérheted tanfolyamaink oldalát

Az új oldal segítségével törekszünk a lehető leginformatívabb módon betekintést adni arról, milyen Kir-Devesnek lenni.

# Az új tech stack

[Kis vacillálás után](/post/2019-12-21-blog-2.0/) a **Gatsby**-re esett a választás az új blog alapításakor. Ez a népszerű, Node-os framework a weboldal teljes meghajtója. Nagyon jó lehetőséget ad a **React** kiismerésére, ugyanis a frontend azzal épül fel. Egy mondhatni _state-of-the-art_ UI komponens frameworköt, a **Chakra UI**-t használjuk a CSS-ezés leegyszerűsítésére. Szeretjük az erős típusosságot, úgyhogy **TypeScript**ben fejlesztjük.

![](https://warp.kir-dev.sch.bme.hu/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBKQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c3600cafc92da6420eab7e9b3bf397385f7a7d4a/2o5hook.png)

<div class="caption">Kódrészlet a blogból</div>
