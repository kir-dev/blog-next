---
layout: post
title: 'Android app patch (forráskód nélkül ;)...)'
author: kresshy
date: 2014-02-24 23:12:00
comment: true
---

Bizony! Jól látjátok, az eddig már bejáratott webfeljesztős témáktól most ugrunk egy szép nagyot. A következő pár percben részese lehettek egy androidos alkalmazás patchelésének. A dolog érdekessége pedig ott kezdődik, hogy a forráskód nem áll a rendelkezésünkre. Az úgy túl könnyű feladat lenne. Megkeresni a hibás kódrészletet, kijavítani a hibát és újrafordítani az alkalmazást, majd feltölteni a telefonra. A cél persze ugyanaz, és nagyjából a folyamat is, egyedül a módszerek különböznek. Ebben a cikkben megismerkedhettek a Reverse engineeringgel, a különböző toolokkal és magával a folyamattal. A sikerélményről pedig majd a végén, mert ez vagy sikerül vagy nem.

## Let the game begin!

Fut egy alkalmazás (nem a sajátod) ami nem várt hibát produkál. A program bluetoothon kommunikál egy mikrokontrollerrel és az adatátvitel megszakad. Kapunk egy hibaüzenetet miszerint timeout volt. A dolog érdekessége, hogy csak akkor kapunk timeoutot, hogyha 29000 byte-nál több adatot akarunk lekérni az eszközről, ami ez esetben egy altimeter.

