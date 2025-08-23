import { create } from "zustand";

export type MusicInfo = {
  link: string;
  stops: number[] | null;
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
  addPlayer: (name: string) => void;
  removePlayerById: (id: string) => void;
  setDeleteMode: (on: boolean) => void;
  adjustScore: (id: string, delta: number) => void;
  getSortedPlayers: () => Player[];
  setContests: (contests: Contest[]) => void;
  markTaskPlayed: (contestId: string, taskId: string) => void;
};

const generateId = () => Math.random().toString(36).slice(2, 10);

export const useGameStore = create<GameState>((set, get) => ({
  players: [],
  deleteMode: false,
  contests: [],
  addPlayer: (name) =>
    set((state) => ({
      players: [...state.players, { id: generateId(), name, score: 0 }],
    })),
  removePlayerById: (id) =>
    set((state) => ({ players: state.players.filter((p) => p.id !== id) })),
  setDeleteMode: (on) => set({ deleteMode: on }),
  adjustScore: (id, delta) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === id ? { ...p, score: p.score + delta } : p
      ),
    })),
  getSortedPlayers: () => {
    const { players } = get();
    // Desc by score, stable by name
    return [...players].sort(
      (a, b) => b.score - a.score || a.name.localeCompare(b.name)
    );
  },
  setContests: (contests) => set({ contests }),
  markTaskPlayed: (contestId, taskId) =>
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
    })),
}));
