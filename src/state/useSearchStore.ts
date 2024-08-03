import { create } from 'zustand';

interface searchState {
  searchDatas: any;
  setsearchDatas: (data: any) => void;
};

export const useSearchStore = create<searchState>(set => ({
    searchDatas: null,
  setsearchDatas: data => set({ searchDatas: data }),
}));