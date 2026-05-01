"use client"

import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '@/lib/portfolio-data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AIInsightButton } from '@/components/AIInsightButton';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const FILTER_TAGS = ["All", "AI", "CV", "ML", "Embedded", "HealthTech"];

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
    <section id="projects" className="py-24 bg-muted/5 overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 reveal">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="h-1 w-12 bg-primary rounded-full" />
              <span className="text-[10px] font-headline font-bold uppercase tracking-[0.4em] text-primary">Neural Assets Catalog</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-headline font-bold tracking-tight mb-4">Research & Systems</h2>
            <p className="text-muted-foreground max-w-2xl text-base md:text-lg font-light leading-relaxed mx-auto md:mx-0">
              A curated collection of applied ML projects and clinical vision systems.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {FILTER_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={cn(
                  "px-4 py-2 rounded-full text-[10px] font-headline font-bold transition-all border",
                  activeFilter === tag 
                    ? 'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20' 
                    : 'bg-background hover:bg-muted border-border'
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {filteredProjects.map((project, idx) => (
            <Card key={project.id} className="group overflow-hidden border-border/40 bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-all duration-500 reveal" style={{ transitionDelay: `${idx * 0.1}s` }}>
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  {project.tags.slice(0, 2).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-[8px] bg-background/80 backdrop-blur-md border-white/5 uppercase font-bold px-3 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-xl font-headline tracking-tight group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 mt-2 text-sm font-light leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-4">
                <AIInsightButton 
                  projectName={project.title} 
                  projectDescription={project.description} 
                  projectTags={project.tags}
                  reportData={(project as any).reportData}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};