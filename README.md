# blog-next

![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=blog-next-kir-dev&style=for-the-badge)

A [kir-dev.sch.bme.hu](https://kir-dev.sch.bme.hu) következő generációs blogja.

## Telepítés

Legyen telepítve [node.js](https://nodejs.org/en/) és [yarn v3](https://yarnpkg.com/getting-started/install) a gépeden. A gatsby-t szükséges globálisan feltelepíteni, ez a `npm i -g gatsby-cli` paranccsal tehető meg.

Ha az előkövetlemények megvannak, akkor

    git clone https://github.com/kir-dev/blog-next.git kirdev-blog
    cd kirdev-blog
    yarn
    yarn start

A böngésződben pedig a `localhost:8000`-en tudod megnézni a blogot. A GraphiQL oldal a `localhost:8000/___graphql` címen lesz elérhető.

A `.env.example` fájlt másold le, és nevezd át `.env.development`-re. Deploymentnél fontos a kiválasztott felhő platformon a környezeti változókat beállítani.

## Készítenél posztot?

1. Használd a `create-post.sh` shell scriptet (az `author` fieldnél érdemes a PéK-en is használt felhasználóneved megadni):

```bash
./create-post.sh '<title>' '<author>'
```

Példa: `./create-post.sh 'Heroku és társai' 'mypekusername'`

2. Ezután keresd meg a posztod markdown fájlját.

- Adj egy roppant rövid, maximum 6-7 szavas, 1 mondatos ízelítőt a posztról a `lead` field alatt (akár ki is hagyható).
- A `featuredImage` fieldben megadhatsz egy képet, amelyet használnál a blogbejegyzésed previewjában, ezt a képed be is kell illesszed a `content/images/posts/` mappába. Ha nincs szükséged ilyenre, hagyd `null`-on.
- A posztodnak lehetnek rövid tag-jei `tags` field alatt, de úgy, hogy értelme is legyen. Lehetőleg maradj max. 3 db rövid tag-nél. Pl.: `tags: ['hírek', 'média']`
  - Ha rövid a poszt, és csak valami frissítést tartalmaz tagokról, jövőnkről, valami indulásáról --> **hírek**
  - Ha egy projektünkről szól --> **projekt**
  - Ha valami technológiairól --> **tech**, **web** stb.
  - Ha a körről közösségéről szól --> **közösség**
  - És így tovább (természetesen szabad kezed van ezekben).
- Írd meg a posztot markdownban, **FONTOS:** képeket posztjaidba a [warp drive](https://warp.sch.bme.hu/)-on keresztül tegyél be. Jelentkezz be, készíts egy albumot, tedd be a képeket, és használd a 'copy to clipboard' gombot. Ha google képkeresőben vagy egy másik weboldalon találtál képet és azt illesztenéd be, először töltsd le a gépedre a kívánt képet, töltsd fel a warpra, majd onnan addresseld a képet. Így sosem vesznek el a képek, még ha a weboldal, ahonnan kölcsönveszed, megszüntetné a kép osztását.
- Ha a posztnak saját og:image-et akarsz adni, azt is tedd a `content/images/posts/` mappába, majd adj hozzá egy `ogImage` fieldet a `featuredImage` alatt. Ha nem adsz meg, akkor a featuredImage lesz az og:image-e a posztnak. (ha egy kicsit lusta vagy og:image-et szerkeszteni, ajánlom a [Vercel og-image generatorát](https://github.com/vercel/og-image))

3. Kérj review-t körtársaidtól egy pull requesten keresztül.

Nézz meg néhány korábbi blogposztot, hogy is tudod kihasználni a markdown adta lehetőségeket: code részletek beszúrása, képek beszúrása. Windows-on a create-post.sh shell scriptet tudod futtatni a Git bash-ben, ha már fel van telepítve a Git kliens.

Mi az indoka, hogy a `lead` rövid kell legyen, valamint a `tags` száma ne haladja meg a 3-at? Az olvasók szemét ritkán fogja meg egy-egy hosszabb szó, inkább a rövid hívószavaknak örülnek.

## Készítenél oldalt egy projektnek?

Igazából kövesd a fentieket, amit a posztkészítésnél kell, annyi, hogy a `create-project.sh` szkriptet használd.

```bash
./create-project.sh '<urlpath>' '<title>'
```

- `<urlpath>`: ahol elérhetővé tennéd a projektedet, pl.: `'schpincer'` beírásával `kir-dev.sch.bme.hu/projects/schpincer/` elérési útvonalat kapod. Használd csak a kisbetűs angol karaktereket, esetleg kötő- és underscore jeleket.
- `<title>`: a projekted hivatalos neve, így fog a weboldalon megjelenni, itt már használhatsz szóközt és egyéb karaktereket is. (Később magában a markdown fájlban ezek változtathatóak.)

Szerkesztéskor a projekt markdown fájljában:

- A `github` fieldben megadhatod a projekt GitHub-os repóját a Kir-Dev organisation-ből.
- A `status` fieldben megadhatod a projekt jelenlegi állását, illetve hogy milyen színű pötty jelenjen meg a felirat mellett a project previewban. Pl.: `status: { label: 'Aktív', color: 'green' }` esetén az Aktív felirat mellett zöld pötty fog megjelenni, mindig az utolsó szó adja meg a színt.
  - Használhatóak ilyen feliratok, mint `{label: 'Tervezés alatt', color: 'green'}`, `{label: 'Fejlesztés alatt', color: 'green'}`, `{label: 'Üzemel', color: 'green'}`, `{label: 'Megszakadt', color: 'red'}`, `{label: 'Áll', color: 'orange'}` de lehetőleg maradjunk értelmes feliratoknál és színeknél a konzisztencia érdekében (aktív fázisokban inkább a zöld színt használjuk, a szöveg lehet akármi, inaktívaknál a vörös és narancssárga ajánlott).
  - Extra: `Archivált` label megadása esetén hold ikon jelenik meg a státusz feliratban, `Kész` vagy `Üzemel` esetén egy pipa, `Áll` vagy `Megszakadt` esetén pedig egy felkiáltójeles kör alakú ikon.
- A `techs` fieldben megadhatod vesszővel elválasztva egy tömbben a projekt főbb techjeit (lehetőleg maradj max 3-nál). Pl.: `techs: ['TypeScript', 'Node.js']`
- A `website` field akár elhagyható, ha nincs tipikus kir-deves oldala a projektnek.
- **FONTOS:** képeket projektleírásba a [warp drive](https://warp.sch.bme.hu/)-on keresztül tegyél be. Jelentkezz be, készíts egy albumot, tedd be a képeket, és jobb egér a képnézegetőben, majd Copy Image address.

## Hozzáadnál új tagot a csapathoz?

Az `src/content/members/active.yaml` fájlt kell kiegészíteni egy új tömbelemmel.

**FONTOS:** A képet, amit magadhoz rendelnél, Warp-on a https://warp.sch.bme.hu/albums/12 albumba töltsd fel és onnan linkeld (a vicces mehet https://warp.sch.bme.hu/albums/13 albumba).

## Tanfolyamok

Érdemes lehet átírni a már meglévő kurzus entitásokat a `content/courses` könyvtárban.

Szerkeszteni tudod a hozzárendelt tulajdonságokat a létrejött markdown fájlban:

- `title`: Cím
- `lecturer`: Előadó neve
- `sessions`: Egy tömb, amelyben objektumonként megadod az egyes alkalmak időpontját és helyét.
  - Fun fact: TanulóSCH-n új feature a tanulószobától független események rendezése, így akár belinkelhetsz egy TanulóSCH eseményt is.
- `active`: jelenleg aktív-e a tanfolyam, ha false, nem jelenik meg a tanfolyam oldalon sem
- A leírást pedig írd meg a markdown fájl további részében.

## License

- Front page header background image by Chris Reid on Unsplash: https://unsplash.com/photos/LfG7RwMM6g8
- Terminal component (with little customization) by [vercel/hyper-site](https://github.com/vercel/hyper-site) (MIT license)
- Default post featured image by Clément Hélardot on Unsplash: https://unsplash.com/photos/95YRwf6CNw8
- Background svgs clipped together from [undraw.co](https://undraw.co/) images by Katerina Limpitsouni

The following directories and their contents are Copyright Kir-Dev.
You may not reuse anything therein without Kir-Dev's permission:

- posts/

All other directories and files are MIT Licensed.

[1]: https://github.com/kir-dev/kir-dev.sch.bme.hu/pulls

## Sponsors

<a href="https://vercel.com?utm_source=kir-dev&utm_campaign=oss"><img src="static/svg/powered-by-vercel.svg" height="46" /></a>
