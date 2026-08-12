// Головні розділи каталогу (8 основних категорій нерудних матеріалів)
export const MAIN_SECTIONS = [
  {
    id: "grunty",
    name: "Ґрунти",
    price: "від 320 грн/т",
    priceM3: "від 420 грн/м³",
    image: "/images/img_87e8a19108.jpg",
    itemsCount: 5,
    description: "Чорнозем, родючий ґрунт, торфосуміші та суглинки на підсипку по Дніпру."
  },
  {
    id: "sheben",
    name: "Щебінь",
    price: "від 240 грн/т",
    priceM3: "від 320 грн/м³",
    image: "/images/img_c77ba3b87a.jpg",
    featured: true,
    itemsCount: 15,
    description: "Гранітний, шлаковий, гравійний, вапняковий, бут, габіонний та вторинний щебінь."
  },
  {
    id: "pesok",
    name: "Пісок",
    price: "від 220 грн/т",
    priceM3: "від 280 грн/м³",
    image: "/images/img_6800c51194.jpg",
    itemsCount: 5,
    description: "Річковий митий пісок із Дніпра, кар'єрний яружний, сіяний та фасований у мішки."
  },
  {
    id: "shps",
    name: "ЩПС",
    price: "від 330 грн/т",
    priceM3: "від 450 грн/м³",
    image: "/images/img_3294613207.jpg",
    itemsCount: 3,
    description: "Щебенево-піщані суміші С4, С5, С7 для дорожніх основ та стоянок."
  },
  {
    id: "pgs",
    name: "ПГС / ОПГС",
    price: "від 290 грн/т",
    priceM3: "від 390 грн/м³",
    image: "/images/img_d28205a208.jpg",
    itemsCount: 2,
    description: "Піщано-гравійні та збагачені суміші для виготовлення бетону та подушок."
  },
  {
    id: "gravij",
    name: "Гравій",
    price: "від 360 грн/т",
    priceM3: "від 490 грн/м³",
    image: "/images/img_28fb203bd8.jpg",
    itemsCount: 4,
    description: "Природний окатаний та колотий гравій фракцій 5-20, 20-40 та 40-70 мм."
  },
  {
    id: "keramzit",
    name: "Керамзит",
    price: "від 1 450 грн/м³",
    priceM3: "від 1 450 грн/м³",
    image: "/images/img_keramzyt_20_40.jpg",
    itemsCount: 4,
    description: "Легкий утеплювач і заповнювач для стяжок, перекриттів та покрівель."
  },
  {
    id: "galka",
    name: "Галька та камінь",
    price: "від 550 грн/т",
    priceM3: "від 750 грн/м³",
    image: "/images/img_8d143bea68.jpg",
    itemsCount: 3,
    description: "Дніпровська річкова та морська окатана галька для ландшафту та декору."
  }
];

