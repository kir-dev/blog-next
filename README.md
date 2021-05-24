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

1. Használd a `create-post.sh` shell scriptet (az `author` fieldnél érdemes a PéK-en is használt felhasználóneved megadni):

```bash
./create-post.sh '<title>' '<author>'
```

Példa: `./create-post.sh 'Heroku és társai' 'mypekusername'`

2. Ezután keresd meg a posztod markdown fájlját. Adj egy maximum 2 mondatos ízelítőt a posztról a `lead` field alatt.
3. A `featuredImage` fieldben megadhatsz egy képet, amelyet használnál a blogbejegyzésed previewjában, ezt a képed be is kell illesszed a `content/images` mappába, és a `default.jpg`-t erre tudod lecserélni. Ha nincs szükséged ilyenre, hagyd benn a defaultot.
4. Írd meg a posztot markdownban, jelenleg képeket csak külső forrásból tudsz berakni a posztjaidba (használd pl.: az Imgur-t).
5. érj review-t körtársaidtól egy pull requesten keresztül.

Nézz meg néhány korábbi blogposztot, hogy is tudod kihasználni a markdown adta lehetőségeket: code részletek beszúrása, képek beszúrása. Windows-on a create-post.sh shell scriptet tudod futtatni a Git bash-ben, ha már fel van telepítve a Git kliens.

## Készítenél oldalt egy projektnek?

---

Igazából kövesd a fentieket, amit a posztkészítésnél kell, annyi, hogy a `create-project.sh` szkriptet használd.

```bash
./create-project.sh '<urlpath>' '<title>'
```

- `<urlpath>`: ahol elérhetővé tennéd a projektedet, pl.: `'schpincer'` beírásával `kir-dev.sch.bme.hu/projects/schpincer/` elérési útvonalat kapod. Használd csak a kisbetűs angol karaktereket, esetleg kötő- és underscore jeleket.
- `<title>`: a projekted hivatalos neve, így fog a weboldalon megjelenni, itt már használhatsz szóközt és egyéb karaktereket is. (Később magában a markdown fájlban ezek változtathatóak.)

_Opcionális:_ A markdown fájlban a `github` fieldben megadhatod a projekt GitHub-os repóját a Kir-Dev organisation-ből.

## License

---

The following directories and their contents are Copyright Kir-Dev.
You may not reuse anything therein without Kir-Dev's permission:

- posts/

All other directories and files are MIT Licensed.

[1]: https://github.com/kir-dev/kir-dev.sch.bme.hu/pulls
