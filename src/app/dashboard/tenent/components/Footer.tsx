"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6B7B6B] to-[#4A5A4A] flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-semibold text-lg tracking-tight text-[#2D2D2D]">
              TENET
            </span>
          </div>
          
          <div className="text-sm text-[#2D2D2D]/60">
            © {new Date().getFullYear()} TENET. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
