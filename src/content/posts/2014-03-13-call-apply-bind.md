---
layout: post
author: tmichel
date: 2014-03-13 21:30:00
title: 'Function.prototype.call, apply és bind'
comment: true
---

A [web alapozó tanfolyamunk](http://kir-dev.github.io/tanfolyam/) JavaScript alapozó előadásán belefutottunk két olyan témába, amelyek bőven túlmutatnak egy bevezető keretein. Sőt, egy átlag weboldal fejlesztésénél sem igazán futunk bele ezekbe a dolgokba.

Ebben a bejegyzésben a `Function.prototype` `call`, `apply` és `bind` metódusairól fogok picit részletesebben írni. A minisorozat második részében pedig a `new` operátor rejtélyeibe fogunk belemászni.

## Metódusok

Érdemes egy pillanatra elidőzni a metódusokon. Minden nap használjuk őket, de fel sem merül bennünk, hogy valami különleges dologról lenne szó. Szerencsére nincs is, csupán az objektum-orientált programozással együtt a függvény fogalma is átalakult némileg.

Míg a függvény egy olyan képződmény, ami a külvilággal mit sem törődve végzi dolgát, addig a metódusnak (vagy más néven tagfüggvénynek) mindig van kontextusa. A metódus önmagában nem értelmezhető, mindig van egy fogadó objektuma. Ezt a fogadó objektumot sok programozási nyelven a `this` kulcsszóval érhetjük el. Ez adja kontextust, ahol elérhető az objektum belső állapota.

## Metódusok JavaScriptben

JavaScriptes világban a `function` kulcsszó szolgál a függvények definiálására. Ez kicsit csalóka, mert a függvények lehetnek metódusok is. Sőt, ha nagyon ragaszkodom az előbbiekben leírt definícióhoz, akkor minden függvény egyben metódus is, mert JavaScriptben minden függvényben elérhető a `this` kulcsszó.

Az már egy sokkal érdekesebb kérdés, hogy egy adott pillanatban a `this` mire is mutat. Általánosságban elmondható, hogy arra mutat, amire számítanánk, de néha érhetnek meglepetések.

A klasszikus esetben tényleg a fogadó objektumra mutat.

```javascript
var obj = {
  myMethod: function() {
    console.log(this)
  }
}

obj.myMethod() // => Object {myMethod: function}
```

Itt egyértelmű, hogy az `obj` változóban tárolt objektumra mutat a `this`, végülis a `myMethod` az `obj` metódusa.

A másik sokat használt eset, amikor a nagyvilágban van egy függvényem és azt hívom meg.

```javascript
var f = function() {
  console.log(this)
}

f() // => Window {...}
```

Ebben az esetben nincs explicit fogadó objektum. Viszont a `window` ott ül mindennek a tetején és a legvégén nála futnak össze a dolgok.

Ebből látszik, hogy amennyiben van explicit fogadó objektum, akkor a `this` arra állítódik be, ha nincs, akkor pedig a `window`-ra. Látni fogjuk, hogy akkor is ez a helyzet, ha a `this` értékének `null`-t vagy `undefined`-ot állítunk be.

## Függvényhívás kicsit másképp

Az alap koncepciót lehet kicsit bonyolítani. Gondoljunk csak a következő esetre:

```javascript
var obj = {
  method: function(f) {
    f()
  },
  otherMethod: function() {
    var f = function() {
      console.log(this)
    }

    f()
  }
}

obj.method(function() {
  console.log(this)
}) // => Window {...}
obj.otherMethod() // => Window {...}

var otherObj = {
  f: function() {
    console.log(this)
  }
}

obj.method(otherObj.f) // => Window {...}
```

A fenti példa nagyon sarkított, és itt valójában mindegy, hogy mi a `this` értéke. Viszont ha már egy callbackről beszélünk, akkor jó lenne, ha a `this` értéke a helyén lenne.

Erre nyújt megoldást a `call` és az `apply`. Ugyanaz a feladatuk, csak a szignatúrájuk más. Mindkét metódussal a `this` értékét lehet beállítani egy-egy függvényhívás esetén.

```javascript
var f = function(a, b) {
  console.log(this, a, b)
}

f.call({ theAnswer: 42 }, 'hello', 'world')
// => Object {theAnswer: 42} "hello" "world"

f.call(null, 'hello', 'world')
// => Window {...} "hello" "world"

f.call(undefined, 'hello', 'world')
// => Window {...} "hello" "world"

f.apply({ theAswer: 42 }, ['hello', 'world'])
// => Object {theAnswer: 42} "hello" "world"
```

A különbség csak annyi, hogy a `call`-nak felsorolásszerűen kell átadni a paramétereket, míg az `apply`-nak tömbként.

## bind

A `bind` is ugyanazt a célt szolgálja, mint az előző két metódus: előre meghatározhatjuk a `this` értékét. Az előnye, hogy nem csak egyetlen függvényhívásra szól. A használata egészen egyszerű:

```javascript
var boundF = f.bind('foo')
boundF('hello', 'world')
// => String {0: "f", 1: "o", 2: "o", length: 3} "hello" "world"
```

## A bind szimulálása

A `bind` nem alkalmaz fekete mágiát a háttérben. Nagyjából a következő kódrészlettel lehetne is szimulálni:

```javascript
var bind2 = function(f, context) {
  return function() {
    f.apply(context, arguments)
  }
}
```

(Az `arguments` nem a semmiből terem elő: [minden függvényben elérhető.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#Using_the_arguments_object))

## Összegzés

A `call`, `apply` és `bind` tehát a `this` értékének a manipulálására szolgál. Érdemes ezeket észben tartani, mert egy nagyobb alkalmazás esetén már igencsak jó szolgálatot tehetnek.

A következő részben a `new` operátor szépségeiben merülünk el.
