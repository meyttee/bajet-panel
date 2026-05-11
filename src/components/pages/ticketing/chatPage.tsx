"use client";

import { FC, useEffect } from "react";

import { strings } from "@/constants";
import { Loading } from "@/components";
import { useGetReportById } from "@/services";

import { ChatHeader } from "./chat-header";
import { ChatMessage } from "./chat-message";

const ChatPage: FC<{ id: string }> = ({ id }) => {
  const { data, isLoading, error } = useGetReportById(id);

  if (!id) {
    return (
      <div className="flex h-[calc(100dvh-270px)] items-center justify-center">
        <div className="text-center">
          <p className="mt-1 text-sm text-gray-400">{strings.chatStart}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-[calc(100dvh-250px)] items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error || !data?.messages.length) {
    return (
      <div className="flex h-[calc(100dvh-250px)] items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="mt-1 text-sm text-gray-400">محتوایی وجود ندارد</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col bg-white">
      <ChatHeader
        created_at="2026-02-24T11:17:43.686376Z"
        id={id}
        model="GPT 5"
        status="like"
      />
      <ChatMessage messages={data.messages} />
    </div>
  );
};

export default ChatPage;
