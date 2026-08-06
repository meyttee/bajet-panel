import moment from "moment-jalaali";
import { FC, Fragment, useEffect, useRef } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";

import { cn } from "@/utils";
import { IMessage } from "@/services";
import ResourceTable from "../../questions/resourceTable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";

const ChatMessage: FC<{ messages: IMessage[]; defaultMessage?: string }> = ({
  messages,
  defaultMessage,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mx-auto flex h-full max-h-[calc(100vh-90px)] w-full flex-col gap-6 overflow-y-auto px-10 py-4">
      {messages.map((message) => (
        <Fragment key={message.id}>
          <div
            className={cn(
              "flex flex-col justify-start rounded-[20px] p-4 text-right",
              {
                "w-fit rounded-br-[8px] border border-[#F3F4F6] bg-[#F8FAFC] text-[#52525B]":
                  message.role === "user",
                "w-full bg-[#2F6FB5] text-white": message.role !== "user",
              },
            )}
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
                {moment(message.created_at).format("HH:mm")}
              </span>
            </div>
          </div>
          {!!message.retrieved_docs.length && message.role !== "user" && (
            <Accordion type="multiple">
              <AccordionItem value={message.id}>
                <AccordionTrigger>منبع</AccordionTrigger>
                <AccordionContent>
                  <ResourceTable column={message.retrieved_docs} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </Fragment>
      ))}
      {defaultMessage && (
        <>
          <div className="mt-6 flex w-full flex-col justify-start rounded-[20px] rounded-br-[8px] border border-[#CAD300] bg-[#D8DB8F] p-4 text-right text-[#4B5563]">
            <p className="text-base font-medium text-[#4B5563]">
              بازخورد کاربر
            </p>
            <p className="text-sm leading-relaxed font-normal break-words whitespace-pre-wrap text-[#4B5563]">
              {defaultMessage}
            </p>
          </div>
        </>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessage;
