// [ADDED] AuthenticShopGallery component with dark mode support and responsive lightbox preview
import React, { useState } from 'react';
import { Camera, Eye, X } from 'lucide-react';
import { AUTHENTIC_SHOP_PHOTOS } from '../data/sweetsData';

export const AuthenticShopGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'store' | 'displays' | 'farsan'>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Combine authentic shop photos with authentic banner photos from the repo
  const galleryItems = [
    ...AUTHENTIC_SHOP_PHOTOS,
    {
      id: 'gallery-live-jalebi',
      title: 'Live Desi Ghee Jalebi Frying Kadai',
      marathiTitle: 'गरम शुद्ध देशी तूप जिलेबी कढई',
      caption: 'Crisp golden swirls fried fresh right before your eyes at our live sweet counter.',
      imageUrl: '/images/banners/live_jalebi_frying_kadai.jpg',
      category: 'farsan' as const,
      verifiedSource: "Cherry's Kitchen Live Counter"
    },
    {
      id: 'gallery-mithai-counter',
      title: 'Grand Mithai Showcase Trays',
      marathiTitle: 'भव्य मिठाई काऊंटर प्रदर्शन',
      caption: 'Dozens of traditional milk barfis, dry fruit diamond katlis, and saffron pedas.',
      imageUrl: '/images/banners/grand_mithai_counter_display.jpg',
      category: 'displays' as const,
      verifiedSource: "Cherry's Daily Counter"
    },
    {
      id: 'gallery-boutique-interior',
      title: 'Luxury Sweet Boutique Ambience',
      marathiTitle: 'स्वच्छ व आल्हाददायक वातावरण',
      caption: 'Air-conditioned, modern hygienic retail space designed for family festive shopping.',
      imageUrl: '/images/banners/luxury_sweet_boutique_interior.jpg',
      category: 'store' as const,
      verifiedSource: 'Spine Road Shop Interior'
    }
  ];

  const filteredItems = galleryItems.filter(item => {
    if (activeTab === 'all') return true;
    if (activeTab === 'store') return item.category === 'facade' || item.category === 'counter';
    if (activeTab === 'displays') return item.category === 'cases' || item.category === 'sweets';
    if (activeTab === 'farsan') return item.category === 'farsan';
    return true;
  });

  const activePhoto = activeLightboxIndex !== null ? galleryItems[activeLightboxIndex] : null;

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-white dark:bg-[#15110E] border-y border-gold-100 dark:border-gold-900/40 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-50 dark:bg-gold-950/50 border border-gold-200 dark:border-gold-800/40 text-gold-800 dark:text-gold-300 text-xs font-semibold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>Spine Road Shop Tour</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Step Inside <span className="text-gold-gradient">Cherry&apos;s Sweet Mart</span>
          </h2>
          <p className="font-serif italic text-gold-700 dark:text-gold-400 text-base sm:text-lg">
            प्रत्यक्ष दुकानातील स्वच्छता, व्यवस्था आणि ताजी मिठाई
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
            Verified photographs of our physical storefront, temperature-controlled displays, live jalebi kadai, and warm hospitality team.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-gold-600 text-white shadow'
                : 'bg-slate-100 dark:bg-[#1E1914] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#25201A]'
            }`}
          >
            All Photos ({galleryItems.length})
          </button>
          <button
            onClick={() => setActiveTab('store')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'store'
                ? 'bg-gold-600 text-white shadow'
                : 'bg-slate-100 dark:bg-[#1E1914] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#25201A]'
            }`}
          >
            Storefront & Counter
          </button>
          <button
            onClick={() => setActiveTab('displays')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'displays'
                ? 'bg-gold-600 text-white shadow'
                : 'bg-slate-100 dark:bg-[#1E1914] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#25201A]'
            }`}
          >
            Sweet Display Cases
          </button>
          <button
            onClick={() => setActiveTab('farsan')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'farsan'
                ? 'bg-gold-600 text-white shadow'
                : 'bg-slate-100 dark:bg-[#1E1914] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#25201A]'
            }`}
          >
            Live Kitchen & Jalebi
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxIndex(galleryItems.findIndex(g => g.id === item.id))}
              className={`relative rounded-2xl overflow-hidden border border-gold-200 dark:border-gold-800/40 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer bg-slate-100 dark:bg-slate-900 ${
                idx === 0 ? 'sm:col-span-2 sm:row-span-2 min-h-[260px] sm:min-h-[380px]' : 'h-60'
              }`}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                loading="lazy"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Caption Overlay */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                <span className="inline-block px-2 py-0.5 rounded bg-gold-600 text-[10px] font-extrabold uppercase mb-1">
                  {item.verifiedSource}
                </span>
                <h3 className="font-display text-sm sm:text-base font-bold text-white line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-300 line-clamp-1 font-serif italic">
                  {item.marathiTitle}
                </p>
              </div>

              {/* Hover Zoom Icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-sm text-slate-800 dark:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activePhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors z-20"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-gold-400/40">
              <div className="aspect-16/10 bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={activePhoto.imageUrl}
                  alt={activePhoto.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-5 sm:p-6 bg-slate-900/95 text-white text-left space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-gold-600 text-xs font-bold">
                    {activePhoto.verifiedSource}
                  </span>
                  <span className="text-xs text-slate-400">• Cherry&apos;s Sweet Mart (Spine Road)</span>
                </div>
                <h3 className="font-display text-xl font-bold">
                  {activePhoto.title}
                </h3>
                <p className="text-xs font-serif italic text-gold-400">
                  {activePhoto.marathiTitle}
                </p>
                <p className="text-xs text-slate-300">
                  {activePhoto.caption}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
