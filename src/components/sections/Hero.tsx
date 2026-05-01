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

        {/* Right Visualization - Profile Image */}
        <div className="relative hidden md:flex items-center justify-center animate-reveal [animation-delay:0.4s]">
          <div className="relative w-full aspect-[3/4] max-w-sm rounded-[2rem] overflow-hidden shadow-2xl border-4 border-primary/20 bg-muted/20">
            <Image 
              src={PERSONAL_INFO.profileImage} 
              alt={PERSONAL_INFO.name}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            
            {/* Tech Floating Elements overlaid on image or around it */}
            <div className="absolute top-1/4 -left-6 glass p-4 rounded-xl text-[10px] font-headline flex items-center gap-2 animate-float [animation-delay:1s] z-10">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Vision Systems
            </div>
            <div className="absolute bottom-1/4 -right-6 glass p-4 rounded-xl text-[10px] font-headline flex items-center gap-2 animate-float [animation-delay:2s] z-10">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              AI Architect
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};