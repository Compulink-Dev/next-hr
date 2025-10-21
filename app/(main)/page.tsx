import React from "react";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Link from "next/link";

function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-gray-900 dark:to-gray-950">
      <section className="relative overflow-hidden">
        <div className="absolute -top-32 -right-24 h-64 w-64 rounded-full bg-blue-100 blur-3xl opacity-60 dark:bg-blue-900/30" />
        <div className="absolute -bottom-40 -left-24 h-72 w-72 rounded-full bg-indigo-100 blur-3xl opacity-60 dark:bg-indigo-900/30" />
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
            Run your entire business in one place
          </h2>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A modern corporate ERP to automate and digitize operations across
            Inventory, Sales & Purchases, Human Resource, Fleet, Projects,
            Documents, and Reports.
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Inventory",
                desc: "Items, categories, brands, suppliers, warehouses, stock adjustments",
              },
              {
                title: "Sales & Purchases",
                desc: "Orders, invoices, receipts, credit/debit notes, payments",
              },
              {
                title: "Human Resource",
                desc: "Employees, leave, loans, payslips, interviews, reviews, training",
              },
              {
                title: "Fleet",
                desc: "Vehicles, drivers, logs, invoices, live tracking",
              },
              {
                title: "Projects",
                desc: "Projects, job cards, requisitions, approvals",
              },
              {
                title: "Documents",
                desc: "Centralized repository with access control and sharing",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/50 backdrop-blur shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex items-center justify-center gap-3">
            <Link
              href="/auth/register"
              className="inline-flex items-center rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Get started free
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-transparent dark:text-white dark:ring-gray-700 dark:hover:bg-gray-800"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
