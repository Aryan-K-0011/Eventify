import React from 'react';
import { CATEGORIES } from '../constants';
import * as Icons from 'lucide-react';
import { ArrowRight, Sparkles, Crown, Diamond, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Categories: React.FC = () => {
  return (
    <div className="bg-luxBlack min-h-screen text-white selection:bg-luxGold selection:text-black font-sans">
      
      {/* 1. COMPACT HERO SECTION */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        {/* Background */}
        <div className="absolute inset-0">
            <div className="absolute inset-0 bg-luxBlack/50 z-10"></div>
            <img 
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2000" 
                className="w-full h-full object-cover opacity-60 animate-[pulse_10s_ease-in-out_infinite]"
                alt="Luxury Background" 
            />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 z-10"></div>
        </div>

        <div className="relative z-20 text-center space-y-6 max-w-4xl px-6 animate-fade-in-up">
            <div className="flex justify-center mb-2">
                <div className="border border-white/20 bg-white/5 backdrop-blur-md px-4 py-1 rounded-full flex items-center gap-2">
                    <Crown size={14} className="text-luxGold" />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold">The Archives</span>
                </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-royal text-white tracking-tighter drop-shadow-2xl">
                Collections
            </h1>
            <p className="text-xl font-serif italic text-luxGold">
                "Architecture for the soul."
            </p>
        </div>
      </section>

      {/* 2. STAGGERED GRID LAYOUT */}
      <section className="py-20 bg-luxBlack relative">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
               {CATEGORIES.map((category, index) => {
                  // Stagger logic: Apply top margin to the second column elements on desktop
                  const isSecondColumn = index % 2 !== 0; 
                  const IconComponent = (Icons as any)[category.iconName] || Icons.Star;

                  return (
                     <div 
                        key={category.id} 
                        className={`group relative flex flex-col ${isSecondColumn ? 'md:mt-32' : ''}`}
                     >
                        {/* Image Card */}
                        <div className="relative aspect-[3/4] overflow-hidden mb-8 border border-white/10 group-hover:border-luxGold/50 transition-colors duration-500">
                           <div className="absolute inset-0 bg-luxBlack/20 group-hover:bg-transparent transition-all z-10"></div>
                           <img 
                              src={category.imageUrl} 
                              alt={category.title} 
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s] ease-out transform group-hover:scale-105"
                           />
                           
                           {/* Floating Number */}
                           <div className="absolute top-4 right-4 font-royal text-6xl text-white/10 group-hover:text-white/30 transition-colors z-20 pointer-events-none select-none">
                              0{index + 1}
                           </div>

                           {/* Icon Badge */}
                           <div className="absolute bottom-6 left-6 w-12 h-12 bg-luxBlack/80 backdrop-blur-md border border-white/20 flex items-center justify-center rounded-full text-luxGold z-20">
                               <IconComponent size={20} strokeWidth={1.5} />
                           </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-6">
                           <div>
                              <h2 className="text-4xl font-royal text-white mb-3 group-hover:text-luxGoldLight transition-colors duration-300">
                                 {category.title}
                              </h2>
                              <p className="text-gray-400 font-light leading-relaxed border-l border-luxGold/30 pl-4 text-sm">
                                 {category.description}
                              </p>
                           </div>

                           {/* Mini Specs */}
                           <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-white/5">
                              <div>
                                 <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Investment</p>
                                 <p className="text-xl font-serif text-white">{category.expectedBudget}</p>
                              </div>
                              <div>
                                 <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Inclusions</p>
                                 <p className="text-xs text-gray-300">{category.features.length} Premium Services</p>
                              </div>
                           </div>

                           {/* Features List Preview */}
                           <ul className="space-y-2">
                              {category.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                                  <span className="w-1 h-1 bg-luxGold rounded-full mt-1.5 shrink-0"></span>
                                  {feature}
                                </li>
                              ))}
                           </ul>

                           {/* Action */}
                           <div className="flex gap-4 pt-4">
                              <Link 
                                to="/contact" 
                                state={{ inquiryContext: `Inquiry regarding collection: ${category.title}` }}
                                className="flex-1"
                              >
                                 <button className="w-full py-3 border border-white/20 text-white text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 group/btn">
                                    Inquire
                                 </button>
                              </Link>
                              <Link to="/planner" className="flex-1">
                                 <button className="w-full py-3 bg-white/5 text-gray-300 text-xs uppercase tracking-widest hover:text-luxGold hover:bg-luxGold/10 transition-all duration-300 flex items-center justify-center gap-2">
                                    <Sparkles size={12} /> Customize
                                 </button>
                              </Link>
                           </div>
                        </div>
                     </div>
                  )
               })}
            </div>
         </div>
      </section>

      {/* 3. FOOTER CTA */}
      <section className="py-32 bg-luxPaper text-luxBlack text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <div className="max-w-3xl mx-auto px-6 relative z-10">
              <h2 className="text-5xl font-royal mb-6">Unclassified?</h2>
              <p className="text-lg text-gray-600 font-light mb-10 leading-relaxed">
                  True luxury cannot always be categorized. For visions that defy definition, we offer the <span className="italic font-serif">Blank Canvas</span> service.
              </p>
              <Link to="/contact">
                  <button className="px-10 py-4 bg-luxBlack text-white uppercase tracking-[0.2em] font-bold hover:bg-luxGold hover:text-black transition-colors duration-300 shadow-2xl text-xs">
                      Request Bespoke
                  </button>
              </Link>
          </div>
      </section>

    </div>
  );
};

export default Categories;