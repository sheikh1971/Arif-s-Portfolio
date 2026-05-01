"use client"

import React from 'react';
import { PERSONAL_INFO } from '@/lib/portfolio-data';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail } from 'lucide-react';
import { ResumeDialog } from '../ResumeDialog';
import Image from 'next/image';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="animate-reveal [animation-delay:0.2s] z-10">
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

        {/* Right Visualization - User Photo/GIF */}
        <div className="relative hidden md:flex items-center justify-center animate-reveal [animation-delay:0.4s]">
          <div className="relative w-full max-w-md aspect-square">
            {/* Animated Circles/Nodes */}
            <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-8 border border-primary/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            
            {/* Main Portrait with Glassmorphism Effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-72 h-72 rounded-3xl overflow-hidden border border-primary/30 shadow-2xl z-20">
                <Image 
                  src={PERSONAL_INFO.images.hero} 
                  alt={PERSONAL_INFO.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              
              {/* Background Glow */}
              <div className="absolute w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            </div>

            {/* Glass Cards representing core focus */}
            <div className="absolute top-1/4 -left-8 glass p-4 rounded-xl animate-float [animation-delay:1s] z-30 max-w-[150px]">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] font-headline font-bold uppercase tracking-widest">Vision</span>
              </div>
              <p className="text-[9px] text-muted-foreground">Architecting high-precision diagnostic CV pipelines.</p>
            </div>

            <div className="absolute bottom-1/4 -right-8 glass p-4 rounded-xl animate-float [animation-delay:2s] z-30 max-w-[150px]">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-[10px] font-headline font-bold uppercase tracking-widest">Architect</span>
              </div>
              <p className="text-[9px] text-muted-foreground">Designing end-to-end intelligent platforms at WIOCARE.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