![the_application](https://warp.sch.bme.hu/img/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBOQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8aae98b96bf34d37528f3eefe34eff64b870020f/app.png)

A működéséről csak annyit tudunk amit látunk. Ha valaki jártas az Android fejlesztésben akkor viszont tudja, hogy mi történik a rendszer mélyében, és talán kicsi motivációt érez arra, hogy a hibát kikalapálja a szoftverből. Egy nagyon egyszerű dolgot fogunk megcsinálni, mégpedig átírjuk, hogy a timeout sokkal később következzen be. Ez nem biztos, hogy megoldja a problémát, de jó lehetőség arra, hogy a program működésébe beleássuk magunkat, és az esetleges hiba nyomára is rábukkanjunk eközben.

## I need the installer...

Kell a telepítő fájl, ami nélkül esélyünk sincs belefogni a munkába. Ezt mindenféle backup programmal le lehet szedni a telefonról rootolás nélkül, de mivel ez egy olyan eszközhöz járt, amihez a gyártó a honlapjára feltöltötte a telepítő \*.apk fájlt, így nem kell ezzel foglalkozni. A következő programok kellenek ahhoz, hogy el tudjuk végezni a feladatot: apktool, dex2jar, jd-gui, apk-signer. Mindegyiknek megvan a maga feladata, ahogy azt majd folyamat közben látni is fogjátok.

## Tear it apart 4 fun

Fogjuk meg az apktoolt és szedjük szét a telepítőt. Ehhez parancssorban adjuk ki a következő parancsot:

```sh
apktool decode FD-A(V2.0).apk

I: Baksmaling...
I: Loading resource table...
I: Loaded.
I: Decoding AndroidManifest.xml with resources...
I: Loading resource table from file: C:\Users\Kresshy\apktool\framework\1.apk
I: Loaded.
I: Regular manifest package...
I: Decoding file-resources...
I: Decoding values */* XMLs...
I: Done.
I: Copying assets and libs...
```

Láthatjuk, ahogy elkezdi szétszedni az alkalmazást. Az apktool smali kódot állít elő, ami egyfajta reprezentációja a Dalvik bytecodenak. A sorok között megbújik a bytecode, de sokkal olvashatóbb. Megvan a soroknak a számozása, jelölve van, hogy az adott kódrészlet egy függvény, egy változó, stb. A Dalvik bytecode kicsit különbözik a Java bytecodetól, mégpedig abban, hogy regiszter alapú, míg a Java bytecode stack alapú. Sokkal tömörebb, így kisebb méretet foglal a mobil eszközön és eléggé jól ki van optimalizálva a gyors futás érdekében (azért tudjuk, hogy az android képes akadozni még így is). A Java itt csak mint nyelv jelenik meg a fejlesztés során, minden kicsit másképp működik mint az asztali környezetben. Itt kitérnék rá, hogy a Google nemsokára lecseréli a Dalvik VM-et az ART-ra. A változással gyorsulni fog a rendszer mivel a JIT (Just-In-Time) compilertől megszabadulnak és helyette AOT (Ahead-Of-Time) compiler lesz. Akit érdekel a runtime-ok világa az olvasson utána a megadott linkeken, továbbiakban itt nem lesz róla szó.

![unzip_this_stuff](https://warp.sch.bme.hu/img/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBPZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d228a0ba14a8715c283463ea15d1ef13997e8d1e/unzip.png)

Nézzük tovább a telepítő szétszedését. Nem elég az apktoollal szétszedni az alkalmazást, mivel a smali kódból elég nehéz megérteni a működését. Lehetőségünk van visszaállítani a Java kódot is a telepítőből. Abban ne reménykedjünk, hogy egy az egyben azt a kódot fogjuk visszakapni amit az alkalmazás fejlesztője megírt, de elég közel áll majd hozzá, és sokkal könnyebb belőle kiszedni, hogy hogyan működik a program. Az _.apk többé-kevésbé egy tömörített állomány, így bármilyen tömörító programmal meg tudjuk nyitni és ki tudjuk csomagolni. Ez a folyamat visszafele nem működik ott majd trükközni kell egy kicsit. Találni fogunk egy classes.dex fájt. Ezt a fájlt nevezzük Dalvik Executablenek és lényegében az ebben található kód fut a telefonon. Most jön képbe a következő hasznos tool, mégpedig a dex2jar. Ezzel a Dalvik futattható állományból egy _.jar fájlt tudunk csinálni. Jelenleg itt visszafele haladunk egy alkalmazás telepítő létrehozásának a folyamatában. Ha Eclipseben rákattintasz a fordításra akkor elsőként egy _.jar fájl jön létre, majd abból készül a _.dex fájl, végül pedig az _.apk, amit fel tudsz telepíteni a telefonodra (itt több minden történik persze de most erre se térünk ki). Mostanra eljutottunk odáig, hogy megvannak a smali fájlok, amikben el tudjuk végezni a szükséges patcheléseket, és megvan a _.jar fájl, amiből vissza tudjuk állítani a java kódot.

## Reverse engineer the code :)

Kezdjük el feltérképezni az alkalmazás működését. Az első fájl amit megnyitunk az AndroidManifest.xml amit az apktool visszaállított nekünk olvashatóra. Ebben kikeressük az alkalmazásunk belépési pontját, ami jelen esetben egy activity lesz, mégpedig az, amelyik legelsőnek elindul.

```xml
<activity android:label="@string/AppTitle" android:icon="@drawable/logo" android:name=".frmMain" android:screenOrientation="portrait">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>
```

Ezt a részt keressük, és ha megvan el is indíthatjuk a következő eszközünket a jd-gui-t és betölthetjük bele a már korábban elkészített _.jar fájlt. A Jd-gui egy grafikus felületű szoftver ami képes arra, hogy a _.jar fájlból visszaállítsa a Java kódot. Olyan mintha egy IDE lenne csak nem fogod benne szerkeszteni a kódot. Most el kell kezdeni megkeresni az említett részt, ahol megkapjuk ezt a hibaüzenetet. Elsőként szedjük össze, hogy mit tudunk a programról. Valószínű, hogy egy activityt keresünk amiben van egy TextField, ahova kiírja a már ismert hibaüzenetet.

Androidon érdemes szinte mindent a konfigurációs \*.xml fájlokban tárolni, így reméljük, hogy a hibaüzenet amit keresünk szövegként megtalálható lesz a strings.xml fájlban, vagy valami más xml-ben. Jól sejtettük, ott van! Mostmár csak az kell megkeresni, hogy az alkalmazásban, hol használhatja ezt a szöveget. A fő activity két továbbít tud elindítani. Az egyik az frmHardware a másik az frmDraw. Tudjuk, hogy az alkalmazás egy grafikont rajzol ki a mért adatokból, úgyhogy mi most a másik irányba fogunk elindulni. Ez egy nagyon egyszerű alkalmazás, és bejött az elméletünk.

```java
public static final int ReadDataTimeout = 2131034155;
```

Itt lesz az amit keresni fogunk. Egy android alkalmazás lelke az a bizonyos R.class fájl, amihez fejlesztés során nem nyúlhatunk. Ezt magától generálja a fejlesztőkörnyezet és ez tartalmazza a különböző erőforrások összerendelését azokkal a változókal (integer típusuak) amin keresztül elérjük őket. Tehát az R fájlból kikeressük a változónkat, megnézzük az integer értéket, ami hozzá van rendelve, és rákeresünk az frmHardware fájlban erre az értékre.

```java
String str3 = frmHardware.this.GetString(2131034155);
Message localMessage3 = new Message();
localMessage3.obj = str3;
localMessage3.what = 4;
                frmHardware.this.handler.sendMessage(localMessage3);
```

Bumm, ott van megtaláltuk! Rengeteg kód, rögtön látjuk, hogy ez egy szálkezelt alkalmazás. Hirtelen rádöbbenünk, hogy a bluetooth kapcsolatot és kommunikációt megvalósító kódok közepén vagyunk. Felmerül a kérdés, hogy innen hova tovább? Nem futamodunk meg, szem előtt tartjuk a célt! Egy számot keresünk, ez lehet konstans lesz de az is előfordulhat, hogy a kódba van beleégetve egy feltételként (ez a valószínűbb). Elkezdjük feltérképezni a program futását. Megjegyezzük, hogy ez a kódrészlet hol volt és mi volt, és elkezdjük feltérképezni ennek az activitynek a működését. Megnézzük a gombok megnyomására milyen függvények hívódnak meg. Megpróbáljuk megérteni a szálak működését és azt, hogy azok a bizonyos handlerek mit csinálnak? Segítek, a szálak közötti kommunikáció megvalósítására használják. Ha ismered az Android SDK-t akkor ez a folyamat elég gyorsan fog menni. Most, hogy már nagyjából átlátjuk remélhetőleg megtaláltuk a feltételünket, ahol a timeout vizsgálat történik.

```java
if (System.currentTimeMillis() - frmHardware.nTimeStep > 3000L) {

...

}
```

Ez egy long típusú érték. 3000 ms várakozás után terminálni fogja azt a szálat amin a bluetooth kapcsolat fut, auch. Mint már említettem, nem ez a megoldása a problémának, de remek játék más kódjában túrkálni és egyéb működést kikényszeríteni az alkalmazásból. Olyan mintha hackerek lennénk, az igazság az, hogy azok vagyunk! :) W000T ...

## Edit, build and run the stuff

Oké tudjuk, hogy 3000-ret keresünk de a smali kódban minden szám hexában van. Ha nem akarod kézzel kiszámolni, hogy ez mennyi 16-os számrendszerben, akkor váltsd át az operációs rendszer számológépével. Windowson tud ilyet a ketyere programozó üzemmódban. Ideje megkeresni a smali kódban, hogy hol van ez az érték. A fájlokat az osztályneveknek megfelelően nevezi el az apktool. Az egyedül érdekes dolog a fájl nevében található dollárjel például itt is: frmHardware$1.smali. Ezekben a fájlokban találhatóak azok az osztályok amelyekek megtalálhatóak az frmHardware osztályban. Ezért van itt ennyi frmHardware.smali-tól kezdve frmHardware$13.smali-ig egy csomo fájl, ilyen névvel. Keressünk az egyik fájlban rá az adott hexadecimális értékre ami 3000 esetén 0xbb8-lesz. Ha megtaláltuk akkor bizonyosodjunk meg arról, hogy jó helyen járunk-e. Ez elég nehezen olvasható rész de felfedezhetőek a függvények és ha láttál már assembly-t akkor a parancsok között is megtalálod amiket keresel.

```
sget-boolean v5, Lorg/skypup/BT;->lUploadBusy:Z

if-eqz v5, :cond_2

.line 136
invoke-static {}, Ljava/lang/System;->currentTimeMillis()J

move-result-wide v3

.line 137
.local v3, nTimeNow:J
invoke-static {}, Lfdrc/fda/frmHardware;->access$5()J

move-result-wide v5

sub-long v5, v3, v5

const-wide/16 v7, 0xbb8

cmp-long v5, v5, v7

if-lez v5, :cond_1

.line 138
iget-object v5, p0, Lfdrc/fda/frmHardware$2;->this$0:Lfdrc/fda/frmHardware;

const v6, 0x7f05002b

#calls: Lfdrc/fda/frmHardware;->GetString(I)Ljava/lang/String;
```

Láthatjuk az UploadBusy függvényt ami egy boolean értékkel tér vissza, majd pedig azt, hogy lekérjük a rendszeridőt currentTimeMillis(). A sub-long nál megtörténik a kivonás, és a cmp-long nál pedig megtörténik az összehasonlítás a 0xbb8 értékkel. Innen már lehet érezni, hogy jó helyen vagyunk. Nincs más dolgunk mint átírni ezt a const-wide sorban levő értéket 10000-re ami 0x2710 és reménykedünk, hogy nem fog összeomlani az alkalmazás.

## Lehet csomagolni

Ideje az alkalmazást újra felépíteni. Ezt az apktool segítségével fogjuk megtenni a következő paranccsal:

```sh
apktool build --force-all FD-A(V2.0) FD-A(V2.0).apk
```

Kaptunk egy \*.apk telepítő fájlt! Ohh már majdnem megvagyunk, azért még hiányzik egy fontos lépés, de mielőtt még azt megcsinálnánk próbáljuk meg feltelepíteni a telefonra a kapott alkalmazást. Ki gondolta volna, hogy ez nem megy :). Kapunk egy furcsa hibaüzenetet: `"Android package has no certificates at entry ... ignoring"`. Lehet vannak még benne egyéb információk, de minket ez érdekel. A telepítő amit csináltunk nincs aláírva :O! Ez így bizony nem fog soha éles rendszerre feltelepülni. A megoldás az, hogy írjuk alá! Erre való az apk-signer amivel tudunk csinálni egy saját keystore-t és ennek a segítségével aláírni a már kész telepítőt. Miután ezt megtettük fel tudjuk telepíteni a megpatchelt alkalmazásunkat ami remélhetőleg megjavul.

