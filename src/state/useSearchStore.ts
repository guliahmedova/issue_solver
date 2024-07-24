import { create } from 'zustand';

interface ISearchState {
    searchText: string;
    setSearchText: (text: string) => void;
};

export const useSearchStore = create<ISearchState>((set) => ({
    searchText: '',
    setSearchText: (text: string) => set({ searchText: text }),
}));