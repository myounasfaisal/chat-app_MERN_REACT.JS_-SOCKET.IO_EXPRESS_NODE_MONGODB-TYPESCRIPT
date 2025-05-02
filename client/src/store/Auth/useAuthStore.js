import { create } from "zustand"
import { checkAuth, login, logout, signUp } from "./api/auth"

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isUserLoggedIn: false,
    isCheckingAuth: true,
    isLoggingIn: false,
    isSigningUp: false,

    checkAuth: () => checkAuth(set),

    signup: async (userDetails) => {
        await signUp(userDetails, set);
        if (get().authUser) return true;
        return false;
    },

    logout:async () => logout(set),

    login: async (userDetails) => {
        login(set, userDetails)
        if (get().authUser) return true;
        return false;
    }

}))