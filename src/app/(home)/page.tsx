"use client";

import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">PropertyMatch</h1>
          <Button
            variant="outline"
            onClick={() => router.push("/signin")}
          >
            Preview
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Find Your Perfect Property Match
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Connect tenants with landlords seamlessly. Whether you&apos;re
            looking for a place to call home or seeking reliable tenants for
            your property.
          </p>
          
          <div className="mt-10">
            <Button 
              size="lg" 
              className="px-8 py-3 text-lg"
              onClick={() => router.push("/signin")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}