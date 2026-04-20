"use client";

import { ChatPage } from "@/components";
import { useParams } from "next/navigation";

const Page = () => {
  const { id } = useParams();

  return <ChatPage id={id as string} />;
};

export default Page;
