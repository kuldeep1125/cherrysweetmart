// [ADDED] SweetDetailModal component with dark mode styling, deep culinary details & WhatsApp ordering
import React, { useEffect, useState } from 'react';
import { X, ShieldCheck, Clock, AlertTriangle, Package, ShoppingBag } from 'lucide-react';
import { SweetItem, SHOP_METADATA } from '../data/sweetsData';

interface SweetDetailModalProps {
  sweet: SweetItem | null;
  onClose: () => void;
}

export const SweetDetailModal: React.FC<SweetDetailModalProps> = ({ sweet, onClose }) => {
  const [selectedWeight, setSelectedWeight] = useState<'250g' | '500g' | '1kg'>('500g');

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
      ? sweet.price250g
      : selectedWeight === '500g'
      ? sweet.price500g
      : sweet.price1kg;

  const whatsappMessage = encodeURIComponent(
    `Hello Cherry's Sweet Mart (Spine Road), I would like to order:
Sweet: ${sweet.name} (${sweet.marathiName})
Quantity: ${selectedWeight}
Price: ₹${currentPrice}
Please confirm availability and packaging details.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn" role="dialog" aria-modal="true" aria-labelledby="sweet-detail-title">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Content Box */}
      <div className="relative w-full max-w-2xl sm:max-w-3xl bg-white dark:bg-[#1C1713] rounded-3xl shadow-2xl border border-gold-300 dark:border-gold-800/60 overflow-hidden z-10 max-h-[92vh] flex flex-col text-slate-900 dark:text-slate-100">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-gold-100 dark:border-gold-900/40 flex items-center justify-between bg-ivory-50 dark:bg-[#16120E] flex-shrink-0">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700 dark:text-gold-400">
              {sweet.categoryName}
            </span>
            <h3 id="sweet-detail-title" className="font-display text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
              {sweet.name}
            </h3>
            <p className="text-xs font-serif italic text-gold-600 dark:text-gold-400 font-semibold">
              {sweet.marathiName}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 min-h-0 space-y-4 sm:space-y-5 text-left scrollbar-thin scrollbar-thumb-gold-400/30 hover:scrollbar-thumb-gold-500">
          
          {/* Main Photo Showcase - 100% full view with zero cropping */}
          {/* [FIXED]: Replaced aspect-video object-cover with object-contain inside dedicated showcase frame to prevent image clipping */}
          <div className="relative rounded-2xl overflow-hidden w-full h-56 sm:h-80 bg-gradient-to-b from-stone-50 via-white to-ivory-100 dark:from-[#15110E] dark:via-[#191410] dark:to-[#16120E] border border-gold-200/80 dark:border-gold-800/40 p-2 sm:p-4 flex items-center justify-center shadow-inner">
            <img
              src={sweet.image}
              alt={sweet.name}
              className="w-full h-full object-contain mx-auto rounded-xl drop-shadow-md"
            />
            {/* Bestseller Badge */}
            {sweet.isBestseller && (
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gold-600 text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                ★ Bestseller on Spine Road
              </div>
            )}
            {sweet.isChefSpecial && !sweet.isBestseller && (
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/90 dark:bg-black/90 text-gold-300 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                Chef Special
              </div>
            )}
          </div>

          {/* Dedicated Dietary Badges Row (Positioned below photo, NEVER covering food!) */}
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            {sweet.dietary.map(t => (
              <span
                key={t}
                className="px-3 py-1 rounded-full bg-ivory-100 dark:bg-[#25201A] border border-gold-200 dark:border-gold-800/50 text-slate-800 dark:text-gold-300 text-xs font-semibold capitalize flex items-center gap-1 shadow-2xs"
              >
                {t === 'pure-ghee' && '🧈 '}
                {t === 'sugar-free' && '🌱 '}
                {t === 'dry-fruit' && '🌰 '}
                {t === 'bengali-chhena' && '🥛 '}
                {t === 'khoya-mawa' && '🍯 '}
                {t === 'eggless' && '🥚 '}
                <span>{t.replace('-', ' ')}</span>
              </span>
            ))}
            <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
              ✓ 100% Pure Vegetarian
            </span>
          </div>

          {/* Description */}
          <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            {sweet.description}
          </p>

          {/* Portion Weight Selection */}
          <div className="p-4 rounded-2xl bg-ivory-50 dark:bg-[#16120E] border border-gold-200 dark:border-gold-800/40 space-y-2">
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
              Select Package Weight:
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSelectedWeight('250g')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  selectedWeight === '250g'
                    ? 'bg-gold-600 text-white border-gold-600 shadow-md font-bold'
                    : 'bg-white dark:bg-[#221D18] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-gold-300'
                }`}
              >
                <div className="text-xs">250 grams</div>
                <div className="text-sm font-black mt-0.5">₹{sweet.price250g}</div>
              </button>

              <button
                onClick={() => setSelectedWeight('500g')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  selectedWeight === '500g'
                    ? 'bg-gold-600 text-white border-gold-600 shadow-md font-bold'
                    : 'bg-white dark:bg-[#221D18] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-gold-300'
                }`}
              >
                <div className="text-xs">500 grams</div>
                <div className="text-sm font-black mt-0.5">₹{sweet.price500g}</div>
              </button>

              <button
                onClick={() => setSelectedWeight('1kg')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  selectedWeight === '1kg'
                    ? 'bg-gold-600 text-white border-gold-600 shadow-md font-bold'
                    : 'bg-white dark:bg-[#221D18] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-gold-300'
                }`}
              >
                <div className="text-xs">1 Kilogram</div>
                <div className="text-sm font-black mt-0.5">₹{sweet.price1kg}</div>
              </button>
            </div>
          </div>

          {/* Specifications & Hygiene Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#221D18] border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-gold-600 dark:text-gold-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 dark:text-white">Fresh Shelf Life:</strong>
                <p className="text-slate-600 dark:text-slate-400 text-[11px]">{sweet.shelfLife}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#221D18] border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
              <Package className="w-4 h-4 text-gold-600 dark:text-gold-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 dark:text-white">Storage Guidance:</strong>
                <p className="text-slate-600 dark:text-slate-400 text-[11px]">{sweet.storage}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#221D18] border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 dark:text-white">Allergen Notice:</strong>
                <p className="text-slate-600 dark:text-slate-400 text-[11px]">{sweet.allergens}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#221D18] border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 dark:text-white">Purity Guarantee:</strong>
                <p className="text-slate-600 dark:text-slate-400 text-[11px]">100% Shuddha Desi Cow Ghee / Fresh Milk</p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-gold-100 dark:border-gold-900/40 bg-ivory-50 dark:bg-[#16120E] flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center justify-between w-full sm:w-auto sm:block">
            <span className="text-xs text-slate-500 dark:text-slate-400 mr-2 sm:mr-0">Total Price:</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">₹{currentPrice}</div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={`https://wa.me/${SHOP_METADATA.whatsappOrderNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:scale-95"
            >
              <span>WhatsApp Order ({selectedWeight})</span>
            </a>

            <a
              href={SHOP_METADATA.swiggyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-full bg-[#FC8019] hover:bg-[#e06f14] text-white font-bold text-xs shadow flex items-center justify-center gap-1.5 transition-all hover:-translate-y-0.5 active:scale-95"
              title="Order on Swiggy"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Swiggy</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
