import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, Users, DollarSign, LayoutDashboard, MessageSquare, 
  Database, Settings, Lock, Cpu, Globe, ArrowUpRight, Check, X, Bell, Trash2, LogOut 
} from 'lucide-react';
import { useData } from '../context/DataContext';

const AdminDashboard: React.FC = () => {
  const { vendors, inquiries, updateInquiryStatus, deleteVendor, resetSystem } = useData();
  const [activeTab, setActiveTab] = useState('overview');

  const pendingCount = inquiries.filter(i => i.status === 'New').length;

  return (
    <div className="bg-luxBlack min-h-screen text-white font-sans flex overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-20 lg:w-64 border-r border-white/10 flex flex-col justify-between bg-black/40 backdrop-blur-xl h-screen fixed z-50 transition-all">
        <div>
          <div className="h-20 flex items-center justify-center lg:justify-start lg:px-8 border-b border-white/10">
            <Lock className="text-luxGold lg:mr-3" size={20} />
            <span className="font-royal text-lg hidden lg:block tracking-widest text-luxGold">GOD MODE</span>
          </div>

          <nav className="mt-8 space-y-2 px-2">
            {[
              { id: 'overview', icon: LayoutDashboard, label: 'Command Center' },
              { id: 'inquiries', icon: MessageSquare, label: 'VIP Inquiries', badge: pendingCount > 0 ? pendingCount : null },
              { id: 'vendors', icon: Database, label: 'The Black Book' },
              { id: 'ai', icon: Cpu, label: 'Neural Engine' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center p-4 rounded-sm transition-all duration-300 relative ${
                  activeTab === item.id 
                    ? 'bg-luxGold/20 text-luxGold border-r-2 border-luxGold' 
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon size={20} />
                <span className="ml-4 hidden lg:block text-xs uppercase tracking-widest">{item.label}</span>
                {item.badge && (
                  <span className="absolute right-2 top-4 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t border-white/10 space-y-4 bg-black/20">
          {/* RESET SYSTEM BUTTON */}
          <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-pointer group" onClick={() => { if(window.confirm('Reset all data to defaults?')) resetSystem() }}>
             <div className="w-8 h-8 rounded-full bg-luxGold/20 flex items-center justify-center text-luxGold group-hover:bg-red-900/50 group-hover:text-red-500 transition-colors">
                <Settings size={14} />
             </div>
             <div className="hidden lg:block">
                 <p className="text-xs text-white group-hover:text-red-400">System Config</p>
                 <p className="text-[10px] text-green-500 group-hover:text-red-300">Reset Data</p>
             </div>
          </div>

          {/* EXIT BUTTON */}
          <Link to="/" className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-pointer group">
             <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-red-600 transition-colors">
                <LogOut size={14} />
             </div>
             <div className="hidden lg:block">
                 <p className="text-xs text-white group-hover:text-red-400">Exit Protocol</p>
                 <p className="text-[10px] text-gray-500 group-hover:text-red-300">Return to User View</p>
             </div>
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-20 lg:ml-64 p-8 overflow-y-auto h-screen relative">
        {/* Background Noise/Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
        {/* TOP BAR */}
        <header className="flex justify-between items-center mb-12">
            <div>
                <h1 className="text-3xl font-royal text-white mb-1">
                    {activeTab === 'overview' && 'System Overview'}
                    {activeTab === 'inquiries' && 'Concierge Desk'}
                    {activeTab === 'vendors' && 'Vendor Database'}
                    {activeTab === 'ai' && 'AI Neural Core'}
                </h1>
                <p className="text-gray-500 text-xs uppercase tracking-widest">
                    Last Sync: {new Date().toLocaleTimeString()}
                </p>
            </div>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-green-500 text-[10px] uppercase font-bold tracking-wider">Live</span>
                </div>
                <div className="relative cursor-pointer">
                    <Bell size={20} className="text-gray-400 hover:text-luxGold transition-colors" />
                    {pendingCount > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-luxGold rounded-full animate-pulse"></span>}
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-luxGold to-white p-[1px]">
                   <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200" className="w-full h-full rounded-full object-cover border-2 border-luxBlack" alt="Admin" />
                </div>
            </div>
        </header>

        {/* --- TAB CONTENT: OVERVIEW --- */}
        {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in-up">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Total Revenue', value: '$4.2M', sub: '+12% this month', icon: DollarSign },
                        { label: 'Active Inquiries', value: inquiries.length.toString(), sub: `${pendingCount} pending review`, icon: MessageSquare },
                        { label: 'Elite Partners', value: vendors.length.toString(), sub: 'In the Black Book', icon: Database },
                        { label: 'System Health', value: '99.9%', sub: 'All systems nominal', icon: Activity },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-luxCharcoal/50 backdrop-blur-md border border-white/5 p-6 rounded-sm hover:border-luxGold/30 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-white/5 rounded-md group-hover:bg-luxGold group-hover:text-black transition-colors">
                                    <stat.icon size={20} />
                                </div>
                                <ArrowUpRight size={16} className="text-gray-600 group-hover:text-luxGold" />
                            </div>
                            <h3 className="text-3xl font-royal text-white mb-1">{stat.value}</h3>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</p>
                            <p className="text-[10px] text-luxGold mt-2">{stat.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Map & Traffic Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-luxCharcoal/50 border border-white/5 p-8 rounded-sm min-h-[400px] relative overflow-hidden group">
                        <h3 className="text-lg font-royal mb-6 flex items-center gap-2"><Globe size={16} className="text-luxGold"/> Global Traffic Map</h3>
                        <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
                             {/* Abstract Globe Effect */}
                             <div className="w-96 h-96 rounded-full border border-luxGold/20 animate-slow-spin border-dashed"></div>
                             <div className="absolute w-80 h-80 rounded-full border border-white/10 animate-[spin_15s_linear_infinite_reverse]"></div>
                             <div className="absolute w-64 h-64 rounded-full border border-luxGold/10 animate-pulse"></div>
                        </div>
                        <div className="relative z-10 grid grid-cols-2 gap-4 mt-20">
                             {['New York', 'Dubai', 'London', 'Paris', 'Tokyo', 'Singapore'].map(city => (
                                 <div key={city} className="flex justify-between border-b border-white/5 pb-2">
                                     <span className="text-sm font-light text-gray-300">{city}</span>
                                     <span className="text-xs text-luxGold font-mono">{Math.floor(Math.random() * 1000)} sessions</span>
                                 </div>
                             ))}
                        </div>
                    </div>

                    <div className="bg-luxCharcoal/50 border border-white/5 p-8 rounded-sm">
                        <h3 className="text-lg font-royal mb-6">Recent Activity</h3>
                        <div className="space-y-6">
                            {inquiries.slice(0, 4).map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className={`w-1 rounded-full ${item.status === 'New' ? 'bg-luxGold' : 'bg-gray-700'}`}></div>
                                    <div>
                                        <p className="text-sm text-gray-300 leading-snug">
                                          {item.status === 'New' ? `New Request: ${item.clientName}` : `Update: ${item.clientName} set to ${item.status}`}
                                        </p>
                                        <p className="text-[10px] text-gray-600 mt-1 uppercase tracking-widest">{new Date(item.timestamp).toLocaleTimeString()}</p>
                                    </div>
                                </div>
                            ))}
                            {inquiries.length === 0 && <p className="text-gray-500 italic text-sm">No recent inquiries.</p>}
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* --- TAB CONTENT: INQUIRIES --- */}
        {activeTab === 'inquiries' && (
            <div className="bg-luxCharcoal/50 border border-white/5 rounded-sm overflow-hidden animate-fade-in-up">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-xs uppercase tracking-widest text-gray-500">
                        <tr>
                            <th className="p-6">Client Name</th>
                            <th className="p-6">Event Type</th>
                            <th className="p-6">Contact</th>
                            <th className="p-6">Message</th>
                            <th className="p-6">Status</th>
                            <th className="p-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {inquiries.map((row) => (
                            <tr key={row.id} className="hover:bg-white/5 transition-colors group">
                                <td className="p-6 font-royal text-white">
                                  {row.clientName}
                                  <div className="text-[10px] text-gray-500">{new Date(row.timestamp).toLocaleDateString()}</div>
                                </td>
                                <td className="p-6 text-gray-400 text-sm">{row.type}</td>
                                <td className="p-6 text-sm text-luxGold">{row.email}</td>
                                <td className="p-6 text-sm text-gray-500 max-w-xs truncate">{row.message}</td>
                                <td className="p-6">
                                    <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest border ${
                                        row.status === 'New' ? 'border-blue-500/30 text-blue-400 bg-blue-500/10' :
                                        row.status === 'Approved' ? 'border-green-500/30 text-green-400 bg-green-500/10' :
                                        row.status === 'Rejected' ? 'border-red-500/30 text-red-400 bg-red-500/10' :
                                        'border-yellow-500/30 text-yellow-400 bg-yellow-500/10'
                                    }`}>
                                        {row.status}
                                    </span>
                                </td>
                                <td className="p-6 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => updateInquiryStatus(row.id, 'Approved')} className="p-2 hover:bg-green-500/20 text-green-500 rounded"><Check size={16} /></button>
                                        <button onClick={() => updateInquiryStatus(row.id, 'Rejected')} className="p-2 hover:bg-red-500/20 text-red-500 rounded"><X size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {inquiries.length === 0 && (
                          <tr>
                            <td colSpan={6} className="p-10 text-center text-gray-500">No active inquiries found.</td>
                          </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )}

        {/* --- TAB CONTENT: VENDORS --- */}
        {activeTab === 'vendors' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
                {vendors.map((vendor) => (
                    <div key={vendor.id} className="group relative bg-luxCharcoal border border-white/5 p-6 rounded-sm hover:border-luxGold/50 transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10">
                                <img src={vendor.imageUrl} alt={vendor.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="bg-luxGold/10 text-luxGold px-2 py-1 text-[10px] uppercase tracking-widest rounded-sm">
                                {vendor.rating} ★
                            </div>
                        </div>
                        <h4 className="text-xl font-royal text-white mb-1">{vendor.name}</h4>
                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">{vendor.category} • {vendor.location}</p>
                        
                        <div className="flex gap-2">
                             <button className="flex-1 py-2 border border-white/10 text-xs uppercase hover:bg-white hover:text-black transition-colors">Edit</button>
                             <button onClick={() => deleteVendor(vendor.id)} className="flex-1 py-2 border border-white/10 text-xs uppercase hover:bg-red-900/50 hover:border-red-900 text-red-400 transition-colors flex items-center justify-center gap-2">
                                <Trash2 size={12} /> Delist
                             </button>
                        </div>
                    </div>
                ))}
                {/* Add New Card */}
                <div className="border border-dashed border-white/20 flex flex-col items-center justify-center text-gray-500 hover:text-luxGold hover:border-luxGold transition-colors cursor-pointer min-h-[200px]">
                    <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center mb-4">
                        <ArrowUpRight size={20} />
                    </div>
                    <span className="text-xs uppercase tracking-widest">Onboard New Artisan</span>
                </div>
            </div>
        )}

        {/* --- TAB CONTENT: AI --- */}
        {activeTab === 'ai' && (
            <div className="h-[600px] bg-black border border-white/10 p-6 font-mono text-xs md:text-sm text-green-500 overflow-hidden relative animate-fade-in-up rounded-md shadow-2xl">
                {/* Screen Glare */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pixel-weave.png')] opacity-20 pointer-events-none"></div>

                <div className="mb-4 border-b border-green-500/30 pb-2 flex justify-between">
                    <span>NEURAL_ENGINE_V3 :: ROOT_ACCESS</span>
                    <span className="animate-pulse">ONLINE</span>
                </div>

                <div className="space-y-2 opacity-90 h-full overflow-y-auto pb-10">
                    <p className="text-white">> Initializing Neural Core...</p>
                    <p className="text-white">> Loading Model: gemini-3-flash-preview</p>
                    <p className="text-gray-500">> Connecting to vector database [High-Availability]</p>
                    <p className="text-green-400">SUCCESS: Connection established (4ms latency)</p>
                    <br/>
                    <p className="text-white">> STREAMING LIVE LOGS:</p>
                    {[
                        "[10:42:01] INFO: Request received from User_ID_992 (Query: 'Underwater Wedding')",
                        "[10:42:02] PROC: Generating semantic tokens...",
                        "[10:42:02] PROC: Retrieving vendor matches (Category: Marine Venues)...",
                        "[10:42:03] SUCC: Response generated (Tokens: 450 / Cost: $0.002)",
                        "[10:43:15] INFO: Request received from User_ID_104 (Query: 'Corporate Retreat Mars')",
                        "[10:43:16] WARN: Query complexity high. Engaging creative sub-routine.",
                        "[10:43:18] SUCC: Blueprint created."
                    ].map((log, i) => (
                        <p key={i} className="hover:bg-green-500/10 cursor-default">{log}</p>
                    ))}
                    <div className="animate-pulse mt-4">_</div>
                </div>
            </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;