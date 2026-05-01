
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
import { Download, Loader2, FileText, Mail, Phone, MapPin, Globe, Layout, UserMinus, User, Heart, Brain, Zap, Target } from 'lucide-react';
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
    { id: 'strategic', name: 'Strategic', icon: Layout },
    { id: 'architect', name: 'Architect', icon: Layout },
  ];

  const handleDownload = async () => {
    if (!resumeRef.current) return;
    setIsGenerating(true);

    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 3, 
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

  const getThemeStyles = () => {
    switch (activeTheme) {
      case 'midnight':
        return {
          primaryText: 'text-slate-900',
          accentBorder: 'border-slate-900',
          accentBg: 'bg-slate-900',
          headerBg: 'bg-slate-50',
          fontFamily: 'font-sans',
          iconColor: 'text-slate-700'
        };
      case 'minimal':
        return {
          primaryText: 'text-slate-800',
          accentBorder: 'border-slate-200',
          accentBg: 'bg-slate-800',
          headerBg: 'bg-white',
          fontFamily: 'font-sans',
          iconColor: 'text-slate-400'
        };
      case 'gold':
        return {
          primaryText: 'text-amber-700',
          accentBorder: 'border-amber-600',
          accentBg: 'bg-amber-600',
          headerBg: 'bg-amber-50/30',
          fontFamily: 'font-headline',
          iconColor: 'text-amber-600'
        };
      default:
        return {
          primaryText: 'text-primary',
          accentBorder: 'border-primary/30',
          accentBg: 'bg-primary',
          headerBg: 'bg-primary/5',
          fontFamily: 'font-headline',
          iconColor: 'text-primary'
        };
    }
  };

  const styles = getThemeStyles();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="rounded-full gap-2 px-8 border-primary/20 hover:bg-primary/5">
          <Download className="h-4 w-4" /> Download Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto bg-slate-50 dark:bg-slate-950 p-0 border-none shadow-2xl">
        <DialogHeader className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 text-left">
            <DialogTitle className="flex items-center gap-3 text-2xl font-headline font-bold">
              <Brain className="h-6 w-6 text-primary" />
              Professional Identity Designer
            </DialogTitle>
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold opacity-60">Synthesis of Technical & Creative Assets</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-6 bg-muted/40 p-4 rounded-3xl border border-primary/10">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Identity Image</span>
              <div className="flex gap-2 bg-background/50 p-1 rounded-full border">
                <Button size="sm" variant={showImage ? "default" : "ghost"} onClick={() => setShowImage(true)} className="h-8 w-8 p-0 rounded-full"><User className="h-4 w-4" /></Button>
                <Button size="sm" variant={!showImage ? "default" : "ghost"} onClick={() => setShowImage(false)} className="h-8 w-8 p-0 rounded-full"><UserMinus className="h-4 w-4" /></Button>
              </div>
            </div>
            <div className="w-px h-10 bg-border hidden md:block" />
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Architecture</span>
              <div className="flex gap-1.5">
                {layouts.map((l) => (
                  <Button key={l.id} size="sm" variant={activeLayout === l.id ? "default" : "outline"} onClick={() => setActiveLayout(l.id)} className="h-8 text-[10px] font-bold uppercase px-4 rounded-full border-primary/10">{l.name}</Button>
                ))}
              </div>
            </div>
            <div className="w-px h-10 bg-border hidden md:block" />
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Visual Theme</span>
              <div className="flex gap-3 px-2">
                {themes.map((t) => (
                  <button key={t.id} onClick={() => setActiveTheme(t.id)} className={cn("w-6 h-6 rounded-full border-2 transition-all hover:scale-125", activeTheme === t.id ? "ring-2 ring-offset-2 ring-primary border-white" : "border-transparent opacity-60", t.color)} />
                ))}
              </div>
            </div>
            <div className="w-px h-10 bg-border hidden md:block" />
            <Button onClick={handleDownload} disabled={isGenerating} className="gap-2 rounded-full px-8 h-12 shadow-xl shadow-primary/20 font-headline font-bold uppercase text-xs tracking-widest">
              {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              Export PDF
            </Button>
          </div>
        </DialogHeader>

        <div className="flex justify-center p-12 bg-slate-200 dark:bg-slate-900/50">
          <div ref={resumeRef} className={cn("bg-white text-[#1f2937] p-16 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] mx-auto w-[210mm] min-h-[297mm] flex flex-col transition-all duration-700", styles.fontFamily)}>
            
            {/* High-End Architectural Header */}
            <header className={cn("mb-12 p-12 rounded-[2.5rem] flex items-center justify-between gap-12 transition-all relative overflow-hidden", styles.headerBg)}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="flex-1 relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className={cn("h-1 w-12 rounded-full", styles.accentBg)} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-60">Professional Profile // {PERSONAL_INFO.title}</span>
                </div>
                <h1 className="text-5xl font-bold tracking-tighter text-slate-900 mb-2 uppercase leading-none">{PERSONAL_INFO.name}</h1>
                <p className={cn("text-xl font-medium mb-8 flex items-center gap-3", styles.primaryText)}>
                   <Zap size={18} /> {PERSONAL_INFO.title}
                </p>
                <div className="grid grid-cols-2 gap-y-3 gap-x-8 text-[10px] text-slate-500 font-bold uppercase tracking-[0.15em]">
                  <span className="flex items-center gap-2"><MapPin className={cn("h-3.5 w-3.5", styles.iconColor)} /> {PERSONAL_INFO.location}</span>
                  <span className="flex items-center gap-2"><Globe className={cn("h-3.5 w-3.5", styles.iconColor)} /> LINKEDIN.COM/IN/MARIFULISLAM</span>
                  <span className="flex items-center gap-2"><Mail className={cn("h-3.5 w-3.5", styles.iconColor)} /> {PERSONAL_INFO.email}</span>
                  <span className="flex items-center gap-2"><Phone className={cn("h-3.5 w-3.5", styles.iconColor)} /> {PERSONAL_INFO.phone}</span>
                </div>
              </div>
              {showImage && (
                <div className="relative w-44 h-44 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white shrink-0 z-10 transition-transform hover:scale-105 duration-500">
                  <Image src={PERSONAL_INFO.images.resume} alt={PERSONAL_INFO.name} fill className="object-contain" unoptimized />
                </div>
              )}
            </header>

            {activeLayout === 'executive' && (
              <div className="space-y-12">
                <section className="relative">
                  <div className={cn("absolute -left-6 top-0 bottom-0 w-1 rounded-full", styles.accentBg)} />
                  <h2 className={cn("text-xs font-bold uppercase tracking-[0.3em] mb-6 flex items-center gap-3", styles.primaryText)}>
                    <Target size={14} /> Strategic Summary
                  </h2>
                  <p className="text-[11.5px] leading-[2] text-slate-600 font-medium italic pr-12">"{PERSONAL_INFO.subtext}"</p>
                </section>

                <section>
                  <h2 className={cn("text-xs font-bold uppercase tracking-[0.3em] mb-8 flex items-center gap-3 border-b pb-2", styles.accentBorder, styles.primaryText)}>
                    <Brain size={14} /> Professional Trajectory
                  </h2>
                  <div className="space-y-10">
                    {EXPERIENCE.map((exp, i) => (
                      <div key={i} className="relative pl-6">
                        <div className={cn("absolute left-0 top-1 bottom-0 w-px bg-gradient-to-b to-transparent", styles.accentBorder)} />
                        <div className={cn("absolute left-[-3px] top-1 w-1.5 h-1.5 rounded-full", styles.accentBg)} />
                        <div className="flex justify-between items-baseline mb-2">
                          <h3 className="font-bold text-[14px] text-slate-900 uppercase tracking-tight">{exp.company} — <span className={styles.primaryText}>{exp.role}</span></h3>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{exp.period}</span>
                        </div>
                        <p className="text-[10px] font-bold text-slate-500 mb-4 uppercase tracking-widest italic opacity-70">{exp.focus}</p>
                        <ul className="space-y-2.5">
                          {exp.highlightProject.responsibilities.map((res, j) => (
                            <li key={j} className="text-[11px] text-slate-600 leading-normal font-medium flex gap-3">
                              <span className={cn("mt-1.5 h-1 w-1 rounded-full shrink-0", styles.accentBg)} />
                              {res}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="grid grid-cols-2 gap-16">
                  <section>
                    <h2 className={cn("text-xs font-bold uppercase tracking-[0.3em] mb-6 flex items-center gap-3 border-b pb-2", styles.accentBorder, styles.primaryText)}>
                      <Target size={14} /> Academic Foundation
                    </h2>
                    <div className="space-y-6">
                      {EDUCATION.map((edu, i) => (
                        <div key={i} className="group">
                          <h3 className="font-bold text-[11px] text-slate-900 leading-snug group-hover:text-primary transition-colors">{edu.degree}</h3>
                          <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-tighter">{edu.school} • {edu.period}</p>
                          <p className="text-[10px] text-slate-400 font-medium mt-1 italic leading-relaxed">{edu.focus}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                  <section>
                    <h2 className={cn("text-xs font-bold uppercase tracking-[0.3em] mb-6 flex items-center gap-3 border-b pb-2", styles.accentBorder, styles.primaryText)}>
                      <Heart size={14} /> Social Leadership
                    </h2>
                    <div className="space-y-6">
                      {IMPACT.map((imp, i) => (
                        <div key={i}>
                          <h3 className="font-bold text-[11px] text-slate-900 leading-snug">{imp.organization}</h3>
                          <p className={cn("text-[10px] font-bold uppercase tracking-widest mt-1", styles.primaryText)}>{imp.role}</p>
                          <p className="text-[10px] text-slate-500 font-medium mt-2 leading-relaxed italic">• {imp.achievements[0]}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <section className={cn("p-10 rounded-3xl border transition-all", styles.headerBg, styles.accentBorder)}>
                  <h2 className={cn("text-xs font-bold uppercase tracking-[0.3em] mb-8 flex items-center gap-3", styles.primaryText)}>
                    <Zap size={14} /> Technical Arsenal
                  </h2>
                  <div className="grid grid-cols-3 gap-x-10 gap-y-6">
                    {SKILLS.slice(0, 6).map((group, i) => (
                      <div key={i}>
                        <h3 className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">{group.category}</h3>
                        <p className="text-[11px] text-slate-700 leading-relaxed font-bold">{group.items.join(' // ')}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {activeLayout === 'strategic' && (
              <div className="grid grid-cols-12 gap-16 flex-1">
                <div className="col-span-8 space-y-12">
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                       <Target size={16} className={styles.iconColor} />
                       <h2 className={cn("text-xs font-bold uppercase tracking-[0.3em]", styles.primaryText)}>Executive Narrative</h2>
                    </div>
                    <p className="text-[11.5px] leading-[2] text-slate-600 font-medium border-l-2 pl-6 ml-2 italic">{PERSONAL_INFO.subtext}</p>
                  </section>
                  <section>
                    <div className="flex items-center gap-3 mb-8">
                       <Brain size={16} className={styles.iconColor} />
                       <h2 className={cn("text-xs font-bold uppercase tracking-[0.3em]", styles.primaryText)}>Technical Career Path</h2>
                    </div>
                    <div className="space-y-10">
                      {EXPERIENCE.map((exp, i) => (
                        <div key={i} className="group">
                          <div className="flex justify-between mb-2">
                            <h3 className="font-bold text-[14px] text-slate-900 uppercase">{exp.company}</h3>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{exp.period}</span>
                          </div>
                          <p className={cn("text-[11px] font-bold mb-4 uppercase tracking-widest", styles.primaryText)}>{exp.role}</p>
                          <ul className="space-y-2.5 pl-4">
                            {exp.highlightProject.responsibilities.map((res, j) => (
                              <li key={j} className="text-[11px] text-slate-600 leading-normal font-medium flex gap-3">
                                <span className={cn("mt-1.5 h-1 w-1 rounded-full shrink-0", styles.accentBg)} />
                                {res}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                  <section>
                    <div className="flex items-center gap-3 mb-8">
                       <Zap size={16} className={styles.iconColor} />
                       <h2 className={cn("text-xs font-bold uppercase tracking-[0.3em]", styles.primaryText)}>System Research & Architecture</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      {PROJECTS.slice(0, 4).map((proj, i) => (
                        <div key={i} className="p-6 border rounded-3xl border-slate-100 bg-slate-50/50 hover:bg-white transition-all shadow-sm">
                          <h3 className="font-bold text-[12px] text-slate-900 mb-2 uppercase tracking-tight">{proj.title}</h3>
                          <p className="text-[9px] text-slate-500 leading-relaxed line-clamp-2 mb-3">{proj.description.split('.')[0]}.</p>
                          <div className="flex flex-wrap gap-1.5">
                            {proj.tags.slice(0, 2).map(t => (
                              <span key={t} className="text-[8px] font-bold px-2 py-1 bg-white border rounded-full text-slate-500 uppercase tracking-widest">{t}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
                <div className={cn("col-span-4 space-y-12 p-10 rounded-[3rem] border-l transition-all", styles.headerBg, styles.accentBorder)}>
                  <section>
                    <h2 className={cn("text-xs font-bold uppercase tracking-[0.3em] border-b pb-2 mb-8", styles.accentBorder, styles.primaryText)}>Stack Core</h2>
                    <div className="space-y-8">
                      {SKILLS.slice(0, 5).map((group, i) => (
                        <div key={i}>
                          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">{group.category}</h3>
                          <p className="text-[11px] text-slate-700 leading-relaxed font-bold">{group.items.join(', ')}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                  <section>
                    <h2 className={cn("text-xs font-bold uppercase tracking-[0.3em] border-b pb-2 mb-8", styles.accentBorder, styles.primaryText)}>Education</h2>
                    <div className="space-y-8">
                      {EDUCATION.map((edu, i) => (
                        <div key={i}>
                          <h3 className="font-bold text-[11px] text-slate-900 leading-tight uppercase tracking-tight">{edu.degree}</h3>
                          <p className="text-[10px] text-slate-500 font-bold mt-2">{edu.school}</p>
                          <p className="text-[9px] text-slate-400 font-bold italic mt-1 uppercase tracking-widest">{edu.period}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                  <section>
                    <h2 className={cn("text-xs font-bold uppercase tracking-[0.3em] border-b pb-2 mb-8", styles.accentBorder, styles.primaryText)}>Impact</h2>
                    <div className="space-y-8">
                      {IMPACT.map((imp, i) => (
                        <div key={i}>
                          <h3 className="font-bold text-[10px] text-slate-900 leading-snug uppercase tracking-tight">{imp.organization}</h3>
                          <p className={cn("text-[9px] font-bold uppercase tracking-widest mt-1", styles.primaryText)}>{imp.role}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            )}

            {activeLayout === 'architect' && (
              <div className="space-y-16">
                <section className={cn("p-12 rounded-[3rem] transition-all relative overflow-hidden", styles.headerBg)}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <p className="text-[14px] leading-[2.2] text-slate-700 font-medium text-center italic max-w-3xl mx-auto">
                    "{PERSONAL_INFO.subtext}"
                  </p>
                </section>
                
                <div className="grid grid-cols-2 gap-x-20 gap-y-20">
                  <section className="col-span-2">
                    <h2 className={cn("text-xs font-bold uppercase tracking-[0.4em] mb-10 text-center flex items-center justify-center gap-4", styles.primaryText)}>
                      <div className={cn("h-px w-16", styles.accentBg)} /> Professional Narrative Architecture <div className={cn("h-px w-16", styles.accentBg)} />
                    </h2>
                    <div className="grid grid-cols-2 gap-12">
                      {EXPERIENCE.slice(0, 2).map((exp, i) => (
                        <div key={i} className="p-8 border-2 rounded-[2.5rem] border-slate-50 hover:border-primary/10 hover:bg-slate-50/30 transition-all group">
                          <div className="flex items-center gap-3 mb-4">
                             <div className={cn("w-2 h-2 rounded-full", styles.accentBg)} />
                             <h3 className="font-bold text-[16px] text-slate-900 uppercase tracking-tighter">{exp.company}</h3>
                          </div>
                          <p className={cn("text-[12px] font-bold mb-6 tracking-widest uppercase", styles.primaryText)}>{exp.role} • {exp.period}</p>
                          <p className="text-[11px] text-slate-600 leading-[1.8] font-medium italic">"{exp.highlightProject.responsibilities[0]}"</p>
                        </div>
                      ))}
                    </div>
                  </section>
                  
                  <section>
                    <h2 className={cn("text-xs font-bold uppercase tracking-[0.3em] mb-8 border-l-4 pl-4", styles.accentBorder, styles.primaryText)}>Technical Domain</h2>
                    <div className="space-y-8">
                      {SKILLS.slice(0, 4).map((group, i) => (
                        <div key={i}>
                          <h3 className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">{group.category}</h3>
                          <p className="text-[11px] text-slate-700 font-bold leading-relaxed">{group.items.join(' • ')}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                  
                  <section>
                    <h2 className={cn("text-xs font-bold uppercase tracking-[0.3em] mb-8 border-l-4 pl-4", styles.accentBorder, styles.primaryText)}>Academic & Social Impact</h2>
                    <div className="space-y-10">
                      {EDUCATION.slice(0, 1).map((edu, i) => (
                        <div key={i}>
                          <h3 className="font-bold text-[11px] text-slate-900 leading-snug uppercase tracking-tight">{edu.degree}</h3>
                          <p className="text-[10px] text-slate-500 font-bold mt-2 uppercase">{edu.school}</p>
                        </div>
                      ))}
                      {IMPACT.slice(0, 1).map((imp, i) => (
                        <div key={i}>
                          <h3 className="font-bold text-[11px] text-slate-900 leading-snug uppercase tracking-tight">{imp.organization}</h3>
                          <p className={cn("text-[10px] font-bold uppercase mt-2 tracking-widest", styles.primaryText)}>{imp.role}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            )}

            <footer className="mt-auto pt-20 flex justify-end">
              <div className="text-right border-t-2 border-slate-50 pt-10 min-w-[280px] relative">
                <div className="absolute top-0 right-0 w-24 h-1 bg-primary/20 rounded-full -translate-y-1/2" />
                <p className={cn("text-2xl font-bold mb-1 tracking-tighter uppercase", styles.primaryText)}>{PERSONAL_INFO.name}</p>
                <p className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold">Applied AI & ML Systems Engineer</p>
              </div>
            </footer>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
