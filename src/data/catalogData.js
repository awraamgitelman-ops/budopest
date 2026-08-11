export const MEGA_MENU_DATA = [
  {
    id: "grunty",
    name: "Ґрунти",
    link: "#catalog-grunty",
    items: [
      { name: "Родючий ґрунт (чорнозем)", price: "від 350 грн/т" },
      { name: "Почвоґрунт рослинний", price: "від 320 грн/т" },
      { name: "Торф верховий і низинний", price: "від 480 грн/т" },
      { name: "Торфо-піщана суміш", price: "від 420 грн/т" },
      { name: "Чорнозем польовий чистий", price: "від 380 грн/т" },
      { name: "Планувальний ґрунт (суглинок)", price: "від 180 грн/т" },
      { name: "Ґрунт для газону", price: "від 340 грн/т" },
      { name: "Ґрунт у Біг-бегах (1 т)", price: "від 750 грн/т" },
      { name: "Ґрунт для теплиць і саду", price: "від 400 грн/т" },
      { name: "Котлованний ґрунт на підсипку", price: "від 120 грн/т" }
    ]
  },
  {
    id: "sheben",
    name: "Щебінь",
    link: "#catalog",
    featured: true,
    items: [
      { name: "Гранітний щебінь", price: "від 380 грн/т", active: true },
      { name: "Гравійний щебінь", price: "від 360 грн/т", active: true },
      { name: "Шлаковий щебінь (Дніпро)", price: "від 240 грн/т", active: true },
      { name: "Вапняковий щебінь", price: "від 320 грн/т" },
      { name: "Бутовий камінь (бут)", price: "від 450 грн/т" },
      { name: "Вторинний щебінь (дробл. бетон)", price: "від 190 грн/т" },
      { name: "Гранітний відсів (0-5 мм)", price: "від 220 грн/т" },
      { name: "Габро-діабаз", price: "від 480 грн/т" },
      { name: "Митий щебінь", price: "від 420 грн/т" },
      { name: "Для габіонів", price: "від 520 грн/т" },
      { name: "Щебінь у Біг-бегах (1 т)", price: "від 650 грн/т" },
      { name: "Щебінь по фракціях", price: "від 350 грн/т" },
      { name: "Мраморний щебінь", price: "від 1 200 грн/т" }
    ]
  },
  {
    id: "pesok",
    name: "Пісок",
    link: "#catalog-pesok",
    items: [
      { name: "Річковий пісок (Дніпро, митий)", price: "від 280 грн/т" },
      { name: "Кар'єрний пісок (яружний)", price: "від 220 грн/т" },
      { name: "Сеяний пісок", price: "від 260 грн/т" },
      { name: "Піскоґрунт на підсипку", price: "від 160 грн/т" },
      { name: "Пісок у мішках по 50 кг", price: "від 65 грн/мішок" }
    ]
  },
  {
    id: "shps",
    name: "ЩПС (Щебенево-піщана суміш)",
    link: "#catalog-shps",
    items: [
      { name: "ЩПС С5 (0-40 мм)", price: "від 340 грн/т" },
      { name: "ЩПС С7 (0-20 мм)", price: "від 350 грн/т" },
      { name: "ЩПС С4 (0-70 мм)", price: "від 330 грн/т" }
    ]
  },
  {
    id: "pgs",
    name: "ПГС / ОПГС",
    link: "#catalog-pgs",
    items: [
      { name: "ПГС природна", price: "від 290 грн/т" },
      { name: "ОПГС збагачена", price: "від 360 грн/т" }
    ]
  },
  {
    id: "keramzit",
    name: "Керамзит",
    link: "#catalog-keramzit",
    items: [
      { name: "Керамзит фракція 5-10 мм", price: "від 1 650 грн/м3" },
      { name: "Керамзит фракція 10-20 мм", price: "від 1 550 грн/м3" },
      { name: "Керамзит фракція 20-40 мм", price: "від 1 450 грн/м3" },
      { name: "Керамзит у мішках", price: "від 95 грн/мішок" }
    ]
  },
  {
    id: "galka",
    name: "Галька та камінь",
    link: "#catalog-galka",
    items: [
      { name: "Річкова галька (Дніпровська)", price: "від 550 грн/т" },
      { name: "Морська галька", price: "від 850 грн/т" },
      { name: "Декоративний камінь", price: "від 700 грн/т" }
    ]
  },
  {
    id: "reagents",
    name: "Протиожеледні матеріали",
    link: "#catalog-reagents",
    items: [
      { name: "Сіль технічна для доріг", price: "від 3 800 грн/т" },
      { name: "Піщано-сольова суміш (ПСС)", price: "від 1 200 грн/т" },
      { name: "Гранітна крихта (відсів 2-5 мм)", price: "від 650 грн/т" },
      { name: "Хлористий кальцій / Бішофіт", price: "від 12 000 грн/т" }
    ]
  },
  {
    id: "coal",
    name: "Кам'яне вугілля",
    link: "#catalog-coal",
    items: [
      { name: "Вугілля сортове ДПК", price: "від 5 800 грн/т" },
      { name: "Антрацит (АК, АО, АС)", price: "від 8 900 грн/т" },
      { name: "Паливні брикети", price: "від 4 500 грн/т" }
    ]
  }
];

