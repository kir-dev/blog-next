---
layout: post
author: beni99
date: 2022-02-02 21:31:32
title: Ruby on Rails telepítési útmutató
lead: Telepítési útmutató a Kir-Dev tavaszi tanfolyamához.
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

## Ruby telepítése

Első lépésként a Ruby-t kell felraknunk, ami Windows és Linux rendszereken kicsit máshogy néz ki.

### Windows

Bár van néhány dolog, ami windows rendszereken nem igen, vagy csak nehézkesen működik, amikor rubyval dolgozunk, a tanfolyam alkalmakon csak olyan részeket fogunk érinteni, amiknek mindenképpen működniük kell.

#### Szükséges szoftverek

A rails helyes működéséhez szükséged lesz néhány dologra.

- git: [git-scm.com](https://git-scm.com/download/win)
- nodeJs (LTS verzió megfelelő): [nodejs.org](https://nodejs.org/en/)

Ezeknek a telepítésénél maradhatunk az alapértelmezett beállításoknál.

#### Ruby telepítése Windowsra

A telepítőt a [rubyinstaller.org](https://rubyinstaller.org/downloads/) oldalról tudjuk, letölteni. A (_2022 tavaszi_) tanfolyamhoz a **Ruby+Devkit3.0.3-(x64)** verziót töltsük le, majd futtassuk.

A telepítő varázslóban mindent hagyhatunk az alapértelmezett értéken.
![installler](https://warp.kir-dev.sch.bme.hu/img/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBidz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2be162588d0e615761c1e5b77a2d2b676dcd05ae/Screenshot%202022-02-02%20195239.png)

A telepítés után előjön az MSYS2 és MINGW telepítője, amit szintén hagyhatunk alapértelmezett beállításokkal -> _nyomjunk entert_.
![MSYS2 & MINGW](https://warp.kir-dev.sch.bme.hu/img/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4c5b0d303b5c72fa47c4031c01441630137e3f81/Screenshot%202022-02-02%20195550.png)

Nem kell megijedni, ha warningok és látszólagos hibák jönnek elő, ha a végén van egy zöld success felirat.
![install done](https://warp.kir-dev.sch.bme.hu/img/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--80fec14e803267d5be072f2c62dba92f587fdc04/Screenshot%202022-02-02%20195759.png)

Ha minden jól megy a `ruby -v` parancs kiadása után valami ilyesminek kell megjelenni:

![ruby version](https://warp.kir-dev.sch.bme.hu/img/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2a6cb235744dd725d670a6129180682c624310ad/Screenshot%202022-02-02%20200617.png)

#### Megjegyzés a WSL-ről

Az interneten sok útmutatót találhat az ember, ahol a WSL (_Windows Subsystem for Linux_) segítségével telepítik fel a keretrendszert. Bár működőképes, de sok olyan mellékhatása van, amit ezen cikk keretében nem tudok mind felsorolni. Ezért aki komolyabban szeretne foglalkozni a Ruby fejlesztéssel, annak ajánlanék inkább egy Linux virtuális gépet , vagy második operációs rendszerként (Dual BOOT) egy linux disztribúciót felrakni.

### Ubuntu

Aki rendszeresen használ linux alapú rendzsereket, annak biztos ismerős lesz a feltelepítés módja, de azok kedvéért, akik esetleg most ismerkednek a rendszerrel, megmutatom, hogy egy frissen telepített rendszerrre hogyan érdemes felvarázsolni a railst.

#### Szükséges szoftverek

**Figyelem! A Linuxon való telepítéshez sudo jogosultsággal kell rednelkezned**
A telepítéshez (és amúgy a szoftverfejlesztéshez általában) szükséged lesz git kliensre. És a ruby futtatókörnyezet lefordításához (amit majd autómatikusan a verziókezelő tesz meg) néhány fejlesztői könyvtárra. Ezeket a következő parancsok kiadásával tudod telepíteni.

```bash
sudo apt update
sudo apt install -y libssl-dev zlib1g-dev sqlite3 libsqlite3-dev git-all
```

#### Rbenv telepítése

Linux rendszereken a normális telepítési mód helyett érdemes inkább egy verziókezelőt telepíteni, ami minden egyes projekthez a szükséges verziójú ruby-t fogja betölteni, mindezt autómágikusan a háttérben.

A szoftver telepítése sok féle képpen megtörténhet, érdemes elolvasni az rbenv [github oldalát](https://github.com/rbenv/rbenv), de a készítők szolgáltatnak egy scriptet, ami megoldja számunkra a telepítés összes lépését. Ezt a következő parancsal futtathatjuk.

```bash
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/HEAD/bin/rbenv-installer | bash
```

_Megjegyzés: Nem egészséges ismeretlen internetről letöltött scripteket csak úgy futtatni, így mindíg érdemes átnézni ponotsan mit csinál, mielőtt elindítod._

Azért, hogy mindenkor működjön a program még manuálisan be kell állítani pár dolgot. Ahogy azt a telepítő végén írja is, hozzá kell adnunk a PATH változóhoz az rbenv helyét. Futtassuk a következő parancsokat:

```bash
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init - bash)"' >> ~/.bashrc
```

Zárjuk be, majd nyissuk meg újra a terminált, hogy a módosításaink érvényt nyerjenek. Ellenőrizhetjük, hogy minden rendben van, a következő script futtatásával:

```bash
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/main/bin/rbenv-doctor | bash
```

Valahogy így kell kinéznie:

![succesfull install](https://warp.kir-dev.sch.bme.hu/img/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBkQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f49ccd11ac9ef79d6330804d49c1d7122652af87/Screenshot%202022-02-03%20133723.png)

#### Megfelelő Ruby verzió tlepítése

Most már, hogy van egy verzió kezelőnk, már csak meg kell adni, hogy mi legyen a verzió amivel dolgozni akarunk. Adjuk ki a következő parancsot:

```bash
rbenv install 3.0.3 && rbenv global 3.0.3
```

Ez letölti majd feltelepíti a kívánt verziót, majd beállítja globálisan, hogy ez legyen használva.
Ha minden jól megy a `ruby -v` parancs kiadása után a kiválasztott ruby verziónak kell megjelennie:

```bash
ruby 3.0.3p157 (2021-11-24 revision 3fb7d2cadc) [x86_64-linux]
```

### macOS

Amenyiben macOS-re szeretnéd telepíteni a railst, ajánlom ezt a [weblapot](https://gorails.com/setup/osx/) olvasgatásra.

## Rails telepítése

Ezután a rails keretrendszer telepítése pofon egyszerű, csak ki kell adni parancssorban a megfelelő parancsokat:

```powershell
gem install bundler
gem install rails
```

Ez jónáhány csomagot, úgynevezet _gem_-et fog feltelepíteni, és ez eltarthat némi időbe.

## Hello World applikáció

Most eljött az ideje, hogy kipróbáljuk, hogy minden működik-e. Parancssorba/terminálba navigálj egy olyan mappába, ahol a projekteket tárolni szeretnéd, majd add ki a következő parancsot:

```bash
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

## Végszó

Miután fel van telepítve a keretrendszer, már mehet is a fejlesztés. A következő cikkemben bemutatok néhány fejlesztést segítő programot, és két IDE-t, amivel még kénylemesebbé teheted a Ruby on Rails élményt.
