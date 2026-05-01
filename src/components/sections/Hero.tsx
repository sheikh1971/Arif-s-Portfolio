"use client"

import React from 'react';
import { PERSONAL_INFO } from '@/lib/portfolio-data';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail } from 'lucide-react';
import { ResumeDialog } from '../ResumeDialog';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="animate-reveal [animation-delay:0.2s]">
          <h2 className="text-primary font-headline font-semibold tracking-wider text-sm uppercase mb-4">
            Applied AI & ML Engineer
          </h2>
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
            <Button size="lg" className="rounded-full gap-2 px-8" asChild>
              <a href="#projects">
                View Projects <ArrowRight className="h-4 w-4" />
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

        {/* Right Visualization - Abstract Neural/AI Theme */}
        <div className="relative hidden md:flex items-center justify-center animate-reveal [animation-delay:0.4s]">
          <div className="relative w-full max-w-lg aspect-square">
            {/* Animated Circles/Nodes */}
            <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-8 border border-primary/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            
            {/* Glass Cards representing core focus */}
            <div className="absolute top-1/4 -left-12 glass p-6 rounded-2xl animate-float [animation-delay:1s] z-10 max-w-[200px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-headline font-bold uppercase tracking-widest">Vision Systems</span>
              </div>
              <p className="text-[10px] text-muted-foreground">Architecting high-precision diagnostic and retail CV pipelines.</p>
            </div>

            <div className="absolute bottom-1/4 -right-12 glass p-6 rounded-2xl animate-float [animation-delay:2s] z-10 max-w-[200px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-xs font-headline font-bold uppercase tracking-widest">AI Architect</span>
              </div>
              <p className="text-[10px] text-muted-foreground">Designing end-to-end intelligent platforms at WIOCARE.</p>
            </div>

            {/* Central "Neural" Core */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
              <div className="relative w-48 h-48 rounded-full border border-primary/30 flex items-center justify-center bg-background/40 backdrop-blur-sm">
                <div className="text-4xl">🧠</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};