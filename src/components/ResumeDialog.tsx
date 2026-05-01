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
import { Download, Loader2, FileText, Mail, Phone, MapPin, Globe, Layout, Image as ImageIcon, UserMinus, User } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCE, EDUCATION, SKILLS } from '@/lib/portfolio-data';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type ResumeTheme = 'standard' | 'modern' | 'classic' | 'neural';
type ResumeLayout = 'single' | 'double' | 'grid';

export const ResumeDialog = () => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTheme, setActiveTheme] = useState<ResumeTheme>('standard');
  const [activeLayout, setActiveLayout] = useState<ResumeLayout>('single');
  const [showImage, setShowImage] = useState(false);

  const themes: { id: ResumeTheme; name: string; color: string }[] = [
    { id: 'standard', name: 'Professional Blue', color: 'bg-slate-900' },
    { id: 'modern', name: 'Emerald Modern', color: 'bg-emerald-600' },
    { id: 'classic', name: 'Black Tie', color: 'bg-black' },
    { id: 'neural', name: 'Synaptic Violet', color: 'bg-primary' },
  ];

  const layouts: { id: ResumeLayout; name: string; icon: any }[] = [
    { id: 'single', name: 'Standard', icon: Layout },
    { id: 'double', name: 'Corporate', icon: Layout },
    { id: 'grid', name: 'Modern', icon: Layout },
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
      pdf.save(`Resume_${PERSONAL_INFO.name.replace(/\s+/g, '_')}_${activeTheme}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const getThemeStyles = () => {
    switch (activeTheme) {
      case 'modern':
        return {
          primaryText: 'text-emerald-700',
          accentBorder: 'border-emerald-600',
          accentBg: 'bg-emerald-600',
          headerBg: 'bg-emerald-50/50',
          fontFamily: 'font-sans'
        };
      case 'classic':
        return {
          primaryText: 'text-black',
          accentBorder: 'border-black',
          accentBg: 'bg-black',
          headerBg: 'bg-white',
          fontFamily: 'font-serif'
        };
      case 'neural':
        return {
          primaryText: 'text-primary',
          accentBorder: 'border-primary',
          accentBg: 'bg-primary',
          headerBg: 'bg-slate-50',
          fontFamily: 'font-headline'
        };
      default:
        return {
          primaryText: 'text-blue-900',
          accentBorder: 'border-blue-900',
          accentBg: 'bg-blue-900',
          headerBg: 'bg-slate-100/80',
          fontFamily: 'font-sans'
        };
    }
  };

  const styles = getThemeStyles();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="rounded-full gap-2 px-8">
          <Download className="h-4 w-4" /> Resume
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto bg-slate-100 dark:bg-slate-950 p-0 border-none">
        <DialogHeader className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <DialogTitle className="flex items-center gap-2 text-xl font-headline">
              <FileText className="h-5 w-5 text-primary" />
              Professional Resume Designer
            </DialogTitle>
            <p className="text-xs text-muted-foreground">Select layout and theme for your professional profile</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-6 bg-muted/30 p-4 rounded-2xl border">
            {/* Image Toggle */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Photo Mode</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={showImage ? "default" : "outline"}
                  onClick={() => setShowImage(true)}
                  className="h-8 w-8 p-0 rounded-full"
                  title="With Photo"
                >
                  <User className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={!showImage ? "default" : "outline"}
                  onClick={() => setShowImage(false)}
                  className="h-8 w-8 p-0 rounded-full"
                  title="No Photo (US/UK Standard)"
                >
                  <UserMinus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="w-px h-10 bg-border hidden md:block" />

            {/* Layout Selector */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Layout</span>
              <div className="flex gap-2">
                {layouts.map((l) => (
                  <Button
                    key={l.id}
                    size="sm"
                    variant={activeLayout === l.id ? "default" : "outline"}
                    onClick={() => setActiveLayout(l.id)}
                    className="h-8 text-[10px] font-bold uppercase px-3 rounded-full"
                  >
                    {l.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="w-px h-10 bg-border hidden md:block" />

            {/* Theme Selector */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Color</span>
              <div className="flex gap-2">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTheme(t.id)}
                    className={cn(
                      "w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center",
                      activeTheme === t.id ? "scale-110 border-foreground ring-2 ring-primary/20" : "border-transparent opacity-50 hover:opacity-100",
                      t.color
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="w-px h-10 bg-border hidden md:block" />

            <Button onClick={handleDownload} disabled={isGenerating} className="gap-2 rounded-full px-6 h-10 shadow-lg shadow-primary/20">
              {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              Download PDF
            </Button>
          </div>
        </DialogHeader>

        <div className="flex justify-center p-10 bg-slate-100 dark:bg-slate-950">
          <div 
            ref={resumeRef}
            className={cn(
              "bg-white text-[#111827] p-12 shadow-2xl mx-auto w-[210mm] min-h-[297mm] flex flex-col transition-all duration-500",
              styles.fontFamily
            )}
            style={{ color: '#111827' }}
          >
            {/* Header */}
            <header className={cn(
              "mb-10 p-10 rounded-2xl flex items-center gap-12 transition-all",
              styles.headerBg, 
              !showImage ? "justify-center text-center" : "text-left"
            )}>
              {showImage && (
                <div className="relative w-40 h-40 rounded-xl overflow-hidden border-2 border-white shadow-md bg-white shrink-0">
                  <Image 
                    src={PERSONAL_INFO.images.resume} 
                    alt={PERSONAL_INFO.name} 
                    fill 
                    className="object-contain" 
                    unoptimized 
                  />
                </div>
              )}
              <div className="flex-1">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2 uppercase">{PERSONAL_INFO.name}</h1>
                <p className={cn("text-xl font-bold mb-6", styles.primaryText)}>{PERSONAL_INFO.title}</p>
                
                <div className={cn("flex flex-wrap gap-y-2 gap-x-8 text-[11px] text-slate-500 font-bold uppercase tracking-widest", !showImage && "justify-center")}>
                  <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> {PERSONAL_INFO.location}</span>
                  <span className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> {PERSONAL_INFO.phone}</span>
                  <span className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> {PERSONAL_INFO.email}</span>
                  <span className="flex items-center gap-2"><Globe className="h-3.5 w-3.5" /> LINKEDIN.COM/IN/MARIFULISLAM</span>
                </div>
              </div>
            </header>

            {activeLayout === 'single' && (
              <div className="space-y-10">
                <section>
                  <h2 className={cn("text-xs font-bold uppercase tracking-[0.25em] border-b-2 pb-1.5 mb-5", styles.accentBorder)}>Professional Profile</h2>
                  <p className="text-[11px] leading-[1.8] text-slate-600 font-medium">{PERSONAL_INFO.subtext}</p>
                </section>
                <section>
                  <h2 className={cn("text-xs font-bold uppercase tracking-[0.25em] border-b-2 pb-1.5 mb-8", styles.accentBorder)}>Experience</h2>
                  <div className="space-y-10">
                    {EXPERIENCE.map((exp, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-baseline mb-1.5">
                          <h3 className="font-bold text-[14px] text-slate-900">{exp.company}</h3>
                          <span className="text-[10px] font-bold text-slate-400 uppercase">{exp.period}</span>
                        </div>
                        <p className={cn("text-[11px] font-bold italic mb-3", styles.primaryText)}>{exp.role}</p>
                        <ul className="list-disc list-outside ml-5 space-y-2">
                          {exp.highlightProject.responsibilities.map((res, j) => (
                            <li key={j} className="text-[11px] text-slate-600 leading-normal font-medium">{res}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
                <div className="grid grid-cols-2 gap-12 pt-4">
                  <section>
                    <h2 className={cn("text-xs font-bold uppercase tracking-[0.25em] border-b-2 pb-1.5 mb-6", styles.accentBorder)}>Education</h2>
                    <div className="space-y-6">
                      {EDUCATION.map((edu, i) => (
                        <div key={i}>
                          <h3 className="font-bold text-[12px] text-slate-900 leading-snug">{edu.degree}</h3>
                          <p className="text-[11px] text-slate-500 font-bold mt-1">{edu.school}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">{edu.period}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                  <section>
                    <h2 className={cn("text-xs font-bold uppercase tracking-[0.25em] border-b-2 pb-1.5 mb-6", styles.accentBorder)}>Technical Expertise</h2>
                    <div className="space-y-5">
                      {SKILLS.slice(0, 4).map((group, i) => (
                        <div key={i}>
                          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">{group.category}</h3>
                          <p className="text-[11px] text-slate-700 leading-relaxed font-bold">{group.items.join(' • ')}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            )}

            {activeLayout === 'double' && (
              <div className="grid grid-cols-12 gap-12 flex-1">
                <div className="col-span-8 space-y-12">
                  <section>
                    <h2 className={cn("text-xs font-bold uppercase tracking-[0.25em] border-b-2 pb-1.5 mb-5", styles.accentBorder)}>Summary</h2>
                    <p className="text-[11px] leading-[1.8] text-slate-600 font-medium">{PERSONAL_INFO.subtext}</p>
                  </section>
                  <section>
                    <h2 className={cn("text-xs font-bold uppercase tracking-[0.25em] border-b-2 pb-1.5 mb-8", styles.accentBorder)}>Experience</h2>
                    <div className="space-y-10">
                      {EXPERIENCE.map((exp, i) => (
                        <div key={i}>
                          <h3 className="font-bold text-[14px] text-slate-900 mb-1">{exp.company}</h3>
                          <div className="flex justify-between mb-3">
                            <p className={cn("text-[11px] font-bold italic", styles.primaryText)}>{exp.role}</p>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">{exp.period}</span>
                          </div>
                          <ul className="list-disc list-outside ml-5 space-y-2">
                            {exp.highlightProject.responsibilities.map((res, j) => (
                              <li key={j} className="text-[11px] text-slate-600 leading-normal font-medium">{res}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
                <div className={cn("col-span-4 space-y-10 p-8 rounded-2xl border-l-2", styles.headerBg, styles.accentBorder)}>
                  <section>
                    <h2 className={cn("text-xs font-bold uppercase tracking-[0.25em] border-b pb-1.5 mb-6", styles.accentBorder)}>Core Skills</h2>
                    <div className="space-y-6">
                      {SKILLS.slice(0, 5).map((group, i) => (
                        <div key={i}>
                          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{group.category}</h3>
                          <p className="text-[11px] text-slate-700 leading-relaxed font-bold">{group.items.join(', ')}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                  <section>
                    <h2 className={cn("text-xs font-bold uppercase tracking-[0.25em] border-b pb-1.5 mb-6", styles.accentBorder)}>Education</h2>
                    <div className="space-y-6">
                      {EDUCATION.map((edu, i) => (
                        <div key={i}>
                          <h3 className="font-bold text-[11px] text-slate-900 leading-tight">{edu.degree}</h3>
                          <p className="text-[10px] text-slate-500 font-bold mt-1.5">{edu.school}</p>
                          <p className="text-[9px] text-slate-400 font-bold italic mt-1 uppercase">{edu.period}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            )}

            {activeLayout === 'grid' && (
              <div className="space-y-14">
                <section className={cn("p-8 rounded-2xl transition-all", styles.headerBg)}>
                  <p className="text-[12px] leading-[1.8] text-slate-700 font-medium text-center italic max-w-2xl mx-auto">
                    "{PERSONAL_INFO.subtext}"
                  </p>
                </section>
                <div className="grid grid-cols-2 gap-x-12 gap-y-12">
                  <section className="col-span-2">
                    <h2 className={cn("text-xs font-bold uppercase tracking-[0.25em] border-b-2 pb-1.5 mb-8", styles.accentBorder)}>Career Milestones</h2>
                    <div className="grid grid-cols-2 gap-10">
                      {EXPERIENCE.slice(0, 2).map((exp, i) => (
                        <div key={i} className="p-6 border rounded-2xl border-slate-100 hover:border-slate-200 transition-colors">
                          <h3 className="font-bold text-[14px] text-slate-900">{exp.company}</h3>
                          <p className={cn("text-[11px] font-bold mb-4", styles.primaryText)}>{exp.role} • {exp.period}</p>
                          <p className="text-[11px] text-slate-600 leading-relaxed font-medium">{exp.highlightProject.responsibilities[0]}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                  <section>
                    <h2 className={cn("text-xs font-bold uppercase tracking-[0.25em] border-b-2 pb-1.5 mb-6", styles.accentBorder)}>Strategic Skills</h2>
                    <div className="space-y-6">
                      {SKILLS.slice(0, 3).map((group, i) => (
                        <div key={i}>
                          <h3 className="text-[10px] font-bold text-slate-400 uppercase mb-2">{group.category}</h3>
                          <p className="text-[11px] text-slate-700 font-bold">{group.items.join(' • ')}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                  <section>
                    <h2 className={cn("text-xs font-bold uppercase tracking-[0.25em] border-b-2 pb-1.5 mb-6", styles.accentBorder)}>Education</h2>
                    <div className="space-y-6">
                      {EDUCATION.map((edu, i) => (
                        <div key={i}>
                          <h3 className="font-bold text-[12px] text-slate-900 leading-snug">{edu.degree}</h3>
                          <p className="text-[11px] text-slate-500 font-bold uppercase mt-1">{edu.school}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            )}

            <footer className="mt-auto pt-20 flex justify-end">
              <div className="text-right border-t-2 border-slate-100 pt-8 min-w-[240px]">
                <p className={cn("text-xl font-bold italic mb-1", styles.primaryText)}>{PERSONAL_INFO.name}</p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold">Digital Professional Identity</p>
              </div>
            </footer>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};