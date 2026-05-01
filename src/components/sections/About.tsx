"use client"

import React from 'react';
import { PERSONAL_INFO } from '@/lib/portfolio-data';

export const About = () => {
  return (
    <section id="about" className="py-24 bg-muted/20">
      <div className="max-w-4xl mx-auto px-6 text-center md:text-left animate-reveal">
        <h2 className="text-3xl md:text-4xl font-headline font-bold mb-8">Engineer, Designer, Activist</h2>
        
        <div className="space-y-6 text-lg md:text-xl leading-relaxed text-foreground/80 font-light">
          <p>
            I am a multi-disciplinary <span className="text-primary font-medium">Applied AI & Machine Learning Engineer</span> based in Chittagong, Bangladesh, with a background that spans technology, spatial design, and social leadership.
          </p>
          <p>
            My primary focus is at <span className="font-medium text-foreground">WIOCARE</span>, where I architect intelligent healthcare systems. Parallel to this, I push the boundaries of retail technology at <span className="font-medium text-foreground">CottonsWorld</span>, developing computer vision solutions for virtual try-on experiences.
          </p>
          <p className="text-base md:text-lg">
            Beyond the screen, I am a trained <span className="text-primary/80">Interior Designer</span> and a lifelong social activist, serving as the Founder and President of the <span className="italic">Human Welfare Organisation</span>. This unique blend of skills allows me to approach AI system design with a human-centric, empathetic, and structurally sound perspective.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 pt-8 text-left">
            <div className="p-6 border rounded-2xl bg-background/50">
              <h4 className="font-headline font-bold mb-4 text-primary">Core Technical Focus</h4>
              <ul className="text-sm space-y-2 text-muted-foreground font-body">
                <li>• Applied AI System Architecture</li>
                <li>• Medical Image Segmentation & Analysis</li>
                <li>• Computer Vision for Retail (Virtual Try-On)</li>
                <li>• Conversational AI (Healthcare Chatbots)</li>
                <li>• End-to-end AI Product Integration</li>
              </ul>
            </div>
            <div className="p-6 border rounded-2xl bg-background/50">
              <h4 className="font-headline font-bold mb-4 text-primary">Creative & Leadership</h4>
              <ul className="text-sm space-y-2 text-muted-foreground font-body">
                <li>• Interior Design & CAD Planning</li>
                <li>• Community Leadership & Philanthropy</li>
                <li>• Public Advocacy (Youth Parliament)</li>
                <li>• Strategic Fundraising & Social Impact</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
