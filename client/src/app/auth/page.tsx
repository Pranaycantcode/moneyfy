"use client";

import { useState } from "react";
import {
  login,
  register,
  saveAuthToken,
} from "@/services/authService";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = isLogin
        ? await login({
            email,
            password,
          })
        : await register({
            name,
            email,
            password,
          });

      saveAuthToken(response.token);

      router.push("/");
    } catch (err) {
      console.error(err);
      setError(
        isLogin
          ? "Invalid credentials"
          : "Unable to register",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-3xl font-bold text-white">
          Moneyfy
        </h1>

        <p className="mt-2 text-slate-400">
          {isLogin
            ? "Sign in to your account"
            : "Create your account"}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          {!isLogin && (
            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Name"
              className="w-full rounded-xl border border-white/10 bg-slate-900 p-3"
            />
          )}

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Email"
            className="w-full rounded-xl border border-white/10 bg-slate-900 p-3"
          />

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Password"
            className="w-full rounded-xl border border-white/10 bg-slate-900 p-3"
          />

          {error && (
            <div className="text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-slate-950"
          >
            {loading
              ? "Please wait..."
              : isLogin
                ? "Login"
                : "Register"}
          </button>
        </form>

        <button
          onClick={() =>
            setIsLogin(!isLogin)
          }
          className="mt-5 text-sm text-slate-400"
        >
          {isLogin
            ? "Need an account? Register"
            : "Already have an account? Login"}
        </button>
      </div>
    </main>
  );
} 