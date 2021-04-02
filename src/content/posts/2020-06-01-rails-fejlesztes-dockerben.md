---
layout: post
author: laci
date: 2020-06-09 15:33:54
title: 'Fejlesztés Docker konténerekben'
comment: true
---

## Bevezetés

A Docker és egyéb virtualizációs technológiák az üzemeltetésben már jelentősen elterjedtek, viszont a fejlesztésnél még csak szűkebb körben használtak. Egy egyszerű [Ruby on Rails][9] framework alapú projekten keresztül vizsgáljuk meg, hogy milyen szinten lehet hasznosítani a konténereket már a fejlesztés folyamatában is. Az alkalmazásnak szüksége van egy Ruby nyelvet támogató környezetre és egy PostgreSQL adatbázisra. Ezek a gazdagépre nem lesznek telepítve, kizárólag konténereken keresztül lesznek használva. A [RubyMine][3] és [Visual Studio Code][4] IDE-ket fogjuk beállítani és használni. Ez a két eszköz eltérő módon közelíti meg a konténerek használatát, ezért érdemes mindkettőt megismerni.

## Miért érdemes ezzel foglalkozni?

- Gyorsan és egyszerűen el lehet kezdeni egy adott alkalmazáson dolgozni, ha van hozzá Docker konfiguráció. Nincs szükség a függőségek letöltésére, konfigurálására.
- A fejlesztői és üzemeltetési környezetek közötti eltérések jelentős problémákat okzozhatnak egy alkamazás életciklusa közben. A konténerek által biztositott egységes környezetek csökkentik ezen problémák valószínűségét.
- Több alkalmazás párhuzamos fejlesztése adott függőség (pl.: adatbáziskezelő alakalmazás) eltérő verzióinak használatával könnyen megoldható, mivel egyszerűen lehet párhuzamosan használni több konténerhálózatot.

## Konténerek elkészítése

A JetBrains csapata elkészitett egy [példa projektet][5], a konténerek elkészítéséhez azt vesszük alapul. Elösször szükségünk van egy konténerre, amiben a Rails keretrendszert tudjuk futtatni. Docker Hub-on nem találtam megfelelő image-et ehez, ezért az alábbi **Dockerfile**-ban érdemes leirni az image-et:

```Dockerfile
FROM ruby:2.6.3
RUN curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs postgresql-client yarn
RUN mkdir /test_app
WORKDIR /test_app
# A projekt létrehozásánál kommentezzük ki a --- közötti sorokat.
#---------------------
COPY Gemfile /test_app/Gemfile
COPY Gemfile.lock /test_app/Gemfile.lock
COPY package.json /test_app/package.json
COPY yarn.lock /test_app/yarn.lock
RUN gem install bundler -v '2.0.2'
RUN bundle install
RUN yarn install --check-files
#--------------------
COPY . /test_app
EXPOSE 3000
```

A fenti image a Ruby 2.6.3-as verzióját tartalmazza, egy Debian rendszeren. Telepítjük még a Yarn és NodeJS csomagokat, amik kezelik a projektben lévő JavaScript fájlokat. Ezután létrehozzuk a test_app mappát és beállítjuk a konténer munkamappájának. Az ezt követő rész felelős az alkalmazás függőségeit képező Ruby és JavaScript könyvtárak letöltéséért. Az utolsó két sor bemásolja a projekt mappáját a konténerbe, majd a konténer 3000-es portját elérhetővé teszi a gazdagép számára.

A Dockerfile elkészítése után elkészíthetjük a **docker-compose.yml** fájl-t, ami a több konténerből álló alkalmazásunkat írja le.

```docker
version: '3'
services:
  db:
    image: postgres
    volumes:
      - ./tmp/db:/var/lib/postgresql/data
    environment:
      POSTGRES_HOST_AUTH_METHOD: trust
    ports:
      - "5432:5432"
  web:
    build: .
    # command: bundle exec rails s -p 3000 -b '0.0.0.0'
    command: tail -f /dev/null
    volumes:
      - .:/test_app
      - /test_app/node_modules
    ports:
      - "3000:3000"
      # Ports required for debugging
      - "1234:1234"
      - "26166:26168"
    depends_on:
      - db
```

A fájl első részében létrehozzuk a **db** szolgáltást, ami a postgres image alapú konténer lesz. Az adatbázisban tárolt adatok mappáját összekötjük a host egyik mappájával, ezzel perzisztensé téve az adatbázis adatait. Az egyszerűség kedvéért jelszót nem állítunk be. Majd a host 5432-es portját és a konténer 5432-es portját összekötjük.

A második szolgáltatásban fog futni a rails web szerver, ezért ezt **web** néven fogjuk létrehozni. Két lehetséges parancsot is felvettem. Az első elindítja a szervert. A második csak futó állapotban tartja a konténert, hogy fejlesztés közben csatlakozni lehessen hozzá.

