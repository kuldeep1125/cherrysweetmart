// [ADDED] GiftHamperBuilder component with interactive box builder, compartment filling & confetti celebration
import React, { useEffect, useState } from 'react';
import { Gift, X, Check, Plus, Trash2, Sparkles, Send, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SWEETS_CATALOG, SweetItem, SHOP_METADATA } from '../data/sweetsData';

interface GiftHamperBuilderProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BoxTier {
  id: string;
  name: string;
  capacity: number;
  basePrice: number;
  image: string;
  badge: string;
}

const BOX_TIERS: BoxTier[] = [
  {
    id: 'gold-4',
    name: 'Royal Gold 4-Piece Keepsake Box',
    capacity: 4,
    basePrice: 650,
    image: '/images/banners/royal_gold_15_piece_gift_box.jpg',
    badge: 'Popular Family Gift'
  },
  {
    id: 'velvet-8',
    name: 'Imperial Velvet 8-Piece Hamper',
    capacity: 8,
    basePrice: 1250,
    image: '/images/sweets/eight_sweets_sampler_grid.jpg',
    badge: 'Diwali & Corporate Special'
  },
  {
    id: 'brass-thali-12',
    name: 'Maharaja Brass Thali Celebration Spread',
    capacity: 12,
    basePrice: 2250,
    image: '/images/banners/maharaja_12_katori_platter.jpg',
    badge: 'Wedding & Housewarming'
  }
];