// Мегаменю сайту (тільки будівельні нерудні матеріали)
export const MEGA_MENU_DATA = [
  {
    id: "sheben",
    name: "Щебінь",
    link: "#catalog-items",
    featured: true,
    items: [
      { name: "Гранітний щебінь", price: "від 380 грн/т" },
      { name: "Гравійний щебінь", price: "від 360 грн/т" },
      { name: "Шлаковий щебінь (доменний)", price: "від 240 грн/т" },
      { name: "Вапняковий щебінь", price: "від 320 грн/т" },
      { name: "Баластний щебінь", price: "від 390 грн/т" },
      { name: "Бутовий камінь (бут)", price: "від 450 грн/т" },
      { name: "Вторинний щебінь (дробл. бетон)", price: "від 190 грн/т" },
      { name: "Габро-діабаз", price: "від 480 грн/т" },
      { name: "Доломітовий щебінь", price: "від 340 грн/т" },
      { name: "Митий щебінь", price: "від 420 грн/т" },
      { name: "Для габіонів", price: "від 520 грн/т" },
      { name: "Щебінь у мішках по 25/50 кг", price: "від 65 грн/мішок" },
      { name: "Щебінь у Біг-бегах (1 т)", price: "від 650 грн/т" },
      { name: "Гранітний відсів (0-5 мм)", price: "від 220 грн/т" },
      { name: "Мармуровий щебінь (білий)", price: "від 1 200 грн/т" }
    ]
  },
  {
    id: "grunty",
    name: "Ґрунти",
    link: "#catalog-items",
    items: [
      { name: "Родючий ґрунт (чорнозем)", price: "від 350 грн/т" },
      { name: "Почвоґрунт рослинний", price: "від 320 грн/т" },
      { name: "Торфо-піщана суміш", price: "від 420 грн/т" },
      { name: "Планувальний ґрунт (суглинок)", price: "від 180 грн/т" },
      { name: "Ґрунт у Біг-бегах (1 т)", price: "від 750 грн/т" }
    ]
  },
  {
    id: "pesok",
    name: "Пісок",
    link: "#catalog-items",
    items: [
      { name: "Річковий пісок (Дніпро, митий)", price: "від 280 грн/т" },
      { name: "Кар'єрний пісок (яружний)", price: "від 220 грн/т" },
      { name: "Сіяний пісок (модуль 1.8-2.2)", price: "від 260 грн/т" },
      { name: "Піскоґрунт на підсипку", price: "від 160 грн/т" },
      { name: "Пісок у мішках по 50 кг", price: "від 65 грн/мішок" }
    ]
  },
  {
    id: "shps",
    name: "ЩПС (Щебенево-піщана суміш)",
    link: "#catalog-items",
    items: [
      { name: "ЩПС С5 (0-40 мм)", price: "від 340 грн/т" },
      { name: "ЩПС С7 (0-20 мм)", price: "від 350 грн/т" },
      { name: "ЩПС С4 (0-70 мм)", price: "від 330 грн/т" }
    ]
  },
  {
    id: "pgs",
    name: "ПГС / ОПГС",
    link: "#catalog-items",
    items: [
      { name: "ПГС природна", price: "від 290 грн/т" },
      { name: "ОПГС збагачена", price: "від 360 грн/т" }
    ]
  },
  {
    id: "gravij",
    name: "Гравій",
    link: "#catalog-items",
    items: [
      { name: "Гравій 5-20 мм", price: "від 360 грн/т" },
      { name: "Гравій 20-40 мм", price: "від 350 грн/т" },
      { name: "Гравій 40-70 мм", price: "від 340 грн/т" }
    ]
  },
  {
    id: "keramzit",
    name: "Керамзит",
    link: "#catalog-items",
    items: [
      { name: "Керамзит фракція 5-10 мм", price: "від 1 650 грн/м³" },
      { name: "Керамзит фракція 10-20 мм", price: "від 1 550 грн/м³" },
      { name: "Керамзит фракція 20-40 мм", price: "від 1 450 грн/м³" },
      { name: "Керамзит у мішках (50 л)", price: "від 95 грн/мішок" }
    ]
  },
  {
    id: "galka",
    name: "Галька та камінь",
    link: "#catalog-items",
    items: [
      { name: "Річкова галька (Дніпровська)", price: "від 550 грн/т" },
      { name: "Морська окатана галька", price: "від 850 грн/т" },
      { name: "Декоративний камінь", price: "від 700 грн/т" }
    ]
  }
];

