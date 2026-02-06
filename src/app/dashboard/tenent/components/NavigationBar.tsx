"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push('/signin');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-[var(--transition-base)] ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-[var(--shadow-subtle)]' 
          : 'bg-[rgba(250,250,249,0.8)] backdrop-blur-[12px]'
      } ${scrolled ? 'border-b border-[rgba(0,0,0,0.08)]' : 'border-b border-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between py-3 sm:py-4">
          {/* Brand name - matching landing page exactly */}
          <a href="/" className="font-[var(--font-playfair)] text-xl font-semibold tracking-tight text-[var(--warm-900)] sm:text-2xl hover:opacity-80 transition-opacity">
            Identia
          </a>

          {/* Desktop Navigation - consistent with landing page nav-link styling */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="/"
              className="nav-link relative text-sm text-[var(--warm-600)] hover:text-[var(--warm-900)] transition-colors font-medium"
            >
              Home
            </a>
            <a
              href="/#brands"
              className="nav-link relative text-sm text-[var(--warm-600)] hover:text-[var(--warm-900)] transition-colors font-medium"
            >
              For Brands
            </a>
            <a
              href="/#landlords"
              className="nav-link relative text-sm text-[var(--warm-600)] hover:text-[var(--warm-900)] transition-colors font-medium"
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
                  className="min-h-[44px] rounded-full px-4 border-[var(--warm-300)] text-[var(--warm-700)] hover:bg-[var(--warm-100)] hover:border-[var(--warm-400)] gap-2"
                >
                  <User size={18} />
                  Account
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8}>
                <DropdownMenuItem 
                  onClick={handleSignOut}
                  className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                  <LogOut size={16} className="mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button - Touch-friendly with min-h-[44px] */}
          <button
            className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-[var(--warm-100)] transition-colors duration-[var(--transition-fast)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu - Touch-friendly navigation items */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[var(--warm-200)] shadow-[var(--shadow-elevated)]">
            <div className="flex flex-col p-4 gap-2">
              <a
                href="/"
                className="min-h-[44px] flex items-center px-4 rounded-lg text-[var(--warm-700)] hover:text-[var(--warm-900)] hover:bg-[var(--warm-100)] transition-colors duration-[var(--transition-fast)] text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="/#brands"
                className="min-h-[44px] flex items-center px-4 rounded-lg text-[var(--warm-700)] hover:text-[var(--warm-900)] hover:bg-[var(--warm-100)] transition-colors duration-[var(--transition-fast)] text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                For Brands
              </a>
              <a
                href="/#landlords"
                className="min-h-[44px] flex items-center px-4 rounded-lg text-[var(--warm-700)] hover:text-[var(--warm-900)] hover:bg-[var(--warm-100)] transition-colors duration-[var(--transition-fast)] text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                For Landlords
              </a>
              <div className="border-t border-[var(--warm-200)] my-2" />
              <button 
                className="min-h-[44px] flex items-center px-4 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-[var(--transition-fast)] text-sm font-medium gap-2"
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
