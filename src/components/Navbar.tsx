// [ADDED] World-Class Haute Confectionery Navbar with responsive non-clipping architecture, luxury glassmorphism, dynamic store status, and multi-channel order flyout
import React, { useState, useEffect } from 'react';
import { Phone, ShoppingBag, Menu, X, Sparkles, ExternalLink, Gift, Sun, Moon, ChevronDown } from 'lucide-react';
import { SHOP_METADATA } from '../data/sweetsData';

interface NavbarProps {
  onOpenHamper: () => void;
  savedFavoritesCount?: number;
  hamperCount?: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenHamper,
  savedFavoritesCount = 0,
  hamperCount = 0,
  darkMode,
  onToggleDarkMode
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orderDropdownOpen, setOrderDropdownOpen] = useState(false);
  const [storeStatus, setStoreStatus] = useState<{ isOpen: boolean; text: string }>({
    isOpen: true,
    text: 'Open Now · Fresh Batches Ready'
  });

  // Calculate live store status based on current time
  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentDecimal = hours + minutes / 60;

      if (currentDecimal >= 8.0 && currentDecimal < 22.5) {
        if (currentDecimal < 11.5) {
          setStoreStatus({
            isOpen: true,
            text: 'Morning Desi Ghee Jalebi Batch Live'
          });
        } else if (currentDecimal >= 16.0 && currentDecimal <= 20.5) {
          setStoreStatus({
            isOpen: true,
            text: 'Evening Hot Samosa & Jalebi Batch Ready'
          });
        } else {
          setStoreStatus({
            isOpen: true,
            text: 'Open Now · Fresh Counter Ready'
          });
        }
      } else {
        setStoreStatus({
          isOpen: false,
          text: 'Store Opens at 8:00 AM'
        });
      }
    };

    updateStatus();
    const timer = setInterval(updateStatus, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalCartBadge = (hamperCount || 0) + (savedFavoritesCount || 0);

  return (
    <>
      {/* Top Announcement & Live Atelier Status Bar - strictly constrained to prevent any horizontal overflow */}
      <div className="relative z-50 w-full overflow-hidden border-b border-gold-400/20 bg-gradient-to-r from-[#25130F] via-[#381E16] to-[#25130F] px-3 py-1.5 text-center text-white shadow-sm sm:px-4">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2.5 text-[11px] font-medium tracking-wide">
          <div className="flex shrink-0 items-center gap-1.5 text-gold-300">
            <Sparkles className="h-3 w-3 animate-pulse text-gold-300" />
            <span className="hidden text-[10px] font-bold uppercase tracking-wider sm:inline">Purity Heritage:</span>
          </div>

          <span className="truncate text-stone-200">
            100% Shuddha Desi Cow Ghee & Daily Fresh Chhena • Spine Road, Pune
          </span>

          {/* Live Status Pill */}
          <div className="hidden shrink-0 items-center gap-1.5 rounded-full border border-gold-300/25 bg-white/10 px-2.5 py-0.5 text-[10px] text-gold-200 lg:inline-flex">
            <span className={`h-1.5 w-1.5 rounded-full ${storeStatus.isOpen ? 'animate-pulse bg-emerald-400' : 'bg-amber-400'}`} />
            <span>{storeStatus.text}</span>
          </div>
        </div>
      </div>

      {/* Main Luxury Glass Navbar - strict max-w-7xl container with non-clipping responsive flex layout */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'border-b border-gold-300/40 bg-ivory-50/95 py-2.5 shadow-md backdrop-blur-xl dark:border-gold-800/40 dark:bg-[#14100D]/95 sm:py-3'
            : 'border-b border-gold-200/30 bg-ivory-50/85 py-3 backdrop-blur-md dark:border-gold-900/30 dark:bg-[#15110E]/85 sm:py-3.5'
        }`}
      >
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4 w-full">
            
            {/* Brand Logo Crest */}
            <a href="#" className="group flex shrink min-w-0 items-center gap-2 sm:gap-3 text-left">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 via-gold-500 to-gold-700 p-0.5 shadow-md transition-all duration-300 group-hover:scale-105 sm:h-11 sm:w-11 sm:rounded-2xl">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] sm:rounded-[14px] border border-gold-200/60 bg-gradient-to-b from-[#FFFDF9] to-ivory-100 dark:border-gold-700/60 dark:from-[#221A15] dark:to-[#17120E]">
                  <span className="select-none text-lg sm:text-xl" role="img" aria-label="Cherry's Sweets">🍒</span>
                </div>
              </div>

              <div className="flex flex-col min-w-0">
                <div className="flex items-baseline gap-1 sm:gap-1.5 truncate">
                  <span className="font-serif text-base sm:text-xl font-bold tracking-tight text-stone-900 transition-colors group-hover:text-gold-700 dark:text-white dark:group-hover:text-gold-400">
                    Cherry&apos;s
                  </span>
                  <span className="font-serif text-xs sm:text-sm font-semibold italic text-gold-600 dark:text-gold-400 truncate">
                    Sweet Mart
                  </span>
                </div>
                <div className="hidden items-center gap-1.5 text-[10px] text-stone-500 dark:text-stone-400 sm:flex">
                  <span className="font-semibold text-stone-800 dark:text-stone-300">चेरीज स्वीट कॉर्नर</span>
                  <span className="text-gold-500">•</span>
                  <span>Spine Rd, Nigdi</span>
                </div>
              </div>
            </a>

            {/* Desktop Navigation Links - Curated 5 Core destinations to prevent width crowding at 1280px-1440px */}
            <nav className="hidden items-center gap-4 text-xs font-semibold text-stone-700 xl:flex 2xl:gap-6 dark:text-stone-200">
              <a href="#menu" className="group relative py-1.5 transition-colors hover:text-gold-700 dark:hover:text-gold-400">
                <span>Sweets Catalog</span>
                <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-gold-500 transition-all duration-300 group-hover:w-full" />
              </a>

              <a href="#signature" className="group relative py-1.5 transition-colors hover:text-gold-700 dark:hover:text-gold-400">
                <span>Signatures</span>
                <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-gold-500 transition-all duration-300 group-hover:w-full" />
              </a>

              <button
                onClick={onOpenHamper}
                className="group relative flex items-center gap-1.5 py-1.5 transition-colors hover:text-gold-700 dark:hover:text-gold-400"
              >
                <span>Gift Hampers</span>
                <span className="rounded-full bg-gradient-to-r from-gold-500 to-amber-600 px-1.5 py-0.2 text-[9px] font-black uppercase text-white shadow-xs">
                  Atelier
                </span>
                <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-gold-500 transition-all duration-300 group-hover:w-full" />
              </button>

              <a href="#story" className="group relative py-1.5 transition-colors hover:text-gold-700 dark:hover:text-gold-400">
                <span>Our Heritage</span>
                <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-gold-500 transition-all duration-300 group-hover:w-full" />
              </a>

              <a href="#reviews" className="group relative py-1.5 transition-colors hover:text-gold-700 dark:hover:text-gold-400">
                <span>Reviews</span>
                <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-gold-500 transition-all duration-300 group-hover:w-full" />
              </a>

              <a href="#location" className="group relative py-1.5 transition-colors hover:text-gold-700 dark:hover:text-gold-400">
                <span>Visit & FAQs</span>
                <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-gold-500 transition-all duration-300 group-hover:w-full" />
              </a>
            </nav>

            {/* Right Action Cluster - Compact, adaptive padding and gap */}
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
              
              {/* Hamper Atelier Trigger Button */}
              <button
                onClick={onOpenHamper}
                className="relative flex items-center justify-center h-9 w-9 sm:h-auto sm:w-auto sm:gap-1.5 rounded-full border border-gold-300/70 bg-gold-50 sm:px-3 sm:py-2 text-xs font-bold text-primary-900 shadow-xs transition-all hover:bg-gold-100 dark:border-gold-800/60 dark:bg-gold-950/40 dark:text-gold-300"
                title="Open Gift Box Builder"
                aria-label="Open Gift Box Builder"
              >
                <Gift className="h-4 w-4 text-gold-700 dark:text-gold-400" />
                <span className="hidden sm:inline">Hamper</span>
                {totalCartBadge > 0 && (
                  <span className="absolute -top-1 -right-1 sm:static flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[10px] font-black text-[#2A140E]">
                    {totalCartBadge}
                  </span>
                )}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={onToggleDarkMode}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-xs transition-all hover:bg-stone-50 dark:border-gold-800/60 dark:bg-[#1E1914] dark:text-gold-400"
                title={darkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                aria-label="Toggle theme mode"
              >
                {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-stone-600" />}
              </button>

              {/* Order Online Dropdown Button - Visible on tablet/desktop (sm:flex); mobile has persistent bottom bar & drawer options */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setOrderDropdownOpen(!orderDropdownOpen)}
                  className="flex items-center gap-1.5 rounded-full bg-[#2A140E] px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-gold-700 active:scale-95"
                  aria-expanded={orderDropdownOpen}
                >
                  <ShoppingBag className="h-3.5 w-3.5 text-gold-300" />
                  <span className="whitespace-nowrap">Order</span>
                  <ChevronDown className={`h-3 w-3 text-gold-300 transition-transform duration-300 ${orderDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {orderDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setOrderDropdownOpen(false)}
                    />
                    <div className="absolute right-0 z-50 mt-2 w-64 rounded-2xl border border-gold-200 bg-white py-2 text-left shadow-2xl animate-fade-in dark:border-gold-800/60 dark:bg-[#1C1713]">
                      <div className="border-b border-stone-100 px-4 py-1.5 dark:border-stone-800">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                          Pune & PCMC Express Delivery
                        </p>
                      </div>

                      {/* Swiggy */}
                      <a
                        href={SHOP_METADATA.swiggyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-stone-800 transition-colors hover:bg-orange-50 dark:text-stone-200 dark:hover:bg-orange-950/30"
                        onClick={() => setOrderDropdownOpen(false)}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-[#FC8019]" />
                          <span>Swiggy Express</span>
                        </div>
                        <span className="rounded bg-orange-100 px-1.5 py-0.5 text-[10px] font-bold text-orange-600 dark:bg-orange-900/50">
                          ~30 mins
                        </span>
                      </a>

                      {/* Zomato */}
                      <a
                        href={SHOP_METADATA.zomatoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-stone-800 transition-colors hover:bg-red-50 dark:text-stone-200 dark:hover:bg-red-950/30"
                        onClick={() => setOrderDropdownOpen(false)}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-[#E23744]" />
                          <span>Zomato Delivery</span>
                        </div>
                        <span className="rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-bold text-red-600 dark:bg-red-900/50">
                          4.0★
                        </span>
                      </a>

                      {/* WhatsApp Concierge */}
                      <a
                        href={`https://wa.me/${SHOP_METADATA.whatsappOrderNumber}?text=${encodeURIComponent("Namaskar Cherry's Sweet Mart, I would like to order fresh sweets from the Spine Road shop.")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between border-t border-stone-100 px-4 py-2.5 text-xs font-semibold text-stone-800 transition-colors hover:bg-emerald-50 dark:border-stone-800 dark:text-stone-200 dark:hover:bg-emerald-950/30"
                        onClick={() => setOrderDropdownOpen(false)}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                          <span>WhatsApp Order</span>
                        </div>
                        <ExternalLink className="h-3 w-3 text-stone-400" />
                      </a>
                    </div>
                  </>
                )}
              </div>

              {/* Mobile Menu Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-xs transition-all hover:bg-stone-50 xl:hidden dark:border-gold-800/60 dark:bg-[#1E1914] dark:text-gold-400"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
              </button>

            </div>

          </div>
        </div>

        {/* Mobile Dropdown Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-gold-200/80 bg-ivory-50/98 px-4 pt-3 pb-6 text-left shadow-2xl animate-fade-in xl:hidden dark:border-gold-900/50 dark:bg-[#16120F]/98">
            {/* Live Timing Status Banner */}
            <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-medium text-emerald-900 dark:border-emerald-800/40 dark:bg-emerald-950/40 dark:text-emerald-300">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{storeStatus.text}</span>
              </span>
              <span className="rounded bg-white px-2 py-0.5 text-[10px] font-semibold dark:bg-emerald-900">All 7 Days</span>
            </div>

            <nav className="flex flex-col space-y-1 pt-2 text-sm font-medium text-stone-800 dark:text-stone-200">
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-3.5 py-2.5 hover:bg-gold-50 dark:hover:bg-stone-800"
              >
                <span>Sweets Catalog (50+ Varieties)</span>
                <span className="text-xs text-gold-600 font-bold">Explore →</span>
              </a>

              <a
                href="#signature"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3.5 py-2.5 hover:bg-gold-50 dark:hover:bg-stone-800"
              >
                Signature Masterpieces
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenHamper();
                }}
                className="flex w-full items-center justify-between rounded-xl border border-gold-300/60 bg-gold-50 px-3.5 py-2.5 text-left font-bold text-primary-900 dark:border-gold-800/40 dark:bg-gold-950/50 dark:text-gold-200"
              >
                <span className="flex items-center gap-2">
                  <Gift className="h-4 w-4 text-gold-700 dark:text-gold-400" />
                  <span>Curate Gift Hamper Box</span>
                </span>
                <span className="rounded-full bg-gold-500 px-2 py-0.5 text-[10px] font-black uppercase text-[#2A140E]">
                  Atelier
                </span>
              </button>

              <a
                href="#story"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3.5 py-2.5 hover:bg-gold-50 dark:hover:bg-stone-800"
              >
                Our Heritage & 4 Vows of Purity
              </a>

              <a
                href="#gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3.5 py-2.5 hover:bg-gold-50 dark:hover:bg-stone-800"
              >
                Storefront & Counter Tour
              </a>

              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3.5 py-2.5 hover:bg-gold-50 dark:hover:bg-stone-800"
              >
                Patron Reviews (3,500+ Local Voices)
              </a>

              <a
                href="#location"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3.5 py-2.5 hover:bg-gold-50 dark:hover:bg-stone-800"
              >
                Store Location, Parking & FAQs
              </a>
            </nav>

            {/* Quick Action Delivery Buttons on Mobile */}
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-gold-200/50 pt-2.5 dark:border-gold-900/40">
              <a
                href={SHOP_METADATA.swiggyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-xl bg-orange-500 p-2.5 text-xs font-bold text-white shadow-sm hover:bg-orange-600"
              >
                <span>🛵 Swiggy (~30m)</span>
              </a>
              <a
                href={SHOP_METADATA.zomatoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-xl bg-red-600 p-2.5 text-xs font-bold text-white shadow-sm hover:bg-red-700"
              >
                <span>🍽️ Zomato Delivery</span>
              </a>
              <a
                href={`https://wa.me/${SHOP_METADATA.whatsappOrderNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 p-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700"
              >
                <span>💬 Direct WhatsApp Concierge</span>
              </a>
            </div>

          </div>
        )}
      </header>
    </>
  );
};
