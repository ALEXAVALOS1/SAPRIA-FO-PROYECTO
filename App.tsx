import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { SidebarLeft } from './components/SidebarLeft';
import { MapSection } from './components/MapSection';
import { SidebarRight } from './components/SidebarRight';
import { Footer } from './components/Footer';
import { AlertModal } from './components/AlertModal';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  // Auto-open modal after a delay if closed, for demo purposes
  useEffect(() => {
    if (!isModalOpen) {
      const timer = setTimeout(() => {
        // setIsModalOpen(true); // Optional: Uncomment to re-trigger alert for demo
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  return (
    <div className="min-h-screen flex flex-col relative">
      <AlertModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <Header />
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-6 grid grid-cols-12 gap-6 min-h-[calc(100vh-8rem)]">
        <SidebarLeft onTriggerAlert={() => setIsModalOpen(true)} />
        <MapSection />
        <SidebarRight />
      </main>
      
      <Footer />
      
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 translate-x-12 hover:translate-x-0 transition-transform duration-300 z-50">
        <button className="bg-secondary text-[#064e3b] font-black py-4 px-8 rounded-l-xl shadow-2xl rotate-90 origin-right whitespace-nowrap text-xs tracking-widest uppercase">
          Encuesta de Satisfacción
        </button>
      </div>
    </div>
  );
}