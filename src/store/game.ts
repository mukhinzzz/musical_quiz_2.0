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
  playersOrder: string[];
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
};

const generateId = () => Math.random().toString(36).slice(2, 10);

export const useGameStore = create<GameState>((set, get) => ({
  players: [],
  deleteMode: false,
  contests: [],
  playersOrder: [],
  addPlayer: (name) =>
    set((state) => {
      const id = generateId();
      const nextPlayers = [...state.players, { id, name, score: 0 }];
      const nextOrder = [...state.playersOrder, id];
      return { players: nextPlayers, playersOrder: nextOrder };
    }),
  removePlayerById: (id) =>
    set((state) => ({
      players: state.players.filter((p) => p.id !== id),
      playersOrder: state.playersOrder.filter((pid) => pid !== id),
    })),
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
  setTaskPlayed: (contestId, taskId, played) =>
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
    })),
  setPlayersOrder: (ids) => set({ playersOrder: ids }),
  reorderPlayersByScore: () => {
    const { players } = get();
    const sorted = [...players].sort(
      (a, b) => b.score - a.score || a.name.localeCompare(b.name)
    );
    set({ playersOrder: sorted.map((p) => p.id) });
  },
}));
