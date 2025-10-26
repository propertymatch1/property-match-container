"use client";

import { GalleryVerticalEnd, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "~/components/ui/button"
import { SignupForm } from "~/components/signup-form"

export default function SignupPage() {
  const router = useRouter();

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Button
          variant="ghost"
          size="sm"
          className="self-start"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
         PropertyMatch
        </a>
        <SignupForm />
      </div>
    </div>
  )
}
