"use client";

import React from "react";
import { Twitter, Linkedin, Mail } from "lucide-react";
import { BrandHeader } from "~/components/layout";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[var(--warm-200)] py-8 sm:py-12 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <BrandHeader size="sm" showIcon={false} />
            <p className="mt-3 text-sm leading-relaxed text-[var(--warm-600)] max-w-xs">
              A modern identity layer for commercial brands.
            </p>
            {/* Social links */}
            <div className="mt-4 flex items-center gap-3">
              <a 
                href="https://twitter.com/identia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--sage-50)] text-[var(--sage-500)] hover:bg-[var(--sage-500)] hover:text-white transition-colors duration-[var(--transition-fast)]"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-4 w-4" aria-hidden="true" />
              </a>
              <a 
                href="https://linkedin.com/company/identia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--sage-50)] text-[var(--sage-500)] hover:bg-[var(--sage-500)] hover:text-white transition-colors duration-[var(--transition-fast)]"
                aria-label="Connect with us on LinkedIn"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
              <a 
                href="mailto:hello@identia.com"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--sage-50)] text-[var(--sage-500)] hover:bg-[var(--sage-500)] hover:text-white transition-colors duration-[var(--transition-fast)]"
                aria-label="Email us"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Resources column */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-[var(--warm-900)] mb-3">Resources</h5>
            <nav className="flex flex-col gap-2">
              <a href="/" className="text-sm text-[var(--warm-600)] hover:text-[var(--sage-500)] transition-colors">
                Home
              </a>
              <a href="#" className="text-sm text-[var(--warm-600)] hover:text-[var(--sage-500)] transition-colors">
                Help Center
              </a>
              <a href="mailto:support@identia.com" className="text-sm text-[var(--warm-600)] hover:text-[var(--sage-500)] transition-colors">
                Contact
              </a>
            </nav>
          </div>

          {/* Legal column */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-[var(--warm-900)] mb-3">Legal</h5>
            <nav className="flex flex-col gap-2">
              <a href="#" className="text-sm text-[var(--warm-600)] hover:text-[var(--sage-500)] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-[var(--warm-600)] hover:text-[var(--sage-500)] transition-colors">
                Terms of Service
              </a>
            </nav>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="mt-8 pt-6 border-t border-[var(--warm-200)]">
          <p className="text-sm text-[var(--warm-500)] text-center sm:text-left">
            © {new Date().getFullYear()} Identia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
