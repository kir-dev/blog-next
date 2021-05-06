# blog-next

A [kir-dev.sch.bme.hu](https://kir-dev.sch.bme.hu) következő generációs blogja.

A projekt jelenleg fejlesztési szakaszban van, az aktuális állapot [Netlify-on](https://quizzical-mestorf-416189.netlify.com/) tekinthető meg.

## Telepítés

---

Legyen telepítve [node.js](https://nodejs.org/en/) és [yarn](https://yarnpkg.com/lang/en/docs/install) a gépeden. A gatsby-t szükséges globálisan feltelepíteni, ez a `yarn global add gatsby-cli` paranccsal tehető meg.

Ha az előkövetlemények megvannak, akkor

    git clone https://github.com/kir-dev/blog-next.git kirdev-blog
    cd kirdev-blog
    yarn
    yarn start

A böngésződben pedig a `localhost:8000`-en tudod megnézni a blogot. A GraphiQL oldal a `localhost:8000/___graphql` címen lesz elérhető.

## Készítenél posztot?

---

Használd a `create-post.sh` shell scriptet:

```bash
./create-post.sh '<title>' '<author>'
```

Ezután keresd meg a posztod markdown fájlját. Adj egy maximum 2 mondatos ízelítőt a posztról a `lead` field alatt. Írd meg a posztot markdownban, majd kérj review-t körtársaidtól egy pull requesten keresztül.

Nézz meg néhány korábbi blogposztot, hogy is tudod kihasználni a markdown adta lehetőségeket: code részletek beszúrása, képek beszúrása.

## License

---

The following directories and their contents are Copyright Kir-Dev.
You may not reuse anything therein without Kir-Dev's permission:

- posts/

All other directories and files are MIT Licensed.

[1]: https://github.com/kir-dev/kir-dev.sch.bme.hu/pulls
