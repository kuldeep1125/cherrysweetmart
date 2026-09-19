// [ADDED] SignatureShowcase component with dark mode support, non-clipped tab row & editorial showcase
import React, { useState } from 'react';
import { Sparkles, Check, Eye } from 'lucide-react';
import { SWEETS_CATALOG, SweetItem } from '../data/sweetsData';

interface SignatureShowcaseProps {
  onSelectSweet: (sweet: SweetItem) => void;
}

export const SignatureShowcase: React.FC<SignatureShowcaseProps> = ({ onSelectSweet }) => {
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
  const activeSweet = signatures[activeIndex] || signatures[0];

  return (
    <section id="signature" className="py-16 sm:py-24 bg-gradient-to-b from-ivory-50 via-white to-ivory-100 dark:from-[#15110E] dark:via-[#191410] dark:to-[#15110E] relative overflow-hidden transition-colors duration-300">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold-200/20 dark:bg-gold-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-100 dark:bg-gold-950/50 text-gold-900 dark:text-gold-300 text-xs font-bold uppercase tracking-wider border border-gold-200 dark:border-gold-800/40">
            <Sparkles className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" />
            <span>Master Craftsman Creations</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Our Signature <span className="text-gold-gradient">Masterpiece Mithai</span>
          </h2>
          <p className="font-serif italic text-gold-700 dark:text-gold-400 text-base sm:text-lg">
            चेरीज स्वीट कॉर्नरची सर्वाधिक लोकप्रिय खास उत्पादने
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
            Click through our signature collection to explore our most beloved recipes created with pure cow ghee and handpicked ingredients.
          </p>
        </div>

        {/* Tab Selector Buttons - Responsive flex-wrap so all 6 signatures are 100% visible with zero clipping */}
        {/* [FIXED]: Switched from horizontal scroll to responsive flex-wrap so every signature creation is immediately visible */}
        <div className="w-full py-2 px-2 sm:px-4 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-5xl mx-auto">
            {signatures.map((sweet, index) => (
              <button
                key={sweet.id}
                onClick={() => setActiveIndex(index)}
                className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-2 border cursor-pointer ${
                  activeIndex === index
                    ? 'bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 text-white border-gold-500 shadow-lg shadow-gold-500/25 scale-105 ring-2 ring-gold-400/40'
                    : 'bg-white dark:bg-[#1E1914] text-slate-700 dark:text-slate-200 border-slate-200/80 dark:border-gold-800/40 hover:border-gold-400 dark:hover:border-gold-600 hover:bg-gold-50/70 dark:hover:bg-[#25201A] hover:-translate-y-0.5'
                }`}
              >
                <span>{sweet.name.split('(')[0]}</span>
                {sweet.isBestseller && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-xs flex-shrink-0"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Showcase Card */}
        <div className="bg-white dark:bg-[#1C1713] rounded-3xl border border-gold-200 dark:border-gold-800/40 shadow-2xl p-6 sm:p-10 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Big Hero Image with Cutout Accent */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden h-72 sm:h-96 w-full shadow-lg border border-gold-100 dark:border-gold-800/30 group bg-slate-900">
                <img
                  src={activeSweet.image}
                  alt={activeSweet.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Bestseller Badge */}
                {activeSweet.isBestseller && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gold-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                    ★ Bestseller on Spine Road
                  </div>
                )}

                {/* Dietary Tags */}
                <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                  {activeSweet.dietary.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-sm text-white text-[10px] font-medium"
                    >
                      {tag.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              </div>

              {/* Decorative Corner Cutout if exists */}
              {activeSweet.cutoutImage && (
                <div className="hidden sm:block absolute -bottom-6 -right-6 w-28 h-28 pointer-events-none drop-shadow-2xl animate-float-slow">
                  <img
                    src={activeSweet.cutoutImage}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>

            {/* Right: Detailed Description & Culinary Notes */}
            <div className="lg:col-span-6 space-y-5 text-left">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-700 dark:text-gold-400">
                  {activeSweet.categoryName}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {activeSweet.name}
                </h3>
                <p className="font-serif italic text-gold-600 dark:text-gold-400 text-base font-semibold">
                  {activeSweet.marathiName}
                </p>
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {activeSweet.description}
              </p>

              {/* Price Tier Display */}
              <div className="p-4 rounded-2xl bg-ivory-50 dark:bg-[#16120E] border border-gold-100 dark:border-gold-800/30 flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
                    Pricing per Weight
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">₹{activeSweet.price500g}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">/ 500 grams</span>
                    <span className="text-slate-300 dark:text-slate-700">|</span>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">₹{activeSweet.price1kg} / 1 kg</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/40">
                    Fresh Stock
                  </span>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Shelf Life: {activeSweet.shelfLife}</div>
                </div>
              </div>

              {/* Culinary & Storage Attributes */}
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Allergens:</strong> {activeSweet.allergens}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Storage:</strong> {activeSweet.storage}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onSelectSweet(activeSweet)}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-700 hover:to-gold-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Full Details & Nutrition</span>
                </button>
                <a
                  href={`https://wa.me/918379890393?text=${encodeURIComponent(`Hello Cherry's Sweet Mart, I would like to order ${activeSweet.name} (₹${activeSweet.price500g}/500g).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <span>Quick WhatsApp Order</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
