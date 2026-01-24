import { create } from "zustand";
import { contestsData } from "../data/contests";

export type MusicInfo = {
  link: string;
  stops: number[] | null;
  startTime?: number;
  endTime?: number;
};

export type QAContent = {
  text?: string;
  music?: MusicInfo;
  photo?: string;
};

export type Task = {
  id: string;
  order: number;
  played: boolean;
  question: QAContent;
  answer?: QAContent;
};

export type Contest = {
  id: string;
  title: string;
  description: string;
  points: number;
  timeSec: number | null;
  contestType?: "bomb" | "standard";
  tasks: Task[];
};

export type Player = {
  id: string;
  name: string;
  score: number;
};

type GameState = {
  players: Player[];
  deleteMode: boolean;
  contests: Contest[];
  playersOrder: string[];
  playersBarCollapsed: boolean;
  playersBarVertical: boolean;
  // Презентация конкурсов
  presentationMode: boolean;
  presentationStep: "title" | "round" | "intro" | "contests" | "finished";
  presentationContestIndex: number;
  // Таймер
  timerVisible: boolean;
  timerSeconds: number;
  timerRunning: boolean;
  timerInitialSeconds: number;
  // Бомба-таймер
  bombTimerVisible: boolean;
  bombTimerSeconds: number;
  bombTimerRunning: boolean;
  bombTimerTargetSeconds: number;
  bombTimerExploded: boolean;
  addPlayer: (name: string) => void;
  removePlayerById: (id: string) => void;
  setDeleteMode: (on: boolean) => void;
  adjustScore: (id: string, delta: number) => void;
  getSortedPlayers: () => Player[];
  setContests: (contests: Contest[]) => void;
  markTaskPlayed: (contestId: string, taskId: string) => void;
  setTaskPlayed: (contestId: string, taskId: string, played: boolean) => void;
  setPlayersOrder: (ids: string[]) => void;
  reorderPlayersByScore: () => void;
  setPlayersBarCollapsed: (collapsed: boolean) => void;
  setPlayersBarVertical: (vertical: boolean) => void;
  // Методы презентации
  startPresentation: () => void;
  nextPresentationStep: () => void;
  nextPresentationContest: () => void;
  endPresentation: () => void;
  // Методы таймера
  setTimerVisible: (visible: boolean) => void;
  setTimerSeconds: (seconds: number) => void;
  setTimerRunning: (running: boolean) => void;
  resetTimer: () => void;
  initTimer: (seconds: number) => void;
  // Методы бомбы-таймера
  setBombTimerVisible: (visible: boolean) => void;
  setBombTimerSeconds: (seconds: number) => void;
  setBombTimerRunning: (running: boolean) => void;
  startBombTimer: () => void;
  pauseBombTimer: () => void;
  resetBombTimer: () => void;
  setBombTimerExploded: (exploded: boolean) => void;
  // Методы localStorage
  saveGameState: () => void;
  loadGameState: () => void;
  resetGameState: () => void;
};

const generateId = () => Math.random().toString(36).slice(2, 10);

// Константы для localStorage
const STORAGE_KEY = "musical_quiz_game_state";

// Типы для сохранения состояния
type SavedGameState = {
  players: Player[];
  playersOrder: string[];
  contests: Contest[];
};

// Вспомогательные функции для работы с localStorage
const saveToStorage = (data: SavedGameState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Ошибка сохранения состояния игры:", error);
  }
};

const loadFromStorage = (): SavedGameState | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Ошибка загрузки состояния игры:", error);
    return null;
  }
};

const clearStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Ошибка очистки состояния игры:", error);
  }
};

