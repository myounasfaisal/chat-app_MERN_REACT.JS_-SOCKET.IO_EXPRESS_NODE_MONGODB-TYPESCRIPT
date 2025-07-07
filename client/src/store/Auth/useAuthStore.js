import { create } from "zustand";
import { persist } from "zustand/middleware";
import { io } from "socket.io-client";

import {
  checkAuth,
  login as loginFn,
  logout as logoutFn,
  signUp,
  updateProfile,
} from "./api/auth";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5050" : "/";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      authUser: null,
      isUserLoggedIn: false,
      isCheckingAuth: true,
      isLoggingIn: false,
      isSigningUp: false,
      isUpdatingProfile: false,
      onlineUsers: [],
      socket: null,

      // === Auth Actions ===
      checkAuth: () => checkAuth(set, get),

      signup: async (userDetails) => {
        await signUp(userDetails, set, get);
        return get().authUser ? true : false;
      },

      login: async (userDetails) => {
        await loginFn(set, userDetails, get);
        return get().authUser ? true : false;
      },

      logout: async () => {
        await logoutFn(set, get);
        useAuthStore.persist.clearStorage(); // Clears localStorage
      },

      updateProfile: async (userDetails) => {
        await updateProfile(userDetails, set);
      },

      // === Socket Setup ===
      connectSocket: () => {
        const { authUser, socket } = get();
        if (!authUser || socket?.connected) return;

        const newSocket = io(BASE_URL, {
          query: { userId: authUser._id },
          withCredentials: true,
        });

        set({ socket: newSocket });

        newSocket.on("connect", () => {
          console.log("✅ Socket connected:", newSocket.id);
        });

        newSocket.on("disconnect", () => {
          console.log("❌ Socket disconnected");
        });

        newSocket.on("getOnlineUsers", (userIds) => {
          set({ onlineUsers: userIds });
        });
      },

      disconnectSocket: () => {
        const { socket } = get();
        if (socket && socket.connected) {
          socket.disconnect();
          set({ socket: null, onlineUsers: [] });
        }
      },
    }),
    {
      name: "auth-storage", // Storage key in localStorage
      partialize: (state) => ({
        authUser: state.authUser,
        isUserLoggedIn: state.isUserLoggedIn,
      }),
    }
  )
);
