import { create } from "zustand"
import { checkAuth, login as loginFn , logout, signUp, updateProfile } from "./api/auth"


export const useAuthStore = create((set, get) => ({
    authUser: null,
    isUserLoggedIn: false,
    isCheckingAuth: true,
    isLoggingIn: false,
    isSigningUp: false,
    isUpdatingProfile:false,
    onlineUsers:[],

    checkAuth: () => checkAuth(set),

    signup: async (userDetails) => {
        await signUp(userDetails, set);
        if (get().authUser) return true;
        return false;
    },

    logout: async () => logout(set),

    login: async (userDetails) => {
        await loginFn(set, userDetails)
        if (get().authUser) return true;
        return false;
    },

    updateProfile: async (userDetails) =>  await updateProfile(userDetails,set)

}))