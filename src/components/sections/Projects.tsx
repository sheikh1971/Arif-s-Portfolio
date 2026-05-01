"use client"

import React, { useState } from 'react';
import { PROJECTS } from '@/lib/portfolio-data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AIInsightButton } from '@/components/AIInsightButton';
import Image from 'next/image';

const FILTER_TAGS = ["All", "AI", "CV", "ML", "Embedded", "Mobile", "HealthTech"];

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = activeFilter === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.tags.includes(activeFilter) || (activeFilter === "AI" && p.tags.some(t => ["AI", "ML", "Deep Learning"].includes(t))));

  return (
    <section id="projects" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Selected Projects</h2>
            <p className="text-muted-foreground max-w-xl">
              A curated list of technical projects focusing on applied machine learning, computer vision, and architectural system design.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {FILTER_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-4 py-1.5 rounded-full text-xs font-headline transition-all ${
                  activeFilter === tag 
                    ? 'bg-primary text-primary-foreground shadow-lg' 
                    : 'bg-background hover:bg-muted border'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <Card key={project.id} className="group overflow-hidden border-border/50 bg-card/50 hover:bg-card hover:shadow-2xl transition-all duration-500 animate-reveal" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="relative aspect-video overflow-hidden">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  data-ai-hint="AI medical"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {project.tags.slice(0, 2).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-[10px] bg-background/80 backdrop-blur-sm border-white/10 uppercase tracking-tighter">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-headline flex items-center justify-between">
                  {project.title}
                </CardTitle>
                <CardDescription className="line-clamp-3 min-h-[4.5rem] mt-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-3 mt-auto">
                <AIInsightButton 
                  projectName={project.title} 
                  projectDescription={project.description} 
                  projectTags={project.tags}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};