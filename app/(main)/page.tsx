import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Users,
  Truck,
  Folder,
  Package,
  ShoppingCart,
  Briefcase,
  CheckCircle,
  Play,
  Shield,
  Zap,
} from "lucide-react";

function HomePage() {
  const features = [
    {
      icon: <Package className="h-6 w-6" />,
      title: "Inventory",
      desc: "Items, categories, brands, suppliers, warehouses, stock adjustments",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <ShoppingCart className="h-6 w-6" />,
      title: "Sales & Purchases",
      desc: "Orders, invoices, receipts, credit/debit notes, payments",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Human Resource",
      desc: "Employees, leave, loans, payslips, interviews, reviews, training",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Fleet",
      desc: "Vehicles, drivers, logs, invoices, live tracking",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Projects",
      desc: "Projects, job cards, requisitions, approvals",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: <Folder className="h-6 w-6" />,
      title: "Documents",
      desc: "Centralized repository with access control and sharing",
      color: "from-gray-600 to-gray-700",
    },
  ];

  const stats = [
    { number: "99.9%", label: "Uptime" },
    { number: "500+", label: "Companies" },
    { number: "50K+", label: "Users" },
    { number: "24/7", label: "Support" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-20 h-80 w-80 rounded-full bg-blue-200 blur-3xl opacity-40 animate-pulse dark:bg-blue-900/20" />
        <div className="absolute top-40 -left-20 h-72 w-72 rounded-full bg-indigo-200 blur-3xl opacity-40 animate-pulse delay-1000 dark:bg-indigo-900/20" />
        <div className="absolute bottom-20 right-1/4 h-64 w-64 rounded-full bg-purple-200 blur-3xl opacity-40 animate-pulse delay-500 dark:bg-purple-900/20" />
        <div className="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-cyan-200 blur-3xl opacity-30 animate-pulse delay-1500 dark:bg-cyan-900/20" />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900/30 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 mb-8 border border-blue-200 dark:border-blue-800">
            <Zap className="h-4 w-4" />
            Trusted by 500+ companies worldwide
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white">
            Run your entire{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              business
            </span>{" "}
            in one place
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            A modern corporate ERP to automate and digitize operations across{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              Inventory, Sales, HR, Fleet, Projects, and more
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/register"
              className="group relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="relative">Get started free</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/auth/login"
              className="group inline-flex items-center justify-center rounded-2xl bg-white/80 dark:bg-gray-800/80 px-8 py-4 text-lg font-semibold text-gray-900 dark:text-white ring-1 ring-gray-200 dark:ring-gray-700 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch demo
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Everything you need
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive modules designed to streamline your entire business
              operation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative rounded-3xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-transparent"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon Background */}
                <div
                  className={`inline-flex rounded-2xl bg-gradient-to-r ${feature.color} p-3 text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.desc}
                </p>

                {/* Hover Effect Border */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="relative py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 p-12 text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to transform your business?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of companies that have streamlined their operations
              with our modern ERP solution.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-2xl hover:bg-gray-50 hover:scale-105 transition-all duration-300"
              >
                Start free trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-transparent px-8 py-4 text-lg font-semibold text-white ring-2 ring-white hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Contact sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm py-12">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-900 dark:text-white font-semibold text-lg mb-4">
            <Shield className="h-6 w-6" />
            Corporate ERP
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            © 2025 Corporate ERP. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

export default HomePage;
