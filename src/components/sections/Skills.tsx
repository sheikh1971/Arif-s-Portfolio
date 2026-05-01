"use client"

import React from 'react';
import { SKILLS } from '@/lib/portfolio-data';

export const Skills = () => {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Technical Arsenal</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From deep learning frameworks to embedded circuit design, I leverage a wide range of tools to build intelligent systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILLS.map((skillGroup, idx) => (
            <div key={idx} className="glass p-8 rounded-2xl border-white/5 group hover:border-primary/20 transition-all animate-reveal" style={{ animationDelay: `${idx * 0.1}s` }}>
              <h3 className="text-sm font-headline font-bold uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((item, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 rounded-md bg-muted/50 text-sm font-medium border border-border group-hover:border-primary/10 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};