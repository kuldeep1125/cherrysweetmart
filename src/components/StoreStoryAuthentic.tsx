// [ADDED] StoreStoryAuthentic with editorial Four Vows of Confectionery Purity, authentic Spine Road lens, and verified credentials
import React, { useState } from 'react';
import { Store, MapPin, CheckCircle, Shield, Award, Star, Sparkles } from 'lucide-react';
import { AUTHENTIC_SHOP_PHOTOS, RATING_METRICS, SHOP_METADATA } from '../data/sweetsData';

export const StoreStoryAuthentic: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const currentPhoto = AUTHENTIC_SHOP_PHOTOS[selectedPhotoIndex];

  const PURITY_VOWS = [
    {
      num: '१',
      title: '100% Shuddha Desi Cow Ghee',
      subtitle: 'शुद्ध देशी गायीचे तूप',
      description: 'Every morning, our heavy brass kadais are filled with pure golden cow ghee for Jalebi, Motichoor Ladoos, and Besan Barfi. Zero palm oil, zero vegetable vanaspati, ever.',
    },
    {
      num: '२',
      title: 'Fresh Morning Chhena & Khoya',
      subtitle: 'ताजे मलई छेना आणि खवा',
      description: 'Our Bengali sweets (Rasmalai, Cham Cham, Rasgulla) are curdled fresh before 6:00 AM daily from full-cream milk, delivering delicate cloud-soft textures.',
    },
    {
      num: '३',
      title: 'Single-Origin Nuts & Certified Silver Vark',
      subtitle: 'निवडक काजू आणि शुद्ध चांदीचा वर्क',
      description: 'Only plump Goan and Mangalorean cashews enter our Kaju Katli paste. Garnished exclusively with certified 99.9% vegetarian silver vark.',
    },
    {
      num: '४',
      title: 'Auspicious Maharashtrian Craft',
      subtitle: 'पारंपरिक महाराष्ट्रीयन सणांची परंपरा',
      description: 'From steaming Ukadiche Modak for Ganpati Bappa to festive Diwali Faral boxes and royal wedding platter hampers, we preserve authentic regional recipes.',
    },
  ];

  return (
    <section id="story" className="relative overflow-hidden bg-white py-20 sm:py-28 transition-colors duration-300 dark:bg-[#150F0C]">
      {/* Ambient background decoration */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-gold-300/40 to-transparent" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-300/70 bg-gold-50/70 px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary-900 shadow-xs dark:border-gold-800/40 dark:bg-gold-950/40 dark:text-gold-300">
            <Store className="h-3.5 w-3.5 text-gold-600 dark:text-gold-400" />
            <span>Spine Road, Chinchwad · Confectionery Heritage</span>
          </div>

          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-5xl dark:text-white">
            Crafted with Tradition, Served with <span className="text-gold-gradient font-normal italic">Pure Purity</span>
          </h2>

          <p className="mt-2 font-display text-base font-semibold italic text-primary-800 dark:text-gold-400 sm:text-lg">
            &ldquo;ग्राहकांच्या विश्वासाची आणि परंपरेची गोड परंपरा&rdquo;
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-stone-600 dark:text-stone-300 sm:text-base">
            Situated right on Spine Road near Sirvi Corner in Chinchwad East, Cherry&apos;s Sweet Mart has grown into a landmark destination renowned for authentic heritage mithai, steaming evening snacks, and bespoke celebration hampers.
          </p>
        </div>

        {/* 2-Column Story Showcase & The Four Purity Vows */}
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          
          {/* Left Column: Authentic Shop Visual Lens */}
          <div className="space-y-5 lg:col-span-6">
            {/* Featured Photo Display */}
            <div className="group relative aspect-[4/3.2] w-full overflow-hidden rounded-3xl border border-gold-300/40 bg-stone-900 shadow-2xl">
              <img
                src={currentPhoto.imageUrl}
                alt={currentPhoto.title}
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140D0B]/90 via-[#140D0B]/30 to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-gold-500 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#2A140E] shadow">
                    {currentPhoto.verifiedSource}
                  </span>
                  <span className="text-xs text-gold-300 font-medium">
                    Store View {selectedPhotoIndex + 1} of {AUTHENTIC_SHOP_PHOTOS.length}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-white">
                  {currentPhoto.title}
                </h3>
                <p className="mt-0.5 font-display text-xs italic text-gold-300">
                  {currentPhoto.marathiTitle}
                </p>
                <p className="mt-1 text-xs text-stone-300 line-clamp-2">
                  {currentPhoto.caption}
                </p>
              </div>
            </div>

            {/* Thumbnail Navigation Row */}
            <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-8">
              {AUTHENTIC_SHOP_PHOTOS.map((photo, idx) => (
                <button
                  key={photo.id}
                  onClick={() => setSelectedPhotoIndex(idx)}
                  className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all ${
                    selectedPhotoIndex === idx
                      ? 'border-gold-500 ring-2 ring-gold-400 scale-105 shadow-md'
                      : 'border-stone-200 opacity-65 hover:opacity-100 dark:border-stone-800'
                  }`}
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Spine Road Address Plaque */}
            <div className="flex items-center gap-3 rounded-2xl border border-gold-200/80 bg-ivory-100/80 p-3.5 text-xs text-stone-700 dark:border-gold-900/40 dark:bg-[#1F1813] dark:text-stone-300">
              <MapPin className="h-4 w-4 shrink-0 text-gold-600 dark:text-gold-400" />
              <span>
                <strong>Spine Road Flagship:</strong> Near Sirvi Corner, Gharkul Chowk, Shivtej Nagar, Chinchwad East, Pune 411019.
              </span>
            </div>
          </div>

          {/* Right Column: The Four Vows of Confectionery Purity */}
          <div className="space-y-4 lg:col-span-6">
            <div className="mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-700 dark:text-gold-400">
                Purity Manifesto
              </span>
              <h3 className="mt-1 font-display text-2xl font-bold text-stone-900 dark:text-white">
                The Four Vows of Cherry&apos;s Craft
              </h3>
            </div>

            <div className="space-y-3.5">
              {PURITY_VOWS.map(vow => (
                <div
                  key={vow.num}
                  className="group rounded-2xl border border-gold-200/70 bg-stone-50/60 p-4 transition-all duration-300 hover:border-gold-400 hover:bg-white hover:shadow-md dark:border-gold-900/30 dark:bg-[#1A1410] dark:hover:border-gold-700 dark:hover:bg-[#201914]"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gold-100 font-display text-sm font-bold text-primary-900 dark:bg-gold-950/60 dark:text-gold-300">
                      {vow.num}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <h4 className="font-display text-sm font-bold text-stone-900 dark:text-white sm:text-base">
                          {vow.title}
                        </h4>
                        <span className="font-display text-xs italic text-primary-800 dark:text-gold-400">
                          {vow.subtitle}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-stone-600 dark:text-stone-300 sm:text-sm">
                        {vow.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* High-Trust Proof Statistics Strip */}
            <div className="grid grid-cols-3 gap-3 pt-3 text-center">
              <div className="rounded-2xl border border-stone-200 bg-white p-3.5 shadow-xs dark:border-stone-800 dark:bg-[#1C1612]">
                <div className="flex items-center justify-center gap-1 font-display text-xl font-bold text-gold-600 sm:text-2xl">
                  <Star className="h-4 w-4 fill-gold-500 text-gold-500" />
                  <span>{RATING_METRICS.average}★</span>
                </div>
                <div className="mt-0.5 text-[11px] font-medium text-stone-500 dark:text-stone-400">
                  {RATING_METRICS.totalReviews.toLocaleString()}+ Pune Reviews
                </div>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-3.5 shadow-xs dark:border-stone-800 dark:bg-[#1C1612]">
                <div className="font-display text-xl font-bold text-stone-900 dark:text-white sm:text-2xl">
                  50+
                </div>
                <div className="mt-0.5 text-[11px] font-medium text-stone-500 dark:text-stone-400">
                  Daily Fresh Sweets
                </div>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-3.5 shadow-xs dark:border-stone-800 dark:bg-[#1C1612]">
                <div className="font-display text-xl font-bold text-emerald-600 dark:text-emerald-400 sm:text-2xl">
                  100%
                </div>
                <div className="mt-0.5 text-[11px] font-medium text-stone-500 dark:text-stone-400">
                  Shuddha Shakahari
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
