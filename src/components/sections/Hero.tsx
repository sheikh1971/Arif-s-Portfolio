"use client"

import React from 'react';
import { PERSONAL_INFO } from '@/lib/portfolio-data';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, Zap, BrainCircuit, Activity } from 'lucide-react';
import { ResumeDialog } from '../ResumeDialog';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="mesh-overlay" />
      
      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="reveal active">
          <div className="flex items-center gap-2 mb-6">
            <div className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-headline font-bold uppercase tracking-[0.3em] flex items-center gap-2 shadow-[0_0_20px_rgba(167,120,247,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Applied AI & ML Engineer
            </div>
          </div>
          <h1 className="text-6xl lg:text-8xl font-headline font-bold mb-6 leading-[1] tracking-tight">
            {PERSONAL_INFO.name.split(' ').map((word, i) => (
              <span 
                key={i} 
                className={cn(
                  "block",
                  i === 1 && "text-3xl lg:text-4xl opacity-50 font-light",
                  i === 2 && "gradient-text"
                )}
              >
                {word} 
              </span>
            ))}
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 font-headline font-light mb-8 max-w-lg leading-relaxed">
            {PERSONAL_INFO.tagline}
          </p>
          <p className="text-muted-foreground mb-12 max-w-xl leading-relaxed text-lg font-light">
            {PERSONAL_INFO.subtext}
          </p>
          
          <div className="flex flex-wrap gap-5">
            <Button size="lg" className="rounded-full gap-3 px-10 group h-14 text-base font-headline font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-500" asChild>
              <a href="#projects">
                Neural Assets <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-500" />
              </a>
            </Button>
            
            <ResumeDialog />

            <Button size="lg" variant="ghost" className="rounded-full gap-3 px-8 h-14 font-headline border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all" asChild>
              <a href="#contact">
                <Mail className="h-4 w-4" /> Contact
              </a>
            </Button>
          </div>
        </div>

        {/* Right Visualization - Advanced Neural Network Mesh */}
        <div className="relative flex items-center justify-center">
          {/* Neural Connections SVG */}
          <svg className="absolute inset-0 w-[180%] h-[180%] -translate-x-[20%] -translate-y-[20%] opacity-30 pointer-events-none" viewBox="0 0 400 400">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" />
              </linearGradient>
              <filter id="nodeGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Primary Neural Paths */}
            <path d="M50,150 Q150,100 250,250 T350,200" fill="none" stroke="url(#lineGrad)" strokeWidth="0.8" className="synaptic-line" />
            <path d="M100,50 Q200,200 100,350" fill="none" stroke="url(#lineGrad)" strokeWidth="0.8" className="synaptic-line" style={{ animationDelay: '-3s' }} />
            <path d="M300,50 Q150,200 350,350" fill="none" stroke="url(#lineGrad)" strokeWidth="0.8" className="synaptic-line" style={{ animationDelay: '-5.5s' }} />
            
            {/* Soft Blinking Nodes */}
            <circle cx="100" cy="100" r="4" fill="hsl(var(--primary))" className="animate-node-blink" filter="url(#nodeGlow)" />
            <circle cx="300" cy="300" r="4" fill="hsl(var(--secondary))" className="animate-node-blink" style={{ animationDelay: '1s' }} filter="url(#nodeGlow)" />
            <circle cx="200" cy="200" r="6" fill="hsl(var(--primary))" className="animate-node-blink" style={{ animationDelay: '2.5s' }} filter="url(#nodeGlow)" />
          </svg>

          <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
            {/* Main Portrait Container - Organic Neural Shape */}
            <div className="relative w-80 h-80 z-20 group">
              <div className="absolute inset-0 rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] border-2 border-primary/40 animate-pulse-soft" />
              <div className="relative w-full h-full rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] overflow-hidden border-2 border-primary/30 shadow-[0_0_80px_-20px_rgba(167,120,247,0.4)] bg-card/20 backdrop-blur-xl animate-float">
                <Image 
                  src={PERSONAL_INFO.images.hero} 
                  alt={PERSONAL_INFO.name}
                  fill
                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-1000"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none" />
              </div>
              
              {/* Perimeter Synaptic Nodes */}
              <div className="absolute -top-2 left-1/4 w-3 h-3 rounded-full bg-primary animate-node-blink" />
              <div className="absolute top-1/2 -right-3 w-4 h-4 rounded-full bg-secondary animate-node-blink [animation-delay:1s]" />
              <div className="absolute -bottom-2 right-1/4 w-3 h-3 rounded-full bg-primary animate-node-blink [animation-delay:2s]" />
            </div>
            
            {/* Background Glows */}
            <div className="absolute w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse-soft" />
            <div className="absolute w-[30rem] h-[30rem] bg-secondary/5 rounded-full blur-[120px] animate-pulse-soft" style={{ animationDelay: '2s' }} />

            {/* AI Insights Floating Labels */}
            <div className="absolute top-4 -right-8 glass p-5 rounded-3xl animate-float [animation-delay:0.5s] z-30 flex items-center gap-4 border-primary/20">
              <div className="p-3 rounded-2xl bg-primary/20 text-primary">
                <BrainCircuit className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[11px] font-headline font-bold uppercase tracking-[0.2em] block text-primary">Medical CV</span>
                <p className="text-[10px] text-muted-foreground leading-tight mt-1">High-precision diagnostic pipelines</p>
              </div>
            </div>

            <div className="absolute bottom-12 -left-16 glass p-5 rounded-3xl animate-float [animation-delay:2.5s] z-30 flex items-center gap-4 border-secondary/20">
              <div className="p-3 rounded-2xl bg-secondary/20 text-secondary">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[11px] font-headline font-bold uppercase tracking-[0.2em] block text-secondary">ML Systems</span>
                <p className="text-[10px] text-muted-foreground leading-tight mt-1">Scaling healthcare AI platforms</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
