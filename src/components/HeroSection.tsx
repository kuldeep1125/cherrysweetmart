// [ADDED] HeroSection component with dark mode support, non-overlapping decorative assets & official Swiggy/Zomato brand styling
import React from 'react';
import { Star, ShieldCheck, Award, ArrowRight, Phone, Sparkles, Flame, CheckCircle2 } from 'lucide-react';
import { SHOP_METADATA } from '../data/sweetsData';

interface HeroSectionProps {
  onExploreClick: () => void;
  onOpenHamper: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onOpenHamper }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ivory-100 via-ivory-50 to-white dark:from-[#12100E] dark:via-[#171310] dark:to-[#12100E] pt-8 pb-16 lg:pt-14 lg:pb-24 transition-colors duration-300">
      
      {/* Background Decorative Ambient Circles */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-gold-100/40 dark:from-gold-900/20 via-gold-200/20 dark:via-gold-800/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-amber-100/30 dark:bg-amber-950/20 rounded-full blur-2xl pointer-events-none -z-10" />

      {/* Decorative Sweet Cutouts - Safely positioned in far corners so they NEVER overlap text or buttons */}
      <div className="hidden xl:block absolute top-12 left-4 w-20 h-20 animate-float-slow opacity-80 pointer-events-none">
        <img
          src="/images/cutouts/kaju_katli_silver_saucer.png"
          alt="Shahi Kaju Katli"
          className="w-full h-full object-contain drop-shadow-xl"
        />
      </div>
      <div className="hidden 2xl:block absolute top-20 right-8 w-24 h-24 animate-float-reverse opacity-75 pointer-events-none">
        <img
          src="/images/cutouts/ukadiche_modak_plate.png"
          alt="Shahi Mawa Modak"
          className="w-full h-full object-contain drop-shadow-2xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Story, Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Verified Heritage Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1C1713] border border-gold-300/80 dark:border-gold-700/60 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-gold-600 animate-ping" />
              <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-gold-800 dark:text-gold-300">
                Pimpri-Chinchwad's Authentic Mithai Mart
              </span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="text-slate-600 dark:text-slate-400 text-xs font-medium">Spine Road</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="font-display text-3xl sm:text-5xl xl:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.15] tracking-tight">
                Pure <span className="text-gold-gradient">Shuddha Desi Ghee</span> & Royal Mithai
              </h1>
              <p className="font-serif italic text-lg sm:text-2xl text-gold-700 dark:text-gold-400 font-semibold">
                चेरीज स्वीट कॉर्नर — परंपरेची शुद्ध चव आणि आपुलकी
              </p>
            </div>

            {/* Description */}
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
              For thousands of families across Chinchwad, Nigdi, and Pune, festival celebrations and family milestones begin at Cherry's Sweet Mart. Prepared daily in small batches with 100% pure cow ghee, morning-fresh milk chhena, and premium Goan cashews.
            </p>

            {/* Key Quality Pillars Pill Grid */}
            {/* [ADDED]: Luxury card hover lift and micro-interactions */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/90 dark:bg-[#1A1613] border border-gold-100 dark:border-gold-800/40 shadow-xs hover:-translate-y-1 hover:border-gold-300 dark:hover:border-gold-600 hover:shadow-md transition-all duration-300 cursor-default">
                <div className="w-7 h-7 rounded-lg bg-gold-50 dark:bg-gold-950/40 flex items-center justify-center text-gold-600 dark:text-gold-400 flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-800 dark:text-slate-200">100% Shuddha Ghee</div>
                  <div className="text-slate-500 dark:text-slate-400 text-[10px]">Zero adulteration</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/90 dark:bg-[#1A1613] border border-gold-100 dark:border-gold-800/40 shadow-xs hover:-translate-y-1 hover:border-gold-300 dark:hover:border-gold-600 hover:shadow-md transition-all duration-300 cursor-default">
                <div className="w-7 h-7 rounded-lg bg-gold-50 dark:bg-gold-950/40 flex items-center justify-center text-gold-600 dark:text-gold-400 flex-shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-800 dark:text-slate-200">Fresh Chhena Daily</div>
                  <div className="text-slate-500 dark:text-slate-400 text-[10px]">Hand-crafted Bengali</div>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2 p-2.5 rounded-xl bg-white/90 dark:bg-[#1A1613] border border-gold-100 dark:border-gold-800/40 shadow-xs hover:-translate-y-1 hover:border-gold-300 dark:hover:border-gold-600 hover:shadow-md transition-all duration-300 cursor-default">
                <div className="w-7 h-7 rounded-lg bg-gold-50 dark:bg-gold-950/40 flex items-center justify-center text-gold-600 dark:text-gold-400 flex-shrink-0">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-800 dark:text-slate-200">3,500+ Reviews</div>
                  <div className="text-slate-500 dark:text-slate-400 text-[10px]">3.7★ on Google</div>
                </div>
              </div>
            </div>

            {/* CTA Button Array */}
            {/* [ADDED]: Silky micro-animations, scale on active/hover, shimmer badge */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 hover:from-gold-700 hover:to-gold-800 text-white font-bold text-sm shadow-lg hover:shadow-xl hover:shadow-gold-500/25 hover:scale-103 active:scale-97 transition-all duration-300 flex items-center gap-2.5 group cursor-pointer"
              >
                <span>Explore 50+ Fresh Sweets</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>

              <button
                onClick={onOpenHamper}
                className="px-5 py-3.5 rounded-full bg-white dark:bg-[#1E1914] hover:bg-gold-50 dark:hover:bg-[#25201A] border border-gold-300 dark:border-gold-700 hover:border-gold-500 dark:hover:border-gold-500 text-gold-900 dark:text-gold-300 font-bold text-sm shadow-sm hover:shadow-md hover:scale-103 active:scale-97 transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <Award className="w-4 h-4 text-gold-600 dark:text-gold-400 group-hover:rotate-12 transition-transform" />
                <span>Custom Gift Hamper</span>
              </button>

              <a
                href={`tel:${SHOP_METADATA.phone.replace(/\s+/g, '')}`}
                className="px-4 py-3.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-transparent hover:border-slate-300 dark:hover:border-slate-600 text-slate-800 dark:text-slate-200 font-semibold text-sm hover:scale-103 active:scale-97 transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-gold-600 dark:text-gold-400" />
                <span>Call Shop</span>
              </a>
            </div>

            {/* Prominent, Unobstructed Instant Delivery Section */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Order Online for Instant Home Delivery:
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href={SHOP_METADATA.swiggyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#FC8019] to-[#F16B00] hover:from-[#F16B00] hover:to-[#DE5D00] text-white font-extrabold text-xs shadow-md hover:shadow-lg hover:shadow-orange-500/35 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-1.5 cursor-pointer group"
                >
                  <span className="text-[13px] group-hover:translate-x-0.5 transition-transform">🛵</span>
                  <span>Swiggy Delivery</span>
                </a>
                <a
                  href={SHOP_METADATA.zomatoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#E23744] to-[#CB202D] hover:from-[#CB202D] hover:to-[#B51723] text-white font-extrabold text-xs shadow-md hover:shadow-lg hover:shadow-red-500/35 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-1.5 cursor-pointer group"
                >
                  <span className="text-[13px] group-hover:scale-110 transition-transform">🍽️</span>
                  <span>Zomato Delivery</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Circular Gold Glow Frame */}
              <div className="relative p-3 rounded-3xl bg-gradient-to-b from-gold-300/40 via-gold-100/30 to-white/70 dark:from-gold-700/30 dark:via-gold-900/20 dark:to-[#1A1613] shadow-2xl border border-gold-200 dark:border-gold-800/60">
                <div className="relative rounded-2xl overflow-hidden aspect-square shadow-inner group bg-slate-900">
                  <img
                    src="/images/banners/grand_festive_feast_samosa_kaju.jpg"
                    alt="Cherry's Sweet Mart Festive Feast"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/15 to-transparent pointer-events-none" />

                  {/* On-Image Bottom Badge */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-1.5 text-gold-300 text-xs font-semibold mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Diwali & Festive Celebration Thali</span>
                    </div>
                    <div className="font-display text-lg font-bold">
                      Signature Kaju Katli & Samosa Feast
                    </div>
                  </div>
                </div>

                {/* Floating Card 1: Hot Desi Ghee Jalebi Badge */}
                <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white/95 dark:bg-[#1C1713]/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-gold-200 dark:border-gold-800/60 flex items-center gap-3 max-w-[240px] animate-float-slow">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center text-orange-600 dark:text-orange-400 flex-shrink-0">
                    <Flame className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-orange-700 dark:text-orange-400 flex items-center gap-1">
                      <span>Live Kadai</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Desi Ghee Jalebi</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Fried hot with thick rabdi</div>
                  </div>
                </div>

                {/* Floating Card 2: 3,500+ Google Reviews Badge */}
                <div className="absolute -top-4 -right-3 sm:-right-6 bg-white/95 dark:bg-[#1C1713]/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-gold-200 dark:border-gold-800/60 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 flex items-center justify-center text-amber-600 dark:text-amber-400 flex-shrink-0">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-extrabold text-slate-900 dark:text-white">3.7</span>
                      <div className="flex text-amber-400 text-xs">★★★★☆</div>
                    </div>
                    <div className="text-[10px] text-slate-600 dark:text-slate-300 font-medium">
                      3,505 Google Reviews
                    </div>
                  </div>
                </div>

              </div>

              {/* Verified Trust Stamp below */}
              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>FSSAI Certified</span>
                </span>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Pure Vegetarian (100%)</span>
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
