"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, ExternalLink } from "lucide-react";

export default function RedirectPage() {
  const searchParams = useSearchParams();

  const url = searchParams.get("url");

  useEffect(() => {
    if (!url) return;

    const finalUrl = url.startsWith("http")
      ? url
      : `https://${url}`;

    const timer = setTimeout(() => {
      window.location.replace(finalUrl);
    }, 1200);

    return () => clearTimeout(timer);
  }, [url]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        </div>

        <h1 className="mt-8 text-2xl font-bold text-slate-900">
          Redirecting to partner site
        </h1>

        <p className="mt-3 text-slate-500">
          Please wait while we connect you to the booking provider.
        </p>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
          <ExternalLink className="h-4 w-4" />
          Secure redirect
        </div>
      </div>
    </div>
  );
}