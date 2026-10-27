export type NavItem = { href: string; label: string; icon: string };

export const CUSTOMER_NAV: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: "◎" },
  { href: "/dashboard/orders", label: "My Requests", icon: "▤" },
  { href: "/dashboard/documents", label: "Documents", icon: "⎘" },
  { href: "/dashboard/notifications", label: "Notifications", icon: "◔" },
  { href: "/dashboard/support", label: "Support", icon: "✉" },
  { href: "/dashboard/profile", label: "Profile", icon: "☺" },
];

export const ADMIN_NAV: NavItem[] = [
  { href: "/dashboard/admin", label: "Overview", icon: "◎" },
  { href: "/dashboard/admin/orders", label: "Orders", icon: "▤" },
  { href: "/dashboard/admin/customers", label: "Customers", icon: "☺" },
  { href: "/dashboard/admin/applications", label: "Applications", icon: "✎" },
  { href: "/dashboard/admin/documents", label: "Documents", icon: "⎘" },
  { href: "/dashboard/admin/finance", label: "Finance", icon: "£" },
  { href: "/dashboard/admin/packages", label: "Packages", icon: "◫" },
  { href: "/dashboard/admin/messages", label: "Communications", icon: "✉" },
  { href: "/dashboard/admin/tasks", label: "Tasks", icon: "✓" },
  { href: "/dashboard/admin/reports", label: "Reports", icon: "▧" },
  { href: "/dashboard/admin/audit", label: "Audit Log", icon: "⧉" },
  { href: "/dashboard/admin/staff", label: "Staff", icon: "⚑" },
];

export const CEO_NAV_ITEM: NavItem = {
  href: "/dashboard/admin/settings",
  label: "Credentials",
  icon: "⚙",
};

export const FOLLOW_UP_NAV_ITEM: NavItem = {
  href: "/dashboard/admin/follow-ups",
  label: "Follow-up emails",
  icon: "↗",
};
