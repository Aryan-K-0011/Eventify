import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Vendors from './pages/Vendors';
import SmartPlanner from './pages/SmartPlanner';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import { DataProvider } from './context/DataContext';

// Scroll to top component to handle scroll behavior on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Layout wrapper to conditionally hide Header/Footer for Admin pages
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const isAdmin = location.pathname.includes('/admin-command-center');

    return (
        <div className="flex flex-col min-h-screen font-sans">
            <ScrollToTop />
            {!isAdmin && <Header />}
            <main className="flex-grow">
                {children}
            </main>
            {!isAdmin && <Footer />}
        </div>
    );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <Router>
        <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/vendors" element={<Vendors />} />
              <Route path="/planner" element={<SmartPlanner />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* The Secret Route */}
              <Route path="/admin-command-center" element={<AdminDashboard />} />
            </Routes>
        </Layout>
      </Router>
    </DataProvider>
  );
};

export default App;