## Mit tanultunk mi ebből?

Jelen esetben sajnos ez nem segített a probléma megoldásában, de remek példa volt arra, hogy hogyan álljunk neki egy ilyen összetett feladatnak. Érdemes rászánni egy-két órát mire sikerül felépíteni a fejedben azt az absztrakt magas szintű struktúrát, ami egy idegen program működésének a megértéséhez kell. Megismerkedtünk rengeteg új és hasznos eszközzel, illetve ez a módszer alkalmas arra is, hogy ha kell szétszedjünk egy programot, megnézzük az implementációt és ötletet merítsünk belőle a saját programunkhoz. Mindig azt mondják, hogy más kódjából sokat lehet tanulni és ez igaz is. Ugyanakkor hozzá kell tennem, hogy nem etikus csak így turkálni más szoftverében. Gondolom ti se örülnétek neki, ha az engedélyetek nélkül elkezdenék lemásolni a programotoknak a belsejét. A végére még tartogatok egy meglepetést! Lehetőség van arra, hogy megnehezítsük az emberek dolgát, ha szétszedik az alkalmazásunkat. A natív kódot nehéz olvasni, sok mindent érdemes c++-ban implementálni. Az assembly-ben lévő kódot sokkal nehezebb visszafejteni és így a program működését is megérteni. A Java részéhez pedig használjunk obfuszkátort, erre van beépített tool az Android SDK-ban! Remélem tetszett nektek ez a cikk, a kérdéseket nyugodtan tegyétek fel kommentben!
