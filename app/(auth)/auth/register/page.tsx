import { Timer } from "lucide-react";
import React from "react";
import RegistrationForm from "./_components/RegistrationForm";

function Register() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-950">
      <div className="w-full max-w-md bg-white/90 dark:bg-gray-900/70 backdrop-blur rounded-2xl shadow-xl ring-1 ring-gray-200 dark:ring-gray-800 p-8">
        <div className="flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400 font-semibold">
          <Timer className="h-5 w-5" />
          Corporate ERP
        </div>
        <h1 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white mb-6">
          Create your account
        </h1>
        <RegistrationForm />
      </div>
    </section>
  );
}

export default Register;
