// [ADDED] World-class Artisanal Gift Hamper Atelier with velvet compartment visualizer, ribbon selector, live greeting card preview, and WhatsApp concierge
import React, { useEffect, useState, useMemo } from 'react';
import { Gift, X, Sparkles, Send, Award, Check, Trash2, Heart, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SWEETS_CATALOG, SweetItem, SHOP_METADATA } from '../data/sweetsData';

interface GiftHamperBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  initialSweets?: SweetItem[];
  onHamperUpdate?: (sweets: SweetItem[]) => void;
}

interface BoxTier {
  id: string;
  name: string;
  capacity: number;
  basePrice: number;
  image: string;
  badge: string;
  dimensions: string;
}

const BOX_TIERS: BoxTier[] = [
  {
    id: 'gold-4',
    name: 'Royal Quad Keepsake Box',
    capacity: 4,
    basePrice: 650,
    image: '/images/banners/luxury_royal_gift_box_atelier.jpg',
    badge: 'Artisanal Selection',
    dimensions: '22cm × 22cm · Rigid Wood & Gold Foil',
  },
  {
    id: 'velvet-8',
    name: 'Imperial Velvet Octet Hamper',
    capacity: 8,
    basePrice: 1250,
    image: '/images/banners/luxury_royal_gift_box_atelier.jpg',
    badge: 'Diwali & Wedding Signature',
    dimensions: '34cm × 24cm · Deep Crimson Velvet Lined',
  },
  {
    id: 'brass-12',
    name: 'Maharaja Heritage 12-Piece Spread',
    capacity: 12,
    basePrice: 2250,
    image: '/images/banners/hero_grand_confection_feast.jpg',
    badge: 'Royal Grandeur Banquet',
    dimensions: '42cm Antique Engraved Brass Platter',
  },
];

const RIBBON_OPTIONS = [
  { id: 'crimson', name: 'Royal Crimson Velvet', colorClass: 'bg-[#8E202E] text-white border-[#6B1420]' },
  { id: 'gold', name: 'Imperial Satin Gold', colorClass: 'bg-[#D9A03E] text-[#2A140E] border-[#B88228]' },
  { id: 'emerald', name: 'Vedic Emerald Satin', colorClass: 'bg-[#185338] text-white border-[#0E3523]' },
];

