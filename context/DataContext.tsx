import React, { createContext, useContext, useState, useEffect } from 'react';
import { Vendor, Inquiry } from '../types';
import { VENDORS as INITIAL_VENDORS } from '../constants';

interface DataContextType {
  vendors: Vendor[];
  inquiries: Inquiry[];
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'timestamp' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: Inquiry['status']) => void;
  deleteVendor: (id: string) => void;
  resetSystem: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const DEMO_INQUIRIES: Inquiry[] = [
  { id: '1', clientName: 'Eleanor Rigby', email: 'e.rigby@example.com', phone: '555-0199', type: 'Wedding', message: 'Looking for a church wedding with vintage aesthetics.', status: 'New', timestamp: new Date(Date.now() - 10000000).toISOString() },
  { id: '2', clientName: 'Bruce Wayne', email: 'b.wayne@enterprises.com', phone: '555-0123', type: 'Private Gala', message: 'Black tie event, strict security required. 500 guests.', status: 'Approved', timestamp: new Date(Date.now() - 50000000).toISOString() },
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize State from LocalStorage or Constants
  const [vendors, setVendors] = useState<Vendor[]>(() => {
    const saved = localStorage.getItem('eventify_vendors');
    return saved ? JSON.parse(saved) : INITIAL_VENDORS;
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('eventify_inquiries');
    return saved ? JSON.parse(saved) : DEMO_INQUIRIES;
  });

  // Sync to LocalStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('eventify_vendors', JSON.stringify(vendors));
  }, [vendors]);

  useEffect(() => {
    localStorage.setItem('eventify_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // Actions
  const addInquiry = (data: Omit<Inquiry, 'id' | 'timestamp' | 'status'>) => {
    const newInquiry: Inquiry = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      status: 'New',
      timestamp: new Date().toISOString()
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: Inquiry['status']) => {
    setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status } : inq));
  };

  const deleteVendor = (id: string) => {
    setVendors(prev => prev.filter(v => v.id !== id));
  };

  const resetSystem = () => {
    // Resetting states triggers the useEffects which will update localStorage with the fresh default data
    setVendors(INITIAL_VENDORS);
    setInquiries(DEMO_INQUIRIES);
  };

  return (
    <DataContext.Provider value={{ vendors, inquiries, addInquiry, updateInquiryStatus, deleteVendor, resetSystem }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};