import { SidebarData } from "@/components/ui";
import {
  BoxIcon,
  DatabaseIcon,
  House,
  MessageCircle,
  UserIcon,
  UsersIcon,
  ViewIcon,
} from "lucide-react";

export const sidebarData: SidebarData = [
  {
    title: "خانه",
    url: "/dashboard",
    icon: <House height={20} width={20} />,
  },
  // {
  //   title: "دانش‌نامه مدیریار",
  //   url: "/dashboard/assisstant",
  //   icon: <BoxIcon height={20} width={20} />,
  // },
  {
    title: "مدیریت نشست‌ها",
    url: "/dashboard/manage",
    icon: <ViewIcon height={20} width={20} />,
  },
  {
    title: "مدیریت کاربران",
    url: "/dashboard/users",
    icon: <UsersIcon height={20} width={20} />,
  },
  {
    title: "مدیریت سوالات",
    url: "/dashboard/questions",
    icon: <MessageCircle height={20} width={20} />,
  },
  {
    title: "مدیریت اعضا",
    url: "/dashboard/permissioned-users",
    icon: <UserIcon height={20} width={20} />,
  },
  {
    title: "مدیریت منابع",
    url: "/dashboard/resource-manager",
    icon: <DatabaseIcon height={20} width={20} />,
  },
];
