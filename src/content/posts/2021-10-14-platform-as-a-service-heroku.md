---
layout: post
author: triszt4n
date: 2021-10-14 22:45:38
title: 'Platform-as-a-Service: Heroku'
lead: 'PaaS a webfejlesztéshezben - a Heroku használatáról röviden'
comment: true
---

<style>
p .md-p {
  text-align: justify;
}

caption {
  text-align: center;
  margin: -0.5rem 0 2rem 0;
  font-style: italic;
}
</style>

# A PaaS rendszerekről

A blogposztban szóba kerül, hogy mi is az a PaaS avagy Platform-as-a-Service, hogy hozható kapcsolatba a webfejlesztéssel és egy konkrét platformot, a Herokut is megvizsgáljuk, kipróbáljuk.

## Az alapok

A **felhőalapú számítástechnikai szolgáltatók** _(Cloud Computing Providers)_ célja virtualizált erőforrások szükség szerinti kiosztása az igénybevevők számára. Lehetőséget adnak arra, hogy számítási erőforrásaink az internet segítségével távolról is menedzselhessük és szükség szerint tegyük elérhetővé.<sup>[1]</sup>

![](https://www.stackscale.com/wp-content/uploads/2020/04/cloud-service-models-iaas-paas-saas-stackscale.jpg)

<div class="caption">1. ábra: A rendszerek egymásra épülése</div>

A **Cloud Computing** főbb modellei az ilyenfajta szolgáltatásokra: az **IaaS** _(Infrastructure-as-a-Service, pl.: Azure, AWS)_, a **PaaS** _(Platform-as-a-Service, pl.: Heroku)_ és a **SaaS** _(Software-as-a-Service, pl.: Netflix, Google Docs)_.

![](./infrastructure.png)

<div class="caption">2. ábra: Sémaábra egy webes rendszer infrastruktúrájáról</div>

A **PaaS**, a könnyű megértésért magyarra fordítható: jelentése _szolgáltatott platform_. A modell fő célja telepítési felületet, futtatókörnyezetet, tesztfelületet és menedzselési lehetőségeket biztosítani az felhasználók applikációi számára.<sup>[2]</sup> Ahogy a fenti képen is látható, valójában egy nehéz munkától szabadít meg egy adott platform használata. Ahelyett, hogy nekünk kelljen beletanulni a teljes infrastruktúra összeállításába, nekünk kelljen utána a felmerülő karbantartással foglalkozni, **áthárul ez a nagy feladat** a PaaS szolgáltatójára. Ahogy a narancssárga nyíl is rámutat: a mi részünk így csak egy nagyszerű webes alkalmazás fejlesztése (a képen illusztrált esetben...).

A legfőbb **felhasználói** az ilyen rendszereknek a szoftverfejlesztők és a DevOps mérnökök.

A **DevOps** mérnökök foglalkoznak egy alkalmazás/szolgáltatás fejlesztése során szükséges automatizálási munkákkal: automatizálják a tesztelést, a deploymentet; üzemeltetnek; felügyelik a szoftver részeinek integrációját és a szoftver-kiadások folytonosságát _(Continuous Integration, Continuous Deployment, CI/CD)_.<sup>[3]</sup>

A PaaS a teljes **webalkalmazás-fejlesztési életciklust** (fejlesztés, tesztelés, üzembe helyezés, felügyelet és frissítés) támogatja.

A PaaS az IaaS rendszerekre épül, ez amúgy egyben azt is biztosítja a felhasználói számára, hogy az infrastruktúrában előkészített virtualizált erőforrások kezelésével onnantól kezdve nem is kell foglalkozni, a felhasználónak (fejlesztő) csupán annyi a dolga, hogy lefejlessze és a rendszerben felkonfigurálja a futtatni kívánt alkalmazását.<sup>[4]</sup>

## Deployment

Sokszor szóba került ez a kifejezés az ismertető eddigi részében, vajon mit is jelent? Ugyanis gyakori a PaaS rendszerek igénybevételénél a deploy _(bevet, telepít)_ és deployment (_telepített változat_) szó használata.

**Deploy** (ige): az a cselekedet, amikor futásra felkonfiguráljuk a PaaS felhőben az alkalmazásunkat.
**Deployment** (fn.): az alkalmazás egy, éppen a felhőben futó példánya.<sup>[5]</sup>

Ezek fogalmakat viszont a magyar szakmai nyelvben nem használjuk úgy, mint _telepít_ vagy _telepített változat_, mert nem igazán szeretnénk keverni a telepítés fogalmával, nem teljesen az történik. Többet használjuk a deploy és deployment szavakat önmagukban, vagy informális kifejezésekkel helyettesítjük őket. Pl.: _"Fellövöm a szerverre a staging környezetet"_, _"Felélesztettem a productiont AWS-en."_

Az egyes PaaS szolgáltatók alaposan megadják, hogy várják szervereik a deploymentjeinket. Jó példa lehet a Netlify<sup>[6]</sup>, vagy a Heroku, amik git kiszolgálókon keresztül (pl.: GitHub) a publikus git repositorynk adott branchjéből képesek megszerezni a kódot. A Herokunak ezen módszere később bemutatásra is kerül. Természetesen ezen szolgáltatók nemcsak giten keresztül képesek fogadni deploymentet, hanem adnak erre külön API-t is.

## Architektúra

![](https://www.redhat.com/cms/managed-files/iaas-paas-saas-diagram3-1638x1046.png)

<div class="caption">3. ábra: Cloud computing modellek kölünbségei</div>

PaaS esetén a következőket a cloud szolgáltató menedzseli számunkra (hierarchiai sorrendben, legalsótól legfelsőig):<sup>[7]</sup>

- **Hálózat**
- **Tárhely**
- **Szervergépek**
- **Virtualizáció** (minden erőforrásra)
- **Operációs rendszer**
- **Köztes szoftver** _(middlewares)_: Ami az appunk és az operációs rendszer között áll, és szükséges lehet az app futásához, a szolgáltatásunk kiegészítéséhez.
- **Futtatókörnyezet** _(runtime environment)_
- **+ Fejlesztői eszközök** (pl.: debugger, fordító, monitorprogramok)

A felhasználónak (fejlesztő) így csak két dolgot kell menedzselnie:

- **Adatok** (avagy adatbázisok)
- **Alkalmazások**

## Virtualizáció

A szolgáltatói feladatkörök közül érdemes megtekinteni a virtualizációt közelebbről. A virtualizáció bevetésével tudják a cloud szolgáltatók maxiálisan hasznosítani erőforrásaikat az igénybevevők számára.

A felhasználó kap egy **virtuális gépet** _(virtual machine, VM)_, vagy az applikációját a szolgáltató **konténerbe** teszi _(container)_.<sup>[8]</sup>

![](https://www.veritis.com/wp-content/uploads/2019/08/containers-vs-virtual-machines.jpg)

<div class="caption">4. ábra: Röviden a konténerek és VM különbségéről</div>

Vegyünk egy PaaS szolgáltatót: **Heroku**, aminek megtekinthetjük a számunkra felajánlott virtualizációs lehetőségeit.<sup>[7]</sup>

![](https://gdm-catalog-fmapi-prod.imgix.net/ProductScreenshot/092c4416-a9cb-4bf7-a2a8-2be074cbec42.png)

<div class="caption">5. ábra: Heroku irányítópultja: metrikák megjelenítése</div>

A Heroku appjaink futtatási környezetére **"Dyno"**-kat ajánl fel. Ezek egyedi, lightweight _(könnyed, kis erőforrásigényű)_ Linux alapú **konténerek**, azaz Linux kernel fut alattuk, és az egyes app-példányokhoz csak a legszükségesebb rendszerkönyvtárakat + rendszerszolgáltatásokat emeli be az applikációnk futtatásához.

Az konténerek **alá rendelt operációs rendszer image**-et a cég **"Stack"**-nek nevezi, amik általában Ubuntu disztribúciók egyedi változatai. Herokus applikációink kódjának futtatható csomaggá építése egy-egy **buildpack** feladata, hogy az a megcélzott "stackkel" kompatibilis is legyen.

![](./supported_swsys.png)

<div class="caption">6. ábra: Alap buildpackek által támogatott szoftverrendszerek</div>

Dynok működése, használata:

- 3 féle **konfiguráció** létezik egy-egy dynora:
  1. _Web_: webapp folyamatok futtatására
  2. _Worker_: időzített, háttérben futó stb. jobok futtatására
  3. _One-off_: nem túl gyakran használt folyamatok futtatására (migrációkra, konzol kiírásokra)

* **Load balancing** _(terhelés elosztás)_ is történik.

- _Dyno Runtime_ működik rajtuk, ami...
  - **menedzsel**i az életciklusát a dynoknak.
  - **horizontálisan skáláz** = hozzáad újabb konténereket, ha szükséges pl.: a forgalom növekedésénél.
  - az applikáció számára **irányítja a forgalmat**, ami a domainra érkezik.
  - elkapja az app által adott **output**ot.
  - **felülvigyázza** az izolációját és védelmét a konténereknek.
  - **hálózati elérést biztosít** az app számára, ha az külső endpointokra, hozzácsatolt szolgáltatásokra kívánna forgalmazni.

Ha esetleg nem a Heroku konténerizációs módszerét szeretnénk alkalmazni (az egyedi Ubuntu "stackekkel"), akkor van esélyünk **Docker konténer**ben is felküldeni Herokura alkalmazásaink.

> Természetesen a Heroku által adott buildpackeken kívül elérhető több, a közösség által fejlesztett buildpack is, ezek a [Heroku Elements Marketplace](https://elements.heroku.com)-en böngészhetőek.

## Pro és kontra <sup>[9]</sup>

![](https://tomdudfield.com/content/images/2018/02/why.png)

<div class="caption">7. ábra: Példaábra egy PaaS szolgáltatás promótált előnyeiről</div>

### Mi haszna mindennek?

- **Költség csökkenése** - kisebb a fizikai infrastruktúra, így kisebb a technológiai lábnyomunk. Ha bemutatásra készülne egy Proof-of-Concept állapotú alkalmazás, azt könnyen fel lehet lőni a felhőbe, majd amint végeztünk a bemutatással, el lehet távolítani, amely ismét költségtakarékos, nem szükséges akár hónapokat kifizetni egy rövid futtatásért.
- **Skálázhatóság** - ha megnőne a forgalmunk, könnyen lehet erőforrásainkat kiszélesíttetni a szolgáltatónál.
- **Downtime csökkenése** - több példányban is futhat az alkalmazásunk a biztos kiszolgálás érdekében.
- **Gyors programozás** - Nem kell külön időt szánni az infrastruktúra üzemeltetésére.
- **Gyorsabb életciklusok** - lásd feljebb a DevOps mérnökség kifejtésénél.
- **Flexibilitás** - könnyedén lehet a szoftveres VM-eket és konténereket mozgatni hosztok között, sokkal gyorsabban lehet felállítani teljes szolgáltatásokat. Így példának hozható ismét az, ha bemutatásra készülne egy Proof-of-Concept állapotú alkalmazás, amelyet rövid időre kell csak deployolni.

### Mik a hátrányai?

- **Kontroll hiánya** - ha netán finomhangolnánk a rendszerünket, arra nincs lehetőség, mert az a szolgáltató feladatköre. Természetesen lehetnek erre a szolgáltatónak saját megoldásai.
- **Vendor lock-in** - a jelenség arra utal, ha netán az alkalmazásaink teljesen a PaaS szolgáltatótól függenek, nehéz lehet őket másik szolgáltatóhoz átmigrálni.
- **Teljesítmény** - megeshet, hogy a forgalom növekedésével a szolgáltatás nem lesz olyan sima, mintha egy dedikált szervergépen futna.

## PaaS modellen alapuló SW architektúrák <sup>[10]</sup>

![](https://tomdudfield.com/content/images/2018/02/Picture3.jpg)

<div class="caption">8. ábra: Azure által felajánlott PaaS és IaaS szolgáltatások</div>

A fenti ábrán is látható Azure PaaS szolgáltatásokból merítve néhány fontosabbat:

- Application Programming Interface appok / **API apps** és **mikroszolgáltatások**
  - Szívesen használják címtár- (OAuth2), adatbank- és banki kiszolgálóknál
- **IoT eszközök** összekötésére szolgáló alkalmazások
  - Központilag tudnak felküldeni a szervereinkre adatokat IoT eszközeink
- **Vállalati információs rendszerek**
  - PaaS eszközök segítségével analitikus adatokat könnyedén lehet gyűjteni vállalkozásunk informált döntéseihez és előrelátható eseményeihez.

# Heroku

## A Heroku világa

Korábban megismerhettük a Herokuban használt virtualizációs technológiákat (**Dynos**, **Stacks**), a környezetet (**Dyno Runtime**), és a **konfigurációkat**, amiben alkalmazásaink futtathatjuk.

A Heroku tanulóbarát, felajánl bizonyos limitekkel [ingyenes lehetőségeket](https://www.heroku.com/pricing). Mi is az "Free tier"-ben elérhető ingyenesen használható dynokat fogjuk használni.
Ennek a használatára jellemző: <sup>[11]</sup>

- Rövid élettartamú tárhelyet biztosít. Felhasználók által feltöltött fájlok így nincsenek biztonságosan letárolva a dynon.
- Ha webalkalmazásunk inaktív, azaz nincsenek hozzá bejövő kérések egy 30 perces intervallumon belül, akkor hibernálódik a dynonk. Ez azt is hordozza magával, hogy esélyes egy-egy "cold start" miatti hosszadalmas kéréskiszolgálás.
- Meghatározott, hogy maximum mennyi ideig futhat aktív állapotban az alkalmazásod egy hónapban összesen (ebbe nem számít bele az, amikor hibernált állapotban van). Emiatt tökéletesen megfelelhet ez a tier egy demonstrációs oldalnak, azonban ~100%-ban kihasznált üzemidejű dynokra nem alkalmas.

![](./dyno_pricing.png)

<div class="caption">9. ábra: Dynok árazásai</div>

> A Heroku vevőköre egészen sokszínű. Támogatják kezdő fejlesztők növekedését, emellett nagyobb szervezetekkel is partnerkednek. Vevőik közé tartozik a [DrivenData](https://www.heroku.com/customers/drivendata), egy széles körben ismert szociális körökben is tevékenykedő Data Science vállalkozás.

## Gyors bepillantás egy webes alkalmazás fejlesztésébe

A Heroku - mint azt már fentebb (6. ábra) megismerhettük - támogatja NodeJS alkalmazásoknak a platformjukra való deployolását. Ezen bemutatónak nem célja webes alkalmazások fejlesztésének bemutatása, így a következőkben egy már meglévő NodeJS + Express szoftverrendszeren alapuló alkalmazást fogunk Herokun élesíteni. Azonban egy kisebb betekintést lássunk a példaalkalmazás struktúrájába.

Az alkalmazás egy korábbi tanfolyamra készült, kész forráskódja [elérhető GitHubon itt](https://github.com/triszt4n/express-basics). A tanfolyamalkalomhoz tartozó [prezentációt pedig itt](https://slides.com/trisztanpiller/nodejs) érhetitek el, ahol bemutatásra kerül a NodeJS és Express szoftverrendszer is, valamint tutorialszerűen végigkövethető az alkalmazás lefejlesztése is.

### Mit csinál az alkalmazás?

Az alkalmazás a következő szoftveres alapokon működik:

![](https://peerbits-wpengine.netdna-ssl.com/wp-content/uploads/2018/05/The-backend-web-framework_-Express.jpg)

<div class="caption">10. ábra: Sematikus ábra az általunk is használt szoftverrendszer működésére</div>

- [**NodeJS**](https://nodejs.org/en/about/): Egy híres JavaScript runtime, ő fogja kezelni a http routingot, működtetni az alkalmazást [V8-as](https://hu.wikipedia.org/wiki/V8_JavaScript-motor) alapú motorjával.
  - [**Express**](https://expressjs.com): Elterjedt NodeJS felett használt keretrendszer. Hasznos segédmetódusokat definiál, leegyszerűsíti a routing megírását.
- [**MongoDB**](https://www.mongodb.com): Általános felhasználású, dokumentum-alapú (JSON), NoSQL DBMS. Ebben fogjuk tárolni a posztjainkat.
  - [**Mongoose**](https://mongoosejs.com): MongoDB-hez használt keretrendszer, amely a modellünkhöz objektum leképezéses API-t ajánl fel, valamint biztosítja a drivert, összekapcsolást MongoDB adatbázisunkhoz.
  - [**MongoDB Atlas**](https://www.mongodb.com/cloud/atlas): Egy DaaS _(Database-as-a-Service, egy specifikusabb cloud modell)_, azaz cloud adatbázis szolgáltatása a MongoDB-nek, ahol a free tierben elérhető módon az Azure-nál kérünk clustert az adatbázisunkra az [MDN Web Docs útmutatója szerint](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#setting_up_the_mongodb_database).

> A fenti rendszerek mindegyike (kivéve az Atlast) _open source_, elérhetőek a kódbázisaik GitHubon. A NodeJS community világát vizsgálva során gyakran találkozhatunk nyílt forráskódú projektekkel. <sup>[11]</sup>

Klónozás után nyissuk meg a projektet, nézzünk bele a projekt struktúrába:

![](./serverapp.png)

<div class="caption">11. ábra: A projekt struktúrája és az alkalmazásunk központi kódja</div>

Az appunk egyszerű célja egy olyan weboldal megjelenítése, ahol szabadon tudunk posztokat létrehozni, módosítani, törölni és megtekinteni (alapvető [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete)-funkciók).

A központi kód (`server.ts`) 8-14. soráig vértezzük fel különféle feldolgozóegységekkel az alkalmazást, a 16-20. soráig az útvonalakat konfiguráljuk fel (azok működését külön fájlokban, controllerekben oldjuk meg), valamint a 22-29. sorig láthatjuk a MongoDB adatbázisunkhoz való csatlakozás kódját. Végül a 31-35. sorig beemeltük az express alkalmazások tipikus szerverindítási kódját, ahol megadtuk, hogy melyik porton fogadja a kéréseket.

### Hogy tudom elindítani az alkalmazást?

A projekt alapvető tulajdonságait, a NodeJS-es szkripjeinket a `package.json`-ban találjuk.

A csomagok letöltéséhez, a kód lebuildeléséhez és a szerver lokális indításához a következő parancsok szükségesek:

```bash
npm install
npm run watch
```

![](./bash.png)

<div class="caption">12. ábra: Terminál üzenetei az utolsó parancs futtatása során</div>

A böngészőbe URL-ként a `localhost:3000/posts` címet beírva eljutunk az alkalmazás posztokat mutató oldalára.

![](./mainpage.png)

<div class="caption">13. ábra: Alkalmazásunk üres "posts" oldala a böngésző ablakában</div>

![](./createpage.png)

<div class="caption">14. ábra: Poszt létrehozása oldal</div>

![](./showpage.png)

<div class="caption">15. ábra: Posztunk megjelenése</div>

## Deployment folyamata <sup>[12], [13]</sup>

Első lépésként át kell alakítanunk az alkalmazásunk, hogy képes legyen deploymentre a Herokun. Ehhez csupán a `package.json` és a `server.ts` fájlunk tartalmát kell kicsit módosítani. Ehhez kövessük az [MDN Web Docs útmutatóját](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment#update_the_app_for_heroku). Hozzá kell adjuk a node motorunk verziószámát, illetve garantálnunk kell, hogy a dyno a megfelelő URI-on találja meg a MongoDB adatbázisunk (amely Herokun egy környezeti változóból lesz elérhető), illetve kikapcsoljuk a `bufferCommands` lehetőségét a `mongoose`-nak, hogy ne tudjon DB-kapcsolat nélkül parancsokat intézni. Ezután a változtatásokat felpusholjuk a git repositoryba is. Valamint követve [ezen blogposzt](https://medium.com/developer-rants/deploying-typescript-node-js-applications-to-heroku-81dd75424ce0) javaslatait, létrehozunk néhány egyéb szkriptet és Procfile-t is, tekintettel arra, hogy TypeScript alapú kódbázisunk van.

![](./new_settings.png)

<div class="caption">16. ábra: A package.json, server.ts és Procfile tartalma változtatás után</div>

Következő lépésként regisztráljunk a Heroku webes felületén a szolgáltatóhoz. Bejelentkezés után így köszönt minket az irányítópult.

![](./heroku_dashboard.png)

<div class="caption">17. ábra: Heroku webes felhasználói irányítópultja</div>

A Heroku többféle integrációs/deployment metódust felajánl számunkra, azonban mi a leggyakrabban használt módszert fogjuk követni, ahol egy git repositoryn keresztül kerül a felhőbe a kódunk, követve az [MDN Web Docs útmutatóját](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment#update_the_app_for_heroku).

A szolgáltató szervereivel való interakcióra a **heroku** CLI kliens alkalmazását fogjuk használni. [Installálás](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up) után futtatjuk a következő command-line parancsot:

```bash
heroku create
```

![](./heroku_create.png)

<div class="caption">18. ábra: `heroku create` parancs futásának outputja</div>

Szükségelni fog egy bejelentkezést is a parancs futtatása. Ennek végeztével a projektmappánk összekötésre kerül egy újabb _git remote_-tal, ez lesz az az új repository, amelyet majd a Heroku használ a deploymentünkhöz.

Most pedig futtassuk a következő parancsot:

```bash
npm run deploy
```

Ezt a szkriptet is definiáltuk a `package.json`-ban, és ezzel feltolunk egy commitot a saját repónkban, valamint a git repository-nk tartalma lemásolódik a távoli _herokus_ git remote-ba, és rögtön lefut az `npm start` parancs (illetve az `npm run postinstall` szkript is, ilyen okosra lett tervezve a Heroku, ami nekünk előny, így nem kell saját kézzel lefordítanunk a TypeScript kódot JavaScriptre). Következő lépés a konfigurációs változók beállítása, utána rátekintünk a weboldalunkra, amint a Heroku sikeresen újradeployolta az appot a környezeti változók beállítása után:

- **`NODE_ENV`**: beállítja, milyen változatban indul a környezet (most már productionben).
- **`MONGODB_URI`**: beállítja az adatbázis címét (A MongoDB Atlas szolgáltatáson korábban általam létrehozott adatbázist fogjuk használni.<sup>[14]</sup> A jelszót természetesen nem osztottam meg.)

```bash
heroku config:set NODE_ENV='production'
heroku config:set MONGODB_URI='mongodb+srv://dbUser:<pw>@cluster0.ssxvz.mongodb.net/posts?retryWrites=true&w=majority'
```

![](./done_index.png)

<div class="caption">19. ábra: Alkalmazásunk "posts" oldala már egy előre az Atlasba feltöltött poszttal</div>

![](./done_show.png)

<div class="caption">20. ábra: Az említett poszt megjelenítése</div>

![](./done_new.png)

<div class="caption">21. ábra: Új poszt létrehozási oldala</div>

![](./done_SHOWnew.png)

<div class="caption">22. ábra: Az újonnan létrehozott poszt megjelenése</div>

A fejezet elején említett Heroku irányítópultra navigálva, majd a deploymentet kiválasztva képesek vagyunk a webes felületen is a beállításokat megváltoztatni/megtekinteni (habár annyira nem ajánlott, jobban szeretjük a heroku CLI-t).

![](./heroku_settings.png)

<div class="caption">23. ábra: A deployolt app beállításai a Heroku webes felületén</div>

Tehát végül itt érhetjük el a webes alkalmazásunkat: [https://protected-journey-91469.herokuapp.com/posts](https://protected-journey-91469.herokuapp.com/posts)

> Érdemes megemlíteni, hogy a Heroku felajánl GitHub integrációt (CI/CD), ami felgyorsíthatja egy fejlesztői projekt munkafolyamatait, ugyanis akár pull requestenként is lehet deployolni az alkalmazást, így rögtön rá lehet nézni, lehet interakciókat végezni az élő változatán a webappnak.<sup>[15]</sup>

# Összefoglalás

## Eredmény

Sikeresen végigkövettem egy útmutatót, amellyel saját alkalmazást tehettem fel a felhőbe. Természetesen a PaaS szolgáltatások használata nem olyan egyszerű, és nem mindig adott a tutorial egy-egy fajta webapp PaaS rendszerre való deployolására, sokszor igényel személyes kutatást, próbálkozásokat, mérnöki átgondolást, hogy hogy is érdemes, miként lehet a legegyszerűbb és legjobban automatizált módon deploymenteket felküldeni egy felhőszolgáltatásba. Illusztrációként lent látható egy képernyőmentés a Herokus irányítópultomról, ahol látható, én sem elsőre deployoltam a működő és jól összekötött webalkalmazást (és a képen csak a fele látszik a teljes aktivitásomnak). Sokszor volt segítségemre a [Stackoverflow](https://stackoverflow.com/questions/65408618/mongooseerror-operation-users-findone-buffering-timed-out-after-10000ms) és a [Heroku dokumentációja](https://devcenter.heroku.com/articles/getting-started-with-nodejs?singlepage=true).

![](./tries.png)

<div class="caption">24. ábra: Deployment előzmények, tükrözik próbálkozásaim számát</div>

## Felhasznált források

<sup>1</sup> https://www.ibm.com/cloud/learn/cloud-computing

<sup>2</sup> https://azure.microsoft.com/hu-hu/overview/what-is-paas/

<sup>3</sup> https://www.ibm.com/cloud/learn/devops-a-complete-guide

<sup>4</sup> https://www.cloudflare.com/learning/serverless/glossary/platform-as-a-service-paas/

<sup>5</sup> http://ait2.iit.uni-miskolc.hu/oktatas/doku.php?id=tanszek:oktatas:informatikai_rendszerek_epitese:tizenket_faktor

<sup>6</sup> https://docs.netlify.com/site-deploys/overview/

<sup>7</sup> https://devcenter.heroku.com/categories/heroku-architecture

<sup>8</sup> https://devcenter.heroku.com/articles/dynos#dyno-configurations

<sup>9</sup> [PaaS Explained - YouTube video](https://www.youtube.com/watch?v=QAbqJzd0PEE)

<sup>10</sup> https://www.ibm.com/cloud/learn/paas

<sup>11</sup> https://openjsf.org/about/

<sup>12</sup> https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment#how_does_heroku_work

<sup>13</sup> https://devcenter.heroku.com/categories/deployment

<sup>14</sup> https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#setting_up_the_mongodb_database

<sup>15</sup> https://devcenter.heroku.com/articles/github-integration

[1]: https://www.ibm.com/cloud/learn/cloud-computing
[2]: https://azure.microsoft.com/hu-hu/overview/what-is-paas/
[3]: https://www.ibm.com/cloud/learn/devops-a-complete-guide
[4]: https://www.cloudflare.com/learning/serverless/glossary/platform-as-a-service-paas/
[5]: http://ait2.iit.uni-miskolc.hu/oktatas/doku.php?id=tanszek:oktatas:informatikai_rendszerek_epitese:tizenket_faktor
[6]: https://docs.netlify.com/site-deploys/overview/
[7]: https://devcenter.heroku.com/categories/heroku-architecture
[8]: https://devcenter.heroku.com/articles/dynos#dyno-configurations
[9]: https://www.youtube.com/watch?v=QAbqJzd0PEE
[10]: https://www.ibm.com/cloud/learn/paas
[11]: https://openjsf.org/about/
[12]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment#how_does_heroku_work
[13]: https://devcenter.heroku.com/categories/deployment
[14]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#setting_up_the_mongodb_database
[15]: https://devcenter.heroku.com/articles/github-integration
