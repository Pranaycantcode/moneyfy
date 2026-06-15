"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <p className="text-slate-400">Redirecting to dashboard...</p>
    </main>
  );
}