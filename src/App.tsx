// [ADDED] Master App component orchestrating luxury digital confectionery flagship experience with synchronized hamper state and smart scroll control
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
import { Phone, ShoppingBag, Gift, ChevronUp, CheckCircle2 } from 'lucide-react';

export const App: React.FC = () => {
  const [selectedSweet, setSelectedSweet] = useState<SweetItem | null>(null);
  const [isHamperOpen, setIsHamperOpen] = useState(false);
  const [hamperItems, setHamperItems] = useState<SweetItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
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

  // [FIXED] Section reveal observer configured with threshold: 0 and responsive detection
  // Previous threshold: 0.08 required 8% of the 28,000px tall catalog (2,291px) to fit in the 844px mobile viewport,
  // making it mathematically impossible to trigger on mobile and leaving the catalog hidden at opacity: 0.
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main > section'));
    sections.forEach((section, index) => {
      section.classList.add('reveal-section');
      if (index === 0 || (section.id === 'menu' && window.innerWidth <= 768)) {
        section.classList.add('is-visible');
      }
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
      { threshold: 0, rootMargin: '0px 0px -20px 0px' }
    );
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // [FIXED] Smart scroll listener so back-to-top button only appears when scrolled down (> 400px)
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddToHamper = (sweet: SweetItem, _weightGrams: number) => {
    setHamperItems(prev => [...prev, sweet]);
    showToast(`Added "${sweet.name}" to Hamper Atelier`);
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
      menuEl.classList.add('is-visible');
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-ivory-50 dark:bg-[#14100D] text-stone-800 dark:text-stone-100 font-sans selection:bg-gold-500 selection:text-white flex flex-col transition-colors duration-300">
      
      {/* Dynamic Toast Notification */}
      {toastMessage && (
        <div className="fixed top-22 right-4 z-50 flex items-center gap-2.5 rounded-2xl border border-gold-400/40 bg-[#25130F] px-4.5 py-3 text-xs font-bold text-white shadow-2xl animate-fade-in">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Haute Confectionery Navbar */}
      <Navbar
        onOpenHamper={() => setIsHamperOpen(true)}
        hamperCount={hamperItems.length}
        savedFavoritesCount={0}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Flagship Page Sections */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {/* 1. Cinematic Hero Section */}
        <HeroSection
          onExploreClick={scrollToMenu}
          onOpenHamper={() => setIsHamperOpen(true)}
        />

        {/* 2. Authentic Heritage Story & Spine Road Presence */}
        <StoreStoryAuthentic />

        {/* 3. Signature Masterpiece Mithai Showcase */}
        <SignatureShowcase
          onSelectSweet={sweet => setSelectedSweet(sweet)}
          onAddToHamper={handleAddToHamper}
        />

        {/* 4. Complete Sweets & Namkeen Catalog (50+ items) */}
        <SweetCatalog
          onSelectSweet={sweet => setSelectedSweet(sweet)}
          onOrderQuick={handleOrderQuick}
          onAddToHamper={handleAddToHamper}
        />

        {/* 5. Authentic Spine Road Shop Photo Gallery */}
        <AuthenticShopGallery />

        {/* 6. Customer Reviews & Trust Score */}
        <CustomerReviewsSection />

        {/* 7. Location, Hours, Directions & Map Guide */}
        <LocationHoursVisit />
      </main>

      {/* Flagship Footer */}
      <Footer onOpenHamper={() => setIsHamperOpen(true)} />

      {/* Sweet Dossier Modal */}
      <SweetDetailModal
        sweet={selectedSweet}
        onClose={() => setSelectedSweet(null)}
        onAddToHamper={handleAddToHamper}
      />

      {/* Custom Artisanal Hamper Builder Atelier Modal */}
      <GiftHamperBuilder
        isOpen={isHamperOpen}
        onClose={() => setIsHamperOpen(false)}
        initialSweets={hamperItems}
        onHamperUpdate={setHamperItems}
      />

      {/* [FIXED] Back to top floating button - Only visible when user has scrolled past 400px */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-22 sm:bottom-6 right-4 sm:right-6 z-30 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-gold-300/80 bg-white/95 text-stone-700 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-gold-500 hover:text-[#2A140E] active:scale-95 dark:border-gold-700 dark:bg-[#201712] dark:text-gold-300 dark:hover:bg-gold-500 dark:hover:text-[#2A140E] animate-fade-in"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}

      {/* Persistent Mobile Bottom Action Bar */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 flex items-center justify-between gap-2 border-t border-gold-200/80 bg-[#FFFDF9]/95 px-3 py-2.5 shadow-[0_-12px_32px_rgba(36,19,15,0.12)] backdrop-blur-md dark:border-gold-900/60 dark:bg-[#1A120E]/95">
        <a
          href={`tel:${SHOP_METADATA.phone.replace(/\s+/g, '')}`}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-stone-100 py-2 text-center text-xs font-bold text-stone-900 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-white"
        >
          <Phone className="h-3.5 w-3.5 text-gold-600" />
          <span>Call Store</span>
        </a>

        <button
          onClick={() => setIsHamperOpen(true)}
          className="relative flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gold-300/60 bg-gold-50 py-2 text-center text-xs font-bold text-stone-900 transition-colors hover:bg-gold-100 dark:border-gold-600/60 dark:bg-[#251A10] dark:text-gold-200"
        >
          <Gift className="h-3.5 w-3.5 text-gold-600 dark:text-gold-400" />
          <span>Hamper</span>
          {/* [FIXED] Issue #1: Standardize mobile badge font size to text-xs */}
          {hamperItems.length > 0 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-xs font-black text-[#2A140E]">
              {hamperItems.length}
            </span>
          )}
        </button>

        <a
          href={SHOP_METADATA.swiggyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 py-2 text-center text-xs font-bold text-white shadow"
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          <span>Swiggy</span>
        </a>
      </div>

    </div>
  );
};

export default App;
