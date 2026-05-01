"use client"

import React from 'react';
import { PERSONAL_INFO } from '@/lib/portfolio-data';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, Zap, BrainCircuit } from 'lucide-react';
import { ResumeDialog } from '../ResumeDialog';
import Image from 'next/image';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="mesh-overlay" />
      
      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="animate-reveal [animation-delay:0.2s]">
          <div className="flex items-center gap-2 mb-4">
            <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-headline font-bold uppercase tracking-widest flex items-center gap-2">
              <Zap className="h-3 w-3 animate-pulse" />
              Applied AI & ML Engineer
            </div>
          </div>
          <h1 className="text-5xl lg:text-7xl font-headline font-bold mb-6 leading-[1.1]">
            {PERSONAL_INFO.name}
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 font-headline font-light mb-8 max-w-lg">
            {PERSONAL_INFO.tagline}
          </p>
          <p className="text-muted-foreground mb-10 max-w-xl leading-relaxed">
            {PERSONAL_INFO.subtext}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full gap-2 px-8 group" asChild>
              <a href="#projects">
                Explore Neural Assets <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            
            <ResumeDialog />

            <Button size="lg" variant="ghost" className="rounded-full gap-2 px-8" asChild>
              <a href="#contact">
                <Mail className="h-4 w-4" /> Contact
              </a>
            </Button>
          </div>
        </div>

        {/* Right Visualization - Neural Network Vibe */}
        <div className="relative flex items-center justify-center animate-reveal [animation-delay:0.4s]">
          {/* ML Illustration Background */}
          <div className="absolute inset-0 opacity-10 blur-xl pointer-events-none">
            <Image 
              src={PERSONAL_INFO.images.ml_illustration} 
              alt="ML Pattern"
              fill
              className="object-cover"
            />
          </div>

          {/* Neural Connections SVG Background */}
          <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" viewBox="0 0 400 400">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" />
              </linearGradient>
            </defs>
            <path d="M100,100 L300,300" stroke="url(#lineGrad)" strokeWidth="0.5" strokeDasharray="5,5" className="animate-pulse-soft" />
            <path d="M100,300 L300,100" stroke="url(#lineGrad)" strokeWidth="0.5" strokeDasharray="5,5" className="animate-pulse-soft" style={{ animationDelay: '1s' }} />
            <circle cx="100" cy="100" r="2" fill="hsl(var(--primary))" className="animate-pulse" />
            <circle cx="300" cy="300" r="2" fill="hsl(var(--secondary))" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
            <circle cx="100" cy="300" r="2" fill="hsl(var(--primary))" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
            <circle cx="300" cy="100" r="2" fill="hsl(var(--secondary))" className="animate-pulse" style={{ animationDelay: '2s' }} />
          </svg>

          <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
            {/* Pulsing Neural Rings */}
            <div className="absolute inset-0 border border-primary/10 rounded-full animate-[ping_10s_linear_infinite] opacity-50" />
            <div className="absolute inset-4 border border-primary/5 rounded-full animate-[ping_15s_linear_infinite_reverse] opacity-30" />
            
            {/* Orbiting Nodes */}
            <div className="absolute w-full h-full animate-[spin_30s_linear_infinite]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary/40 blur-sm" />
            </div>
            <div className="absolute w-full h-full animate-[spin_20s_linear_infinite_reverse]">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-secondary/40 blur-sm" />
            </div>

            {/* Main Portrait Container - Square with rounded corners */}
            <div className="relative w-72 h-72 rounded-3xl overflow-hidden border-2 border-primary/40 shadow-[0_0_50px_-12px_rgba(167,120,247,0.5)] z-20 bg-card/40">
              <Image 
                src={PERSONAL_INFO.images.hero} 
                alt={PERSONAL_INFO.name}
                fill
                className="object-contain"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none" />
            </div>
            
            {/* Background Glow */}
            <div className="absolute w-80 h-80 bg-primary/10 rounded-full blur-[80px] animate-pulse-soft" />

            {/* AI Insights Floating Labels */}
            <div className="absolute top-0 -right-4 glass p-4 rounded-2xl animate-float [animation-delay:0.5s] z-30 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <BrainCircuit className="h-4 w-4 text-primary" />
              </div>
              <div>
                <span className="text-[10px] font-headline font-bold uppercase tracking-widest block">Core AI</span>
                <p className="text-[9px] text-muted-foreground leading-tight">Architecting high-precision diagnostic CV pipelines.</p>
              </div>
            </div>

            <div className="absolute bottom-10 -left-12 glass p-4 rounded-2xl animate-float [animation-delay:1.5s] z-30 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary/20">
                <Zap className="h-4 w-4 text-secondary" />
              </div>
              <div>
                <span className="text-[10px] font-headline font-bold uppercase tracking-widest block">Systems</span>
                <p className="text-[9px] text-muted-foreground leading-tight">End-to-end intelligent platforms at WIOCARE.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};