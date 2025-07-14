import { useChatStore } from "../../../store/Chat/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader/ChatHeader";
import MessageInput from "./MessageInput/MessageInput";
import MessageSkeleton from "./MessageSkeleton";
import { useAuthStore } from "../../../store/Auth/useAuthStore";
import { formatMessageTime } from "../../../lib/formatMessageTime";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser, onlineUsers } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isSentByAuthUser = message.senderId === authUser._id;
          const isSenderOnline = onlineUsers.includes(message.senderId);

          return (
            <div
              key={message._id || message.tempId || Math.random()}
              className={`chat ${isSentByAuthUser ? "chat-end" : "chat-start"}`}
              ref={messageEndRef}
            >
              {/* Avatar */}
              <div className="chat-image avatar relative">
                <div className="size-10 rounded-full border border-base-300 overflow-hidden">
                  <img
                    src={
                      isSentByAuthUser
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                  />
                </div>
                {isSenderOnline && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-zinc-800" />
                )}
              </div>

              {/* Timestamp */}
              <div className="chat-header mb-1">
                <time className="text-xs text-zinc-500 dark:text-zinc-400">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>

              {/* Chat bubble */}
              <div
                className={`chat-bubble flex flex-col ${
                  isSentByAuthUser
                    ? "bg-primary text-primary-content"
                    : "bg-base-200 text-base-content"
                }`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
