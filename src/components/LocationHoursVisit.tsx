// [ADDED] LocationHoursVisit with dynamic live store hours status, FAQ Accordion using FAQ_ITEMS, and curbside navigation
import React, { useState, useMemo } from 'react';
import { MapPin, Clock, Phone, Navigation, CheckCircle2, Car, ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { SHOP_METADATA, RATING_METRICS, FAQ_ITEMS } from '../data/sweetsData';

export const LocationHoursVisit: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0].id);

  // Live store open/closed calculator
  const storeStatus = useMemo(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;
    const openTime = 8 * 60; // 8:00 AM
    const closeTime = 22 * 60 + 30; // 10:30 PM

    if (currentTime >= openTime && currentTime < closeTime) {
      return {
        isOpen: true,
        text: 'Open Now · Welcoming Patrons until 10:30 PM',
        badgeColor: 'bg-emerald-500',
        textColor: 'text-emerald-700 dark:text-emerald-400',
      };
    } else {
      return {
        isOpen: false,
        text: 'Closed for the Night · Reopens 8:00 AM Tomorrow',
        badgeColor: 'bg-amber-500',
        textColor: 'text-amber-700 dark:text-amber-400',
      };
    }
  }, []);

  const toggleFaq = (id: string) => {
    setOpenFaqId(prev => (prev === id ? null : id));
  };

  return (
    <section id="location" className="relative overflow-hidden bg-white py-20 sm:py-28 transition-colors duration-300 dark:bg-[#150F0C]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-300/70 bg-gold-50/70 px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary-900 shadow-xs dark:border-gold-800/40 dark:bg-gold-950/40 dark:text-gold-300">
            <MapPin className="h-3.5 w-3.5 text-gold-600 dark:text-gold-400" />
            <span>Store Flagship & Visit Guide</span>
          </div>

          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-5xl dark:text-white">
            Visit Our Flagship on <span className="text-gold-gradient font-normal italic">Spine Road</span>
          </h2>

          <p className="mt-2 font-display text-base font-semibold italic text-primary-800 dark:text-gold-400 sm:text-lg">
            चिंचवड स्पाइन रोडवर आपल्या सेवेत तत्पर
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-stone-600 dark:text-stone-300 sm:text-base">
            Easily accessible from Nigdi, Bhosari, Akurdi, Moshi, and Chinchwad East. Dedicated curbside parking and express gift-box packaging counters.
          </p>
        </div>

        {/* 2-Column Info & Map Grid */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          
          {/* Left Column: Contact & Schedule Dossier */}
          {/* [FIXED] Issue 17: h-full flex flex-col justify-between to align vertical finish with right column */}
          <div className="flex h-full flex-col justify-between space-y-4 lg:col-span-5">
            
            {/* Physical Address Card */}
            <div className="rounded-3xl border border-gold-200/80 bg-stone-50/60 p-6 shadow-sm transition-all duration-300 hover:border-gold-400 hover:bg-white hover:shadow-lg dark:border-gold-900/40 dark:bg-[#1C1612] dark:hover:bg-[#221B16] text-left">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-500 text-[#2A140E] shadow">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-stone-900 dark:text-white">
                    Physical Store Address
                  </h3>
                  <p className="font-display text-xs italic text-primary-800 dark:text-gold-400">
                    चेरीज स्वीट कॉर्नर, स्पाइन रोड
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-1 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                <p className="font-bold text-stone-900 dark:text-white">{SHOP_METADATA.address.line1}</p>
                <p>{SHOP_METADATA.address.line2}</p>
                <p className="font-semibold text-stone-900 dark:text-white">
                  {SHOP_METADATA.address.city}, {SHOP_METADATA.address.state} - {SHOP_METADATA.address.pincode}
                </p>
                {/* [FIXED] Issue 20: Typographic label replacing button-like box to prevent false affordance */}
                <div className="pt-2 flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-300">
                  <span className="font-bold text-gold-700 dark:text-gold-400">Landmark:</span>
                  <span>Near Sirvi Corner / Gharkul Chowk</span>
                </div>
              </div>

              <div className="mt-5">
                <a
                  href={SHOP_METADATA.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#2F1710] to-[#45241A] px-5 py-2.5 text-xs font-bold text-[#FFF8ED] shadow-sm transition-all hover:brightness-110 active:scale-95 dark:from-[#3D1E15] dark:to-[#2A140E]"
                >
                  <Navigation className="h-3.5 w-3.5 text-gold-300" />
                  <span>Get Driving Directions</span>
                </a>
              </div>
            </div>

            {/* Daily Hours & Live Schedule Card */}
            <div className="rounded-3xl border border-gold-200/80 bg-stone-50/60 p-6 shadow-sm transition-all duration-300 hover:border-gold-400 hover:bg-white hover:shadow-lg dark:border-gold-900/40 dark:bg-[#1C1612] dark:hover:bg-[#221B16] text-left">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-stone-900 dark:text-white">
                    Daily Timings &amp; Schedule
                  </h3>
                  <div className={`mt-0.5 flex items-center gap-1.5 text-xs font-bold ${storeStatus.textColor}`}>
                    <span className={`h-2 w-2 rounded-full ${storeStatus.badgeColor} animate-ping`} />
                    <span>{storeStatus.text}</span>
                  </div>
                </div>
              </div>

              {/* [FIXED] Issue 18: Dot leaders bridging the gap between food item labels and times */}
              <div className="mt-4 space-y-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                <div className="flex items-baseline justify-between border-b border-stone-200/60 pb-1.5 dark:border-stone-800">
                  <span className="font-medium text-stone-800 dark:text-stone-200">Monday – Sunday (7 Days)</span>
                  <span className="mx-2 flex-1 border-b border-dotted border-stone-300 dark:border-stone-700" aria-hidden="true" />
                  <span className="font-bold text-stone-900 dark:text-white">8:00 AM – 10:30 PM</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-stone-200/60 pb-1.5 text-xs text-stone-600 dark:border-stone-800 dark:text-stone-400">
                  <span>Live Desi Ghee Jalebi &amp; Fafda</span>
                  <span className="mx-2 flex-1 border-b border-dotted border-stone-300 dark:border-stone-700" aria-hidden="true" />
                  <span className="font-semibold text-stone-800 dark:text-stone-300">Daily from 8:30 AM</span>
                </div>
                <div className="flex items-baseline justify-between text-xs text-stone-600 dark:text-stone-400">
                  <span>Hot Punjabi Samosa &amp; Kachori</span>
                  <span className="mx-2 flex-1 border-b border-dotted border-stone-300 dark:border-stone-700" aria-hidden="true" />
                  <span className="font-semibold text-stone-800 dark:text-stone-300">4:00 PM – 9:30 PM</span>
                </div>
              </div>
            </div>

            {/* Direct Phone & Ordering Concierge */}
            <div className="rounded-3xl bg-gradient-to-r from-[#28140E] to-[#3C1E16] p-6 text-white shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-gold-300" />
                  <span className="font-display font-bold text-sm">Direct Store Calling Desk</span>
                </div>
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-bold text-gold-200">
                  Daily 8 AM - 10:30 PM
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                <a
                  href={`tel:${SHOP_METADATA.phone.replace(/\s+/g, '')}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-xs font-bold text-stone-900 transition-colors hover:bg-gold-50"
                >
                  <Phone className="h-3.5 w-3.5 text-gold-600" />
                  <span>Call: {SHOP_METADATA.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${SHOP_METADATA.whatsappOrderNumber}?text=${encodeURIComponent("Namaskar Cherry's Sweet Mart, I would like to inquire about sweets availability.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white transition-colors hover:bg-emerald-700"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Embed & Curbside Details */}
          {/* [FIXED] Issue 17: Aligned vertical finish with left column using h-full flex flex-col */}
          <div className="flex h-full flex-col justify-between space-y-4 lg:col-span-7">
            <div className="relative flex-1 min-h-[380px] overflow-hidden rounded-3xl border border-gold-300/50 bg-stone-100 shadow-2xl dark:border-gold-800/60 dark:bg-stone-900">
              <iframe
                title="Cherry's Sweet Mart Spine Road Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.609462215867!2d73.80441807519448!3d18.664608065611417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b84e62243d67%3A0xb51bc11b93f6aa4d!2sCherry&#39;s%20Sweet%20Corner!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Map Floating Verification Badge */}
              <div className="absolute top-4 left-4 hidden rounded-2xl border border-gold-200/80 bg-white/95 p-3.5 text-left shadow-lg backdrop-blur-md dark:border-gold-800/50 dark:bg-[#1C1612]/95 sm:block">
                <h4 className="font-display text-xs font-bold text-stone-900 dark:text-white">
                  Cherry&apos;s Sweet Mart (चेरीज स्वीट कॉर्नर)
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Spine Road, Chinchwad East, Pune
                </p>
                <div className="mt-1 flex items-center gap-1.5 text-xs font-bold text-gold-600 dark:text-gold-400">
                  <span>★ {RATING_METRICS.average}</span>
                  <span className="text-stone-400 font-normal">({RATING_METRICS.totalReviews.toLocaleString()}+ Google Reviews)</span>
                </div>
              </div>
            </div>

            {/* [FIXED] Issue 17 & 19: Elevated Parking block into a first-class card container matching Address & Timings */}
            <div className="rounded-3xl border border-gold-200/80 bg-stone-50/60 p-6 shadow-sm transition-all duration-300 hover:border-gold-400 hover:bg-white hover:shadow-lg dark:border-gold-900/40 dark:bg-[#1C1612] text-left">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-500 text-[#2A140E] shadow">
                    <Car className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-stone-900 dark:text-white">
                      Convenient Roadside Parking
                    </h3>
                    <p className="mt-0.5 text-xs text-stone-600 dark:text-stone-400">
                      Ample two-wheeler &amp; four-wheeler parking right outside our Spine Road showroom.
                    </p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Express Curbside Pickup</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* [ADDED] Confectionery FAQ Accordion */}
        <div className="mt-16 text-left">
          <div className="mb-6 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-gold-600 dark:text-gold-400" />
            <h3 className="font-display text-xl font-bold text-stone-900 sm:text-2xl dark:text-white">
              Frequently Answered Questions
            </h3>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="overflow-hidden rounded-2xl border border-gold-200/70 bg-white transition-all duration-200 dark:border-gold-900/30 dark:bg-[#1C1612]"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-gold-50/40 dark:hover:bg-gold-950/20"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-sm font-bold text-stone-900 dark:text-white sm:text-base">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-gold-600 transition-transform duration-300 dark:text-gold-400 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-stone-100 px-5 pb-5 pt-3 text-xs leading-relaxed text-stone-600 dark:border-stone-800 dark:text-stone-300 sm:text-sm animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
