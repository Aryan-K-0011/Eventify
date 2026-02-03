import React, { useState } from 'react';
import { Sparkles, Send, Loader2, Cpu, Grid } from 'lucide-react';
import { getEventAdvice } from '../services/geminiService';
import Button from '../components/Button';

const SmartPlanner: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResponse(null);
    
    const result = await getEventAdvice(input);
    
    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="bg-luxBlack min-h-screen pt-32 pb-20 relative overflow-hidden text-white">
      
      {/* Background Holographic Effects */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-luxGold/10 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]"></div>
          {/* Animated Grid Lines */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-luxGold/30 to-transparent animate-[shimmer_3s_infinite]"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-luxGold/30 bg-luxGold/5 backdrop-blur-md animate-fade-in-up">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <span className="text-luxGold text-xs uppercase tracking-widest font-bold">System Online v2.0</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-royal text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] animate-fade-in-up [animation-delay:0.2s]">
            AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxGold via-white to-luxGold">Architect</span>
          </h1>
          
          <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto animate-fade-in-up [animation-delay:0.4s]">
            Describe your deepest desires. Our neural engine will generate bespoke themes, logistical blueprints, and aesthetic directions.
          </p>
        </div>

        {/* Input Interface - Holographic Card */}
        <div className="relative group mb-16 animate-fade-in-up [animation-delay:0.6s]">
            {/* Glowing Border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-luxGold via-purple-500 to-luxGold rounded-sm opacity-30 group-hover:opacity-70 transition duration-1000 blur"></div>
            
            <div className="relative bg-luxBlack border border-white/10 rounded-sm p-1 shadow-2xl">
                {/* Scanline Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,11,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_4px,3px_100%]"></div>

                <div className="relative z-10 p-6 md:p-8 bg-black/80 backdrop-blur-sm">
                    <form onSubmit={handlePlan}>
                        <div className="flex items-center gap-3 mb-4 text-luxGold/60 text-xs font-mono">
                           <Cpu size={14} /> <span>AWAITING INPUT...</span>
                        </div>
                        <textarea
                            rows={4}
                            className="w-full bg-transparent text-white text-lg font-light placeholder-gray-600 focus:outline-none resize-none leading-relaxed font-mono"
                            placeholder="// Example: Design a futuristic gala on Mars with red dust aesthetic and zero-gravity dance floor..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <div className="flex justify-between items-center mt-6 border-t border-white/10 pt-4">
                            <div className="flex gap-4">
                               <button type="button" className="text-gray-500 hover:text-white transition-colors"><Grid size={18} /></button>
                            </div>
                            <Button 
                                type="submit" 
                                variant="gold"
                                disabled={loading || !input.trim()}
                                className="!px-8 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)]"
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : <span className="flex items-center gap-2">Initialize <Send size={16} /></span>}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
        {/* Output Area - Terminal Style */}
        {(response || loading) && (
            <div className="animate-[fadeIn_0.5s_ease-out]">
                {loading ? (
                    <div className="text-center py-12 space-y-6">
                        <div className="relative w-24 h-24 mx-auto">
                            <div className="absolute inset-0 border-2 border-luxGold/20 rounded-full"></div>
                            <div className="absolute inset-0 border-t-2 border-luxGold rounded-full animate-spin"></div>
                            <div className="absolute inset-4 border-2 border-purple-500/20 rounded-full"></div>
                            <div className="absolute inset-4 border-b-2 border-purple-500 rounded-full animate-spin-slow"></div>
                        </div>
                        <p className="text-luxGold text-sm font-mono uppercase tracking-widest animate-pulse">Processing Neural Pathways...</p>
                    </div>
                ) : (
                    <div className="relative bg-luxCharcoal/50 border border-luxGold/20 p-8 md:p-12 rounded-sm backdrop-blur-md">
                        {/* Decorative Corners */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-luxGold"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-luxGold"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-luxGold"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-luxGold"></div>

                        <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-4">
                           <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></div>
                           <h3 className="text-xl font-royal text-white">Analysis Complete</h3>
                        </div>

                        <div className="prose prose-invert prose-lg text-gray-300 font-light leading-loose whitespace-pre-wrap font-sans">
                             {response}
                        </div>
                        
                        <div className="mt-12 flex justify-end">
                            <Button variant="ghost" onClick={() => { setInput(''); setResponse(null); }} className="text-xs uppercase tracking-widest opacity-50 hover:opacity-100">
                                Reset Terminal
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        )}

        {/* Prompts - Chips */}
        {!response && !loading && (
           <div className="mt-12">
               <p className="text-center text-gray-500 text-xs uppercase tracking-[0.2em] mb-8">Suggested Inquiries</p>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    "Cyberpunk Wedding Theme",
                    "Gatsby Style Corporate Gala",
                    "Sustainable Luxury Retreat",
                    "Avant-Garde Floral Concepts"
                  ].map((prompt, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setInput(prompt)}
                      className="group relative p-4 bg-white/5 border border-white/5 hover:border-luxGold/50 transition-all text-left overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-luxGold/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                      <span className="relative text-gray-400 group-hover:text-white font-mono text-xs block mb-2">0{idx + 1} //</span>
                      <span className="relative text-white font-serif text-sm">{prompt}</span>
                    </button>
                  ))}
               </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default SmartPlanner;