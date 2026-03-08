"use client";
import { FC, PropsWithChildren, useState } from "react";
import { RecursiveCardProps } from "./interface";
import Image from "next/image";
import {
  AlertTriangle,
  Check,
  CircleMinus,
  CirclePlus,
  MessageCircleReply,
  Trash,
} from "lucide-react";
import { Button, CardOptions, HintBadge } from "@/components";
import { clsx } from "clsx";
import { strings } from "@/constants";

const RecursiveCard: FC<PropsWithChildren<RecursiveCardProps>> = ({
  comment,
  depth = 0,
  isAdmin = false,
  children,
  options,
  onOptionSelect,
}) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const hasReplies = comment.replies && comment.replies.length > 0;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="relative flex">
        <div className="mr-3 flex flex-col items-center">
          <Image
            src={comment.avatar}
            alt={comment.author}
            width={24}
            height={24}
            className="size-6 rounded-full border object-cover"
          />

          {hasReplies && <div className="w-px flex-1 bg-gray-300" />}

          {hasReplies && (
            <div
              onClick={() => setShowReplies(!showReplies)}
              className="flex h-5 w-5 items-center justify-center"
            >
              {showReplies ? (
                <CircleMinus
                  strokeWidth={1.5}
                  className="size-5 cursor-pointer text-gray-400 hover:text-gray-600"
                />
              ) : (
                <CirclePlus
                  strokeWidth={1.5}
                  className="size-5 cursor-pointer text-gray-400 hover:text-gray-600"
                />
              )}
            </div>
          )}
        </div>

        <div className="mb-5 flex flex-1 flex-col border-gray-200">
          <div className="-mt-[1px] mr-2 flex flex-wrap items-center sm:flex-nowrap">
            <span
              dir="ltr"
              className="max-w-[15ch] truncate text-sm font-medium text-zinc-700"
            >
              {comment.author}
            </span>
            <div className="flex items-center">
              <div className="converse-card__divider" />
              <p className="text-xs font-normal text-zinc-600">
                {comment.time}
              </p>
            </div>
            {(comment.status === "NOT_ACCEPTED" ||
              comment.status === "REPORTED") && (
              <div className="converse-card__hint-wrapper">
                <div className="converse-card__divider" />
                <HintBadge
                  icon={
                    <AlertTriangle
                      strokeWidth={1.5}
                      className={clsx("size-4 text-orange-500", {
                        "text-red-500": comment.status === "NOT_ACCEPTED",
                      })}
                    />
                  }
                  title={
                    comment.status === "NOT_ACCEPTED"
                      ? strings.not_approved_message
                      : strings.reported
                  }
                  title_color={
                    comment.status === "NOT_ACCEPTED"
                      ? "text-red-500"
                      : "text-orange-500"
                  }
                  bg_color={
                    comment.status === "NOT_ACCEPTED"
                      ? "bg-red-100"
                      : "bg-orange-100"
                  }
                />
              </div>
            )}
          </div>
          <p
            onClick={() => setIsExpanded((prev) => !prev)}
            className={clsx(
              "my-4 mr-2 cursor-pointer truncate text-sm text-zinc-700 transition-all",
              {
                "line-clamp-1 w-full hover:bg-gray-100": !isExpanded,
              },
            )}
          >
            {comment.content}
          </p>
          <div className="mt-2 flex w-full flex-wrap items-center gap-2 text-sm text-gray-500 sm:flex-nowrap">
            {children}
            <div
              onClick={() => setShowReplyInput((prev) => !prev)}
              className="flex w-fit items-center gap-1 rounded-md bg-gray-50 px-3 py-1 whitespace-nowrap text-zinc-700"
            >
              {hasReplies && (
                <span className="text-xs font-medium text-gray-600">
                  {comment.replies.length}
                </span>
              )}
              <MessageCircleReply
                strokeWidth={1.5}
                className="size-5 text-zinc-700"
              />
            </div>
            <div className="flex w-fit">
              <CardOptions options={options} onOptionSelect={onOptionSelect} />
            </div>
          </div>

          {comment.status === "NOT_ACCEPTED" && (
            <div className="mt-1 -mr-2 flex w-full flex-wrap items-center justify-center gap-5 sm:flex-nowrap">
              <Button variant="outline" isFilled onClick={comment.onApprove}>
                <Check strokeWidth={1.5} className="size-5" />
                {strings.approve_message}
              </Button>
              <Button variant="destructive" onClick={comment.onDelete}>
                <Trash strokeWidth={1.5} className="size-5" />
                {strings.delete_converse}
              </Button>
            </div>
          )}
        </div>
      </div>
      {/*{!isAdmin && showReplyInput && (*/}
      {/*  <div className="mt-2">*/}
      {/*    <textarea*/}
      {/*      placeholder="پاسخ خود را بنویسید..."*/}
      {/*      className="w-full rounded border p-2 text-sm"*/}
      {/*    />*/}
      {/*    <div className="mt-2 flex justify-end">*/}
      {/*      <button className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600">*/}
      {/*        ارسال*/}
      {/*      </button>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*)}*/}
      {showReplies && hasReplies && (
        <div className="relative mt-2 mr-6 pl-6">
          {comment.replies.map((reply, index) => {
            const isLast = index === comment.replies.length - 1;
            return (
              <div key={reply.id} className="relative flex">
                {!isLast && (
                  <div className="absolute top-0 right-[-1px] h-full w-px bg-gray-300" />
                )}
                <div className="absolute top-[-8px] right-[-1px] h-6 w-6 rounded-br-md border-r border-b border-gray-300" />
                <RecursiveCard
                  comment={reply}
                  depth={depth + 1}
                  isAdmin={isAdmin}
                  options={options}
                  onOptionSelect={reply.onDelete}
                  onApprove={reply.onApprove}
                  onDelete={reply.onDelete}
                  status={reply.status}
                >
                  {children}
                </RecursiveCard>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecursiveCard;
