import React, { useMemo } from 'react';
import { ArrowRight, Award, CheckCircle2, Clock, Phone, Sparkles, Star, MapPin } from 'lucide-react';
import { SHOP_METADATA, RATING_METRICS } from '../data/sweetsData';

interface HeroSectionProps {
  onExploreClick: () => void;
  onOpenHamper: () => void;
}

// [REFACTORED] Elevated HeroSection with dynamic culinary batch status, bespoke grand feast imagery, and high-contrast editorial typography
export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onOpenHamper }) => {
  // [ADDED] Live culinary batch scheduler based on Pune local time
  const currentBatchStatus = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      return {
        badge: 'Morning Kadai Batch',
        detail: 'Fresh Shahi Rasmalai, Kesar Jalebi & Crisp Fafda',
        active: true,
      };
    } else if (hour >= 12 && hour < 17) {
      return {
        badge: 'Midday Confection Batch',
        detail: 'Pure Kaju Katli, Malai Pedha & Royal Ladoos',
        active: true,
      };
    } else if (hour >= 17 && hour < 22) {
      return {
        badge: 'Evening Golden Hour Batch',
        detail: 'Sizzling Desi Ghee Jalebi, Hot Rabdi & Fresh Farsan',
        active: true,
      };
    } else {
      return {
        badge: 'Next Batch 6:00 AM',
        detail: 'Handcrafted daily with 100% Shuddha Cow Ghee',
        active: false,
      };
    }
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-[#24130F] pt-8 pb-14 sm:pt-12 sm:pb-20 lg:py-24">
      {/* Ambient background light gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_25%,rgba(217,160,62,0.22),transparent_32rem),radial-gradient(circle_at_15%_80%,rgba(142,32,46,0.35),transparent_36rem)]" />
      <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          
          {/* Left Hero Narrative Column */}
          <div className="relative z-10 text-center lg:col-span-6 lg:text-left">
            {/* Live Counter Pill */}
            <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-gold-300/30 bg-white/5 px-4 py-1.5 text-[11px] font-semibold tracking-wide text-gold-200 backdrop-blur-md shadow-sm sm:text-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className={`absolute inline-flex h-full w-full rounded-full ${currentBatchStatus.active ? 'animate-ping bg-emerald-400 opacity-75' : 'bg-gold-400'}`} />
                <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${currentBatchStatus.active ? 'bg-emerald-400' : 'bg-gold-400'}`} />
              </span>
              <span className="font-bold text-gold-100">{currentBatchStatus.badge}</span>
              <span className="hidden text-stone-300/80 sm:inline">·</span>
              <span className="hidden text-stone-300 sm:inline">{currentBatchStatus.detail}</span>
            </div>

            {/* Sub-label */}
            <p className="mb-3 font-sans text-xs font-bold uppercase tracking-[0.25em] text-gold-300/90 sm:text-sm">
              चेरीज स्वीट कॉर्नर · Spine Road, Pune
            </p>

            {/* Editorial Heading */}
            <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-[#FFF8ED] sm:text-6xl lg:text-[4.25rem]">
              The sweeter side
              <span className="mt-1 block font-normal italic text-gold-300">of every celebration.</span>
            </h1>

            {/* Atmospheric copy */}
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-stone-200/90 sm:text-lg lg:mx-0">
              Authentic Indian confectionery prepared fresh twice daily in pure cow ghee and fresh milk khoya. Honoring traditional kadai recipes on Spine Road for every festival, wedding, and family milestone.
            </p>

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <button
                onClick={onExploreClick}
                className="group relative inline-flex min-h-[52px] items-center gap-2.5 rounded-xl bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 px-7 py-3.5 text-sm font-bold text-[#2A140E] shadow-luxury transition-all duration-300 hover:scale-[1.02] hover:shadow-gold-glow active:scale-[0.98]"
              >
                <span>Explore Mithai Collection</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenHamper}
                className="group inline-flex min-h-[52px] items-center gap-2.5 rounded-xl border border-gold-300/40 bg-white/[0.07] px-6 py-3.5 text-sm font-semibold text-[#FFF8ED] backdrop-blur-md transition-all duration-300 hover:bg-white/[0.14] hover:border-gold-300/70 active:scale-[0.98]"
              >
                <Award className="h-4 w-4 text-gold-300 transition-transform duration-300 group-hover:rotate-12" />
                <span>Curate Gift Hamper</span>
              </button>
            </div>

            {/* Proof and Trust Metrics */}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-xs font-medium text-stone-300 lg:justify-start sm:text-sm">
              <span className="inline-flex items-center gap-1.5 text-emerald-300">
                <CheckCircle2 className="h-4 w-4" />
                <span>100% Pure Desi Ghee</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-gold-200">
                <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
                <span className="font-bold text-white">{RATING_METRICS.average}★</span>
                <span className="text-stone-300">({RATING_METRICS.totalReviews.toLocaleString()}+ Pune Reviews)</span>
              </span>
              <a
                href={`tel:${SHOP_METADATA.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-1.5 text-stone-300 transition-colors hover:text-gold-200"
              >
                <Phone className="h-4 w-4 text-gold-400" />
                <span>{SHOP_METADATA.phone}</span>
              </a>
            </div>
          </div>

          {/* Right Hero Visual Showcase Column */}
          <div className="relative mx-auto w-full max-w-lg lg:col-span-6 lg:max-w-none">
            {/* Visual Frame */}
            <div className="group relative aspect-[4/4.2] overflow-hidden rounded-2xl border border-gold-300/30 bg-[#2E1812] p-2.5 shadow-2xl transition-all duration-500 hover:border-gold-300/60 sm:aspect-[5/4] lg:aspect-[4/3.9]">
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                {/* Bespoke Ultra-HD Generated Visual Asset */}
                <img
                  src="/images/banners/hero_grand_confection_feast.jpg"
                  alt="A majestic royal brass platter loaded with fresh Cherry's Sweet Mart mithai, including Kesar Rasmalai, Desi Ghee Jalebi, and Kaju Katli"
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Vignette & Contrast Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#150A08]/85 via-transparent to-black/10" />

                {/* Bottom Story Plaque */}
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-left text-white sm:bottom-6 sm:left-6 sm:right-6">
                  <div>
                    <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-300 backdrop-blur-md">
                      <Sparkles className="h-3 w-3 text-gold-300" />
                      Artisanal Kadai Craft
                    </div>
                    <h3 className="font-display text-xl font-medium tracking-tight sm:text-2xl text-[#FFF8ED]">
                      Pure Cow Ghee & Real Saffron
                    </h3>
                    <p className="mt-0.5 text-xs text-stone-300">
                      Slow-stirred in traditional heavy-bottom brass vessels
                    </p>
                  </div>

                  {/* Rating Stamp */}
                  <div className="shrink-0 rounded-xl border border-gold-300/40 bg-black/40 p-3 text-center backdrop-blur-md">
                    <div className="font-display text-lg font-bold leading-none text-gold-300">4.8★</div>
                    <div className="mt-1 text-[9px] font-medium tracking-wider text-stone-300 uppercase">Google</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Artisan Pledge Card - Positioned at top-left to avoid colliding with bottom story plaque */}
            <div className="absolute -top-4 -left-3 z-20 hidden rounded-xl border border-gold-300/40 bg-[#FFFDF9] p-3.5 text-left shadow-luxury-hover sm:block sm:-top-5 sm:-left-5">
              <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-primary-800">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-600" />
                <span>The Spine Road Promise</span>
              </div>
              <p className="mt-1 font-display text-xs font-bold leading-snug text-[#2C1810] sm:text-sm">
                Zero Palm Oil · Pure Cow Milk Khoya
              </p>
              <p className="text-[10px] text-stone-500 sm:text-[11px]">Boxed fresh to order in food-grade gold foil</p>
            </div>

            {/* Decorative Corner Accent */}
            <div className="absolute -bottom-3 -right-3 hidden h-16 w-16 rounded-full border border-gold-300/20 bg-gold-400/10 blur-xl sm:block" />
          </div>

        </div>
      </div>
    </section>
  );
};
