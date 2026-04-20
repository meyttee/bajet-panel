import { Questions } from "@/components";
import { Suspense } from "react";

const Page = () => (
  <Suspense fallback={<>loading ...</>}>
    <Questions />
  </Suspense>
);

export default Page;
