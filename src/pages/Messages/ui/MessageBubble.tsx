import type { Message } from "../lib/mockData";

interface MessageBubbleProps {
  message: Message;
  senderName: string;
}

const MessageBubble = ({ message, senderName }: MessageBubbleProps) => {
  return (
    <div
      className={`flex items-start gap-4 mb-8 ${
        message.isCurrentUser ? "flex-row-reverse" : ""
      }`}
    >
      <div className="w-[50px] h-[50px] rounded-full bg-textGray shrink-0 overflow-hidden"></div>

      <div
        className={`flex flex-col ${message.isCurrentUser ? "items-end" : ""}`}
      >
        <div
          className={`flex items-baseline gap-2 mb-2 ${
            message.isCurrentUser ? "flex-row-reverse" : ""
          }`}
        >
          <p className="font-dm font-medium text-[15px] leading-[26px] text-textPrimary">
            {senderName}
          </p>
          <span className="font-dm text-sm leading-7 text-textPrimary">
            {message.timestamp}
          </span>
        </div>

        <div
          className={`px-[29px] py-[19px] rounded-lg max-w-[515px] ${
            message.isCurrentUser ? "bg-[#f0ffd2]" : "bg-paleBlue"
          }`}
        >
          <p className="font-dm text-[15px] leading-7 text-textSecondary">
            {message.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
