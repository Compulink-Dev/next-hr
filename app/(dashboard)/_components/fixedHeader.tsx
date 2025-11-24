import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/authOptions";
import {
  ChevronDown,
  HelpCircle,
  LayoutGrid,
  List,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

interface FixedHeaderProps {
  link: string;
  title: string;
}

async function FixedHeader({ link, title }: FixedHeaderProps) {
  const session = await getServerSession(authOptions);
  const userRole = session?.user?.role;

  const buildHref = (path: string): string => {
    const cleanPath = path.replace(/^\/+/, "");
    return `/dashboard/${cleanPath}`;
  };

  const buildNewHref = (path: string): string => {
    const base = buildHref(path);
    return base.endsWith("/new") ? base : `${base}/new`;
  };

  const canCreate = userRole === "hr" || userRole === "admin";

  return (
    <div className="flex items-center justify-between p-6 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        <Button variant="outline" className="flex items-center gap-2">
          <span>All {title}</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center gap-3">
        {canCreate && (
          <Link
            href={buildNewHref(link)}
            className="group relative flex items-center gap-2 bg-gradient-to-br from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ease-out shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm border border-white/20"
            aria-label={`Create new ${title}`}
          >
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

            {/* Icon with animation */}
            <Plus className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
            <span className="relative z-10">New</span>

            {/* Subtle pulse animation */}
            <div className="absolute inset-0 rounded-2xl border-2 border-white/30 animate-pulse group-hover:animate-none" />
          </Link>
        )}

        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            className="p-2 rounded-md hover:bg-white transition-colors duration-200"
            title="List view"
          >
            <List className="w-4 h-4 text-gray-600" />
          </button>
          <button
            className="p-2 rounded-md hover:bg-white transition-colors duration-200"
            title="Grid view"
          >
            <LayoutGrid className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <Button variant="ghost" size="icon" title="More options">
          <MoreHorizontal className="w-5 h-5" />
        </Button>

        <Button variant="ghost" size="icon" title="Help">
          <HelpCircle className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}

export default FixedHeader;
