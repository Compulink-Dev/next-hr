"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation"; // Import usePathname
import {
  ChevronDown,
  ChevronUp,
  Home,
  BaggageClaim,
  ShoppingCart,
  CreditCard,
  User2,
  BusFront,
  FileBarChart,
  Cable,
  Book,
  Webhook,
  Minimize2,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import SubscriptionCard from "@/app/(dashboard)/_components/SubscriptionCard";
import { Button } from "@/components/ui/button";

interface MenuItem {
  title: string;
  path?: string;
  children?: MenuItem[];
  roles?: string[];
  icon?: React.ElementType;
}

const menuItems: MenuItem[] = [
  { title: "Home", path: "/admin", icon: Home },
  {
    title: "Inventory",
    icon: BaggageClaim,
    roles: ["admin"],
    children: [
      { title: "Item", path: "/admin/inventory/items" },
      { title: "Categories", path: "/admin/inventory/categories" },
      { title: "Brands", path: "/admin/inventory/brands" },
      { title: "Units", path: "/admin/inventory/units" },
      { title: "Warehouse", path: "/admin/inventory/warehouse" },
      { title: "Adjustments", path: "/admin/inventory/adjustments" },
      { title: "Suppliers", path: "/admin/inventory/suppliers" },
      //   {
      //     title: "Mobile Development",
      //     path: "/services/mobile-development",
      //     roles: ["admin", "developer"],  // Restricted to admin and developer
      // },
    ],
  },
  {
    title: "Sales",
    icon: ShoppingCart,
    children: [
      { title: "Customers", path: "/admin/sales/customers" },
      { title: "Sales Order", path: "/admin/sales/sales-order" },
      { title: "Credit Note", path: "/admin/sales/credit-note" },
    ],
  },
  {
    title: "Purchase",
    icon: CreditCard,
    children: [
      { title: "Suppliers", path: "/admin/purchases/suppliers" },
      { title: "Purchase Order", path: "/admin/purchases/purchase-order" },
      { title: "Debit Note", path: "/admin/purchases/debit-note" },
    ],
  },
  {
    title: "H.R",
    icon: User2,
    children: [
      { title: "Loans", path: "/admin/hr/loans" },
      { title: "Leave", path: "/admin/hr/leave" },
      { title: "Payslips", path: "/admin/hr/pay-slips" },
      { title: "Employees", path: "/admin/hr/employees", roles: ["admin"] },
      { title: "Certification", path: "/admin/hr/certification" },
      { title: "Training", path: "/admin/hr/training" },
      { title: "Interview", path: "/admin/hr/interview" },
    ],
  },
  {
    title: "Fleet",
    icon: BusFront,
    children: [
      { title: "Vehicles", path: "/admin/fleet/vehicles" },
      { title: "Drivers", path: "/admin/fleet/drivers", roles: ["admin"] },
      { title: "Tracking", path: "/admin/fleet/tracking" },
      { title: "Invoices", path: "/admin/fleet/invoices" },
    ],
  },
  {
    title: "Reports",
    icon: FileBarChart,
    children: [
      { title: "Sales", path: "/admin/reports/sales" },
      { title: "Purchase", path: "/admin/reports/purchase" },
      { title: "Fleet", path: "/admin/reports/fleet" },
      { title: "H.R", path: "/admin/reports/hr" },
      // { title: "Payments", path: "/admin/reports/payments" },
      { title: "Projects", path: "/admin/reports/projects" },
    ],
  },
  // { title: "Integrations", path: "/admin/integrations", icon: Cable },
  { title: "Documents", path: "/admin/documents", icon: Book },
];

const Sidebar: React.FC<{
  showSide: boolean;
  setShowSide: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ showSide, setShowSide }) => {
  const { data: session } = useSession();
  const pathname = usePathname(); // Get current route
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    // Automatically open the menu if a child route is active
    const activeParent = menuItems.find((item) =>
      item.children?.some((child) => child.path === pathname)
    );
    if (activeParent) {
      setOpenMenu(activeParent.title);
    }
  }, [pathname]);

  const handleMenuClick = (title: string) => {
    setOpenMenu(openMenu === title ? null : title);
  };

  const checkPermission = (item: MenuItem) => {
    if (item.roles && session?.user?.role) {
      return item.roles.includes(session.user.role);
    }
    return true;
  };

  return (
    <div
      className={`${
        showSide
          ? "w-64 h-full fixed p-4 bg-slate-900 text-white md:flex flex-col z-50 overflow-y-scroll"
          : "hidden md:flex w-64 h-full fixed p-4 bg-slate-900 text-white flex-col z-50 overflow-y-scroll"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center p-4">
          <Webhook />
          <p>Compulink</p>
        </div>
        <Button onClick={() => setShowSide(false)} className="md:hidden">
          <Minimize2 className="h-5 w-5" />
        </Button>
      </div>
      <Separator />
      <ul className="space-y-2 p-4">
        {menuItems.map((item) =>
          checkPermission(item) ? (
            <li key={item.title} className="group p-2">
              {item.children ? (
                <>
                  <span
                    className={`flex items-center justify-between cursor-pointer p-2 rounded-md ${
                      openMenu === item.title
                        ? "bg-slate-800 text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                    onClick={() => handleMenuClick(item.title)}
                  >
                    <span className="flex items-center">
                      {item.icon && (
                        <item.icon className="w-4 h-4 mr-2 text-gray-400" />
                      )}
                      {item.title}
                    </span>
                    {openMenu === item.title ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </span>
                  {openMenu === item.title && (
                    <ul className="ml-4 space-y-1 mt-2">
                      {item.children.map((subItem) =>
                        checkPermission(subItem) ? (
                          <li key={subItem.title}>
                            <Link
                              href={subItem.path || "#"}
                              className={`block p-2 pl-4 rounded-md ${
                                pathname === subItem.path
                                  ? "bg-slate-700 text-white"
                                  : "text-gray-400 hover:text-white"
                              }`}
                            >
                              {subItem.title}
                            </Link>
                          </li>
                        ) : null
                      )}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={item.path || "#"}
                  className={`block p-2 rounded-md ${
                    pathname === item.path
                      ? "bg-slate-800 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <span className="flex items-center">
                    {item.icon && (
                      <item.icon className="w-4 h-4 mr-2 text-gray-400" />
                    )}
                    {item.title}
                  </span>
                </Link>
              )}
            </li>
          ) : null
        )}
      </ul>
      <div className="mt-4">
        <SubscriptionCard />
      </div>
    </div>
  );
};

export default Sidebar;