export const useGameStore = create<GameState>((set, get) => ({
  players: [],
  deleteMode: false,
  contests: [],
  playersOrder: [],
  playersBarCollapsed: false,
  playersBarVertical: false,
  // Начальные значения презентации
  presentationMode: false,
  presentationStep: "title",
  presentationContestIndex: 0,
  // Начальные значения таймера
  timerVisible: false,
  timerSeconds: 60,
  timerRunning: false,
  timerInitialSeconds: 60,
  // Начальные значения бомбы-таймера
  bombTimerVisible: false,
  bombTimerSeconds: 0,
  bombTimerRunning: false,
  bombTimerTargetSeconds: 0,
  bombTimerExploded: false,
  addPlayer: (name) => {
    set((state) => {
      const id = generateId();
      const nextPlayers = [...state.players, { id, name, score: 0 }];
      const nextOrder = [...state.playersOrder, id];
      return { players: nextPlayers, playersOrder: nextOrder };
    });
    // Автосохранение
    setTimeout(() => get().saveGameState(), 0);
  },
  removePlayerById: (id) => {
    set((state) => ({
      players: state.players.filter((p) => p.id !== id),
      playersOrder: state.playersOrder.filter((pid) => pid !== id),
    }));
    // Автосохранение
    setTimeout(() => get().saveGameState(), 0);
  },
  setDeleteMode: (on) => set({ deleteMode: on }),
  adjustScore: (id, delta) => {
    set((state) => ({
      players: state.players.map((p) =>
        p.id === id ? { ...p, score: p.score + delta } : p
      ),
    }));
    // Автосохранение
    setTimeout(() => get().saveGameState(), 0);
  },
  getSortedPlayers: () => {
    const { players } = get();
    // Desc by score, stable by name
    return [...players].sort(
      (a, b) => b.score - a.score || a.name.localeCompare(b.name)
    );
  },
  setContests: (contests) => set({ contests }),
  markTaskPlayed: (contestId, taskId) => {
    set((state) => ({
      contests: state.contests.map((c) =>
        c.id === contestId
          ? {
              ...c,
              tasks: c.tasks.map((t) =>
                t.id === taskId ? { ...t, played: true } : t
              ),
            }
          : c
      ),
    }));
    // Автосохранение
    setTimeout(() => get().saveGameState(), 0);
  },
  setTaskPlayed: (contestId, taskId, played) => {
    set((state) => ({
      contests: state.contests.map((c) =>
        c.id === contestId
          ? {
              ...c,
              tasks: c.tasks.map((t) =>
                t.id === taskId ? { ...t, played } : t
              ),
            }
          : c
      ),
    }));
    // Автосохранение
    setTimeout(() => get().saveGameState(), 0);
  },
  setPlayersOrder: (ids) => {
    set({ playersOrder: ids });
    // Автосохранение
    setTimeout(() => get().saveGameState(), 0);
  },
  reorderPlayersByScore: () => {
    const { players } = get();
    const sorted = [...players].sort(
      (a, b) => b.score - a.score || a.name.localeCompare(b.name)
    );
    set({ playersOrder: sorted.map((p) => p.id) });
  },
  setPlayersBarCollapsed: (collapsed) =>
    set({ playersBarCollapsed: collapsed }),
  setPlayersBarVertical: (vertical) => set({ playersBarVertical: vertical }),
  // Методы презентации
  startPresentation: () => {
    set({
      presentationMode: true,
      presentationStep: "title",
      presentationContestIndex: 0,
    });
  },
  nextPresentationStep: () => {
    set((state) => {
      if (state.presentationStep === "title") {
        return { presentationStep: "round" };
      } else if (state.presentationStep === "round") {
        return { presentationStep: "intro" };
      } else if (state.presentationStep === "intro") {
        return { presentationStep: "contests" };
      }
      return state;
    });
  },
  nextPresentationContest: () => {
    set((state) => {
      const { contests, presentationContestIndex } = state;
      if (presentationContestIndex < contests.length - 1) {
        return { presentationContestIndex: presentationContestIndex + 1 };
      } else {
        return { presentationStep: "finished" };
      }
    });
  },
  endPresentation: () => {
    set({
      presentationMode: false,
      presentationStep: "title",
      presentationContestIndex: 0,
    });
  },
  // Методы таймера
  setTimerVisible: (visible) => set({ timerVisible: visible }),
  setTimerSeconds: (seconds) => set({ timerSeconds: seconds }),
  setTimerRunning: (running) => set({ timerRunning: running }),
  resetTimer: () => {
    const { timerInitialSeconds } = get();
    set({
      timerSeconds: timerInitialSeconds,
      timerRunning: false,
    });
  },
  initTimer: (seconds) => {
    set({
      timerInitialSeconds: seconds,
      timerSeconds: seconds,
      timerRunning: false,
      timerVisible: true,
    });
  },
  // Методы бомбы-таймера
  setBombTimerVisible: (visible) => set({ bombTimerVisible: visible }),
  setBombTimerSeconds: (seconds) => set({ bombTimerSeconds: seconds }),
  setBombTimerRunning: (running) => set({ bombTimerRunning: running }),
  startBombTimer: () => {
    // Генерируем случайное время от 40 до 120 секунд
    const randomTime = Math.floor(Math.random() * (120 - 40 + 1)) + 40;
    set({
      bombTimerSeconds: 0,
      bombTimerTargetSeconds: randomTime,
      bombTimerRunning: true,
      bombTimerExploded: false,
      bombTimerVisible: true,
    });
  },
  pauseBombTimer: () => {
    set({ bombTimerRunning: false });
  },
  resetBombTimer: () => {
    set({
      bombTimerSeconds: 0,
      bombTimerRunning: false,
      bombTimerExploded: false,
      bombTimerTargetSeconds: 0,
    });
  },
  setBombTimerExploded: (exploded) => set({ bombTimerExploded: exploded }),
  // Методы localStorage
  saveGameState: () => {
    const { players, playersOrder, contests } = get();
    const dataToSave: SavedGameState = {
      players,
      playersOrder,
      contests,
    };
    saveToStorage(dataToSave);
  },
  loadGameState: () => {
    const savedData = loadFromStorage();
    if (savedData) {
      set({
        players: savedData.players,
        playersOrder: savedData.playersOrder,
        contests: savedData.contests,
      });
    }
  },
  resetGameState: () => {
    clearStorage();
    set({
      players: [],
      playersOrder: [],
      contests: JSON.parse(JSON.stringify(contestsData)), // Перезагружаем конкурсы из исходных данных (глубокая копия)
      deleteMode: false,
      playersBarCollapsed: false,
      playersBarVertical: false,
      presentationMode: false,
      presentationStep: "title",
      presentationContestIndex: 0,
      timerVisible: false,
      timerSeconds: 60,
      timerRunning: false,
      timerInitialSeconds: 60,
      bombTimerVisible: false,
      bombTimerSeconds: 0,
      bombTimerRunning: false,
      bombTimerTargetSeconds: 0,
      bombTimerExploded: false,
    });
  },
}));
