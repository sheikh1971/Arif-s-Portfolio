"use client"

import React from 'react';
import { EXPERIENCE } from '@/lib/portfolio-data';
import { CheckCircle2, Activity, Brain, Layout, ExternalLink, Cpu } from 'lucide-react';

export const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-muted/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-headline font-bold mb-4">Professional Path</h2>
          <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {EXPERIENCE.map((exp, idx) => (
            <div key={idx} className="animate-reveal relative pl-8 md:pl-0">
              {/* Timeline Line - Mobile Only */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/20 to-transparent md:hidden" />
              
              <div className="flex flex-col md:flex-row gap-6 md:gap-12 group">
                {/* Year Indicator */}
                <div className="md:w-1/4 md:text-right flex items-center md:block gap-3">
                  <div className="w-4 h-4 rounded-full bg-primary md:hidden shrink-0 shadow-[0_0_10px_rgba(167,120,247,0.5)]" />
                  <div>
                    <span className="text-sm font-mono font-bold text-primary tracking-tighter block mb-1">{exp.period}</span>
                    <h3 className="text-lg font-headline font-bold group-hover:text-primary transition-colors">{exp.company}</h3>
                  </div>
                </div>

                <div className="md:w-3/4">
                  <div className="glass p-6 md:p-8 rounded-[2rem] border-primary/10 hover:border-primary/30 transition-all shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                          {exp.company === "WIOCARE" ? <Brain size={20} /> : <Cpu size={20} />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">{exp.highlightProject.name}</p>
                          <p className="text-xs text-primary font-medium tracking-wide">{exp.role}</p>
                        </div>
                      </div>
                      {exp.companyUrl && (
                        <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-muted text-muted-foreground transition-all">
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed italic">
                      {exp.focus}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-headline uppercase tracking-widest text-primary/70 font-bold">Key Responsibilities</h4>
                        <ul className="space-y-2">
                          {exp.highlightProject.responsibilities.map((r, i) => (
                            <li key={i} className="text-xs flex items-start gap-2 text-foreground/80 leading-relaxed">
                              <CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" /> {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-headline uppercase tracking-widest text-primary/70 font-bold">System Focus</h4>
                        <ul className="space-y-2">
                          {exp.highlightProject.components.map((c, i) => (
                            <li key={i} className="text-xs flex items-start gap-2 text-foreground/80 leading-relaxed">
                              <Layout className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" /> {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};