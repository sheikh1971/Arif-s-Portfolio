
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

        {/* Right Visualization */}
        <div className="relative hidden md:flex items-center justify-center animate-reveal [animation-delay:0.4s]">
          <div className="relative w-full aspect-square max-w-lg">
            {/* Abstract AI Neural Web Animation (SVG) */}
            <svg viewBox="0 0 200 200" className="w-full h-full text-primary/20 animate-float">
              <defs>
                <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" style={{ stopColor: '#A778F7', stopOpacity: 0.3 }} />
                  <stop offset="100%" style={{ stopColor: '#48B1F4', stopOpacity: 0 }} />
                </radialGradient>
              </defs>
              <circle cx="100" cy="100" r="80" fill="url(#grad1)" />
              <path d="M40,100 Q100,20 160,100 T40,100" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5,5" />
              <path d="M100,40 Q180,100 100,160 T100,40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5,5" />
              {[...Array(8)].map((_, i) => (
                <circle 
                  key={i} 
                  cx={100 + 60 * Math.cos(i * Math.PI / 4)} 
                  cy={100 + 60 * Math.sin(i * Math.PI / 4)} 
                  r="2" 
                  fill="currentColor" 
                  className="animate-pulse" 
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
              <circle cx="100" cy="100" r="10" className="text-primary" fill="currentColor" />
            </svg>
            
            {/* Tech Floating Elements */}
            <div className="absolute top-1/4 -left-4 glass p-4 rounded-xl text-xs font-headline flex items-center gap-2 animate-float [animation-delay:1s]">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              PyTorch v2.0 Ready
            </div>
            <div className="absolute bottom-1/4 -right-4 glass p-4 rounded-xl text-xs font-headline flex items-center gap-2 animate-float [animation-delay:2s]">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              Vision Architect
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
