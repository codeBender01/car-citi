import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ConversationListItem from "./ui/ConversationListItem";
import MessageBubble from "./ui/MessageBubble";
import { mockConversations, mockMessages } from "./lib/mockData";

const Messages = () => {
  const [activeConversation, setActiveConversation] = useState(1);
  const [messageInput, setMessageInput] = useState("");

  const currentConversation = mockConversations.find(
    (c) => c.id === activeConversation
  );

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary mb-10">
        <div className="text-[32px] font-bold">Мои сообщения</div>
        <p className="text-textSecondary text-base">
          Lorem ipsum dolor sit amet, consectetur.
        </p>
      </div>

      {/* Messages Layout */}
      <div className="flex gap-6">
        {/* Left Panel - Conversations List */}
        <div className="w-[415px] bg-white border border-grayBorder rounded-2xl h-[774px] flex flex-col">
          {/* Search Bar */}
          <div className="p-10 pb-0">
            <div className="bg-mainBg rounded-2xl px-4 py-3 flex items-center gap-2">
              <CiSearch className="text-textPrimary" size={16} />
              <input
                type="text"
                placeholder="Поиск"
                className="bg-transparent border-none outline-none flex-1 font-dm text-[15px] text-textPrimary placeholder:text-textPrimary"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto mt-4">
            {mockConversations.map((conversation) => (
              <ConversationListItem
                key={conversation.id}
                conversation={conversation}
                isActive={conversation.id === activeConversation}
                onClick={() => setActiveConversation(conversation.id)}
              />
            ))}
          </div>
        </div>

        {/* Right Panel - Chat */}
        <div className="flex-1 bg-white border border-grayBorder rounded-2xl h-[774px] flex flex-col">
          {/* Chat Header */}
          <div className="px-9 py-5 border-b border-grayBorder flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-[50px] h-[50px] rounded-full bg-textGray overflow-hidden"></div>
              <div>
                <p className="font-dm font-medium text-[15px] leading-[26px] text-textPrimary">
                  {currentConversation?.userName}
                </p>
                <p className="font-dm text-sm leading-7 text-textPrimary">
                  {currentConversation?.isOnline ? "Онлайн" : "Оффлайн"}
                </p>
              </div>
            </div>
            <a
              href="#"
              className="font-dm text-sm leading-normal text-primary underline"
            >
              Настройки чата
            </a>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-9 py-10">
            {mockMessages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                senderName={
                  message.isCurrentUser
                    ? "Bally"
                    : currentConversation?.userName || ""
                }
              />
            ))}
          </div>

          {/* Message Input */}
          <div className="border-t border-grayBorder px-9 py-6">
            <div className="flex items-center gap-4">
              <Input
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Ваше сообщение"
                className="flex-1 border-none shadow-none px-0 text-sm text-textPrimary placeholder:text-textPrimary focus-visible:ring-0"
              />
              <Button className="bg-primary hover:bg-primary/90 text-white px-7 py-5 rounded-xl font-dm font-medium text-[15px]">
                Отправить
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
