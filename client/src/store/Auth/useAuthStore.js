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
import { connect, disconnect } from "./api/sockets";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      authUser: null,
      isUserLoggedIn: false,
      isCheckingAuth: false,
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
        connect(set,authUser);
      },


      disconnectSocket: () => {
        const { socket } = get();
        disconnect(set,socket);
      },
    }),
    {
      name: "auth-storage", 
      partialize: (state) => ({
        authUser: state.authUser,
        isUserLoggedIn: state.isUserLoggedIn,
      }),
    }
  )
);