// Усі різновиди та товари за категоріями (100% тематичні фотографії через онлайн-посилання)
export const ALL_PRODUCTS = [
  // --- ЩЕБІНЬ (15 видів як на скріншоті 2) ---
  {
    id: "gravijnyj-shch",
    sectionId: "sheben",
    name: "Гравійний щебінь",
    price: 360,
    priceUnit: "грн/т",
    priceM3: 490,
    fractions: ["3-10 мм", "5-20 мм", "20-40 мм", "40-70 мм"],
    strength: "М800 - М1000",
    frost: "F150 - F200",
    flakiness: "до 15%",
    density: "1.36 т/м3",
    image: "/images/img_652b10eb9d.jpg",
    description: "Природний колотий камінь із низьким радіаційним фоном. Ідеальний для фундаментів, стяжок та бетонів М150–М300."
  },
  {
    id: "granitnyj",
    sectionId: "sheben",
    name: "Гранітний щебінь",
    price: 380,
    priceUnit: "грн/т",
    priceM3: 530,
    fractions: ["0-5 мм", "2-5 мм", "5-10 мм", "5-20 мм", "20-40 мм", "40-70 мм"],
    strength: "М1200 - М1400",
    frost: "F300 - F400",
    flakiness: "до 10% (кубоподібна)",
    density: "1.40 т/м3",
    image: "/images/img_c77ba3b87a.jpg",
    popular: true,
    description: "Найміцніший гранітний щебінь для моноліту, високомарочного бетону, мостів та автодоріг вищих категорій."
  },
  {
    id: "izvestnyakovyj",
    sectionId: "sheben",
    name: "Вапняковий щебінь",
    price: 320,
    priceUnit: "грн/т",
    priceM3: 410,
    fractions: ["5-20 мм", "20-40 мм", "40-70 мм"],
    strength: "М600 - М800",
    frost: "F100 - F150",
    flakiness: "10-15%",
    density: "1.28 т/м3",
    image: "/images/img_aaa702bf24.jpg",
    description: "Екологічно чистий кальцитовий камінь для благоустрою, дренажних систем, доріг 2-3 категорії та виробництва вапна."
  },
  {
    id: "domennyj",
    sectionId: "sheben",
    name: "Доменний щебінь (шлаковий)",
    price: 240,
    priceUnit: "грн/т",
    priceM3: 320,
    fractions: ["0-20 мм", "20-40 мм", "40-70 мм", "70-120 мм"],
    strength: "М800 - М1000",
    frost: "F100",
    flakiness: "до 15%",
    density: "1.35 т/м3",
    image: "/images/img_domennyj_shlak.jpg",
    popular: true,
    description: "Дроблені металургійні шлаки заводів Дніпра та Кам'янського з високим зчепленням для дорожніх основ і стоянок."
  },
  {
    id: "ballastnyj",
    sectionId: "sheben",
    name: "Баластний щебінь",
    price: 390,
    priceUnit: "грн/т",
    priceM3: 540,
    fractions: ["25-60 мм", "40-70 мм"],
    strength: "М1200 - М1400",
    frost: "F300",
    flakiness: "до 12%",
    density: "1.41 т/м3",
    image: "/images/img_876ab9729b.jpg",
    description: "Спеціалізований гранітний щебінь для баластного шару залізничних колій, трамвайних ліній та важких під'їздів."
  },
  {
    id: "butovyj",
    sectionId: "sheben",
    name: "Бутовий камінь (бут)",
    price: 450,
    priceUnit: "грн/т",
    priceM3: 675,
    fractions: ["70-150 мм", "100-300 мм", "150-400 мм"],
    strength: "М1000 - М1200",
    frost: "F200 - F300",
    flakiness: "масивний колотий",
    density: "1.50 т/м3",
    image: "/images/img_butovyj_kamin.webp",
    popular: true,
    description: "Гранітний бут для підпірних стін, парканів, фундаментів під важкі конструкції та берегоукріплення річки Дніпро."
  },
  {
    id: "vtorichnyj",
    sectionId: "sheben",
    name: "Вторинний щебінь (дробл. бетон)",
    price: 190,
    priceUnit: "грн/т",
    priceM3: 240,
    fractions: ["0-40 мм", "20-40 мм", "40-70 мм"],
    strength: "М400 - М600",
    frost: "F50 - F100",
    flakiness: "до 20%",
    density: "1.25 т/м3",
    image: "/images/img_vtorichnyj_beton.png",
    popular: true,
    description: "Дроблений та очищений від арматури бетонний щебінь для відсипання тимчасових доріг, будівельних під'їздів та стоянок."
  },
  {
    id: "gabbro-diabaz",
    sectionId: "sheben",
    name: "Габро-діабаз",
    price: 480,
    priceUnit: "грн/т",
    priceM3: 690,
    fractions: ["5-20 мм", "20-40 мм"],
    strength: "М1400 - М1600",
    frost: "F400",
    flakiness: "до 7%",
    density: "1.45 т/м3",
    image: "/images/img_gabbro_diabaz.png",
    description: "Надміцна темна вулканічна порода з найвищою зносостійкістю, застосовується для асфальтобетону та лазень."
  },
  {
    id: "dolomitovyj",
    sectionId: "sheben",
    name: "Доломітовий щебінь",
    price: 340,
    priceUnit: "грн/т",
    priceM3: 450,
    fractions: ["5-20 мм", "20-40 мм", "40-70 мм"],
    strength: "М800 - М1000",
    frost: "F150",
    flakiness: "до 12%",
    density: "1.32 т/м3",
    image: "/images/img_2c89c07202.jpg",
    description: "Міцний осадний камінь із високою адгезією до бітуму для дорожніх асфальтових покриттів та бетонних сумішей."
  },
  {
    id: "mytyj",
    sectionId: "sheben",
    name: "Митий щебінь",
    price: 420,
    priceUnit: "грн/т",
    priceM3: 580,
    fractions: ["5-20 мм", "20-40 мм"],
    strength: "М1000",
    frost: "F200",
    flakiness: "до 10%",
    density: "1.37 т/м3",
    image: "/images/img_mytyj_sheben.jpg",
    description: "Повністю очищений від глини та пилоподібних часток матеріал для відповідальних бетонних розчинів та дренажу."
  },
  {
    id: "shlakovyj-otval",
    sectionId: "sheben",
    name: "Шлаковий щебінь (відвальний)",
    price: 240,
    priceUnit: "грн/т",
    priceM3: 320,
    fractions: ["0-20 мм", "20-40 мм", "40-70 мм"],
    strength: "М800 - М1000",
    frost: "F100",
    flakiness: "до 15%",
    density: "1.35 т/м3",
    image: "/images/img_domennyj_shlak.jpg",
    description: "Бюджетний міцний щебінь для відсипання промислових зон, під'їздів та влаштування жорстких основ."
  },
  {
    id: "gabiony",
    sectionId: "sheben",
    name: "Щебінь для габіонів",
    price: 520,
    priceUnit: "грн/т",
    priceM3: 750,
    fractions: ["70-150 мм", "100-250 мм"],
    strength: "М1200",
    frost: "F300",
    flakiness: "колотий / окатаний",
    density: "1.45 т/м3",
    image: "/images/img_sheben_gabiony.webp",
    description: "Відбірний гранітний камінь для сітчастих габіонних конструкцій, захисних бар'єрів та берегоукріплення."
  },
  {
    id: "v-meshkah",
    sectionId: "sheben",
    name: "Щебінь у мішках (25/50 кг)",
    price: 65,
    priceUnit: "грн/мішок",
    priceM3: 920,
    fractions: ["5-20 мм", "20-40 мм", "0-5 мм"],
    strength: "За ДСТУ",
    frost: "F300",
    flakiness: "фасований",
    density: "50 кг/мішок",
    image: "/images/img_sheben_v_meshkah.jpg",
    description: "Фасований у мішки щебінь для зручного ручного занесення у квартири, підвальні приміщення та приватні ділянки."
  },
  {
    id: "bigbeg",
    sectionId: "sheben",
    name: "Щебінь у Біг-бегах (1 т)",
    price: 650,
    priceUnit: "грн/т",
    priceM3: 880,
    fractions: ["5-20 мм", "20-40 мм", "0-5 мм"],
    strength: "За ДСТУ",
    frost: "F300",
    flakiness: "у МКР з ручками",
    density: "1.0 т/мішок",
    image: "/images/img_sheben_bigbeg.webp",
    popular: true,
    description: "Зручне фасування у м'які контейнери по 1000 кг для об'єктів з обмеженим заїздом і кранового розвантаження."
  },
  {
    id: "mramornyj",
    sectionId: "sheben",
    name: "Мармуровий щебінь (біла крихта)",
    price: 1200,
    priceUnit: "грн/т",
    priceM3: 1600,
    fractions: ["5-10 мм", "10-20 мм"],
    strength: "М600",
    frost: "F100",
    flakiness: "декоративний білий",
    density: "1.30 т/м3",
    image: "/images/img_mramor_tasos.jpg",
    description: "Білосніжний мармуровий камінь для ландшафтного дизайну, клумб, пам'ятників, мозаїчних підлог і декору."
  },

  // --- ҐРУНТИ (5 видів) ---
  {
    id: "grunt-chernozem",
    sectionId: "grunty",
    name: "Чорнозем польовий родючий",
    price: 350,
    priceUnit: "грн/т",
    priceM3: 450,
    fractions: ["родючий шар"],
    strength: "Гумус > 5%",
    frost: "F-",
    flakiness: "чистий",
    density: "1.20 т/м3",
    image: "/images/img_87e8a19108.jpg",
    popular: true,
    description: "Добірний верхній польовий чорнозем для газонів, садів, теплиць та озеленення прибудинкових територій у Дніпрі."
  },
  {
    id: "grunt-rastitelnyj",
    sectionId: "grunty",
    name: "Почвоґрунт рослинний",
    price: 320,
    priceUnit: "грн/т",
    priceM3: 420,
    fractions: ["збагачений"],
    strength: "Нейтральний pH",
    frost: "F-",
    flakiness: "просіяний",
    density: "1.25 т/м3",
    image: "/images/img_5c6383924a.jpg",
    description: "Суміш чорнозему, торфу та піску для посадки кущів, дерев і вирівнювання ландшафту."
  },
  {
    id: "grunt-torf",
    sectionId: "grunty",
    name: "Торфо-піщана суміш",
    price: 420,
    priceUnit: "грн/т",
    priceM3: 520,
    fractions: ["торф 70% / пісок 30%"],
    strength: "Органіка",
    frost: "F-",
    flakiness: "рихлий",
    density: "1.10 т/м3",
    image: "/images/img_6785e1ced4.jpg",
    description: "Живильний субстрат для покращення структури глинистих і важких ґрунтів."
  },
  {
    id: "grunt-planir",
    sectionId: "grunty",
    name: "Планувальний ґрунт (суглинок)",
    price: 180,
    priceUnit: "грн/т",
    priceM3: 240,
    fractions: ["котлованний"],
    strength: "Підсипка",
    frost: "F-",
    flakiness: "масив",
    density: "1.40 т/м3",
    image: "/images/img_91fe97e7af.jpg",
    description: "Ґрунт для зворотного засипання котлованів, вирівнювання рельєфу та підняття рівня ділянки."
  },
  {
    id: "grunt-bigbeg",
    sectionId: "grunty",
    name: "Ґрунт родючий у Біг-бегах (1 т)",
    price: 750,
    priceUnit: "грн/т",
    priceM3: 950,
    fractions: ["1000 кг"],
    strength: "Гумус > 5%",
    frost: "F-",
    flakiness: "чистий",
    density: "1.0 т/мішок",
    image: "/images/img_1006ce9b6a.jpg",
    description: "Чистий чорнозем у біг-бегах для чистої доставки на готові ландшафтні об'єкти без бруду на плитці."
  },

  // --- ПІСОК (5 видів) ---
  {
    id: "pesok-rechnoj",
    sectionId: "pesok",
    name: "Річковий пісок (Дніпро, митий)",
    price: 280,
    priceUnit: "грн/т",
    priceM3: 400,
    fractions: ["модуль 1.5 - 2.0 мм"],
    strength: "Чистий",
    frost: "F-",
    flakiness: "без глини",
    density: "1.45 т/м3",
    image: "/images/img_6800c51194.jpg",
    popular: true,
    description: "Намивний дніпровський пісок без глини та камінців для бетонних розчинів, стяжки підлоги та штукатурки."
  },
  {
    id: "pesok-karyernyj",
    sectionId: "pesok",
    name: "Кар'єрний пісок (яружний)",
    price: 220,
    priceUnit: "грн/т",
    priceM3: 310,
    fractions: ["модуль 1.2 - 1.8 мм"],
    strength: "Будівельний",
    frost: "F-",
    flakiness: "дрібнозернистий",
    density: "1.40 т/м3",
    image: "/images/img_8455bc1f6d.jpg",
    description: "Природний кар'єрний пісок для кладки цегли, дорожніх подушок та зворотного засипання."
  },
  {
    id: "pesok-seyanyj",
    sectionId: "pesok",
    name: "Сіяний пісок (модуль 1.8-2.2)",
    price: 260,
    priceUnit: "грн/т",
    priceM3: 370,
    fractions: ["модуль 1.8-2.2 мм"],
    strength: "Очищений",
    frost: "F-",
    flakiness: "без домішок",
    density: "1.42 т/м3",
    image: "/images/img_siyanyj_pisok.jpg",
    description: "Механічно просіяний річковий пісок без великих зерен та глинистих включень (модуль 1.8-2.2 мм) для монолітного бетону, штукатурки та укладання тротуарної плитки."
  },
  {
    id: "pesok-grunt",
    sectionId: "pesok",
    name: "Піскоґрунт на підсипку",
    price: 160,
    priceUnit: "грн/т",
    priceM3: 220,
    fractions: ["супісок"],
    strength: "Підсипка",
    frost: "F-",
    flakiness: "масив",
    density: "1.45 т/м3",
    image: "/images/img_piskohrunt.png",
    description: "Недорогий супісок (піскоґрунт) для планування ділянок, підсипки траншей, цоколів та формування високих насипів."
  },
  {
    id: "pesok-meshki",
    sectionId: "pesok",
    name: "Пісок у мішках по 50 кг",
    price: 65,
    priceUnit: "грн/мішок",
    priceM3: 900,
    fractions: ["50 кг"],
    strength: "Митий річковий",
    frost: "F-",
    flakiness: "фасований",
    density: "50 кг/мішок",
    image: "/images/img_pisok_meshki.jpg",
    description: "Фасований очищений митий річковий пісок у поліпропіленових мішках по 50 кг. Зручне підняття на поверхи для штукатурки, стяжки та внутрішнього оздоблення."
  },

  // --- ЩПС (3 види) ---
  {
    id: "shps-c5",
    sectionId: "shps",
    name: "ЩПС С5 (фракція 0-40 мм)",
    price: 340,
    priceUnit: "грн/т",
    priceM3: 480,
    fractions: ["0-40 мм"],
    strength: "М1200",
    frost: "F300",
    flakiness: "до 15%",
    density: "1.50 т/м3",
    image: "/images/img_3294613207.jpg",
    popular: true,
    description: "Готова гранітна суміш оптимального гранулометричного складу для дорожніх основ під асфальт та бруківку."
  },
  {
    id: "shps-c7",
    sectionId: "shps",
    name: "ЩПС С7 (фракція 0-20 мм)",
    price: 350,
    priceUnit: "грн/т",
    priceM3: 500,
    fractions: ["0-20 мм"],
    strength: "М1200",
    frost: "F300",
    flakiness: "до 12%",
    density: "1.52 т/м3",
    image: "/images/img_bf17f8fa9d.jpg",
    description: "Дрібнозерниста суміш для розклинювання та формування фінішного шару перед укладанням асфальтобетону."
  },
  {
    id: "shps-c4",
    sectionId: "shps",
    name: "ЩПС С4 (фракція 0-70 мм)",
    price: 330,
    priceUnit: "грн/т",
    priceM3: 460,
    fractions: ["0-70 мм"],
    strength: "М1200",
    frost: "F300",
    flakiness: "до 18%",
    density: "1.55 т/м3",
    image: "/images/img_876ab9729b.jpg",
    description: "Великофракційна щебенево-піщана суміш для капітального будівництва автошляхів та стоянок важкої техніки."
  },

  // --- ПГС (2 види) ---
  {
    id: "pgs-prirod",
    sectionId: "pgs",
    name: "ПГС природна піщано-гравійна",
    price: 290,
    priceUnit: "грн/т",
    priceM3: 390,
    fractions: ["гравій 20-30%"],
    strength: "М800",
    frost: "F150",
    flakiness: "природна",
    density: "1.45 т/м3",
    image: "/images/img_d28205a208.jpg",
    description: "Природна суміш піску та гравію для зворотного засипання, подушок під фундамент та відсипання доріг."
  },
  {
    id: "opgs-obog",
    sectionId: "pgs",
    name: "ОПГС збагачена (гравій 50-70%)",
    price: 360,
    priceUnit: "грн/т",
    priceM3: 490,
    fractions: ["гравій 50-70%"],
    strength: "М1000",
    frost: "F200",
    flakiness: "збагачена",
    density: "1.48 т/м3",
    image: "/images/img_28fb203bd8.jpg",
    popular: true,
    description: "Збагачена піщано-гравійна суміш для виготовлення монолітного товарного бетону та фундаментних блоків."
  },

  // --- ГРАВІЙ (3 види) ---
  {
    id: "gravij-5-20",
    sectionId: "gravij",
    name: "Гравій природний 5-20 мм",
    price: 360,
    priceUnit: "грн/т",
    priceM3: 490,
    fractions: ["5-20 мм"],
    strength: "М1000",
    frost: "F200",
    flakiness: "окатаний",
    density: "1.36 т/м3",
    image: "/images/img_hraviy_5_20.jpg",
    popular: true,
    description: "Природний окатаний річковий та колотий гравій фракції 5-20 мм без радіації для фундаментів, бетону та ландшафтного благоустрою."
  },
  {
    id: "gravij-20-40",
    sectionId: "gravij",
    name: "Гравій природний 20-40 мм",
    price: 350,
    priceUnit: "грн/т",
    priceM3: 480,
    fractions: ["20-40 мм"],
    strength: "М1000",
    frost: "F200",
    flakiness: "окатаний",
    density: "1.37 т/м3",
    image: "/images/img_28fb203bd8.jpg",
    description: "Середньофракційний гравій для фільтраційних полів, дренажних колодязів та відсипання берегів."
  },
  {
    id: "gravij-40-70",
    sectionId: "gravij",
    name: "Гравій крупний 40-70 мм",
    price: 340,
    priceUnit: "грн/т",
    priceM3: 470,
    fractions: ["40-70 мм"],
    strength: "М1000",
    frost: "F150",
    flakiness: "крупний",
    density: "1.38 т/м3",
    image: "/images/img_243f4237a6.jpg",
    description: "Крупний гравій для септиків, габіонів та зміцнення схилів і берегових ліній."
  },

  // --- КЕРАМЗИТ (4 види) ---
  {
    id: "keramzit-5-10",
    sectionId: "keramzit",
    name: "Керамзитовий гравій 5-10 мм",
    price: 1650,
    priceUnit: "грн/м³",
    priceM3: 1650,
    fractions: ["5-10 мм"],
    strength: "П100",
    frost: "F50",
    flakiness: "сферичний",
    density: "0.45 т/м3",
    image: "/images/img_ad97ca335b.jpg",
    popular: true,
    description: "Дрібний керамзит для вирівнювання та сухої стяжки підлоги, виробництва легких керамзитобетонних блоків."
  },
  {
    id: "keramzit-10-20",
    sectionId: "keramzit",
    name: "Керамзитовий гравій 10-20 мм",
    price: 1550,
    priceUnit: "грн/м³",
    priceM3: 1550,
    fractions: ["10-20 мм"],
    strength: "П75",
    frost: "F50",
    flakiness: "сферичний",
    density: "0.40 т/м3",
    image: "/images/img_9d6f273547.webp",
    description: "Найпопулярніша фракція керамзиту для утеплення підлог, перекриттів горищ і покрівель."
  },
  {
    id: "keramzit-20-40",
    sectionId: "keramzit",
    name: "Керамзитовий гравій 20-40 мм",
    price: 1450,
    priceUnit: "грн/м³",
    priceM3: 1450,
    fractions: ["20-40 мм"],
    strength: "П50",
    frost: "F50",
    flakiness: "легкий",
    density: "0.35 т/м3",
    image: "/images/img_keramzyt_20_40.jpg",
    description: "Найдрібніша насипна щільність. Найкращий утеплювач для засипки стін, перекриттів і підвалів."
  },
  {
    id: "keramzit-meshki",
    sectionId: "keramzit",
    name: "Керамзит у мішках (50 л)",
    price: 95,
    priceUnit: "грн/мішок",
    priceM3: 1900,
    fractions: ["50 літрів"],
    strength: "П75",
    frost: "F50",
    flakiness: "фасований",
    density: "50 л/мішок",
    image: "/images/img_keramzyt_meshki.jpg",
    description: "Фасований керамзит у мішках для зручного підйому на поверх та утеплення балконів і квартир."
  },

  // --- ГАЛЬКА ТА КАМІНЬ (3 види) ---
  {
    id: "galka-rechnaya",
    sectionId: "galka",
    name: "Річкова галька (Дніпровська)",
    price: 550,
    priceUnit: "грн/т",
    priceM3: 750,
    fractions: ["5-20 мм", "20-40 мм", "40-70 мм"],
    strength: "М1000",
    frost: "F200",
    flakiness: "гладка окатана",
    density: "1.45 т/м3",
    image: "/images/img_8d143bea68.jpg",
    popular: true,
    description: "Окатана гладка річкова галька для оздоблення басейнів, доріжок, рокаріїв, клумб та зон відпочинку."
  },
  {
    id: "galka-morskaya",
    sectionId: "galka",
    name: "Морська окатана галька",
    price: 850,
    priceUnit: "грн/т",
    priceM3: 1150,
    fractions: ["10-30 мм", "20-50 мм"],
    strength: "М1000",
    frost: "F200",
    flakiness: "плоска округла",
    density: "1.42 т/м3",
    image: "/images/img_893193156e.jpg",
    description: "Плоска кругла морська галька для мозаїки, внутрішнього інтер'єрного декору та оформлення фонтанів."
  },
  {
    id: "kamen-dekor",
    sectionId: "galka",
    name: "Декоративний камінь для саду",
    price: 700,
    priceUnit: "грн/т",
    priceM3: 980,
    fractions: ["50-150 мм"],
    strength: "М1000",
    frost: "F200",
    flakiness: "пейзажний",
    density: "1.48 т/м3",
    image: "/images/img_f899aa9a2d.jpg",
    description: "Пейзажні камені різноманітних кольорів для створення альпійських гірок, водоспадів та саду каменів."
  }
];

