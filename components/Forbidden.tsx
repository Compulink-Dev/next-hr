"use client";
import Link from "next/link";

export default function Forbidden({ message = "You don’t have permission to view this page." }: { message?: string }) {
  return (
    <div className="max-w-xl mx-auto border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900 rounded-xl p-6 text-center">
      <h2 className="text-lg font-semibold text-red-700 dark:text-red-300">Access denied</h2>
      <p className="mt-2 text-sm text-red-700/90 dark:text-red-200/90">{message}</p>
      <div className="mt-4 flex justify-center gap-3">
        <Link href="/dashboard" className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-500">Go to dashboard</Link>
        <Link href="/auth/login" className="px-4 py-2 rounded-md ring-1 ring-inset ring-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">Sign in</Link>
      </div>
    </div>
  );
}