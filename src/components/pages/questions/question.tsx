"use client";

import { useParams, useRouter } from "next/navigation";
import { ChatHeader } from "../ticketing/chat-header";
import { useGetQuestions, usePutFeedback } from "@/services";
import { ChatMessage } from "../ticketing/chat-message";
import { Button, Loading } from "@/components/ui";
import { Controller, useForm } from "react-hook-form";

const Question = () => {
  const params = useParams();
  const { data, isLoading, refetch } = useGetQuestions();
  const { back } = useRouter();
  const { control, handleSubmit, reset } = useForm();
  const { mutate } = usePutFeedback();

  const onSubmit = (data: { admin_feedback: string }) => {
    mutate(
      {
        data,
        id: params.slug as string,
      },
      {
        onSuccess: () => {
          refetch();
          reset();
        },
      },
    );
  };

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
        status={questionData?.user_feedback === "like"}
        isChecked={questionData?.status}
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
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="mx-10 flex flex-col gap-1.5">
          <label htmlFor="textarea" className="text-sm text-[#6B7280]">
            بازخورد بررسی کننده
          </label>
          <Controller
            name="admin_feedback"
            control={control}
            render={({ field }) => (
              <textarea
                id="textarea"
                className="rounded-[20px] border border-[#6B7280] px-3 py-2 text-sm"
                placeholder="متن راهنما پیش‌فرض"
                rows={5}
                {...field}
                disabled={questionData?.status}
              />
            )}
          />
        </div>
        <div className="flex w-full justify-center gap-5">
          <Button isFilled type="submit" disabled={questionData?.status}>
            ثبت نظر
          </Button>
          <Button onClick={back}>لغو</Button>
        </div>
      </form>
    </div>
  );
};

export default Question;
