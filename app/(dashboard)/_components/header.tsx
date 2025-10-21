"use client";
import React, { useState } from "react";
import { BellDot, History, Menu, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { generateInitials } from "@/lib/initials";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // ShadCN Dialog import
import SearchInput from "./SearchInput";
import { usePathname } from "next/navigation";

function Header({ setShowSide }: { setShowSide: (v: boolean) => void }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (status === "loading") {
    return <p className="text-xs text-slate-500">Loading user...</p>;
  }

  const username = session?.user?.name?.split(" ")[0] || undefined;
  const initial = generateInitials(username);
  const role = session?.user?.role || "user";

  const navLinks = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Inventory", href: "/dashboard/inventory" },
    { title: "Sales", href: "/dashboard/sales" },
    { title: "Purchases", href: "/dashboard/purchases" },
    { title: "HR", href: "/dashboard/hr" },
    { title: "Fleet", href: "/dashboard/fleet" },
    { title: "Projects", href: "/dashboard/projects" },
    { title: "Reports", href: "/dashboard/reports" },
    { title: "Documents", href: "/dashboard/documents" },
  ];

  const closeModal = () => setIsModalOpen(false);
  const handleLogout = () => {
    signOut({ redirect: true, callbackUrl: "/" });
    closeModal();
  };

  return (
    <header className="bg-white/80 dark:bg-gray-900/60 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="h-14 px-4 flex items-center gap-4">
        {/* Mobile: open sidebar */}
        <Button
          onClick={() => setShowSide(true)}
          variant="ghost"
          className="md:hidden text-gray-600 dark:text-gray-300"
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Brand */}
        <Link href="/dashboard" className="hidden md:inline-flex items-center text-sm font-semibold text-gray-900 dark:text-white">
          Corporate ERP
        </Link>

        {/* Search */}
        <div className="hidden md:flex items-center gap-3">
          <History className="w-4 h-4 text-slate-500" />
          <SearchInput />
        </div>

        {/* Center nav */}
        <nav className="hidden lg:block ml-4">
          <ul className="flex items-center gap-3 text-sm">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${active ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"} px-2 py-1 rounded-md`}
                  >
                    {link.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right section */}
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" className="hidden md:inline-flex hover:bg-gray-100 dark:hover:bg-gray-800">
            <BellDot className="h-5 w-5" />
          </Button>
          <Button variant="ghost" className="hidden md:inline-flex hover:bg-gray-100 dark:hover:bg-gray-800">
            <Settings className="h-5 w-5" />
          </Button>

          {/* User */}
          <div className="flex items-center">
            {session?.user?.image ? (
              <Image src={session.user.image} alt="" height={32} width={32} className="w-8 h-8 rounded-full border border-slate-300" />
            ) : username ? (
              <Button variant="ghost" className="hidden md:inline-flex hover:bg-gray-100 dark:hover:bg-gray-800">
                {username}
              </Button>
            ) : null}

            {session?.user?.name ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full bg-blue-600 text-white">
                    <span>{initial}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Profile</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="w-full p-4 flex flex-col gap-2">
                    <DropdownMenuItem>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/profile">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/profile">Subscriptions</Link>
                    </DropdownMenuItem>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-500">Logout</Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white dark:bg-gray-900">
                        <DialogHeader>
                          <DialogTitle>Confirm Logout</DialogTitle>
                        </DialogHeader>
                        <p>Are you sure you want to log out?</p>
                        <div className="mt-4 flex gap-4">
                          <Button variant="outline" className="border-slate-700" onClick={closeModal}>Cancel</Button>
                          <Button className="bg-blue-600 text-white" onClick={handleLogout}>Logout</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
