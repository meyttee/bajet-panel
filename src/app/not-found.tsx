"use client";
import { Button, Error404 } from "@/components";
import { useRouter } from "next/navigation";
import { strings } from "@/constants";

export default function NotFound() {
  const router = useRouter();

  const handleRouting = () => {
    router.push("/");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <main className="flex min-h-screen w-[100%] flex-col items-center justify-center bg-[#F6F6F6] px-4 text-center">
      <div className="-mt-8 w-56 max-w-full sm:w-72 md:w-96 lg:w-[40rem]">
        <Error404 />
      </div>

      <h3 className="mt-8 max-w-sm text-base font-medium text-slate-800 sm:mt-12 sm:max-w-md sm:text-lg md:mt-16 md:max-w-lg md:text-xl">
        {strings.not_found}
      </h3>

      <div className="mt-6 flex w-full justify-center gap-3 sm:w-auto sm:flex-row sm:gap-5">
        <Button size="sm" variant="default" isFilled onClick={handleRouting}>
          {strings.home_page}
        </Button>
        <Button onClick={handleBack}>{strings.return}</Button>
      </div>
    </main>
  );
}
