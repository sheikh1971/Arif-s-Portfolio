"use client"

import React from 'react';
import { EXPERIENCE } from '@/lib/portfolio-data';
import { CheckCircle2, Activity, Brain, Layout, Sparkles, ExternalLink } from 'lucide-react';

export const Experience = () => {
  return (
    <section id="experience" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-headline font-bold mb-16 text-center">Professional Path</h2>

        {EXPERIENCE.map((exp, idx) => (
          <div key={idx} className="max-w-5xl mx-auto animate-reveal">
            <div className="flex flex-col md:flex-row gap-8 mb-20 relative">
              {/* Timeline Connector */}
              <div className="hidden md:block absolute left-[15.5px] top-8 bottom-0 w-[1px] bg-gradient-to-b from-primary via-primary/30 to-transparent" />
              
              <div className="md:w-1/3">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shrink-0">
                    <Activity size={16} />
                  </div>
                  {(exp as any).companyUrl ? (
                    <a 
                      href={(exp as any).companyUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group/link flex items-center gap-2"
                    >
                      <h3 className="text-xl font-headline font-bold group-hover/link:text-primary transition-colors">{exp.company}</h3>
                      <ExternalLink size={14} className="text-muted-foreground group-hover/link:text-primary transition-colors" />
                    </a>
                  ) : (
                    <h3 className="text-xl font-headline font-bold">{exp.company}</h3>
                  )}
                </div>
                <p className="text-primary font-medium mb-1">{exp.role}</p>
                <p className="text-sm text-muted-foreground">{exp.period}</p>
                <p className="mt-4 text-sm font-headline italic border-l-2 border-primary/20 pl-4 py-2">
                  {exp.focus}
                </p>
              </div>

              <div className="md:w-2/3 space-y-8">
                {/* Main Project Card */}
                <div className="glass p-8 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary/10 transition-colors" />
                  
                  <div className="flex items-center gap-3 mb-6">
                    {exp.company === "WIOCARE" ? <Brain className="text-primary h-6 w-6" /> : <Sparkles className="text-primary h-6 w-6" />}
                    <h4 className="text-2xl font-headline font-bold">{exp.highlightProject.name}</h4>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <p className="text-xs font-headline uppercase tracking-widest text-primary mb-3">Key Role</p>
                      <p className="font-medium mb-4">{exp.highlightProject.role}</p>
                      <p className="text-xs font-headline uppercase tracking-widest text-primary mb-3">Impact & Responsibilities</p>
                      <ul className="space-y-2">
                        {exp.highlightProject.responsibilities.map((r, i) => (
                          <li key={i} className="text-sm flex items-start gap-2 text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /> {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-headline uppercase tracking-widest text-primary mb-3">System Focus</p>
                      <ul className="space-y-2 mb-6">
                        {exp.highlightProject.components.map((c, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <Layout className="h-4 w-4 text-primary mt-0.5 shrink-0" /> {c}
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs font-headline uppercase tracking-widest text-primary mb-3">Outcome</p>
                      <ul className="space-y-2">
                        {exp.highlightProject.impact.map((im, i) => (
                          <li key={i} className="text-sm text-muted-foreground">• {im}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Secondary Project/Role */}
                <div className="p-6 rounded-2xl border bg-card/40 flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    {idx === 0 ? "🤝" : "📐"}
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-lg mb-1">{exp.secondaryProject.name}</h4>
                    <p className="text-sm text-muted-foreground">{exp.secondaryProject.details}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
