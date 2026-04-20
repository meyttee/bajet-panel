import { UsersManagement } from "@/components/pages";
import { Suspense } from "react";

const Page = () => (
  <Suspense fallback={<>loading ...</>}>
    <UsersManagement />
  </Suspense>
);

export default Page;
