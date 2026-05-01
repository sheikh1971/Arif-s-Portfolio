"use client"

import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '@/lib/portfolio-data';
import { Moon, Sun, Menu, X, Github, Linkedin } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
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
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-[60] transition-all duration-500 px-4 md:px-8",
        isScrolled ? "py-3" : "py-6"
      )}>
        <div className={cn(
          "max-w-7xl mx-auto flex items-center justify-between p-2 rounded-full transition-all duration-500",
          isScrolled ? "glass shadow-xl px-4" : "bg-transparent"
        )}>
          {/* Logo/Brand removed as requested */}
          <div className="flex-1" />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-1 bg-muted/40 p-1 rounded-full border border-border/40">
              {navItems.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className="px-4 py-2 text-[10px] font-headline font-bold uppercase tracking-widest hover:text-primary transition-all rounded-full hover:bg-background/50"
                >
                  {item.name}
                </a>
              ))}
            </div>
            
            <div className="flex items-center gap-1 ml-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme}
                className="rounded-full hover:bg-primary/10 text-primary w-10 h-10"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="p-2 hover:text-primary transition-all hover:scale-110">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              className="w-10 h-10 rounded-full text-primary bg-muted/20"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="w-10 h-10 rounded-full bg-primary text-primary-foreground"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-50 md:hidden bg-background/95 backdrop-blur-3xl transition-all duration-500",
        isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
          {navItems.map((item, i) => (
            <a 
              key={item.name} 
              href={item.href} 
              className={cn(
                "text-3xl font-headline font-bold uppercase tracking-[0.2em] transition-all",
                isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <div className="w-24 h-px bg-primary/20 mt-4" />
          <div className="flex gap-10 mt-4">
             <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:scale-125 transition-transform"><Github size={32} /></a>
             <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:scale-125 transition-transform"><Linkedin size={32} /></a>
          </div>
          <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-muted-foreground mt-12 opacity-50">
            SynapticFolio v2.0
          </p>
        </div>
      </div>
    </>
  );
};