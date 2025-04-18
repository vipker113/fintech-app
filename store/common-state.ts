import { create } from "zustand";

export type TCommon = {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  setLoading: (isLoading: boolean) => void;
  setError: (isError: boolean, errorMessage: string) => void;
};

export const useGlobalStore = create<TCommon>((set) => ({
  isLoading: false,
  isError: false,
  errorMessage: "",
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (isError: boolean, errorMessage: string) =>
    set({ isError, errorMessage }),
}));
