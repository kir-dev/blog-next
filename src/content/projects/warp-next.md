---
layout: project
title: Warp drive
lead: Egyszerű fájlhosztoláshoz használt alkalmazás
github: https://github.com/kir-dev/warp-next
website: https://warp.sch.bme.hu/
status:
  label: Aktív
  color: green
techs:
  - Rails
  - Active Storage
  - Bulma
featuredImage: ../images/projects/warp-next.png
---

# Projekt eredete

Volt már korábban a körnek saját image hosztingra használt Go-ban írt webappja Warp drive néven, azonban ez idővel kiesett a használatból. Eredendően azon célból indult a régebbi projekt is, hogy a képeket könnyedén töltsük fel valahova és tartsuk meg minél hosszabb ideig, illetve például ha a blogunkba szeretnénk őket beilleszteni. Most viszont újra elővettük az ötletet - innen a Warp Next név -, és Rails-es alapokon egy nagyon egyszerű appot írtunk, amelyet azóta is aktívan és kényelmesen használhatunk.

## 2022

2021 végén pedig a LEGO kör keresett meg minket, hogy ők is szívesen használatba vennék az appunkat, így most azon dolgozunk, hogy a webszervergépünkön szépen működjön egy automatizált adatmentési cron job, valamint kiszélesítjük még néhány funkcióval az appot, hogy minél kényelmesebb legyen a használata.

Folytatólagosan még be fog kerülni egy olyan változtatás, hogy a linkek rövidebbek legyenek, valamint a cél még, hogy a feltöltések max méretkorlátja beállítható lehessen körönként.

Majd ha jónak látjuk, akár a frontend is átdolgozásra kerül, ugyanis a Bulma CSS library nem ad elég lehetőséget számunkra, hogy robosztus/hibamentes UI-t biztosítsunk a felhasználók számára.
