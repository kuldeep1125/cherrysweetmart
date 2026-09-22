// [ADDED] CustomerReviewsSection with synchronized 4.8★ Google score, star distribution breakdown, and verified testimonials
import React, { useState } from 'react';
import { CheckCircle2, MessageSquare, ExternalLink, Star, ThumbsUp } from 'lucide-react';
import { VERIFIED_REVIEWS, RATING_METRICS, SHOP_METADATA } from '../data/sweetsData';

export const CustomerReviewsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredReviews = VERIFIED_REVIEWS.filter(rev => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'jalebi') return rev.favoriteItems.some(i => i.toLowerCase().includes('jalebi'));
    if (selectedFilter === 'modak') return rev.favoriteItems.some(i => i.toLowerCase().includes('modak'));
    if (selectedFilter === 'bengali') return rev.favoriteItems.some(i => i.toLowerCase().includes('cham') || i.toLowerCase().includes('rasgulla') || i.toLowerCase().includes('rasmalai'));
    if (selectedFilter === 'sugar-free') return rev.favoriteItems.some(i => i.toLowerCase().includes('sugar') || i.toLowerCase().includes('anjeer'));
    return true;
  });

  return (
    <section id="reviews" className="relative overflow-hidden bg-gradient-to-b from-white via-ivory-100 to-white py-20 sm:py-28 transition-colors duration-300 dark:from-[#140F0C] dark:via-[#19130F] dark:to-[#140F0C]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          {/* [FIXED] Standardized section badge with guaranteed dark mode contrast */}
          <div className="section-badge">
            <MessageSquare className="h-3.5 w-3.5 text-gold-600 dark:text-gold-400" />
            <span>Customer Voice & Verified Ratings</span>
          </div>

          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-5xl dark:text-white">
            Loved by Over <span className="text-gold-gradient font-normal italic">3,500+ Sweet Lovers</span>
          </h2>

          <p className="mt-2 font-display text-base font-semibold italic text-primary-800 dark:text-gold-400 sm:text-lg">
            ग्राहकांच्या प्रेम आणि विश्वासाची साक्ष
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-stone-600 dark:text-stone-300 sm:text-base">
            Honest feedback from patrons across Spine Road, Moshi, Nigdi, and Chinchwad who make Cherry&apos;s Sweet Mart their trusted confectionery choice.
          </p>
        </div>

        {/* Overall Rating & Google Star Distribution Dashboard */}
        <div className="mb-12 rounded-3xl border border-gold-200/80 bg-white p-6 shadow-xl transition-all sm:p-9 dark:border-gold-900/40 dark:bg-[#1C1612]">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            
            {/* Left Column: Star Score & Total Count */}
            <div className="space-y-3 text-center lg:col-span-4 lg:border-r lg:border-stone-200/80 lg:pr-8 lg:text-left dark:lg:border-stone-800">
              <div className="flex items-baseline justify-center gap-2 lg:justify-start">
                <span className="font-display text-5xl font-black text-stone-900 sm:text-6xl dark:text-white">
                  {RATING_METRICS.average}
                </span>
                <span className="font-display text-xl font-bold text-stone-400">/ 5.0</span>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-gold-500 lg:justify-start">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-5 w-5 fill-gold-400 text-gold-400" />
                ))}
              </div>

              <p className="text-xs font-medium text-stone-600 dark:text-stone-300 sm:text-sm">
                Based on <strong>{RATING_METRICS.totalReviews.toLocaleString()}+ verified reviews</strong> on Google Business and local dining guides for Spine Road.
              </p>

              {/* [FIXED] Issue 30: Prominently elevated live Google proof link */}
              <div className="pt-2">
                <a
                  href={SHOP_METADATA.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-gold-300/80 bg-gold-50/90 px-3.5 py-2 text-xs font-bold text-stone-900 shadow-xs transition-all hover:border-gold-400 hover:bg-gold-100 dark:border-gold-500/60 dark:bg-[#251A10] dark:text-gold-200 dark:hover:bg-[#342418]"
                >
                  <span>View Live Google Profile</span>
                  <ExternalLink className="h-3.5 w-3.5 text-gold-700 dark:text-gold-400" />
                </a>
              </div>
            </div>

            {/* Right Column: Google Star Distribution Progress Bars */}
            <div className="space-y-2 lg:col-span-8">
              <div className="mb-3 text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                Google Review Breakdown
              </div>

              {[
                { stars: 5, pct: RATING_METRICS.starDistribution[5] },
                { stars: 4, pct: RATING_METRICS.starDistribution[4] },
                { stars: 3, pct: RATING_METRICS.starDistribution[3] },
                { stars: 2, pct: RATING_METRICS.starDistribution[2] },
                { stars: 1, pct: RATING_METRICS.starDistribution[1] },
              ].map(item => (
                <div key={item.stars} className="flex items-center gap-3 text-xs">
                  <div className="flex w-14 items-center gap-1 font-bold text-stone-700 dark:text-stone-300">
                    <span>{item.stars}</span>
                    <Star className="h-3 w-3 fill-gold-400 text-gold-400" />
                  </div>

                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-stone-100 dark:bg-stone-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-gold-500 to-amber-500 transition-all duration-700"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>

                  <span className="w-10 text-right font-medium text-stone-500 dark:text-stone-400">
                    {item.pct}%
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* [FIXED] Issue 22: Standardized tab pills */}
        <div className="mb-9 flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'All Reviews' },
            { id: 'jalebi', label: 'Crisp Jalebi & Samosa' },
            { id: 'modak', label: 'Ganpati Bappa Modak' },
            { id: 'bengali', label: 'Bengali Chhena & Rasmalai' },
            { id: 'sugar-free', label: 'Sugar-Free Confections' },
          ].map(f => {
            const isSelected = selectedFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-[#2A140E] shadow-sm ring-1 ring-gold-400/40'
                    : 'border border-stone-200 bg-white text-stone-600 hover:border-gold-300 hover:bg-gold-50/60 dark:border-stone-800 dark:bg-[#1E1813] dark:text-stone-300'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* [FIXED] Issue 16: Reviews Cards Grid with uniform card heights */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 text-left">
          {filteredReviews.map(rev => (
            <div
              key={rev.id}
              className="flex h-full flex-col justify-between rounded-3xl border border-gold-200/70 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/80 hover:shadow-lg dark:border-gold-900/30 dark:bg-[#1C1612]"
            >
              <div className="flex-1 space-y-3.5">
                {/* Header: Rating & Source */}
                <div className="flex items-center justify-between">
                  <div className="flex text-gold-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-bold text-stone-600 dark:bg-stone-800 dark:text-stone-300">
                    {rev.source}
                  </span>
                </div>

                {/* Review Text */}
                <p className="min-h-[4.25rem] text-xs leading-relaxed text-stone-700 sm:text-sm dark:text-stone-200">
                  &ldquo;{rev.reviewText}&rdquo;
                </p>

                {/* [FIXED] Issue 17: Clean typographic Marathi quote without dark box fill */}
                {rev.marathiSnippet ? (
                  <p className="min-h-[2.5rem] border-l-2 border-gold-400/60 pl-3 font-display text-xs italic font-medium text-stone-600 dark:text-gold-300/90">
                    &ldquo;{rev.marathiSnippet}&rdquo;
                  </p>
                ) : (
                  <div className="min-h-[2.5rem]" aria-hidden="true" />
                )}
              </div>

              {/* Author & Favorite Sweets */}
              <div className="mt-5 border-t border-stone-100 pt-3.5 dark:border-stone-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    {/* [FIXED] Issue 12: Heading level sequence restored (H2 -> H3) with no skipped levels */}
                    <h3 className="font-display text-xs font-bold text-stone-900 dark:text-white">
                      {rev.author}
                    </h3>
                    <p className="text-xs text-stone-400">{rev.date}</p>
                  </div>
                  {rev.verifiedOrder && (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Verified Patron</span>
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1">
                  {rev.favoriteItems.map(item => (
                    <span
                      key={item}
                      className="rounded-lg bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-300"
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
