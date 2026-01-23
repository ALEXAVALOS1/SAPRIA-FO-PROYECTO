import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img 
            alt="Escudo Nacional" 
            className="h-10 w-auto filter invert brightness-0" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0B1eleXp8PkSdS0tnzOW6fd376yJpG-CT6pGrEY-AbNKCHsau4KBGbcdKb1G8NmqCg7hHB7mfKQxvYsavmbji4xLo7KLI8nCHPdsBmSiNMbwS0_EySjrrpc_yM5cebGe-VaCcf7uXjTNBI1pXrnZIAkTEALj4ubgnx8xvCWJeXc1m1YP7N7Fhp3I54ANYo5uvwU-U6_u4wTfBB-eiHKKSQDdsU9mPKwvkhCQANU_gmI9n-loF94guoPJyChHOvV4vpx6_a8HTMjg" 
          />
          <div className="border-l border-white/30 h-8 mx-2"></div>
          <div className="leading-tight">
            <h1 className="font-bold text-lg text-secondary">SINAPRIA-FO</h1>
            <p className="text-xs text-secondary tracking-wider uppercase">MONITOREO MUNICIPAL JUÁREZ</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a className="hover:text-secondary transition-colors" href="#">Quiénes somos</a>
          <button className="hover:text-secondary">
            <span className="material-icons-outlined">search</span>
          </button>
        </nav>
      </div>
    </header>
  );
};