export const SHCHEDEN_PRODUCTS = [
  {
    id: "granitnyj",
    category: "granitnyj",
    name: "Гранітний щебінь",
    price: 380,
    priceUnit: "грн/т",
    priceM3: 530,
    fractions: ["0-5 мм (відсів)", "2-5 мм", "5-10 мм", "5-20 мм", "20-40 мм", "40-70 мм"],
    strength: "М1200 - М1400",
    frost: "F300 - F400",
    flakiness: "до 10% (1 група кубоподібна)",
    density: "1.40 т/м3",
    image: "/images/granitnyj.jpg",
    popular: true,
    description: "Видобувається у гранітних кар'єрах Дніпропетровщини. Найміцніший будівельний щебінь для моноліту, високомарочного бетону, мостів та автодоріг вищих категорій."
  },
  {
    id: "gravijnyj",
    category: "gravijnyj",
    name: "Гравійний щебінь",
    price: 360,
    priceUnit: "грн/т",
    priceM3: 490,
    fractions: ["3-10 мм", "5-20 мм", "20-40 мм", "40-70 мм"],
    strength: "М800 - М1000",
    frost: "F150 - F200",
    flakiness: "до 15% (1-2 група)",
    density: "1.36 т/м3",
    image: "/images/gravijnyj.jpg",
    popular: true,
    description: "Універсальний природний камінь із низьким радіаційним фоном. Ідеальний для приватного будівництва, фундаментів, стяжок та бетонів М150–М300."
  },
  {
    id: "shlakovyj",
    category: "promyshlennyj",
    name: "Шлаковий щебінь (відвальний)",
    price: 240,
    priceUnit: "грн/т",
    priceM3: 320,
    fractions: ["0-20 мм", "20-40 мм", "40-70 мм", "70-120 мм"],
    strength: "М800 - М1000",
    frost: "F100",
    flakiness: "до 15%",
    density: "1.35 т/м3",
    image: "/images/shlakovyj.jpg",
    popular: true,
    description: "Оптимальне бюджетне рішення для Дніпра та області. Дроблені доменні та сталеплавильні шлаки з високим зчепленням для подушок доріг та промислових підлог."
  },
  {
    id: "izvestnyakovyj",
    category: "izvestnyakovyj",
    name: "Вапняковий щебінь",
    price: 320,
    priceUnit: "грн/т",
    priceM3: 410,
    fractions: ["5-20 мм", "20-40 мм", "40-70 мм"],
    strength: "М600 - М800",
    frost: "F100 - F150",
    flakiness: "10-15%",
    density: "1.28 т/м3",
    image: "/images/izvestnyakovyj.jpg",
    popular: false,
    description: "Екологічно чистий кальцитовий камінь. Використовується для благоустрою, дренажних систем, дорожнього покриття 2-3 категорії та виробництва вапна."
  },
  {
    id: "butovyj",
    category: "kamen",
    name: "Бутовий камінь (бут)",
    price: 450,
    priceUnit: "грн/т",
    priceM3: 675,
    fractions: ["70-150 мм", "100-300 мм", "150-400 мм"],
    strength: "М1000 - М1200",
    frost: "F200 - F300",
    flakiness: "масивний",
    density: "1.50 т/м3",
    image: "/images/butovyj.jpg",
    popular: true,
    description: "Гранітний бут для спорудження підпірних стін, парканів, фундаментів під важкі конструкції, укріплення берегів річки Дніпро та ландшафту."
  },
  {
    id: "vtorichnyj",
    category: "vtorichnyj",
    name: "Вторинний щебінь (дробл. бетон)",
    price: 190,
    priceUnit: "грн/т",
    priceM3: 240,
    fractions: ["0-40 мм", "20-40 мм", "40-70 мм"],
    strength: "М400 - М600",
    frost: "F50 - F100",
    flakiness: "до 20%",
    density: "1.25 т/м3",
    image: "/images/vtorichnyj.jpg",
    popular: true,
    description: "Дроблений та очищений від арматури бетонний щебінь. Найдешевший варіант для тимчасових під'їзних шляхів, засипки ям та відсипки стоянок."
  },
  {
    id: "otsev",
    category: "otsev",
    name: "Гранітний відсів (0-5 мм)",
    price: 220,
    priceUnit: "грн/т",
    priceM3: 310,
    fractions: ["0-5 мм (сірий, червоний)"],
    strength: "М1200 - М1400",
    frost: "F300",
    flakiness: "до 10%",
    density: "1.42 т/м3",
    image: "/images/otsev.jpg",
    popular: true,
    description: "Найдрібніша фракція гранітного дроблення для виробництва тротуарної плитки, європарканів, укладання бруківки та посипки доріжок узимку."
  },
  {
    id: "gabbro-diabaz",
    category: "granitnyj",
    name: "Габро-діабаз",
    price: 480,
    priceUnit: "грн/т",
    priceM3: 690,
    fractions: ["5-20 мм", "20-40 мм"],
    strength: "М1400 - М1600",
    frost: "F400",
    flakiness: "до 7%",
    density: "1.45 т/м3",
    image: "/images/gabbro-diabaz.jpg",
    popular: false,
    description: "Надміцна темна вулканічна порода з найвищою зносостійкістю, застосовується для асфальтобетону вищої категорії та бань."
  },
  {
    id: "mytyj",
    category: "gravijnyj",
    name: "Митий щебінь",
    price: 420,
    priceUnit: "грн/т",
    priceM3: 580,
    fractions: ["5-20 мм", "20-40 мм"],
    strength: "М1000",
    frost: "F200",
    flakiness: "до 10%",
    density: "1.37 т/м3",
    image: "/images/mytyj.jpg",
    popular: false,
    description: "Повністю очищений від глини та пилоподібних часток матеріал для відповідальних бетонних розчинів та дренажу."
  },
  {
    id: "gabiony",
    category: "kamen",
    name: "Щебінь для габіонів",
    price: 520,
    priceUnit: "грн/т",
    priceM3: 750,
    fractions: ["70-150 мм", "100-250 мм"],
    strength: "М1200",
    frost: "F300",
    flakiness: "колотий / окатаний",
    density: "1.45 т/м3",
    image: "/images/gabiony.jpg",
    popular: false,
    description: "Відбірний гранітний камінь для заповнення сітчастих габіонних конструкцій, терас та берегоукріплення річок Дніпро та Самара."
  },
  {
    id: "bigbeg",
    category: "fasovka",
    name: "Щебінь у Біг-бегах (1 т)",
    price: 650,
    priceUnit: "грн/т",
    priceM3: 880,
    fractions: ["5-20 мм", "20-40 мм", "0-5 мм"],
    strength: "За ДСТУ",
    frost: "F200 - F300",
    flakiness: "у МКР з ручками",
    density: "1.0 т/мішок",
    image: "/images/bigbeg.jpg",
    popular: true,
    description: "Зручне фасування у м'які контейнери по 1000 кг для об'єктів з обмеженим заїздом, маніпуляторного або кранового розвантаження."
  },
  {
    id: "mramornyj",
    category: "dekor",
    name: "Мармуровий щебінь (крихта)",
    price: 1200,
    priceUnit: "грн/т",
    priceM3: 1600,
    fractions: ["5-10 мм", "10-20 мм"],
    strength: "М600",
    frost: "F100",
    flakiness: "декоративний білий",
    density: "1.30 т/м3",
    image: "/images/mramornyj.jpg",
    popular: false,
    description: "Білосніжний мармуровий камінь для ландшафтного дизайну, клумб, пам'ятників, мозаїчних підлог і декору."
  }
];