// Для зворотної сумісності зі старими імпортами
export const SHCHEDEN_PRODUCTS = ALL_PRODUCTS.filter(p => p.sectionId === "sheben");

export const PRICE_TABLES_DATA = {
  granitnyj: {
    category: "granitnyj",
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
    category: "shlakovyj",
    title: "Ціни на категорію: Шлаковий щебінь (Дніпро)",
    badge: "ТУ / ДСТУ",
    items: [
      { name: "Шлаковий щебінь 0-20 мм", priceM3: 300, priceTon: 220, strength: "М800", frost: "F100" },
      { name: "Шлаковий щебінь 20-40 мм", priceM3: 320, priceTon: 240, strength: "М800-1000", frost: "F100" },
      { name: "Шлаковий щебінь 40-70 мм", priceM3: 320, priceTon: 240, strength: "М800-1000", frost: "F100" },
      { name: "Шлаковий щебінь 70-120 мм (великий)", priceM3: 340, priceTon: 250, strength: "М800-1000", frost: "F100" }
    ]
  },
  pesok: {
    category: "pesok",
    title: "Ціни на категорію: Пісок будівельний",
    badge: "ДСТУ Б В.2.7-32-01",
    items: [
      { name: "Річковий пісок (митий, Дніпро)", priceM3: 270, priceTon: 180, strength: "Мк 1.8-2.2", frost: "F-" },
      { name: "Сіяний пісок (модуль 1.8-2.2)", priceM3: 370, priceTon: 260, strength: "Мк 1.8-2.2", frost: "F-" },
      { name: "Пісок у мішках (50 кг)", priceM3: 450, priceTon: 45, strength: "Фасований", frost: "F-" },
      { name: "Пісок у Біг-бегах (1 т)", priceM3: 550, priceTon: 420, strength: "МКР", frost: "F-" }
    ]
  },
  shps: {
    category: "shps",
    title: "Ціни на категорію: Дорожні суміші ЩПС",
    badge: "ДСТУ Б В.2.7-30:2013",
    items: [
      { name: "ЩПС С5 (фракція 0-70 мм)", priceM3: 490, priceTon: 340, strength: "М1200", frost: "F300" },
      { name: "ЩПС С7 (фракція 0-40 мм)", priceM3: 510, priceTon: 350, strength: "М1200", frost: "F300" },
      { name: "ЩПС С4 (фракція 0-20 мм)", priceM3: 470, priceTon: 330, strength: "М1200", frost: "F300" }
    ]
  },
  pgs: {
    category: "pgs",
    title: "Ціни на категорію: Піщано-гравійні суміші",
    badge: "ДСТУ ГОСТ 23735-2014",
    items: [
      { name: "ПГС природна (гравій 20-30%)", priceM3: 390, priceTon: 260, strength: "М800", frost: "F150" },
      { name: "ОПГС збагачена (гравій 50-70%)", priceM3: 460, priceTon: 310, strength: "М1000", frost: "F200" }
    ]
  },
  grunty: {
    category: "grunty",
    title: "Ціни на категорію: Ґрунти та чорнозем",
    badge: "Сертифікат родючості",
    items: [
      { name: "Чорнозем польовий родючий", priceM3: 450, priceTon: 350, strength: "Гумус > 5%", frost: "F-" },
      { name: "Рослинний ґрунт збагачений", priceM3: 400, priceTon: 310, strength: "Органіка", frost: "F-" },
      { name: "Ґрунт на підсипку / вирівнювання", priceM3: 200, priceTon: 150, strength: "Супісок", frost: "F-" },
      { name: "Ґрунт родючий у Біг-бегах (1 т)", priceM3: 950, priceTon: 750, strength: "У біг-бегах", frost: "F-" }
    ]
  },
  gravijnyj: {
    category: "gravijnyj",
    title: "Ціни на категорію: Гравій та галька",
    badge: "ДСТУ Б В.2.7-75-98",
    items: [
      { name: "Гравій річковий 5-20 мм", priceM3: 490, priceTon: 360, strength: "М1000", frost: "F200" },
      { name: "Гравій річковий 20-40 мм", priceM3: 480, priceTon: 350, strength: "М1000", frost: "F200" },
      { name: "Річкова галька (Дніпровська)", priceM3: 780, priceTon: 580, strength: "М1000", frost: "F200" }
    ]
  },
  vtorichnyj: {
    category: "vtorichnyj",
    title: "Ціни на категорію: Вторинні матеріали",
    badge: "ТУ Будівельний",
    items: [
      { name: "Вторинний бетонний щебінь 0-40 мм", priceM3: 220, priceTon: 180, strength: "М300-400", frost: "F50" },
      { name: "Вторинний бетонний щебінь 20-40 мм", priceM3: 240, priceTon: 190, strength: "М400-600", frost: "F50" },
      { name: "Вторинний бетонний щебінь 40-70 мм", priceM3: 240, priceTon: 190, strength: "М400-600", frost: "F50" },
      { name: "Асфальтна крихта (з-під фрези)", priceM3: 350, priceTon: 280, strength: "Бітумна", frost: "F100" }
    ]
  }
};

