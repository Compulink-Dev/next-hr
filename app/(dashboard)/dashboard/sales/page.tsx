import React from "react";
import {
  BadgeDollarSign,
  BadgePercent,
  Boxes,
  CircleUserRound,
  Cog,
  Component,
  Factory,
  Frame,
  List,
  Merge,
  Notebook,
  Shirt,
  StickyNote,
  User,
  Warehouse,
} from "lucide-react";
import OptionCard from "./_components/OptionCard";
import FixedHeader from "../../_components/fixedHeader";

function DashInventory() {
  const optionCards = [
    {
      title: "Customers",
      description: "Create standalone items and services that you buy and sell",
      link: "/customers",
      linkTitle: "New Customer",
      enabled: true,
      icon: CircleUserRound,
    },
    {
      title: "Sales order",
      description: "Create standalone items and services that you buy and sell",
      link: "/salesorder",
      linkTitle: "New Order",
      enabled: true,
      icon: BadgeDollarSign,
    },
    {
      title: "Invoices",
      description: "Create standalone items and services that you buy and sell",
      link: "/invoices",
      linkTitle: "New Invoice",
      enabled: true,
      icon: Notebook,
    },
    {
      title: "Credit Note",
      description: "Create standalone items and services that you buy and sell",
      link: "/creditnote",
      linkTitle: "New Credit Note",
      enabled: true,
      icon: StickyNote,
    },
  ];

  return (
    <div className="">
      <FixedHeader link={"/admin/sales/items/new"} title="New Item" />
      <div className="p-8 grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {optionCards.map((card, i) => (
          <OptionCard key={i} optionData={card} />
        ))}
      </div>
    </div>
  );
}

export default DashInventory;
