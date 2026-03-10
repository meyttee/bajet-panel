import { Reports } from "@/components";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<>loading ...</>}>
      <Reports />
    </Suspense>
  );
}
