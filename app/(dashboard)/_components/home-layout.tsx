import React from "react";
import HomeNavbar from "./homeNavbar";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <HomeNavbar />
      <main className="p-6">{children}</main>
    </div>
  );
}

export default HomeLayout;