Az alap Rails projekt elkészítéséhez kommentezzük ki a `---`-t tartalmazó sorok közötti részeket a Dockerfile-ban. Ezek a sorok majd az elkészült alkalmazás függőségeinek telepítéséért lesznek felelősek. Ezután létre kell hoznunk a konténereket és a web szolgáltatásban telepítenünk kell a rails könyvtárat, valamint létrehozni egy új alkalmazást, ami a PostgreSQL adatbázist fogja használni. Ha létrejött az alkalamazás, akkor a hozzá tartozó adatbázist is létre kell hozni. Az alábbi parancsok kiadásával tehetjük ezt meg.

```sh
docker-compose run web bash
gem install rails
rails new test_app --database=postgresql
rails db:create
```

A gazdagépen észrevehetjük, hogy a létrehozott fájlokat nem tudjuk szerkeszteni, mivel a tulajdonosuk a root felhasználó. Egy kézenfekvő megoldás a problémára, hogy megváltoztatjuk a fájlok tulajdonosát:

```sh
 sudo chown -R $USER .
```

Ez a megoldás hosszútávon nem ideális, mivel mindig meg kell változtatnunk a fájlok tulajdonosát, amikor a konténerből hozzuk létre őket. A Docker lehetőséget biztosít a felhasználói névtér map-elésére. Ezáltal elérhetjük, hogy a konténeren belüli root felhasználóhoz a konténeren kívül a saját felhasználónk tartozzon. Így a konténeren belül létrehozott fájloknak is a saját felhasználónk lesz a tulajdonosa. Ennek a beállításához az alábbi lépéseket kell követni.

Állítsuk be a felhasználó által használható UID-ket. Ehhez nézzük meg felhasználónevünket `$USER` váltózóban, valamint a UID-t az `id -u` paranccsal. Az alábbi fájlhoz hozzáadunk egy új bejegyzést, ami tartalmazza a felhasználónevünket (user), a UID-t(1000), és a kiosztható ID-k számát(1), kettősponttal elválasztva.

```
#/etc/subuid

user:1000:1
```

Végezzük el a fenti műveletet a GID-kre. Annyi különbséggel, hogy itt a saját csoportunk ID-jét használjuk. Ezt az `id -g` paranccsal kérhetjük le.

```
#/etc/subgid
user:127:1
```

A fenti beállítások elvégzése után, userns-remap tulajdonságot kell beállítani a felhasználónevünkre. Ez megtehetjük kapcsolóként.

```cmd
dockerd --userns-remap=user
```

Vagy daemon.json fájlban.

```json
#/etc/docker/daemon.json
{
  "userns-remap": "user"
}
```

Ezután már a konténerből létrehozott fájlok tulajdonosa a gazdagépen a saját felhasználónk lesz. Az alábbi paranccsal elindíhatjuk a konténereinket.

```sh
docker-compose up
```

