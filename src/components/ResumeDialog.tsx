
"use client"

import React, { useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Download, Loader2, Mail, Phone, MapPin, Globe, Layout, UserMinus, User, Heart, Brain, Zap, Target, Github, Layers } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCE, EDUCATION, SKILLS, IMPACT, PROJECTS } from '@/lib/portfolio-data';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type ResumeTheme = 'neural' | 'midnight' | 'minimal' | 'gold';
type ResumeLayout = 'executive' | 'strategic' | 'architect';

export const ResumeDialog = () => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTheme, setActiveTheme] = useState<ResumeTheme>('neural');
  const [activeLayout, setActiveLayout] = useState<ResumeLayout>('executive');
  const [showImage, setShowImage] = useState(false);

  const themes: { id: ResumeTheme; name: string; color: string }[] = [
    { id: 'neural', name: 'Synaptic Violet', color: 'bg-primary' },
    { id: 'midnight', name: 'Deep Tech', color: 'bg-slate-900' },
    { id: 'minimal', name: 'Clinical White', color: 'bg-slate-200' },
    { id: 'gold', name: 'Strategic Gold', color: 'bg-amber-600' },
  ];

  const layouts: { id: ResumeLayout; name: string; icon: any }[] = [
    { id: 'executive', name: 'Executive', icon: Layout },
    { id: 'strategic', name: 'Strategic', icon: Target },
    { id: 'architect', name: 'Architect', icon: Brain },
  ];

  const handleDownload = async () => {
    if (!resumeRef.current) return;
    setIsGenerating(true);

    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2, 
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`MD_ARIFUL_ISLAM_PROFILE.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const styles = (() => {
    switch (activeTheme) {
      case 'midnight': return { primaryText: 'text-slate-900', accentBorder: 'border-slate-900', accentBg: 'bg-slate-900', headerBg: 'bg-slate-50', iconColor: 'text-slate-700' };
      case 'minimal': return { primaryText: 'text-slate-800', accentBorder: 'border-slate-200', accentBg: 'bg-slate-800', headerBg: 'bg-white', iconColor: 'text-slate-400' };
      case 'gold': return { primaryText: 'text-amber-700', accentBorder: 'border-amber-600', accentBg: 'bg-amber-600', headerBg: 'bg-amber-50/30', iconColor: 'text-amber-600' };
      default: return { primaryText: 'text-primary', accentBorder: 'border-primary/30', accentBg: 'bg-primary', headerBg: 'bg-primary/5', iconColor: 'text-primary' };
    }
  })();

  const githubHandle = PERSONAL_INFO.github.split('/').pop()?.toUpperCase();
  const linkedinHandle = PERSONAL_INFO.linkedin.split('/').pop()?.toUpperCase();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full gap-2 px-8 border-primary/20 hover:bg-primary/5">
          <Download className="h-4 w-4" /> Download Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-6xl h-[92vh] p-0 border-none shadow-2xl flex flex-col overflow-hidden bg-background">
        <DialogHeader className="p-6 md:p-8 bg-background/95 backdrop-blur-md border-b flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shrink-0">
          <div className="flex flex-col gap-1">
            <DialogTitle className="flex items-center gap-2 text-xl font-headline font-bold">
              <Brain className="h-5 w-5 text-primary" />
              Professional Identity Designer
            </DialogTitle>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold opacity-60">Optimized for US, UK & EU Markets</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 bg-muted/30 p-3 rounded-2xl border w-full md:w-auto">
            <div className="flex flex-col gap-1.5 flex-1 md:flex-none">
              <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Photo</span>
              <div className="flex gap-1 bg-background/50 p-1 rounded-full border">
                <Button size="icon" variant={showImage ? "default" : "ghost"} onClick={() => setShowImage(true)} className="h-7 w-7 rounded-full"><User size={12} /></Button>
                <Button size="icon" variant={!showImage ? "default" : "ghost"} onClick={() => setShowImage(false)} className="h-7 w-7 rounded-full"><UserMinus size={12} /></Button>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 flex-1 md:flex-none">
              <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Layout</span>
              <div className="flex gap-1">
                {layouts.map(l => (
                  <Button key={l.id} size="sm" variant={activeLayout === l.id ? "default" : "outline"} onClick={() => setActiveLayout(l.id)} className="h-7 text-[9px] font-bold uppercase px-3 rounded-full">{l.name}</Button>
                ))}
              </div>
            </div>
            <div className="w-px h-8 bg-border hidden md:block" />
            <Button onClick={handleDownload} disabled={isGenerating} className="gap-2 rounded-full px-6 h-10 ml-auto md:ml-0 shadow-lg shadow-primary/20 font-headline font-bold uppercase text-[10px] tracking-widest">
              {isGenerating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Download size={14} />}
              Export PDF
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-auto bg-muted/20 p-4 md:p-12 flex justify-center">
          <div className="scale-[0.5] sm:scale-100 origin-top">
            <div ref={resumeRef} className={cn("bg-white text-[#1f2937] p-12 md:p-16 shadow-2xl mx-auto w-[210mm] min-h-[297mm] flex flex-col font-sans")}>
              {/* Profile Header */}
              <header className={cn("mb-10 p-10 rounded-[2.5rem] grid grid-cols-12 gap-8 relative overflow-hidden", styles.headerBg)}>
                <div className={cn("relative z-10", showImage ? "col-span-8" : "col-span-12")}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={cn("h-1.5 w-12 rounded-full", styles.accentBg)} />
                    <span className="text-[11px] font-bold uppercase tracking-[0.4em] opacity-60">Applied AI & ML Systems Engineer</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 mb-3 uppercase leading-none">
                    {PERSONAL_INFO.name}
                  </h1>
                  <p className={cn("text-xl font-medium mb-8 flex items-center gap-2", styles.primaryText)}>
                     <Zap size={20} /> {PERSONAL_INFO.title}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6 text-[10px] text-slate-500 font-bold uppercase tracking-[0.1em]">
                    <span className="flex items-center gap-2"><MapPin size={14} className={styles.iconColor} /> {PERSONAL_INFO.location}</span>
                    <span className="flex items-center gap-2"><Globe size={14} className={styles.iconColor} /> IN/{linkedinHandle}</span>
                    <span className="flex items-center gap-2"><Github size={14} className={styles.iconColor} /> GH/{githubHandle}</span>
                    <span className="flex items-center gap-2"><Mail size={14} className={styles.iconColor} /> {PERSONAL_INFO.email}</span>
                    <span className="flex items-center gap-2"><Phone size={14} className={styles.iconColor} /> {PERSONAL_INFO.phone}</span>
                  </div>
                </div>
                {showImage && (
                  <div className="col-span-4 flex justify-end relative z-10">
                    <div className="relative w-44 h-44 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white">
                      <Image src={PERSONAL_INFO.images.resume} alt={PERSONAL_INFO.name} fill className="object-cover" unoptimized />
                    </div>
                  </div>
                )}
              </header>

              {/* Main Content Area */}
              <div className="flex-1 space-y-12">
                <section>
                  <h2 className={cn("text-[11px] font-bold uppercase tracking-[0.3em] mb-5 flex items-center gap-2 border-b-2 pb-1.5", styles.accentBorder, styles.primaryText)}>
                    <Target size={14} /> Executive Summary
                  </h2>
                  <p className="text-[12px] leading-relaxed text-slate-600 font-medium">"{PERSONAL_INFO.subtext}"</p>
                </section>

                <div className={cn("grid gap-12", activeLayout === 'strategic' ? 'grid-cols-12' : 'grid-cols-1')}>
                  <div className={cn(activeLayout === 'strategic' ? 'col-span-8' : 'w-full')}>
                    <section>
                      <h2 className={cn("text-[11px] font-bold uppercase tracking-[0.3em] mb-8 flex items-center gap-2 border-b-2 pb-1.5", styles.accentBorder, styles.primaryText)}>
                        <Brain size={14} /> Professional Experience
                      </h2>
                      <div className="space-y-10">
                        {EXPERIENCE.map((exp, i) => (
                          <div key={i} className="relative pl-6 border-l-2 border-slate-100">
                            <div className={cn("absolute -left-[5px] top-0 w-2 h-2 rounded-full", styles.accentBg)} />
                            <div className="flex justify-between items-baseline mb-2">
                              <h3 className="font-bold text-[14px] text-slate-900 uppercase">{exp.company} — <span className={styles.primaryText}>{exp.role}</span></h3>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{exp.period}</span>
                            </div>
                            <p className="text-[10px] font-bold text-slate-500 mb-4 italic opacity-80">{exp.focus}</p>
                            <ul className="space-y-2.5">
                              {exp.highlightProject.responsibilities.map((res, j) => (
                                <li key={j} className="text-[11px] text-slate-600 leading-snug flex gap-3">
                                  <span className={cn("mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 opacity-40", styles.accentBg)} />
                                  {res}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>

                  <div className={cn(activeLayout === 'strategic' ? 'col-span-4 space-y-12' : 'grid grid-cols-2 gap-12')}>
                    <section>
                      <h2 className={cn("text-[11px] font-bold uppercase tracking-[0.3em] mb-6 flex items-center gap-2 border-b-2 pb-1.5", styles.accentBorder, styles.primaryText)}>
                        <Layers size={14} /> Key Tech Assets
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {SKILLS.slice(0, 3).map((group, i) => (
                          <div key={i} className="w-full mb-2">
                            <p className="text-[9px] font-bold text-slate-400 uppercase mb-2">{group.category}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {group.items.map((skill, j) => (
                                <span key={j} className="text-[9px] px-2 py-1 rounded-md bg-slate-50 border border-slate-100 font-bold text-slate-600">{skill}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    <div className="space-y-12">
                      <section>
                        <h2 className={cn("text-[11px] font-bold uppercase tracking-[0.3em] mb-6 flex items-center gap-2 border-b-2 pb-1.5", styles.accentBorder, styles.primaryText)}>
                          <Target size={14} /> Academic
                        </h2>
                        {EDUCATION.map((edu, i) => (
                          <div key={i} className="mb-5">
                            <h3 className="font-bold text-[11px] text-slate-900 leading-tight mb-1">{edu.degree}</h3>
                            <p className="text-[10px] text-slate-500 font-bold">{edu.school} • {edu.period}</p>
                          </div>
                        ))}
                      </section>
                      <section>
                        <h2 className={cn("text-[11px] font-bold uppercase tracking-[0.3em] mb-6 flex items-center gap-2 border-b-2 pb-1.5", styles.accentBorder, styles.primaryText)}>
                          <Heart size={14} /> Social Impact
                        </h2>
                        {IMPACT.map((imp, i) => (
                          <div key={i} className="mb-5">
                            <h3 className="font-bold text-[11px] text-slate-900 leading-tight mb-1">{imp.organization}</h3>
                            <p className={cn("text-[10px] font-bold", styles.primaryText)}>{imp.role}</p>
                          </div>
                        ))}
                      </section>
                    </div>
                  </div>
                </div>

                {activeLayout === 'architect' && (
                  <section>
                    <h2 className={cn("text-[11px] font-bold uppercase tracking-[0.3em] mb-6 flex items-center gap-2 border-b-2 pb-1.5", styles.accentBorder, styles.primaryText)}>
                      <Layers size={14} /> Featured Research Projects
                    </h2>
                    <div className="grid grid-cols-2 gap-8">
                      {PROJECTS.slice(0, 2).map((proj, i) => (
                        <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                          <h3 className="font-bold text-[12px] text-slate-900 mb-2">{proj.title}</h3>
                          <p className="text-[10px] text-slate-600 leading-relaxed line-clamp-3">{proj.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              <footer className="mt-auto pt-12 flex justify-end">
                <div className="text-right border-t-2 border-slate-50 pt-8">
                  <p className={cn("text-2xl font-bold mb-1 tracking-tighter", styles.primaryText)}>{PERSONAL_INFO.name}</p>
                  <p className="text-[9px] uppercase tracking-[0.5em] text-slate-400 font-bold">Applied AI & Machine Learning Systems Identity</p>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
