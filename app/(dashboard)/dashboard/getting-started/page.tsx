import React from "react";
import HomeLayout from "../../_components/home-layout";
import Link from "next/link";
import {
  ArrowRight,
  Rocket,
  BookOpen,
  Mail,
  BarChart3,
  Users,
  Package,
  Briefcase,
} from "lucide-react";

function GettingStarted() {
  const steps = [
    {
      icon: Users,
      title: "Create Account",
      description: "Set up your account to access all features",
      status: "completed",
    },
    {
      icon: BarChart3,
      title: "Explore Dashboard",
      description: "Discover key metrics and insights",
      status: "current",
    },
    {
      icon: Package,
      title: "Manage Inventory",
      description: "Add and organize your products",
      status: "pending",
    },
    {
      icon: Briefcase,
      title: "Track Sales",
      description: "Monitor your business performance",
      status: "pending",
    },
    {
      icon: Users,
      title: "HR Management",
      description: "Manage your team and employees",
      status: "pending",
    },
  ];

  return (
    <HomeLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
        {/* Header Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-sm border border-slate-200/60 mb-6">
              <Rocket className="w-6 h-6 text-blue-600" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome Aboard!
              </h1>
            </div>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {`Let's get you set up and running in no time. Follow the steps below to maximize your experience.`}
            </p>
          </div>

          {/* Progress Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                    step.status === "completed"
                      ? "bg-green-50 border-green-200 shadow-sm"
                      : step.status === "current"
                      ? "bg-white border-blue-300 shadow-md"
                      : "bg-slate-50/80 border-slate-200"
                  }`}
                >
                  {/* Step Number */}
                  <div
                    className={`absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                      step.status === "completed"
                        ? "bg-green-500"
                        : step.status === "current"
                        ? "bg-blue-500"
                        : "bg-slate-400"
                    }`}
                  >
                    {index + 1}
                  </div>

                  <Icon
                    className={`w-8 h-8 mb-3 ${
                      step.status === "completed"
                        ? "text-green-600"
                        : step.status === "current"
                        ? "text-blue-600"
                        : "text-slate-400"
                    }`}
                  />

                  <h3 className="font-semibold text-slate-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600">{step.description}</p>

                  {step.status === "current" && (
                    <div className="absolute bottom-4 right-4">
                      <ArrowRight className="w-4 h-4 text-blue-600 animate-pulse" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Additional Resources */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-slate-200/60">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-800 mb-2">
                  Need Guidance?
                </h3>
                <p className="text-slate-600 mb-4">
                  Explore our comprehensive documentation
                </p>
                <Link
                  href="/documentation"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg"
                >
                  <BookOpen className="w-4 h-4" />
                  View Documentation
                </Link>
              </div>

              <div className="text-center">
                <Mail className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-800 mb-2">Get Help</h3>
                <p className="text-slate-600 mb-4">
                  Our team is here to support you
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg"
                >
                  <Mail className="w-4 h-4" />
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default GettingStarted;
