import { create } from "zustand";

type CompteurState = {
  valeur: number;
  incrementer: () => void;
};

// Exemple de store zustand : à remplacer par l'état de l'app.
export const useCompteurStore = create<CompteurState>((set) => ({
  valeur: 0,
  incrementer: () => set((state) => ({ valeur: state.valeur + 1 })),
}));
