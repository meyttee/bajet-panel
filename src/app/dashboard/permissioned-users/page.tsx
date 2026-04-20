import { PermissionedUser } from "@/components/pages";
import { Suspense } from "react";

const Page = () => (
  <Suspense fallback={<>loading ...</>}>
    <PermissionedUser />
  </Suspense>
);

export default Page;
