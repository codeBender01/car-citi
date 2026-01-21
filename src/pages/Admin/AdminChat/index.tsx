import { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ConversationListItem from "@/pages/Messages/ui/ConversationListItem";
import MessageBubble from "@/pages/Messages/ui/MessageBubble";
import { chatSocket } from "./lib/socket";
import type { Room, GetMessagesParams } from "./lib/socket";
import type { Message, Conversation } from "@/pages/Messages/lib/mockData";

String.prototype.hashCode = function () {
  let hash = 0;
  for (let i = 0; i < this.length; i++) {
    const char = this.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

const formatTimestamp = (date: string): string => {
  const messageDate = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - messageDate.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) {
    return `${diffMins} мин.`;
  } else if (diffHours < 24) {
    return `${diffHours} час`;
  } else if (diffDays < 7) {
    return `${diffDays} дн.`;
  } else {
    return messageDate.toLocaleDateString("ru-RU");
  }
};

declare global {
  interface String {
    hashCode(): number;
  }
}

const AdminChat = () => {
  const [messageInput, setMessageInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversations: Conversation[] = rooms.map((room) => ({
    id: room.id,
    userId: room.lastMessage?.user_id || "",
    userName: room.title,
    userAvatar: "https://via.placeholder.com/50",
    carModel: room.otherUser?.phone,
    lastMessage: room.lastMessage?.message || "",
    timestamp: room.lastMessage?.date
      ? formatTimestamp(room.lastMessage.date)
      : "",
    unreadCount: 0,
    isOnline: false,
  }));

  const currentRoom = rooms.find((r) => r.id === currentRoomId);

  const fetchMessagesForRoom = (roomId: string) => {
    setIsLoadingMessages(true);

    const params: GetMessagesParams = {
      roomId: roomId,
      limit: 50,
      offset: 0,
    };

    chatSocket.getMessages(params, (serverMessages) => {
      console.log(serverMessages, "serveereerereer");
      const convertedMessages: Message[] = serverMessages.map((msg: any) => {
        const isAdminMessage = !!msg.adminId;
        const authorId = msg.adminId || msg.userId || msg.id;

        return {
          id: parseInt((msg.id || "").substring(0, 8), 36) || Math.random(),
          senderId:
            parseInt((authorId || "").substring(0, 8), 36) || Math.random(),
          text: msg.message || "",
          timestamp: new Date(msg.created).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isCurrentUser: isAdminMessage,
        };
      });

      setMessages(convertedMessages);
      setIsLoadingMessages(false);
    });
  };

  useEffect(() => {
    if (currentRoomId && isConnected) {
      setMessages([]);
      fetchMessagesForRoom(currentRoomId);
    }
  }, [currentRoomId, isConnected]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const adminToken = localStorage.getItem("adminAccessToken");
    if (!adminToken) {
      alert("Пожалуйста, войдите в систему для использования чата");
      return;
    }

    chatSocket.connect(adminToken, {
      onConnect: () => {
        setIsConnected(true);

        // Join admin rooms
        chatSocket.joinRoomsAdmin();

        chatSocket.getAdminRooms((rooms) => {
          setRooms(rooms);

          if (rooms.length > 0) {
            const firstRoomId = rooms[0].id;
            setCurrentRoomId(firstRoomId);

            fetchMessagesForRoom(firstRoomId);
          }
        });
      },
      onDisconnect: () => {
        setIsConnected(false);
      },
      onConnectError: () => {
        setIsConnected(false);
      },
      onNewMessage: (socketMessage: any) => {
        console.log("📨 New message received:", socketMessage);

        // Check if message is from current room
        if (socketMessage.roomId !== currentRoomId) {
          console.log("⏭️ Message from different room, ignoring");
          return;
        }

        const isAdminMessage = !!socketMessage.adminId;
        const authorId =
          socketMessage.adminId || socketMessage.userId || socketMessage.id;

        const newMessage: Message = {
          id:
            parseInt((socketMessage.id || "").substring(0, 8), 36) ||
            Math.random(),
          senderId:
            parseInt((authorId || "").substring(0, 8), 36) || Math.random(),
          text: socketMessage.message || "",
          timestamp: new Date(socketMessage.created).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isCurrentUser: isAdminMessage,
        };
        setMessages((prev) => [...prev, newMessage]);
      },
    });

    return () => {
      chatSocket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    if (!currentRoomId) {
      alert("Пожалуйста, выберите комнату для чата");
      return;
    }
    if (!isConnected) {
      alert("Нет соединения с сервером");
      return;
    }

    // Optimistically add message to UI immediately
    const optimisticMessage: Message = {
      id: Math.random(), // Temporary ID
      senderId: Math.random(),
      text: messageInput,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isCurrentUser: true, // Admin's own message
    };

    setMessages((prev) => [...prev, optimisticMessage]);

    // Send to server
    const success = chatSocket.sendMessageAdmin({
      roomId: currentRoomId,
      message: messageInput,
    });

    if (success) {
      setMessageInput("");
    } else {
      // If send failed, remove the optimistic message
      setMessages((prev) => prev.filter((m) => m.id !== optimisticMessage.id));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary mb-10">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[32px] font-bold">Чаты с пользователями</div>
            <p className="text-textSecondary text-base">
              Поддержка пользователей и ответы на вопросы
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span className="text-sm">
              {isConnected ? "Подключено" : "Отключено"}
            </span>
          </div>
        </div>
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
            {conversations.length > 0 ? (
              conversations.map((conversation, index) => (
                <ConversationListItem
                  key={conversation.id}
                  conversation={conversation}
                  isActive={rooms[index]?.id === currentRoomId}
                  onClick={() => {
                    const roomId = rooms[index]?.id;
                    console.log("👆 User selected room:", roomId);
                    setCurrentRoomId(roomId);
                  }}
                />
              ))
            ) : (
              <div className="p-10 text-center text-textSecondary">
                {isConnected ? "Нет активных чатов" : "Подключение..."}
              </div>
            )}
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
                  {currentRoom?.title || "Выберите чат"}
                </p>
                <p className="font-dm text-sm leading-7 text-textPrimary">
                  {currentRoom?.otherUser?.phone || ""}
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-9 py-10">
            {currentRoomId ? (
              isLoadingMessages ? (
                <div className="flex items-center justify-center h-full text-textSecondary">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <span>Загрузка сообщений...</span>
                  </div>
                </div>
              ) : messages.length > 0 ? (
                <>
                  {messages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      senderName={
                        message.isCurrentUser
                          ? "Администратор"
                          : currentRoom?.title || ""
                      }
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-textSecondary">
                  Нет сообщений в этом чате
                </div>
              )
            ) : (
              <div className="flex items-center justify-center h-full text-textSecondary">
                Выберите чат для просмотра сообщений
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="border-t border-grayBorder px-9 py-6">
            <div className="flex items-center gap-4">
              <Input
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ваше сообщение"
                className="flex-1 border-none shadow-none px-0 text-sm text-textPrimary placeholder:text-textPrimary focus-visible:ring-0"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!isConnected || !currentRoomId}
                className="bg-primary hover:bg-primary/90 text-white px-7 py-5 rounded-xl font-dm font-medium text-[15px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Отправить
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChat;
