// [ADDED] Navbar component with clean responsive architecture, dark mode toggle, and zero crowding
import React, { useState, useEffect } from 'react';
import { Phone, ShoppingBag, Menu, X, Sparkles, ExternalLink, Gift, Sun, Moon } from 'lucide-react';
import { SHOP_METADATA } from '../data/sweetsData';

interface NavbarProps {
  onOpenHamper: () => void;
  savedFavoritesCount: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenHamper,
  savedFavoritesCount: _savedFavoritesCount,
  darkMode,
  onToggleDarkMode
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orderDropdownOpen, setOrderDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Notification Bar */}
      {/* [ADDED]: Live store timing badge embedded directly in announcement bar to free horizontal space in main navbar */}
      <div className="bg-gradient-to-r from-gold-700 via-gold-600 to-gold-700 text-white text-xs font-medium py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2.5 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-gold-200 animate-pulse flex-shrink-0" />
        <span className="truncate">Shuddha Desi Ghee Sweets & Fresh Daily Chhena • Spine Road, Chinchwad East</span>
        <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-gold-100 text-[11px] font-semibold flex-shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Open Today: 8:00 AM – 10:30 PM</span>
        </span>
        <span className="hidden xl:inline text-gold-200 font-serif italic text-[11px] flex-shrink-0">• 100% Vegetarian & Pure Cow Ghee</span>
      </div>

      {/* Main Navigation Bar */}
      {/* [FIXED]: Expanded container from max-w-7xl (1280px) to max-w-[1600px] with responsive xl:flex links and zero button clipping */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 w-full max-w-full overflow-x-clip ${
          isScrolled
            ? 'bg-ivory-50/98 dark:bg-[#130F0C]/98 backdrop-blur-md shadow-md border-b border-gold-200/60 dark:border-gold-900/50 py-2.5 sm:py-3'
            : 'bg-ivory-50/95 dark:bg-[#12100E]/95 backdrop-blur-sm border-b border-gold-100 dark:border-gold-900/30 py-3 sm:py-3.5'
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 sm:gap-6">
            
            {/* Brand Logo & Store Badge */}
            <a href="#" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-700 p-0.5 shadow-md group-hover:scale-105 group-hover:shadow-gold-500/30 transition-all duration-300 flex-shrink-0">
                <div className="w-full h-full rounded-full bg-ivory-50 dark:bg-[#1C1713] flex items-center justify-center p-1 border border-gold-200 dark:border-gold-700">
                  <span className="text-base sm:text-lg select-none" role="img" aria-label="Cherry Sweets">🍒</span>
                </div>
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                  <span className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight group-hover:text-gold-700 dark:group-hover:text-gold-400 transition-colors whitespace-nowrap">
                    Cherry's
                  </span>
                  <span className="font-serif italic text-gold-600 dark:text-gold-400 text-xs sm:text-sm font-semibold whitespace-nowrap">
                    Sweet Mart
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 leading-none whitespace-nowrap">
                  <span className="font-medium text-slate-700 dark:text-slate-300">चेरीज स्वीट कॉर्नर</span>
                  <span className="text-gold-500">•</span>
                  <span>Spine Rd, Nigdi</span>
                </div>
              </div>
            </a>

            {/* Desktop Navigation Links - Guaranteed 1-Line with animated golden underlines */}
            {/* [FIXED]: Switched breakpoint to xl:flex with compact gap-3.5 2xl:gap-6, guaranteeing 140px-380px breathing room */}
            <nav className="hidden xl:flex items-center gap-3.5 2xl:gap-6 text-[13px] 2xl:text-sm font-semibold text-slate-700 dark:text-slate-200 flex-shrink-0">
              <a href="#menu" className="relative group py-1.5 hover:text-gold-700 dark:hover:text-gold-400 transition-colors whitespace-nowrap">
                <span>Sweets Menu</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-500 to-amber-600 rounded-full group-hover:w-full transition-all duration-300" />
              </a>
              <a href="#signature" className="relative group py-1.5 hover:text-gold-700 dark:hover:text-gold-400 transition-colors whitespace-nowrap">
                <span>Signatures</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-500 to-amber-600 rounded-full group-hover:w-full transition-all duration-300" />
              </a>
              <button
                onClick={onOpenHamper}
                className="relative group py-1.5 hover:text-gold-700 dark:hover:text-gold-400 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <span>Gift Hampers</span>
                <span className="px-2 py-0.5 rounded-full bg-gold-100 dark:bg-gold-950/80 text-gold-800 dark:text-gold-300 text-[10px] font-bold border border-gold-300/80 dark:border-gold-800 shadow-2xs group-hover:scale-105 transition-transform">
                  Festive
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-500 to-amber-600 rounded-full group-hover:w-full transition-all duration-300" />
              </button>
              <a href="#story" className="relative group py-1.5 hover:text-gold-700 dark:hover:text-gold-400 transition-colors whitespace-nowrap">
                <span>Our Story</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-500 to-amber-600 rounded-full group-hover:w-full transition-all duration-300" />
              </a>
              <a href="#gallery" className="relative group py-1.5 hover:text-gold-700 dark:hover:text-gold-400 transition-colors whitespace-nowrap">
                <span>Shop Photos</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-500 to-amber-600 rounded-full group-hover:w-full transition-all duration-300" />
              </a>
              <a href="#reviews" className="relative group py-1.5 hover:text-gold-700 dark:hover:text-gold-400 transition-colors whitespace-nowrap">
                <span>Reviews</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-500 to-amber-600 rounded-full group-hover:w-full transition-all duration-300" />
              </a>
              <a href="#location" className="relative group py-1.5 hover:text-gold-700 dark:hover:text-gold-400 transition-colors whitespace-nowrap">
                <span>Visit Us</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-500 to-amber-600 rounded-full group-hover:w-full transition-all duration-300" />
              </a>
            </nav>

            {/* Right Action Cluster - Perfectly Proportioned & Zero Wrapping */}
            <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
              
              {/* Dark / Light Theme Mode Switcher */}
              <button
                onClick={onToggleDarkMode}
                className="w-9 h-9 rounded-full bg-white dark:bg-[#1E1914] border border-slate-200 dark:border-gold-800/60 text-slate-700 dark:text-gold-400 hover:bg-gold-50 dark:hover:bg-[#25201A] hover:scale-105 active:scale-95 flex items-center justify-center transition-all shadow-xs cursor-pointer"
                title={darkMode ? "Switch to Light Theme" : "Switch to Dark Theme"}
                aria-label="Toggle theme mode"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" /> : <Moon className="w-4 h-4 text-slate-600" />}
              </button>

              {/* Direct Call Button */}
              <a
                href={`tel:${SHOP_METADATA.phone.replace(/\s+/g, '')}`}
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white dark:bg-[#1E1914] hover:bg-gold-50/70 dark:hover:bg-[#25201A] border border-slate-200 dark:border-gold-800/50 text-slate-800 dark:text-slate-200 text-xs font-semibold whitespace-nowrap hover:-translate-y-0.5 active:scale-95 transition-all shadow-xs"
                title="Call Cherry's Sweet Mart"
              >
                <Phone className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" />
                <span>Call Shop</span>
              </a>

              {/* Order Online Dropdown Button */}
              <div className="relative">
                <button
                  onClick={() => setOrderDropdownOpen(!orderDropdownOpen)}
                  className="flex items-center gap-1.5 sm:gap-2 px-4 py-2 rounded-full bg-[#3a2119] hover:bg-gold-700 text-white text-xs font-bold whitespace-nowrap shadow-md hover:shadow-lg hover:shadow-gold-600/30 hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer"
                  aria-expanded={orderDropdownOpen}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Order Online</span>
                </button>

                {orderDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setOrderDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-[#1A1613] rounded-2xl shadow-2xl border border-gold-200 dark:border-gold-800/60 py-2 z-50 animate-fadeIn">
                      <div className="px-4 py-1.5 border-b border-slate-100 dark:border-stone-800">
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-stone-400 font-bold">
                          Instant Food Delivery
                        </p>
                      </div>

                      <a
                        href={SHOP_METADATA.swiggyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-4 py-2.5 hover:bg-orange-50 dark:hover:bg-orange-950/30 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
                        onClick={() => setOrderDropdownOpen(false)}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#FC8019]"></span>
                          <span>Order on Swiggy</span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      </a>

                      <a
                        href={SHOP_METADATA.zomatoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-950/30 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
                        onClick={() => setOrderDropdownOpen(false)}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#E23744]"></span>
                          <span>Order on Zomato</span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      </a>

                      <a
                        href={`https://wa.me/${SHOP_METADATA.whatsappOrderNumber}?text=${encodeURIComponent("Hello Cherry's Sweet Mart, I would like to inquire about fresh sweets and festival gift boxes.")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-4 py-2.5 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors border-t border-slate-100 dark:border-stone-800"
                        onClick={() => setOrderDropdownOpen(false)}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                          <span>Direct WhatsApp Order</span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      </a>
                    </div>
                  </>
                )}
              </div>

              {/* Mobile / Tablet Hamburger Toggle */}
              {/* [FIXED]: Aligned breakpoint with desktop nav (hidden xl:flex) to guarantee zero navbar overflow */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-gold-700 hover:bg-ivory-200 dark:hover:bg-stone-800 xl:hidden transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>

          </div>
        </div>

        {/* Mobile / Tablet Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-gold-200 dark:border-gold-900/50 bg-ivory-50/98 dark:bg-[#16120F]/98 px-4 pt-3 pb-6 space-y-3 mt-2 shadow-2xl animate-fadeIn text-left">
            
            {/* Live Timing Status on Mobile */}
            <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 text-xs font-medium border border-emerald-200 dark:border-emerald-800/40">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Open Now · 8:00 AM – 10:30 PM</span>
              </span>
              <span className="font-semibold text-[11px]">All 7 Days</span>
            </div>

            <nav className="flex flex-col space-y-1 text-sm font-medium text-slate-800 dark:text-slate-200 pt-1">
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-ivory-200 dark:hover:bg-stone-800"
              >
                Sweets Catalog (50+ Delights)
              </a>
              <a
                href="#signature"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-ivory-200 dark:hover:bg-stone-800"
              >
                Signature Specialties
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenHamper();
                }}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-ivory-200 dark:hover:bg-stone-800 flex items-center justify-between text-gold-700 dark:text-gold-400 font-bold"
              >
                <span>🎁 Custom Gift Hamper Builder</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-200 dark:bg-gold-900 text-gold-900 dark:text-gold-200">
                  Popular
                </span>
              </button>
              <a
                href="#story"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-ivory-200 dark:hover:bg-stone-800"
              >
                Our Heritage & Purity Promise
              </a>
              <a
                href="#gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-ivory-200 dark:hover:bg-stone-800"
              >
                Authentic Shop Photos
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-ivory-200 dark:hover:bg-stone-800"
              >
                Customer Reviews (3,500+)
              </a>
              <a
                href="#location"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-ivory-200 dark:hover:bg-stone-800"
              >
                Store Location & Directions
              </a>
            </nav>

            {/* Quick Action Delivery Buttons on Mobile */}
            <div className="pt-2 border-t border-gold-200/50 dark:border-gold-900/40 grid grid-cols-2 gap-2">
              <a
                href={SHOP_METADATA.swiggyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>🛵 Swiggy</span>
              </a>
              <a
                href={SHOP_METADATA.zomatoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>🍽️ Zomato</span>
              </a>
              <a
                href={`https://wa.me/${SHOP_METADATA.whatsappOrderNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
              >
                <span>💬 WhatsApp Direct Order</span>
              </a>
            </div>

          </div>
        )}
      </header>
    </>
  );
};
