import create from 'zustand';
import { PlayerRef } from '@remotion/player';

type PhoneModelStore = {
  ready: boolean;
  loading: boolean;
  backColor: string;
  wallpaper: null | string;
  text: null | string;
  audio: null | { base64: string; gender: string; language: string };
  player: null | PlayerRef;
  setReady: () => void;
  setBackColor: (color: string) => void;
  setWallpaper: (wallpaper: string) => void;
  setText: (text: string) => void;
  setAudio: (
    audio: null | { base64: string; gender: string; language: string },
  ) => void;
  setLoading: (loading: boolean) => void;
  setPlayer: (player: PlayerRef) => void;
  clear: () => void;
};

const initialState = {
  loading: false,
  backColor: '#364047',
  wallpaper: null,
  text: null,
  audio: null,
};

export const useStore = create<PhoneModelStore>((set) => ({
  ...initialState,
  player: null,
  ready: false,
  setReady: () => set({ ready: true }),
  setBackColor: (backColor) => set({ backColor }),
  setWallpaper: (wallpaper) => set({ wallpaper }),
  setText: (text) => set({ text }),
  setAudio: (audio) => set({ audio }),
  setLoading: (loading) => set({ loading }),
  setPlayer: (player) => set({ player }),
  clear: () => set(initialState),
}));
