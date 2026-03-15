"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Menu, X, LogOut, User, ChevronDown } from "lucide-react";
import { signOut } from "~/lib/auth-client";

export default function NavigationBar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push("/signin");
  };

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-[var(--transition-base)] ${
        scrolled
          ? "bg-white/95 shadow-[var(--shadow-subtle)] backdrop-blur-md"
          : "bg-[rgba(250,250,249,0.8)] backdrop-blur-[12px]"
      } ${scrolled ? "border-b border-[rgba(0,0,0,0.08)]" : "border-b border-transparent"}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between py-3 sm:py-4">
          {/* Brand name - matching landing page exactly */}
          <a
            href="/"
            className="text-xl font-[var(--font-playfair)] font-semibold tracking-tight text-[var(--warm-900)] transition-opacity hover:opacity-80 sm:text-2xl"
          >
            Identia
          </a>

          {/* Desktop Navigation - consistent with landing page nav-link styling */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="/"
              className="nav-link relative text-sm font-medium text-[var(--warm-600)] transition-colors hover:text-[var(--warm-900)]"
            >
              Home
            </a>
            <a
              href="/#brands"
              className="nav-link relative text-sm font-medium text-[var(--warm-600)] transition-colors hover:text-[var(--warm-900)]"
            >
              For Brands
            </a>
            <a
              href="/#landlords"
              className="nav-link relative text-sm font-medium text-[var(--warm-600)] transition-colors hover:text-[var(--warm-900)]"
            >
              For Landlords
            </a>
          </div>

          {/* Account Dropdown - Desktop */}
          <div className="hidden md:block">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="min-h-[44px] gap-2 rounded-full border-[var(--warm-300)] px-4 text-[var(--warm-700)] hover:border-[var(--warm-400)] hover:bg-[var(--warm-100)]"
                >
                  <User size={18} />
                  Account
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8}>
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600"
                >
                  <LogOut size={16} className="mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button - Touch-friendly with min-h-[44px] */}
          <button
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg transition-colors duration-[var(--transition-fast)] hover:bg-[var(--warm-100)] md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu - Touch-friendly navigation items */}
        {mobileMenuOpen && (
          <div className="absolute top-full right-0 left-0 border-t border-[var(--warm-200)] bg-white/95 shadow-[var(--shadow-elevated)] backdrop-blur-md md:hidden">
            <div className="flex flex-col gap-2 p-4">
              <a
                href="/"
                className="flex min-h-[44px] items-center rounded-lg px-4 text-sm font-medium text-[var(--warm-700)] transition-colors duration-[var(--transition-fast)] hover:bg-[var(--warm-100)] hover:text-[var(--warm-900)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="/#brands"
                className="flex min-h-[44px] items-center rounded-lg px-4 text-sm font-medium text-[var(--warm-700)] transition-colors duration-[var(--transition-fast)] hover:bg-[var(--warm-100)] hover:text-[var(--warm-900)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                For Brands
              </a>
              <a
                href="/#landlords"
                className="flex min-h-[44px] items-center rounded-lg px-4 text-sm font-medium text-[var(--warm-700)] transition-colors duration-[var(--transition-fast)] hover:bg-[var(--warm-100)] hover:text-[var(--warm-900)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                For Landlords
              </a>
              <div className="my-2 border-t border-[var(--warm-200)]" />
              <button
                className="flex min-h-[44px] items-center gap-2 rounded-lg px-4 text-sm font-medium text-red-600 transition-colors duration-[var(--transition-fast)] hover:bg-red-50"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSignOut();
                }}
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
