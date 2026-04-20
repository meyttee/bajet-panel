"use client";

import { ChatPage } from "@/components";
import { useParams } from "next/navigation";
import { Suspense } from "react";

const Page = () => {
  const { id } = useParams();

  return (
    <Suspense fallback={<>loading ...</>}>
      <ChatPage id={id as string} />
    </Suspense>
  );
};

export default Page;