export const WAREHOUSES = [
  {
    id: 1,
    name: "Головна перевалка «Лівий берег»",
    address: "м. Дніпро, вул. Журналістів, 9 (Індустріальний р-н)",
    zone: "Лівий берег / Слобожанський пр-т",
    hours: "09:00 — 20:00 щоденно",
    volume: "Запас понад 45 000 т",
    tracks: "Власна залізнична гілка + генератор",
    scales: "Електронні автоваги 80 т",
    phone: "+380 (67) 686-31-86",
    mapQuery: "вулиця Журналістів, 9, Дніпро",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=вулиця+Журналістів,+9,+Дніпро"
  },
  {
    id: 2,
    name: "Любимівський гранітний кар'єр",
    address: "Дніпропетровська обл., с. Любимівка (біля Дніпра)",
    zone: "Правий берег / Південний міст",
    hours: "09:00 — 20:00 (Пн–Сб)",
    volume: "Пряме видобування від 100 000 т",
    tracks: "Пряме кар'єрне навантаження",
    scales: "Автоваги 80 т",
    phone: "+380 (67) 686-31-86",
    mapQuery: "Любимівка, Дніпропетровська область",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Любимівка,+Дніпропетровська+область"
  },
  {
    id: 3,
    name: "База «Правий берег — Заводська»",
    address: "м. Дніпро, вул. Набережна Заводська, 82",
    zone: "Правий берег / Кайдацький міст",
    hours: "09:00 — 20:00 щоденно",
    volume: "Запас 30 000 т",
    tracks: "Швидкий виїзд на Набережну + генератор",
    scales: "Автоваги 60 т",
    phone: "+380 (67) 686-31-86",
    mapQuery: "вулиця Набережна Заводська, 82, Дніпро",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=вулиця+Набережна+Заводська,+82,+Дніпро"
  },
  {
    id: 4,
    name: "Кам'янський термінал",
    address: "м. Кам'янське, вул. Баглійська, 14",
    zone: "Кам'янське / Дніпродзержинськ",
    hours: "09:00 — 20:00 щоденно",
    volume: "Запас 25 000 т",
    tracks: "Зручний виїзд на трасу Н-08",
    scales: "Автоваги 80 т",
    phone: "+380 (67) 686-31-86",
    mapQuery: "вулиця Баглійська, 14, Кам'янське",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=вулиця+Баглійська,+14,+Кам'янське"
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
