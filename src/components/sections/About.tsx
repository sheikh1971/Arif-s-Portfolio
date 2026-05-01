"use client"

import React from 'react';
import { PERSONAL_INFO } from '@/lib/portfolio-data';
import Image from 'next/image';

export const About = () => {
  return (
    <section id="about" className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative animate-reveal">
            <div className="relative aspect-square rounded-full overflow-hidden shadow-2xl border bg-card">
              <Image 
                src={PERSONAL_INFO.images.about} 
                alt="Md. Ariful Islam Full Portrait"
                fill
                className="object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl hidden lg:block">
              <p className="text-primary font-headline font-bold text-2xl">10+ Years</p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Social Leadership</p>
            </div>
          </div>

          <div className="animate-reveal [animation-delay:0.2s]">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-8">Engineer, Designer, Activist</h2>
            
            <div className="space-y-6 text-lg leading-relaxed text-foreground/80 font-light">
              <p>
                I am a multi-disciplinary <span className="text-primary font-medium">Applied AI & Machine Learning Engineer</span> based in Chittagong, Bangladesh, with a background that spans technology, spatial design, and social leadership.
              </p>
              <p>
                My primary focus is at <span className="font-medium text-foreground">WIOCARE</span>, where I architect intelligent healthcare systems. Parallel to this, I push the boundaries of retail technology at <span className="font-medium text-foreground">CottonsWorld</span>, developing computer vision solutions for virtual try-on experiences.
              </p>
              <p className="text-base md:text-lg">
                Beyond the screen, I am a trained <span className="text-primary/80">Interior Designer</span> and a lifelong social activist, serving as the Founder and President of the <span className="italic">Human Welfare Organisation</span>. This unique blend of skills allows me to approach AI system design with a human-centric, empathetic, and structurally sound perspective.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
                <div className="p-5 border rounded-2xl bg-background/50">
                  <h4 className="font-headline font-bold mb-3 text-sm text-primary uppercase tracking-wider">Core Technical Focus</h4>
                  <ul className="text-xs space-y-2 text-muted-foreground font-body">
                    <li>• Applied AI System Architecture</li>
                    <li>• Medical Image Segmentation</li>
                    <li>• Computer Vision for Retail</li>
                    <li>• Conversational AI (Healthcare)</li>
                  </ul>
                </div>
                <div className="p-5 border rounded-2xl bg-background/50">
                  <h4 className="font-headline font-bold mb-3 text-sm text-primary uppercase tracking-wider">Creative & Leadership</h4>
                  <ul className="text-xs space-y-2 text-muted-foreground font-body">
                    <li>• Interior Design & CAD</li>
                    <li>• Community Leadership</li>
                    <li>• Public Advocacy</li>
                    <li>• Strategic Fundraising</li>
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
