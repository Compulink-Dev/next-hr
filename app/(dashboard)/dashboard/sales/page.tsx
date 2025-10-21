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
      description: "Manage your customer contacts",
      link: "/customers",
      linkTitle: "New Customer",
      enabled: true,
      icon: CircleUserRound,
    },
    {
      title: "Companies",
      description: "Accounts/organizations you work with",
      link: "/companies",
      linkTitle: "New Company",
      enabled: true,
      icon: Component,
    },
    {
      title: "Leads",
      description: "Capture and qualify potential customers",
      link: "/leads",
      linkTitle: "New Lead",
      enabled: true,
      icon: User,
    },
    {
      title: "Deals",
      description: "Track opportunities and outcomes",
      link: "/deals",
      linkTitle: "New Deal",
      enabled: true,
      icon: BadgeDollarSign,
    },
    {
      title: "Pipeline",
      description: "Configure pipeline stages",
      link: "/pipeline",
      linkTitle: "New Stage",
      enabled: true,
      icon: List,
    },
    {
      title: "Campaigns",
      description: "Run and track campaigns",
      link: "/campaigns",
      linkTitle: "New Campaign",
      enabled: true,
      icon: Notebook,
    },
    {
      title: "Tasks",
      description: "Plan and execute activities",
      link: "/tasks",
      linkTitle: "New Task",
      enabled: true,
      icon: StickyNote,
    },
    {
      title: "Analytics",
      description: "Sales insights and metrics",
      link: "/analytics",
      linkTitle: "New Event",
      enabled: true,
      icon: Cog,
    },
    {
      title: "Sales order",
      description: "Create sales orders",
      link: "/sales-order",
      linkTitle: "New Order",
      enabled: true,
      icon: BadgeDollarSign,
    },
    {
      title: "Invoices",
      description: "Create and manage invoices",
      link: "/invoices",
      linkTitle: "New Invoice",
      enabled: true,
      icon: Notebook,
    },
    {
      title: "Credit Note",
      description: "Issue credit notes",
      link: "/credit-note",
      linkTitle: "New Credit Note",
      enabled: true,
      icon: StickyNote,
    },
  ];

  return (
    <div className="">
      <FixedHeader link={"/dashboard/sales/invoices/new"} title="Sales" />
      <div className="p-8 grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {optionCards.map((card, i) => (
          <OptionCard key={i} optionData={card} />
        ))}
      </div>
    </div>
  );
}

export default DashInventory;
