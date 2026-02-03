import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Diamond, PlayCircle, Crown, MoveRight, Sparkles, Flower } from 'lucide-react';
import Button from '../components/Button';
import LuxuryFireworks from '../components/LuxuryFireworks';
import { CATEGORIES } from '../constants';

// --- COMPONENTS LOCAL TO HOME (For advanced effects) ---

// 1. Infinite Marquee Component
const InfiniteMarquee = () => (
  <div className="bg-luxGold py-4 overflow-hidden relative z-20 border-y border-white/10">
    <div className="whitespace-nowrap animate-marquee flex items-center space-x-12">
      {[...Array(10)].map((_, i) => (
        <React.Fragment key={i}>
          <span className="text-luxBlack font-royal text-sm tracking-[0.4em] uppercase font-bold">Eventify Exclusive</span>
          <Diamond size={8} className="text-luxBlack fill-current" />
          <span className="text-luxBlack font-royal text-sm tracking-[0.4em] uppercase font-bold">Beyond Perfection</span>
          <Diamond size={8} className="text-luxBlack fill-current" />
        </React.Fragment>
      ))}
    </div>
  </div>
);

// 2. Parallax Image Component
const ParallaxImage = ({ src, speed = 1, className }: { src: string, speed?: number, className?: string }) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <img 
        src={src} 
        alt="Luxury" 
        className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-110"
      />
    </div>
  );
};

