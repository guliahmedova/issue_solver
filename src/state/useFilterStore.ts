import create from "zustand";

interface RequestsState {
  filterDatasByZustand: any;
  setfilterDatasByZustand: (data: any) => void;
}

export const useFilterStore = create<RequestsState>(set => ({
  filterDatasByZustand: null,
  setfilterDatasByZustand: data => set({ filterDatasByZustand: data }),
}));