// [ADDED] Footer component with complete local business info, category links, delivery links & SEO markup
import React from 'react';
import { Phone, MapPin, Clock, Heart, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { SHOP_METADATA, CATEGORIES } from '../data/sweetsData';

export const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden bg-[#241510] text-slate-300 pt-16 pb-12 border-t border-gold-500/30">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_at_top,rgba(183,132,39,.16),transparent_68%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800 text-left">
          
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-lg">
                  🍒
                </div>
              </div>
              <div>
                <span className="font-display text-xl font-bold text-white tracking-tight">
                  Cherry's
                </span>
                <span className="font-serif italic text-gold-400 font-semibold ml-1.5">
                  Sweet Mart
                </span>
                <div className="text-[11px] text-slate-400 font-medium">
                  चेरीज स्वीट कॉर्नर • Spine Road
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Serving the authentic taste of Shuddha Desi Ghee sweets, morning-fresh Bengali chhena, hot Punjabi samosas, and bespoke festival gift boxes to thousands of families across Pimpri-Chinchwad and Pune.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/60">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Pure Vegetarian</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-800/60">
                <span>★ 3.7 (3,500+ Google Reviews)</span>
              </span>
            </div>
          </div>

          {/* Col 2: Sweet Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-gold-300">
              Sweet Categories
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {CATEGORIES.slice(0, 7).map(cat => (
                <li key={cat.id}>
                  <a href="#menu" className="hover:text-gold-400 transition-colors">
                    {cat.name}
                  </a>
                </li>
              ))}
              <li>
                <a href="#menu" className="text-gold-400 font-semibold hover:underline">
                  + View All 50+ Varieties →
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links & Order Platforms (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-gold-300">
              Order Online
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={SHOP_METADATA.swiggyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-orange-400 hover:text-orange-300 font-medium"
                >
                  <span>Swiggy Delivery</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href={SHOP_METADATA.zomatoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-red-400 hover:text-red-300 font-medium"
                >
                  <span>Zomato Delivery</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${SHOP_METADATA.whatsappOrderNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  <span>WhatsApp Inquiry</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#reviews" className="text-slate-400 hover:text-white">
                  Customer Reviews
                </a>
              </li>
              <li>
                <a href="#story" className="text-slate-400 hover:text-white">
                  Our Heritage
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Store Contact & Timings (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-gold-300">
              Visit Store
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">{SHOP_METADATA.address.line1}, {SHOP_METADATA.address.line2}</p>
                  <p>{SHOP_METADATA.address.city} - {SHOP_METADATA.address.pincode}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">8:00 AM – 10:30 PM</p>
                  <p className="text-[11px]">Open All 7 Days of the Week</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <a
                  href={`tel:${SHOP_METADATA.phone.replace(/\s+/g, '')}`}
                  className="text-white hover:text-gold-400 font-bold"
                >
                  {SHOP_METADATA.phone}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Local SEO Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} Cherry&apos;s Sweet Mart (चेरीज स्वीट कॉर्नर). All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span>Spine Road • Nigdi • Chinchwad • Pune</span>
            <span>•</span>
            <a href="#menu" className="hover:text-gold-400">Sweets Catalog</a>
            <span>•</span>
            <a href="#location" className="hover:text-gold-400">Store Directions</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
