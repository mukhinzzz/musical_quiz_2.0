import type { Contest } from "../store/game";

export const contestsData: Contest[] = [
  {
    id: "desc-song",
    title: "Песня по описанию",
    description: "Угадайте песню по краткому описанию сюжета или настроения.",
    points: 300,
    timeSec: 60,
    tasks: Array.from({ length: 8 }).map((_, i) => ({
      id: `desc-${i + 1}`,
      order: i + 1,
      played: false,
      question: {
        text: `Описание №${i + 1}: Краткий намёк на песню...`,
      },
      answer: {
        text: `Ответ для задания №${i + 1}`,
      },
    })),
  },
  {
    id: "three-notes",
    title: "Угадай с трех нот",
    description: "Прослушайте короткий фрагмент и угадайте композицию.",
    points: 300,
    timeSec: 45,
    tasks: Array.from({ length: 10 }).map((_, i) => ({
      id: `three-${i + 1}`,
      order: i + 1,
      played: false,
      question: {
        music: {
          link: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          stops: [2, 4, 6],
        },
      },
    })),
  },
  {
    id: "photo-song",
    title: "Песня по кадру",
    description: "Определите песню по одному кадру или обложке.",
    points: 200,
    timeSec: null,
    tasks: Array.from({ length: 6 }).map((_, i) => ({
      id: `photo-${i + 1}`,
      order: i + 1,
      played: false,
      question: {
        photo:
          "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop&q=60",
      },
      answer: {
        text: `Название песни №${i + 1}`,
      },
    })),
  },
];
