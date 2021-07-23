---
layout: project
title: 'Ftsrg Blog'
lead: 'Ftsrg kutatócsoport statikusan generált portfolió weboldala'
github: https://github.com/kir-dev/ftsrg-next
website: https://ftsrg-kir-dev.netlify.app
status: { label: 'Aktív', color: 'green' }
techs: ['React', 'Gatsby', 'I18next']
featuredImage: ../images/projects/ftsrg-next.png
---

# A kezdetek

A projektet nem mi alapítottuk, egyetemünk kutatócsoportja, a MIT tanszékhez tartozó Ftsrg néven ismert **Kritikus Rendszerek Kutatócsoport** kezdte el saját weboldalukat összerakni egy **Colorlib** scss sablonnal, amely a **Bootstrap** frontend frameworköt használja. 2021 tavaszán viszont hozzánk fordultak igényükkel, méghozzá a következőkkel:

> Első körben az alábbi fejlesztésekre lenne szükségünk:
>
> - angol nyelvű változat elkészítése (a teljes struktúra duplikálása nélkül),
> - a designhoz illeszkedő sablon kialakítasa további aloldalaknak (pl. projektek, tantárgyak),
> - apróbb hibák javítása

# A Kir-Dev kezeiben

Tettünk a statikus oldalak köré egy **Gatsby** keretrendszert, valamint hozzácsaptunk egy **i18next** package-et, hogy több nyelven is elérhető lehessen a weboldal. (Ezt _internationalization_-nek is nevezik, röviden _i18n_, magyarul _nemzetköziesítésként_ lehet fordítani.)

[Netlify-ra deployoltuk](https://ftsrg-kir-dev.netlify.app) a website-ot a fejlesztés során, hogy lehessen betekintést nyerni akármikor. A kutatócsoport weboldala az [ftsrg.mit.bme.hu](https://ftsrg.mit.bme.hu/) oldalon érhető el.

Az átadás után nálunk is itt marad a projekt annak érdekében, hogy ha újabb kérést intézne felénk a kutatócsoport - amit szívesen fogadunk -, akkor mi is kényelmesen tudjunk továbbdolgozni a repón.
