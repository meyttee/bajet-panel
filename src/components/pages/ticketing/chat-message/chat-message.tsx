import moment from "moment-jalaali";
import { FC, useEffect, useRef } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";

import { cn } from "@/utils";
import { IMessage } from "@/services";

const ChatMessage: FC<{ messages: IMessage[] }> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mx-auto flex h-full max-h-[calc(100vh-90px)] w-[900px] flex-col gap-6 overflow-y-auto p-4">
      {messages.map((message) => (
        <div
          className={cn(
            "flex flex-col justify-start rounded-[20px] p-4 text-right",
            {
              "w-fit rounded-br-[8px] border border-[#F3F4F6] bg-[#F8FAFC] text-[#52525B]":
                message.role === "user",
              "w-full bg-[#1E40AF] text-white": message.role !== "user",
            },
          )}
          key={message.id}
        >
          <p className="text-sm leading-relaxed font-normal break-words whitespace-pre-wrap">
            {message.content}
          </p>

          <div className="flex items-center justify-end gap-2">
            {message.feedback === "like" && (
              <ThumbsUp className="size-5 fill-green-300 stroke-green-600" />
            )}
            {message.feedback === "dislike" && (
              <ThumbsDown className="size-5" />
            )}
            <span
              className={cn("text-[10px] leading-5", {
                "text-[#6B7280]": message.role === "user",
                "text-[#D1D5DB]": message.role !== "user",
              })}
            >
              {moment(message.created_at).format("HH:MM")}
            </span>
          </div>
        </div>
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessage;