export const GiftHamperBuilder: React.FC<GiftHamperBuilderProps> = ({
  isOpen,
  onClose,
  initialSweets = [],
  onHamperUpdate,
}) => {
  const [selectedBoxTier, setSelectedBoxTier] = useState<BoxTier>(BOX_TIERS[1]); // Default to 8-piece
  const [selectedSweets, setSelectedSweets] = useState<SweetItem[]>(initialSweets);
  const [selectedRibbon, setSelectedRibbon] = useState(RIBBON_OPTIONS[0]);
  const [greetingCardMessage, setGreetingCardMessage] = useState('');
  const [senderRecipient, setSenderRecipient] = useState({ to: '', from: '' });

  // Sync with initialSweets if provided
  useEffect(() => {
    if (initialSweets.length > 0) {
      setSelectedSweets(initialSweets.slice(0, selectedBoxTier.capacity));
    }
  }, [initialSweets, selectedBoxTier.capacity]);

  // Handle escape key
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
      if (onHamperUpdate) onHamperUpdate(next);

      if (next.length === selectedBoxTier.capacity) {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#D9A03E', '#8E202E', '#FFFFFF'],
        });
      }
    }
  };

  const handleRemoveSweet = (index: number) => {
    const next = selectedSweets.filter((_, i) => i !== index);
    setSelectedSweets(next);
    if (onHamperUpdate) onHamperUpdate(next);
  };

  const handleClear = () => {
    setSelectedSweets([]);
    if (onHamperUpdate) onHamperUpdate([]);
  };

  const handleTierChange = (tier: BoxTier) => {
    setSelectedBoxTier(tier);
    if (selectedSweets.length > tier.capacity) {
      const trimmed = selectedSweets.slice(0, tier.capacity);
      setSelectedSweets(trimmed);
      if (onHamperUpdate) onHamperUpdate(trimmed);
    }
  };

  const sweetListText = selectedSweets
    .map((s, idx) => `  ${idx + 1}. ${s.name} (${s.marathiName})`)
    .join('\n');

  const whatsappMessage = encodeURIComponent(
    `Namaskar Cherry's Sweet Mart (Spine Road Concierge),

I would like to order a Bespoke Artisanal Gift Hamper:
• Presentation Tier: ${selectedBoxTier.name} (₹${selectedBoxTier.basePrice})
• Velvet Ribbon: ${selectedRibbon.name}
• To: ${senderRecipient.to || 'Family / Client'}
• From: ${senderRecipient.from || 'Customer'}
• Greeting Note: "${greetingCardMessage || 'Heartiest Celebrations & Warm Wishes'}"

Curated Sweets in Compartments:
${sweetListText || '  (Please curate Chef Choice Bestsellers)'}

Please share final box availability, packing schedule, and delivery/pickup details.`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="atelier-title"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-gold-300/60 bg-[#FFFDF9] shadow-2xl transition-colors duration-300 dark:border-gold-700/50 dark:bg-[#181310]">
        
        {/* Atelier Header */}
        <div className="flex items-center justify-between border-b border-gold-200/80 bg-gradient-to-r from-[#24130F] via-[#351B14] to-[#24130F] px-5 py-4 text-white sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold-400/40 bg-gold-400/15 text-gold-300">
              <Gift className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="atelier-title" className="font-display text-lg font-bold tracking-tight text-[#FFF8ED] sm:text-xl">
                  Artisanal Hamper Atelier
                </h3>
                <span className="rounded-full bg-gold-400/20 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-gold-200">
                  Custom Curated
                </span>
              </div>
              <p className="font-display text-xs italic text-gold-300/90">
                चेरीज स्वीट कॉर्नर — सणांसाठी व लग्नकार्यासाठी खास भेट बॉक्सेस
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-stone-200 transition-colors hover:bg-white/20 hover:text-white"
            aria-label="Close atelier"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Atelier Scrollable Content */}
        <div className="flex-1 space-y-7 overflow-y-auto p-5 sm:p-7 text-left">
          
          {/* Step 1: Select Box Presentation Tier */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-stone-800 dark:text-gold-300">
                1. Select Box Presentation & Capacity
              </span>
              <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400">
                Lined with food-grade gold foil cups
              </span>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
              {BOX_TIERS.map(tier => {
                const isSelected = selectedBoxTier.id === tier.id;
                return (
                  <button
                    key={tier.id}
                    onClick={() => handleTierChange(tier)}
                    className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-3.5 text-left transition-all ${
                      isSelected
                        ? 'border-gold-500 bg-gold-50/80 shadow-md ring-2 ring-gold-400/50 dark:border-gold-500 dark:bg-gold-950/40'
                        : 'border-stone-200 bg-white hover:border-gold-300 dark:border-stone-800 dark:bg-[#1F1914] dark:hover:border-gold-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <span className="rounded-full bg-primary-800 px-2 py-0.5 text-[9px] font-bold text-gold-200">
                          {tier.badge}
                        </span>
                        <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                          {tier.capacity} Compartments
                        </span>
                      </div>
                      <h4 className="mt-2 font-display text-sm font-bold text-stone-900 dark:text-white">
                        {tier.name}
                      </h4>
                      <p className="mt-1 text-[11px] text-stone-500 dark:text-stone-400">
                        {tier.dimensions}
                      </p>
                    </div>

                    <div className="mt-4 flex items-baseline justify-between border-t border-stone-100 pt-2 dark:border-stone-800">
                      <span className="text-[10px] uppercase font-semibold text-stone-400">Complete Box</span>
                      <span className="font-display text-base font-black text-primary-900 dark:text-gold-300">
                        ₹{tier.basePrice}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Velvet Compartment Visualizer */}
          <div className="rounded-2xl border border-gold-200/80 bg-gradient-to-b from-[#FAF6F0] to-[#F5EFE6] p-4.5 shadow-inner dark:border-gold-900/40 dark:from-[#211A15] dark:to-[#19130F]">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-800 dark:text-stone-200">
                  2. Velvet Compartments ({selectedSweets.length} of {selectedBoxTier.capacity} slots filled)
                </span>
              </div>
              <span className={`font-bold ${remainingSlots === 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-gold-700 dark:text-gold-400'}`}>
                {remainingSlots === 0 ? '🎉 Royal Hamper Box is Complete!' : `Select ${remainingSlots} more sweets below`}
              </span>
            </div>

            {/* Grid of Compartment Slots */}
            <div className="mt-3.5 grid grid-cols-4 gap-2.5 sm:grid-cols-6 lg:grid-cols-8">
              {Array.from({ length: selectedBoxTier.capacity }).map((_, index) => {
                const sweet = selectedSweets[index];
                return (
                  <div
                    key={index}
                    className={`group relative aspect-square rounded-xl border-2 p-1 transition-all ${
                      sweet
                        ? 'border-gold-400 bg-white shadow-sm dark:border-gold-500 dark:bg-[#251E18]'
                        : 'border-dashed border-stone-300 bg-white/60 text-stone-400 dark:border-stone-700 dark:bg-stone-900/30 dark:text-stone-500'
                    }`}
                  >
                    {sweet ? (
                      <div className="relative h-full w-full overflow-hidden rounded-lg">
                        <img
                          src={sweet.image}
                          alt={sweet.name}
                          className="h-full w-full object-cover"
                        />
                        <button
                          onClick={() => handleRemoveSweet(index)}
                          className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white shadow transition-transform hover:scale-110 active:scale-95"
                          title="Remove item"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        <div className="absolute inset-x-0 bottom-0 bg-black/70 px-1 py-0.5 text-center text-[9px] font-bold text-white truncate">
                          {sweet.name.split(' ')[0]}
                        </div>
                      </div>
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center">
                        <span className="text-[10px] font-extrabold text-stone-400 dark:text-stone-500">
                          {index + 1}
                        </span>
                        <span className="text-[8px] uppercase tracking-wider text-stone-400">Empty</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Confection Picker Carousel */}
          <div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-widest text-stone-800 dark:text-gold-300">
                3. Click Any Sweet to Place into Compartment
              </span>
              <span className="text-[11px] text-stone-500 dark:text-stone-400">
                Showing top 16 festive confections
              </span>
            </div>

            <div className="mt-2.5 grid max-h-56 grid-cols-2 gap-2 overflow-y-auto rounded-2xl border border-stone-200 bg-stone-50/50 p-2 sm:grid-cols-4 dark:border-stone-800 dark:bg-[#140F0C]">
              {SWEETS_CATALOG.slice(0, 16).map(sweet => {
                const isFull = selectedSweets.length >= selectedBoxTier.capacity;
                return (
                  <button
                    key={sweet.id}
                    onClick={() => handleAddSweet(sweet)}
                    disabled={isFull}
                    className={`flex items-center gap-2 rounded-xl border p-2 text-left transition-all ${
                      isFull
                        ? 'cursor-not-allowed opacity-50 border-stone-200 bg-stone-100 dark:border-stone-800 dark:bg-stone-900/30'
                        : 'border-stone-200 bg-white hover:border-gold-400 hover:bg-gold-50/60 dark:border-stone-800 dark:bg-[#1E1813] dark:hover:border-gold-600'
                    }`}
                  >
                    <img
                      src={sweet.image}
                      alt={sweet.name}
                      className="h-10 w-10 shrink-0 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-[11px] font-bold text-stone-900 dark:text-white">
                        {sweet.name}
                      </p>
                      <p className="text-[10px] font-semibold text-primary-800 dark:text-gold-400">
                        {sweet.marathiName}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Ribbon & Personal Greeting Card Customizer */}
          <div className="grid grid-cols-1 gap-5 rounded-2xl border border-gold-200/80 bg-white p-4.5 sm:grid-cols-12 dark:border-gold-800/40 dark:bg-[#1C1612]">
            
            {/* Left Column: Ribbon Selector & Card Details */}
            <div className="space-y-4 sm:col-span-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                  4. Select Satin / Velvet Ribbon
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {RIBBON_OPTIONS.map(ribbon => (
                    <button
                      key={ribbon.id}
                      onClick={() => setSelectedRibbon(ribbon)}
                      className={`rounded-full border px-3 py-1 text-xs font-bold transition-all ${
                        selectedRibbon.id === ribbon.id
                          ? `${ribbon.colorClass} shadow-sm ring-2 ring-gold-400`
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100 dark:border-stone-800 dark:bg-[#251E18] dark:text-stone-300'
                      }`}
                    >
                      {ribbon.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-stone-600 dark:text-stone-400">To (Recipient)</label>
                  <input
                    type="text"
                    value={senderRecipient.to}
                    onChange={e => setSenderRecipient(prev => ({ ...prev, to: e.target.value }))}
                    placeholder="e.g. Sharma Family"
                    className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs text-stone-800 outline-none focus:border-gold-500 dark:border-stone-800 dark:bg-[#251E18] dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-stone-600 dark:text-stone-400">From (Sender)</label>
                  <input
                    type="text"
                    value={senderRecipient.from}
                    onChange={e => setSenderRecipient(prev => ({ ...prev, from: e.target.value }))}
                    placeholder="e.g. Rahul & Sunita"
                    className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs text-stone-800 outline-none focus:border-gold-500 dark:border-stone-800 dark:bg-[#251E18] dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-stone-600 dark:text-stone-400">
                  Gold Foil Message Card Inscription
                </label>
                <input
                  type="text"
                  value={greetingCardMessage}
                  onChange={e => setGreetingCardMessage(e.target.value)}
                  placeholder="e.g. Wishing you sweetness, joy & prosperity this festive season!"
                  className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs text-stone-800 outline-none focus:border-gold-500 dark:border-stone-800 dark:bg-[#251E18] dark:text-white"
                />
              </div>
            </div>

            {/* Right Column: Live Gold-Bordered Greeting Card Preview */}
            <div className="flex flex-col justify-between rounded-xl border border-gold-300/70 bg-[#FFFDF9] p-4 text-center shadow-sm sm:col-span-6 dark:border-gold-700/60 dark:bg-[#211A15]">
              <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-widest text-gold-700 dark:text-gold-400">
                <span>Cherry&apos;s Confectionery Note</span>
                <Sparkles className="h-3 w-3" />
              </div>

              <div className="my-3 space-y-1.5">
                <p className="text-[11px] font-bold text-stone-500 dark:text-stone-400">
                  {senderRecipient.to ? `For: ${senderRecipient.to}` : 'For: Your Loved Ones'}
                </p>
                <p className="font-display text-sm font-medium italic text-stone-800 dark:text-[#FFF8ED]">
                  &ldquo;{greetingCardMessage || 'Wishing you boundless warmth, prosperity, and the sweetness of authentic celebration.'}&rdquo;
                </p>
                <p className="text-[11px] font-bold text-gold-800 dark:text-gold-300">
                  {senderRecipient.from ? `With warmth, ${senderRecipient.from}` : 'With warmest blessings'}
                </p>
              </div>

              <div className="border-t border-gold-200/50 pt-1.5 text-[9px] text-stone-400">
                Sealed with {selectedRibbon.name} & Pure Cow Ghee Assurance
              </div>
            </div>

          </div>

        </div>

        {/* Modal Bottom Concierge Action Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-gold-200/80 bg-[#FAF7F2] p-4 sm:flex-row sm:px-7 dark:border-gold-900/60 dark:bg-[#181310]">
          <div>
            <div className="text-[11px] font-medium text-stone-500 dark:text-stone-400">
              Complete Gift Hamper Estimation:
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-black text-stone-900 dark:text-white">
                ₹{selectedBoxTier.basePrice}
              </span>
              <span className="text-xs text-stone-400">
                (Includes {selectedBoxTier.name} + Ribbon + Custom Card)
              </span>
            </div>
          </div>

          <div className="flex w-full items-center gap-2.5 sm:w-auto">
            {selectedSweets.length > 0 && (
              <button
                onClick={handleClear}
                className="rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs font-bold text-stone-600 transition-colors hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
              >
                Clear
              </button>
            )}

            <a
              href={`https://wa.me/${SHOP_METADATA.whatsappOrderNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-3 text-xs font-extrabold text-white shadow-lg transition-all hover:from-emerald-700 hover:to-emerald-800 active:scale-95 sm:flex-initial"
            >
              <Send className="h-4 w-4" />
              <span>Inquire & Order via WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
