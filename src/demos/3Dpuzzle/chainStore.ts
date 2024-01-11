import { create } from 'zustand'

export const useChainStore = create((set) => ({
  chain: [],
  set: (chain :  number[][]) => set((_) => ({ chain })),
  reset: () => set({ chain: [] }),
}))