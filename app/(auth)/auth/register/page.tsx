"use client";
import {
  Timer,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  User,
  Mail,
  Lock,
  Shield,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import RegistrationForm from "./_components/RegistrationForm";

function Register() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-950 p-4">
        <div className="w-full max-w-md bg-white/90 dark:bg-gray-900/70 backdrop-blur rounded-2xl shadow-xl ring-1 ring-gray-200 dark:ring-gray-800 p-8">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-6"></div>
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-950 p-4">
      <div className="w-full max-w-md bg-white/90 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-gray-100 dark:ring-gray-800 overflow-hidden transition-all duration-300 hover:shadow-2xl">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Timer className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Corporate ERP
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold leading-tight">
            Join us today
          </h1>
          <p className="text-indigo-100 mt-2 opacity-90">
            Create your account and get started
          </p>
        </div>

        <div className="p-8">
          <RegistrationForm />
        </div>
      </div>
    </section>
  );
}

export default Register;
