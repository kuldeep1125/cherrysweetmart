// [ADDED] Luxury Footer with synchronized 4.8★ rating, category navigation, local Spine Road schema, and multi-channel order gateways
import React from 'react';
import { Phone, MapPin, Clock, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { SHOP_METADATA, CATEGORIES, RATING_METRICS } from '../data/sweetsData';

interface FooterProps {
  onOpenHamper?: () => void;
}

// [FIXED] Luxury Footer with generous mobile clearance (pb-32) so sticky bottom action bar and back-to-top button never obscure content
export const Footer: React.FC<FooterProps> = ({ onOpenHamper }) => {
  return (
    <footer className="relative w-full max-w-full overflow-hidden bg-[#1E0F0B] pt-16 pb-32 sm:pb-16 sm:pt-20 text-stone-300 border-t border-gold-500/30">
      {/* Subtle top ambient gold shimmer */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_at_top,rgba(217,160,62,0.18),transparent_65%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 gap-10 border-b border-stone-800/80 pb-14 text-left md:grid-cols-2 lg:grid-cols-12">
          
          {/* Col 1: Brand & Craft Manifesto (4 cols) */}
          <div className="space-y-4.5 lg:col-span-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 via-gold-500 to-amber-600 p-0.5 shadow-md">
                <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#24130F] text-xl">
                  🍒
                </div>
              </div>
              <div>
                <div className="flex items-baseline">
                  <span className="font-display text-2xl font-bold tracking-tight text-white">
                    Cherry&apos;s
                  </span>
                  <span className="ml-1.5 font-display text-xl font-normal italic text-gold-300">
                    Sweet Mart
                  </span>
                </div>
                <div className="font-display text-xs font-semibold text-gold-400/90">
                  चेरीज स्वीट कॉर्नर · Spine Road Flagship
                </div>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-stone-400 sm:text-sm">
              Crafting authentic Shuddha Desi Ghee sweets, morning-fresh Bengali chhena, sizzling evening snacks, and bespoke celebration gift hampers for Pune and PCMC families since inception.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-800/60 bg-emerald-950/60 px-3 py-1 text-[11px] font-medium text-emerald-300">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>100% Pure Vegetarian</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-800/60 bg-gold-950/60 px-3 py-1 text-[11px] font-bold text-gold-300">
                <span>★ {RATING_METRICS.average} ({RATING_METRICS.totalReviews.toLocaleString()}+ Google Reviews)</span>
              </span>
            </div>
          </div>

          {/* Col 2: Sweet Categories (3 cols) */}
          <div className="space-y-3.5 lg:col-span-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-widest text-gold-300">
              Confectionery Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              {CATEGORIES.slice(0, 7).map(cat => (
                <li key={cat.id}>
                  <a
                    href="#menu"
                    className="transition-colors hover:text-gold-300"
                  >
                    {cat.name}
                  </a>
                </li>
              ))}
              <li>
                <a href="#menu" className="font-bold text-gold-400 hover:text-gold-300">
                  + Browse Complete 50+ Varieties →
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation & Services (2 cols) */}
          <div className="space-y-3.5 lg:col-span-2">
            <h4 className="font-display text-xs font-bold uppercase tracking-widest text-gold-300">
              Direct Channels
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={SHOP_METADATA.swiggyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-orange-400 hover:text-orange-300"
                >
                  <span>Swiggy Delivery</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href={SHOP_METADATA.zomatoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-red-400 hover:text-red-300"
                >
                  <span>Zomato Delivery</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${SHOP_METADATA.whatsappOrderNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-emerald-400 hover:text-emerald-300"
                >
                  <span>WhatsApp Inquiry</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              {onOpenHamper && (
                <li>
                  <button
                    onClick={onOpenHamper}
                    className="text-stone-300 hover:text-gold-300 font-medium"
                  >
                    Curate Gift Hamper Box
                  </button>
                </li>
              )}
              <li>
                <a href="#reviews" className="text-stone-400 hover:text-white">
                  Customer Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Store Contact & Timings (3 cols) */}
          <div className="space-y-3.5 lg:col-span-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-widest text-gold-300">
              Flagship Showroom
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-gold-400 mt-0.5" />
                <div>
                  <p className="font-medium text-white">{SHOP_METADATA.address.line1}</p>
                  <p>{SHOP_METADATA.address.line2}</p>
                  <p>{SHOP_METADATA.address.city} - {SHOP_METADATA.address.pincode}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-gold-400 mt-0.5" />
                <div>
                  <p className="font-medium text-white">8:00 AM – 10:30 PM</p>
                  <p className="text-[11px]">Open All 7 Days of the Week</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-gold-400" />
                <a
                  href={`tel:${SHOP_METADATA.phone.replace(/\s+/g, '')}`}
                  className="font-bold text-white transition-colors hover:text-gold-300"
                >
                  {SHOP_METADATA.phone}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Local SEO Notice */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 pb-4 text-xs text-stone-400 md:flex-row text-center md:text-left">
          <div>
            © {new Date().getFullYear()} Cherry&apos;s Sweet Mart (चेरीज स्वीट कॉर्नर). All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[11px] text-stone-400 md:justify-end">
            <span>Spine Road</span>
            <span>•</span>
            <span>Moshi</span>
            <span>•</span>
            <span>Chinchwad</span>
            <span>•</span>
            <span>Pune</span>
            <span>•</span>
            <a href="#menu" className="hover:text-gold-300 transition-colors">Sweets Menu</a>
            <span>•</span>
            <a href="#location" className="hover:text-gold-300 transition-colors">Store Map</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
