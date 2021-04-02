---
layout: post
author: tmichel
date: 2014-03-28 10:25:00
title: 'JavaScript new operátor'
comment: true
category: javascript
---

Múltkor elkezdtem egy mini-sorozatot azokról a témákról, amik nem fértek bele a web alapozó tanfolyamunkba. Az [első bejegyzésben]({% post_url 2014-03-13-call-apply-bind %}) a `Function.prototype.call` és társai kerültek elő. Most erre építkezve elmélyedünk a `new` operátor szépségeiben.

## A new feladata

A `new` operátor egy előre definiált típust példányosít. Ez persze így nem igaz, mert JavaScriptben nem lehet új típust létrehozni. Valójában a `new` operátor által létrehozott új objektum `Object` típusú lesz, de egy `constructor function` hozza létre, így lényegében egy olyan objektumot kapunk, amit előre felparamétereztünk.

```js
var Person = function(name) {
  this.name = name
}

Person.prototype.greet = function() {
  return 'Hi, my name is ' + this.name + '!'
}

var p = new Person('tmichel')

console.log(p.name) // => tmichel
console.log(p.greet()) // => Hi, my name is tmichel!
```

Láthatjuk, hogy a létrehozott objektum úgy viselkedik, mintha `Person` típusú lenne, miközben tudjuk, hogy a valós típusa `Object`. Ez annak köszönhető, hogy az újonnan létrehozott objektum megörökölte a `Person` prototípusát.

A `new` operátor nagyjából a következő lépésekben hozza létre az új objektumot:

1. Létrehoz egy új objektumot.
2. Beállítja a konstruktor függvény (publikus) prototípusát az új objektum (privát) prototípusaként.
3. Meghívja a konstruktor függvényt, `this`-ként az újonnan létrehozott objektumot használja.
4. Visszatér az új objektummal, vagy a konstruktor függvény visszatérési értékével.

A 2. pont az igazán kritikus. JavaScriptben prototípusokkal lehet imitálni a legtöbb OO koncepciót, bár kérdéses, hogy kell-e. Egy objektum prototípusát csak létrehozási időben lehet beállítani (a szabvány szerint). Tehát csak a `new` operátor és az `Object.create` függvény segítségével. Újabb böngészőkben elérhető a `__proto__` tulajdonság az összes objektumon. Ez tartalmazza a prototípust és ezen keresztül meg is lehet változtatni egy azt. Mondanom sem kell, hogy ez igen veszélyes lehet és nem nem várt következményekkel járhat. Ezen túl a `__proto__` nem szabványos, így nincs garancia rá, hogy melyik böngésző támogatja és melyik nem.

## Írjunk saját new operátort!

Nem kell más tennünk, mint a fenti 4 pontot végrehajtani.

```js
function mynew(ctor) {
  // létrehozunk egy új objektumot és beállítjuk a prototípusát (1. és 2. pont)
  var $this = Object.create(ctor.prototype),
    args = Array.prototype.slice.call(arguments, 1)

  // meghívjuk a konstruktor függvényt és visszatérünk a függvény visszatérési
  // értékével, vagy ha undefined, akkor magával az új objektummal.
  return ctor.apply($this, args) || $this
}
```

A fentebb definiált `Person`-t a következő kódrészlettel lehet példányosítani az új `new` operátorunkkal:

```js
var me = mynew(Person, 'tmichel')

console.log(p.name) // => tmichel
console.log(me.greet()) // => Hi, my name is tmichel!
```

Látható, hogy ugyanazt az eredményt kaptuk, mintha a beépített nyelvi elemet használtuk volna.

Ebből a rövid kis bejegyzésből is kiderül, hogy a JavaScript többet tartogat, mint amit elsőre gondolnánk. Érdemes elmerülni a nyelv részleteiben és picit elmélyedni a JavaScript VM-ek lelki világában. A sorozat következő részében a prototípusokat vizsgáljuk meg közelebbről. Kövessetek minket!
