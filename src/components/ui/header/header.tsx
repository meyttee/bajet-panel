"use client";

import { FC, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { routeNames } from "@/routes";
import { AiBoxIcon, MenuIcon, ProfileBox, useSidebar } from "@/components";
import { removeCookie } from "@/utils";
import { IUserInfo } from "@/services";

const Header: FC = () => {
  const pathName = usePathname();
  const { push } = useRouter();
  const [user, setUser] = useState<IUserInfo>();
  const title = routeNames[pathName] || "";
  const { toggleSidebar } = useSidebar();

  useEffect(() => {
    setUser(
      typeof window !== undefined
        ? JSON.parse(window.localStorage.getItem("userInfo")!)
        : undefined,
    );
  }, []);

  const onMenuHandler = () => {
    toggleSidebar();
  };

  const handleLogout = async () => {
    await removeCookie("token");
    push("/");
  };

  return (
    <div className="fixed z-20 flex h-16 w-full items-center justify-between bg-white px-4 py-4 shadow-[0px_2px_4px_0px_rgba(0,_0,_0,_0.20),0px_4px_5px_0px_rgba(0,_0,_0,_0.14),0px_1px_10px_0px_rgba(0,_0,_0,_0.12)] sm:px-8 md:px-16 md:py-2 lg:px-4 xl:px-6 xl:py-3">
      <div className="relative order-1 flex items-center gap-6 sm:order-2">
        <AiBoxIcon className="h-10 w-10 md:absolute md:right-6 lg:static lg:h-12" />
        <p className="hidden lg:block">{title}</p>
      </div>
      <div className="flex gap-5 sm:order-1 lg:hidden" onClick={onMenuHandler}>
        <MenuIcon />
        <p className="block lg:hidden">{title}</p>
      </div>
      <div className="order-3">
        <ProfileBox
          avatarUrl={user?.user.profile_picture || undefined}
          username={
            user?.user.email
              ? user?.user.first_name && user?.user.last_name
                ? user?.user.first_name + " " + user?.user.last_name
                : user?.user.email
              : ""
          }
          items={[
            {
              label: "خروج از حساب کاربری",
              onClick: handleLogout,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Header;
