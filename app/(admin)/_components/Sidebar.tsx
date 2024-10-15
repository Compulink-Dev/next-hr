'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ChevronDown, ChevronUp, Home, Box, Users, Info, Phone, Webhook, BaggageClaim, Minimize2, ShoppingCart, CreditCard, User2, BusFront, FileBarChart, Cable, Book } from 'lucide-react'; // Import Lucide icons
import { Separator } from '@/components/ui/separator';
import SubscriptionCard from '@/app/(dashboard)/_components/SubscriptionCard';
import { Button } from '@/components/ui/button';

interface MenuItem {
    title: string;
    path?: string;
    children?: MenuItem[];
    roles?: string[];  // Define roles that can access the menu item
    icon?: React.ElementType;  // Icon component for the menu item
}

// Menu items with optional role restrictions
const menuItems: MenuItem[] = [
    {
        title: "Home",
        path: "/admin",
        icon: Home,
    },
    {
        title: "Inventory",
        icon: BaggageClaim,
        children: [
            { title: "Item", path: "/admin/inventory/items" },
            { title: "Categories", path: "/admin/inventory/categories" },
            { title: "Brands", path: "/admin/inventory/brands" },
            { title: "Units", path: "/admin/inventory/units" },
            { title: "Warehouse", path: "/admin/inventory/warehouse" },
            { title: "Adjustments", path: "/admin/inventory/categories" },
            { title: "Suppliers", path: "/admin/inventory/suppliers" },
            {
                title: "Mobile Development",
                path: "/services/mobile-development",
                roles: ["admin", "developer"],  // Restricted to admin and developer
            },
        ],
    },
    {
        title: "Sales",
        icon: ShoppingCart,
        children: [
            { title: "Customers", path: "/admin/sales/customers" },
            { title: "Sales Order", path: "/admin/sales/salesorder" },
            { title: "Credit Note", path: "/admin/sales/creditnote" },
            {
                title: "Mobile Development",
                path: "/admin/sales/creditNote",
                roles: ["admin", "developer"],
            },
        ],
    },
    {
        title: "Purchase",
        icon: CreditCard,
        children: [
            { title: "Suppliers", path: "/admin/purchases/suppliers" },
            { title: "Purchase Order", path: "/admin/purchases/purchaseorder" },
            { title: "Debit Note", path: "/admin/purchases/debit-note" },
            {
                title: "Mobile Development",
                path: "/services/mobile-development",
                roles: ["admin", "developer"],
            },
        ],
    },
    {
        title: "H.R",
        icon: User2,
        children: [
            { title: "Loans", path: "/admin/hr/loans" },
            { title: "Leave Forms", path: "/admin/hr/leave" },
            { title: "Payslips", path: "/admin/hr/pay-slips" },
            { title: "Employees", path: "/admin/hr/employees" },
            { title: "Certification", path: "/admin/hr/certification" },
            { title: "Training", path: "/admin/hr/training" },
            {
                title: "Mobile Development",
                path: "/services/mobile-development",
                roles: ["admin", "developer"],
            },
        ],
    },
    {
        title: "Fleet",
        icon: BusFront,
        children: [
            { title: "Invoice", path: "/admin/fleet/invoices" },
            { title: "Vehicles", path: "/admin/fleet/vehicles" },
            { title: "Drivers", path: "/admin/fleet/drivers" },
            { title: "Tracking", path: "/admin/fleet/tracking" },
            {
                title: "Mobile Development",
                path: "/services/mobile-development",
                roles: ["admin", "developer"],
            },
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
            {
                title: "Mobile Development",
                path: "/services/mobile-development",
                roles: ["admin", "developer"],
            },

        ],
    },
    {
        title: "Integrations",
        path: "/admin/integrations",
        icon: Cable,
    },
    {
        title: "Documents",
        path: "/admin/documents",
        icon: Book,
    },
];

const Sidebar: React.FC<{ showSide: boolean; setShowSide: React.Dispatch<React.SetStateAction<boolean>> }> = ({ showSide, setShowSide }) => {
    const { data: session } = useSession(); // Access session
    const [openMenu, setOpenMenu] = useState<string | null>(null);


    console.log("Session Data: ", session);
    console.log("User Role: ", session?.user?.role);

    // Toggle open/close of submenus
    const handleMenuClick = (title: string) => {
        setOpenMenu(openMenu === title ? null : title);
    };

    // Check if the user has permission to see the menu item
    const checkPermission = (item: MenuItem) => {
        if (item.roles && session?.user?.role) {
            console.log("Roles required: ", item.roles, "User Role: ", session.user.role); // Log roles required for the item
            return item.roles.includes(session.user.role); // Check if user's role is allowed
        }
        return true; // Public item
    };

    return (
        <div className={`${showSide ? "w-64 h-full fixed p-4 bg-slate-900 text-white md:flex flex-col z-50 overflow-y-scroll scrollbar-hide" : "w-64 h-full fixed p-4 bg-slate-900 text-white md:flex flex-col hidden z-50 overflow-y-scroll scrollbar-hide"}`}>
            <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center p-4">
                    <Webhook />
                    <p className="">Compulink</p>
                </div>
                <Button
                    onClick={() => setShowSide(false)}
                    className='flex md:hidden'
                >
                    <Minimize2 className='h-5 w-5' />
                </Button>
            </div>
            <Separator />
            <ul className="space-y-2 p-4">
                {menuItems.map((item) => (
                    <li key={item.title} className='group p-2 hover:text-slate-700 '>
                        {item.children ? (
                            <>
                                {/* Parent item with submenu */}
                                <span
                                    className="flex items-center justify-between cursor-pointer"
                                    onClick={() => handleMenuClick(item.title)}>
                                    <span className="flex items-center">
                                        {item.icon && <item.icon className="w-4 h-4 mr-2 text-gray-400" />}
                                        {item.title}
                                    </span>
                                    {openMenu === item.title ? (
                                        <ChevronUp className="w-4 h-4 text-gray-400" />
                                    ) : (
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    )}
                                </span>
                                {/* Submenu */}
                                {openMenu === item.title && (
                                    <ul className="space-y-1 mt-2 ml-4">
                                        {item.children.map((subItem) =>
                                            checkPermission(subItem) ? (
                                                <li
                                                    className='text-sm'
                                                    key={subItem.title}>
                                                    <Link
                                                        className="block p-2 pl-4 text-gray-400 hover:text-white"
                                                        href={subItem.path || '#'}>
                                                        <span className="flex items-center">
                                                            {subItem.icon && <subItem.icon className="w-4 h-4 mr-2 text-gray-400" />}
                                                            {subItem.title}
                                                        </span>
                                                    </Link>
                                                </li>
                                            ) : null // Hide the item if the user doesn't have permission
                                        )}
                                    </ul>
                                )}
                            </>
                        ) : (
                            // Top-level item
                            checkPermission(item) ? (
                                <Link
                                    className="block rounded-md"
                                    href={item.path || '#'}>
                                    <span className="flex items-center ">
                                        {item.icon && <item.icon className="w-4 h-4 mr-2 text-gray-400" />}
                                        {item.title}
                                    </span>
                                </Link>
                            ) : null
                        )}
                    </li>
                ))}
            </ul>
            <div className="">
                <SubscriptionCard />
            </div>
            <div className="flex items-center justify-center py-6">
                <Button className=''>
                    <ChevronDown size={14} />
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;