export const GiftHamperBuilder: React.FC<GiftHamperBuilderProps> = ({ isOpen, onClose }) => {
  const [selectedBoxTier, setSelectedBoxTier] = useState<BoxTier>(BOX_TIERS[0]);
  const [selectedSweets, setSelectedSweets] = useState<SweetItem[]>([]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const remainingSlots = selectedBoxTier.capacity - selectedSweets.length;

  const handleAddSweet = (sweet: SweetItem) => {
    if (selectedSweets.length < selectedBoxTier.capacity) {
      const next = [...selectedSweets, sweet];
      setSelectedSweets(next);
      if (next.length === selectedBoxTier.capacity) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleRemoveSweet = (index: number) => {
    setSelectedSweets(prev => prev.filter((_, i) => i !== index));
  };

  const handleTierChange = (tier: BoxTier) => {
    setSelectedBoxTier(tier);
    if (selectedSweets.length > tier.capacity) {
      setSelectedSweets(selectedSweets.slice(0, tier.capacity));
    }
  };

  const sweetNamesList = selectedSweets.map((s, idx) => `${idx + 1}. ${s.name}`).join('\n');
  const whatsappQuery = encodeURIComponent(
    `Hello Cherry's Sweet Mart (Spine Road), I would like a quote for a customized Gift Hamper:
Box: ${selectedBoxTier.name} (Estimated ₹${selectedBoxTier.basePrice})
Selected Confections:
${sweetNamesList || 'Assorted Chef Choice'}
Special Note: ${notes || 'Standard festive packaging'}
Please advise availability and delivery details.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm animate-fadeIn" role="dialog" aria-modal="true" aria-labelledby="gift-hamper-title">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-white dark:bg-[#181310] rounded-3xl shadow-2xl border border-gold-300 dark:border-gold-700/60 overflow-hidden z-10 max-h-[92vh] flex flex-col transition-colors duration-300">
        
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-gold-100 dark:border-gold-900/50 bg-gradient-to-r from-ivory-100 via-white to-gold-50 dark:from-[#241D17] dark:via-[#1E1813] dark:to-[#241D17] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gold-100 dark:bg-gold-950/80 border border-gold-300 dark:border-gold-700/60 flex items-center justify-center text-gold-700 dark:text-gold-400">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h3 id="gift-hamper-title" className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Custom Mithai Gift Box Builder
              </h3>
              <p className="text-xs text-gold-700 dark:text-gold-400 font-medium">
                चेरीज स्वीट कॉर्नर — सणांसाठी व लग्नकार्यासाठी खास भेट बॉक्सेस
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-stone-800 hover:bg-slate-200 dark:hover:bg-stone-700 text-slate-600 dark:text-stone-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-left">
          
          {/* Step 1: Select Box Style */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-gold-300">
                Step 1: Choose Box Presentation
              </span>
              <span className="text-[11px] text-slate-500 dark:text-stone-400">Premium velvet-lined packaging</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {BOX_TIERS.map(tier => (
                <button
                  key={tier.id}
                  onClick={() => handleTierChange(tier)}
                  className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                    selectedBoxTier.id === tier.id
                      ? 'bg-gold-50/80 dark:bg-gold-950/50 border-gold-500 ring-2 ring-gold-400 dark:ring-gold-500 shadow-sm'
                      : 'bg-white dark:bg-[#201A15] border-slate-200 dark:border-stone-800 hover:border-gold-300 dark:hover:border-gold-700'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-gold-600 dark:bg-gold-700 text-white text-[9px] font-bold">
                      {tier.badge}
                    </span>
                    <h4 className="font-display text-xs font-bold text-slate-900 dark:text-white leading-tight">
                      {tier.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-stone-400">Capacity: {tier.capacity} Sweets</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-stone-800 flex items-baseline justify-between">
                    <span className="text-xs text-slate-400 dark:text-stone-500">Approx.</span>
                    <span className="text-base font-black text-gold-700 dark:text-gold-400">₹{tier.basePrice}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Compartment Slots Status */}
          <div className="p-4 rounded-2xl bg-ivory-50 dark:bg-[#201A15] border border-gold-200 dark:border-gold-800/60 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 dark:text-stone-200">
                Step 2: Fill Your Compartments ({selectedSweets.length} / {selectedBoxTier.capacity})
              </span>
              <span className="text-gold-700 dark:text-gold-400 font-semibold">
                {remainingSlots > 0 ? `${remainingSlots} more to complete` : '🎉 Hamper is Complete!'}
              </span>
            </div>

            {/* Visual Slots Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {Array.from({ length: selectedBoxTier.capacity }).map((_, index) => {
                const sweet = selectedSweets[index];
                return (
                  <div
                    key={index}
                    className={`relative rounded-xl aspect-square border-2 flex items-center justify-center p-1 text-center transition-all ${
                      sweet
                        ? 'border-gold-400 dark:border-gold-500 bg-white dark:bg-[#181310] shadow-xs'
                        : 'border-dashed border-slate-300 dark:border-stone-700 bg-white/60 dark:bg-stone-900/40 text-slate-400 dark:text-stone-500'
                    }`}
                  >
                    {sweet ? (
                      <div className="relative w-full h-full group">
                        <img
                          src={sweet.image}
                          alt={sweet.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          onClick={() => handleRemoveSweet(index)}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center shadow hover:scale-110 transition-transform"
                          title="Remove item"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <div className="absolute inset-x-0 bottom-0 bg-black/60 rounded-b-lg p-0.5 text-[8px] text-white truncate px-1">
                          {sweet.name.split(' ')[0]}
                        </div>
                      </div>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400 dark:text-stone-500">
                        Slot {index + 1}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Pick Sweets to Add */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-gold-300 uppercase tracking-wider">
              <span>Step 3: Click to Add Sweets</span>
              <span className="text-[11px] text-slate-500 dark:text-stone-400 font-normal">Showing popular celebratory picks</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-56 overflow-y-auto p-1.5 border border-slate-200 dark:border-stone-800 rounded-2xl bg-slate-50/50 dark:bg-[#15110E]">
              {SWEETS_CATALOG.slice(0, 16).map(sweet => {
                const isFull = selectedSweets.length >= selectedBoxTier.capacity;

                return (
                  <button
                    key={sweet.id}
                    onClick={() => handleAddSweet(sweet)}
                    disabled={isFull}
                    className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all ${
                      isFull
                        ? 'opacity-50 cursor-not-allowed border-slate-200 dark:border-stone-800 bg-slate-100 dark:bg-stone-900/40'
                        : 'hover:border-gold-400 dark:hover:border-gold-600 hover:bg-gold-50/60 dark:hover:bg-gold-950/40 border-slate-200 dark:border-stone-800 bg-white dark:bg-[#201A15]'
                    }`}
                  >
                    <img
                      src={sweet.image}
                      alt={sweet.name}
                      className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-bold text-slate-900 dark:text-stone-100 truncate">
                        {sweet.name}
                      </div>
                      <div className="text-[10px] text-gold-700 dark:text-gold-400 font-semibold">
                        ₹{sweet.price250g}/250g
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-stone-300 mb-1">
              Custom Message or Ribbon Preference (Optional):
            </label>
            <input
              type="text"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="e.g. Diwali Corporate Gifting with Golden Ribbon & Greeting Card"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-stone-800 bg-white dark:bg-[#201A15] text-slate-900 dark:text-white text-xs outline-none focus:border-gold-500"
            />
          </div>

        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 sm:p-5 border-t border-gold-100 dark:border-gold-900/50 bg-ivory-50 dark:bg-[#201A15] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="text-xs text-slate-500 dark:text-stone-400">Estimated Hamper Price:</span>
            <div className="text-xl font-black text-slate-900 dark:text-white">
              ₹{selectedBoxTier.basePrice} <span className="text-xs text-slate-400 dark:text-stone-500 font-normal">(incl. luxury box)</span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setSelectedSweets([])}
              className="px-4 py-2.5 rounded-full border border-slate-300 dark:border-stone-700 text-slate-700 dark:text-stone-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-stone-800"
            >
              Reset
            </button>
            <a
              href={`https://wa.me/${SHOP_METADATA.whatsappOrderNumber}?text=${whatsappQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Hamper Inquiry on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
