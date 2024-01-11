import { create } from 'zustand'

export const useChainStore = create((set) => ({
  chain: [],
  set: (chain :  number[][]) => set(() => ({ chain })),
  reset: () => set({ chain: [] }),
}))