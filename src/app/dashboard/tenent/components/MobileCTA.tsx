"use client";

import React from "react";
import { Button } from "~/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function MobileCTA() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-40">
      <Button 
        className="w-full bg-[#6B7B6B] hover:bg-[#5A6A5A] text-white rounded-full gap-2 shadow-lg"
        size="lg"
      >
        <MessageCircle size={20} />
        Request Introduction
      </Button>
    </div>
  );
}
