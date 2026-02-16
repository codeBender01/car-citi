import { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MessageBubble from "@/pages/Messages/ui/MessageBubble";
import ConversationListItem from "@/pages/Messages/ui/ConversationListItem";
import { chatSocket } from "@/pages/Admin/AdminChat/lib/socket/chatSocket";
import type {
  Room,
  GetMessagesParams,
} from "@/pages/Admin/AdminChat/lib/socket/types";
import type { Message, Conversation } from "@/pages/Messages/lib/mockData";

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

const Messages = () => {
  const [messageInput, setMessageInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentRoomIdRef = useRef<string | null>(null);

  const conversations: Conversation[] = rooms.map((room) => ({
    id: room.id,
    userId: room.lastMessage?.user_id || "",
    userName: room.title,
    userAvatar: "https://via.placeholder.com/50",
    carModel: room.otherUser?.phone || "",
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
      const convertedMessages: Message[] = serverMessages.map((msg: any) => {
        const isUserMessage = !msg.adminId;
        const authorId = msg.userId || msg.adminId || msg.id;

        return {
          id: parseInt((msg.id || "").substring(0, 8), 36) || Math.random(),
          senderId:
            parseInt((authorId || "").substring(0, 8), 36) || Math.random(),
          text: msg.message || "",
          timestamp: new Date(msg.created).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isCurrentUser: isUserMessage,
        };
      });

      setMessages(convertedMessages);
      setIsLoadingMessages(false);
    });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    currentRoomIdRef.current = currentRoomId;
    if (currentRoomId && isConnected) {
      setMessages([]);
      fetchMessagesForRoom(currentRoomId);
    }
  }, [currentRoomId, isConnected]);

  useEffect(() => {
    const userToken = localStorage.getItem("accessToken");
    if (!userToken) {
      alert("Пожалуйста, войдите в систему для использования чата");
      return;
    }

    chatSocket.connect(userToken, {
      onConnect: () => {
        setIsConnected(true);

        // Use CLIENT method to get user's room
        chatSocket.clientGetRoom((result) => {
          console.log("Client room result:", result);

          if (result?.roomId) {
            // Create a mock room object for the UI
            const userRoom: Room = {
              id: result.roomId,
              title: "Поддержка",
              otherUser: {
                id: "admin",
                phone: "Администратор",
              },
              lastMessage: undefined,
            };

            setRooms([userRoom]);
            setCurrentRoomId(result.roomId);
            fetchMessagesForRoom(result.roomId);
          } else {
            console.error("No roomId received from server");
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
        if (socketMessage.roomId !== currentRoomIdRef.current) {
          return;
        }

        // Skip own messages — already added optimistically
        if (!socketMessage.adminId) return;

        const authorId =
          socketMessage.adminId || socketMessage.id;

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
          isCurrentUser: false,
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
      alert("Пожалуйста, выберите чат");
      return;
    }
    if (!isConnected) {
      alert("Нет соединения с сервером");
      return;
    }

    // Optimistic UI update
    const optimisticMessage: Message = {
      id: Math.random(),
      senderId: Math.random(),
      text: messageInput,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isCurrentUser: true,
    };

    setMessages((prev) => [...prev, optimisticMessage]);

    // Use USER method (not admin)
    const success = chatSocket.sendMessage({
      roomId: currentRoomId,
      message: messageInput,
    });

    if (success) {
      setMessageInput("");
    } else {
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
    <div className="p-4 md:p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary mb-6 md:mb-10">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl md:text-[32px] font-bold">
              Мои сообщения
            </div>
            <p className="text-textSecondary text-sm md:text-base">
              Lorem ipsum dolor sit amet, consectetur.
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
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
        {/* Left Panel - Conversations List */}
        <div className="w-full lg:w-[415px] bg-white border border-grayBorder rounded-2xl h-[400px] lg:h-[774px] flex flex-col">
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
            <a
              href="#"
              className="font-dm text-sm leading-normal text-primary underline"
            >
              Настройки чата
            </a>
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
                          ? "Вы"
                          : currentRoom?.title || "Администратор"
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

export default Messages;
