"use client"

import React from 'react';

export const About = () => {
  return (
    <section id="about" className="py-24 bg-muted/20">
      <div className="max-w-4xl mx-auto px-6 text-center md:text-left animate-reveal">
        <h2 className="text-3xl md:text-4xl font-headline font-bold mb-8">Engineering with Impact</h2>
        
        <div className="space-y-6 text-lg md:text-xl leading-relaxed text-foreground/80 font-light">
          <p>
            I am an <span className="text-primary font-medium">Applied AI & Machine Learning Engineer</span> focused on designing and building intelligent systems for real-world applications.
          </p>
          <p>
            Currently at <span className="font-medium text-foreground">Jionex IT</span>, I play a key role in developing AI-driven solutions, especially in healthcare through the WIOCARE platform. 
            I bridge the gap between high-level research models and production-grade applications that users can actually interact with.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 pt-8">
            <div className="p-6 border rounded-2xl bg-background/50">
              <h4 className="font-headline font-bold mb-4 text-primary">Technical Expertise</h4>
              <ul className="text-sm space-y-2 text-muted-foreground font-body">
                <li>• AI System Architecture</li>
                <li>• Machine Learning & Deep Learning Pipelines</li>
                <li>• Computer Vision Applications</li>
                <li>• Conversational AI Systems</li>
                <li>• End-to-end Product Integration</li>
              </ul>
            </div>
            <div className="flex flex-col justify-center">
              <p className="italic text-base text-muted-foreground">
                "I combine engineering with system design thinking, focusing on turning research-grade AI into production-ready systems that solve actual problems."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};