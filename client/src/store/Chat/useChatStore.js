import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios";
import { useAuthStore } from "../Auth/useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/get-users");
      set({ users: res.data['Data'] });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/get-messages/${userId}`);

      console.log("Message Response : ",res.data);

      set({ messages: res.data['Data'] });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
sendMessage: async ({ text, file }) => {
  const { selectedUser, messages } = get();

  const formData = new FormData();
  if (text) formData.append("text", text);
  if (file) formData.append("image", file);

  try {
    const res = await axiosInstance.post(
      `/messages/send-message/${selectedUser._id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    console.log("Message Response After sent:", res.data.Data);
    set({ messages: [...messages, res.data.Data.message] });
  } catch (error) {
    toast.error(error?.response?.data?.message || "Message send failed");
  }
},


 subscribeToMessages: () => {
  const { selectedUser } = get();
  if (!selectedUser) return;

  const socket = useAuthStore.getState().socket;

  socket.on("newMessage", (newMessage) => {
    const { authUser } = useAuthStore.getState();

    const isRelevant =
      (newMessage.senderId === selectedUser._id && newMessage.recieverId === authUser._id) ||
      (newMessage.senderId === authUser._id && newMessage.recieverId === selectedUser._id);

    if (!isRelevant) return;

    set({
      messages: [...get().messages, newMessage],
    });
  });
},

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));