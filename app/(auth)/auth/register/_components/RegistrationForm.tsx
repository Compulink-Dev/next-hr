"use client";
import SubmitButton from "@/app/(dashboard)/dashboard/inventory/_components/SubmitButton";
import TextInput from "@/app/(dashboard)/dashboard/inventory/_components/TextInput";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function RegistrationForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [emailErr, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const watchPassword = watch("password", "");

  // Password strength calculator
  React.useEffect(() => {
    const calculateStrength = (password: string) => {
      let strength = 0;
      if (password.length >= 8) strength += 25;
      if (/[A-Z]/.test(password)) strength += 25;
      if (/[0-9]/.test(password)) strength += 25;
      if (/[^A-Za-z0-9]/.test(password)) strength += 25;
      setPasswordStrength(strength);
    };

    calculateStrength(watchPassword);
  }, [watchPassword]);

  const getPasswordStrengthColor = () => {
    if (passwordStrength >= 75) return "bg-green-500";
    if (passwordStrength >= 50) return "bg-yellow-500";
    if (passwordStrength >= 25) return "bg-orange-500";
    return "bg-red-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength >= 75) return "Strong";
    if (passwordStrength >= 50) return "Medium";
    if (passwordStrength >= 25) return "Weak";
    return "Very Weak";
  };

  async function onSubmit(data: any) {
    try {
      setLoading(true);

      // Set default role to "user"
      const userData = {
        ...data,
        role: "user",
      };

      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();

      if (response.ok) {
        setLoading(false);
        toast.success("🎉 Account created successfully!");
        reset();
        // Auto-login after successful registration
        const signInResult = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        if (signInResult?.ok) {
          router.push("/dashboard");
        } else {
          router.push("/auth/login");
        }
      } else {
        setLoading(false);
        if (response.status === 409) {
          setEmail("User with this email already exists");
          toast.error("Email already registered");
        } else {
          console.log("Server error:", responseData.message);
          toast.error("Something went wrong. Please try again.");
        }
      }
    } catch (error) {
      setLoading(false);
      console.log("Network error: ", error);
      toast.error("Network error. Please check your connection.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {emailErr && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3 text-red-700 dark:text-red-400 animate-shake">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          {emailErr}
        </div>
      )}

      <div className="space-y-5">
        {/* Name Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <User className="h-4 w-4" />
            Full Name
          </label>
          <div className="relative">
            <TextInput
              errors={errors}
              label={""}
              name={"name"}
              register={register}
              type="text"
              className="w-full rounded-xl border-0 py-3.5 px-4 pl-11 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-200 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all duration-200"
              placeholder="Enter your full name"
              required
            />
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Address
          </label>
          <div className="relative">
            <TextInput
              errors={errors}
              label={""}
              name={"email"}
              register={register}
              type="email"
              className="w-full rounded-xl border-0 py-3.5 px-4 pl-11 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-200 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all duration-200"
              placeholder="Enter your email address"
              required
            />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Password
          </label>
          <div className="relative">
            <TextInput
              errors={errors}
              label={""}
              name={"password"}
              register={register}
              type={showPassword ? "text" : "password"}
              className="w-full rounded-xl border-0 py-3.5 px-4 pl-11 pr-12 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-200 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all duration-200"
              placeholder="Create a strong password"
              required
            />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Password Strength Meter */}
          {watchPassword && (
            <div className="space-y-2 animate-fade-in">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">
                  Password strength
                </span>
                <span
                  className={`font-medium ${
                    passwordStrength >= 75
                      ? "text-green-600"
                      : passwordStrength >= 50
                      ? "text-yellow-600"
                      : passwordStrength >= 25
                      ? "text-orange-600"
                      : "text-red-600"
                  }`}
                >
                  {getPasswordStrengthText()}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                  style={{ width: `${passwordStrength}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          {...register("terms", {
            required: "You must accept the terms and conditions",
          })}
          className="mt-0.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label className="text-gray-600 dark:text-gray-400">
          I agree to the{" "}
          <Link
            href="/terms"
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
          >
            Terms and Conditions
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
          >
            Privacy Policy
          </Link>
        </label>
      </div>
      {errors.terms && (
        <p className="text-red-500 text-sm mt-1">
          {errors.terms.message as string}
        </p>
      )}

      <SubmitButton
        isLoading={loading}
        title="Create Account"
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      />

      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => signIn()}
          className="text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors inline-flex items-center gap-1"
        >
          Sign in here
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}

export default RegistrationForm;
