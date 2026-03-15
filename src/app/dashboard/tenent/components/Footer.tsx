"use client";

import React from "react";
import { Twitter, Linkedin, Mail } from "lucide-react";
import { BrandHeader } from "~/components/layout";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-[var(--warm-200)] bg-white py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <BrandHeader size="sm" showIcon={false} />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--warm-600)]">
              A modern identity layer for commercial brands.
            </p>
            {/* Social links */}
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://twitter.com/identia"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--sage-50)] text-[var(--sage-500)] transition-colors duration-[var(--transition-fast)] hover:bg-[var(--sage-500)] hover:text-white"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="https://linkedin.com/company/identia"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--sage-50)] text-[var(--sage-500)] transition-colors duration-[var(--transition-fast)] hover:bg-[var(--sage-500)] hover:text-white"
                aria-label="Connect with us on LinkedIn"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="mailto:hello@identia.com"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--sage-50)] text-[var(--sage-500)] transition-colors duration-[var(--transition-fast)] hover:bg-[var(--sage-500)] hover:text-white"
                aria-label="Email us"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Resources column */}
          <div>
            <h5 className="mb-3 text-xs font-semibold tracking-wider text-[var(--warm-900)] uppercase">
              Resources
            </h5>
            <nav className="flex flex-col gap-2">
              <a
                href="/"
                className="text-sm text-[var(--warm-600)] transition-colors hover:text-[var(--sage-500)]"
              >
                Home
              </a>
              <a
                href="#"
                className="text-sm text-[var(--warm-600)] transition-colors hover:text-[var(--sage-500)]"
              >
                Help Center
              </a>
              <a
                href="mailto:support@identia.com"
                className="text-sm text-[var(--warm-600)] transition-colors hover:text-[var(--sage-500)]"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Legal column */}
          <div>
            <h5 className="mb-3 text-xs font-semibold tracking-wider text-[var(--warm-900)] uppercase">
              Legal
            </h5>
            <nav className="flex flex-col gap-2">
              <a
                href="#"
                className="text-sm text-[var(--warm-600)] transition-colors hover:text-[var(--sage-500)]"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-[var(--warm-600)] transition-colors hover:text-[var(--sage-500)]"
              >
                Terms of Service
              </a>
            </nav>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="mt-8 border-t border-[var(--warm-200)] pt-6">
          <p className="text-center text-sm text-[var(--warm-500)] sm:text-left">
            © {new Date().getFullYear()} Identia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