const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-luxBlack">
      
      {/* ================= HERO SECTION: THE GATES OF HEAVEN ================= */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Cinematic Background Video */}
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-luxBlack z-10"></div>
           <video 
             autoPlay 
             muted 
             loop 
             playsInline 
             className="w-full h-full object-cover scale-105"
             style={{ transform: `translateY(${scrollY * 0.5}px)` }} // Parallax Effect
           >
             <source src="https://assets.mixkit.co/videos/5213/5213-720.mp4" type="video/mp4" />
           </video>
        </div>

        {/* Floating Fireworks */}
        <div className="absolute inset-0 z-10 opacity-60 mix-blend-screen">
            <LuxuryFireworks />
        </div>

        {/* Main Content */}
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
            
            {/* Animated Badge */}
            <div className="animate-float mb-8 border border-white/30 backdrop-blur-md rounded-full px-6 py-2 bg-white/5">
                <span className="text-luxGoldLight text-xs tracking-[0.3em] uppercase font-bold flex items-center gap-2">
                    <Crown size={14} /> Est. 2024 • The Royal Standard
                </span>
            </div>

            {/* Giant Typography */}
            <h1 className="font-royal text-6xl md:text-9xl text-white leading-none tracking-tighter mb-6 drop-shadow-2xl">
               <span className="block opacity-0 animate-fade-in-up [animation-delay:0.2s]">HEAVEN</span>
               <span className="block italic font-serif text-luxGold opacity-0 animate-fade-in-up [animation-delay:0.5s] text-5xl md:text-8xl mt-2">
                 on Earth
               </span>
            </h1>

            <p className="max-w-xl text-gray-200 text-lg md:text-xl font-light leading-relaxed mb-10 opacity-0 animate-fade-in-up [animation-delay:0.8s] mix-blend-difference">
                Orchestrating the world's most exquisite celebrations. Where vision transcends reality.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row gap-6 opacity-0 animate-fade-in-up [animation-delay:1.1s]">
                <Link to="/categories">
                    <button className="group relative px-8 py-4 bg-luxGold overflow-hidden rounded-none">
                        <div className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                        <span className="relative text-luxBlack font-bold uppercase tracking-widest text-xs flex items-center">
                            Explore Collections <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>
                </Link>
                <Link to="/contact">
                   <button className="px-8 py-4 border border-white/30 backdrop-blur-sm text-white hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-widest text-xs font-bold">
                       Private Inquire
                   </button>
                </Link>
            </div>
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-bounce">
            <span className="text-[10px] text-white/60 uppercase tracking-widest mb-2">Scroll to Ascend</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-luxGold to-transparent"></div>
        </div>
      </section>

      {/* ================= INFINITE MARQUEE ================= */}
      <InfiniteMarquee />

      {/* ================= PHILOSOPHY: FLOATING ELEMENTS ================= */}
      <section className="py-40 bg-luxPaper text-luxBlack relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/50 to-transparent pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div className="relative z-10">
                  <div className="absolute -top-20 -left-20 text-[200px] font-royal text-luxGold/10 select-none">I.</div>
                  <h2 className="text-6xl md:text-8xl font-serif leading-[0.9] mb-8 relative">
                      The Art of <br/> 
                      <span className="italic text-luxGold">Gathering</span>
                  </h2>
                  <p className="text-xl text-gray-600 font-light leading-relaxed mb-8 border-l-2 border-luxGold pl-6">
                      "We believe an event is not merely a function, but a living piece of art. It breathes, it moves, and it leaves an indelible mark on the soul."
                  </p>
                  <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-luxGoldDim">
                      <Sparkles size={16} /> Curated by Eventify
                  </div>
              </div>

              {/* Floating Images Composition */}
              <div className="relative h-[600px] w-full">
                  <div className="absolute top-0 right-10 w-64 h-80 z-20 animate-float shadow-2xl">
                      <img src="https://media.gettyimages.com/id/1239991641/video/table-decoration-wedding-dinner-wedding-ceremony.jpg?s=640x640&k=20&c=I8jYMI_1FFIygxwATqzASvZmmz6lUzaEe8_FB-QY-gY=" className="w-full h-full object-cover" alt="Table" />
                  </div>
                  <div className="absolute bottom-10 left-10 w-72 h-96 z-10 animate-float-delayed shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
                      <img src="https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800" className="w-full h-full object-cover" alt="Toast" />
                  </div>
                  {/* Decorative Circle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-luxGold/20 rounded-full animate-slow-spin"></div>
              </div>
          </div>
      </section>

      {/* ================= CINEMATIC REEL: THE GOLDEN HOUR ================= */}
      <section className="bg-luxBlack py-32 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-luxGold/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 mb-16 flex justify-between items-end relative z-10">
              <h2 className="text-5xl font-serif text-white">Captured Moments</h2>
              <div className="text-right hidden md:block">
                  <p className="text-luxGold text-xs uppercase tracking-widest">Live Footage</p>
                  <p className="text-white/50 text-sm">Experience the atmosphere</p>
              </div>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="flex overflow-x-auto gap-8 px-6 pb-8 no-scrollbar snap-x snap-mandatory">
              {/* Video Card 1 */}
              <div className="min-w-[85vw] md:min-w-[600px] h-[700px] relative group snap-center rounded-sm overflow-hidden cursor-none">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500 z-10"></div>
                  <video autoPlay muted loop playsInline className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s]">
                      <source src="https://assets.mixkit.co/videos/5224/5224-720.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute bottom-10 left-10 z-20">
                      <span className="text-xs font-bold text-luxBlack bg-luxGold px-2 py-1 uppercase tracking-widest mb-2 inline-block">Romance</span>
                      <h3 className="text-4xl font-royal text-white">The Royal Union</h3>
                  </div>
              </div>

               {/* Video Card 2 */}
               <div className="min-w-[85vw] md:min-w-[600px] h-[700px] relative group snap-center rounded-sm overflow-hidden cursor-none">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500 z-10"></div>
                  <video autoPlay muted loop playsInline className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s]">
                      <source src="https://assets.mixkit.co/videos/5223/5223-720.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute bottom-10 left-10 z-20">
                      <span className="text-xs font-bold text-luxBlack bg-luxGold px-2 py-1 uppercase tracking-widest mb-2 inline-block">Gala</span>
                      <h3 className="text-4xl font-royal text-white">Midnight Soirée</h3>
                  </div>
              </div>

               {/* Video Card 3 */}
               <div className="min-w-[85vw] md:min-w-[600px] h-[700px] relative group snap-center rounded-sm overflow-hidden cursor-none">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500 z-10"></div>
                  <video autoPlay muted loop playsInline className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s]">
                      <source src="https://assets.mixkit.co/videos/18204/18204-720.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute bottom-10 left-10 z-20">
                      <span className="text-xs font-bold text-luxBlack bg-luxGold px-2 py-1 uppercase tracking-widest mb-2 inline-block">Party</span>
                      <h3 className="text-4xl font-royal text-white">Electric Energy</h3>
                  </div>
              </div>
          </div>
      </section>

      {/* ================= INTERACTIVE SERVICES REVEAL ================= */}
      <section className="bg-luxPaper py-32">
          <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-20">
                  <Flower size={40} className="mx-auto text-luxGold mb-6 animate-spin-slow" strokeWidth={1} />
                  <h2 className="text-5xl font-serif text-luxBlack">Our Collections</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                  {CATEGORIES.slice(0, 6).map((cat, idx) => (
                      <div key={cat.id} className="group relative h-[400px] overflow-hidden border border-gray-200 hover:border-luxGold transition-colors duration-500">
                          {/* Background Image that Zooms */}
                          <div className="absolute inset-0 bg-luxBlack/10 group-hover:bg-luxBlack/40 transition-colors z-10"></div>
                          <img src={cat.imageUrl} className="absolute inset-0 w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[1.5s] grayscale group-hover:grayscale-0" alt={cat.title} />
                          
                          {/* Content */}
                          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center transition-transform duration-500 group-hover:-translate-y-4">
                              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 text-white border border-white/20 group-hover:bg-luxGold group-hover:text-black transition-colors duration-500">
                                  <Star size={20} />
                              </div>
                              <h3 className="text-3xl font-royal text-white mb-2 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">{cat.title}</h3>
                              <p className="text-white/80 text-sm font-light max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{cat.description}</p>
                              
                              <Link to="/categories" className="mt-8 text-luxGold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 flex items-center gap-2">
                                  Discover <MoveRight size={14} />
                              </Link>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* ================= HOLOGRAPHIC AI PLANNER ================= */}
      <section className="py-40 bg-luxBlack relative overflow-hidden flex items-center">
         {/* Holographic Gradients */}
         <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-luxGold/10 mix-blend-screen animate-pulse"></div>
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-luxGold to-transparent"></div>
         <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-luxGold to-transparent"></div>

         <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
             <div className="flex flex-col lg:flex-row items-center gap-24">
                 <div className="flex-1 space-y-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-luxGold/30 bg-luxGold/5 backdrop-blur-md">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                        <span className="text-luxGold text-xs uppercase tracking-widest font-bold">System Online</span>
                    </div>
                    
                    <h2 className="text-6xl md:text-8xl font-royal text-white transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
                        Future <br/> Intelligence.
                    </h2>
                    
                    <p className="text-xl text-gray-400 font-light leading-relaxed max-w-lg">
                        Meet the Eventify AI Concierge. It doesn't just plan; it envisions. From color palettes to logistical timelines, experience the magic of instant creation.
                    </p>

                    <Link to="/planner">
                        <Button variant="gold" size="lg" className="shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                            Launch Interface
                        </Button>
                    </Link>
                 </div>

                 <div className="flex-1 w-full relative">
                     {/* Hologram Card */}
                     <div className="relative aspect-square md:aspect-[4/3] bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden group">
                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                         
                         {/* Animated Scanline */}
                         <div className="absolute top-0 left-0 w-full h-1 bg-luxGold/50 shadow-[0_0_20px_rgba(212,175,55,1)] animate-[float_3s_linear_infinite]"></div>

                         <div className="font-mono text-sm space-y-6 relative z-10">
                             <div className="flex gap-4 items-start opacity-50">
                                 <span className="text-luxGold">&gt;</span>
                                 <p className="text-gray-400">User: Create a moodboard for a Neo-Tokyo wedding.</p>
                             </div>
                             <div className="flex gap-4 items-start">
                                 <span className="text-green-400">&gt;</span>
                                 <p className="text-white typing-effect">
                                     <span className="text-green-400 opacity-70">[Processing...]</span><br/><br/>
                                     Concept Generated: "Neon Cherry Blossom". <br/>
                                     Palette: Cyberpunk Pink, Midnight Blue, Metallic Gold. <br/>
                                     Centerpieces: Glowing fiber-optic sakura trees.
                                 </p>
                             </div>
                         </div>
                         
                         {/* Floating Orbs */}
                         <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
                         <div className="absolute top-10 right-20 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-float"></div>
                     </div>
                 </div>
             </div>
         </div>
      </section>

      {/* ================= FINAL CALL TO ASCEND ================= */}
      <section className="py-32 bg-white flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50"></div>
          <div className="max-w-4xl px-6 relative z-10">
              <h2 className="text-6xl md:text-8xl font-serif text-luxBlack mb-8 tracking-tighter">
                  Begin Your <br/><span className="italic text-luxGold">Legacy</span>
              </h2>
              <div className="w-24 h-1 bg-luxBlack mx-auto mb-12"></div>
              <Link to="/contact">
                  <button className="text-xl md:text-2xl uppercase tracking-[0.5em] font-bold hover:text-luxGold transition-colors duration-500 flex items-center gap-4 mx-auto group">
                      Enter The Atelier <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </button>
              </Link>
          </div>
      </section>

    </div>
  );
};

export default Home;