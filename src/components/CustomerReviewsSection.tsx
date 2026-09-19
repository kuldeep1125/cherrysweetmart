// [ADDED] CustomerReviewsSection component with dark mode support and verified testimonials
import React, { useState } from 'react';
import { CheckCircle2, MessageSquare, ExternalLink } from 'lucide-react';
import { VERIFIED_REVIEWS } from '../data/sweetsData';

export const CustomerReviewsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredReviews = VERIFIED_REVIEWS.filter(rev => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'jalebi') return rev.favoriteItems.some(i => i.toLowerCase().includes('jalebi'));
    if (selectedFilter === 'modak') return rev.favoriteItems.some(i => i.toLowerCase().includes('modak'));
    if (selectedFilter === 'bengali') return rev.favoriteItems.some(i => i.toLowerCase().includes('cham') || i.toLowerCase().includes('rasgulla'));
    if (selectedFilter === 'sugar-free') return rev.favoriteItems.some(i => i.toLowerCase().includes('sugar') || i.toLowerCase().includes('anjeer'));
    return true;
  });

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-gradient-to-b from-white via-ivory-50 to-white dark:from-[#12100E] dark:via-[#171310] dark:to-[#12100E] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 dark:bg-gold-950/50 text-gold-900 dark:text-gold-300 text-xs font-bold uppercase tracking-wider border border-gold-200 dark:border-gold-800/40">
            <MessageSquare className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" />
            <span>Customer Voice & Reviews</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Loved by Over <span className="text-gold-gradient">3,500+ Sweet Lovers</span>
          </h2>
          <p className="font-serif italic text-gold-700 dark:text-gold-400 text-base sm:text-lg">
            ग्राहकांच्या प्रेम आणि विश्वासाची साक्ष
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
            Read real feedback from patrons on Google Reviews, Justdial, and Swiggy who make Cherry&apos;s Sweet Mart their first choice for celebrations.
          </p>
        </div>

        {/* Overall Rating Banner Box */}
        <div className="bg-white dark:bg-[#1A1613] rounded-3xl border border-gold-200 dark:border-gold-800/40 p-6 sm:p-8 shadow-lg mb-10 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left: Star Score */}
            <div className="md:col-span-4 text-center md:text-left space-y-2 md:border-r md:border-slate-100 dark:md:border-slate-800 md:pr-8">
              <div className="flex items-baseline justify-center md:justify-start gap-2">
                <span className="text-5xl font-black text-slate-900 dark:text-white">3.7</span>
                <span className="text-lg text-slate-400 font-bold">/ 5.0</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400 text-lg">
                <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-slate-300 dark:text-slate-600">★</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                Based on <strong>3,505+ verified Google reviews</strong> and Justdial ratings for Cherry&apos;s Sweet Corner on Spine Road.
              </p>
              <a
                href="https://www.google.com/search?q=cherry+sweets+corner+spine#lrd=0x3bc2b84e62243d67:0xb51bc11b93f6aa4d,1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-700 dark:text-gold-400 hover:text-gold-900 dark:hover:text-gold-300 transition-colors pt-1"
              >
                <span>View Google Business Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Right: Key Rating Highlights */}
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-3.5 rounded-2xl bg-ivory-50 dark:bg-[#221D18] border border-gold-100 dark:border-gold-800/30">
                <div className="text-xl font-black text-gold-700 dark:text-gold-400">98%</div>
                <div className="text-xs font-bold text-slate-800 dark:text-white mt-0.5">Taste & Freshness</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Pure Ghee aroma</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-ivory-50 dark:bg-[#221D18] border border-gold-100 dark:border-gold-800/30">
                <div className="text-xl font-black text-gold-700 dark:text-gold-400">4.8★</div>
                <div className="text-xs font-bold text-slate-800 dark:text-white mt-0.5">Hot Samosa & Jalebi</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Live morning/evening</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-ivory-50 dark:bg-[#221D18] border border-gold-100 dark:border-gold-800/30">
                <div className="text-xl font-black text-gold-700 dark:text-gold-400">100%</div>
                <div className="text-xs font-bold text-slate-800 dark:text-white mt-0.5">Shuddha Veg</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Pure milk & nuts</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-ivory-50 dark:bg-[#221D18] border border-gold-100 dark:border-gold-800/30">
                <div className="text-xl font-black text-gold-700 dark:text-gold-400">Fast</div>
                <div className="text-xs font-bold text-slate-800 dark:text-white mt-0.5">Festive Packaging</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Wedding & bulk orders</div>
              </div>
            </div>

          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedFilter === 'all'
                ? 'bg-slate-900 dark:bg-gold-600 text-white'
                : 'bg-slate-100 dark:bg-[#1E1914] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#26201A]'
            }`}
          >
            All Reviews
          </button>
          <button
            onClick={() => setSelectedFilter('jalebi')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedFilter === 'jalebi'
                ? 'bg-gold-600 text-white'
                : 'bg-gold-50 dark:bg-gold-950/40 text-gold-800 dark:text-gold-300 hover:bg-gold-100 dark:hover:bg-gold-900/40 border border-gold-200 dark:border-gold-800/40'
            }`}
          >
            Jalebi & Samosa
          </button>
          <button
            onClick={() => setSelectedFilter('modak')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedFilter === 'modak'
                ? 'bg-gold-600 text-white'
                : 'bg-gold-50 dark:bg-gold-950/40 text-gold-800 dark:text-gold-300 hover:bg-gold-100 dark:hover:bg-gold-900/40 border border-gold-200 dark:border-gold-800/40'
            }`}
          >
            Ganpati Modak & Prasad
          </button>
          <button
            onClick={() => setSelectedFilter('bengali')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedFilter === 'bengali'
                ? 'bg-gold-600 text-white'
                : 'bg-gold-50 dark:bg-gold-950/40 text-gold-800 dark:text-gold-300 hover:bg-gold-100 dark:hover:bg-gold-900/40 border border-gold-200 dark:border-gold-800/40'
            }`}
          >
            Bengali Sweets
          </button>
          <button
            onClick={() => setSelectedFilter('sugar-free')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedFilter === 'sugar-free'
                ? 'bg-emerald-700 text-white'
                : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800/40'
            }`}
          >
            Sugar-Free Diet
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {filteredReviews.map(rev => (
            <div
              key={rev.id}
              className="bg-white dark:bg-[#1C1713] rounded-3xl p-6 border border-gold-200/80 dark:border-gold-800/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Review Header: Stars & Source */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 text-sm">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold">
                    {rev.source}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-slate-700 dark:text-slate-200 text-xs sm:text-sm leading-relaxed">
                  &ldquo;{rev.reviewText}&rdquo;
                </p>

                {/* Marathi Quote if exists */}
                {rev.marathiSnippet && (
                  <p className="text-xs font-serif italic text-gold-700 dark:text-gold-400 bg-gold-50/70 dark:bg-[#251F19] p-2 rounded-xl border border-gold-100 dark:border-gold-800/40 font-semibold">
                    {rev.marathiSnippet}
                  </p>
                )}
              </div>

              {/* Bottom: Author & Ordered Items */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-xs">{rev.author}</div>
                    <div className="text-[10px] text-slate-400">{rev.date}</div>
                  </div>
                  {rev.verifiedOrder && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1">
                  {rev.favoriteItems.map(item => (
                    <span
                      key={item}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
