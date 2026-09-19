// [ADDED] Master App component orchestrating luxury white-theme hospitality digital experience
import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StoreStoryAuthentic } from './components/StoreStoryAuthentic';
import { SignatureShowcase } from './components/SignatureShowcase';
import { SweetCatalog } from './components/SweetCatalog';
import { SweetDetailModal } from './components/SweetDetailModal';
import { GiftHamperBuilder } from './components/GiftHamperBuilder';
import { AuthenticShopGallery } from './components/AuthenticShopGallery';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { LocationHoursVisit } from './components/LocationHoursVisit';
import { Footer } from './components/Footer';
import { SweetItem, SHOP_METADATA } from './data/sweetsData';
import { Phone, ShoppingBag, Gift, ChevronUp } from 'lucide-react';

export const App: React.FC = () => {
  const [selectedSweet, setSelectedSweet] = useState<SweetItem | null>(null);
  const [isHamperOpen, setIsHamperOpen] = useState(false);
  const [favorites] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // [ADDED] Dark mode state with localStorage persistence
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cherry_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('cherry_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('cherry_theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main > section'));
    sections.forEach((section, index) => {
      section.classList.add('reveal-section');
      if (index === 0) section.classList.add('is-visible');
    });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sections.forEach(section => section.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -44px' }
    );
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOrderQuick = (sweet: SweetItem, weight: string, price: number) => {
    const text = encodeURIComponent(
      `Hello Cherry's Sweet Mart (Spine Road), I would like to order:\n• Sweet: ${sweet.name} (${sweet.marathiName})\n• Weight: ${weight}\n• Amount: ₹${price}\nPlease confirm order and delivery time.`
    );
    window.open(`https://wa.me/${SHOP_METADATA.whatsappOrderNumber}?text=${text}`, '_blank');
    showToast(`Inquiring for ${sweet.name} (${weight})...`);
  };

  const scrollToMenu = () => {
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-ivory-50 dark:bg-[#14100d] text-slate-800 dark:text-slate-100 font-sans selection:bg-gold-500 selection:text-white flex flex-col transition-colors duration-300">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#2a1714] text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl border border-gold-400/30 flex items-center gap-2 animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar with Dark Mode Toggle */}
      <Navbar
        onOpenHamper={() => setIsHamperOpen(true)}
        savedFavoritesCount={favorites.length}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* 1. Cinematic Hero Section */}
        <HeroSection
          onExploreClick={scrollToMenu}
          onOpenHamper={() => setIsHamperOpen(true)}
        />

        {/* 2. Authentic Story & Spine Road Presence */}
        <StoreStoryAuthentic />

        {/* 3. Signature Showcase */}
        <SignatureShowcase
          onSelectSweet={sweet => setSelectedSweet(sweet)}
        />

        {/* 4. Complete Sweets & Namkeen Catalog (55+ items) */}
        <SweetCatalog
          onSelectSweet={sweet => setSelectedSweet(sweet)}
          onOrderQuick={handleOrderQuick}
        />

        {/* 5. Authentic Shop Photo Gallery */}
        <AuthenticShopGallery />

        {/* 6. Customer Reviews & Trust Score */}
        <CustomerReviewsSection />

        {/* 7. Location, Hours, Directions & Map */}
        <LocationHoursVisit />
      </main>

      {/* Footer */}
      <Footer />

      {/* Detail Modal */}
      <SweetDetailModal
        sweet={selectedSweet}
        onClose={() => setSelectedSweet(null)}
      />

      {/* Custom Gift Hamper Builder Modal */}
      <GiftHamperBuilder
        isOpen={isHamperOpen}
        onClose={() => setIsHamperOpen(false)}
      />

      {/* Back to top floating button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-20 sm:bottom-6 right-5 z-30 w-11 h-11 rounded-full bg-white/95 dark:bg-[#251914]/95 hover:bg-gold-600 text-slate-700 dark:text-gold-300 hover:text-white border border-gold-300/80 dark:border-gold-800 shadow-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-1 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      {/* Persistent Mobile Bottom Action Bar */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-[#fffdf8]/95 dark:bg-[#1b120f]/95 backdrop-blur-md border-t border-gold-200 dark:border-gold-900/60 py-2.5 px-3 flex items-center justify-between gap-2 shadow-[0_-12px_32px_rgba(42,23,20,0.12)]">
        <a
          href={`tel:${SHOP_METADATA.phone.replace(/\s+/g, '')}`}
          className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs text-center flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-gold-600" />
          <span>Call Shop</span>
        </a>

        <button
          onClick={() => setIsHamperOpen(true)}
          className="flex-1 py-2 rounded-xl bg-gold-100 dark:bg-gold-900/40 hover:bg-gold-200 text-gold-900 dark:text-gold-200 font-bold text-xs text-center flex items-center justify-center gap-1.5 border border-gold-300/40"
        >
          <Gift className="w-3.5 h-3.5 text-gold-700 dark:text-gold-400" />
          <span>Hamper</span>
        </button>

        <a
          href={SHOP_METADATA.swiggyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5 shadow"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Order</span>
        </a>
      </div>

    </div>
  );
};

export default App;
