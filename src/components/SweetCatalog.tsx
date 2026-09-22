// [ADDED] SweetCatalog with sleek category rail, quick keyboard search (/), uniform luxury card geometry, and direct Hamper Atelier integration
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Sparkles, Eye, Star, MessageCircle, Gift, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { SWEETS_CATALOG, CATEGORIES, SweetItem } from '../data/sweetsData';

interface SweetCatalogProps {
  onSelectSweet: (sweet: SweetItem) => void;
  onOrderQuick: (sweet: SweetItem, weight: string, price: number) => void;
  onAddToHamper?: (sweet: SweetItem, weightGrams: number) => void;
}

export const SweetCatalog: React.FC<SweetCatalogProps> = ({ onSelectSweet, onOrderQuick, onAddToHamper }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');
  
  // Track selected portion weight per sweet ID: '250g' | '500g' | '1kg'
  const [selectedWeights, setSelectedWeights] = useState<Record<string, '250g' | '500g' | '1kg'>>({});

  // [ADDED] Issue 13: Progressive disclosure pagination state (12 items per batch)
  const [displayCount, setDisplayCount] = useState<number>(12);

  // Toast feedback for hamper additions
  const [hamperToastSweet, setHamperToastSweet] = useState<string | null>(null);

  // Category scroll container reference
  const categoryRailRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Reset pagination whenever search query, category, or dietary filter changes
  useEffect(() => {
    setDisplayCount(12);
  }, [activeCategory, selectedDietary, searchQuery]);

  // [ADDED] Keyboard shortcut: Press '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollRail = (direction: 'left' | 'right') => {
    if (categoryRailRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      categoryRailRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleWeightChange = (sweetId: string, weight: '250g' | '500g' | '1kg') => {
    setSelectedWeights(prev => ({ ...prev, [sweetId]: weight }));
  };

  const handleAddHamper = (sweet: SweetItem, weight: '250g' | '500g' | '1kg') => {
    const grams = weight === '250g' ? 250 : weight === '500g' ? 500 : 1000;
    if (onAddToHamper) {
      onAddToHamper(sweet, grams);
      setHamperToastSweet(sweet.name);
      setTimeout(() => setHamperToastSweet(null), 2500);
    } else {
      onSelectSweet(sweet);
    }
  };

  // Filtered sweets catalog calculation
  const filteredSweets = useMemo(() => {
    return SWEETS_CATALOG.filter(sweet => {
      // Category filter
      if (activeCategory !== 'all' && sweet.category !== activeCategory) {
        return false;
      }
      // Dietary filter
      if (selectedDietary === 'bestseller' && !sweet.isBestseller) return false;
      if (selectedDietary === 'pure-ghee' && !sweet.dietary.includes('pure-ghee')) return false;
      if (selectedDietary === 'sugar-free' && !sweet.dietary.includes('sugar-free')) return false;
      if (selectedDietary === 'dry-fruit' && !sweet.dietary.includes('dry-fruit')) return false;

      // Search Query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = sweet.name.toLowerCase().includes(query);
        const matchMarathi = sweet.marathiName.toLowerCase().includes(query);
        const matchDesc = sweet.description.toLowerCase().includes(query);
        const matchCat = sweet.categoryName.toLowerCase().includes(query);
        return matchName || matchMarathi || matchDesc || matchCat;
      }

      return true;
    });
  }, [activeCategory, selectedDietary, searchQuery]);

  return (
    <section id="menu" className="relative bg-[#FAF7F2] py-20 sm:py-28 transition-colors duration-300 dark:bg-[#130E0B]">
      {/* Toast confirmation when added to hamper */}
      {hamperToastSweet && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-gold-400/40 bg-[#2A140E] px-5 py-3 text-sm font-bold text-white shadow-2xl animate-fade-in">
          <Check className="h-4 w-4 text-emerald-400" />
          <span>Added <strong>{hamperToastSweet}</strong> to Gift Box!</span>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-300/70 bg-white px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary-900 shadow-xs dark:border-gold-800/40 dark:bg-gold-950/40 dark:text-gold-300">
            <Sparkles className="h-3.5 w-3.5 text-gold-600 dark:text-gold-400" />
            <span>Complete Sweet & Namkeen Repertoire</span>
          </div>

          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-5xl dark:text-white">
            Handcrafted with <span className="text-gold-gradient font-normal italic">Love & Devotion</span>
          </h2>

          <p className="mt-2 font-display text-base font-semibold italic text-primary-800 dark:text-gold-400 sm:text-lg">
            प्रत्येक सणासाठी आणि आनंदाच्या क्षणासाठी ५०+ पारंपरिक गोड पदार्थ
          </p>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-stone-600 dark:text-stone-300 sm:text-base">
            Select your preferred weight portion (250g, 500g, 1kg) for real-time pricing. Inquire directly on WhatsApp or add to your bespoke gift hamper box.
          </p>
        </div>

        {/* Filter & Search Command Center */}
        <div className="mb-10 rounded-3xl border border-gold-200/80 bg-white p-5 shadow-lg transition-all dark:border-gold-800/40 dark:bg-[#1B1511] sm:p-7">
          
          {/* Top Search & Tag Row */}
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Search Input with '/' hotkey hint */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                ref={searchInputRef}
                aria-label="Search the sweets catalog"
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by name, Marathi, or ingredients..."
                className="w-full rounded-full border border-stone-200 bg-stone-50/70 py-2.5 pl-11 pr-14 text-xs font-medium text-stone-800 outline-none transition-all placeholder:text-stone-400 focus:border-gold-500 focus:bg-white focus:ring-2 focus:ring-gold-200/60 dark:border-gold-900/60 dark:bg-[#241D17] dark:text-white dark:focus:border-gold-500 sm:text-sm"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                >
                  Clear
                </button>
              ) : (
                <span className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 rounded border border-stone-200 bg-white px-1.5 py-0.5 text-[10px] font-bold text-stone-400 dark:border-stone-700 dark:bg-stone-800 sm:inline">
                  /
                </span>
              )}
            </div>

            {/* [FIXED] Issue 31: Distinct dietary attribute tags to avoid confusing overlap with categories */}
            <div className="flex w-full flex-wrap items-center justify-start gap-2 md:w-auto md:justify-end">
              <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">Dietary:</span>
              {[
                { id: 'all', label: 'All Items' },
                { id: 'bestseller', label: '★ Bestsellers' },
                { id: 'pure-ghee', label: '🧈 100% Desi Ghee' },
                { id: 'sugar-free', label: '🌱 Sugar-Free' },
                { id: 'dry-fruit', label: '🌰 Dry Fruit' },
              ].map(tag => {
                const isSelected = selectedDietary === tag.id;
                return (
                  <button
                    key={tag.id}
                    onClick={() => setSelectedDietary(tag.id)}
                    aria-pressed={isSelected}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#2F1710] to-[#4A2419] text-[#FFF8ED] shadow-sm ring-1 ring-gold-400/40 dark:from-[#3D1E15] dark:to-[#2A140E]'
                        : 'border border-stone-200 bg-white text-stone-600 hover:border-gold-300 hover:bg-gold-50/50 dark:border-gold-900/40 dark:bg-[#221B16] dark:text-stone-300'
                    }`}
                  >
                    {tag.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sleek Horizontal Category Navigation Rail */}
          <div className="relative mt-6 border-t border-stone-100 pt-5 dark:border-stone-800">
            {/* Left Scroll Button */}
            <button
              onClick={() => scrollRail('left')}
              className="absolute -left-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-gold-300 bg-white text-stone-700 shadow-md transition-all hover:scale-110 hover:bg-gold-50 dark:border-gold-700 dark:bg-[#251E18] dark:text-gold-300"
              title="Scroll categories left"
              aria-label="Scroll categories left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Scrollable Container */}
            <div
              ref={categoryRailRef}
              className="no-scrollbar flex items-center gap-2.5 overflow-x-auto px-7 py-1 scroll-smooth"
            >
              <button
                onClick={() => setActiveCategory('all')}
                className={`shrink-0 rounded-2xl px-4 py-2 text-xs font-bold transition-all ${
                  activeCategory === 'all'
                    ? 'bg-gradient-to-r from-[#2A140E] to-[#43231A] text-white shadow-md ring-2 ring-gold-400/40'
                    : 'border border-stone-200 bg-stone-50 text-stone-700 hover:border-gold-300 hover:bg-gold-50 dark:border-stone-800 dark:bg-[#221B16] dark:text-stone-300'
                }`}
              >
                All ({SWEETS_CATALOG.length})
              </button>

              {CATEGORIES.map(cat => {
                const count = SWEETS_CATALOG.filter(s => s.category === cat.id).length;
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`shrink-0 rounded-2xl px-4 py-2 text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#2A140E] to-[#43231A] text-white shadow-md ring-2 ring-gold-400/40'
                        : 'border border-stone-200 bg-stone-50 text-stone-700 hover:border-gold-300 hover:bg-gold-50 dark:border-stone-800 dark:bg-[#221B16] dark:text-stone-300'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="ml-1.5 text-xs opacity-75">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Right Scroll Button */}
            <button
              onClick={() => scrollRail('right')}
              className="absolute -right-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-gold-300 bg-white text-stone-700 shadow-md transition-all hover:scale-110 hover:bg-gold-50 dark:border-gold-700 dark:bg-[#251E18] dark:text-gold-300"
              title="Scroll categories right"
              aria-label="Scroll categories right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

        </div>

        {/* Counter & Active Filter Bar */}
        <div className="mb-6 flex items-center justify-between px-2 text-xs font-medium text-stone-500 dark:text-stone-400">
          <span>
            Displaying <strong className="text-stone-900 dark:text-white">{Math.min(displayCount, filteredSweets.length)}</strong> of <strong className="text-stone-900 dark:text-white">{filteredSweets.length}</strong> artisanal confections
          </span>
          {searchQuery && (
            <span>Matching: &ldquo;{searchQuery}&rdquo;</span>
          )}
        </div>

        {/* [FIXED] Issue 13: Progressive disclosure with Load More pattern to break up continuous dense catalog */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch">
          {filteredSweets.slice(0, displayCount).map(sweet => {
            const weight = selectedWeights[sweet.id] || '500g';
            const price = weight === '250g'
              ? sweet.price250g || Math.round(sweet.price500g * 0.55)
              : weight === '500g'
              ? sweet.price500g
              : sweet.price1kg;

            return (
              <div
                key={sweet.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gold-200/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/80 hover:shadow-xl dark:border-gold-900/40 dark:bg-[#1C1612]"
              >
                {/* Fixed-Height Visual Container */}
                <div
                  className="relative aspect-[4/3] w-full cursor-pointer overflow-hidden bg-stone-100 dark:bg-stone-900 shrink-0"
                  onClick={() => onSelectSweet(sweet)}
                >
                  <img
                    src={sweet.image}
                    alt={sweet.name}
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Gradient bottom overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Top Status Badges */}
                  <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                    {sweet.isBestseller && (
                      <span className="rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-[#2A140E] shadow-sm">
                        ★ Bestseller
                      </span>
                    )}
                    {sweet.isChefSpecial && !sweet.isBestseller && (
                      <span className="rounded-full bg-black/80 px-2.5 py-0.5 text-xs font-bold text-gold-300 backdrop-blur-sm">
                        Artisan Batch
                      </span>
                    )}
                  </div>

                  {/* Quick View Hover Prompt */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-bold text-[#2A140E] shadow-lg dark:bg-[#1E1713] dark:text-[#FFF8ED]">
                      <Eye className="h-3.5 w-3.5 text-gold-600" />
                      <span>Inspect Dossier</span>
                    </span>
                  </div>

                  {/* Bottom Shelf Life Indicator */}
                  <div className="absolute bottom-2 right-2.5 text-xs font-medium text-white/90">
                    Shelf life: {sweet.shelfLife}
                  </div>
                </div>

                {/* Content Box */}
                <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                  <div>
                    {/* Category Label */}
                    <div className="text-xs font-bold uppercase tracking-widest text-gold-700 dark:text-gold-400">
                      {sweet.categoryName}
                    </div>

                    {/* Sweet Title */}
                    <h3
                      onClick={() => onSelectSweet(sweet)}
                      className="mt-1 font-display text-base font-bold leading-snug text-stone-900 transition-colors hover:text-gold-600 dark:text-white dark:hover:text-gold-400 line-clamp-1 cursor-pointer"
                      title={sweet.name}
                    >
                      {sweet.name}
                    </h3>

                    {/* Marathi Subtitle */}
                    <p className="font-display text-xs font-medium italic text-primary-800 dark:text-gold-400 line-clamp-1">
                      {sweet.marathiName}
                    </p>

                    {/* Description */}
                    <p className="mt-1.5 text-xs leading-relaxed text-stone-500 line-clamp-2 dark:text-stone-400">
                      {sweet.description}
                    </p>
                  </div>

                  {/* [FIXED] Issue 16 & 30: Grouped weight selector and price tightly with enhanced affordance */}
                  <div className="mt-4 border-t border-stone-100 pt-3 dark:border-stone-800/80 space-y-2.5">
                    
                    {/* Price and Portion Segmented Control */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-baseline gap-1">
                        <span className="font-display text-lg font-black text-stone-900 dark:text-white">
                          ₹{price}
                        </span>
                        <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
                          /{weight}
                        </span>
                      </div>

                      {/* [FIXED] Issue 30: Enlarge touch target and improve button affordance */}
                      <div className="flex items-center rounded-lg border border-stone-200 bg-stone-100 p-0.5 dark:border-stone-800 dark:bg-[#251D17]" role="group" aria-label="Select portion size">
                        {(['250g', '500g', '1kg'] as const).map(w => (
                          <button
                            key={w}
                            onClick={() => handleWeightChange(sweet.id, w)}
                            aria-pressed={weight === w}
                            className={`min-h-[30px] rounded-md px-2.5 py-1 text-xs font-bold transition-all ${
                              weight === w
                                ? 'bg-stone-900 text-white shadow-xs dark:bg-gold-500 dark:text-[#2A140E]'
                                : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white'
                            }`}
                          >
                            {w}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* [FIXED] Issue 29: Swapped CTA dominance: Add to Box is primary gold fill, WhatsApp is secondary */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleAddHamper(sweet, weight)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 py-2 px-2.5 text-xs font-bold text-[#2A140E] shadow-sm transition-all hover:brightness-105 active:scale-95"
                        title="Add this sweet to the custom gift box atelier"
                      >
                        <Gift className="h-3.5 w-3.5" />
                        <span>Add to Box</span>
                      </button>

                      <button
                        onClick={() => onOrderQuick(sweet, weight, price)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-stone-200 bg-white py-2 px-2.5 text-xs font-bold text-stone-800 transition-all hover:bg-stone-50 active:scale-95 dark:border-stone-700 dark:bg-[#221B16] dark:text-stone-200 dark:hover:bg-stone-800"
                      >
                        <MessageCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>WhatsApp</span>
                      </button>
                    </div>

                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* [FIXED] Issue 13: Load More Button for progressive catalog expansion */}
        {displayCount < filteredSweets.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setDisplayCount(prev => Math.min(prev + 12, filteredSweets.length))}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 px-8 py-3.5 text-xs font-bold text-[#2A140E] shadow-luxury transition-all hover:scale-105 active:scale-95"
            >
              <span>Load More Confections ({filteredSweets.length - displayCount} remaining)</span>
            </button>
          </div>
        )}

        {/* Empty Catalog Fallback */}
        {filteredSweets.length === 0 && (
          <div className="my-12 rounded-3xl border border-gold-200 bg-white p-12 text-center dark:border-gold-800/40 dark:bg-[#1C1612]">
            <p className="text-sm text-stone-500 dark:text-stone-400">
              No mithai found matching &ldquo;{searchQuery || selectedDietary}&rdquo;. Try another name or reset filters.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedDietary('all');
                setSearchQuery('');
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold-600 px-5 py-2 text-xs font-bold text-white transition-all hover:bg-gold-700"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
