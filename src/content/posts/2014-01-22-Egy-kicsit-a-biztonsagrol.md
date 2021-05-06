---
layout: post
title: 'Egy kicsit a biztonságról'
author: kresshy
date: 2014-01-22 20:30:00
comment: true
---

Egy weboldal nagyon hasznos annak a közösségnek, akik mindennap használják az általa nyújtott szolgáltatásokat. Egy felhasználói közösséget nagyon nehéz és időigényes felépíteni, viszont a szolgáltatás gyakori kiesésével könnyedén, percek alatt porig lehet rombolni az eddigi munkánknak az eredményét. A felhasználók nem szeretik, ha nem tudják elérni a megszokott funkciókat és a barátaikat, mert valamilyen hiba lépett fel, vagy az oldal ismeretlen okból nem üzemel megfelelően. A kódban található rengeteg hiba mellett (amelyek kiesésekhez vezethetnek) létezik egy sokkal nagyobb probléma is. Egy támadó az oldal mögött található erőforrásokhoz próbálhat hozzáférni, hogy személyes adatokhoz, vagy magához a szerverhez szerezzen részleges, esetleg teljes hozzáférést. Ebben a cikkben egy-két webes sérülékenységekre koncentrálunk és szeretnénk egy kis bevezetést adni a létező támadási formákba illetve az ezekkel szembeni védekezésbe.

## A jó öreg SQL Injection

Az SQL Injection egy kód futtatási technika adatbázist használó alkalmazások támadására. Rosszindulatú SQL kódot írnak be egy beviteli mezőbe, ami majd később végrehajtódik a szerver oldalon. Ez akkor fordulhat elő, hogyha a beviteli mezőben nem szűrjük a megfelelő karaktereket és ezek belekerülnek az SQL kifejezésbe. A megoldás az, hogyha az ilyen karaktereket kiszűrjük a bevitt adatokból, tehát a beviteli mezők validációjával illetve prepared statementek használatával ez a sebezhetőség elkerülhető. Nézzünk egy nagyon egyszerű példát:

```mysql
sql_statement = "SELECT * FROM users WHERE name='" + user_name + "';"
```

Ez az SQL kifejezés a `users` táblából kikeresi azt a felhasználót amelyiknek a felhasználó neve megegyezik a `user_name` változó tartalmával. Ha viszont egy rosszindulatú felhasználó SQL kódot ír a beviteli mezőbe akkor ez a lekérdezés másképpen fog kiértékelődni.

```mysql
' or '1'='1
```

Amennyiben ez a kódrészlet kerül a `user_name` változóba, akkor a kifejezésünk igazként fog kiértékelődni mivel az 1=1 mindig teljesülni fog. A végén pedig így néz majd ki a végrehajtott lekérdezésünk:

```mysql
SELECT * FROM users WHERE name = '' OR '1'='1';
```

## XSS - Cross-site scripting

Az XSS lehetőséget nyújt kliens oldali szkriptek beszúrására a weboldalba, ami egy másik felhasználó számára fog megjelenni. Egy tipikus XSS támadásban a támadó egy legitim webalkalmazásba rosszindulatú kliens oldali scriptet helyez el.