export const PRICE_TABLES_DATA = {
  granitnyj: {
    title: "Ціни на категорію: Гранітний щебінь",
    badge: "ДСТУ Б В.2.7-75-98",
    items: [
      { name: "Гранітний відсів 0-5 мм (сірий)", priceM3: 310, priceTon: 220, strength: "М1200-1400", frost: "F300" },
      { name: "Щебінь гранітний 2-5 мм", priceM3: 450, priceTon: 320, strength: "М1200-1400", frost: "F300" },
      { name: "Щебінь гранітний 5-10 мм", priceM3: 560, priceTon: 400, strength: "М1200-1400", frost: "F300" },
      { name: "Щебінь гранітний 5-20 мм (ДСТУ)", priceM3: 530, priceTon: 380, strength: "М1200-1400", frost: "F400" },
      { name: "Щебінь гранітний 20-40 мм", priceM3: 520, priceTon: 370, strength: "М1200-1400", frost: "F300" },
      { name: "Щебінь гранітний 40-70 мм", priceM3: 510, priceTon: 360, strength: "М1200-1400", frost: "F300" },
      { name: "Бутовий камінь 70-150 мм (бут)", priceM3: 675, priceTon: 450, strength: "М1200", frost: "F300" }
    ]
  },
  shlakovyj: {
    title: "Ціни на категорію: Шлаковий щебінь (Дніпро)",
    badge: "ТУ / ДСТУ",
    items: [
      { name: "Шлаковий щебінь 0-20 мм", priceM3: 300, priceTon: 220, strength: "М800", frost: "F100" },
      { name: "Шлаковий щебінь 20-40 мм", priceM3: 320, priceTon: 240, strength: "М800-1000", frost: "F100" },
      { name: "Шлаковий щебінь 40-70 мм", priceM3: 320, priceTon: 240, strength: "М800-1000", frost: "F100" },
      { name: "Шлаковий щебінь 70-120 мм (великий)", priceM3: 340, priceTon: 250, strength: "М800-1000", frost: "F100" }
    ]
  },
  gravijnyj: {
    title: "Ціни на категорію: Гравійний щебінь",
    badge: "ДСТУ Б В.2.7-75-98",
    items: [
      { name: "Щебінь гравійний 3-10 мм", priceM3: 450, priceTon: 330, strength: "М800-1000", frost: "F150" },
      { name: "Щебінь гравійний 5-20 мм", priceM3: 490, priceTon: 360, strength: "М1000", frost: "F200" },
      { name: "Щебінь гравійний 20-40 мм", priceM3: 480, priceTon: 350, strength: "М1000", frost: "F200" },
      { name: "Щебінь гравійний 40-70 мм", priceM3: 470, priceTon: 340, strength: "М1000", frost: "F150" }
    ]
  },
  vtorichnyj: {
    title: "Ціни на категорію: Вторинний щебінь",
    badge: "ТУ Будівельний",
    items: [
      { name: "Вторинний бетонний щебінь 0-40 мм", priceM3: 220, priceTon: 180, strength: "М300-400", frost: "F50" },
      { name: "Вторинний бетонний щебінь 20-40 мм", priceM3: 240, priceTon: 190, strength: "М400-600", frost: "F50" },
      { name: "Вторинний бетонний щебінь 40-70 мм", priceM3: 240, priceTon: 190, strength: "М400-600", frost: "F50" },
      { name: "Асфальтна крихта (з-під фрези)", priceM3: 350, priceTon: 280, strength: "Битумна", frost: "F100" }
    ]
  }
};

