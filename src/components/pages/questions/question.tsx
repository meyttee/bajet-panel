"use client";

import { useParams } from "next/navigation";
import { ChatHeader } from "../ticketing/chat-header";
import { useGetQuestions } from "@/services";
import { ChatMessage } from "../ticketing/chat-message";
import { Loading } from "@/components/ui";

const Question = () => {
  const params = useParams();
  const { data, isLoading } = useGetQuestions();

  if (isLoading) {
    return (
      <div className="flex h-[calc(100dvh-250px)] items-center justify-center">
        <Loading />
      </div>
    );
  }

  const questionData = data?.results.find(
    (result) => String(result.id) === params.slug,
  );
  return (
    <div className="flex h-[calc(100vh-80px)] flex-col bg-white">
      <ChatHeader
        created_at={questionData?.timestamp as string}
        id=""
        status={questionData?.status}
        isChecked={questionData?.user_feedback}
      />
      <ChatMessage
        messages={[
          {
            content: questionData?.user_query || "",
            created_at: questionData?.timestamp || "",
            feedback: null,
            id: String(Number(questionData?.id)),
            metadata: { processing_time: 0, tokens: 0 },
            retrieved_docs: [],
            role: "user",
          },
          {
            content: questionData?.bot_response || "",
            created_at: questionData?.timestamp || "",
            feedback: null,
            id: String(Number(questionData?.id) + 1),
            metadata: { processing_time: 0, tokens: 0 },
            retrieved_docs: [],
            role: "assistant",
          },
        ]}
      />
    </div>
  );
};

export default Question;
