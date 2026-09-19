// [ADDED] SweetCatalog component with fixed-height equalized cards, aligned bottom rows, and complete dark mode support
import React, { useState, useMemo, useRef } from 'react';
import { Search, Sparkles, Eye, Star, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { SWEETS_CATALOG, CATEGORIES, SweetItem } from '../data/sweetsData';

interface SweetCatalogProps {
  onSelectSweet: (sweet: SweetItem) => void;
  onOrderQuick: (sweet: SweetItem, weight: string, price: number) => void;
}

export const SweetCatalog: React.FC<SweetCatalogProps> = ({ onSelectSweet, onOrderQuick }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  
  // Category carousel scroll controller
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  // Track selected weight per sweet ID: '250g' | '500g' | '1kg'
  const [selectedWeights, setSelectedWeights] = useState<Record<string, '250g' | '500g' | '1kg'>>({});

  const handleWeightChange = (sweetId: string, weight: '250g' | '500g' | '1kg') => {
    setSelectedWeights(prev => ({ ...prev, [sweetId]: weight }));
  };

  // Filtered sweets memo
  const filteredSweets = useMemo(() => {
    return SWEETS_CATALOG.filter(sweet => {
      // Category filter
      if (activeCategory !== 'all' && sweet.category !== activeCategory) {
        return false;
      }
      // Tag filter
      if (selectedTag === 'bestseller' && !sweet.isBestseller) return false;
      if (selectedTag === 'chefSpecial' && !sweet.isChefSpecial) return false;
      if (selectedTag === 'pure-ghee' && !sweet.dietary.includes('pure-ghee')) return false;
      if (selectedTag === 'sugar-free' && !sweet.dietary.includes('sugar-free')) return false;

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
  }, [activeCategory, selectedTag, searchQuery]);

  return (
    <section id="menu" className="py-16 sm:py-24 bg-ivory-50/70 dark:bg-[#12100E] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-100 dark:bg-gold-950/50 text-gold-900 dark:text-gold-300 text-xs font-bold uppercase tracking-wider border border-gold-200 dark:border-gold-800/40">
            <Sparkles className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" />
            <span>Complete Sweet & Namkeen Catalog</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Handcrafted with <span className="text-gold-gradient">Love & Devotion</span>
          </h2>
          <p className="font-serif italic text-gold-700 dark:text-gold-400 text-base sm:text-lg">
            प्रत्येक सणासाठी आणि आनंदाच्या क्षणासाठी ५०+ पारंपरिक गोड पदार्थ
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
            Select weight (250g, 500g, 1kg) for real-time pricing. Click any sweet for allergens, shelf life, and instant WhatsApp inquiry.
          </p>
        </div>

        {/* Search & Filter Controls Bar */}
        <div className="bg-white dark:bg-[#1A1613] rounded-3xl p-4 sm:p-6 shadow-md border border-gold-200/80 dark:border-gold-800/40 mb-8 space-y-4 transition-colors">
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Live Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                aria-label="Search the sweets catalog"
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by name or Marathi (e.g. Kaju, मोदक, Samosa)..."
                className="w-full pl-11 pr-4 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#221D18] text-slate-800 dark:text-white placeholder-slate-400 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 dark:focus:ring-gold-900 text-xs sm:text-sm outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Dietary Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
              <button
                onClick={() => setSelectedTag('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedTag === 'all'
                    ? 'bg-slate-900 dark:bg-gold-600 text-white'
                    : 'bg-slate-100 dark:bg-[#25201A] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#2F2922]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedTag('bestseller')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
                  selectedTag === 'bestseller'
                    ? 'bg-gold-600 text-white'
                    : 'bg-gold-50 dark:bg-gold-950/40 text-gold-800 dark:text-gold-300 hover:bg-gold-100 border border-gold-200 dark:border-gold-800/40'
                }`}
              >
                <Star className="w-3 h-3 fill-current" />
                <span>Bestsellers</span>
              </button>
              <button
                onClick={() => setSelectedTag('pure-ghee')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedTag === 'pure-ghee'
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 hover:bg-amber-100 border border-amber-200 dark:border-amber-800/40'
                }`}
              >
                🧈 100% Desi Ghee
              </button>
              <button
                onClick={() => setSelectedTag('sugar-free')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedTag === 'sugar-free'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 hover:bg-emerald-100 border border-emerald-200 dark:border-emerald-800/40'
                }`}
              >
                🌱 Sugar-Free
              </button>
            </div>
          </div>

          {/* Category Navigation Pills with Interactive Scroll Controls */}
          {/* [FIXED]: Added Left & Right scroll buttons, mouse wheel horizontal scrolling, and visual category count */}
          <div className="relative pt-2 border-t border-slate-100 dark:border-slate-800">
            {/* Left Scroll Button */}
            <button
              onClick={() => scrollCategories('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 dark:bg-[#1E1914]/95 shadow-lg border border-gold-300 dark:border-gold-700 text-slate-800 dark:text-gold-300 hover:bg-gold-50 dark:hover:bg-[#2A231D] hover:scale-110 active:scale-95 flex items-center justify-center transition-all cursor-pointer"
              title="Scroll categories left"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4 text-gold-600 dark:text-gold-400" />
            </button>

            {/* Scrollable Container with onWheel & smooth scroll */}
            <div
              ref={categoryScrollRef}
              onWheel={(e) => {
                if (e.deltaY !== 0 && categoryScrollRef.current) {
                  categoryScrollRef.current.scrollLeft += e.deltaY;
                }
              }}
              className="overflow-x-auto pb-2 px-9 sm:px-10 scroll-smooth"
            >
              <div className="flex items-center gap-2 w-max px-1">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-300 flex-shrink-0 cursor-pointer ${
                    activeCategory === 'all'
                      ? 'bg-[#3a2119] text-white shadow-md shadow-gold-500/25 scale-105'
                      : 'bg-slate-50 dark:bg-[#221D18] text-slate-700 dark:text-slate-300 hover:bg-gold-50 dark:hover:bg-[#2A231D] hover:text-gold-900 dark:hover:text-gold-300 border border-slate-200 dark:border-slate-700 hover:border-gold-300'
                  }`}
                >
                  All Sweets ({SWEETS_CATALOG.length})
                </button>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-300 flex-shrink-0 cursor-pointer ${
                      activeCategory === cat.id
                        ? 'bg-[#3a2119] text-white shadow-md shadow-gold-500/25 scale-105'
                        : 'bg-slate-50 dark:bg-[#221D18] text-slate-700 dark:text-slate-300 hover:bg-gold-50 dark:hover:bg-[#2A231D] hover:text-gold-900 dark:hover:text-gold-300 border border-slate-200 dark:border-slate-700 hover:border-gold-300'
                    }`}
                  >
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Scroll Button */}
            <button
              onClick={() => scrollCategories('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 dark:bg-[#1E1914]/95 shadow-lg border border-gold-300 dark:border-gold-700 text-slate-800 dark:text-gold-300 hover:bg-gold-50 dark:hover:bg-[#2A231D] hover:scale-110 active:scale-95 flex items-center justify-center transition-all cursor-pointer"
              title="Scroll categories right"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4 text-gold-600 dark:text-gold-400" />
            </button>
          </div>

          {/* Quick Category Indicator Helper */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-stone-500 px-1 pt-1">
            <span>← Click arrows or scroll wheel to explore all {CATEGORIES.length} sweet & snack categories →</span>
            <span className="font-semibold text-gold-700 dark:text-gold-400 hidden sm:inline">
              {CATEGORIES.length} Categories
            </span>
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-6 px-1" aria-live="polite">
          <span>
            Showing <strong>{filteredSweets.length}</strong> confections in catalog
          </span>
          {searchQuery && (
            <span>Filtered by: &ldquo;{searchQuery}&rdquo;</span>
          )}
        </div>

        {/* Sweets Grid - Uniform Fixed-Height Equalized Cards with Zero Awkward Gaps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 items-stretch">
          {filteredSweets.map(sweet => {
            const weight = selectedWeights[sweet.id] || '500g';
            const price = weight === '250g' ? sweet.price250g : weight === '500g' ? sweet.price500g : sweet.price1kg;

            // [ADDED]: Luxury card hover elevation, glow, and micro-interactions
            return (
              <div
                key={sweet.id}
                className="bg-white dark:bg-[#1A1613] rounded-3xl overflow-hidden border border-gold-200/70 dark:border-gold-800/40 shadow-sm hover:shadow-2xl hover:shadow-gold-500/15 hover:-translate-y-1.5 transition-all duration-500 flex flex-col h-full group"
              >
                {/* Fixed-Height Image Container (Guarantees identical dimensions across all 55 sweets) */}
                <div
                  className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 dark:bg-stone-900 cursor-pointer flex-shrink-0"
                  onClick={() => onSelectSweet(sweet)}
                >
                  <img
                    src={sweet.image}
                    alt={sweet.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  
                  {/* Bestseller / Special Ribbons */}
                  {sweet.isBestseller && (
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-gold-600 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                      ★ Bestseller
                    </div>
                  )}
                  {sweet.isChefSpecial && !sweet.isBestseller && (
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-900/90 dark:bg-black/90 text-gold-300 text-[10px] font-black uppercase tracking-wider shadow-md">
                      Chef Special
                    </div>
                  )}

                  {/* Cutout Miniature Floating Preview if available */}
                  {sweet.cutoutImage && (
                    <div className="absolute bottom-2 right-2 w-11 h-11 pointer-events-none drop-shadow-md">
                      <img src={sweet.cutoutImage} alt="" className="w-full h-full object-contain" />
                    </div>
                  )}

                  {/* Quick View Hover Prompt */}
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="px-3 py-1.5 rounded-full bg-white/95 dark:bg-[#1E1914] text-slate-900 dark:text-white text-xs font-bold flex items-center gap-1.5 shadow">
                      <Eye className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" />
                      <span>Quick View</span>
                    </span>
                  </div>
                </div>

                {/* Content Box - Equalized flex column with mt-auto bottom bar */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  
                  <div>
                    {/* Category Label */}
                    <div className="text-[10px] font-bold tracking-wider uppercase text-gold-700 dark:text-gold-400">
                      {sweet.categoryName}
                    </div>

                    {/* Sweet Title - Controlled height so adjacent cards stay strictly aligned */}
                    <div className="min-h-[2.6rem] flex items-center mt-0.5">
                      <h3
                        onClick={() => onSelectSweet(sweet)}
                        className="font-display text-sm sm:text-base font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-gold-700 dark:group-hover:text-gold-400 transition-colors cursor-pointer leading-snug"
                        title={sweet.name}
                      >
                        {sweet.name}
                      </h3>
                    </div>

                    {/* Marathi Name */}
                    <p className="text-xs font-serif italic text-gold-600 dark:text-gold-400 truncate font-medium mt-0.5">
                      {sweet.marathiName}
                    </p>

                    {/* Short Description */}
                    <p className="text-xs text-slate-500 dark:text-stone-400 line-clamp-2 mt-1.5 leading-relaxed">
                      {sweet.description}
                    </p>
                  </div>

                  {/* Clean, Unified Weight Selector & Dynamic Price Action Bar */}
                  <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-stone-800/80 space-y-2.5">
                    {/* Weight & Price Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-black text-slate-900 dark:text-white">₹{price}</span>
                        <span className="text-[11px] text-slate-400 dark:text-stone-500">/{weight}</span>
                      </div>

                      {/* Compact Segmented Portion Control */}
                      <div className="flex items-center bg-slate-100 dark:bg-[#231D18] rounded-lg p-0.5 border border-slate-200/60 dark:border-stone-800">
                        {(['250g', '500g', '1kg'] as const).map(w => (
                          <button
                            key={w}
                            onClick={() => handleWeightChange(sweet.id, w)}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                              weight === w
                                ? 'bg-white dark:bg-[#382F26] text-slate-900 dark:text-gold-300 shadow-xs'
                                : 'text-slate-500 dark:text-stone-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                          >
                            {w}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Order / Inquire CTA Button */}
                    <button
                      onClick={() => onOrderQuick(sweet, weight, price)}
                      className="w-full py-2.5 px-3 rounded-xl bg-gold-50 dark:bg-gold-950/40 hover:bg-[#3a2119] text-gold-900 dark:text-gold-200 hover:text-white dark:hover:text-white border border-gold-300 dark:border-gold-700/60 hover:border-[#3a2119] text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 shadow-xs hover:shadow-md cursor-pointer hover:-translate-y-0.5 active:scale-95 group-hover:bg-[#3a2119] group-hover:text-white group-hover:border-[#3a2119]"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                      <span>Order on WhatsApp / Inquire</span>
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* No Results Fallback */}
        {filteredSweets.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-[#1A1613] rounded-3xl border border-gold-200 dark:border-gold-800/40 p-8 space-y-3">
            <p className="text-slate-500 dark:text-slate-400 text-sm">No sweets match those selections just now. Try clearing a filter or searching by a broader name.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedTag('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-full bg-gold-600 text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
