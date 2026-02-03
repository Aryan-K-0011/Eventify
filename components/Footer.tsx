import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-luxBlack text-luxWhite pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          {/* Brand - Large */}
          <div className="md:col-span-5 space-y-8">
            <h2 className="font-serif text-5xl md:text-6xl text-luxWhite tracking-tighter">
              Eventify<span className="text-luxGold">.</span>
            </h2>
            <p className="text-gray-400 font-light max-w-sm leading-relaxed">
              Curating the world's most exquisite events. From intimate gatherings to grand galas, we define the art of celebration.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-3">
             <h4 className="font-serif text-xl text-luxGold mb-6 italic">Explore</h4>
             <ul className="space-y-4 font-light text-sm tracking-wide text-gray-400">
               <li><Link to="/categories" className="hover:text-white transition-colors">Our Collections</Link></li>
               <li><Link to="/vendors" className="hover:text-white transition-colors">Elite Vendors</Link></li>
               <li><Link to="/planner" className="hover:text-white transition-colors">AI Concierge</Link></li>
               <li><Link to="/contact" className="hover:text-white transition-colors">Private Inquiries</Link></li>
             </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-serif text-xl text-luxGold mb-6 italic">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-6 font-light">Subscribe for exclusive invites and trends.</p>
            <div className="flex border-b border-gray-700 pb-2">
              <input type="email" placeholder="Email Address" className="bg-transparent w-full outline-none text-white placeholder-gray-600 font-light" />
              <button className="text-luxGold uppercase text-xs tracking-widest hover:text-white transition-colors">Join</button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
          <p className="text-gray-600 text-xs uppercase tracking-widest mb-4 md:mb-0">
            &copy; 2024 Eventify Luxury Group
            {/* THE SECRET ENTRANCE: The period is the link */}
            <Link to="/admin-command-center" className="hover:text-luxGold cursor-default">.</Link>
          </p>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-luxGold transition-colors"><Facebook size={18} /></a>
            <a href="#" className="text-gray-500 hover:text-luxGold transition-colors"><Twitter size={18} /></a>
            <a href="#" className="text-gray-500 hover:text-luxGold transition-colors"><Instagram size={18} /></a>
            <a href="#" className="text-gray-500 hover:text-luxGold transition-colors"><Linkedin size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;