import type { Contest } from "../store/game";

export const contestsData: Contest[] = [
  {
    id: "kinologiya",
    title: "Кинология",
    description:
      "Включается мелодия, нужно назвать фильм/сериал/мультфильм/мультсериал, из которого эта песня",
    points: 300,
    timeSec: null,
    tasks: [
      {
        id: "kinologiya-1",
        order: 1,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Кинология/Battle Without Honor Or Humanity — Tomoyasu Hotei.mp3",
            stops: [30],
          },
        },
        answer: {
          text: "Kill Bill",
        },
      },
      {
        id: "kinologiya-2",
        order: 2,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Кинология/Danza Kuduro — Don Omar, Lucenzo.mp3",
            stops: [30],
          },
        },
        answer: {
          text: "Форсаж 5",
        },
      },
      {
        id: "kinologiya-3",
        order: 3,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Кинология/Desperate Housewives Theme — Danny Elfman.mp3",
            stops: [30],
          },
        },
        answer: {
          text: "Отчаянные домохозяйки",
        },
      },
      {
        id: "kinologiya-4",
        order: 4,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Кинология/He's A Pirate — Klaus Badelt.mp3",
            stops: [30],
          },
        },
        answer: {
          text: "Пираты Карибского моря",
        },
      },
      {
        id: "kinologiya-5",
        order: 5,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Кинология/Knockin' On Heaven's Door — Bob Dylan.mp3",
            stops: [30],
          },
        },
        answer: {
          text: "Пэт Гарретт и Билли Кид",
        },
      },
      {
        id: "kinologiya-6",
        order: 6,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Кинология/Main Title — Ramin Djawadi.mp3",
            stops: [30],
          },
        },
        answer: {
          text: "Игра престолов",
        },
      },
      {
        id: "kinologiya-7",
        order: 7,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Кинология/You're Dead — Norma Tanega.mp3",
            stops: [30],
          },
        },
        answer: {
          text: "Что мы делаем в тени",
        },
      },
    ],
  },
  {
    id: "kovry",
    title: "Ковры",
    description:
      "Включается кавер. Есть 30 сек, чтобы назвать либо на какого исполнителя кавер, либо на какую песню",
    points: 300,
    timeSec: 30,
    tasks: [
      {
        id: "kovry-1",
        order: 1,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Ковры/Enjoy The Silence — Lacuna Coil.mp3",
            stops: [30],
          },
        },
        answer: {
          text: "Depeche Mode - Enjoy The Silence",
        },
      },
      {
        id: "kovry-2",
        order: 2,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Ковры/Livin' La Vida Loca — Autumn Kings.mp3",
            stops: [30],
          },
        },
        answer: {
          text: "Ricky Martin - Livin' La Vida Loca",
        },
      },
      {
        id: "kovry-3",
        order: 3,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Ковры/Nothing Else Matters — William Joseph.mp3",
            stops: [30],
          },
        },
        answer: {
          text: "Metallica - Nothing Else Matters",
        },
      },
      {
        id: "kovry-4",
        order: 4,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Ковры/One of Us — Piano Covers Club from I'm In Records.mp3",
            stops: [30],
          },
        },
        answer: {
          text: "ABBA - One of Us",
        },
      },
      {
        id: "kovry-5",
        order: 5,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Ковры/Timanttinen tähti — Laura Voutilainen.mp3",
            stops: [30],
          },
        },
        answer: {
          text: "Laura Voutilainen - Timanttinen tähti",
        },
      },
      {
        id: "kovry-6",
        order: 6,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Ковры/סוכריה — Roni Duani.mp3",
            stops: [30],
          },
        },
        answer: {
          text: "Roni Duani - סוכריה",
        },
      },
    ],
  },
  {
    id: "leksika",
    title: "Лексика",
    description:
      "Ведущий называет слово, нужно называть песни, содержащие в тексте указанное слово. Можно использовать слово в разных числах, падежах, но так чтобы сама основа слова не менялась. Однокоренные нельзя. Все варианты записываются, затем проверяются. Игра заканчивается, если в течение 5 секунд никто не называет новое слово",
    points: 100,
    timeSec: null,
    tasks: [
      {
        id: "leksika-1",
        order: 1,
        played: false,
        question: {
          text: "Женщина",
        },
      },
      {
        id: "leksika-2",
        order: 2,
        played: false,
        question: {
          text: "Работа",
        },
      },
      {
        id: "leksika-3",
        order: 3,
        played: false,
        question: {
          text: "Сила",
        },
      },
      {
        id: "leksika-4",
        order: 4,
        played: false,
        question: {
          text: "Система",
        },
      },
      {
        id: "leksika-5",
        order: 5,
        played: false,
        question: {
          text: "Проблема",
        },
      },
      {
        id: "leksika-6",
        order: 6,
        played: false,
        question: {
          text: "Бог",
        },
      },
      {
        id: "leksika-7",
        order: 7,
        played: false,
        question: {
          text: "Место",
        },
      },
    ],
  },
  {
    id: "skorostrel",
    title: "Скорострел",
    description:
      "Здесь представлены довольно известные в мире и в России песни. Воспроизведение происходит максимум до первой фразы, дальше останавливается. Докажите, что знаете песню, пропев несколько фраз из нее (или скажите название и исполнителя)",
    points: 200,
    timeSec: null,
    tasks: [
      {
        id: "skorostrel-1",
        order: 1,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Скорострел/1. Shallow — Lady Gaga, Bradley Cooper.mp3",
            stops: [10],
          },
        },
        answer: {
          text: "Lady Gaga, Bradley Cooper - Shallow",
        },
      },
      {
        id: "skorostrel-2",
        order: 2,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Скорострел/2. Мы с тобой — Лера Массква.mp3",
            stops: [10],
          },
        },
        answer: {
          text: "Лера Массква - Мы с тобой",
        },
      },
      {
        id: "skorostrel-3",
        order: 3,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Скорострел/3. Чёрные глаза — Айдамир Мугу.mp3",
            stops: [10],
          },
        },
        answer: {
          text: "Айдамир Мугу - Чёрные глаза",
        },
      },
      {
        id: "skorostrel-4",
        order: 4,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Скорострел/4. I Hate Everything About You — Three Days Grace.mp3",
            stops: [10],
          },
        },
        answer: {
          text: "Three Days Grace - I Hate Everything About You",
        },
      },
      {
        id: "skorostrel-5",
        order: 5,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Скорострел/5. Şımarık — Tarkan.mp3",
            stops: [10],
          },
        },
        answer: {
          text: "Tarkan - Şımarık",
        },
      },
      {
        id: "skorostrel-6",
        order: 6,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Скорострел/6. Я крокодил — Стас Экстаз.mp3",
            stops: [10],
          },
        },
        answer: {
          text: "Стас Экстаз - Я крокодил",
        },
      },
      {
        id: "skorostrel-7",
        order: 7,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Скорострел/7. Dance Monkey — Tones And I.mp3",
            stops: [10],
          },
        },
        answer: {
          text: "Tones And I - Dance Monkey",
        },
      },
    ],
  },
  {
    id: "temshchiki",
    title: "Темщики",
    description:
      "Ведущий называет тему, нужно называть песни, содержащие в тексте слова из указанной темы. Все варианты записываются, затем проверяются. Игра заканчивается, если в течение 5 секунд никто не называет новое слово",
    points: 100,
    timeSec: null,
    tasks: [
      {
        id: "temshchiki-1",
        order: 1,
        played: false,
        question: {
          text: "Алкогольный напиток",
        },
      },
      {
        id: "temshchiki-2",
        order: 2,
        played: false,
        question: {
          text: "Цвет",
        },
      },
      {
        id: "temshchiki-3",
        order: 3,
        played: false,
        question: {
          text: "Страна",
        },
      },
      {
        id: "temshchiki-4",
        order: 4,
        played: false,
        question: {
          text: "Транспорт",
        },
      },
      {
        id: "temshchiki-5",
        order: 5,
        played: false,
        question: {
          text: "Сказочный персонаж",
        },
      },
      {
        id: "temshchiki-6",
        order: 6,
        played: false,
        question: {
          text: "Кухонная утварь",
        },
      },
      {
        id: "temshchiki-7",
        order: 7,
        played: false,
        question: {
          text: "Профессия",
        },
      },
    ],
  },
  {
    id: "uznali-soglasny",
    title: "Узнали Согласны",
    description:
      "Воспроизводится песня, возможно не самая популярная у исполнителя. Нужно назвать исполнителя",
    points: 300,
    timeSec: 45,
    tasks: [
      {
        id: "uznali-1",
        order: 1,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Узнали Согласны/1. Ева — Винтаж.mp3",
            stops: [45],
          },
        },
        answer: {
          text: "Винтаж",
        },
      },
      {
        id: "uznali-2",
        order: 2,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Узнали Согласны/2. Higher Ground — Imagine Dragons.mp3",
            stops: [45],
          },
        },
        answer: {
          text: "Imagine Dragons",
        },
      },
      {
        id: "uznali-3",
        order: 3,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Узнали Согласны/3. Брод — Аквариум.mp3",
            stops: [45],
          },
        },
        answer: {
          text: "Аквариум",
        },
      },
      {
        id: "uznali-4",
        order: 4,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Узнали Согласны/4. When You Know (Where You Come From) — Scorpions.mp3",
            stops: [45],
          },
        },
        answer: {
          text: "Scorpions",
        },
      },
      {
        id: "uznali-5",
        order: 5,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Узнали Согласны/5. Я вас уничтожу — Bad Bit, Маэстро Понасенков.mp3",
            stops: [45],
          },
        },
        answer: {
          text: "Bad Bit, Маэстро Понасенков",
        },
      },
      {
        id: "uznali-6",
        order: 6,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Узнали Согласны/6. Young And Beautiful — Lana Del Rey.mp3",
            stops: [45],
          },
        },
        answer: {
          text: "Lana Del Rey",
        },
      },
      {
        id: "uznali-7",
        order: 7,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Узнали Согласны/7. Последняя Любовь — MORGENSHTERN.mp3",
            stops: [45],
          },
        },
        answer: {
          text: "MORGENSHTERN",
        },
      },
    ],
  },
  {
    id: "che-bubnit-to",
    title: "Че бубнить-то",
    description:
      "Выбирается имя звезды. Нужно сказать от чего эта звезда погибла. За каждый неправильный ответ очки отнимаются",
    points: 500,
    timeSec: null,
    tasks: [
      {
        id: "che-bubnit-1",
        order: 1,
        played: false,
        question: {
          text: "Джон Леннон",
        },
        answer: {
          text: "был застрелен фанатом",
        },
      },
      {
        id: "che-bubnit-2",
        order: 2,
        played: false,
        question: {
          text: "Курт Кобейн",
        },
        answer: {
          text: "застрелился",
        },
      },
      {
        id: "che-bubnit-3",
        order: 3,
        played: false,
        question: {
          text: "Честер Беннингтон",
        },
        answer: {
          text: "повесился",
        },
      },
      {
        id: "che-bubnit-4",
        order: 4,
        played: false,
        question: {
          text: "Горшок",
        },
        answer: {
          text: "алкоголь + морфин",
        },
      },
      {
        id: "che-bubnit-5",
        order: 5,
        played: false,
        question: {
          text: "Боб Марли",
        },
        answer: {
          text: "меланома",
        },
      },
      {
        id: "che-bubnit-6",
        order: 6,
        played: false,
        question: {
          text: "Майкл Джексон",
        },
        answer: {
          text: "отравление пропофолом",
        },
      },
      {
        id: "che-bubnit-7",
        order: 7,
        played: false,
        question: {
          text: "Виктор Цой",
        },
        answer: {
          text: "автокатастрофа",
        },
      },
    ],
  },
  {
    id: "chego-tut-ishchesh",
    title: "Чего тут ищешь",
    description:
      "Дается начало поискового запроса в яндексе. Есть минута времени на то, чтобы написать варианты продолжения и прислать мне в телеге или в Ватсапе. Далее смотрим, кто попал. Попаданием считается даже указание одного правильного следующего слова (за исключением предлогов). Далее мы смотрим все список реальных продолжений и считаем очки. За каждое попадание + баллы",
    points: 100,
    timeSec: 60,
    tasks: [
      {
        id: "chego-tut-1",
        order: 1,
        played: false,
        question: {
          text: "Поисковый запрос №1",
        },
        answer: {
          photo: "/src/data/contests_data/Чего тут ищешь/1.png",
        },
      },
      {
        id: "chego-tut-2",
        order: 2,
        played: false,
        question: {
          text: "Поисковый запрос №2",
        },
        answer: {
          photo: "/src/data/contests_data/Чего тут ищешь/2.png",
        },
      },
      {
        id: "chego-tut-3",
        order: 3,
        played: false,
        question: {
          text: "Поисковый запрос №3",
        },
        answer: {
          photo: "/src/data/contests_data/Чего тут ищешь/3.png",
        },
      },
      {
        id: "chego-tut-4",
        order: 4,
        played: false,
        question: {
          text: "Поисковый запрос №4",
        },
        answer: {
          photo: "/src/data/contests_data/Чего тут ищешь/4.png",
        },
      },
      {
        id: "chego-tut-5",
        order: 5,
        played: false,
        question: {
          text: "Поисковый запрос №5",
        },
        answer: {
          photo: "/src/data/contests_data/Чего тут ищешь/5.png",
        },
      },
      {
        id: "chego-tut-6",
        order: 6,
        played: false,
        question: {
          text: "Поисковый запрос №6",
        },
        answer: {
          photo: "/src/data/contests_data/Чего тут ищешь/6.png",
        },
      },
      {
        id: "chego-tut-7",
        order: 7,
        played: false,
        question: {
          text: "Поисковый запрос №7",
        },
        answer: {
          photo: "/src/data/contests_data/Чего тут ищешь/7.png",
        },
      },
    ],
  },
  {
    id: "chivo-blyat",
    title: "Чиво блять",
    description:
      "Всем либо раздаются листочки, либо все пишут мне в личку. Нужно прослушать кусочек песни от определенной секунды до определенной секунды и написать его расшифровку словами. Кто указал больше всего правильных слов в отрывке, тот побеждает",
    points: 200,
    timeSec: null,
    tasks: [
      {
        id: "chivo-1",
        order: 1,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Чиво блять/Cadillac Retro Remix — MORGENSHTERN, Элджей.mp3",
            stops: [15, 25],
          },
        },
      },
      {
        id: "chivo-2",
        order: 2,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Чиво блять/Come Along Now — Lola Marois.mp3",
            stops: [15, 25],
          },
        },
      },
      {
        id: "chivo-3",
        order: 3,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Чиво блять/cotton eye joe — Rednex.mp3",
            stops: [15, 25],
          },
        },
      },
      {
        id: "chivo-4",
        order: 4,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Чиво блять/Godzilla — Eminem, Juice WRLD.mp3",
            stops: [15, 25],
          },
        },
      },
      {
        id: "chivo-5",
        order: 5,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Чиво блять/Liar — Little Big.mp3",
            stops: [15, 25],
          },
        },
      },
      {
        id: "chivo-6",
        order: 6,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Чиво блять/The Woodchuck Song — AronChupa, Little Sis Nora.mp3",
            stops: [15, 25],
          },
        },
      },
    ],
  },
  {
    id: "ya-lyubil-i-nenavidel",
    title: "Я любил и ненавидел",
    description:
      "Игроки заполняют анкету с вопросами. Затем выбирается один вопрос и воспроизводится песня если возможно, или просто озвучивается название песни. Все заполняют, кому принадлежит первая песня, кому вторая и так далее. Каждый игрок получает столько баллов, сколько он набрал правильных пересечений, исключая одно пересечение (так как в каждом вопросе есть вариант этого человека)",
    points: 100,
    timeSec: null,
    tasks: [
      {
        id: "ya-lyubil-1",
        order: 1,
        played: false,
        question: {
          text: "Анкетирование игроков",
        },
      },
    ],
  },
];
