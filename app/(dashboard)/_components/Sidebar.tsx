"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronUp,
  Home,
  ShoppingCart,
  CreditCard,
  Users,
  Truck,
  FileBarChart,
  Book,
  Webhook,
  X,
  Package,
  BarChart3,
  Briefcase,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import SubscriptionCard from "./SubscriptionCard";

interface MenuItem {
  title: string;
  path?: string;
  children?: MenuItem[];
  roles?: string[];
  icon?: React.ElementType;
}

const menuItems: MenuItem[] = [
  { title: "Dashboard", path: "/dashboard", icon: Home },
  {
    title: "Inventory",
    icon: Package,
    roles: ["admin", "procurement"],
    children: [
      { title: "Items", path: "/dashboard/inventory/items" },
      { title: "Categories", path: "/dashboard/inventory/categories" },
      { title: "Brands", path: "/dashboard/inventory/brands" },
      { title: "Units", path: "/dashboard/inventory/units" },
      { title: "Warehouses", path: "/dashboard/inventory/warehouse" },
      { title: "Adjustments", path: "/dashboard/inventory/adjustments" },
      { title: "Suppliers", path: "/dashboard/inventory/suppliers" },
    ],
  },
  {
    title: "Sales",
    icon: ShoppingCart,
    children: [
      { title: "Customers", path: "/dashboard/sales/customers" },
      { title: "Sales Order", path: "/dashboard/sales/sales-order" },
      { title: "Leads", path: "/dashboard/sales/leads" },
      { title: "Deals", path: "/dashboard/sales/deals" },
      { title: "Pipeline", path: "/dashboard/sales/pipeline" },
      { title: "Tasks", path: "/dashboard/sales/tasks" },
      { title: "Campaigns", path: "/dashboard/sales/campaigns" },
      { title: "Analytics", path: "/dashboard/sales/analytics" },
      { title: "Receipts", path: "/dashboard/sales/receipts" },
      { title: "Credit Note", path: "/dashboard/sales/credit-note" },
    ],
  },
  {
    title: "Purchase",
    icon: CreditCard,
    children: [
      { title: "Suppliers", path: "/dashboard/purchases/suppliers" },
      { title: "Purchase Orders", path: "/dashboard/purchases/purchase-order" },
    ],
  },
  {
    title: "Human Resources",
    icon: Users,
    children: [
      { title: "Payslips", path: "/dashboard/hr/pay-slips" },
      { title: "Leave", path: "/dashboard/hr/leave" },
      { title: "Loans", path: "/dashboard/hr/loans" },
      { title: "Employees", path: "/dashboard/hr/employees", roles: ["admin"] },
      { title: "Certification", path: "/dashboard/hr/certification" },
      { title: "Training", path: "/dashboard/hr/training" },
      { title: "Interview", path: "/dashboard/hr/interview" },
    ],
  },
  {
    title: "Fleet",
    icon: Truck,
    children: [
      { title: "Vehicles", path: "/dashboard/fleet/vehicles" },
      { title: "Drivers", path: "/dashboard/fleet/drivers" },
      { title: "Tracking", path: "/dashboard/fleet/tracking" },
      { title: "Logs", path: "/dashboard/fleet/logs" },
    ],
  },
  {
    title: "Projects",
    icon: Briefcase,
    children: [
      { title: "Projects", path: "/dashboard/projects/project" },
      { title: "Job Cards", path: "/dashboard/projects/job-card" },
      {
        title: "Requisitions",
        path: "/dashboard/projects/requisition",
        roles: ["admin"],
      },
    ],
  },
  {
    title: "Reports",
    icon: BarChart3,
    children: [
      { title: "Sales", path: "/dashboard/reports/sales" },
      { title: "Purchase", path: "/dashboard/reports/purchase" },
      { title: "Fleet", path: "/dashboard/reports/fleet" },
      { title: "H.R", path: "/dashboard/reports/hr" },
      // { title: "Payments", path: "/dashboard/reports/payments" },
      { title: "Projects", path: "/dashboard/reports/projects" },
    ],
  },
  { title: "Documents", path: "/dashboard/documents", icon: Book },
];

const Sidebar: React.FC<{
  showSide: boolean;
  setShowSide: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ showSide, setShowSide }) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
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
    <>
      {/* Mobile Overlay */}
      {showSide && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setShowSide(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          flex-shrink-0
          w-64
          bg-white dark:bg-gray-900 
          border-r border-gray-200 dark:border-gray-800
          flex flex-col
          transition-all duration-300 ease-in-out
          h-screen
          ${
            showSide
              ? "fixed inset-y-0 left-0 z-50 translate-x-0"
              : "fixed inset-y-0 left-0 z-50 -translate-x-full lg:translate-x-0 lg:static lg:z-auto"
          }
        `}
      >
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <Webhook className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Corporate ERP
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Dashboard
              </p>
            </div>
          </Link>
          <Button
            onClick={() => setShowSide(false)}
            variant="ghost"
            size="sm"
            className="lg:hidden text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation - Scrollable independently */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4 space-y-1">
            {menuItems.map((item) =>
              checkPermission(item) ? (
                <div key={item.title}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => handleMenuClick(item.title)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                          openMenu === item.title
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          {item.icon && <item.icon className="h-5 w-5" />}
                          {item.title}
                        </span>
                        {openMenu === item.title ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      {openMenu === item.title && (
                        <div className="ml-4 mt-1 space-y-1">
                          {item.children.map((subItem) =>
                            checkPermission(subItem) ? (
                              <Link
                                key={subItem.title}
                                href={subItem.path || "#"}
                                className={`block p-2 pl-4 rounded-lg text-sm transition-all duration-200 ${
                                  pathname === subItem.path
                                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                                }`}
                              >
                                {subItem.title}
                              </Link>
                            ) : null
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.path || "#"}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                        pathname === item.path
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {item.icon && <item.icon className="h-5 w-5" />}
                      {item.title}
                    </Link>
                  )}
                </div>
              ) : null
            )}
          </nav>
        </div>

        {/* Subscription Card */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-800">
          <SubscriptionCard />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
