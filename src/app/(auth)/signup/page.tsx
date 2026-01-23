"use client";

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "~/components/ui/button"
import { SignupForm } from "~/components/signup-form"
import { PageContainer, BrandHeader } from "~/components/layout"

export default function SignupPage() {
  const router = useRouter();

  return (
    <div className="bg-[var(--warm-50)] flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <PageContainer variant="narrow" className="flex flex-col gap-6">
        <Button
          variant="ghost"
          size="sm"
          className="self-start min-h-[44px]"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex justify-center">
          <BrandHeader size="md" showIcon={false} />
        </div>
        <SignupForm />
      </PageContainer>
    </div>
  )
}
