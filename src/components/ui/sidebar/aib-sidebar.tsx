"use client";

import Link from "next/link";
import { ChevronsRight, X } from "lucide-react";
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
import { usePathname } from "next/navigation";

export const AIBSidebar = ({ sidebarData, ...props }: AibSidebarProps) => {
  const { state, isMobile, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const pathname = usePathname();

  return (
    <Sidebar
      {...props}
      side="right"
      collapsible="icon"
      variant="sidebar"
      className="fixed z-10 h-[100vh]"
    >
      <SidebarHeader className="flex w-full items-center justify-between rounded-tl-xl bg-[#1E40AF] px-3 pt-2 pb-6 text-slate-200">
        <Image
          src="/header-logo.png"
          alt="header-logo"
          width={100}
          height={50}
          className="invert"
        />
        {isMobile && <X onClick={toggleSidebar} />}
      </SidebarHeader>
      <SidebarContent className={clsx("relative rounded-bl-md bg-[#1E40AF]")}>
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
                        "bg-white text-cyan-300": isActive,
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
                  className={clsx("rounded-none text-sm hover:bg-white/10", {
                    "h-14 border-b-1 border-[#1E40AF]/32": isMobile,
                    "h-11": !isMobile,
                    "rounded-2xl bg-white text-[#1E40AF]": isActive,
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
                    <span className="text-right text-[14px] leading-[20px] font-normal tracking-[0%]">
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
            onClick={toggleSidebar}
            className="absolute right-0 bottom-0 flex h-11 w-full cursor-pointer items-center justify-start gap-1 rounded-none border-t-1 pr-5 text-slate-200"
          >
            <ChevronsRight
              width={20}
              height={20}
              className={clsx("transition-transform duration-300 ease-linear", {
                "rotate-180": isCollapsed,
              })}
            />
            <span
              className={clsx(
                "truncate text-right text-sm leading-5 font-normal tracking-normal transition-transform duration-300",
                {
                  "!w-0": isCollapsed,
                },
              )}
            >
              جمع شدن منو
            </span>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
};
