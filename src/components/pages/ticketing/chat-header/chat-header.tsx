import { FC } from "react";
import moment from "moment-jalaali";
import { useRouter } from "next/navigation";
import { ArrowLeft, ThumbsDown, ThumbsUp } from "lucide-react";

import { cn } from "@/utils";
import { Button } from "@/components";

import { ChatHeaderProps } from "./interface";

const ChatHeader: FC<ChatHeaderProps> = ({ created_at, id, model, status }) => {
  const { back } = useRouter();

  return (
    <div className="flex w-full items-center justify-between border-b border-[#E5E7EB] bg-white px-5 py-3">
      <div className="flex gap-5">
        <div className="flex items-center gap-2">
          <p className="text-sm leading-7 font-normal text-gray-400">شناسه:</p>
          <p className="text-sm leading-7 font-normal">{id}</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm leading-7 font-normal text-gray-400">زمان:</p>
          <p className="text-sm leading-7 font-normal">
            {moment(created_at).format("HH:mm jYYYY/jMM/jDD")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm leading-7 font-normal text-gray-400">چت‌بات:</p>
          <p className="text-sm leading-7 font-normal">{model}</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-x-2">
        <div
          className={cn(
            "flex w-fit items-center gap-1 rounded-sm px-1.5 py-1 outline",
            {
              "bg-green-100 text-green-600 outline-green-500":
                status === "like",
              "bg-red-50 text-red-600 outline-red-600": status !== "like",
            },
          )}
        >
          {status === "like" ? (
            <ThumbsUp className="size-5 stroke-1" />
          ) : (
            <ThumbsDown className="size-5 stroke-1" />
          )}
          <span className="text-xs leading-4">
            {status === "like" ? "پسندیده شده" : "پسندیده نشده"}
          </span>
        </div>
        <Button variant="ghost" onClick={back}>
          <ArrowLeft />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
