import React from "react";
import {
  BadgePercent,
  Boxes,
  Cog,
  Component,
  Factory,
  Frame,
  List,
  Merge,
  Shirt,
  User,
  Warehouse,
  LucideIcon,
} from "lucide-react";
import OptionCard from "../../_components/OptionCard";
import FixedHeader from "@/app/(dashboard)/_components/fixedHeader";

interface OptionCardData {
  title: string;
  description: string;
  link: string;
  linkTitle: string;
  enabled: boolean;
  icon: LucideIcon;
}

function DashInventory() {
  const optionCards: OptionCardData[] = [
    {
      title: "Items",
      description: "Create standalone items and services that you buy and sell",
      link: "/items",
      linkTitle: "New Item",
      enabled: true,
      icon: Shirt,
    },
    {
      title: "Categories",
      description:
        "Organize your products into categories for better management",
      link: "/categories",
      linkTitle: "New Category",
      enabled: true,
      icon: Boxes,
    },
    {
      title: "Brands",
      description: "Manage product brands and manufacturers",
      link: "/brands",
      linkTitle: "New Brand",
      enabled: true,
      icon: Frame,
    },
    {
      title: "Adjustments",
      description: "Adjust inventory quantities and track changes",
      link: "/adjustments",
      linkTitle: "New Adjustment",
      enabled: true,
      icon: Cog,
    },
    {
      title: "Units",
      description: "Manage measurement units for your products",
      link: "/units",
      linkTitle: "New Unit",
      enabled: true,
      icon: Merge,
    },
    {
      title: "Warehouse",
      description: "Manage warehouse locations and storage",
      link: "/warehouse",
      linkTitle: "New Warehouse",
      enabled: true,
      icon: Warehouse,
    },
    {
      title: "Supplier",
      description: "Manage your suppliers and vendors",
      link: "/suppliers",
      linkTitle: "New Supplier",
      enabled: true,
      icon: Factory,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <FixedHeader link="/dashboard/inventory/items/new" title="Inventory" />
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {optionCards.map((card, index) => (
          <OptionCard key={card.title} optionData={card} />
        ))}
      </div>
    </div>
  );
}

export default DashInventory;
