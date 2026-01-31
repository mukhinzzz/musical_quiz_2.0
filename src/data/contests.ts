import type { Contest } from "../store/game";

export const contestsData: Contest[] = [
  {
    id: "plokho-konchil",
    title: "Плохо кончил",
    description:
      "Называйте слова по заданной теме и передавайте тотем. На ком взорвется бомба - тот лох",
    points: 50,
    timeSec: null,
    contestType: "bomb",
    tasks: [
      {
        id: "plokho-konchil-1",
        order: 1,
        played: false,
        question: {
          text: "Слова, начинающиеся на КОН (существительные, единственное число)",
        },
      },
      {
        id: "plokho-konchil-2",
        order: 2,
        played: false,
        question: {
          text: "Чисто новогодняя хуйня",
        },
      },
      {
        id: "plokho-konchil-3",
        order: 3,
        played: false,
        question: {
          text: "С высокой вероятностью вы найдете это в операционной",
        },
      },
      {
        id: "plokho-konchil-4",
        order: 4,
        played: false,
        question: {
          text: "Русские женские имена",
        },
      },
      {
        id: "plokho-konchil-5",
        order: 5,
        played: false,
        question: {
          text: "Предметы, явления и люди из мира Гарри Поттера",
        },
      },
      {
        id: "plokho-konchil-6",
        order: 6,
        played: false,
        question: {
          text: "Что можно найти у деда в коровнике?",
        },
      },
      {
        id: "plokho-konchil-7",
        order: 7,
        played: false,
        question: {
          text: "Все, что связано с наркоманией и наркоманами",
        },
      },
      {
        id: "plokho-konchil-8",
        order: 8,
        played: false,
        question: {
          text: "Фильмы",
        },
      },
      {
        id: "plokho-konchil-9",
        order: 9,
        played: false,
        question: {
          text: "То, что существовало в Средневековье (а сейчас не имеет такого значения)",
        },
      },
    ],
  },
  {
    id: "ty-menya-plokho-znayesh",
    title: "Ты меня не знаешь",
    description:
      "Вопросы про Сашу. За неправильные ответы баллы не списываются",
    points: 500,
    timeSec: 60,
    tasks: [
      {
        id: "ty-menya-1",
        order: 1,
        played: false,
        question: {
          text: "В этом фильме играют сразу два актера, которых Саша очень любит. В том числе ее самый любимый актер (назовите фильм и актеров). Один из актеров даже как-то заработал деньжат для меня",
        },
        answer: {
          text: "Пираты Карибского моря - Джонни Депп и Орландо Блум",
          photo: "/src/data/contests_data/Ты меня плохо знаешь/pirates.png",
        },
      },
      {
        id: "ty-menya-2",
        order: 2,
        played: false,
        question: {
          text: "Эта вкусная штука растет на природе, в саду, в огороде. В какой-то момент она изменила Сашину жизнь. Назовите что это",
        },
        answer: {
          text: "Смородина",
          photo: "/src/data/contests_data/Ты меня плохо знаешь/currant.jpg",
        },
      },
      {
        id: "ty-menya-3",
        order: 3,
        played: false,
        question: {
          text: "Эта зарубежная танцевальная песня была выпущена и стала очень популярной в 2010 году. Потом эта песня снова завирусилась в 2020 году из-за мема. Сейчас этой песней Саша извещает мир, что пора спать",
        },
        answer: {
          text: "Tony Igy - Astronomia",
          photo: "/src/data/contests_data/Ты меня плохо знаешь/coffin.jpg",
        },
      },
      {
        id: "ty-menya-4",
        order: 4,
        played: false,
        question: {
          text: "Именно в этом месте Саша бы работала, если бы не пошла в медицину",
        },
        answer: {
          text: "IKEA",
          photo: "/src/data/contests_data/Ты меня плохо знаешь/ikea.jpg",
        },
      },
      {
        id: "ty-menya-5",
        order: 5,
        played: false,
        question: {
          text: "Назовите любой предмет, который Саша продала на авито в прошлом году (правильность ответа проверяет Саша)",
        },
        answer: {
          text: "АХХАХХХАХХАХХХАХХХАХАХАХ",
          photo: "/src/data/contests_data/Ты меня плохо знаешь/ahahah.jpg",
        },
      },
      {
        id: "ty-menya-6",
        order: 6,
        played: false,
        question: {
          text: "Назовите любую компьютерную игру, в которую Саша играла за последние пять лет (дольше 10 минут)",
        },
        answer: {
          text: "Кузя Жукодром, Hogwarts Legacy, Герои меча и магии",
          photo: "/src/data/contests_data/Ты меня плохо знаешь/bukazoom.jpg",
        },
      },
      {
        id: "ty-menya-7",
        order: 7,
        played: false,
        question: {
          text: "Назовите спорт, которому Саша посвятила больше всего времени",
        },
        answer: {
          text: "Плавание",
          photo: "/src/data/contests_data/Ты меня плохо знаешь/swimming.jpg",
        },
      },
      {
        id: "ty-menya-8",
        order: 8,
        played: false,
        question: {
          text: "Назовите продукт, который Саша разлюбила пару лет назад и которого теперь никогда нет на нашем столе (я его тоже не люблю)",
        },
        answer: {
          text: "Болгарский перец",
          photo: "/src/data/contests_data/Ты меня плохо знаешь/pepper.jpg",
        },
      },
      {
        id: "ty-menya-9",
        order: 9,
        played: false,
        question: {
          text: "Назовите голливудский фильм, который Саша наотрез отказывается пересматривать потому что фильм говно (он на 18-м месте в ТОП-250 Кинопоиска, а его режиссер снимал Крестного отца)",
        },
        answer: {
          text: "Волк с Уолл-стрит",
          photo: "/src/data/contests_data/Ты меня плохо знаешь/wolf.jpg",
        },
      },
      {
        id: "ty-menya-10",
        order: 10,
        played: false,
        question: {
          text: "Эту пиццу Саша любит больше всего, но с нее всегда все сыпется, льется и вообще ее невозможно есть нормально",
        },
        answer: {
          text: "Страчателла с томатами",
          photo: "/src/data/contests_data/Ты меня плохо знаешь/pizza.webp",
        },
      },
    ],
  },
  {
    id: "lichnosti-muzyka",
    title: "Личности: Музыка",
    description: "Угадайте личность или персонажа",
    points: 500,
    timeSec: 60,
    tasks: [
      {
        id: "muzyka-1",
        order: 1,
        played: false,
        question: {
          text: "Очень высока вероятность, что вы слышали ее песню за прошлые 30 дней. Гораздо ниже вероятность, что вы услышите эту песню в следующие 30 дней. Это песня 1994 года и ее прослушивания до сих пор приносят исполнительнице примерно 2 500 000$ каждый год",
        },
        answer: {
          text: "Марайя Керри",
          photo: "/src/data/contests_data/Личности/Музыка/mariah_carey.jpg",
        },
      },
      {
        id: "muzyka-2",
        order: 2,
        played: false,
        question: {
          text: "Молодая певица с синдромом Туррета и отрешенным взглядом. На ее концерт однажды попал даже Вова Махровый",
        },
        answer: {
          text: "Билли Айлиш",
          photo: "/src/data/contests_data/Личности/Музыка/billie_eilish.png",
        },
      },
      {
        id: "muzyka-3",
        order: 3,
        played: false,
        question: {
          text: "Один из нарядов этой поп-звезды резко не понравился зоозащитникам. До нее никто такого не надевал",
        },
        answer: {
          text: "Леди Гага",
          photo: "/src/data/contests_data/Личности/Музыка/lady_gaga.jpg",
        },
      },
      {
        id: "muzyka-4",
        order: 4,
        played: false,
        question: {
          text: "Этот известный композитор упоминается в песнях группы Ленинград",
        },
        answer: {
          text: "Глинка или Бах",
          photo: "/src/data/contests_data/Личности/Музыка/glinka.jpg",
        },
      },
      {
        id: "muzyka-5",
        order: 5,
        played: false,
        question: {
          text: "Был артистом российской эстрады, потом политиком, а потом стал человеком-мемом, который плотно ассоциируется с детскими пирамидками",
        },
        answer: {
          text: "Иосиф Кобзон",
          photo: "/src/data/contests_data/Личности/Музыка/kobzon.jpg",
        },
      },
    ],
  },
  {
    id: "lichnosti-kino",
    title: "Личности: Кино",
    description: "Угадайте личность или персонажа",
    points: 500,
    timeSec: 60,
    tasks: [
      {
        id: "kino-1",
        order: 1,
        played: false,
        question: {
          text: "Создатель таких великих фильмов как \"Беременный\" (рейтинг 2.5), \"Защитники\" (рейтинг 2.9), \"Тот еще Карлсон!\" (рейтинг 2.6). Ненавидит фильмы Тарковского, так как считает это деградирующим кинематографом",
        },
        answer: {
          text: "Сарик Андреасян",
          photo: "/src/data/contests_data/Личности/Кино/sarik.jpg",
        },
      },
      {
        id: "kino-2",
        order: 2,
        played: false,
        question: {
          text: "Режиссер, не окончивший среднюю школу и по его словам \"ненавидящий насилие\". Несмотря на это снял много кровавых фильмов, в которых полно сцен жестокости. Почти в каждом его фильме присутствует сцена, снятая из багажника автомобиля",
        },
        answer: {
          text: "Квентин Тарантино",
          photo: "/src/data/contests_data/Личности/Кино/tarantino.jpg",
        },
      },
      {
        id: "kino-3",
        order: 3,
        played: false,
        question: {
          text: "Отец этого режиссера был детским писателем (написал \"Дядю Степу\") и написал текст гимна Советского союза. Этот режиссер очень известен в России, но в последнее время гоняет бесов",
        },
        answer: {
          text: "Никита Михалков",
          photo: "/src/data/contests_data/Личности/Кино/mihalkov.jpeg",
        },
      },
      {
        id: "kino-4",
        order: 4,
        played: false,
        question: {
          text: "Известный голливудский актер, британец. Участвовал в гонках на внедорожниках от Якутска до Оймякона, так как всегда хотел побывать в самом холодном месте мира. В одном из фильмов этот актер играет двух братьев-близнецов, один из которых психопат, а второй уравновешенный",
        },
        answer: {
          text: "Том Харди",
          photo: "/src/data/contests_data/Личности/Кино/hardy.jpg",
        },
      },
      {
        id: "kino-5",
        order: 5,
        played: false,
        question: {
          text: "Актер ставший дико популярным из-за громкого сериала 2010х. Учит людей нестандартно срать. Мемом стала его фамилия, которую никто блять не в силах с первого раза произнести",
        },
        answer: {
          text: "Бенедикт Камбербэтч",
          photo: "/src/data/contests_data/Личности/Кино/cumberbatch.jpg",
        },
      },
    ],
  },
  {
    id: "lichnosti-igry",
    title: "Личности: Игры",
    description: "Угадайте личность или персонажа",
    points: 500,
    timeSec: 60,
    tasks: [
      {
        id: "igry-1",
        order: 1,
        played: false,
        question: {
          text: "Самый известный мем с этим летсплеером родился, когда он попробовал чай с индийскими специями",
        },
        answer: {
          text: "Дмитрий Куплинов",
          photo: "/src/data/contests_data/Личности/Игры/kuplinov.jpg",
        },
      },
      {
        id: "igry-2",
        order: 2,
        played: false,
        question: {
          text: "Гений",
        },
        answer: {
          text: "Кодзима",
          photo: "/src/data/contests_data/Личности/Игры/kodzima.jpg",
        },
      },
      {
        id: "igry-3",
        order: 3,
        played: false,
        question: {
          text: "Этот персонаж обрел огромную популярность, так как в игру с ним можно было поиграть дома на телевизоре, не имея приставки. В дальнейшем с ним было выпущено большое количество детских игр. Одна из фраз персонажа: \"Держи хвост пистолетом\"",
        },
        answer: {
          text: "Кузя",
          photo: "/src/data/contests_data/Личности/Игры/kuzya.jpg",
        },
      },
      {
        id: "igry-4",
        order: 4,
        played: false,
        question: {
          text: "В играх и мультиках с этим персонажем вместо монет ты собираешь кольца. А главный друг этого персонажа - лиса с несколькими хвостами",
        },
        answer: {
          text: "Соник",
          photo: "/src/data/contests_data/Личности/Игры/sonic.png",
        },
      },
      {
        id: "igry-5",
        order: 5,
        played: false,
        question: {
          text: "В русском переводе этого персонажа озвучивает тот же чел, что и \"Битву экстрасенсов\". Между битвой экстрасенсов и этой игрой и правда есть много общего... Одна из самых известных фраз этого персонажа: \"Ламберт, Ламберт, хер моржовый... Ламберт, Ламберт, вредный хуй\"",
        },
        answer: {
          text: "Ведьмак",
          photo: "/src/data/contests_data/Личности/Игры/witcher.jpg",
        },
      },
    ],
  },
  {
    id: "lichnosti-multiki",
    title: "Личности: Мультики",
    description: "Угадайте личность или персонажа",
    points: 500,
    timeSec: 60,
    tasks: [
      {
        id: "multiki-1",
        order: 1,
        played: false,
        question: {
          text: "Один сосед этого персонажа экстремально токсичный, второй экстремально тупой, подруга этого персонажа дерется в стиле кунг-фу, а домашнее животное издает абсолютно нетипичные звуки",
        },
        answer: {
          text: "Спанч Боб",
          photo: "/src/data/contests_data/Личности/Мультики/spongebob.webp",
        },
      },
      {
        id: "multiki-2",
        order: 2,
        played: false,
        question: {
          text: "Он живет в какой-то круглой хуйне, появляется из нее только по вызову, а потом ебашит всех током",
        },
        answer: {
          text: "Пикачу",
          photo: "/src/data/contests_data/Личности/Мультики/pikachu.jpg",
        },
      },
      {
        id: "multiki-3",
        order: 3,
        played: false,
        question: {
          text: "У него есть хозяйка, которая появляется очень редко и только чтобы вставить ему пизды. Никто никогда не видел ее лица, так как значительная часть хозяйки не помещается в кадр",
        },
        answer: {
          text: "Том",
          photo: "/src/data/contests_data/Личности/Мультики/tom.jpg",
        },
      },
      {
        id: "multiki-4",
        order: 4,
        played: false,
        question: {
          text: "Добрый и пузатый персонаж, который не умеет говорить, но владеет силами природы и имеет домашнее животное, способное превращаться в автобус",
        },
        answer: {
          text: "Тоторо",
          photo: "/src/data/contests_data/Личности/Мультики/totoro.jpg",
        },
      },
      {
        id: "multiki-5",
        order: 5,
        played: false,
        question: {
          text: "Самый быстрый работник департамента автотранспортных средств",
        },
        answer: {
          text: "Блиц",
          photo: "/src/data/contests_data/Личности/Мультики/blitz.jpg",
        },
      },
    ],
  },
  {
    id: "lichnosti-meditsina",
    title: "Личности: Медицина",
    description: "Угадайте личность или персонажа",
    points: 500,
    timeSec: 60,
    tasks: [
      {
        id: "meditsina-1",
        order: 1,
        played: false,
        question: {
          text: "Если в следующей жизни этот человек станет десертом, то он будет вареньем, чтобы его можно было намазывать",
        },
        answer: {
          text: "Вишневский",
          photo: "/src/data/contests_data/Личности/Медицина/vishnevskiy.webp",
        },
      },
      {
        id: "meditsina-2",
        order: 2,
        played: false,
        question: {
          text: "Приятный дяденька с телевизора. После просмотра хочется мазаться чесноком и хлебнуть мочи",
        },
        answer: {
          text: "Малахов",
          photo: "/src/data/contests_data/Личности/Медицина/malakhov.jpg",
        },
      },
      {
        id: "meditsina-3",
        order: 3,
        played: false,
        question: {
          text: "В Санкт-Петербурге есть целых две больницы, посвященных этому человеку. В одной из них умереть будет значительно проще",
        },
        answer: {
          text: "Боткин",
          photo: "/src/data/contests_data/Личности/Медицина/botkin.jpg",
        },
      },
      {
        id: "meditsina-4",
        order: 4,
        played: false,
        question: {
          text: "Этот человек первым обнаружил причину холеры и способ ее передачи, остановив эпидемию в городе. Спустя столетия в \"Игре престолов\" появится персонаж, которого будут звать также. В сериале этот персонаж будет встречаться с девушкой, на которой он женат в реальной жизни",
        },
        answer: {
          text: "Джон Сноу",
          photo: "/src/data/contests_data/Личности/Медицина/snow.jpg",
        },
      },
      {
        id: "meditsina-5",
        order: 5,
        played: false,
        question: {
          text: "У всех палки как палки, а у него пиздец какие живучие",
        },
        answer: {
          text: "Кох",
          photo: "/src/data/contests_data/Личности/Медицина/koch.jpg",
        },
      },
    ],
  },
  {
    id: "lichnosti-literatura",
    title: "Личности: Литература",
    description: "Угадайте личность или персонажа",
    points: 500,
    timeSec: 60,
    tasks: [
      {
        id: "literatura-1",
        order: 1,
        played: false,
        question: {
          text: "Эта женщина обожает горячее дыхание мопсов и плодить макулатуру пачками",
        },
        answer: {
          text: "Дарья Донцова",
          photo: "/src/data/contests_data/Личности/Литература/dontsova.jpg",
        },
      },
      {
        id: "literatura-2",
        order: 2,
        played: false,
        question: {
          text: "Заработала кучу денег на книгах, а потом стала сраться в твиттере с любителями сраться в твиттере по теме повесточки",
        },
        answer: {
          text: "Роулинг",
          photo: "/src/data/contests_data/Личности/Литература/rowling.jpg",
        },
      },
      {
        id: "literatura-3",
        order: 3,
        played: false,
        question: {
          text: "Создала персонажа, с которым хотела секас каждая вторая тринадцатилетняя девчонка. 15 лет назад фильмы по книгам этой писательницы смотрелись с серьезным вдохновленным ебалом, а сейчас весь фильм чисто мем",
        },
        answer: {
          text: "Стефани Майер",
          photo: "/src/data/contests_data/Личности/Литература/mayer.jpg",
        },
      },
      {
        id: "literatura-4",
        order: 4,
        played: false,
        question: {
          text: "Бородач с девизом в последние десять лет: \"Да всё пацаны, я скоро всё допишу, просто мне лениво пиздец……………\"",
        },
        answer: {
          text: "Джордж Мартин",
          photo: "/src/data/contests_data/Личности/Литература/martin.jpg",
        },
      },
      {
        id: "literatura-5",
        order: 5,
        played: false,
        question: {
          text: "Писал как романы, так и книги по истории России. Жестко ненавидит власть, и это взаимно. Настоящая фамилия звучит по-грузински. По одному его произведению сняли фильм - и место, где его снимали, стало очень популярным среди туристов, даже Саша хотела туда поехать",
        },
        answer: {
          text: "Борис Акунин",
          photo: "/src/data/contests_data/Личности/Литература/akunin.jpg",
        },
      },
    ],
  },
  {
    id: "lichnosti-nauka",
    title: "Личности: Наука",
    description: "Угадайте личность или персонажа",
    points: 500,
    timeSec: 60,
    tasks: [
      {
        id: "nauka-1",
        order: 1,
        played: false,
        question: {
          text: "Этот известный человек был на острове Эпштейна, чем породил огромное количество мемов, так как его очень сложно представить участвующим в оргии",
        },
        answer: {
          text: "Стивен Хокинг",
          photo: "/src/data/contests_data/Личности/Наука/hawking.webp",
        },
      },
      {
        id: "nauka-2",
        order: 2,
        played: false,
        question: {
          text: "Этот популяризатор науки стал гораздо более известен, когда появились обои с ним",
        },
        answer: {
          text: "Ян Топлес",
          photo: "/src/data/contests_data/Личности/Наука/toples.jpg",
        },
      },
      {
        id: "nauka-3",
        order: 3,
        played: false,
        question: {
          text: "Он изобрел то, что лежит у меня в морозилке и не замерзает",
        },
        answer: {
          text: "Менделеев",
          photo: "/src/data/contests_data/Личности/Наука/mendeleev.jpeg",
        },
      },
      {
        id: "nauka-4",
        order: 4,
        played: false,
        question: {
          text: "Это герой мультсериала, который является безумным ученым, строит планы по захвату мира с помощью своих изобретений, но очень часто все рушится из-за дружка-дурачка. Герой является животным, которого люди считают вредителем",
        },
        answer: {
          text: "Брейн",
          photo: "/src/data/contests_data/Личности/Наука/brain.jpg",
        },
      },
      {
        id: "nauka-5",
        order: 5,
        played: false,
        question: {
          text: "Герой одного из мини-сериалов, обычно предстает в очках, белом халате и шапочке. Почти не получает зарплату, но уверен, что ему за его разработки такую премию дадут...",
        },
        answer: {
          text: "Инженер",
          photo: "/src/data/contests_data/Личности/Наука/engineer.jpg",
        },
      },
    ],
  },
  {
    id: "lichnosti-politika",
    title: "Личности: Политика",
    description: "Угадайте личность или персонажа",
    points: 500,
    timeSec: 60,
    tasks: [
      {
        id: "politika-1",
        order: 1,
        played: false,
        question: {
          text: "Этот политик снялся в фильме Один дома 2 в короткой роли в качестве самого себя",
        },
        answer: {
          text: "Дональд Трамп",
          photo: "/src/data/contests_data/Личности/Политика/tramp.jpg",
        },
      },
      {
        id: "politika-2",
        order: 2,
        played: false,
        question: {
          text: "Президент одной из стран, который в прошлом году под камерами отхватил пиздюлей от жены",
        },
        answer: {
          text: "Эммануэль Макрон",
          photo: "/src/data/contests_data/Личности/Политика/macron.webp",
        },
      },
      {
        id: "politika-3",
        order: 3,
        played: false,
        question: {
          text: "Существует фото, где этот политик смотрит \"Рика и Морти\" сидя в самолете. Появлялся на публике в пиратской повязке",
        },
        answer: {
          text: "Алексей Навальный",
          photo: "/src/data/contests_data/Личности/Политика/navalny.webp",
        },
      },
      {
        id: "politika-4",
        order: 4,
        played: false,
        question: {
          text: "На жизнь этого политика было совершено покушение более 600 раз, в итоге он умер в 90 лет по естественным причинам",
        },
        answer: {
          text: "Фидель Кастро",
          photo: "/src/data/contests_data/Личности/Политика/castro.jpg",
        },
      },
      {
        id: "politika-5",
        order: 5,
        played: false,
        question: {
          text: "Врач-офтальмолог, случайно попавший в кресло президента. После своей незапланированной отставки стал по слухам большим любителем видеоигр, а по сюжетам мемов обычно доебывает Януковича в Ростове",
        },
        answer: {
          text: "Башар Асад",
          photo: "/src/data/contests_data/Личности/Политика/asad.webp",
        },
      },
    ],
  },
  {
    id: "lichnosti-biznes",
    title: "Личности: Бизнес",
    description: "Угадайте личность или персонажа",
    points: 500,
    timeSec: 60,
    tasks: [
      {
        id: "biznes-1",
        order: 1,
        played: false,
        question: {
          text: "Он назвал своего сына так: X Æ A-12 и какое-то время был в отношениях с Эмбер Херд",
        },
        answer: {
          text: "Илон Маск",
          photo: "/src/data/contests_data/Личности/Бизнес/mask.jpg",
        },
      },
      {
        id: "biznes-2",
        order: 2,
        played: false,
        question: {
          text: "Делал пельмени, делал пиво, пережил рак крови и теперь капает капли в глаза каждые 15 минут",
        },
        answer: {
          text: "Олег Тиньков",
          photo: "/src/data/contests_data/Личности/Бизнес/tinkov.jpg",
        },
      },
      {
        id: "biznes-3",
        order: 3,
        played: false,
        question: {
          text: "Пиздилась с мужем за процент от бизнеса, который скоро поглотит всю Россию. По вечерам слегка светится фиолетовым",
        },
        answer: {
          text: "Светлана Бакальчук",
          photo: "/src/data/contests_data/Личности/Бизнес/bakalchuk.jpg",
        },
      },
      {
        id: "biznes-4",
        order: 4,
        played: false,
        question: {
          text: "Окончил филологический факультет СПБГУ, владелец двух стульев с пиками точеными и хуями дрочеными, когда-то кидался деньгами в людей",
        },
        answer: {
          text: "Павел Дуров",
          photo: "/src/data/contests_data/Личности/Бизнес/durov.jpeg",
        },
      },
      {
        id: "biznes-5",
        order: 5,
        played: false,
        question: {
          text: "Бывший владелец футбольного клуба Челси, гражданин России, Израиля и Португалии, в начале войны был одним из посредников на переговорах России и Украины",
        },
        answer: {
          text: "Роман Абрамович",
          photo: "/src/data/contests_data/Личности/Бизнес/abramovich.webp",
        },
      },
      {
        id: "biznes-6",
        order: 6,
        played: false,
        question: {
          text: "Он продолжил дело египтян, а еще воскресил мамонтов по всему постсоветскому пространству",
        },
        answer: {
          text: "Сергей Мавроди",
          photo: "/src/data/contests_data/Личности/Бизнес/mavrodi.jpg",
        },
      },
    ],
  },
  {
    id: "lichnosti-shou-biznes",
    title: "Личности: Шоу-бизнес",
    description: "Угадайте личность или персонажа",
    points: 500,
    timeSec: 60,
    tasks: [
      {
        id: "shou-1",
        order: 1,
        played: false,
        question: {
          text: "Человек-паук развел ее на огромную сумму денег, а потом был задержан у здания суда",
        },
        answer: {
          text: "Лариса Долина",
          photo: "/src/data/contests_data/Личности/Шоу-бизнес/dolina.jpg",
        },
      },
      {
        id: "shou-2",
        order: 2,
        played: false,
        question: {
          text: "Сосала микрофон на сцене, снимала порно, инсценировала свое ограбление, а сейчас главная защитница традиционных ценностей",
        },
        answer: {
          text: "Инстасамка",
          photo: "/src/data/contests_data/Личности/Шоу-бизнес/instasamka.jpg",
        },
      },
      {
        id: "shou-3",
        order: 3,
        played: false,
        question: {
          text: "После мощнейших пиздюлей со всех сторон продала свой Ламборджини и уехала вести передачу о жизни в деревне",
        },
        answer: {
          text: "Ивлеева",
          photo: "/src/data/contests_data/Личности/Шоу-бизнес/ivleeva.jpg",
        },
      },
      {
        id: "shou-4",
        order: 4,
        played: false,
        question: {
          text: "Певица, предпринимательница, актриса, писательница, телеведущая, радиоведущая, блогерша, криптобизнесменша, но не дай бог с ней встретиться...",
        },
        answer: {
          text: "Бузова",
          photo: "/src/data/contests_data/Личности/Шоу-бизнес/buzova.jpg",
        },
      },
      {
        id: "shou-5",
        order: 5,
        played: false,
        question: {
          text: "Такая спортивная устраивала марафоны и прибежала в тюрьму жесть...",
        },
        answer: {
          text: "Блиновская",
          photo: "/src/data/contests_data/Личности/Шоу-бизнес/blinovskaya.jpg",
        },
      },
    ],
  },
];
