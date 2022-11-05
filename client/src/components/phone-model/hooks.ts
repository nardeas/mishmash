import create from 'zustand';
import { TextureLoader } from 'three';
import { useLayoutEffect } from 'react';
import { useGLTF } from '@react-three/drei';

type PhoneModelStore = {
  backColor: string;
  wallpaper: null | string; // URL of the image
  setBackColor: (color: string) => void;
  setWallpaper: (wallpaper: string) => void;
};

export const usePhoneModelStore = create<PhoneModelStore>((set) => ({
  backColor: '#ff15d8',
  wallpaper: null,
  setBackColor: (backColor) => set({ backColor }),
  setWallpaper: (wallpaper) => set({ wallpaper }),
}));

export function usePhoneModelEffects() {
  const backColor = usePhoneModelStore((s) => s.backColor);
  const wallpaper = usePhoneModelStore((s) => s.wallpaper);
  const gltf = useGLTF('/scene.gltf');
  const { materials } = gltf as any;

  useLayoutEffect(() => {
    materials.Body.color.set(backColor);
  }, [backColor]); // eslint-disable-line react-hooks/exhaustive-deps

  useLayoutEffect(() => {
    if (wallpaper) {
      materials.Wallpaper.map = new TextureLoader().load(wallpaper);
    }
  }, [wallpaper]); // eslint-disable-line react-hooks/exhaustive-deps
}
