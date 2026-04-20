import { Manage } from "@/components";
import { Suspense } from "react";

const Page = () => (
  <Suspense fallback={<>loading ...</>}>
    <Manage />
  </Suspense>
);

export default Page;
