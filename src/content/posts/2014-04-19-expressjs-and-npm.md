---
layout: post
author: kresshy
date: 2014-04-19 10:00:00
title: Az express.js és az npm, Node is still a badass tech - III. rész
---

Egy kisebb kihagyás után folytatjuk az előre haladást a Node.js világában. A mai témánk az npm ([Node Package Manager](http://www.npmjs.com/)) illetve az [Express.js](http://expressjs.com/) web application framework. Előbbi a csomagok menedzselésére, utóbbi pedig webalkalmazások készítésére szolgál. Az express.js egy [Sinatra](http://www.sinatrarb.com/) szerű framework, amelyet igen egyszerű használni. Ebben a cikkben az alapokról lesz szó, és megpróbálom bemutatni, hogyan tudtok elindulni egy ilyen webalkalmazás fejlesztésekor.

<img src="//warp.sch.bme.hu/08e5024461b554fc0a43611ffab1a8fe3c0eb5c1" alt="express-cover">

## Node package manager

Az npm egy package manager (csomagkezelő) a Node.js-hez. A nevéből következően arra használhatjuk, hogy Node programokat és csomagokat telepítsünk. Ha fejlesztéshez használod, akkor az megkönnyíti a függőségek letöltését és menedzselését az alkalmazáshoz. Segítséghez az `npm help` parancsot futtassuk. A csomagokat az `nmp install blerg` paranccsal tudjuk telepíteni. Jelen esetben a blerg csomag legfrissebb verzióját fogja telepíteni. Az `npm ls` paranccsal lehet listázni a telepített vagy létező csomagokat például: `npm ls installed`. Az `npm update` paranccsal frissíthetjük a már telepített csomagokat. Az npm az úgynevezett _registryből_ dolgozik, ahol az összes létező csomagról megtalálhatóak az információk.

### A package.json fájl

Ez a fájl az alkalmazásod könyvtárának a gyökerébe kell kerüljön. Információkat hordoz az npm számára, hogy hogyan épül fel a csomagod, és mit kell csinálni, amikor telepíted. A legtöbb esetben a "name", "version" mezőket kell kitölteni. A formátuma, ahogy a kiterjesztése is mutatja json, így ha nem tudod, hogy ez hogy kell felépüljön, akkor ideje megtanulni [innen](http://www.w3schools.com/json/).

```json
{
  "name": "application-name",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "3.5.0",
    "jade": "*",
    "less-middleware": "*",
    "connect": "*"
  }
}
```

Az itt látható json egy egyszerű Node.js alkalmazásnak a package.json fájlja. Egyértelmű, hogy melyik mező mire szolgál. A nagyon fontos rész a `dependencies`. Itt tudod megmondani az alkalmazás függőségeit, amelyeket telepíteni kell, hogy működjön a csomagod, vagy az alkalmazásod. Ha ez a fájl létezik elég kiadnod egy `node install` parancsot az aktuális könyvtárban, és automatikusan telepíteni fogja ezeket a csomagokat.

## Az express.js framework

Annak ellenére, hogy a Node HTTP modulja kiváló, nagyon sok dologról kéne gondoskodnunk, ha mindent mi szeretnénk megvalósítani. Az express keretrendszer alapvető funkcionalitásokat valósít meg számunkra, hogy ne azzal menjen az idő el, hogy routingot vagy statikus fájlok kiszolgálását valósítjuk meg, hanem ténylegesen csak az alkalmazással kelljen törődnünk, és minden mást szolgáltat nekünk.

Az express telepítéséhez a már előbb bemutatott npm-et fogjuk használni. Adjuk ki a következő parancsot: `npm -g install express`. Ekkor az npm telepíteni fogja az express csomagot. A `-g` kapcsoló azt jelenti, hogy globálisan telepíti a csomagkezelő. Az express innentől parancssoros alkalmazásként is működik. Egy új webalkalmazás létrehozásához adjuk ki az `express test` parancsot. Ennek hatására létrejön egy új könyvtár _test_ néven és minden szükséges függőséget telepíteni fog, illetve legenerál nekünk a parancssoros eszköz. A test/package.json fájl is létrejön amiben a következők lesznek megtalálhatóak:

```json
{
  "name": "application-name",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "3.5.0",
    "jade": "*"
  }
}
```

Láthatjuk, hogy ennek az alkalmazásnak két függősége van. Az egyik maga az express keretrendszer, annak is a 3.5.0-ás verziója, a másik pedig a Jade, ami nem más mint egy template engine, amelyről a sorozat következő cikkében lesz szó.

Található még egy app.js fájl, ami az alkalmazásunk fő JavaScript fájlja lesz. Láthatjuk a fentebbi json-ban, hogy a node mindig ezt a fájlt fogja futtatni, és létrejön jópár könyvtár alapvető fájlokkal, amik gyakorlatilag az alkalmazás vázát adják.

Ha a könyvtárba belépünk és kiadjuk az `npm install` parancsot, akkor megtörténik a függőségek telepítése. Ilyenkor létrejön egy `test/node_modules/` könyvtár amin belül megtalálhatóak az alkalmazásunk függőségei. Amennyiben most szeretnénk a következő paranccsal ki is tudjuk próbálni, hogy működik-e az alkalmazásunk

```sh
$ node app.js
Express server listening on port 3000

```

Ha minden rendben kiírja, hogy a 3000-res porton hallgat az alkalmazás, amit egy böngészőben meg is nézhetünk. Annyi a dolgunk, hogy írjuk be a következő címet: `localhost:3000`. Láthatjuk a paranccsorban, hogy befut egy HTTP GET kérés és az oldal a böngészőben meg is jelenik.

```sh
GET / 200 500ms - 170b
GET /stylesheets/style.css 200 10ms - 117b
Error: ENOENT, open '...\workspace\test\node_modules\expres
s\node_modules\connect\node_modules\public\favicon.ico'
```

Látható a kimeneten, hogy az express is használ csomagokat, amik szintén az `express/node_modules` könyvtárában vannak telepítve. Ilyen például a `connect` csomag, ami jelenleg annyira nem érdekel minket, de a segítségével sokkal könyebb a HTTP GET illetve POST kéréseket feldolgozni és az express erőteljesen épít a szolgáltatásaira.

Gyorsan vizsgáljuk meg a létrehozott könyvtárakat is. Három fontos könyvtár van, a `public`, a `routes`, illetve a `views`. Az elsőben tároljuk az összes statikusan kiszolgálható fájlt pl.: képek, javascript fájlok, css fájlok stb. Természetesen ezek is a megfelelő mappákba vannak rendezve.

Ami viszont sokkal érdekesebb az a `routes` könyvtár, ahol kapásból találhatunk egy index.js fájlt. Ez a mappa tartalmazza, az egyes url-ekhez tartozó JavaScript fájlokat, amik kezelik a különböző kéréseket. Az index.js fájl tartalma most még nagyon egyszerű, egy függvényt van benne, amit az exports objektumon be is állítunk. Ez az egész a route-ok megvalósításához kell, mert az app.js-ben ezekre az exportált függvényekre hivatkozunk, amikor egy url-en befut egy kérés.

```js
/*
 * GET home page.
 */

exports.index = function (req, res) {
  res.render('index', { title: 'Express' })
}
```

Az utolsó könyvtár pedig a `views`, ahol a HTML template fájlokat tároljuk. A template engine alapértelmezett esetben a jade, de ez természetesen bármikor lecserélhető.

## Miket rejteget az app.js fájl?!

Nézzük meg szinte soronként a fájl tartalmát. Az első rész a függőségek betöltése.

```js
/*
 * Module dependencies.
 */

var express = require('express')
var routes = require('./routes')
var user = require('./routes/user')
var http = require('http')
var path = require('path')

var app = express()
```

Az app objektumunk lesz az alkalmazásunk lelke. Ebben az objektumban tudjuk beállítani a szükséges dolgokat, hogy az express működjön. Az alább olvasható részben látható, hogy kezdjük a portszámmal, amin futni fog az alkalmazás, a különböző könyvtárak megadásával, ahol a templateket tároljuk illetve a statikus fájlokat. Láthatjuk, hogy az alkalmazásunk különböző modulokat használ az expressből.

```js
// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.methodOverride())
app.use(app.router)
app.use(express.static(path.join(__dirname, 'public')))
```

A legutolsó legfontosabb rész pedig a route-ok megadása, ezeket a böngészőbe beírva, biztosan lesz egy kezelő függvény, ami megvalósítja a kívánt működést. Az utolsó fontos rész pedig a szerver elindítása és a megadott porton történő figyelés a kérések kiszolgálása érdekében.

```js
app.get('/', routes.index)
app.get('/users', user.list)

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})
```

Ma két dolgot néztünk át. Az egyik az npm és annak használata, a másik pedig egy ismerkedés volt, az express.js keretrendszerrel. A következő részben viszont már egy egyszerű weboldalt fogunk készíteni az express.js-t használva.
