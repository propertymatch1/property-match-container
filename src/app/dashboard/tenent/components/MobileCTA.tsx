"use client";

import React from "react";
import { Button } from "~/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function MobileCTA() {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[var(--warm-200)] p-4 shadow-[var(--shadow-elevated)] z-40">
      <Button 
        className="w-full min-h-[48px] bg-[var(--sage-500)] hover:bg-[var(--sage-600)] text-white rounded-full gap-2 shadow-lg shadow-[var(--sage-500)]/20 transition-all duration-[var(--transition-base)]"
        size="lg"
      >
        <MessageCircle size={20} />
        Request Introduction
      </Button>
    </div>
  );
}
