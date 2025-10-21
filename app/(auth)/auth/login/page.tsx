"use client";

import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Timer } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      username: credentials.username,
      password: credentials.password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      toast.error("Invalid email or password");
      setError("Invalid email or password");
      return;
    }

    // Always land in unified dashboard; role drives UI there
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950">
      <div className="bg-white/90 dark:bg-gray-900/70 backdrop-blur rounded-2xl shadow-xl w-full max-w-md p-8 ring-1 ring-gray-200 dark:ring-gray-800">
        <div className="flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400 font-semibold">
          <Timer className="h-5 w-5" />
          Corporate ERP
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
          Welcome back
        </h1>
        {error && (
          <p className="text-red-500 text-sm text-center mb-2">{error}</p>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            className="block w-full rounded-lg border-0 py-2.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
            disabled={loading}
          />
          <Input
            type="password"
            placeholder="Password"
            value={credentials.password}
            className="block w-full rounded-lg border-0 py-2.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            disabled={loading}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-lg font-medium flex items-center justify-center transition-colors"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
            ) : (
              "Sign in"
            )}
          </button>
          <div className="text-sm flex gap-2 items-center justify-center text-gray-600 dark:text-gray-300">
            <p>{`Don't have an account?`}</p>
            <Link
              className="text-blue-700 dark:text-blue-400 font-semibold hover:underline"
              href="/auth/register"
            >
              Create one
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
