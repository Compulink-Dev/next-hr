"use client";
import React, { useState } from "react";
import Sidebar from "../_components/Sidebar";
import { useSession } from "next-auth/react";
import Login from "../../login/page";
import Header from "../_components/header";

function AdminLayout({ children }: { children: React.ReactNode }) {
  const [showSide, setShowSide] = useState(false);
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <Login />;
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <Sidebar showSide={showSide} setShowSide={setShowSide} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header setShowSide={setShowSide} />

        {/* Scrollable main content only */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
