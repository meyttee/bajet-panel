import { ResourceManager } from "@/components";
import { Suspense } from "react";

function Page() {
  return (
    <Suspense fallback={<>loading ...</>}>
      <ResourceManager />
    </Suspense>
  );
}

export default Page;
