import type { Conversation } from "../lib/mockData";

interface ConversationListItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

const ConversationListItem = ({
  conversation,
  isActive,
  onClick,
}: ConversationListItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-10 py-3 cursor-pointer transition-colors relative ${
        isActive ? "bg-primary" : "hover:bg-mainBg"
      }`}
    >
      <div className="relative shrink-0">
        <div className="w-[50px] h-[50px] rounded-full bg-textGray overflow-hidden"></div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between mb-0.5">
          <p
            className={`font-dm font-medium text-base leading-[26px] truncate ${
              isActive ? "text-white" : "text-textPrimary"
            }`}
          >
            {conversation.userName}
          </p>
          <span
            className={`font-dm text-xs leading-7 ml-2 shrink-0 ${
              isActive ? "text-white" : "text-[#6b7177]"
            }`}
          >
            {conversation.timestamp}
          </span>
        </div>
        <p
          className={`font-dm text-sm leading-7 truncate ${
            isActive ? "text-white" : "text-textPrimary"
          }`}
        >
          {conversation.lastMessage}
        </p>
      </div>

      {/* Unread Badge */}
      {conversation.unreadCount > 0 && (
        <div className="absolute right-4 flex items-center justify-center w-4 h-4 rounded-full bg-primary">
          <span className="font-dm font-bold text-[9px] text-white tracking-[0.63px]">
            {conversation.unreadCount}
          </span>
        </div>
      )}
    </div>
  );
};

export default ConversationListItem;
