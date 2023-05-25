import { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Página Inicial",
      href: "/",
    },
    {
      title: "Criar Todo",
      href: "/todo/create",
    },
    {
      title: "Suporte",
      href: "/support",
      disabled: true,
    },
    {
      title: "Sobre",
      href: "/about",
    },
  ],
  sidebarNav: [
    {
      title: "Posts",
      href: "/dashboard",
      icon: "post",
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "billing",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
};
