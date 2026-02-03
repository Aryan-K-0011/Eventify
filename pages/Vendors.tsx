import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Vendor } from '../types';
import Button from '../components/Button';
import { Star, MapPin, Check, Plus, Minus, Search, Crown, X } from 'lucide-react';

const Vendors: React.FC = () => {
  const { vendors } = useData(); // USE DYNAMIC DATA FROM CONTEXT
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [compareList, setCompareList] = useState<Vendor[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const toggleCompare = (vendor: Vendor) => {
    if (compareList.find(v => v.id === vendor.id)) {
      setCompareList(compareList.filter(v => v.id !== vendor.id));
    } else {
      if (compareList.length < 3) {
        setCompareList([...compareList, vendor]);
      } else {
        alert("Select up to 3 artisans for comparison.");
      }
    }
  };

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          vendor.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || vendor.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = ['All', ...Array.from(new Set(vendors.map(v => v.category)))];

  return (
    <div className="bg-luxBlack min-h-screen relative text-white selection:bg-luxGold selection:text-black">
      
      {/* 1. CINEMATIC HEADER (Updated to match Home/Categories) */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden mb-20">
         <div className="absolute inset-0">
            <img 
               src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2000" 
               alt="Luxury Venue" 
               className="w-full h-full object-cover opacity-50 animate-ken-burns"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxBlack via-black/40 to-transparent"></div>
         </div>
         
         <div className="relative z-10 text-center space-y-8 px-4 animate-fade-in-up w-full max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 border border-luxGold/40 px-6 py-2 rounded-full bg-black/30 backdrop-blur-md shadow-2xl">
                <Crown size={14} className="text-luxGold" />
                <span className="text-xs uppercase tracking-[0.3em] text-luxGoldLight font-bold">The Black Book</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-royal tracking-tighter text-white drop-shadow-2xl leading-none">
               Elite <br/> <span className="italic font-serif text-luxGold">Partners</span>
            </h1>
            
            <p className="max-w-xl mx-auto text-gray-200 font-light text-lg md:text-xl leading-relaxed mix-blend-lighten">
               Access our invite-only network of world-class venues, caterers, and creatives.
            </p>
         </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters - Minimalist */}
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-white/10 pb-8 sticky top-24 z-30 bg-luxBlack/95 backdrop-blur-md pt-4">
            <div className="flex gap-6 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
              {uniqueCategories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-sm uppercase tracking-widest transition-all whitespace-nowrap px-2 ${
                    selectedCategory === cat 
                      ? 'text-luxGold border-b border-luxGold pb-1 scale-105' 
                      : 'text-gray-500 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <input 
                type="text" 
                placeholder="Search Directory..." 
                className="w-full bg-transparent border-b border-gray-700 text-white py-2 pl-0 pr-8 focus:outline-none focus:border-luxGold transition-colors placeholder-gray-600 text-sm font-light uppercase tracking-wide"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-0 top-2 text-luxGold" size={16} />
            </div>
        </div>

        {/* Vendor List - Large Cards with Glassmorphism */}
        {filteredVendors.length > 0 ? (
          <div className="grid grid-cols-1 gap-24 pb-32">
            {filteredVendors.map((vendor, index) => {
              const isSelected = compareList.some(v => v.id === vendor.id);
              const isEven = index % 2 === 0;

              return (
                <div key={vendor.id} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center group`}>
                  
                  {/* Image Side */}
                  <div className="w-full md:w-3/5 h-[500px] overflow-hidden relative rounded-sm shadow-2xl">
                     <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
                     <img src={vendor.imageUrl} alt={vendor.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s] ease-in-out transform group-hover:scale-110" />
                     
                     {/* Floating Category Badge */}
                     <div className="absolute top-8 left-8 z-20 overflow-hidden">
                        <div className="bg-luxBlack/80 text-luxGold px-4 py-2 text-xs uppercase tracking-[0.2em] backdrop-blur-md border border-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                          {vendor.category}
                        </div>
                     </div>
                  </div>

                  {/* Content Side */}
                  <div className="w-full md:w-2/5 space-y-8 relative">
                    {/* Decorative Line */}
                    <div className={`absolute top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-luxGold/20 to-transparent ${isEven ? '-left-6' : '-right-6'} hidden md:block`}></div>

                    <div className="flex justify-between items-center">
                       <span className="text-gray-500 text-sm tracking-widest uppercase border border-gray-800 px-3 py-1 rounded-full">{vendor.priceRange}</span>
                       <div className="flex items-center text-luxGold">
                          <Star size={16} fill="currentColor" />
                          <span className="ml-2 text-white font-serif text-lg">{vendor.rating}</span>
                       </div>
                    </div>
                    
                    <h3 className="text-5xl font-royal text-white group-hover:text-luxGoldLight transition-colors duration-500">{vendor.name}</h3>
                    
                    <div className="flex items-center text-gray-400 text-sm font-light uppercase tracking-wider">
                      <MapPin size={16} className="mr-3 text-luxGold" />
                      {vendor.location}
                    </div>
                    
                    <p className="text-gray-300 font-light leading-relaxed text-lg border-l-2 border-luxGold/30 pl-4">
                      {vendor.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {vendor.services.slice(0, 3).map(service => (
                        <span key={service} className="text-xs text-gray-400 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                          {service}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4 pt-6">
                       <Button variant={isSelected ? "secondary" : "outline"} size="md" onClick={() => toggleCompare(vendor)} className="flex-1">
                          {isSelected ? (
                            <><Check size={16} className="mr-2" /> Selected</>
                          ) : (
                            <><Plus size={16} className="mr-2" /> Compare</>
                          )}
                       </Button>
                       <Button variant="primary" size="md" className="flex-1">Inquire</Button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 font-light">
             <p>No artisans available for this criteria.</p>
          </div>
        )}

        {/* Comparison Floating Bar - Luxury Dark */}
        {compareList.length > 0 && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl bg-luxBlack/90 backdrop-blur-xl border border-luxGold/30 z-50 rounded-full shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-[slideUp_0.5s_cubic-bezier(0.16,1,0.3,1)]">
            <div className="px-8 py-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-8">
                  <span className="font-royal text-white text-lg">Selection <span className="text-luxGold">({compareList.length})</span></span>
                  <div className="flex gap-4">
                    {compareList.map(v => (
                      <div key={v.id} className="relative group cursor-pointer w-12 h-12 rounded-full overflow-hidden border-2 border-luxGold" onClick={() => toggleCompare(v)}>
                        <img src={v.imageUrl} alt={v.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Minus size={14} className="text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                   <button 
                    onClick={() => setCompareList([])}
                    className="text-gray-400 hover:text-white text-xs uppercase tracking-widest transition-colors mr-4"
                   >
                     Clear
                   </button>
                   <Button variant="gold" size="sm" className="rounded-full px-8" onClick={() => setIsCompareModalOpen(true)}>Compare Selection</Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* COMPARISON MODAL - Full Screen Overlay */}
        {isCompareModalOpen && (
            <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10 animate-fade-in-up">
                {/* Close Button */}
                <button 
                    onClick={() => setIsCompareModalOpen(false)}
                    className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white hover:rotate-90 transition-all duration-300 z-50"
                >
                    <X size={40} strokeWidth={1} />
                </button>
                
                <div className="w-full h-full max-w-7xl overflow-hidden flex flex-col relative">
                    <div className="text-center mb-12 shrink-0">
                         <div className="inline-block border border-luxGold/30 px-4 py-1 rounded-full mb-4">
                             <span className="text-[10px] uppercase tracking-[0.3em] text-luxGold">Analysis Protocol</span>
                         </div>
                         <h2 className="text-4xl md:text-5xl font-royal text-white">Comparative <span className="italic text-luxGold font-serif">Assessment</span></h2>
                    </div>
                    
                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
                            {compareList.map((vendor, idx) => (
                                <div key={vendor.id} className="relative bg-white/5 border border-white/10 rounded-sm flex flex-col group hover:border-luxGold/30 transition-colors duration-500">
                                    {/* Number Watermark */}
                                    <div className="absolute -top-10 -right-4 text-[120px] font-royal text-white/5 pointer-events-none select-none">0{idx + 1}</div>

                                    {/* Header Image */}
                                    <div className="h-64 relative overflow-hidden shrink-0">
                                         <div className="absolute inset-0 bg-luxBlack/20 group-hover:bg-transparent transition-all z-10"></div>
                                         <img src={vendor.imageUrl} alt={vendor.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s]" />
                                    </div>

                                    <div className="p-8 flex flex-col flex-1 gap-8 relative z-10">
                                        <div className="text-center border-b border-white/5 pb-6">
                                            <h3 className="text-2xl font-royal text-white mb-2">{vendor.name}</h3>
                                            <p className="text-xs uppercase tracking-[0.2em] text-luxGold">{vendor.category}</p>
                                        </div>

                                        {/* Specs */}
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-500 text-xs uppercase tracking-widest">Investment Tier</span>
                                                <span className="text-xl font-serif text-white">{vendor.priceRange}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-500 text-xs uppercase tracking-widest">Global Rating</span>
                                                <span className="text-white flex items-center gap-2"><Star size={14} className="text-luxGold fill-current" /> {vendor.rating} <span className="text-gray-600 text-[10px]">({vendor.reviews})</span></span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-500 text-xs uppercase tracking-widest">Location</span>
                                                <span className="text-white text-right text-sm">{vendor.location}</span>
                                            </div>
                                        </div>

                                        {/* Services List */}
                                        <div className="bg-black/20 p-4 rounded-sm border border-white/5">
                                            <p className="text-[10px] uppercase text-gray-500 mb-4 tracking-widest text-center">Exclusive Inclusions</p>
                                            <ul className="space-y-3">
                                                {vendor.services.map(s => (
                                                    <li key={s} className="flex items-start gap-3 text-xs text-gray-300">
                                                        <Check size={12} className="text-luxGold mt-0.5 shrink-0" /> {s}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        
                                        <div className="mt-auto pt-4">
                                           <Button variant="primary" className="w-full !py-4">Proceed with {vendor.name.split(' ')[0]}</Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            {/* Empty Slots for aesthetic balance if < 3 */}
                            {compareList.length < 3 && Array.from({ length: 3 - compareList.length }).map((_, i) => (
                                <div key={i} className="hidden md:flex border border-dashed border-white/10 rounded-sm items-center justify-center opacity-30">
                                    <p className="text-xs uppercase tracking-widest text-gray-500">Slot Available</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default Vendors;