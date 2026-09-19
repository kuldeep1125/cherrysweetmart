// [ADDED] StoreStoryAuthentic component with dark mode support, authentic shop gallery & quality pillars
import React, { useState } from 'react';
import { Store, MapPin } from 'lucide-react';
import { AUTHENTIC_SHOP_PHOTOS } from '../data/sweetsData';

export const StoreStoryAuthentic: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const currentPhoto = AUTHENTIC_SHOP_PHOTOS[selectedPhotoIndex];

  return (
    <section id="story" className="py-16 sm:py-24 bg-white dark:bg-[#15110E] border-y border-gold-100 dark:border-gold-900/40 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-50 dark:bg-gold-950/50 border border-gold-200 dark:border-gold-800/40 text-gold-800 dark:text-gold-300 text-xs font-semibold uppercase tracking-wider">
            <Store className="w-3.5 h-3.5" />
            <span>Spine Road, Chinchwad • Our Heritage</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Crafted with Tradition, Served with <span className="text-gold-gradient">Pure Purity</span>
          </h2>
          <p className="font-serif italic text-gold-700 dark:text-gold-400 font-medium text-base sm:text-lg">
            &ldquo;ग्राहकांच्या विश्वासाची आणि परंपरेची गोड परंपरा&rdquo;
          </p>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Situated right on Spine Road near Sirvi Corner in Chinchwad East, Cherry&apos;s Sweet Mart has grown from a humble neighborhood confectionery to a destination renowned for authentic Indian mithai, hot snacks, and bespoke festive hampers.
          </p>
        </div>

        {/* 2-Column Story & Authentic Photos Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Authentic Photos Showcase */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Featured Photo */}
            <div className="relative rounded-3xl overflow-hidden border border-gold-200 dark:border-gold-800/50 shadow-xl h-72 sm:h-96 w-full group bg-slate-900">
              <img
                src={currentPhoto.imageUrl}
                alt={currentPhoto.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-gold-600 text-white text-[11px] font-bold mb-1.5 shadow">
                  {currentPhoto.verifiedSource}
                </span>
                <h3 className="font-display text-lg font-bold">
                  {currentPhoto.title}
                </h3>
                <p className="text-xs text-gold-300 font-serif italic mb-1">
                  {currentPhoto.marathiTitle}
                </p>
                <p className="text-xs text-slate-300 line-clamp-2">
                  {currentPhoto.caption}
                </p>
              </div>
            </div>

            {/* Thumbnail Navigation Row */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {AUTHENTIC_SHOP_PHOTOS.map((photo, idx) => (
                <button
                  key={photo.id}
                  onClick={() => setSelectedPhotoIndex(idx)}
                  className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                    selectedPhotoIndex === idx
                      ? 'border-gold-500 ring-2 ring-gold-400 scale-102'
                      : 'border-slate-200 dark:border-slate-700 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Address Banner Note */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-ivory-100 dark:bg-[#1A1613] p-3 rounded-xl border border-gold-100 dark:border-gold-800/40">
              <MapPin className="w-4 h-4 text-gold-600 dark:text-gold-400 flex-shrink-0" />
              <span>
                <strong>Spine Road Store:</strong> Near Sirvi Corner, Gharkul Chowk, Shivtej Nagar, Chinchwad East, Pune 411019.
              </span>
            </div>
          </div>

          {/* Right: The Four Pillars of Quality */}
          <div className="lg:col-span-6 space-y-4">
            <div className="space-y-3.5">
              
              {/* Pillar 1 */}
              <div className="p-4 rounded-2xl bg-ivory-50 dark:bg-[#1C1713] border border-gold-100 dark:border-gold-800/30 hover:border-gold-300 dark:hover:border-gold-700 transition-colors space-y-1 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gold-100 dark:bg-gold-950/50 text-gold-700 dark:text-gold-300 flex items-center justify-center font-bold text-sm">
                    १
                  </div>
                  <h4 className="font-display text-base font-bold text-slate-900 dark:text-white">
                    100% Shuddha Desi Cow Ghee Preparation
                  </h4>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm pl-10.5">
                  Every batch of Jalebi, Motichoor, Besan Ladoo, and Soan Papdi is simmered in genuine golden cow ghee. We never compromise with vegetable oil or artificial shortenings.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-2xl bg-ivory-50 dark:bg-[#1C1713] border border-gold-100 dark:border-gold-800/30 hover:border-gold-300 dark:hover:border-gold-700 transition-colors space-y-1 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gold-100 dark:bg-gold-950/50 text-gold-700 dark:text-gold-300 flex items-center justify-center font-bold text-sm">
                    २
                  </div>
                  <h4 className="font-display text-base font-bold text-slate-900 dark:text-white">
                    Fresh Full-Cream Chhena & Mawa Every Morning
                  </h4>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm pl-10.5">
                  Our Bengali Rasgullas, Cham Cham, and Kesar Rasmalai are curdled freshly each day from farm-sourced milk, delivering feather-light sponge and melt-in-mouth richness.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-2xl bg-ivory-50 dark:bg-[#1C1713] border border-gold-100 dark:border-gold-800/30 hover:border-gold-300 dark:hover:border-gold-700 transition-colors space-y-1 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gold-100 dark:bg-gold-950/50 text-gold-700 dark:text-gold-300 flex items-center justify-center font-bold text-sm">
                    ३
                  </div>
                  <h4 className="font-display text-base font-bold text-slate-900 dark:text-white">
                    Hand-Sorted Goan Cashews & Grade-A Dry Fruits
                  </h4>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm pl-10.5">
                  Our iconic Kaju Katli and Kaju Pista Rolls are prepared without chemical binders or excessive sugar, coated only with certified 99.9% vegetarian silver vark.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-2xl bg-ivory-50 dark:bg-[#1C1713] border border-gold-100 dark:border-gold-800/30 hover:border-gold-300 dark:hover:border-gold-700 transition-colors space-y-1 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gold-100 dark:bg-gold-950/50 text-gold-700 dark:text-gold-300 flex items-center justify-center font-bold text-sm">
                    ४
                  </div>
                  <h4 className="font-display text-base font-bold text-slate-900 dark:text-white">
                    Auspicious Maharashtrian Festive Catering
                  </h4>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm pl-10.5">
                  From holy Ganpati Bappa Ukadiche Modak to Diwali Faral gift hampers, we specialize in authentic regional Maharashtrian taste for weddings and ceremonies.
                </p>
              </div>

            </div>

            {/* Bottom Stats Banner */}
            <div className="pt-2 grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-white dark:bg-[#1A1613] border border-slate-200 dark:border-slate-800">
                <div className="font-extrabold text-xl sm:text-2xl text-gold-700 dark:text-gold-400">3,500+</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Google Reviews</div>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-[#1A1613] border border-slate-200 dark:border-slate-800">
                <div className="font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white">50+</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Fresh Sweets</div>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-[#1A1613] border border-slate-200 dark:border-slate-800">
                <div className="font-extrabold text-xl sm:text-2xl text-emerald-700 dark:text-emerald-400">100%</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Pure Veg</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