A [localhost:3000](http://localhost:3000/) megtekinthetjük a Rails szerver kezdőoldalát.

![Imgur](https://i.imgur.com/5DGpHV2.png)

## RubyMine konfigurálása

Először gyorsan áttekintjük, miként állithatjuk be, hogy a RubyMine a konténerünet használja fejlesztés során. Megnyitjuk az IDE-t a projektünk mappájában. A **Settings/Preferences/Languages & Frameworks/Ruby SDK and Gems** oldalra navigálunk. Itt a **New remote** gombra kattintva felugrik egy dialógus ablak. Ezen beállítjuk a **Docker Compose** használatát. A lehetséges szolgáltatások közül kiválasztjuk a **web**-et. Az oké gombra kattintás után kiválasztjuk a most létrehozott remote-ot.

Ahhoz, hogy el tudjuk indítani az IDE-ből a webszervert, létre kell hoznunk a megfelelő konfigurációs fájlt. Ezt a **Edit configurations** menüpont használatával tehetjük meg. Ezene belül a **template**-ek közül válasszuk ki a **Rails** konfigurációt. Állitsuk át a használt docker-compose parancsot **docker-compose exec**-re. Ezután már elindítható lesz a webszerver.

A debugolás használatához még szükségünk lesz 2 gem-re. Ezek felvételéhez először írjuk be az alábbi sorokat a Gemfile-ba.

```Gemfile
#Gemfile

gem 'debase'
gem 'ruby-debug-ide'
```

Az IDE Alt+Enter lenyomása után felkínálja, hogy újra build-eli az image-et. Használjuk ezt a lehetősége, hogy a gem-ek belekerüljenek az image-be. Ha később további gem-ek telepítésére lenne szükségünk, a fentihez hasonló módon tehetjük meg.

## RubyMine használata

A Rails keretrendszer lehetőséget biztosít generátorok használatára, amik segítségével egy CRUD-ot megvalósító, tesztekkel ellátott weboldalt hozhatunk létre. Ennek használatával fogjuk kipróbálni a fejlesztőkörnyezet funkcióit. Ahhoz, hogy parancsokat tudjunk futtatni a konténerben, először csatlakoznunk kell hozzá. Ezt az alábbi paranccsal tehetjük meg.

```sh
docker-compose exec web bash
```

Alapvetően a RubyMine terminálja nem kapcsolódik a konténerekhez. Több mód is van, hogy a fejlesztőkörnyezet integrált terminálját automatikusan hozzákapcsoljuk az általunk választott konténerhez. Például a Services oldalon az attach menüpont használatával vagy a Shell Path átállításával. Az egyszerűség kedvéért most manuálisan, a fenti paranccsal csatlakozunk a konténerhez, mivel nem lesz erre gyakran szükség.

Ezután a konténerben navigáljunk el a projektünk mappájába (/test_app) és már, ki is adhatjuk a parancsot, amivel hozzáadunk alapvető funkcionalitásokat az alkalmazásunkhoz.

```sh
rails g scaffold ruby_mine name:string points:integer
```

Ha mindent jól csináltunk, akkor az alábbi sorok jelennek meg a konzolon:

![Imgur](https://i.imgur.com/wDxKCEh.png)

Láthajuk, hogy létrejöttek oldalak, tesztek, valamint egy kontroller is. Főként ezeket fogjuk használni az IDE tesztelés során. A **zöld háromszög** gomb lenyomásával elindítható a webszerver, ami a [localhost:3000](http://localhost:3000/)-es címen elérhető.

![Imgur](https://i.imgur.com/IJgL6cZ.png)

Ezután próbáljuk ki a többi fontosabb eszköz működését az IDE-ben. A debug, miután beállítottuk, hogy docker exec-kel legyen használva, egyből használható.

![Imgur](https://i.imgur.com/Dgln72k.png)

Teszteket is könnyedén futthatunk az IDE GUI-ján keresztül. Ehhez navigáljunk egy teszteket tartalmazó fájl-hoz, mondjuk **test/controllers/ruby_mines_controller_test.rb**-hez, itt a **jobb egérgomb** lenyomásával megjelennek a kontextusfüggő lehetőségek. Ezek közül válasszuk a **Run Minitest:**-lehetőséget. A tesztek futásának eredményét is megjeleníti a fejlesztőkörnyezet. Emellett lehetőség van a tesztek közül csak egyet futtani, valamint debug módban is elindíthatjuk a teszteket.

![Imgur](https://i.imgur.com/IrfSvfK.png)

A code-completion és az intelligens navigáció is működik, bár ezekhez nem szükséges a nyelvi környezet, az IDE önállóan nyújtja ezeket a szolgáltatásokat. Szinte minden lehetőség elérhető a konténerből, amit a natívan használt verzió támogat. Egy kivételt találtam: a natív ruby-t használó IDE-ben van lehetőség egyes tesztek futtatása után kilistázni a tesztfedettséget. Valamint az érintett sorokat is színezi a környezet annak függvényében, hogy érintette-e őket az adott futás. Ez a lehetőség még konténeres használat során nem elérhető, de a fejlesztők már tudnak a [problémáról][1].(A PyCharm alkalmazásban már megoldották, hogy elérhető legyen remote használatával ez a funkcionalitás.)

## Visual Studio Code konfigurálása

Nyissuk meg a projektet VSCode-ban. Első lépésként a **telepítsük a szükséges bővítményeket-öket**. Ezek az alábbiak:

- [Remote - Containers][6]
- [Ruby][7]
- [Ruby Solargraph][8]

Miután ezeket telepítettük **inditsuk újra az IDE-t** és indítsuk el a **docker-compose up** parancs kiadásával a konténereket. Ezután a bal oldalon lévő **Docker logóra** kattinva válasszuk ki **rails_developmet_in_containers_web** konténert, és válasszuk az **Attach Visual Studio Code** lehetőséget. Ezután telepítsük a konténerbe is a megfelelő bővítményeket. Ezt a **felhő gombra** kattinva egyszerűen megtehetjük. Ezután az **Open Folder** gomb használatával nyissuk meg **/test_app** mappát. A Solargraph működéséhez extra beállításokat kell elvégeznünk, a források között található [linken][2] ez is megtekinthető,de ezt itt nem írnám le részletesen. Már csak egy lépés van, hogy elkezdhessük használni a fejlesztő környezetet. A **launch.json** fájl-ban vegyük fel a **Rails server, Listen for rdebug-ide, Rails test** konfigurációkat. A VSCode által javasolt előre definiált lehetőségek teljesen megfelelők. Ezek után már használhatjuk az okos navigálást, code-completion-t, valamit debugolhatjuk és tesztelhetjük az alkalmazásunkat.

## Visual Studio Code használata

Az egyik legnagyobb különbség a VSCode és a RubyMine használata között, hogy a VSCode integrált terminálja autómatikusan kapcsolódik a konténerhez, igy egyéb beállítások / parancsok nélkül is elérhetjük a konténer parancssorát. Ezt használva itt is létrehozhatjuk, a fenti példához hasonlóan, a teszteléshez szükséges fájl-okat.

```sh
rails g scaffold vs_code name:string points:integer
```

A fenti parancs kimenetén a létrehozott fájlok nevére kattintva gyorsan megnyithatjuk az adott fájlt.

![Imgur](https://i.imgur.com/HGVdaEL.png)

Ha sikeresen felvettük a szükséges konfigurációkat a launch.json fájlba, akkor a **Run** tabon kiválaszthatjuk a **Rails server** konfigurációt és a zöld háromszöggel elindíthatjuk a szervert.

![Imgur](https://i.imgur.com/Ewk3Aua.png)

A debuggoláshoz **Run** tabon, válasszuk ki a **Listen for rdebug-ide** konfigurációt, majd indítsuk el. Felvehetünk breakpontokat, megnézhetjük a stack trace-t, valamint megfigyelhetjük a változók értékeit.

![Imgur](https://i.imgur.com/NcIQcFv.png)

A teszteket a **Run** tabon a **Rails test** konfiguráció elindításával tudjuk futtatni. A VSCode tesztfuttatás terén kevesebb lehetőséget biztosít, mint a RubyMine. Külön konfiguráció nélkül csak egyszerre tudjuk futtatni a teszteket, egy kiválasztott tesztet önállóan nem indíthatunk el. Valamint a tesztek debug-olásaház is új konfigurációt kell hozzáadni a launch.json fájlhoz.

![Imgur](https://i.imgur.com/c2vV8WC.png)

## Összefoglalás

Amikor mérlegeljük, hogy megéri-e konténeres környezetben fejleszteni, több szempontot is érdemes figyelembe venni. Az első, hogy a nekünk szükséges környezet konfigurálása mennyire összetett / időigényes. Ha van megfelelő Dockerfile, docker-compose.yml, valamint már használtunk olyan IDE-t, ami támogatja a konténerek használatát, akkor a konfiguráció jelentősen egyszerűbb. Valamint érdemes utánanézni, hogy vannak-e olyan funkcionalitások a választott IDE-ben, amik konténeres környezetben nem használhatóak, valamint ezek mennyire szükségesek a munkánkhoz. Talán a legfontosabb tényező, hogy mennyi időt takaríthatunk meg, ha virtualizált környezetben fejlesztünk. Ha többen dolgozunk egy projekten, akkor hatékony lehet, hogy nem kell mindenkinek a telepítést és konfigurálást elvégezni, valamint egységes működésre lehet számítani minden eszköznél, tehát ilyenkor jelentős időt takaríthatunk meg.

## Kész projekt

Az befejezett projekt elérhető GitHub-on, az alábbi linken:
https://github.com/SepsiLaszlo/rails_development_in_containers

## Források

- rubymine setup: https://www.jetbrains.com/help/ruby/using-docker-compose-as-a-remote-interpreter.html
- alap image: https://github.com/JetBrains/sample_rails_app
- konténeren belül létrehozott fájlok jogosultsága problémaleírás: https://jtreminio.com/blog/running-docker-containers-as-current-host-user/
- megoldás: https://www.jujens.eu/posts/en/2017/Jul/02/docker-userns-remap/
- docker user namespace dokumentáció: https://success.docker.com/article/introduction-to-user-namespaces-in-docker-engine
- vscode debug setup: https://share.atelie.software/using-visual-studio-code-to-debug-a-rails-application-running-inside-a-docker-container-3416918d8cc8
- vscode Solargraph (language server) setup: https://solargraph.org/guides/rails
- tesztlefedettség vizualizáció issue: https://youtrack.jetbrains.com/issue/RUBY-12337
- Ruby Mine: https://www.jetbrains.com/ruby
- Visual Studio Code: https://code.visualstudio.com/
- alap projekt: https://github.com/JetBrains/sample_rails_app

[1]: https://youtrack.jetbrains.com/issue/RUBY-12337
[2]: https://solargraph.org/guides/rails
[3]: https://www.jetbrains.com/ruby/
[4]: https://code.visualstudio.com/
[5]: https://github.com/JetBrains/sample_rails_app
[6]: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers
[7]: https://marketplace.visualstudio.com/items?itemName=rebornix.Ruby
[8]: https://marketplace.visualstudio.com/items?itemName=castwide.solargraph
[9]: https://rubyonrails.org/
