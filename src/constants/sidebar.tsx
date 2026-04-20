import { SidebarData } from "@/components/ui";
import { House, MessageCircle } from "lucide-react";

export const sidebarData: SidebarData = [
  {
    title: "خانه",
    url: "/dashboard",
    icon: <House height={20} width={20} />,
  },
  {
    title: "گزارش نشست‌ها",
    url: "/dashboard/reports",
    icon: <MessageCircle height={20} width={20} />,
  },
  {
    title: "مدیریت نشست‌ها",
    url: "/dashboard/manage",
    icon: <MessageCircle height={20} width={20} />,
  },
  {
    title: "مدیریت کاربران",
    url: "/dashboard/users",
    icon: <MessageCircle height={20} width={20} />,
  },
  {
    title: "مدیریت سوالات",
    url: "/dashboard/questions",
    icon: <MessageCircle height={20} width={20} />,
  },
  {
    title: "مدیریت اعضا",
    url: "/dashboard/permissioned-users",
    icon: <MessageCircle height={20} width={20} />,
  },
];
