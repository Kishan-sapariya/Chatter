import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import MessageSkeleton from "./skeleton/MessageSkeleton";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import image from "../assets/image.png";
import { formatMessageTime } from "../lib/utils";
import useAuthStore from "../store/useAuthStore";

const ChatContainer = () => {
  const {
    getMessages,
    messages,
    isMessagesLoading,
    selectedUser,
    isSidebarOpen,
    setSideBarOpen,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();

  const messageEndRef = useRef(null);
  const messageContainerRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      messageEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest"
      });
    }
  }, [messages]);

  if (isMessagesLoading)
    return (
      <div className={`h-screen w-[100%] p-3 ${isSidebarOpen ? "hidden" : ""}`}>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );

  return (
    <div ref={messageContainerRef} className={`h-[85vh] w-[100%] flex flex-col justify-between p-3${isSidebarOpen ? "hidden sm:flex" : ""}`}>
      <ChatHeader />
      <div className="flex-1 overflow-y-auto sm:p-4 mb-2 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            ref={(node) => {
              if (node && message._id === messages[messages.length - 1]._id) {
                messageEndRef.current = node;
              }
            }}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || image
                      : selectedUser.profilePic || image
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble bg-none flex flex-col">
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
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
