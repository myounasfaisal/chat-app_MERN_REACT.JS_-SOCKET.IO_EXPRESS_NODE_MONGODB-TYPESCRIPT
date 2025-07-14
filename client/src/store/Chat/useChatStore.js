import { create } from "zustand";
import { chatActions } from "./actions";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  ...chatActions(set, get),
}));
