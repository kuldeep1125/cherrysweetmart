// [ADDED] World-class SignatureShowcase component featuring sensory profile meters, interactive weight pricing toggles, and artisanal culinary notes
import React, { useState } from 'react';
import { Sparkles, Eye, MessageCircle, Thermometer, Coffee, Compass, Check, Heart, ShieldCheck } from 'lucide-react';
import { SWEETS_CATALOG, SweetItem } from '../data/sweetsData';

interface SignatureShowcaseProps {
  onSelectSweet: (sweet: SweetItem) => void;
  onAddToHamper?: (sweet: SweetItem, weightGrams: number) => void;
}

export const SignatureShowcase: React.FC<SignatureShowcaseProps> = ({ onSelectSweet, onAddToHamper }) => {
  // Select 6 prime signature sweets
  const signatures = SWEETS_CATALOG.filter(
    s => s.id === 'kaju-katli-silver' ||
         s.id === 'jalebi-rabdi-combo' ||
         s.id === 'shahi-kesar-rasmalai' ||
         s.id === 'black-dryfruit-kala-jamun' ||
         s.id === 'ukadiche-modak' ||
         s.id === 'sugarfree-anjeer-barfi'
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState<'250g' | '500g' | '1kg'>('500g');
  const [addedToast, setAddedToast] = useState(false);

  const activeSweet = signatures[activeIndex] || signatures[0];

  // Price calculations based on selected weight
  const currentPrice = selectedWeight === '250g'
    ? activeSweet.price250g || Math.round(activeSweet.price500g * 0.55)
    : selectedWeight === '500g'
    ? activeSweet.price500g
    : activeSweet.price1kg;

  const handleAddHamper = () => {
    const grams = selectedWeight === '250g' ? 250 : selectedWeight === '500g' ? 500 : 1000;
    if (onAddToHamper) {
      onAddToHamper(activeSweet, grams);
      setAddedToast(true);
      setTimeout(() => setAddedToast(false), 2400);
    } else {
      onSelectSweet(activeSweet);
    }
  };

  return (
    <section id="signature" className="relative w-full max-w-full overflow-hidden bg-gradient-to-b from-ivory-100 via-white to-ivory-100 py-18 sm:py-24 dark:from-[#17120E] dark:via-[#1A1511] dark:to-[#17120E] transition-colors duration-300">
      {/* Subtle background luxury lighting */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-400/10 blur-3xl dark:bg-gold-500/5" />
      <div className="pointer-events-none absolute right-0 bottom-1/4 h-96 w-96 translate-x-1/2 rounded-full bg-primary-800/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="mx-auto mb-8 max-w-3xl text-center">
          {/* [FIXED] Standardized section badge with guaranteed dark mode contrast */}
          <div className="section-badge">
            <Sparkles className="h-3.5 w-3.5 text-gold-600 dark:text-gold-400" />
            <span>Artisanal Confectionery Stage</span>
          </div>

          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-5xl dark:text-white">
            Signature <span className="text-gold-gradient font-normal italic">Masterpiece Mithai</span>
          </h2>

          <p className="mt-2 font-display text-base font-semibold italic text-primary-800 dark:text-gold-400 sm:text-lg">
            चेरीज स्वीट कॉर्नरची सर्वाधिक लोकप्रिय खास उत्पादने
          </p>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-stone-600 dark:text-stone-300 sm:text-base">
            Prepared every morning in strictly small kadai batches using pure A2 cow ghee, freshly curdled chhena, and organic spices. Select a signature below to inspect its craft dossier.
          </p>
        </div>

        {/* [FIXED] Issue 9, 10, 22 & 23: Balanced responsive grid (3x2 or 6x1), reduced proximity gap, and single Top Pick */}
        <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5 max-w-5xl mx-auto">
          {signatures.map((sweet, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={sweet.id}
                onClick={() => {
                  setActiveIndex(index);
                  setSelectedWeight('500g');
                }}
                className={`group relative flex w-full flex-col items-center justify-center gap-1 rounded-xl p-2.5 text-center text-xs font-bold transition-all sm:text-xs ${
                  isActive
                    ? 'border-2 border-gold-500 bg-gold-50 text-stone-900 shadow-md ring-2 ring-gold-400/40 dark:border-gold-400 dark:bg-[#2A1D13] dark:text-gold-100 dark:ring-gold-500/30'
                    : 'border border-stone-200 bg-white text-stone-600 hover:border-gold-300 hover:text-stone-900 shadow-xs dark:border-stone-800 dark:bg-[#1E1712] dark:text-stone-300 dark:hover:border-gold-700 dark:hover:bg-[#251D16] dark:hover:text-gold-200'
                }`}
              >
                <span className="line-clamp-2 leading-tight">{sweet.name.split('(')[0].trim()}</span>
                {/* [FIXED] Issue 23 & Dark Mode: High-contrast Top Pick badge */}
                {index === 0 && (
                  <span
                    className="inline-flex items-center rounded-full bg-gold-500/20 px-1.5 py-0.5 text-xs font-bold text-gold-800 dark:bg-gold-400/20 dark:text-gold-200"
                    aria-label="Flagship Bestseller"
                  >
                    ★ Top Pick
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Featured Masterpiece Dossier Showcase */}
        <div className="overflow-hidden rounded-3xl border border-gold-200/80 bg-white p-6 shadow-2xl transition-all duration-500 sm:p-10 lg:p-12 dark:border-gold-800/40 dark:bg-[#1E1814]">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            
            {/* Left Column: Visual Presentation with Gold Foil Accent */}
            <div className="relative lg:col-span-6">
              <div className="group relative aspect-[4/3.6] w-full overflow-hidden rounded-2xl border border-gold-300/40 bg-stone-900 shadow-xl sm:aspect-[4/3.2]">
                <img
                  src={activeSweet.image}
                  alt={activeSweet.name}
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Gradient shade */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                {/* [FIXED] Issue 26: Single clean bestseller overlay on photo */}
                {activeSweet.isBestseller && (
                  <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-3 py-1 text-xs font-bold text-[#2A140E] shadow-md">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Spine Road Bestseller</span>
                  </div>
                )}
              </div>

              {/* [FIXED] Issue 26: Consolidated metadata strip beneath image */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="rounded-md bg-stone-100 px-2.5 py-0.5 text-xs font-semibold text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                    {activeSweet.categoryName}
                  </span>
                  {activeSweet.dietary.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-stone-200 px-2 py-0.5 text-xs text-stone-600 dark:border-stone-800 dark:text-stone-400"
                    >
                      {tag.replace('-', ' ')}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  Shelf Life: {activeSweet.shelfLife}
                </span>
              </div>

              {/* Verified Ghee Guarantee Tag */}
              <div className="mt-2.5 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
                  <ShieldCheck className="h-4 w-4" />
                  100% Shuddha Desi Cow Ghee
                </span>
                <span>Storage: {activeSweet.storage}</span>
              </div>
            </div>

            {/* Right Column: Culinary Notes, Sensory Profile & Interactive Weight Selector */}
            <div className="space-y-6 text-left lg:col-span-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-gold-700 dark:text-gold-400">
                    {activeSweet.categoryName}
                  </span>
                  <span className="text-stone-300 dark:text-stone-600">·</span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">
                    Daily Fresh Preparation
                  </span>
                </div>

                <h3 className="mt-1 font-display text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl lg:text-4xl dark:text-white">
                  {activeSweet.name}
                </h3>
                <p className="mt-1 font-display text-lg font-medium italic text-primary-800 dark:text-gold-300">
                  {activeSweet.marathiName}
                </p>
              </div>

              {/* Confection Story */}
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300 sm:text-base">
                {activeSweet.description}
              </p>

              {/* [ADDED] Interactive Sensory Profile Meters */}
              {activeSweet.sensoryProfile && (
                <div className="rounded-2xl border border-gold-200/70 bg-ivory-50/70 p-4 dark:border-gold-900/40 dark:bg-[#16120E]">
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                    Confectioner&apos;s Sensory Dossier
                  </div>

                  {/* [FIXED] Issue 15: Consistent 3-column grid layout across all screen sizes with subtle dividers */}
                  <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3.5 divide-x divide-gold-200/50 dark:divide-gold-900/40">
                    {/* Sweetness Bar */}
                    <div className="pr-2">
                      <div className="flex items-center justify-between text-xs font-medium text-stone-700 dark:text-stone-300">
                        <span>Sweetness</span>
                        <span className="font-bold text-gold-600 dark:text-gold-400">{activeSweet.sensoryProfile.sweetness}/5</span>
                      </div>
                      <div className="mt-1.5 flex h-2 gap-1 rounded-full bg-stone-200 dark:bg-stone-800 p-0.5">
                        {[1, 2, 3, 4, 5].map((lvl) => (
                          <div
                            key={lvl}
                            className={`flex-1 rounded-full transition-all ${
                              lvl <= activeSweet.sensoryProfile!.sweetness
                                ? 'bg-gradient-to-r from-gold-500 to-amber-500'
                                : 'opacity-20'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Texture */}
                    <div className="px-2">
                      <span className="text-xs font-medium text-stone-500 dark:text-stone-400">Texture</span>
                      <p className="mt-0.5 text-xs font-bold text-stone-800 dark:text-stone-200 truncate">
                        {activeSweet.sensoryProfile.texture}
                      </p>
                    </div>

                    {/* Serving Temp */}
                    <div className="pl-2">
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-stone-500 dark:text-stone-400">
                        <Thermometer className="h-3.5 w-3.5 text-gold-600" />
                        <span className="truncate">Serving Temp</span>
                      </span>
                      <p className="mt-0.5 text-xs font-bold text-stone-800 dark:text-stone-200 truncate">
                        {activeSweet.sensoryProfile.servingTemp}
                      </p>
                    </div>
                  </div>

                  {/* Culinary Pairing */}
                  <div className="mt-3.5 flex items-center gap-2 border-t border-gold-200/50 pt-2.5 text-xs text-stone-600 dark:border-gold-900/30 dark:text-stone-300">
                    <Coffee className="h-3.5 w-3.5 text-gold-600 shrink-0" />
                    <span><strong className="text-stone-800 dark:text-stone-200">Recommended Pairing:</strong> {activeSweet.sensoryProfile.pairing}</span>
                  </div>
                </div>
              )}

              {/* [ADDED] Dynamic Weight Portion Selector with Live Price Update */}
              <div className="rounded-2xl border border-stone-200 bg-stone-50/60 p-4 dark:border-gold-900/40 dark:bg-[#18130F]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                    Select Packaging Size
                  </span>
                  <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                    Available Today in Counter
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
                  {(['250g', '500g', '1kg'] as const).map((wt) => {
                    const price = wt === '250g'
                      ? activeSweet.price250g || Math.round(activeSweet.price500g * 0.55)
                      : wt === '500g'
                      ? activeSweet.price500g
                      : activeSweet.price1kg;

                    const isSelected = selectedWeight === wt;

                    return (
                      <button
                        key={wt}
                        onClick={() => setSelectedWeight(wt)}
                        className={`rounded-xl border p-2.5 text-center transition-all ${
                          isSelected
                            ? 'border-gold-500 bg-white dark:bg-stone-800 dark:border-gold-400 shadow-md ring-2 ring-gold-400/40'
                            : 'border-stone-200 bg-white/60 dark:border-stone-800 dark:bg-stone-900/40 hover:border-gold-300'
                        }`}
                      >
                        <div className="text-xs font-bold text-stone-800 dark:text-stone-200">{wt}</div>
                        <div className="mt-0.5 text-sm font-black text-primary-900 dark:text-gold-300">
                          ₹{price}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* [FIXED] Issue 28 & 29: Full-width matching 2-column grid with ghost secondary Inspect button */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full pt-2">
                <button
                  onClick={() => onSelectSweet(activeSweet)}
                  className="inline-flex w-full min-h-[46px] items-center justify-center gap-2 rounded-xl border border-stone-300/80 bg-white/80 dark:border-stone-700 dark:bg-stone-800/80 px-4 py-2.5 text-xs font-bold text-stone-800 dark:text-stone-200 shadow-xs transition-all duration-300 hover:border-gold-400 hover:text-gold-700 dark:hover:text-gold-300 active:scale-95"
                >
                  <Eye className="h-4 w-4 text-gold-600 dark:text-gold-400" />
                  <span>Inspect Full Dossier</span>
                </button>

                <a
                  href={`https://wa.me/918379890393?text=${encodeURIComponent(
                    `Hello Cherry's Sweet Mart (Spine Road), I would like to order ${activeSweet.name} (${selectedWeight} for ₹${currentPrice}). Please confirm availability.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full min-h-[46px] items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all duration-300 hover:bg-emerald-700 active:scale-95"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Order {selectedWeight} via WhatsApp</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
