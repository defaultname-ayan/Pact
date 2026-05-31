"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
}
export default function LoginPage() {
  const [form, setForm] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const validate = (): LoginErrors => {
    const e: LoginErrors = {};

    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      e.email = "Enter a valid email address";
    }

    if (!form.password) {
      e.password = "Password is required";
    }

    return e;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: form.email,
        password: form.password,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      setErrors({
        password: data.error || data.message || "Login failed",
      });
      setLoading(false);
      return;
    }
    await response.json();
    // Handle successful login (e.g., store token, redirect)
    router.push("/dashboard");
    setLoading(false);
  };

  const handleChange =
    (field: keyof LoginFormData) => (e: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));

      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    };

  return (
    <div className="min-h-screen bg-[#FDFAF6] flex">
      {/* LEFT PANEL */}
      <div className="relative hidden w-[42%] overflow-hidden bg-[#1a1208] px-14 py-12 lg:flex lg:flex-col">
        <div className="absolute -bottom-24 -right-24 h-105 w-105 rounded-full bg-[radial-gradient(circle,rgba(232,93,38,0.12)_0%,transparent_70%)]" />

        <div className="absolute -left-16 -top-16 h-65 w-65 rounded-full border border-[#E85D261A]" />

        <div className="relative z-10 flex items-center gap-2">
          <div className="flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-[#E85D26] shadow-[0_2px_10px_rgba(232,93,38,0.3)]">
            <span className="text-[15px] font-bold text-white">P</span>
          </div>

          <span className="font-serif text-[22px] font-bold tracking-[-0.3px] text-white">
            Pact
          </span>
        </div>

        <div className="relative z-10 mt-16 flex flex-1 flex-col">
          <div className="mb-12">
            <h1 className="font-serif text-[42px] font-bold leading-[1.05] tracking-[-1px] text-white">
              Welcome
              <br />
              back.
            </h1>

            <p className="mt-4 max-w-sm text-[15px] leading-7 text-white/55">
              Your active pacts are waiting. Don&apos;t let your partner down.
            </p>
          </div>

          <div className="flex flex-1 flex-col gap-3">
            {[
              {
                goal: "Ship my portfolio by June 10",
                stake: "₹2,000 to NGO",
                partner: "Arjun M.",
                daysLeft: "9d left",
                progress: "72%",
              },
              {
                goal: "Read 2 books this month",
                stake: "Buy team lunch",
                partner: "Sneha R.",
                daysLeft: "14d left",
                progress: "45%",
              },
              {
                goal: "30 days no junk food",
                stake: "Public post",
                partner: "Kiran D.",
                daysLeft: "21d left",
                progress: "30%",
              },
            ].map((pact) => (
              <div
                key={pact.goal}
                className="rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur-sm"
              >
                <div className="mb-3 flex items-start justify-between gap-4">
                  <h3 className="max-w-[70%] text-sm font-semibold leading-5 text-white">
                    {pact.goal}
                  </h3>

                  <span className="rounded-full bg-[#E85D261F] px-2 py-1 text-[11px] font-semibold text-[#E85D26]">
                    {pact.daysLeft}
                  </span>
                </div>

                <div className="mb-3 flex gap-3 text-[11px] text-white/40">
                  <span>🔒 {pact.stake}</span>
                  <span>👤 {pact.partner}</span>
                </div>

                <div className="h-0.75 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-[#E85D26]"
                    style={{
                      width: pact.progress,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-white/10 pt-6">
            <div className="flex">
              {["A", "R", "K", "S"].map((letter, index) => (
                <div
                  key={letter}
                  className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#1a1208] text-[11px] font-bold text-white ${
                    index !== 0 ? "-ml-2" : ""
                  }`}
                  style={{
                    backgroundColor: [
                      "#E85D26",
                      "#4a8c6c",
                      "#5b7db8",
                      "#9c6bc2",
                    ][index],
                  }}
                >
                  {letter}
                </div>
              ))}
            </div>

            <p className="mt-3 text-xs leading-6 text-white/40">
              Join 12,000+ people who put real stakes on their goals.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="relative flex flex-1 items-center justify-center px-6 py-14 sm:px-10 lg:px-16">
        <div className="absolute right-8 top-8 hidden items-center gap-2 sm:flex">
          <span className="text-sm text-[#b0a090]">New here?</span>

          <Link
            href="/signup"
            className="rounded-lg bg-[#FEF0E8] px-4 py-2 text-sm font-semibold text-[#E85D26] transition hover:bg-[#fde4d0]"
          >
            Create account
          </Link>
        </div>

        <div className="w-full max-w-105">
          <div className="mb-8">
            <h1 className="font-serif text-[38px] font-bold leading-tight tracking-[-1px] text-[#1a1208]">
              Sign in to Pact
            </h1>

            <p className="mt-3 text-[15px] leading-7 text-[#7a6a58]">
              Your partners are waiting. Pick up where you left off.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="mb-2 block text-[13px] font-semibold text-[#3a2e24]">
                Email address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange("email")}
                className={`h-13 w-full rounded-xl border bg-[#FDFAF6] px-4 text-[15px] text-[#1a1208] outline-none transition placeholder:text-[#c0b0a0] focus:bg-white focus:ring-4 focus:ring-[#E85D261A] ${
                  errors.email
                    ? "border-[#e05c5c]"
                    : "border-[#e8ddd4] focus:border-[#E85D26]"
                }`}
              />

              {errors.email && (
                <p className="mt-2 text-xs text-[#e05c5c]">⚠ {errors.email}</p>
              )}
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-[13px] font-semibold text-[#3a2e24]">
                  Password
                </label>

                <button
                  type="button"
                  className="text-[13px] font-medium text-[#E85D26] hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  value={form.password}
                  onChange={handleChange("password")}
                  className={`h-13 w-full rounded-xl border bg-[#FDFAF6] px-4 pr-14 text-[15px] text-[#1a1208] outline-none transition placeholder:text-[#c0b0a0] focus:bg-white focus:ring-4 focus:ring-[#E85D261A] ${
                    errors.password
                      ? "border-[#e05c5c]"
                      : "border-[#e8ddd4] focus:border-[#E85D26]"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[13px] font-medium text-[#b0a090] transition hover:text-[#E85D26]"
                >
                  {showPassword ? "hide" : "show"}
                </button>
              </div>

              {errors.password && (
                <p className="mt-2 text-xs text-[#e05c5c]">
                  ⚠ {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-1 flex h-13.5 items-center justify-center rounded-xl bg-[#E85D26] text-[15px] font-bold text-white shadow-[0_4px_20px_rgba(232,93,38,0.3)] transition hover:-translate-y-px hover:shadow-[0_6px_28px_rgba(232,93,38,0.4)] disabled:cursor-not-allowed disabled:bg-[#f0a078]"
            >
              {loading ? "Signing in..." : "Sign in to Pact"}
            </button>

            <div className="flex items-center gap-4 py-1">
              <div className="h-px flex-1 bg-[#f0ebe3]" />

              <span className="text-xs font-medium text-[#c8bdb0]">or</span>

              <div className="h-px flex-1 bg-[#f0ebe3]" />
            </div>

            <button
              type="button"
              className="flex h-13 items-center justify-center gap-3 rounded-xl border border-[#e8ddd4] bg-white text-[15px] font-medium text-[#3a2e24] transition hover:bg-[#f8f4f0] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
            >
              Continue with Google
            </button>

            <p className="text-center text-sm text-[#7a6a58]">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-[#E85D26] hover:underline"
              >
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
