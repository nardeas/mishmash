import create from 'zustand';
import { useLayoutEffect } from 'react';
import { useGLTF } from '@react-three/drei';

type PhoneModelStore = {
  backColor: string;
  setBackColor: (color: string) => void;
};

export const usePhoneModelStore = create<PhoneModelStore>((set) => ({
  backColor: '#ff15d8',
  setBackColor: (backColor) => set({ backColor }),
}));

export function usePhoneModelColor() {
  const backColor = usePhoneModelStore((s) => s.backColor);
  const gltf = useGLTF('/scene.gltf');
  const { materials } = gltf as any;

  useLayoutEffect(() => {
    materials.Body.color.set(backColor);
  }, [backColor]); // eslint-disable-line react-hooks/exhaustive-deps
}
