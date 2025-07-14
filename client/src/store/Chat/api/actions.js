import toast from "react-hot-toast";
import { axiosInstance } from "../../../lib/axios";
import { useAuthStore } from "../../Auth/useAuthStore";

export const chatActions = (set, get) => ({
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/get-users");
      set({ users: res.data.Data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/get-messages/${userId}`);
      set({ messages: res.data.Data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch messages");
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

      set({ messages: [...messages, res.data.Data.message] });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Message send failed");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    const { authUser, socket } = useAuthStore.getState();

    if (!selectedUser || !socket) return;

    socket.on("newMessage", (newMessage) => {
      const isRelevant =
        (newMessage.senderId === selectedUser._id && newMessage.recieverId === authUser._id) ||
        (newMessage.senderId === authUser._id && newMessage.recieverId === selectedUser._id);

      if (!isRelevant) return;

      set({ messages: [...get().messages, newMessage] });
    });
  },

  unsubscribeFromMessages: () => {
    const { socket } = useAuthStore.getState();
    if (socket) {
      socket.off("newMessage");
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
});
