"use client"

import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '@/lib/portfolio-data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AIInsightButton } from '@/components/AIInsightButton';
import Image from 'next/image';

const FILTER_TAGS = ["All", "AI", "CV", "ML", "Embedded", "Mobile", "HealthTech"];

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
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
  }, [activeFilter]);

  const filteredProjects = activeFilter === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.tags.includes(activeFilter) || (activeFilter === "AI" && p.tags.some(t => ["AI", "ML", "Deep Learning"].includes(t))));

  return (
    <section id="projects" className="py-32 bg-muted/5" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-10 reveal">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-12 bg-primary rounded-full" />
              <span className="text-[10px] font-headline font-bold uppercase tracking-[0.4em] text-primary">Neural Assets Catalog</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight mb-6">Selected Research & Systems</h2>
            <p className="text-muted-foreground max-w-2xl text-lg font-light leading-relaxed">
              A curated collection of applied ML projects, specializing in clinical vision systems and intelligent architectural implementations.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {FILTER_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-6 py-2.5 rounded-full text-xs font-headline font-bold transition-all duration-500 border-2 ${
                  activeFilter === tag 
                    ? 'bg-primary border-primary text-primary-foreground shadow-[0_0_20px_rgba(167,120,247,0.3)]' 
                    : 'bg-background hover:bg-muted border-border hover:border-primary/30'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map((project, idx) => (
            <Card key={project.id} className="group overflow-hidden border-2 border-border/50 bg-card/20 backdrop-blur-sm hover:bg-card/40 hover:border-primary/30 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-700 reveal" style={{ transitionDelay: `${idx * 0.1}s` }}>
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.2] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />
                
                {/* Synaptic blinking dot on image */}
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary animate-node-blink" style={{ animationDelay: `${idx * 0.5}s` }} />
                
                <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                  {project.tags.slice(0, 2).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-[9px] bg-background/60 backdrop-blur-md border-white/10 uppercase tracking-[0.1em] font-bold px-3 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-2xl font-headline tracking-tight group-hover:text-primary transition-colors duration-500">
                  {project.title}
                </CardTitle>
                <CardDescription className="line-clamp-3 min-h-[4.5rem] mt-4 text-base font-light leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-4 flex items-center gap-4">
                <AIInsightButton 
                  projectName={project.title} 
                  projectDescription={project.description} 
                  projectTags={project.tags}
                  reportData={(project as any).reportData}
                />
                <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};