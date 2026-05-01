
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
import { Download, Loader2, Mail, Phone, MapPin, Globe, Layout, UserMinus, User, Heart, Brain, Zap, Target, Github, Layers, Briefcase, FileText, Image as ImageIcon, FileType } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCE, EDUCATION, SKILLS, IMPACT, PROJECTS } from '@/lib/portfolio-data';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type ResumeTheme = 'applied-ai' | 'deep-tech' | 'clinical' | 'modern-emerald';
type ResumeLayout = 'strategic' | 'executive' | 'architect';

export const ResumeDialog = () => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);
  const [activeTheme, setActiveTheme] = useState<ResumeTheme>('applied-ai');
  const [activeLayout, setActiveLayout] = useState<ResumeLayout>('strategic');
  const [showImage, setShowImage] = useState(true);

  const themes: { id: ResumeTheme; name: string; color: string }[] = [
    { id: 'applied-ai', name: 'Synaptic Violet', color: 'bg-primary' },
    { id: 'deep-tech', name: 'Deep Tech', color: 'bg-slate-900' },
    { id: 'clinical', name: 'Clinical Blue', color: 'bg-blue-600' },
    { id: 'modern-emerald', name: 'Modern Emerald', color: 'bg-emerald-600' },
  ];

  const layouts: { id: ResumeLayout; name: string; icon: any }[] = [
    { id: 'strategic', name: 'Strategic Sidebar', icon: Target },
    { id: 'executive', name: 'Executive Narrative', icon: Layout },
    { id: 'architect', name: 'System Architect', icon: Brain },
  ];

  const captureCanvas = async () => {
    if (!resumeRef.current) return null;
    return await html2canvas(resumeRef.current, {
      scale: 3,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: resumeRef.current.offsetWidth,
      height: resumeRef.current.offsetHeight,
      onclone: (clonedDoc) => {
        const el = clonedDoc.getElementById('resume-container');
        if (el) el.style.boxShadow = 'none';
      }
    });
  };

  const handleDownloadPDF = async () => {
    setIsGenerating('pdf');
    try {
      const canvas = await captureCanvas();
      if (!canvas) return;
      
      const imgData = canvas.toDataURL('image/png', 1.0);
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF('p', 'mm', [imgWidth, imgHeight]);
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
      pdf.save(`${PERSONAL_INFO.name.replace(/\s+/g, '_')}_Resume.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsGenerating(null);
    }
  };

  const handleDownloadJPG = async () => {
    setIsGenerating('jpg');
    try {
      const canvas = await captureCanvas();
      if (!canvas) return;
      
      const link = document.createElement('a');
      link.download = `${PERSONAL_INFO.name.replace(/\s+/g, '_')}_Resume.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.9);
      link.click();
    } catch (error) {
      console.error("JPG generation failed:", error);
    } finally {
      setIsGenerating(null);
    }
  };

  const handleDownloadDOC = () => {
    if (!resumeRef.current) return;
    setIsGenerating('doc');
    try {
      const content = resumeRef.current.innerHTML;
      const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Resume</title><style>body { font-family: sans-serif; }</style></head><body>";
      const footer = "</body></html>";
      const source = header + content + footer;
      
      const blob = new Blob(['\ufeff', source], {
        type: 'application/msword'
      });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${PERSONAL_INFO.name.replace(/\s+/g, '_')}_Resume.doc`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("DOC generation failed:", error);
    } finally {
      setIsGenerating(null);
    }
  };

  const styles = (() => {
    switch (activeTheme) {
      case 'deep-tech': return { primaryText: 'text-slate-900', accentBorder: 'border-slate-900', accentBg: 'bg-slate-900', headerBg: 'bg-slate-50', iconColor: 'text-slate-700', mutedBg: 'bg-slate-50' };
      case 'clinical': return { primaryText: 'text-blue-700', accentBorder: 'border-blue-200', accentBg: 'bg-blue-600', headerBg: 'bg-blue-50/30', iconColor: 'text-blue-500', mutedBg: 'bg-blue-50/10' };
      case 'modern-emerald': return { primaryText: 'text-emerald-700', accentBorder: 'border-emerald-600', accentBg: 'bg-emerald-600', headerBg: 'bg-emerald-50/50', iconColor: 'text-emerald-700', mutedBg: 'bg-emerald-50/20' };
      default: return { primaryText: 'text-primary', accentBorder: 'border-primary/30', accentBg: 'bg-primary', headerBg: 'bg-primary/5', iconColor: 'text-primary', mutedBg: 'bg-primary/5' };
    }
  })();

  const githubHandle = PERSONAL_INFO.github.split('/').pop()?.toUpperCase();

  const renderHeader = () => (
    <header className={cn(
      "mb-8 p-8 rounded-[2rem] relative overflow-hidden break-inside-avoid", 
      styles.headerBg,
      activeLayout !== 'strategic' && "flex items-center justify-between"
    )}>
      <div className="relative z-10 flex-1">
        <div className="flex items-center gap-3 mb-4">
          <div className={cn("h-1 w-10 rounded-full", styles.accentBg)} />
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-50">Applied AI Profile Protocol</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-2 uppercase">
          {PERSONAL_INFO.name}
        </h1>
        <p className={cn("text-base font-medium mb-5 flex items-center gap-2", styles.primaryText)}>
           <Zap size={16} /> {PERSONAL_INFO.title}
        </p>
        <div className="flex flex-wrap gap-y-2 gap-x-5 text-[8px] text-slate-500 font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1.5"><MapPin size={11} className={styles.iconColor} /> {PERSONAL_INFO.location}</span>
          <span className="flex items-center gap-1.5"><Globe size={11} className={styles.iconColor} /> LI/MARIFULISLAM</span>
          <span className="flex items-center gap-1.5"><Github size={11} className={styles.iconColor} /> GH/{githubHandle}</span>
          <span className="flex items-center gap-1.5"><Mail size={11} className={styles.iconColor} /> {PERSONAL_INFO.email}</span>
          <span className="flex items-center gap-1.5"><Phone size={11} className={styles.iconColor} /> {PERSONAL_INFO.phone}</span>
        </div>
      </div>
      {(activeLayout !== 'strategic' && showImage) && (
        <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-4 border-white shadow-lg bg-white ml-8 shrink-0">
          <Image src={PERSONAL_INFO.images.resume} alt={PERSONAL_INFO.name} fill className="object-cover" unoptimized />
        </div>
      )}
    </header>
  );

  const renderStrategic = () => (
    <div className="flex-1 grid grid-cols-12 gap-8">
      <div className="col-span-4 space-y-8">
        {showImage && (
          <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden border-[6px] border-slate-50 shadow-md bg-slate-50 break-inside-avoid">
            <Image src={PERSONAL_INFO.images.resume} alt={PERSONAL_INFO.name} fill className="object-cover" unoptimized />
          </div>
        )}

        <section className="break-inside-avoid">
          <h2 className={cn("text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2 border-b-2 pb-1", styles.accentBorder, styles.primaryText)}>
            <Layers size={13} /> Tech Matrix
          </h2>
          <div className="space-y-4">
            {SKILLS.slice(0, 5).map((group, i) => (
              <div key={i} className="break-inside-avoid">
                <p className="text-[7.5px] font-bold text-slate-400 uppercase mb-1.5">{group.category}</p>
                <div className="flex flex-wrap gap-1">
                  {group.items.map((skill, j) => (
                    <span key={j} className="text-[8px] px-1.5 py-0.5 rounded-md bg-slate-50 border border-slate-100 font-bold text-slate-600">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="break-inside-avoid">
          <h2 className={cn("text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2 border-b-2 pb-1", styles.accentBorder, styles.primaryText)}>
            <Target size={13} /> Academic
          </h2>
          <div className="space-y-4">
            {EDUCATION.map((edu, i) => (
              <div key={i} className="break-inside-avoid">
                <h3 className="font-bold text-[9px] text-slate-900 leading-tight mb-1">{edu.degree}</h3>
                <p className="text-[8px] text-slate-500 font-bold uppercase">{edu.school} • {edu.period}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="col-span-8 space-y-8">
        <section className="break-inside-avoid">
          <h2 className={cn("text-[10px] font-bold uppercase tracking-[0.2em] mb-3 flex items-center gap-2 border-b-2 pb-1", styles.accentBorder, styles.primaryText)}>
            <Target size={13} /> Executive Summary
          </h2>
          <p className="text-[10.5px] leading-relaxed text-slate-600 font-medium italic">"{PERSONAL_INFO.subtext}"</p>
        </section>

        <section className="space-y-6">
          <h2 className={cn("text-[10px] font-bold uppercase tracking-[0.2em] mb-5 flex items-center gap-2 border-b-2 pb-1", styles.accentBorder, styles.primaryText)}>
            <Briefcase size={13} /> Professional Path
          </h2>
          <div className="space-y-6">
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className="relative pl-5 border-l-2 border-slate-50 break-inside-avoid">
                <div className={cn("absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full", styles.accentBg)} />
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[11px] text-slate-900 uppercase">{exp.company} — <span className={styles.primaryText}>{exp.role}</span></h3>
                  <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest">{exp.period}</span>
                </div>
                <p className="text-[8.5px] font-bold text-slate-500 mb-2 italic opacity-80">{exp.focus}</p>
                <ul className="space-y-1.5">
                  {exp.highlightProject.responsibilities.map((res, j) => (
                    <li key={j} className="text-[9.5px] text-slate-600 leading-snug flex gap-2.5">
                      <span className={cn("mt-1.5 h-1 w-1 rounded-full shrink-0 opacity-30", styles.accentBg)} />
                      {res}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  const renderExecutive = () => (
    <div className="space-y-8">
      <section className="break-inside-avoid">
        <h2 className={cn("text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2 border-b-2 pb-1", styles.accentBorder, styles.primaryText)}>
          <Target size={13} /> Professional Summary
        </h2>
        <p className="text-[11px] leading-relaxed text-slate-700 font-medium italic">
          "{PERSONAL_INFO.subtext}"
        </p>
      </section>

      <section>
        <h2 className={cn("text-[10px] font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2 border-b-2 pb-1", styles.accentBorder, styles.primaryText)}>
          <Briefcase size={13} /> Career Record
        </h2>
        <div className="space-y-8">
          {EXPERIENCE.map((exp, i) => (
            <div key={i} className="break-inside-avoid">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="font-bold text-[12px] text-slate-900 uppercase">
                  {exp.company} <span className="mx-2 text-slate-200">|</span> <span className={styles.primaryText}>{exp.role}</span>
                </h3>
                <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-widest">{exp.period}</span>
              </div>
              <p className="text-[9.5px] font-bold text-slate-500 mb-3 uppercase tracking-wider">{exp.focus}</p>
              <ul className="grid grid-cols-1 gap-2.5">
                {exp.highlightProject.responsibilities.map((res, j) => (
                  <li key={j} className="text-[10.5px] text-slate-600 leading-relaxed flex gap-2.5">
                    <span className={cn("mt-1.5 h-1.5 w-1.5 rounded-full shrink-0", styles.accentBg, "opacity-30")} />
                    {res}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderArchitect = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-8 space-y-8">
           <section className="break-inside-avoid">
            <h2 className={cn("text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2 border-b-2 pb-1", styles.accentBorder, styles.primaryText)}>
              <FileText size={13} /> Applied Systems Research
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {PROJECTS.slice(0, 2).map((proj, i) => (
                <div key={i} className={cn("p-5 rounded-3xl border transition-all break-inside-avoid", styles.mutedBg)}>
                  <h3 className="font-bold text-[11px] text-slate-900 mb-2 flex items-center gap-2">
                    <span className={cn("h-1.5 w-1.5 rounded-full", styles.accentBg)} />
                    {proj.title}
                  </h3>
                  <p className="text-[10px] text-slate-600 leading-relaxed italic line-clamp-2">"{proj.description.split('.')[0]}."</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className={cn("text-[10px] font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2 border-b-2 pb-1", styles.accentBorder, styles.primaryText)}>
              <Briefcase size={13} /> Architecture Experience
            </h2>
            <div className="space-y-8">
              {EXPERIENCE.map((exp, i) => (
                <div key={i} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-bold text-[12px] text-slate-900 uppercase">
                      {exp.company} <span className={styles.primaryText}>— {exp.role}</span>
                    </h3>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">{exp.period}</span>
                  </div>
                  <ul className="space-y-2">
                    {exp.highlightProject.responsibilities.slice(0, 3).map((res, j) => (
                      <li key={j} className="text-[10px] text-slate-600 leading-snug flex gap-2.5">
                        <span className={cn("mt-1.5 h-1 w-1 rounded-full shrink-0", styles.accentBg, "opacity-30")} />
                        {res}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="col-span-4 space-y-8">
          {(showImage) && (
            <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden border-2 border-slate-100 shadow-md bg-slate-50 break-inside-avoid">
               <Image src={PERSONAL_INFO.images.resume} alt={PERSONAL_INFO.name} fill className="object-cover" unoptimized />
            </div>
          )}

          <section className="break-inside-avoid">
            <h2 className={cn("text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2 border-b-2 pb-1", styles.accentBorder, styles.primaryText)}>
              <Layers size={13} /> System Stack
            </h2>
            <div className="space-y-5">
              {SKILLS.slice(0, 4).map((group, i) => (
                <div key={i} className="break-inside-avoid">
                  <p className="text-[8px] font-bold text-primary uppercase mb-1.5 opacity-60">{group.category}</p>
                  <div className="flex flex-wrap gap-1">
                    {group.items.map((skill, j) => (
                      <span key={j} className="text-[8px] px-1.5 py-0.5 rounded bg-slate-100 font-bold text-slate-600">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full gap-2 px-8 border-primary/20 hover:bg-primary/5 h-14 md:h-12 text-xs font-headline font-bold uppercase tracking-widest">
          <Download className="h-4 w-4" /> Download Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[100vw] sm:max-w-7xl h-full md:h-[96vh] p-0 border-none shadow-2xl flex flex-col overflow-hidden bg-background md:rounded-[2.5rem]">
        <DialogHeader className="p-6 md:p-8 bg-background/95 backdrop-blur-md border-b flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shrink-0 z-20">
          <div className="flex flex-col gap-1">
            <DialogTitle className="flex items-center gap-2 text-xl font-headline font-bold">
              <Brain className="h-5 w-5 text-primary" />
              Applied AI Profile Designer
            </DialogTitle>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold opacity-60">International Architecture Protocol v6.0</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 bg-muted/30 p-2 md:p-3 rounded-2xl border w-full md:w-auto overflow-x-auto">
             <div className="flex flex-col gap-1.5 shrink-0">
              <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Photo</span>
              <div className="flex gap-1 bg-background/50 p-1 rounded-full border">
                <Button size="icon" variant={showImage ? "default" : "ghost"} onClick={() => setShowImage(true)} className="h-7 w-7 rounded-full transition-all"><User size={12} /></Button>
                <Button size="icon" variant={!showImage ? "default" : "ghost"} onClick={() => setShowImage(false)} className="h-7 w-7 rounded-full transition-all"><UserMinus size={12} /></Button>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 shrink-0">
              <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Layout</span>
              <div className="flex gap-1">
                {layouts.map(l => (
                  <Button key={l.id} size="sm" variant={activeLayout === l.id ? "default" : "outline"} onClick={() => setActiveLayout(l.id)} className="h-7 text-[8px] font-bold uppercase px-3 rounded-full">{l.name}</Button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1.5 shrink-0">
              <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Theme</span>
              <div className="flex gap-1">
                {themes.map(t => (
                  <Button key={t.id} size="icon" onClick={() => setActiveTheme(t.id)} className={cn("h-7 w-7 rounded-full border-2", activeTheme === t.id ? "border-white" : "border-transparent", t.color)} />
                ))}
              </div>
            </div>
            <div className="w-px h-8 bg-border hidden md:block" />
            <div className="flex items-center gap-2">
              <Button onClick={handleDownloadPDF} disabled={!!isGenerating} className="gap-2 rounded-full px-4 h-10 shadow-lg shadow-primary/20 font-headline font-bold uppercase text-[9px] tracking-widest">
                {isGenerating === 'pdf' ? <Loader2 className="h-3 w-3 animate-spin" /> : <Download size={14} />}
                PDF
              </Button>
              <Button onClick={handleDownloadJPG} variant="outline" disabled={!!isGenerating} className="gap-2 rounded-full px-4 h-10 border-primary/20 hover:bg-primary/5 font-headline font-bold uppercase text-[9px] tracking-widest">
                {isGenerating === 'jpg' ? <Loader2 className="h-3 w-3 animate-spin" /> : <ImageIcon size={14} />}
                JPG
              </Button>
              <Button onClick={handleDownloadDOC} variant="outline" disabled={!!isGenerating} className="gap-2 rounded-full px-4 h-10 border-primary/20 hover:bg-primary/5 font-headline font-bold uppercase text-[9px] tracking-widest">
                {isGenerating === 'doc' ? <Loader2 className="h-3 w-3 animate-spin" /> : <FileType size={14} />}
                DOC
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-auto bg-muted/20 p-4 md:p-12 flex justify-center scrollbar-hide">
          <div className="scale-[0.4] sm:scale-75 md:scale-90 lg:scale-100 origin-top transition-transform duration-500">
            <div id="resume-container" ref={resumeRef} className={cn("bg-white text-[#1f2937] p-[15mm] shadow-2xl mx-auto w-[210mm] flex flex-col font-sans transition-all pb-[25mm] min-h-fit")}>
              {renderHeader()}
              
              <div className="flex-1">
                {activeLayout === 'strategic' && renderStrategic()}
                {activeLayout === 'executive' && renderExecutive()}
                {activeLayout === 'architect' && renderArchitect()}
              </div>

              <footer className="mt-8 pt-8 flex justify-end break-inside-avoid">
                <div className="text-right border-t border-slate-50 pt-4 opacity-20 w-full">
                  <p className="text-[7px] uppercase tracking-[0.8em] text-slate-400 font-bold">Systems Profile Protocol v6.0 • Continuous Architecture</p>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

