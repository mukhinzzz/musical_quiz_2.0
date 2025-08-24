import type { Contest } from "../store/game";

export const contestsData: Contest[] = [
  {
    id: "kinologiya",
    title: "Кинология",
    description:
      "Назовите фильм/сериал/мультфильм/мультсериал, из которого песня",
    points: 150,
    timeSec: null,
    tasks: [
      {
        id: "kinologiya-1",
        order: 1,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Кинология/Battle Without Honor Or Humanity — Tomoyasu Hotei.mp3",
            stops: [],
          },
        },
        answer: {
          text: "Убить Билла",
        },
      },
      {
        id: "kinologiya-2",
        order: 2,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Кинология/Danza Kuduro — Don Omar, Lucenzo.mp3",
            stops: [],
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
            stops: [],
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
            stops: [],
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
            stops: [],
          },
        },
        answer: {
          text: "Достучаться до небес",
        },
      },
      {
        id: "kinologiya-6",
        order: 6,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Кинология/Main Title — Ramin Djawadi.mp3",
            stops: [],
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
            stops: [],
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
    description: "Назовите, на какую песню кавер",
    points: 150,
    timeSec: null,
    tasks: [
      {
        id: "kovry-1",
        order: 1,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Ковры/Enjoy The Silence — Lacuna Coil.mp3",
            stops: [],
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
            stops: [],
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
            stops: [],
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
            stops: [],
          },
        },
        answer: {
          text: "Joan Osborne - One of Us",
        },
      },
      {
        id: "kovry-5",
        order: 5,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Ковры/Timanttinen tähti — Laura Voutilainen.mp3",
            stops: [],
          },
        },
        answer: {
          text: "Валерия - Часики",
        },
      },
      {
        id: "kovry-6",
        order: 6,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Ковры/סוכריה — Roni Duani.mp3",
            stops: [],
          },
        },
        answer: {
          text: "Катя Лель - Мой мармеладный",
        },
      },
    ],
  },
  {
    id: "leksika",
    title: "Лексика",
    description: "Назовите песни, содержащие в тексте определенное слово",
    points: 50,
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
          text: "Хуй (похуй, нахуй, хуй, хуй, хуй)",
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
      "Популярные песни. Песня включается до первой фразы. Можно либо назвать исполнителя и песню, либо пропеть несколько строчек из нее",
    points: 150,
    timeSec: null,
    tasks: [
      {
        id: "skorostrel-1",
        order: 1,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Скорострел/1. Shallow — Lady Gaga, Bradley Cooper.mp3",
            stops: [18],
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
            stops: [16],
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
            stops: [57],
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
            stops: [17],
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
            stops: [31],
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
            stops: [19],
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
            stops: [13],
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
    description: "Называйте песни, содержащие в тексте слова из указанной темы",
    points: 50,
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
    points: 200,
    timeSec: null,
    tasks: [
      {
        id: "uznali-1",
        order: 1,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Узнали Согласны/1. Ева — Винтаж.mp3",
            stops: [],
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
            stops: [],
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
            stops: [],
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
            stops: [],
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
            stops: [],
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
            stops: [],
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
            stops: [],
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
      "Угадайте, от чего погибла звезда. Версии пишем в телеграм. За каждый неправильный ответ -50 очков",
    points: 300,
    timeSec: 60,
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
      "Угадай продолжение поискового запроса. За каждое угаданное слово (кроме служебных частей речи) получаешь очки",
    points: 150,
    timeSec: 60,
    tasks: [
      {
        id: "chego-tut-1",
        order: 1,
        played: false,
        question: {
          text: "Почему ранетки...",
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
          text: "Почему на концерте...",
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
          text: "Какой певец...",
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
          text: "Почему песня...",
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
          text: "Зачем петь...",
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
          text: "Песня...",
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
          text: "Любимая песня...",
        },
        answer: {
          photo: "/src/data/contests_data/Чего тут ищешь/7.png",
        },
      },
      {
        id: "chego-tut-8",
        order: 8,
        played: false,
        question: {
          text: "Почему Илья...",
        },
        answer: {
          photo: "/src/data/contests_data/Чего тут ищешь/8.png",
        },
      },
      {
        id: "chego-tut-9",
        order: 9,
        played: false,
        question: {
          text: "Я пел...",
        },
        answer: {
          photo: "/src/data/contests_data/Чего тут ищешь/9.png",
        },
      },
      {
        id: "chego-tut-10",
        order: 10,
        played: false,
        question: {
          text: "Что слушают...",
        },
        answer: {
          photo: "/src/data/contests_data/Чего тут ищешь/10.png",
        },
      },
    ],
  },
  {
    id: "chivo-blyat",
    title: "Чиво блять",
    description:
      "Слушайте отрывок и угадайте как можно больше слов из него. Слова писать в телеграм. Отрывок воспроизводится максимум три раза",
    points: 100,
    timeSec: null,
    tasks: [
      {
        id: "chivo-1",
        order: 1,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Чиво блять/Cadillac Retro Remix — MORGENSHTERN, Элджей.mp3",
            stops: [],
            startTime: 23,
            endTime: 32,
          },
        },
        answer: {
          text: `Ay, bitch, we got some пушки (пр-р, пау)
Пау-пау, попал по тушке (ха)
На мне ща две подушки (оу да)
Bitch, я висю, как молодой Пушкин (у)
Цепи висят на папе (е)
Копаем кэш лопатой (е)
Богатый, будто каппер (е)
Как там твоя зарплата?`,
        },
      },
      {
        id: "chivo-2",
        order: 2,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Чиво блять/Come Along Now — Lola Marois.mp3",
            stops: [],
            startTime: 47,
            endTime: 55,
          },
        },
        answer: {
          text: `Come along now`,
        },
      },
      {
        id: "chivo-3",
        order: 3,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Чиво блять/cotton eye joe — Rednex.mp3",
            stops: [],
            startTime: 0,
            endTime: 8,
          },
        },
        answer: {
          text: `If it hadn't been for Cotton-Eye Joe
I'd been married long time ago
Where did you come from, where did you go?
Where did you come from, Cotton-Eye Joe?`,
        },
      },
      {
        id: "chivo-4",
        order: 4,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Чиво блять/Godzilla — Eminem, Juice WRLD.mp3",
            stops: [],
            startTime: 176,
            endTime: 208,
          },
        },
        answer: {
          text: `Fill 'em with the venom and eliminate 'em, other words, I Minute Maid 'em
I don't wanna hurt 'em, but I did, I'm in a fit of rage, I'm murderin' again, nobody will evade
I'm finna kill 'em and dump all their fuckin' bodies in the lake
Obliteratin' everythin', incinerate a renegade
I'm here to make anybody who want it with the pen afraid
But don't nobody want it, but they're gonna get it anyway
'Cause I'm beginning to feel like I'm mentally ill
I'm Attila, kill or be killed, I'm a killer bee, the vanilla gorilla
You bringin' the killer within me outta me
You don't wanna be the enemy of the demon who entered me
And be on the receivin' end of me, what stupidity it'd be
Every bit of me's the epitome of a spitter
When I'm in the vicinity, motherfucker, you better duck
Or you finna be dead the minute you run into me
A hunnid percent of you is a fifth of a percent of me
I'm 'bout to fuckin' finish you, bitch, I'm unfadable
You wanna battle, I'm available, I'm blowin' up like an inflatable
I'm undebatable, I'm unavoidable, I'm unevadable
I'm on the toilet bowl, I got a trailer full of money
And I'm paid in full, I'm not afraid to pull a-`,
        },
      },
      {
        id: "chivo-5",
        order: 5,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Чиво блять/Liar — Little Big.mp3",
            stops: [],
            startTime: 64,
            endTime: 78,
          },
        },
        answer: {
          text: "Only living to get rich\nBuy this, buy that—it's in each\nAll these things they're gonna make you\nInto their own little bitch\nBuy that shit it'll make you better\nWhile they're rich ones, they get fatter\nPut the money in their banks\nFor their children to say panks (Grah-ka!)",
        },
      },
      {
        id: "chivo-6",
        order: 6,
        played: false,
        question: {
          music: {
            link: "/src/data/contests_data/Чиво блять/The Woodchuck Song — AronChupa, Little Sis Nora.mp3",
            stops: [],
            startTime: 0,
            endTime: 9,
          },
        },
        answer: {
          text: "How much wood would a woodchuck chuck\nIf a woodchuck could chuck wood?\nWoodchuck could chuck wood\nWoodchuck could chuck wood",
        },
      },
    ],
  },
  {
    id: "ya-lyubil-i-nenavidel",
    title: "Я любил и ненавидел",
    description: "Задаются вопросы из анкеты, которую вы заполняли",
    points: 1000,
    timeSec: null,
    tasks: [
      {
        id: "ya-lyubil-1",
        order: 1,
        played: false,
        question: {
          text: "Какая песня тебе нравится и тебе за это немного стыдно?",
        },
      },
      {
        id: "ya-lyubil-2",
        order: 2,
        played: false,
        question: {
          text: "Какая песня идеально подходит для будильника?",
        },
      },
      {
        id: "ya-lyubil-3",
        order: 3,
        played: false,
        question: {
          text: "Я терпеть не могу эту песню!",
        },
      },
      {
        id: "ya-lyubil-4",
        order: 4,
        played: false,
        question: {
          text: "Если бы про твою жизнь снимали фильм, какая песня бы звучала в трейлере?",
        },
      },
      {
        id: "ya-lyubil-5",
        order: 5,
        played: false,
        question: {
          text: "Самая кринжовая песня, которую ты когда-либо слышал/а?",
        },
      },
      {
        id: "ya-lyubil-6",
        order: 6,
        played: false,
        question: {
          text: "Под какого исполнителя коровы дают лучшее молоко?",
        },
      },
      {
        id: "ya-lyubil-7",
        order: 7,
        played: false,
        question: {
          text: "Отличная песня для секса с инопланетянами",
        },
      },
      {
        id: "ya-lyubil-8",
        order: 8,
        played: false,
        question: {
          text: "Дьявол включает эту песню самым отъявленным грешникам",
        },
      },
      {
        id: "ya-lyubil-9",
        order: 9,
        played: false,
        question: {
          text: "Если бы родители узнали, что мне в детстве нравилась эта песня, они бы сдали меня в детский дом",
        },
      },
      {
        id: "ya-lyubil-10",
        order: 10,
        played: false,
        question: {
          text: "Эту песню нужно сделать новым гимном России",
        },
      },
    ],
  },
];