![](https://www.acunetix.com/wp-content/uploads/2012/10/PTMFOG0000001531.png")

Amikor egy felhasználó meglátogatja a weboldalt akkor a böngészőjében ez a szkript letöltődik és végrehajtódik (gyakorlatilag itt történik meg ténylegesen a beszúrás) és ezek után már a támadó által elhelyezett szkript fog futni a felhasználó böngészőjében. Legtöbbször a `<script>` az `<img>` és az `<iframe>` elemeket támadják. Például a beviteli mezőbe ezt írják be:

```html
<script>
  alert('XSS')
</script>
```

Ezek a szkriptek akár egy egyszerű form elküldésével is felkerülhetnek az oldalra, de komplexebb útvonalon is eljuthatnak a célhoz JSON, vagy XML Web Service-en keresztül. Kétféle megoldás is létezik. Az egyik az, hogy itt is a beviteli mezőkben található adatokat megfelelően ellenőrizzük, amelyben például figyelünk a `<script>` tagekre, JavaScript parancsokra, CSS stílusokra és egyéb veszélyes HTML elemekre. A másik pedig az, hogy az outputot kódoljuk. Ilyenkor ha az injektált kódunk a következő: `<script>alert(\"abc\")</script>` akkor a kimeneten megfelelően kell kódolni:

```html
&lt;script&gt;alert(&quot;abc&quot;)&lt;/script&gt;
```

## CSRF vagy XSRF - Cross-Site Request Forgery

A fenti két mozaikszó egyenértékű de sokszor a Sea-Surf kifejezéssel is hivatkoznak erre a sérülékenységre. Míg az XSS-nél a felhasználó weboldalba fektetett bizalmát használták ki addig a CSRF-nél a weboldalnak a felhasználó böngészőjébe fektetett bizalmát használják ki. Az egész arra megy ki, hogy az áldozat rámenjen egy másik weboldalra vagy rákattintson egy URL-re ami rosszindulatú jogosulatlan kéréseket tartalmaz. Az áldozat személyében és jogaival hajtanak végre olyan cselevéseket amelyet a támadó szeretne. Ilyen egy form elküldésének a részletei, vásárlások és fizetések lebonyolítása a támadó számára egy harmadik féltől származó felhasználói fiókon keresztül.

### Egy egyszerű példa

Ahhoz, hogy végre lehessen hajtani a CSRF támadást a felhasználónak már előtte be kell jelentkeznie a cél oldalra. Feltételezve, hogy az áldozat már autentikálta magát a támadó elhelyez egy linket vagy szkriptet egy másik weboldalra, amit a felhasználó meglátogathat. Így amikor rákattint a másik weboldalra vagy linkre, egy rosszindulatú szkript végrehajtódik anélkül, hogy a felhasználó erről bármi tudomást szerezne. Nézzük meg a következő példát:

Van egy chat alkalmazás, ahol a támadó egy üzenetet küld egy `<img>` taggel. Viszont a forrás attribútumban nem a kép forrása található, hanem egy link ami egy átutalási műveletet hajt végre az áldozat banki felhasználói fiókjával.

```html
<img src="http://bank.example.com/withdraw?account=bob&amount=1000000&for=Fred" />
```

Ez a CSRF támadás a HTTP GET kérést használja ki ugyanakkor lehetőség van a HTTP POST kérések támadására is. Ennek a támadásnak a megelőzésére kitalálták a tokenek használatát. A tokenek hosszú kriptográfiai értéket tartalmaz amelyeket nehéz kitalálni. Ezt akkor generálják, amikor a felhasználói session kezdődik és ehhez a sessionhöz lesz hozzárendelve ez a token. Ez a challange (kihívás) token minden kéréshez hozzá lesz csatolva, amit a szerver használ arra, hogy ellenőrizze a legitimitását a végfelhasználói kéréseknek.

## Denial-of-service egyszerűbben DoS

"If everything else fails..." - ez az egyik legrosszabb támadás típus. Arra irányul, hogy használhatatlanná tegyen egy szervert, vagy egy hálózati erőforrást a felhasználói számára. Akkora mennyiségű kérést küld a szervernek, hogy az már nem tudja a valós kéréseket kiszolgálni vagy pedig annyira lassan, hogy gyakorlatilag elérhetetlenné válik a szolgáltatás. A DoS támadás nem elosztott vagyis egy rendszertől, személytől származik, ha többen vesznek rész egy ilyen támadásban azt már DDoS-nak nevezzük vagyis Distributed Denial-of-Servicenek.
Nagyon sok nemzet törvénye bünteti az efféle támadásokat. Egy ilyen támadás megállításhoz nem lesz elég a webalkalmazásunkat közel hibamentesre fejleszteni. Szükség van arra, hogy a hálózat többi eszköze is megfelelően reagáljon. A tűzfalak, switchek, routerek folyamatosan figyelik a hálózati forgalmat és ha úgy látják, akkor közbeavatkoznak. Egy fejlesztő egyedül nem tudja felkészíteni az alkalmazást, hogy ellenálljon az ilyen támadásoknak.

## Nem érzem magam biztonságban

Ez nem is baj, ugyanis a fent említett támadások csak nagyon kis halmazát fedik le a valóságban létező és működő támadási formáknak, illetve ezeknek a módszereknek is többféle fajtája van. Tökéletes biztonság sajnos nem létezik, ám a kockázatot tudjuk csökkenteni azzal, hogy védekezünk a már ismert támadási formák ellen.
