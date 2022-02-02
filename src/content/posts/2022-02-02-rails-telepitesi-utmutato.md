---
layout: post
author: beni99
date: 2022-02-02 21:31:32
title: Ruby on Rails telepítési útmutató
lead: Telepítési útmutató a tanfolyamra
tags:
  - tech
  - rails
  - tanfolyam
comment: true
featuredImage: ../images/posts/rails_feature.png
ogImage: ../images/posts/rails_og.jpg
---

## Tartalomjegyzék

```toc
# There comes the toc
```

## Bevezetés

Ez a kis útmutató legfőképpen a tavaszi tanfolyamon résztvevőknek szól, de bárki más is olvassa nyugodt szívvel.

A Ruby on Rails egy nagyon népszerű webes keretrendszer, amivel érdemes megismerkednie akár annak is, aki nem feltétlen a webes világban akar elhejezkedni. Sajnos a legelső akadály sokszor elég nagy szokott lenni, ami nem más mint a keretrendszer beüzemelése. Az olyan nyelvekkel ellentétben mint például a NodeJS, ahol az LTS verzió feltepítéséve után már neki is lehet állni, itt elég sok buktatóba bele lehet esni, főleg ha valaki Windows rendszeren szeretne fejleszteni. Mivel a tanfolyamunk szerves része, hogy közös kódolások alkalmával mindenki kipróbálja a fejlesztés élményét, ezért ebben a kis cikkben leírom, hogyan lehet megugrani ezt az első akadályt. A telepítés menetét megmutatom **Windows 10** és **Ubuntu 20.04** operációs rendszereken is.

## Telepítés Windowsra

Bár van néhány dolog, ami windows rendszereken nem igen, vagy csak nehézkesen működik, amikor rubyval dolgozunk, a tanfolyam alkalmán csak olyan részeket fogunk érinteni, amiknek mindenképpen működniük kell.

### Ruby telepítése

Első lépésként magát a Ruby-t kell feltelepítenünk. A telepítőt a [rubyinstaller.org](https://rubyinstaller.org/downloads/) oldalról tudjuk, letölteni. A (_2022 tavaszi_) tanfolyamhoz a **Ruby+Devkit3.0.3-(x64)** verziót töltsük le, majd futtassuk.

A telepítő varázslóban mindent hagyhatunk az alapértelmezett értéken.
![installler](https://warp.kir-dev.sch.bme.hu/img/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBidz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2be162588d0e615761c1e5b77a2d2b676dcd05ae/Screenshot%202022-02-02%20195239.png)

A telepítés után előjön az MSYS2 és MINGW telepítője, amit szintén hagyhatunk alapértelmezett beállításokkal -> _nyomjunk entert_.
![MSYS2 & MINGW](https://warp.kir-dev.sch.bme.hu/img/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4c5b0d303b5c72fa47c4031c01441630137e3f81/Screenshot%202022-02-02%20195550.png)

Nem kell megijedni, ha warningok és látszólagos hibák jönnek elő, ha a végén van egy zöld success felirat.
![install done](https://warp.kir-dev.sch.bme.hu/img/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--80fec14e803267d5be072f2c62dba92f587fdc04/Screenshot%202022-02-02%20195759.png)

Ha minden jól megy a `ruby -v` parancs kiadása után valami ilyesminek kell megjelenni:

![ruby version](https://warp.kir-dev.sch.bme.hu/img/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2a6cb235744dd725d670a6129180682c624310ad/Screenshot%202022-02-02%20200617.png)

### Egyéb szükséges szoftvercsomagok

A rails helyes működéséhez még szükséged lesz néhány dologra.

- git: [git-scm.com](https://git-scm.com/download/win)
- nodeJs (LTS verzió megfelelő): [nodejs.org](https://nodejs.org/en/)

Ezeknek a telepítésénél is maradhatunk az alapértelmezett beállításoknál.

### Rails telepítése

Ezután a rails keretrendszer telepítése pofon egyszerű, csak ki kell adni parancssorban a megfelelő parancsot:

```powershell
gem install rails
```

Ez jónáhány csomagot, úgynevezet _gem_-et fog feltelepíteni, és ez eltarthat némi időbe.

### Hello World

Most eljött az ideje, hogy kipróbáljuk, hogy minden működik-e. Parancssorba navigálj egy olyan mappába, ahol a projekteket tárolni szeretnéd, majd add ki a következő parancsot:

```powershell
rails new hello_world
```

Legelső alkalommal ez is eltarthat sokáig, mert szintén fog egy két gem-et installálni.

Mitán lefutott a parancs, navigálj be az elkészített mappába

```bash
cd hello_world
```

és add ki a következő parancsokat.

```powershell
bundle install
rails db:create
rails s
```

A konzolon valami hasonlónak kell megjelenni

```powershell
C:\Users\Ruby\Documents\hello_world>rails s
=> Booting Puma
=> Rails 7.0.1 application starting in development
=> Run `bin/rails server --help` for more startup options
*** SIGUSR2 not implemented, signal based restart unavailable!
*** SIGUSR1 not implemented, signal based restart unavailable!
*** SIGHUP not implemented, signal based logs reopening unavailable!
Puma starting in single mode...
* Puma version: 5.6.1 (ruby 3.0.3-p157) ("Birdie's Version")
*  Min threads: 5
*  Max threads: 5
*  Environment: development
*          PID: 12360
* Listening on http://[::1]:3000
* Listening on http://127.0.0.1:3000
Use Ctrl-C to stop
```

és a [http://127.0.0.1:3000](http://127.0.0.1:3000) címre ellátogatva a következőt kell látni:

![welcome screen](https://warp.kir-dev.sch.bme.hu/img/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b03cce34ab2bf5bb5f01a6258a2c77bce8436955/Screenshot%202022-02-02%20205507.png)

### Megjegyzés a WSL-ről

Az interneten sok útmutatót találhat az ember, ahol a WSL (_Windows Subsystem for Linux_) segítségével telepítik fel a keretrendszert. Bár működőképes, de sok olyan mellékhatása van, amit ezen cikk keretében nem tudok mind felsorolni. Ezért aki komolyabban szeretne foglalkozni a Ruby fejlesztéssel, annak ajánlanék inkább egy Linux virtuális gépet , vagy második operációs rendszerként (Dual BOOT) egy linux disztribúciót felrakni.

## Telepítés Ubuntura

Aki rendszeresen használ linux alapú rendzsereket, annak biztos ismerős lesz a feltelepítés módja, de azok kedvéért, akik esetleg most ismerkednek a rendszerrel, megmutatom, hogy egy friss telepítésre hogyan érdemes felvarázsolni a railst.

### Rbenv telepítése

TODO

### Megfelelő Ruby verzió tlepítése

TODO

### Rails telepítése

TODO 2

### Hello World projekt

TODO

## Telepítés macOS gépekre

Amenyiben macOS-re szeretnéd telepíteni a railst, ajánlom ezt a [weblapot](https://gorails.com/setup/osx/) olvasgatásra.

## Végszó

Miután fel van telepítve a keretrendszer, már mehet is a fejlesztés. A következő cikkemben bemutatok néhány fejlesztést segítő programot, és két IDE-t, amivel még kénylemesebbé teheted a Ruby on Rails élményt.
