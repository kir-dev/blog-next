---
layout: post
author: balo
date: 2014-02-16 22:15:00
title: 'Jelszavak kezelése szkriptekben'
comment: true
---

[Sokszor készítünk](http://xkcd.com/1205/) szkripteket azért, hogy a gyakran végzendő feladatokat automatizáljuk, ezekben néha különféle jelszavak bekérésére is szükség van. Lehetne, hogy egy konstansban elmentjük az érzékeny információt a szkriptben, de ez ugye amellett, hogy nem szép a verziókezelést is nehezíti. Ha a hívott alkalmazás támogatja a jelszófájlokat, akkor érdemes azt használni és a fájlt megfelelően titkosítani.

Ha az alkalmazás vagy erőforrás nem támogatja a jelszófájlokat (pl. jarsigner), akkor valamilyen módon be kell kérni és beadni parancssori paraméterben.

Példa egy konkrét utasításra, amikor a jelszó parancssori paraméterben szerepel:

```sh
$ jarsigner -keystore mystore.ks -storepass MySecretPass awesome.jar mycert
```

A fenti példa azért is nagyon rossz gyakorlat, mert a jelszó könnyen kiszivároghat a bash history-n vagy processzlistázó eszközökön (ps, top) keresztül.

A kulcsot érdemes úgy bekérni, hogy az ne írodjon ki a standard outputra gépeléskor ( _echo_ ), erre mutatok megoldást bash-ben, Pythonban és Rubyban.

**Bash**

Használjuk a bash [read](http://tldp.org/LDP/Bash-Beginners-Guide/html/sect_08_02.html) parancsát a `silent mode` és `prompt` kapcsolókkal.

```sh
#!/bin/bash
read -s -p "Store Password: " storepw
jarsigner -keystore mystore.ks -storepass "$storepw" awesome.jar mycert
```

**Python**

```python
from getpass import getpass
pw = getpass("Password: ")
print "Your password is", len(pw), "characters long"
```

**Ruby**

```ruby
require "io/console"
print "Password: "
pw = STDIN.noecho(&:gets).chomp
print "Your password is #{pw.length} characters long"
```

Kicsit mágikusnak tűnhet, de a 3. sor nem csinál mást, mint [kikapcsolja](http://www.ruby-doc.org/stdlib-2.1.0/libdoc/io/console/rdoc/IO.html#method-i-noecho) az _echo_ funkciót és [beolvas egy sort](http://www.ruby-doc.org/core-2.1.0/IO.html#method-i-gets), aminek a végéről [levágja](http://ruby-doc.org/core-2.1.0/String.html#method-i-chomp) a sorvége karaktert. Csak ezért a funkcióért nem biztos, hogy megéri behúzni, de a _highline gem_ is tudja ezt kicsit [olvashatóbban](https://github.com/JEG2/highline/blob/master/examples/password.rb).

Ha a szkriptünk egy integrált rendszer részeként fut (pl. cron), a linux terminál eszközeivel a fenti megközelítést bash-ban továbbra is használhatjuk. Egyszerűen mentsük el a jelszót egy védett fájlba és irányítsuk a szkriptünkbe.

```sh
$ myscript.sh < mypassw.txt
```

Ez a trükk az előzőekben ismertetett Python és Ruby kódokkal nem működik, de ilyen követelmény esetén találhatunk mindkét környezethez többféle megoldást (Tipp: [Ruby ARGF](http://ruby-doc.org/core-2.1.0/ARGF.html))

**Környezeti változók**

Egy másik lehetőség a jelszavak kezelésére a környezeti változók használata, ezt a megközelítést használják az elterjedt [PaaS](http://en.wikipedia.org/wiki/Platform_as_a_service) felhőkben is ([Heroku](https://devcenter.heroku.com/articles/config-vars), [OpenShift](http://blog.vbalazs.me/2013/12/how-not-to-commit-passwords-to-openshift.html)). A rendszer a jelszavakat és az olyan erőforrásokat, mint az adatbázis connection string, ebben a formában teszi elérhetővé, a kódban elég a változót megadni, így nem szükséges azt külön módosítani a fejlesztői és éles környezetben.

```sh
$ export MY_SECRET=myPassWord
```

**Bash**

```sh
#!/bin/bash
jarsigner -keystore mystore.ks -storepass $MY_SECRET awesome.jar mycert
```

**Python**

```python
import os
pw = os.environ['MY_SECRET']
print "Your password is", len(pw), "characters long"
```

**Ruby**

```ruby
pw = ENV['MY_SECRET']
print "Your password is #{pw.length} characters long"
```

A bash history miatt az `export` még mindig aggályos, ezt áthidalhatjuk úgy, hogy a jelenlegi munkafolyamatban deaktiváljuk a történet mentését az `unset HISTFILE` utasítással vagy egyszerűen elmentjük a változókat egy fájlba és futtatjuk.

```sh
$ cat myvars.sh
#!/bin/bash
export MY_KEY1=mysecret1
export MY_KEY2=mysecret2

$ source myvars.sh
```

_A cikk szakmai felülvizsgálatáért és a javaslatokért köszönet [night[w]](https://korok.sch.bme.hu/profile/show/uid/nightw)-nak!_

Happy scripting!
![](https://imgs.xkcd.com/comics/automation.png)
