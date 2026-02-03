import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { Mail, Phone, MapPin, ArrowRight, Clock, Shield, Star, CheckCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useLocation } from 'react-router-dom';

const Contact: React.FC = () => {
  const { addInquiry } = useData();
  const location = useLocation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Wedding',
    message: ''
  });

  // Pre-fill message from navigation state (Contextual Inquiries)
  useEffect(() => {
    if (location.state && location.state.inquiryContext) {
        setFormData(prev => ({
            ...prev,
            message: location.state.inquiryContext,
            type: 'Consultation' // Default to consultation for specific vendor inquiries
        }));
    }
  }, [location.state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInquiry({
      clientName: formData.name,
      email: formData.email,
      phone: formData.phone,
      type: formData.type,
      message: formData.message
    });
    
    // Simulate API delay for effect
    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', type: 'Wedding', message: '' });
    }, 800);
  };

  const locations = [
    {
      city: "New York",
      address: "The Penthouse, 5th Avenue",
      image: "https://paigevaughnphoto.com/wp-content/uploads/sites/3776/2024/07/Events_Hero_Feature_01.jpeg",
      hours: "09:00 - 18:00 EST"
    },
    {
      city: "Paris",
      address: "88 Rue du Faubourg Saint-Honoré",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdmvaJeoQ-wNX_cU9Vee1SvvTZPnaJI0AK_Q&s",
      hours: "10:00 - 19:00 CET"
    },
    {
      city: "London",
      address: "Mayfair, W1J 6BQ",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqg01JWJezfYe42UfZ04Rla90L3nfqPFib7Q&s",
      hours: "09:00 - 17:30 GMT"
    }
  ];

  return (
    <div className="bg-luxBlack min-h-screen relative text-white selection:bg-luxGold selection:text-black font-sans">
      
      {/* 1. CINEMATIC HERO WITH IMAGE */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
         <div className="absolute inset-0">
             <img 
               src="https://images.unsplash.com/photo-1625076932159-61a032e2b7ad?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2VkZGluZyUyMGV2ZW50fGVufDB8fDB8fHww" 
               alt="Luxury Office" 
               className="w-full h-full object-cover opacity-60 animate-[float_10s_ease-in-out_infinite] scale-105"
             />
             <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-luxBlack"></div>
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
         </div>
         
         <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
             <div className="animate-fade-in-up">
                <span className="inline-block border border-luxGold/50 px-6 py-2 rounded-full bg-black/40 backdrop-blur-xl text-luxGold text-xs uppercase tracking-[0.4em] mb-8 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                    The Private Atelier
                </span>
             </div>
             <h1 className="text-6xl md:text-8xl font-royal text-white mb-6 tracking-tighter leading-none drop-shadow-2xl animate-fade-in-up [animation-delay:0.2s]">
                Architecting <br/> <span className="italic text-luxGold font-serif">Legacies</span>
             </h1>
             <p className="max-w-xl mx-auto text-gray-200 font-light text-xl leading-relaxed animate-fade-in-up [animation-delay:0.4s] mix-blend-lighten">
                Initiate a dialogue with our master planners. We accept a limited number of bespoke commissions per season.
             </p>
         </div>
         
         {/* Scroll Indicator */}
         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-[1px] h-16 bg-gradient-to-b from-luxGold to-transparent"></div>
         </div>
      </section>

      {/* 2. THE PROCESS (Visual) */}
      <section className="py-24 bg-luxCharcoal relative border-y border-white/5">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { num: "I", title: "Consultation", desc: "A private session to map the contours of your vision." },
              { num: "II", title: "Curation", desc: "We assemble a team of world-class artisans tailored to you." },
              { num: "III", title: "Execution", desc: "Flawless orchestration on the day of your triumph." }
            ].map((step, idx) => (
               <div key={idx} className="group p-8 border border-white/5 hover:border-luxGold/30 transition-all duration-500 bg-luxBlack/50 hover:bg-luxBlack relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 text-[150px] font-royal text-white/5 group-hover:text-luxGold/10 transition-colors pointer-events-none">
                     {step.num}
                  </div>
                  <h3 className="text-2xl font-serif text-luxGold mb-4">{step.title}</h3>
                  <p className="text-gray-400 font-light leading-relaxed">{step.desc}</p>
               </div>
            ))}
         </div>
      </section>

      {/* 3. GLOBAL LOCATIONS GRID */}
      <section className="py-32 bg-luxBlack relative">
         <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-end">
            <div>
               <h2 className="text-5xl font-royal text-white mb-2">Global Presence</h2>
               <p className="text-gray-400 font-light">Visit our flagship ateliers.</p>
            </div>
            <div className="flex gap-2 text-luxGold text-xs uppercase tracking-widest mt-6 md:mt-0">
               <Star size={14} fill="currentColor"/> 
               <Star size={14} fill="currentColor"/> 
               <Star size={14} fill="currentColor"/>
               <Star size={14} fill="currentColor"/>
               <Star size={14} fill="currentColor"/>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
            {locations.map((loc, idx) => (
               <div key={idx} className="group relative h-full w-full overflow-hidden border-r border-white/10 last:border-r-0">
                  <div className="absolute inset-0 bg-luxBlack/40 group-hover:bg-luxBlack/20 transition-all z-10"></div>
                  <img src={loc.image} alt={loc.city} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110 transition-all duration-[1.5s]" />
                  
                  <div className="absolute bottom-0 left-0 w-full p-10 z-20 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                     <h3 className="text-4xl font-royal text-white mb-2">{loc.city}</h3>
                     <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100 delay-100">
                        <p className="text-luxGold text-sm uppercase tracking-widest mb-1">{loc.address}</p>
                        <p className="text-gray-400 text-xs flex items-center gap-2"><Clock size={12}/> {loc.hours}</p>
                        <button className="mt-6 text-white text-xs uppercase tracking-widest border-b border-white pb-1 hover:text-luxGold hover:border-luxGold transition-colors">
                            Book Appointment
                        </button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* 4. THE COMMISSION FORM */}
      <section className="py-32 relative overflow-hidden flex items-center justify-center">
          {/* Abstract Background */}
          <div className="absolute inset-0 bg-luxCharcoal">
             <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-luxGold/5 rounded-full blur-[150px]"></div>
             <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[150px]"></div>
          </div>

          <div className="relative z-10 w-full max-w-5xl px-6">
             <div className="bg-luxBlack/60 backdrop-blur-2xl border border-white/10 p-8 md:p-16 rounded-sm shadow-2xl transition-all duration-500 min-h-[600px] flex items-center justify-center">
                
                {isSubmitted ? (
                   <div className="text-center animate-fade-in-up">
                      <div className="w-24 h-24 bg-luxGold/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-luxGold/20">
                         <CheckCircle size={48} className="text-luxGold" />
                      </div>
                      <h2 className="text-4xl font-royal text-white mb-4">Request Dispatched</h2>
                      <p className="text-gray-400 text-lg font-light max-w-md mx-auto mb-8">
                         Your inquiry has been securely transmitted to our Concierge Desk. A senior planner will review your vision and contact you within 24 hours.
                      </p>
                      <Button variant="outline" onClick={() => setIsSubmitted(false)}>Return to Form</Button>
                   </div>
                ) : (
                  <div className="w-full">
                    <div className="text-center mb-12">
                       <h2 className="text-4xl md:text-5xl font-royal text-white mb-4">Request a Commission</h2>
                       <div className="w-24 h-1 bg-gradient-to-r from-transparent via-luxGold to-transparent mx-auto"></div>
                    </div>

                    <form className="space-y-12" onSubmit={handleSubmit}>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                          <div className="group relative">
                             <input 
                                type="text" id="name" required 
                                className="peer w-full bg-transparent border-b border-gray-700 py-4 text-white text-lg focus:outline-none focus:border-luxGold transition-colors placeholder-transparent" 
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                             />
                             <label htmlFor="name" className="absolute left-0 -top-4 text-gray-500 text-xs uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-luxGold peer-focus:text-xs">Full Name</label>
                          </div>
                          <div className="group relative">
                             <input 
                                type="email" id="email" required 
                                className="peer w-full bg-transparent border-b border-gray-700 py-4 text-white text-lg focus:outline-none focus:border-luxGold transition-colors placeholder-transparent" 
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                             />
                             <label htmlFor="email" className="absolute left-0 -top-4 text-gray-500 text-xs uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-luxGold peer-focus:text-xs">Email Address</label>
                          </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                           <div className="group relative">
                              <input 
                                type="tel" id="phone" 
                                className="peer w-full bg-transparent border-b border-gray-700 py-4 text-white text-lg focus:outline-none focus:border-luxGold transition-colors placeholder-transparent" 
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              />
                              <label htmlFor="phone" className="absolute left-0 -top-4 text-gray-500 text-xs uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-luxGold peer-focus:text-xs">Phone (Optional)</label>
                           </div>
                           <div className="group relative">
                              <select 
                                className="peer w-full bg-transparent border-b border-gray-700 py-4 text-white text-lg focus:outline-none focus:border-luxGold transition-colors appearance-none"
                                value={formData.type}
                                onChange={(e) => setFormData({...formData, type: e.target.value})}
                              >
                                 <option className="bg-luxBlack">Wedding</option>
                                 <option className="bg-luxBlack">Corporate Gala</option>
                                 <option className="bg-luxBlack">Private Soirée</option>
                                 <option className="bg-luxBlack">Consultation</option>
                              </select>
                              <label className="absolute left-0 -top-4 text-luxGold text-xs uppercase tracking-widest">Inquiry Type</label>
                           </div>
                       </div>

                       <div className="group relative">
                          <textarea 
                            rows={4} 
                            className="peer w-full bg-transparent border-b border-gray-700 py-4 text-white text-lg focus:outline-none focus:border-luxGold transition-colors placeholder-transparent resize-none" 
                            placeholder="Message"
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                          ></textarea>
                          <label className="absolute left-0 -top-4 text-gray-500 text-xs uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-luxGold peer-focus:text-xs">Tell us about your vision</label>
                       </div>

                       <div className="pt-8 flex flex-col items-center">
                          <Button type="submit" variant="gold" size="lg" className="px-16 py-5 text-sm tracking-[0.2em] shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:shadow-[0_0_60px_rgba(212,175,55,0.5)]">
                             Submit Request
                          </Button>
                          <div className="mt-8 flex items-center gap-2 text-gray-600 text-[10px] uppercase tracking-widest">
                             <Shield size={12} /> Data is secured by end-to-end encryption
                          </div>
                       </div>
                    </form>
                  </div>
                )}
             </div>
          </div>
      </section>

    </div>
  );
};

export default Contact;