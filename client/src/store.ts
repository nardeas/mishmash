import create from 'zustand';

type PhoneModelStore = {
  ready: boolean;
  backColor: string;
  wallpaper: null | string; // URL of the image
  text: string;
  loading: boolean;
  setReady: () => void;
  setBackColor: (color: string) => void;
  setWallpaper: (wallpaper: string) => void;
  setText: (text: string) => void;
  setLoading: (loading: boolean) => void;
};

export const useStore = create<PhoneModelStore>((set) => ({
  ready: false,
  backColor: '#515c63',
  wallpaper: null,
  text: '',
  loading: false,
  setReady: () => set({ ready: true }),
  setBackColor: (backColor) => set({ backColor }),
  setWallpaper: (wallpaper) => set({ wallpaper }),
  setText: (text) => set({ text }),
  setLoading: (loading) => set({ loading }),
}));
