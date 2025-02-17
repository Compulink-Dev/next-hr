import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Toast } from 'react-hot-toast';
import AuthProvider from "@/context/AuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";


export const metadata: Metadata = {
  title: "CRM Compulink",
  description: "CRM Compulink",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = getServerSession(authOptions)

  return (
    <html lang="en">
      <body>
        {/*//@ts-ignore*/}
        <AuthProvider session={session}>
          <Toaster />
          {children}
          <Toast />
        </AuthProvider>
      </body>
    </html>
  );
}
