import {
  HomeIcon,
  MembersIcon,
  QuestionsIcon,
  SettingsIcon,
  UsersIcon,
} from "@/components";
import { SidebarData } from "@/components/ui";

export const sidebarData: SidebarData = [
  {
    title: "خانه",
    url: "/dashboard",
    icon: <HomeIcon />,
  },
  // {
  //   title: "دانش‌نامه مدیریار",
  //   url: "/dashboard/assisstant",
  //   icon: <BoxIcon height={20} width={20} />,
  // },
  {
    title: "مدیریت نشست‌ها",
    url: "/dashboard/manage",
    icon: <SettingsIcon />,
  },
  {
    title: "مدیریت سوالات",
    url: "/dashboard/questions",
    icon: <QuestionsIcon />,
  },
  {
    title: "مدیریت کاربران",
    url: "/dashboard/users",
    icon: <UsersIcon />,
  },
  {
    title: "مدیریت اعضا",
    url: "/dashboard/permissioned-users",
    icon: <MembersIcon />,
  },
  // {
  //   title: "مدیریت منابع",
  //   url: "/dashboard/resource-manager",
  //   icon: <DatabaseIcon height={20} width={20} />,
  // },
];
