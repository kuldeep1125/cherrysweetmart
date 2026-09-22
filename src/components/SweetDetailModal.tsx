// [ADDED] Luxury SweetDetailModal with sensory profile breakdown, portion weight pricing, and WhatsApp & Swiggy order channels
import React, { useEffect, useState } from 'react';
import { X, ShieldCheck, Clock, AlertTriangle, Package, ShoppingBag, MessageCircle, Gift, Thermometer, Coffee, Sparkles } from 'lucide-react';
import { SweetItem, SHOP_METADATA } from '../data/sweetsData';

interface SweetDetailModalProps {
  sweet: SweetItem | null;
  onClose: () => void;
  onAddToHamper?: (sweet: SweetItem, weightGrams: number) => void;
}

export const SweetDetailModal: React.FC<SweetDetailModalProps> = ({ sweet, onClose, onAddToHamper }) => {
  const [selectedWeight, setSelectedWeight] = useState<'250g' | '500g' | '1kg'>('500g');
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    if (!sweet) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [sweet, onClose]);

  if (!sweet) return null;

  const currentPrice =
    selectedWeight === '250g'
      ? sweet.price250g || Math.round(sweet.price500g * 0.55)
      : selectedWeight === '500g'
      ? sweet.price500g
      : sweet.price1kg;

  const handleAddHamper = () => {
    const grams = selectedWeight === '250g' ? 250 : selectedWeight === '500g' ? 500 : 1000;
    if (onAddToHamper) {
      onAddToHamper(sweet, grams);
      setAddedToast(true);
      setTimeout(() => setAddedToast(false), 2200);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Cherry's Sweet Mart (Spine Road Flagship),
I would like to place an order:
• Mithai: ${sweet.name} (${sweet.marathiName})
• Quantity: ${selectedWeight}
• Price: ₹${currentPrice}
Please confirm counter availability and packing schedule.`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sweet-detail-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dossier Window */}
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-2xl sm:max-w-3xl flex-col overflow-hidden rounded-3xl border border-gold-300/70 bg-[#FFFDF9] shadow-2xl transition-colors duration-300 dark:border-gold-700/60 dark:bg-[#1A1410]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-gold-200/80 bg-gradient-to-r from-[#25140F] via-[#371D15] to-[#25140F] px-5 py-4 text-white sm:px-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-300">
                {sweet.categoryName}
              </span>
              <span className="text-stone-400">·</span>
              <span className="text-xs font-medium text-emerald-400">100% Shuddha Veg</span>
            </div>
            <h3 id="sweet-detail-title" className="font-display text-lg font-bold text-[#FFF8ED] sm:text-2xl">
              {sweet.name}
            </h3>
            <p className="font-display text-xs italic text-gold-300">
              {sweet.marathiName}
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-stone-200 transition-colors hover:bg-white/20 hover:text-white"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-7 text-left">
          
          {/* Main Photo Frame */}
          <div className="relative aspect-[4/2.6] w-full overflow-hidden rounded-2xl border border-gold-300/40 bg-stone-900 shadow-lg sm:aspect-[4/2.2]">
            <img
              src={sweet.image}
              alt={sweet.name}
              className="h-full w-full object-cover object-center"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              {sweet.isBestseller && (
                <span className="rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#2A140E] shadow">
                  ★ Bestseller on Spine Road
                </span>
              )}
              {sweet.isChefSpecial && !sweet.isBestseller && (
                <span className="rounded-full bg-black/80 px-3 py-1 text-xs font-bold text-gold-300 backdrop-blur-sm">
                  Artisan Batch
                </span>
              )}
            </div>

            <div className="absolute bottom-3 right-3 rounded-lg bg-black/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
              Fresh Daily Batch
            </div>
          </div>

          {/* Dietary Badges */}
          <div className="flex flex-wrap items-center gap-1.5">
            {sweet.dietary.map(t => (
              <span
                key={t}
                className="rounded-full border border-gold-300/80 bg-gold-50/90 px-3 py-1 text-xs font-semibold text-stone-900 capitalize dark:border-gold-600/50 dark:bg-[#251A10] dark:text-gold-200"
              >
                {t.replace('-', ' ')}
              </span>
            ))}
            <span className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900 dark:border-emerald-600/50 dark:bg-[#122417] dark:text-emerald-300">
              ✓ 100% Pure Vegetarian
            </span>
          </div>

          {/* Description */}
          <p className="text-xs leading-relaxed text-stone-600 sm:text-sm dark:text-stone-300">
            {sweet.description}
          </p>

          {/* [ADDED] Sensory Profile if available */}
          {sweet.sensoryProfile && (
            <div className="rounded-2xl border border-gold-200/80 bg-ivory-100/70 p-4 dark:border-gold-900/40 dark:bg-[#1E1713]">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                <Sparkles className="h-3.5 w-3.5 text-gold-600" />
                <span>Sensory Dossier</span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div>
                  <span className="text-xs text-stone-500 dark:text-stone-400">Sweetness</span>
                  <p className="font-bold text-xs text-stone-800 dark:text-stone-200">
                    {sweet.sensoryProfile.sweetness} / 5 Level
                  </p>
                </div>
                <div>
                  <span className="text-xs text-stone-500 dark:text-stone-400">Texture</span>
                  <p className="font-bold text-xs text-stone-800 dark:text-stone-200">
                    {sweet.sensoryProfile.texture}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-stone-500 dark:text-stone-400">Serving Temp</span>
                  <p className="font-bold text-xs text-stone-800 dark:text-stone-200">
                    {sweet.sensoryProfile.servingTemp}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-stone-500 dark:text-stone-400">Pairing</span>
                  <p className="font-bold text-xs text-stone-800 dark:text-stone-200 truncate">
                    {sweet.sensoryProfile.pairing}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Packaging Size Selector */}
          <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-4 dark:border-gold-900/40 dark:bg-[#201914] space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wide text-stone-700 dark:text-stone-300">
              <span>Select Packaging Weight:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                Packed in Food-Grade Foil
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {(['250g', '500g', '1kg'] as const).map(w => (
                <button
                  key={w}
                  onClick={() => setSelectedWeight(w)}
                  className={`rounded-xl border p-3 text-center transition-all ${
                    selectedWeight === w
                      ? 'border-gold-500 bg-white dark:bg-[#2B211A] shadow-md ring-2 ring-gold-400/50'
                      : 'border-stone-200 bg-white/70 dark:border-stone-800 dark:bg-[#181310] hover:border-gold-300'
                  }`}
                >
                  <div className="text-xs font-bold text-stone-700 dark:text-stone-300">{w}</div>
                  <div className="mt-0.5 font-display text-base font-black text-primary-900 dark:text-gold-300">
                    ₹{w === '250g' ? sweet.price250g || Math.round(sweet.price500g * 0.55) : w === '500g' ? sweet.price500g : sweet.price1kg}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Specifications Grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
            <div className="flex items-start gap-2.5 rounded-xl border border-stone-200/80 bg-white p-3 dark:border-stone-800 dark:bg-[#1E1813]">
              <Clock className="h-4 w-4 shrink-0 text-gold-600 dark:text-gold-400 mt-0.5" />
              <div>
                <strong className="text-stone-800 dark:text-white">Fresh Shelf Life:</strong>
                <p className="text-xs text-stone-500 dark:text-stone-400">{sweet.shelfLife}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-stone-200/80 bg-white p-3 dark:border-stone-800 dark:bg-[#1E1813]">
              <Package className="h-4 w-4 shrink-0 text-gold-600 dark:text-gold-400 mt-0.5" />
              <div>
                <strong className="text-stone-800 dark:text-white">Storage Guidance:</strong>
                <p className="text-xs text-stone-500 dark:text-stone-400">{sweet.storage}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-stone-200/80 bg-white p-3 dark:border-stone-800 dark:bg-[#1E1813]">
              <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
              <div>
                <strong className="text-stone-800 dark:text-white">Allergen Notice:</strong>
                <p className="text-xs text-stone-500 dark:text-stone-400">{sweet.allergens}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-stone-200/80 bg-white p-3 dark:border-stone-800 dark:bg-[#1E1813]">
              <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
              <div>
                <strong className="text-stone-800 dark:text-white">Purity Guarantee:</strong>
                <p className="text-xs text-stone-500 dark:text-stone-400">100% Shuddha Cow Ghee / Milk</p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex flex-col items-center justify-between gap-3.5 border-t border-gold-200/80 bg-[#FAF7F2] p-4 sm:flex-row sm:px-7 dark:border-gold-900/60 dark:bg-[#181310]">
          <div>
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
              Total for {selectedWeight}:
            </span>
            <div className="font-display text-2xl font-black text-stone-900 dark:text-white">
              ₹{currentPrice}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {onAddToHamper && (
              <button
                onClick={handleAddHamper}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-gold-400/80 bg-gold-100/90 px-4 py-2.5 text-xs font-bold text-stone-900 transition-all hover:bg-gold-200 active:scale-95 dark:border-gold-500/60 dark:bg-[#2A1D13] dark:text-gold-200 dark:hover:bg-[#342418]"
              >
                <Gift className="h-4 w-4 text-gold-700 dark:text-gold-400" />
                <span>{addedToast ? 'Added to Box!' : 'Add to Gift Box'}</span>
              </button>
            )}

            <a
              href={`https://wa.me/${SHOP_METADATA.whatsappOrderNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow transition-all hover:bg-emerald-700 active:scale-95 sm:flex-initial"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Order ({selectedWeight})</span>
            </a>

            <a
              href={SHOP_METADATA.swiggyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#FC8019] px-4 py-2.5 text-xs font-bold text-white shadow transition-all hover:bg-[#e06f14] active:scale-95"
              title="Order on Swiggy for express delivery"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Swiggy</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
