import React from "react";
import Link from "next/link";
import { ArrowRight, Play, Zap, CheckCircle } from "lucide-react";

function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-20 h-80 w-80 rounded-full bg-blue-200 blur-3xl opacity-40 animate-pulse dark:bg-blue-900/20" />
        <div className="absolute top-40 -left-20 h-72 w-72 rounded-full bg-indigo-200 blur-3xl opacity-40 animate-pulse delay-1000 dark:bg-indigo-900/20" />
      </div>

      <div className="relative py-20 lg:py-32 px-4 mx-auto max-w-7xl">
        <div className="text-center">
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900/30 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 mb-8 border border-blue-200 dark:border-blue-800 hover:scale-105 transition-transform cursor-pointer">
            <Zap className="h-4 w-4" />
            {`Compulink CRM is here! See what's new`}
            <ArrowRight className="h-4 w-4 ml-1" />
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white">
            Transform Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Business
            </span>{" "}
            Operations
          </h1>

          {/* Subheading */}
          <p className="mb-8 text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Comprehensive CRM packed with powerful modules to streamline your
            inventory, sales, HR, fleet management, and more in one unified
            platform.
          </p>

          {/* Feature Points */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {[
              "All-in-One Solution",
              "Real-time Analytics",
              "Cloud Based",
              "24/7 Support",
            ].map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
              >
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/auth/register"
              className="group inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/demo"
              className="group inline-flex items-center justify-center rounded-2xl bg-white/80 dark:bg-gray-800/80 px-8 py-4 text-lg font-semibold text-gray-900 dark:text-white ring-1 ring-gray-200 dark:ring-gray-700 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {[
              { number: "99.9%", label: "Uptime" },
              { number: "500+", label: "Companies" },
              { number: "50K+", label: "Users" },
              { number: "24/7", label: "Support" },
            ].map((stat) => (
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
      </div>
    </section>
  );
}

export default Hero;
