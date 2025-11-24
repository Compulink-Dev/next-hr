"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  HelpCircle,
  LayoutGrid,
  List,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";

interface FixedHeaderProps {
  link: string;
  title: string;
  viewMode?: "list" | "grid";
  onViewModeChange?: (mode: "list" | "grid") => void;
  className?: string;
}

function FixedHeader({
  link,
  title,
  viewMode = "list",
  onViewModeChange,
  className = "",
}: FixedHeaderProps) {
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  // Build the proper href for the new item link
  const buildNewHref = (path: string): string => {
    const cleanPath = path.replace(/^\/+|\/+$/g, "");
    return `/admin/${cleanPath}`;
  };

  const newItemHref = buildNewHref(link);

  return (
    <header
      className={`bg-white border-b border-gray-200 shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section - Title and Filter */}
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-gray-900 hidden sm:block">
            {title}
          </h1>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-gray-300 hover:bg-gray-50"
            size="sm"
          >
            <span className="text-sm font-medium">All {title}</span>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>

        {/* Right Section - Actions and Controls */}
        <div className="flex items-center gap-3">
          {/* New Item Button - Admin Only */}
          {userRole === "admin" && (
            <Link href={newItemHref}>
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">New</span>
              </Button>
            </Link>
          )}

          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange?.("list")}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === "list"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              title="List view"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange?.("grid")}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === "grid"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              title="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              title="More options"
            >
              <MoreHorizontal className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              title="Help"
            >
              <HelpCircle className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default FixedHeader;
