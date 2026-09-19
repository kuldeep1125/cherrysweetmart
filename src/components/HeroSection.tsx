import React from 'react';
import { ArrowRight, Award, CheckCircle2, Phone, Sparkles, Star } from 'lucide-react';
import { SHOP_METADATA } from '../data/sweetsData';

interface HeroSectionProps {
  onExploreClick: () => void;
  onOpenHamper: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onOpenHamper }) => {
  return (
    <section className="paper-grain relative isolate overflow-hidden bg-[#2b1915] pt-7 pb-12 sm:pt-10 sm:pb-16 lg:py-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_76%_26%,rgba(196,145,58,.31),transparent_23rem),radial-gradient(circle_at_11%_82%,rgba(131,59,38,.46),transparent_28rem)]" />
      <div className="absolute top-0 right-[12%] h-px w-[35rem] max-w-full bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
        <div className="relative z-10 text-center lg:col-span-6 lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 border border-gold-300/35 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-gold-200 backdrop-blur-sm sm:text-[11px]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
            </span>
            Fresh batches in the counter today
          </div>

          <p className="mb-4 font-sans text-[11px] font-bold uppercase tracking-[.2em] text-gold-300 sm:text-xs">Cherry&apos;s Sweet Mart · Spine Road, Pune</p>
          <h1 className="font-serif text-[2.65rem] font-semibold leading-[.97] tracking-[-.045em] text-[#fffaf1] sm:text-6xl lg:text-[4.55rem]">
            The sweeter side
            <span className="block italic font-medium text-gold-300">of every celebration.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-stone-200/85 sm:text-base lg:mx-0">
            Heritage mithai, prepared daily with pure cow ghee, fresh chhena, and the kind of care your family can taste.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <button
              onClick={onExploreClick}
              className="button-press inline-flex min-h-12 items-center gap-2 bg-[#fffaf1] px-5 py-3 text-xs font-extrabold text-[#382018] shadow-[0_12px_28px_rgba(0,0,0,.2)] hover:bg-gold-200 sm:px-6 sm:text-sm"
            >
              Explore today&apos;s mithai
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={onOpenHamper}
              className="button-press inline-flex min-h-12 items-center gap-2 border border-gold-300/50 bg-white/5 px-5 py-3 text-xs font-bold text-[#fffaf1] backdrop-blur-sm hover:bg-white/10 sm:px-6 sm:text-sm"
            >
              <Award className="h-4 w-4 text-gold-300" />
              Build a gift box
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-medium text-stone-300 lg:justify-start sm:text-xs">
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />100% vegetarian</span>
            <span className="inline-flex items-center gap-1.5"><Star className="h-3.5 w-3.5 fill-gold-300 text-gold-300" />3,500+ local reviews</span>
            <a href={`tel:${SHOP_METADATA.phone.replace(/\s+/g, '')}`} className="inline-flex items-center gap-1.5 underline decoration-gold-500/70 underline-offset-4 hover:text-gold-200"><Phone className="h-3.5 w-3.5" />{SHOP_METADATA.phone}</a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:col-span-6 lg:max-w-none">
          <div className="relative aspect-[4/4.6] overflow-hidden border border-gold-300/30 bg-[#3e241c] p-2 shadow-[0_28px_70px_rgba(0,0,0,.28)] sm:aspect-[5/4] lg:aspect-[4/4.35]">
            <img
              src="/images/banners/shahi_platter_spoon_wooden_table.jpg"
              alt="An elegant platter of handcrafted Indian sweets at Cherry's Sweet Mart"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-2 bg-gradient-to-t from-[#1d100d]/75 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-3 text-left text-white sm:bottom-8 sm:left-8 sm:right-8">
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[.16em] text-gold-200">Made for the moment</p>
                <p className="font-serif text-xl italic leading-tight sm:text-2xl">A table full of stories.</p>
              </div>
              <div className="hidden border border-white/25 bg-black/20 p-2.5 backdrop-blur-md sm:block">
                <Sparkles className="h-4 w-4 text-gold-200" />
              </div>
            </div>
          </div>
          <div className="absolute -bottom-3 -left-2 hidden w-40 border border-gold-300/30 bg-[#fffaf1] p-3 text-left shadow-xl sm:block lg:-left-6">
            <p className="text-[9px] font-bold uppercase tracking-[.14em] text-gold-700">Today&apos;s promise</p>
            <p className="mt-1 font-serif text-sm font-semibold leading-tight text-[#362019]">Freshly crafted. Carefully packed.</p>
          </div>
          <img src="/images/cutouts/kaju_katli_silver_saucer.png" alt="" className="pointer-events-none absolute -right-6 -top-10 hidden h-28 w-28 object-contain drop-shadow-2xl lg:block" />
        </div>
      </div>
    </section>
  );
};
