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
    <section className="relative min-h-[100svh] flex items-center pt-24 pb-12 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="mesh-overlay" />
      
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        {/* Left Content */}
        <div className="animate-reveal text-center lg:text-left order-2 lg:order-1">
          <div className="flex justify-center lg:justify-start items-center gap-2 mb-6">
            <div className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-headline font-bold uppercase tracking-[0.3em] flex items-center gap-2 shadow-[0_0_20px_rgba(167,120,247,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Applied AI & ML Engineer
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-bold mb-6 leading-[1.1] tracking-tight">
            {PERSONAL_INFO.name.split(' ').map((word, i) => (
              <span 
                key={i} 
                className={cn(
                  "block",
                  word === "(Md.)" && "text-2xl md:text-3xl lg:text-4xl opacity-50 font-light",
                  i === 2 && "gradient-text"
                )}
              >
                {word} 
              </span>
            ))}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-foreground/80 font-headline font-light mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            {PERSONAL_INFO.tagline}
          </p>
          <p className="text-muted-foreground mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed text-base lg:text-lg font-light">
            {PERSONAL_INFO.subtext}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Button size="lg" className="w-full sm:w-auto rounded-full gap-3 px-10 group h-14 text-sm font-headline font-bold shadow-xl shadow-primary/20" asChild>
              <a href="#projects">
                Neural Assets <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </a>
            </Button>
            
            <ResumeDialog />

            <Button size="lg" variant="ghost" className="w-full sm:w-auto rounded-full gap-3 px-8 h-14 font-headline border border-transparent hover:border-primary/20 hover:bg-primary/5" asChild>
              <a href="#contact">
                <Mail className="h-4 w-4" /> Contact
              </a>
            </Button>
          </div>
        </div>

        {/* Right Visualization */}
        <div className="relative flex items-center justify-center order-1 lg:order-2 py-8 lg:py-0">
          <div className="relative w-full max-w-sm md:max-w-md aspect-square flex items-center justify-center">
            {/* Main Portrait Container - Organic Neural Shape */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 z-20 group">
              <div className="absolute inset-0 rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] border-2 border-primary/40 animate-pulse-soft" />
              <div className="relative w-full h-full rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] overflow-hidden border-2 border-primary/30 shadow-[0_0_60px_-15px_rgba(167,120,247,0.3)] bg-card/20 backdrop-blur-xl animate-float">
                <Image 
                  src={PERSONAL_INFO.images.hero} 
                  alt={PERSONAL_INFO.name}
                  fill
                  className="object-contain p-4 transition-transform duration-700"
                  priority
                />
              </div>
              
              {/* Perimeter Synaptic Nodes */}
              <div className="absolute -top-2 left-1/4 w-3 h-3 rounded-full bg-primary animate-pulse" />
              <div className="absolute top-1/2 -right-3 w-4 h-4 rounded-full bg-secondary animate-pulse [animation-delay:1s]" />
            </div>
            
            {/* Background Glows */}
            <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-primary/10 rounded-full blur-[80px] animate-pulse-soft" />

            {/* AI Insights Floating Labels - Desktop Only for clarity */}
            <div className="hidden lg:flex absolute top-4 -right-8 glass p-4 rounded-3xl animate-float [animation-delay:0.5s] z-30 items-center gap-4 border-primary/20">
              <div className="p-3 rounded-2xl bg-primary/20 text-primary">
                <BrainCircuit className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-headline font-bold uppercase tracking-[0.2em] block text-primary">Medical CV</span>
                <p className="text-[9px] text-muted-foreground leading-tight mt-1">High-precision diagnostic pipelines</p>
              </div>
            </div>

            <div className="hidden lg:flex absolute bottom-12 -left-16 glass p-4 rounded-3xl animate-float [animation-delay:2.5s] z-30 items-center gap-4 border-secondary/20">
              <div className="p-3 rounded-2xl bg-secondary/20 text-secondary">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-headline font-bold uppercase tracking-[0.2em] block text-secondary">ML Systems</span>
                <p className="text-[9px] text-muted-foreground leading-tight mt-1">Scaling healthcare AI platforms</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};