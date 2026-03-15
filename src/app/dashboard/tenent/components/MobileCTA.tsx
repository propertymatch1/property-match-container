"use client";

import React from "react";
import { Button } from "~/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function MobileCTA() {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-40 border-t border-[var(--warm-200)] bg-white/95 p-4 shadow-[var(--shadow-elevated)] backdrop-blur-md sm:hidden">
      <Button
        className="min-h-[48px] w-full gap-2 rounded-full bg-[var(--sage-500)] text-white shadow-[var(--sage-500)]/20 shadow-lg transition-all duration-[var(--transition-base)] hover:bg-[var(--sage-600)]"
        size="lg"
      >
        <MessageCircle size={20} />
        Request Introduction
      </Button>
    </div>
  );
}
