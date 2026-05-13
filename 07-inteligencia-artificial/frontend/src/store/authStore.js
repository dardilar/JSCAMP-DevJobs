import { create } from "zustand";

export const useAuthStore = create((set) => ({
    //Estado
    isLoogedIn: false,
    
    //Funciones
    login: () => set({ isLoogedIn: true }),
    logout: () => set({ isLoogedIn: false }),
}));