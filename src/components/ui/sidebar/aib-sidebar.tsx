"use client";

import Link from "next/link";
import { Power, X } from "lucide-react";
import clsx from "clsx";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  useSidebar,
} from "./sidebar";

import { AibSidebarProps } from "./type";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip/tooltip";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { removeCookie } from "@/utils";

export const AIBSidebar = ({ sidebarData, ...props }: AibSidebarProps) => {
  const { state, isMobile, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const pathname = usePathname();
  const { push } = useRouter();

  const onExit = async () => {
    await removeCookie("access");
    await removeCookie("refresh");

    push("/login");
  };

  return (
    <Sidebar
      {...props}
      side="right"
      collapsible="icon"
      variant="sidebar"
      className="fixed z-10 h-[100vh]"
    >
      <SidebarHeader className="flex items-center justify-between overflow-hidden rounded-tl-xl bg-[#262261] px-3 py-4 text-slate-200">
        <Image
          src="/header-logo.svg"
          alt="header-logo"
          width={224}
          height={62}
          className="w-[224px]"
        />
        {isMobile && <X onClick={toggleSidebar} />}
      </SidebarHeader>
      <SidebarContent
        className={clsx("relative rounded-bl-md bg-[#262261] pt-4")}
      >
        <div
          className={clsx(
            "scrollbar flex flex-col overflow-x-hidden overflow-y-auto pb-16",
            {
              "h-[calc(100vh-140px)] gap-6 px-4": !isMobile,
              "h-100vh": isMobile,
            },
          )}
        >
          {sidebarData.map((item) => {
            const isActive = pathname === item.url;
            if (isCollapsed && !isMobile) {
              return (
                <Tooltip key={item.url}>
                  <TooltipTrigger
                    asChild
                    className={clsx(
                      "flex h-11 w-full cursor-pointer items-center justify-center",
                      {
                        "rounded-full bg-white text-[#262261]": isActive,
                        "text-slate-200": !isActive,
                      },
                    )}
                  >
                    <span className="text-xl">{item.icon}</span>
                  </TooltipTrigger>

                  <TooltipContent side="left" className="p-2">
                    {item.title}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return (
              <SidebarGroup key={item.url} className="justify-start p-0">
                <SidebarGroupLabel
                  asChild
                  className={clsx("rounded-2xl text-sm hover:bg-white/10", {
                    "h-14 border-b-1 border-[#262261]/32": isMobile,
                    "h-11": !isMobile,
                    "rounded-2xl bg-white text-[#262261]": isActive,
                    "text-slate-200": !isActive,
                  })}
                >
                  <Link
                    href={item.url || "#"}
                    className={clsx(
                      "flex w-full items-center justify-start gap-2 p-2",
                    )}
                  >
                    <span className="shrink-0 text-xl">{item.icon}</span>
                    <span className="text-right text-[14px] leading-[20px] font-normal tracking-normal">
                      {item.title}
                    </span>
                  </Link>
                </SidebarGroupLabel>
              </SidebarGroup>
            );
          })}
        </div>
        {!isMobile && (
          <div
            onClick={onExit}
            className="absolute right-0 bottom-0 flex h-11 w-full cursor-pointer items-center justify-between gap-1 rounded-none border-t-1 px-5 pr-5 text-slate-200"
          >
            <span
              className={clsx(
                "truncate text-right text-sm leading-5 font-normal tracking-normal transition-transform duration-300",
                {
                  "!w-0": isCollapsed,
                },
              )}
            >
              خروج
            </span>
            <Power
              width={20}
              height={20}
              className={clsx(
                "transition-transform duration-300 ease-linear",
                {},
              )}
            />
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
};
