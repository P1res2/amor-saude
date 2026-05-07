// store/userStore.ts
import { TUsuario } from "@/lib/models";
import { create } from "zustand";
import { persist } from "zustand/middleware"; // Adicione isso

interface UserState {
  user: TUsuario | null;
  setUser: (user: TUsuario) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => {
        set({ user: null });
        localStorage.removeItem("user-storage"); // Limpeza extra se quiser
      },
    }),
    {
      name: "user-storage", // Nome da chave no LocalStorage
      onRehydrateStorage: () => (state) => {
        // Isso garante que o estado foi carregado do localStorage
        console.log("Hidratação concluída");
      },
    },
  ),
);