export const WAREHOUSES = [
  {
    id: 1,
    name: "Головна перевалка «Лівий берег»",
    address: "м. Дніпро, вул. Журналістів, 9 (Індустріальний р-н)",
    zone: "Лівий берег / Слобожанський пр-т",
    hours: "24/7 цілодобово",
    volume: "Запас понад 45 000 т",
    tracks: "Власна залізнична гілка",
    scales: "Електронні автоваги 80 т",
    phone: "+380 (67) 686-31-86"
  },
  {
    id: 2,
    name: "Любимівський гранітний кар'єр",
    address: "Дніпропетровська обл., с. Любимівка (біля Дніпра)",
    zone: "Правий берег / Південний міст",
    hours: "24/7 цілодобово",
    volume: "Пряме видобування від 100 000 т",
    tracks: "Пряме кар'єрне навантаження",
    scales: "Автоваги 80 т",
    phone: "+380 (67) 686-31-86"
  },
  {
    id: 3,
    name: "База «Правий берег — Заводська»",
    address: "м. Дніпро, вул. Набережна Заводська, 82",
    zone: "Правий берег / Кайдацький міст",
    hours: "07:00 — 21:00",
    volume: "Запас 30 000 т",
    tracks: "Швидкий виїзд на Набережну",
    scales: "Автоваги 60 т",
    phone: "+380 (67) 686-31-86"
  },
  {
    id: 4,
    name: "Кам'янський термінал",
    address: "м. Кам'янське, вул. Баглійська, 14",
    zone: "Кам'янське / Дніпродзержинськ",
    hours: "06:00 — 22:00",
    volume: "Запас 25 000 т",
    tracks: "Зручний виїзд на трасу Н-08",
    scales: "Автоваги 80 т",
    phone: "+380 (67) 686-31-86"
  }
];

export const DELIVERY_ZONES = [
  { id: "dnipro_right", name: "Дніпро (Правий берег: Центр, Перемога, Тополя, Парус)", baseRate: 110, minDelivery: 1100 },
  { id: "dnipro_left", name: "Дніпро (Лівий берег: АНД, Індустріальний, Сонячний)", baseRate: 100, minDelivery: 1000 },
  { id: "pidhorodne_slobozhanske", name: "Підгородне / Слобожанське / Обухівка (до 15 км)", baseRate: 130, minDelivery: 1300 },
  { id: "kamianske", name: "Кам'янське та прилеглі райони (до 35 км)", baseRate: 160, minDelivery: 1600 },
  { id: "novomoskovsk", name: "Новомосковськ / Піщанка (до 30 км)", baseRate: 150, minDelivery: 1500 },
  { id: "pavlohrad_synelnykove", name: "Павлоград / Синельникове (до 60 км)", baseRate: 210, minDelivery: 2100 },
  { id: "oblast_far", name: "Дніпропетровська область (понад 60 км)", baseRate: 260, minDelivery: 2600 }
];
