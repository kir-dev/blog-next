---
title: "Böngéssz Pythonban!"
author: kresshy
layout: post
date: 2014-01-07 23:54:00 CET
comment: true
---

Ideje elvinni kicsit más irányba is a blog tartalmát, mivel az utóbbi időben jóformán csak front-end téma került elő. Mindig is foglalkoztatott az, hogy programozottan tudjam böngészni az világhálót. Ne gondoljunk rögtön a teljes internetet bejáró robotra, ezt a feladatot hagyjuk meg a Google-nek. Mi csak egy oldalra koncentrálunk erről szeretnénk lekérni, kiolvasni a tartalmát, megnézni a linkeket, letölteni róla egy-két fájlt, esetleg formokat kitölteni és elküldeni. A segítségünkre lesz a Python mint script nyelv és két modulja; a [_mechanize_](http://wwwsearch.sourceforge.net/mechanize/), és a [_BeautifulSoup_](http://www.crummy.com/software/BeautifulSoup/). Előbbivel egy böngészőt tudunk szimulálni, utóbbival pedig a HTML oldal elemeit tudjuk feldolgozni.

## mechanize

Programozott webböngészést tesz lehetővé és képes a böngésző állapotainak a megvalósítására is: navigációs előzmények, HTML form állapotok, cookie-k stb. A _mechanize_ Andy Lester Perlben írt WWW::Mechanize moduljának Python átirata.

### Lássuk azt a böngészőt!

Kifejezetten egyszerű használni a modult, nincs is más dolgunk mint importálni és meghívni a megfelelő függvényeket, amelyek mondhatni önmagukért beszélnek.

~~~python
import mechanize
import cookielib

br = mechanize.Browser()
cj = cookielib.LWPCookieJar()
br.set_cookiejar(cj)
~~~

Kész is a böngészőnk! Nem is olyan nehéz, és a következőkben ennél csak könnyebb lesz. Mielőtt tovább mennénk, nézzük meg mi történik. Gyakorlatilag létrejön egy `Browser` objektumunk és a `cookielib` lesz a felelős a `Browser` által tárolt cookiek (sütik) kezeléséért. Ez az objektum olyan, mint egy grafikus felület nélküli böngésző. Megvannak a szükséges metódusai, amiket ha kivezetnénk egy felhasználói felületre, akkor egy kész böngészőt kapnánk. Mielőtt még elmerülünk a programozott böngészés világában, nézzük meg milyen beállítási lehetőségei vannak az objektumunknak:

~~~python
# Browser beállítások
br.set_handle_equiv(True)
br.set_handle_gzip(True)
br.set_handle_redirect(True)
br.set_handle_referer(True)
br.set_handle_robots(False)

# Frissítések
br.set_handle_refresh(mechanize._http.HTTPRefreshProcessor(), max_time=1)

# Debug üzenetek
#br.set_debug_http(True)
#br.set_debug_redirects(True)
#br.set_debug_responses(True)

# User-Agent (egy kis csalás :])
br.addheaders = [('User-agent', 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.1) Gecko/2008071615 Fedora/3.0.1-1.fc9 Firefox/3.0.1')]
~~~

A legtöbb egyértelmű, de az utolsó érdekes. A `User-Agent` gyakorlatilag egy szoftver, ami a felhasználó nevében tevékenykedik. A böngészőkben, az e-mail kliensekben mind megtalálható. Nagyon sok esetben a User-Agent kliensként viselkedik egy hálózati protokollban a kommunikáció során - például a kliens-szerver architektúrában.

A fentieket ismerve elkezdhetünk játszani a böngészőnkkel. Van egy `open(url)` metódusa, amivel oldalakat tudsz megnyitni majd a `response()` függvényéből kapjuk meg a választ.  Az `open()` után közvetlenül meghívva a `response().read()` függvényeket láthatjuk a letöltött oldal forrását. A `title()` függvénnyel ki tudjuk írni az oldal címét, az `info()` függvénnyel a header tartalmát tudjuk megnézni és így tovább. Az oldalon található formokat a `forms()` függvénnyel tudjuk lekérni ami egy listát szolgáltat a formok neveivel. Nézzük meg mennyire egyszerű kiválasztani egy formot!

~~~python
# egy oldal letöltése
url = "http://kir-dev.sch.bme.hu"
response = br.open(url)
html = br.response().read()
print html

# Listázza a formokat
for f in br.forms():
    print f

# Kiválasztjuk az első formot
br.select_form(nr=0)

# A form egy mezőjébe beleírunk valamit majd submitoljuk
br.form['q']='random stuff'
br.submit()

# koilvassuk a kapott választ
print br.response().read()
~~~

Remek, de azért egy weboldal több dologból áll, mint puszta formok tömkelegéből. Mindenre van megoldás, követni tudjuk a linkeket, le tudunk tölteni fájlokat, a lehetőségeknek csak a képzeleted szab határt. A letöltésnél vigyázzunk, mert sok helyen a direkt linkeknél ha nincs beállítva a cookie kezelése, akkor feldobhat `captchat` a cél oldal (ellenőrző mezők, hogy nem robot vagy-e, itt az a baj, hogy lényegében az vagy). Ezeket a linkeket nem a `retrive()` függvénnyel kell letölteni hanem ténylegesen rá is kell kattintani a `click_link()` függvénnyel. Ilyenkor ellenőrzésre kerül a már említett cookie tartalma, és máris hozzá tudunk férni a letöltendő fájlhoz (elképzelhető, hogy nem cookie-val van megoldva, ez csak egy megoldás a sok lehetséges közül). A linkeket is lehetőségünk van ugyanúgy kilistázni akárcsak a formokat: `for link in br.links(regex)`!

~~~python
# A link létezésének a vizsgálata
br.find_link(text='kir-dev')

# Ténylegesen rákattintunk a linkre
req = br.click_link(text='kir-dev')
br.open(req)
print br.response().read()
print br.geturl()

# Vissza
br.back()
print br.response().read()
print br.geturl()

# Letöltés
f = br.retrieve('kir-dev.sch.bme.hu/eznemletezik.gif')[0]
print f
fh = open(f)
~~~

Arra is képes, hogy proxy-t állítsunk be a böngészőnek!

~~~python
# Proxy és felhasználónév/jelszó
br.set_proxies({"http": "joe:password@myproxy.example.com:3128"})

# Proxy
br.set_proxies({"http": "myproxy.example.com:3128"})
# Proxy jelszó
br.add_proxy_password("joe", "password")
~~~

A mechanize egy nagyon hasznos eszköz tud lenni a megfelelő ember kezében, képes automatizáltan böngészni a weboldalt, magára az oldalra tekinthetünk egy nagy gráfként, ahol az oldalak a csomópontok, és az élek az oldalon található linkek. Innentől az egésznek a bejárása gyerekjáték a már tanult módszerekkel (segítség: [BFS](http://en.wikipedia.org/wiki/Breadth-first_search), [DFS](http://en.wikipedia.org/wiki/Depth-first_search)).

## BeautifulSoup

Képes parse-olni a HTML és XML fájlokat, beleértve az aszimmetrikus tageket is. A segítségével képesek vagyunk feldolgozni a HTML oldalt, keresni benne különböző elemeket (figyelembe véve az attribútumokat is), ezeknek a tartalmát kiszedni, linkeket keresni stb. Érdemes együtt használni a mechanize modullal. Miután a mechanize-zal megnyitottunk egy weboldalt a forrását át kell adjuk a BeautifulSoupnak:

~~~python
response = br.open(url)
html = br.response().read()
soup = BeautifulSoup.BeautifulSoup(html)
~~~

Innentől kereshetünk az oldalon bármire:

~~~python
soup.findAll('td', attrs={"class": "prodSpecAtribute"})

# linkek megkeresése az oldalon
links = soup.findAll("a")

for link in links:
	print link.contents[0], link.get("href")
~~~

Összességében két nagyon jól elkészített modulról van szó, amelyek képesek megkönnyíteni az életünket, ha már ilyen dolgokba kell belevágnunk. Magára a böngészésre a mechanize modult érdemes használni és az egyéb információk kinyerésére pedig a BeautifulSoupot. Böngésszetek programozottan!