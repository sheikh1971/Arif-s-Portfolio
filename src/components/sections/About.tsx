"use client"

import React, { useEffect, useRef } from 'react';
import { PERSONAL_INFO } from '@/lib/portfolio-data';
import Image from 'next/image';

export const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const revealElements = sectionRef.current?.querySelectorAll('.reveal');
    revealElements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-32 bg-muted/5 relative overflow-hidden" ref={sectionRef}>
      {/* Background soft nodes */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-[100px] animate-pulse-soft" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] animate-pulse-soft" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="relative reveal">
            <div className="relative w-full aspect-square group">
              {/* Organic Neural Container */}
              <div className="relative w-full h-full rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%] overflow-hidden shadow-2xl border-2 border-primary/20 bg-card/40 backdrop-blur-sm flex items-center justify-center animate-float">
                <Image 
                  src={PERSONAL_INFO.images.about} 
                  alt="Md. Ariful Islam Full Portrait"
                  fill
                  className="object-contain transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
              </div>
              
              {/* Perimeter Synaptic Nodes */}
              <div className="absolute top-1/4 -left-4 w-4 h-4 rounded-full bg-primary animate-node-blink shadow-[0_0_15px_hsl(var(--primary))]" />
              <div className="absolute bottom-1/4 -right-4 w-4 h-4 rounded-full bg-secondary animate-node-blink [animation-delay:1.5s] shadow-[0_0_15px_hsl(var(--secondary))]" />
            </div>

            <div className="absolute -bottom-10 -right-6 glass p-8 rounded-[2rem] border-primary/30 animate-float shadow-2xl z-30">
              <p className="text-primary font-headline font-bold text-3xl">10+ Years</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold mt-1">Social Leadership</p>
            </div>
          </div>

          <div className="reveal [transition-delay:0.2s]">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-1 bg-primary rounded-full" />
              <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">Engineer, Designer, Activist</h2>
            </div>
            
            <div className="space-y-8 text-xl leading-relaxed text-foreground/80 font-light">
              <p>
                I am a multi-disciplinary <span className="text-primary font-medium">Applied AI & Machine Learning Engineer</span> based in Chittagong, Bangladesh, with a background that spans technology, spatial design, and social leadership.
              </p>
              <p>
                My primary focus is at <span className="font-medium text-foreground">WIOCARE</span>, where I architect intelligent healthcare systems. Parallel to this, I push the boundaries of retail technology at <span className="font-medium text-foreground">CottonsWorld</span>, developing computer vision solutions for virtual try-on experiences.
              </p>
              <p className="text-lg">
                Beyond the screen, I am a trained <span className="text-primary/80">Interior Designer</span> and a lifelong social activist, serving as the Founder and President of the <span className="italic">Human Welfare Organisation</span>. This unique blend of skills allows me to approach AI system design with a human-centric, empathetic, and structurally sound perspective.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-10">
                <div className="p-8 border-2 border-primary/10 rounded-[2rem] bg-background/40 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 group">
                  <h4 className="font-headline font-bold mb-5 text-sm text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary group-hover:animate-ping" />
                    Core Technical
                  </h4>
                  <ul className="text-xs space-y-3 text-muted-foreground font-body font-medium">
                    <li className="flex items-center gap-2">Applied AI System Architecture</li>
                    <li className="flex items-center gap-2">Medical Image Segmentation</li>
                    <li className="flex items-center gap-2">Computer Vision for Retail</li>
                    <li className="flex items-center gap-2">Conversational AI (Healthcare)</li>
                  </ul>
                </div>
                <div className="p-8 border-2 border-secondary/10 rounded-[2rem] bg-background/40 backdrop-blur-sm hover:border-secondary/30 transition-all duration-500 group">
                  <h4 className="font-headline font-bold mb-5 text-sm text-secondary uppercase tracking-[0.2em] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary group-hover:animate-ping" />
                    Creative Leadership
                  </h4>
                  <ul className="text-xs space-y-3 text-muted-foreground font-body font-medium">
                    <li className="flex items-center gap-2">Interior Design & CAD</li>
                    <li className="flex items-center gap-2">Community Leadership</li>
                    <li className="flex items-center gap-2">Public Advocacy</li>
                    <li className="flex items-center gap-2">Strategic Fundraising</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};