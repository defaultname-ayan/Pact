// app/signup/page.tsx

"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

interface SignupFormData {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface SignupErrors {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  agree?: string;
}

export default function SignupPage() {
  const [form, setForm] = useState<SignupFormData>({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<SignupErrors>({});

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  const passwordChecks = useMemo(
    () => [
      {
        label: "8+ characters",
        pass: form.password.length >= 8,
      },
      {
        label: "uppercase",
        pass: /[A-Z]/.test(form.password),
      },
      {
        label: "number",
        pass: /[0-9]/.test(form.password),
      },
    ],
    [form.password],
  );

  const passwordScore = passwordChecks.filter((check) => check.pass).length;

  const validate = (): SignupErrors => {
    const e: SignupErrors = {};

    if (!form.name.trim()) {
      e.name = "Enter your full name";
    }

    if (!form.username || form.username.length < 3) {
      e.username = "Username must be at least 3 characters";
    }

    if (/\s/.test(form.username)) {
      e.username = "Username cannot contain spaces";
    }

    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      e.email = "Enter a valid email address";
    }

    if (form.password.length < 8) {
      e.password = "Password must be at least 8 characters";
    }

    if (!agreed) {
      e.agree = "You must agree to continue";
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
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    if (!response.ok) {
      const data = await response.json();
      setErrors({ password: data.message || "Registration failed" });
      return;
    }
    router.push("/login");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1600);
  };

  const handleChange =
    (field: keyof SignupFormData) => (e: ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;

      if (field === "username") {
        value = value.replace(/\s/g, "").toLowerCase();
      }

      setForm((prev) => ({
        ...prev,
        [field]: value,
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
        <div className="absolute -bottom-24 -right-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(232,93,38,0.12)_0%,transparent_70%)]" />

        <div className="absolute -left-16 -top-16 h-[260px] w-[260px] rounded-full border border-[#E85D261A]" />

        <div className="relative z-10 flex items-center gap-2">
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[8px] bg-[#E85D26] shadow-[0_2px_10px_rgba(232,93,38,0.3)]">
            <span className="text-[15px] font-bold text-white">P</span>
          </div>

          <span className="font-serif text-[22px] font-bold tracking-[-0.3px] text-white">
            Pact
          </span>
        </div>

        <div className="relative z-10 mt-16 flex flex-1 flex-col">
          <div className="mb-12">
            <h1 className="font-serif text-[42px] font-bold leading-[1.05] tracking-[-1px] text-white">
              Your goals
              <br />
              deserve stakes.
            </h1>

            <p className="mt-4 max-w-sm text-[15px] leading-7 text-white/55">
              Put something real on the line. That&apos;s when goals actually
              happen.
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
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm"
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

                <div className="h-[3px] rounded-full bg-white/10">
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
          <span className="text-sm text-[#b0a090]">Have an account?</span>

          <Link
            href="/login"
            className="rounded-lg bg-[#FEF0E8] px-4 py-2 text-sm font-semibold text-[#E85D26] transition hover:bg-[#fde4d0]"
          >
            Sign in
          </Link>
        </div>

        <div className="w-full max-w-[420px]">
          <div className="mb-8">
            <h1 className="font-serif text-[38px] font-bold leading-tight tracking-[-1px] text-[#1a1208]">
              Create your account
            </h1>

            <p className="mt-3 text-[15px] leading-7 text-[#7a6a58]">
              One account. Every goal. Real stakes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-2 block text-[13px] font-semibold text-[#3a2e24]">
                  Full name
                </label>

                <input
                  type="text"
                  placeholder="Full name"
                  value={form.name}
                  onChange={handleChange("name")}
                  className={`h-[52px] w-full rounded-[12px] border bg-[#FDFAF6] px-4 text-[15px] text-[#1a1208] outline-none transition placeholder:text-[#c0b0a0] focus:bg-white focus:ring-4 focus:ring-[#E85D261A] ${
                    errors.name
                      ? "border-[#e05c5c]"
                      : "border-[#e8ddd4] focus:border-[#E85D26]"
                  }`}
                />

                {errors.name && (
                  <p className="mt-2 text-xs text-[#e05c5c]">⚠ {errors.name}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-[#3a2e24]">
                  Username
                </label>

                <input
                  type="text"
                  placeholder="@username"
                  value={form.username}
                  onChange={handleChange("username")}
                  className={`h-[52px] w-full rounded-[12px] border bg-[#FDFAF6] px-4 text-[15px] text-[#1a1208] outline-none transition placeholder:text-[#c0b0a0] focus:bg-white focus:ring-4 focus:ring-[#E85D261A] ${
                    errors.username
                      ? "border-[#e05c5c]"
                      : "border-[#e8ddd4] focus:border-[#E85D26]"
                  }`}
                />

                {form.username && !errors.username && (
                  <p className="mt-2 text-xs text-[#b0a090]">
                    pact.so/
                    {form.username}
                  </p>
                )}

                {errors.username && (
                  <p className="mt-2 text-xs text-[#e05c5c]">
                    ⚠ {errors.username}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[13px] font-semibold text-[#3a2e24]">
                Email address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange("email")}
                className={`h-[52px] w-full rounded-[12px] border bg-[#FDFAF6] px-4 text-[15px] text-[#1a1208] outline-none transition placeholder:text-[#c0b0a0] focus:bg-white focus:ring-4 focus:ring-[#E85D261A] ${
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
              <label className="mb-2 block text-[13px] font-semibold text-[#3a2e24]">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Choose a strong password"
                  value={form.password}
                  onChange={handleChange("password")}
                  className={`h-[52px] w-full rounded-[12px] border bg-[#FDFAF6] px-4 pr-14 text-[15px] text-[#1a1208] outline-none transition placeholder:text-[#c0b0a0] focus:bg-white focus:ring-4 focus:ring-[#E85D261A] ${
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

              <div className="mt-3 flex gap-1">
                {[0, 1, 2].map((index) => (
                  <div
                    key={index}
                    className={`h-[3px] flex-1 rounded-full ${
                      index < passwordScore
                        ? passwordScore === 1
                          ? "bg-[#e05c5c]"
                          : passwordScore === 2
                            ? "bg-[#f0a030]"
                            : "bg-[#4caf80]"
                        : "bg-[#f0ebe3]"
                    }`}
                  />
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between gap-4">
                <div className="flex flex-wrap gap-3">
                  {passwordChecks.map((check) => (
                    <span
                      key={check.label}
                      className={`text-[11px] ${
                        check.pass ? "text-[#4caf80]" : "text-[#b0a090]"
                      }`}
                    >
                      {check.pass ? "✓" : "•"} {check.label}
                    </span>
                  ))}
                </div>

                {passwordScore > 0 && (
                  <span
                    className={`text-[11px] font-semibold ${
                      passwordScore === 1
                        ? "text-[#e05c5c]"
                        : passwordScore === 2
                          ? "text-[#f0a030]"
                          : "text-[#4caf80]"
                    }`}
                  >
                    {passwordScore === 1
                      ? "Weak"
                      : passwordScore === 2
                        ? "Fair"
                        : "Strong"}
                  </span>
                )}
              </div>

              {errors.password && (
                <p className="mt-2 text-xs text-[#e05c5c]">
                  ⚠ {errors.password}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setAgreed((prev) => !prev);

                    setErrors((prev) => ({
                      ...prev,
                      agree: "",
                    }));
                  }}
                  className={`mt-[2px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border transition ${
                    agreed
                      ? "border-[#E85D26] bg-[#E85D26]"
                      : errors.agree
                        ? "border-[#e05c5c]"
                        : "border-[#d0c8bc] bg-white"
                  }`}
                >
                  {agreed && (
                    <span className="text-[10px] font-bold text-white">✓</span>
                  )}
                </button>

                <p className="text-[13px] leading-6 text-[#7a6a58]">
                  I agree to the{" "}
                  <button
                    type="button"
                    className="font-medium text-[#E85D26] hover:underline"
                  >
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    className="font-medium text-[#E85D26] hover:underline"
                  >
                    Privacy Policy
                  </button>
                </p>
              </div>

              {errors.agree && (
                <p className="mt-2 text-xs text-[#e05c5c]">⚠ {errors.agree}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-1 flex h-[54px] items-center justify-center rounded-[12px] bg-[#E85D26] text-[15px] font-bold text-white shadow-[0_4px_20px_rgba(232,93,38,0.3)] transition hover:-translate-y-[1px] hover:shadow-[0_6px_28px_rgba(232,93,38,0.4)] disabled:cursor-not-allowed disabled:bg-[#f0a078]"
            >
              {loading ? "Creating your account..." : "Create your account"}
            </button>

            <div className="flex items-center gap-4 py-1">
              <div className="h-px flex-1 bg-[#f0ebe3]" />

              <span className="text-xs font-medium text-[#c8bdb0]">or</span>

              <div className="h-px flex-1 bg-[#f0ebe3]" />
            </div>

            <button
              type="button"
              className="flex h-[52px] items-center justify-center gap-3 rounded-[12px] border border-[#e8ddd4] bg-white text-[15px] font-medium text-[#3a2e24] transition hover:bg-[#f8f4f0] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
            >
              Sign up with Google
            </button>

            <p className="text-center text-sm text-[#7a6a58]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#E85D26] hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
