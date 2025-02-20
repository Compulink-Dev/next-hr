"use client";

import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Timer } from "lucide-react";
import Link from "next/link";

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
      redirect: false, // Prevent automatic redirection
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid username or password");
      return;
    }

    // Fetch the session to get the user role
    const response = await fetch("/api/auth/session");
    const session = await response.json();

    if (session?.user?.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <div className="my-4 flex gap-2 items-center">
          <Timer />
          Inventory
        </div>
        <h1 className="text-xl mb-4 font-bold leading-tight dark:text-white">
          Create a new account
        </h1>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            disabled={loading}
          />
          <Input
            type="password"
            placeholder="Password"
            value={credentials.password}
            className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            disabled={loading}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin border-t-2 border-white rounded-full w-5 h-5"></span>
            ) : (
              "Login"
            )}
          </button>
          <div className="text-sm flex gap-1 items-center">
            <p>{"Don't have an account?"}</p>
            <Link className="text-blue-800 font-bold" href="/auth/register">
              Register?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
