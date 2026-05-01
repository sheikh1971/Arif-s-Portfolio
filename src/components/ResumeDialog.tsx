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
import { Download, Loader2, Mail, Phone, MapPin, Globe, Layout, UserMinus, User, Heart, Brain, Zap, Target } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCE, EDUCATION, SKILLS, IMPACT } from '@/lib/portfolio-data';
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
              Identity Designer
            </DialogTitle>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold opacity-60">Synthesis of Technical Assets</p>
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
              <header className={cn("mb-12 p-8 md:p-10 rounded-[2rem] grid grid-cols-12 gap-8 relative overflow-hidden", styles.headerBg)}>
                <div className={cn("relative z-10", showImage ? "col-span-8" : "col-span-12")}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={cn("h-1 w-10 rounded-full", styles.accentBg)} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-60">Identity // {PERSONAL_INFO.title}</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-slate-900 mb-2 uppercase leading-none">
                    {PERSONAL_INFO.name}
                  </h1>
                  <p className={cn("text-lg font-medium mb-6 flex items-center gap-2", styles.primaryText)}>
                     <Zap size={16} /> {PERSONAL_INFO.title}
                  </p>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-[9px] text-slate-500 font-bold uppercase tracking-[0.1em]">
                    <span className="flex items-center gap-2"><MapPin size={12} className={styles.iconColor} /> {PERSONAL_INFO.location}</span>
                    <span className="flex items-center gap-2"><Globe size={12} className={styles.iconColor} /> LINKEDIN.COM/IN/MARIFULISLAM</span>
                    <span className="flex items-center gap-2"><Mail size={12} className={styles.iconColor} /> {PERSONAL_INFO.email}</span>
                    <span className="flex items-center gap-2"><Phone size={12} className={styles.iconColor} /> {PERSONAL_INFO.phone}</span>
                  </div>
                </div>
                {showImage && (
                  <div className="col-span-4 flex justify-end relative z-10">
                    <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-white">
                      <Image src={PERSONAL_INFO.images.resume} alt={PERSONAL_INFO.name} fill className="object-cover" unoptimized />
                    </div>
                  </div>
                )}
              </header>

              {/* Main Content Area */}
              <div className="flex-1 space-y-10">
                <section>
                  <h2 className={cn("text-[10px] font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-2 border-b pb-1", styles.accentBorder, styles.primaryText)}>
                    <Target size={12} /> Strategic Narrative
                  </h2>
                  <p className="text-[11px] leading-relaxed text-slate-600 italic">"{PERSONAL_INFO.subtext}"</p>
                </section>

                <section>
                  <h2 className={cn("text-[10px] font-bold uppercase tracking-[0.3em] mb-6 flex items-center gap-2 border-b pb-1", styles.accentBorder, styles.primaryText)}>
                    <Brain size={12} /> Professional Path
                  </h2>
                  <div className="space-y-8">
                    {EXPERIENCE.map((exp, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-bold text-[12px] text-slate-900 uppercase">{exp.company} — <span className={styles.primaryText}>{exp.role}</span></h3>
                          <span className="text-[9px] font-bold text-slate-400 uppercase">{exp.period}</span>
                        </div>
                        <p className="text-[9px] font-bold text-slate-500 mb-2 italic opacity-70">{exp.focus}</p>
                        <ul className="space-y-1.5">
                          {exp.highlightProject.responsibilities.map((res, j) => (
                            <li key={j} className="text-[10px] text-slate-600 leading-snug flex gap-2">
                              <span className={cn("mt-1.5 h-1 w-1 rounded-full shrink-0", styles.accentBg)} />
                              {res}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="grid grid-cols-2 gap-10">
                  <section>
                    <h2 className={cn("text-[10px] font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-2 border-b pb-1", styles.accentBorder, styles.primaryText)}>
                      <Target size={12} /> Academic
                    </h2>
                    {EDUCATION.map((edu, i) => (
                      <div key={i} className="mb-4">
                        <h3 className="font-bold text-[10px] text-slate-900 leading-tight">{edu.degree}</h3>
                        <p className="text-[9px] text-slate-500 font-bold mt-0.5">{edu.school} • {edu.period}</p>
                      </div>
                    ))}
                  </section>
                  <section>
                    <h2 className={cn("text-[10px] font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-2 border-b pb-1", styles.accentBorder, styles.primaryText)}>
                      <Heart size={12} /> Impact
                    </h2>
                    {IMPACT.map((imp, i) => (
                      <div key={i} className="mb-4">
                        <h3 className="font-bold text-[10px] text-slate-900 leading-tight">{imp.organization}</h3>
                        <p className={cn("text-[9px] font-bold mt-0.5", styles.primaryText)}>{imp.role}</p>
                      </div>
                    ))}
                  </section>
                </div>
              </div>

              <footer className="mt-auto pt-10 flex justify-end">
                <div className="text-right border-t border-slate-100 pt-6">
                  <p className={cn("text-xl font-bold mb-0.5 tracking-tighter", styles.primaryText)}>{PERSONAL_INFO.name}</p>
                  <p className="text-[8px] uppercase tracking-[0.4em] text-slate-400 font-bold">Applied AI & ML Systems Engineer</p>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};