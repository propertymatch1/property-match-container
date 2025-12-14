"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "~/components/ui/button";
import { Menu, X } from "lucide-react";

export default function NavigationBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[#6B7B6B] to-[#4A5A4A] flex items-center justify-center">
              <span className="text-white font-bold text-sm sm:text-lg">T</span>
            </div>
            <span className="font-semibold text-lg sm:text-xl tracking-tight text-[#2D2D2D]">
              TENET
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#about"
              className="text-[#2D2D2D]/70 hover:text-[#2D2D2D] transition-colors text-sm font-medium"
            >
              About
            </a>
            <a
              href="#landlords"
              className="text-[#2D2D2D]/70 hover:text-[#2D2D2D] transition-colors text-sm font-medium"
            >
              For Landlords
            </a>
            <a
              href="#tenants"
              className="text-[#2D2D2D]/70 hover:text-[#2D2D2D] transition-colors text-sm font-medium"
            >
              For Tenants
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-[#6B7B6B] hover:bg-[#5A6A5A] text-white rounded-full px-6 font-medium shadow-lg shadow-[#6B7B6B]/20">
              Create Your Passport
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-[#2D2D2D]/5 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#2D2D2D]/5 shadow-lg">
            <div className="flex flex-col p-4 gap-4">
              <a
                href="#about"
                className="text-[#2D2D2D]/70 hover:text-[#2D2D2D] transition-colors text-sm font-medium py-2"
              >
                About
              </a>
              <a
                href="#landlords"
                className="text-[#2D2D2D]/70 hover:text-[#2D2D2D] transition-colors text-sm font-medium py-2"
              >
                For Landlords
              </a>
              <a
                href="#tenants"
                className="text-[#2D2D2D]/70 hover:text-[#2D2D2D] transition-colors text-sm font-medium py-2"
              >
                For Tenants
              </a>
              <Button className="bg-[#6B7B6B] hover:bg-[#5A6A5A] text-white rounded-full font-medium w-full">
                Create Your Passport
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
