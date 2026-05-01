"use client"

import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '@/lib/portfolio-data';
import { Moon, Sun, Menu, X, Github, Linkedin } from 'lucide-react';
import { Button } from './ui/button';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Set initial theme
    const theme = localStorage.getItem('theme') || 'dark';
    setIsDarkMode(theme === 'dark');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Impact', href: '#impact' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass py-4 shadow-2xl' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Spacer to keep balance if logo is removed, or just allow justify-between to work */}
        <div className="flex-1 md:flex-none" />

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8 px-6 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-md">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className="text-xs font-headline font-bold uppercase tracking-[0.2em] hover:text-primary transition-all duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-4 pl-6 border-l border-white/10">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="rounded-full hover:bg-primary/10 text-primary transition-all w-10 h-10"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-all duration-300 hover:scale-110">
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-primary">
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="h-10 w-10">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass border-t border-white/10 mt-4 py-10 animate-in slide-in-from-top duration-500">
          <div className="flex flex-col items-center gap-8">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className="text-xl font-headline font-bold uppercase tracking-[0.3em]"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="flex gap-8 pt-6 border-t border-white/10 w-full justify-center">
               <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="text-primary"><Github /></a>
               <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary"><Linkedin /></a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};