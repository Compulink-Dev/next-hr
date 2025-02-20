import type { Metadata } from "next";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Footer from "./_components/Footer";
import Content from "./_components/Content";

export const metadata: Metadata = {
  title: "CRM Compulink",
  description: "CRM Compulink",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <Hero />
      <Content />
      <main className="">{children}</main>
      <Footer />
    </div>
  );
}
