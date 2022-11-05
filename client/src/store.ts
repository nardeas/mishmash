import create from 'zustand';
import { PlayerRef } from '@remotion/player';

type PhoneModelStore = {
  ready: boolean;
  backColor: string;
  wallpaper: null | string; // URL of the image
  text: string;
  loading: boolean;
  player: null | PlayerRef;
  setReady: () => void;
  setBackColor: (color: string) => void;
  setWallpaper: (wallpaper: string) => void;
  setText: (text: string) => void;
  setLoading: (loading: boolean) => void;
  setPlayer: (player: PlayerRef) => void;
};

export const useStore = create<PhoneModelStore>((set) => ({
  ready: false,
  backColor: '#515c63',
  wallpaper: null,
  text: '',
  loading: false,
  player: null,
  setReady: () => set({ ready: true }),
  setBackColor: (backColor) => set({ backColor }),
  setWallpaper: (wallpaper) => set({ wallpaper }),
  setText: (text) => set({ text }),
  setLoading: (loading) => set({ loading }),
  setPlayer: (player) => set({ player }),
}));
