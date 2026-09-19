// [ADDED] LocationHoursVisit component with dark mode support, Google map embed & contact intelligence
import React from 'react';
import { MapPin, Clock, Phone, Navigation, CheckCircle2, Car } from 'lucide-react';
import { SHOP_METADATA } from '../data/sweetsData';

export const LocationHoursVisit: React.FC = () => {
  return (
    <section id="location" className="py-16 sm:py-24 bg-white dark:bg-[#15110E] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-50 dark:bg-gold-950/50 border border-gold-200 dark:border-gold-800/40 text-gold-800 dark:text-gold-300 text-xs font-semibold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Store Location & Visit Guide</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Visit Our Shop on <span className="text-gold-gradient">Spine Road</span>
          </h2>
          <p className="font-serif italic text-gold-700 dark:text-gold-400 text-base sm:text-lg">
            चिंचवड स्पाइन रोडवर आपल्या सेवेत तत्पर
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
            Easily accessible from Nigdi, Bhosari, Akurdi, and Chinchwad. Ample curbside parking and express takeaway service available.
          </p>
        </div>

        {/* 2-Column Info & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Address Card */}
            {/* [ADDED]: Luxury card hover lift and glow */}
            <div className="p-5 sm:p-6 rounded-3xl bg-ivory-50 dark:bg-[#1C1713] border border-gold-200 dark:border-gold-800/40 shadow-sm hover:shadow-xl hover:shadow-gold-500/10 hover:-translate-y-1 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gold-600 text-white flex items-center justify-center flex-shrink-0 shadow">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                    Physical Store Address
                  </h3>
                  <p className="text-xs text-gold-700 dark:text-gold-400 font-serif italic">
                    चेरीज स्वीट कॉर्नर, स्पाइन रोड
                  </p>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 pl-13 space-y-1">
                <p className="font-medium text-slate-900 dark:text-white">{SHOP_METADATA.address.line1}</p>
                <p>{SHOP_METADATA.address.line2}</p>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {SHOP_METADATA.address.city}, {SHOP_METADATA.address.state} - {SHOP_METADATA.address.pincode}
                </p>
                <div className="pt-2 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-gold-100 dark:bg-gold-900/40 text-gold-800 dark:text-gold-300 text-[11px] font-bold">
                    Landmark: Near Sirvi Corner / Gharkul Chowk
                  </span>
                </div>
              </div>

              <div className="pt-2 pl-13">
                <a
                  href={SHOP_METADATA.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 dark:bg-gold-600 hover:bg-gold-700 dark:hover:bg-gold-700 text-white text-xs font-bold hover:scale-103 active:scale-97 transition-all shadow-sm cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Google Maps Directions</span>
                </a>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-ivory-50 dark:bg-[#1C1713] border border-gold-200 dark:border-gold-800/40 shadow-sm hover:shadow-xl hover:shadow-gold-500/10 hover:-translate-y-1 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                    Daily Timings & Schedule
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>Open Today · Closes 10:30 PM</span>
                  </div>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 pl-13 space-y-1.5">
                <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-800">
                  <span className="font-medium text-slate-800 dark:text-slate-200">Monday – Sunday</span>
                  <span className="font-bold text-slate-900 dark:text-white">8:00 AM – 10:30 PM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                  <span>Fresh Morning Jalebi & Fafda</span>
                  <span>From 8:30 AM</span>
                </div>
                <div className="flex justify-between py-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <span>Hot Evening Punjabi Samosa</span>
                  <span>4:00 PM – 9:00 PM</span>
                </div>
              </div>
            </div>

            {/* Direct Phone & Ordering Card */}
            <div className="p-5 rounded-3xl bg-gradient-to-r from-gold-600 to-gold-700 text-white shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-5 h-5 text-gold-200" />
                  <span className="font-display font-bold text-sm">Direct Store Call & WhatsApp</span>
                </div>
                <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded-full font-semibold">
                  Instant Support
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                <a
                  href={`tel:${SHOP_METADATA.phone.replace(/\s+/g, '')}`}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white text-slate-900 hover:bg-ivory-100 text-xs font-extrabold text-center shadow"
                >
                  Call: {SHOP_METADATA.phone}
                </a>
                <a
                  href={`https://wa.me/${SHOP_METADATA.whatsappOrderNumber}?text=${encodeURIComponent("Hello Cherry's Sweet Mart, I would like to inquire about sweets availability.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold text-center shadow"
                >
                  WhatsApp Inquiry
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Google Map Embed & Parking Info */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {/* Map Frame */}
            <div className="relative flex-1 min-h-[360px] rounded-3xl overflow-hidden border border-gold-300 dark:border-gold-800/60 shadow-xl bg-slate-100 dark:bg-slate-900">
              <iframe
                title="Cherry's Sweet Mart Spine Road Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.609462215867!2d73.80441807519448!3d18.664608065611417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b84e62243d67%3A0xb51bc11b93f6aa4d!2sCherry&#39;s%20Sweet%20Corner!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Float Map Overlay Card */}
              <div className="absolute top-4 left-4 bg-white/95 dark:bg-[#1A1613]/95 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-gold-200 dark:border-gold-800/50 max-w-xs text-left hidden sm:block">
                <div className="font-display text-xs font-bold text-slate-900 dark:text-white">
                  Cherry&apos;s Sweet Mart (Corner)
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Spine Road, Chinchwad East
                </div>
                <div className="flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 font-bold mt-1">
                  <span>★ 3.7</span>
                  <span className="text-slate-400">(3,505 Google Reviews)</span>
                </div>
              </div>
            </div>

            {/* Parking & Curbside Note */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1A1613] border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-gold-600 dark:text-gold-400 flex-shrink-0" />
                <span>
                  <strong>Convenient Parking:</strong> Ample roadside two-wheeler and four-wheeler parking right in front of the store.
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Curbside Pickup</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
