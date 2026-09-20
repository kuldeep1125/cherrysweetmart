// [FIXED] AuthenticShopGallery component with responsive proportional lightbox and carousel controls
import React, { useEffect, useState } from 'react';
import { Camera, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
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

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + galleryItems.length) % galleryItems.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % galleryItems.length);
    }
  };

  useEffect(() => {
    if (!activePhoto) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveLightboxIndex(null);
      if (event.key === 'ArrowLeft' && activeLightboxIndex !== null) {
        setActiveLightboxIndex((activeLightboxIndex - 1 + galleryItems.length) % galleryItems.length);
      }
      if (event.key === 'ArrowRight' && activeLightboxIndex !== null) {
        setActiveLightboxIndex((activeLightboxIndex + 1) % galleryItems.length);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activePhoto, activeLightboxIndex, galleryItems.length]);

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
            <button
              type="button"
              key={item.id}
              onClick={() => setActiveLightboxIndex(galleryItems.findIndex(g => g.id === item.id))}
              className={`relative block w-full text-left rounded-2xl overflow-hidden border border-gold-200 dark:border-gold-800/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer bg-slate-100 dark:bg-slate-900 ${
                idx === 0 ? 'sm:col-span-2 sm:row-span-2 min-h-[260px] sm:min-h-[380px]' : 'h-60'
              }`}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
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
            </button>
          ))}
        </div>

        {/* [FIXED] Responsive Lightbox Modal - Proportional geometry, never oversized on desktop or mobile */}
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-lightbox-title"
          >
            {/* Backdrop click to close */}
            <div
              className="absolute inset-0 cursor-pointer"
              onClick={() => setActiveLightboxIndex(null)}
              aria-label="Close photo viewer overlay"
            />

            {/* Modal Card Window - Balanced maximum width and height */}
            <div className="relative z-10 flex max-h-[88vh] w-full max-w-lg sm:max-w-2xl flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-gold-400/40 bg-[#17120E] shadow-2xl text-white">
              
              {/* Close Button */}
              <button
                onClick={() => setActiveLightboxIndex(null)}
                className="absolute top-3 right-3 z-30 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black/60 text-stone-200 backdrop-blur-md transition-colors hover:bg-black/90 hover:text-white"
                aria-label="Close photo viewer"
              >
                <X className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
              </button>

              {/* Responsive Image Frame - Constrained height prevents oversized display on desktop & mobile */}
              <div className="relative flex max-h-[46vh] sm:max-h-[52vh] w-full items-center justify-center overflow-hidden bg-black/95 p-2 sm:p-3 shrink-0">
                <img
                  src={activePhoto.imageUrl}
                  alt={activePhoto.title}
                  className="max-h-[42vh] sm:max-h-[48vh] w-auto max-w-full rounded-lg object-contain shadow-lg"
                />

                {/* Left navigation arrow */}
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/80 hover:scale-110 active:scale-95"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>

                {/* Right navigation arrow */}
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/80 hover:scale-110 active:scale-95"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>

                {/* Counter pill */}
                <div className="absolute bottom-3 left-3 rounded-full bg-black/70 px-2.5 py-0.5 text-[10px] font-bold text-gold-300 backdrop-blur-sm">
                  {((activeLightboxIndex ?? 0) + 1)} / {galleryItems.length}
                </div>
              </div>

              {/* Caption & Metadata Container */}
              <div className="overflow-y-auto p-4 sm:p-5 text-left space-y-1.5 bg-gradient-to-b from-[#1C1612] to-[#14100D] border-t border-gold-900/40">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-gold-600/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    {activePhoto.verifiedSource}
                  </span>
                  <span className="text-[11px] text-stone-400">· Spine Road Boutique</span>
                </div>

                <h3 id="gallery-lightbox-title" className="font-display text-base sm:text-lg font-bold text-[#FFF8ED]">
                  {activePhoto.title}
                </h3>

                <p className="font-display text-xs italic text-gold-400">
                  {activePhoto.marathiTitle}
                </p>

                <p className="text-xs text-stone-300 leading-relaxed">
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
