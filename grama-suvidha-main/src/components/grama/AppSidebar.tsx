import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useLang } from "@/i18n/LanguageContext";
import { Clock, CheckCircle2, AlertTriangle, Star, LayoutDashboard, Sprout } from "lucide-react";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();
  const { t } = useLang();

  const items = [
    { url: "/app", end: true, icon: LayoutDashboard, label: t("nav_overview") },
    { url: "/app/ongoing", icon: Clock, label: t("nav_ongoing") },
    { url: "/app/pending", icon: AlertTriangle, label: t("nav_pending") },
    { url: "/app/completed", icon: CheckCircle2, label: t("nav_completed") },
    { url: "/app/ratings", icon: Star, label: t("nav_ratings") },
  ];

  const isActive = (url: string, end?: boolean) =>
    end ? pathname === url : pathname === url || pathname.startsWith(url + "/");

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="border-b border-border">
        <NavLink to="/" className="group flex items-center gap-3 px-2 py-2">
          <div className="bg-hero flex h-9 w-9 shrink-0 items-center justify-center rounded-xl shadow-soft transition-smooth group-hover:rotate-6">
            <Sprout className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <p className="font-display text-base font-bold text-secondary">{t("app_name")}</p>
              <p className="text-[10px] text-muted-foreground">{t("tagline")}</p>
            </div>
          )}
        </NavLink>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>{t("nav_section")}</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = isActive(item.url, item.end);
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={active}>
                      <NavLink
                        to={item.url}
                        end={item.end}
                        className={`flex items-center gap-3 rounded-lg transition-smooth ${
                          active
                            ? "bg-primary/10 font-semibold text-primary"
                            : "text-foreground hover:bg-muted/60"
                        }`}
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {!collapsed && <span>{item.label}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}