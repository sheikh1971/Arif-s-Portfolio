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
import { Download, Loader2, FileText, Mail, Phone, MapPin, Globe, Palette } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCE, EDUCATION, SKILLS, IMPACT } from '@/lib/portfolio-data';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { cn } from '@/lib/utils';

type ResumeTheme = 'standard' | 'modern' | 'classic' | 'neural';

export const ResumeDialog = () => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTheme, setActiveTheme] = useState<ResumeTheme>('standard');

  const themes: { id: ResumeTheme; name: string; color: string }[] = [
    { id: 'standard', name: 'Standard', color: 'bg-slate-900' },
    { id: 'modern', name: 'Modern', color: 'bg-emerald-600' },
    { id: 'classic', name: 'Classic', color: 'bg-black' },
    { id: 'neural', name: 'Neural', color: 'bg-primary' },
  ];

  const handleDownload = async () => {
    if (!resumeRef.current) return;
    setIsGenerating(true);

    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 3, 
        useCORS: true,
        logging: false,
        backgroundColor: activeTheme === 'classic' ? '#ffffff' : '#ffffff'
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
          primaryText: 'text-emerald-600',
          accentBorder: 'border-emerald-600',
          headerBg: 'bg-slate-50',
          fontFamily: 'font-sans'
        };
      case 'classic':
        return {
          primaryText: 'text-black',
          accentBorder: 'border-black',
          headerBg: 'bg-white',
          fontFamily: 'font-serif'
        };
      case 'neural':
        return {
          primaryText: 'text-primary',
          accentBorder: 'border-primary',
          headerBg: 'bg-slate-50',
          fontFamily: 'font-headline'
        };
      default:
        return {
          primaryText: 'text-primary',
          accentBorder: 'border-slate-900',
          headerBg: 'bg-white',
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
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto bg-slate-100 dark:bg-slate-950">
        <DialogHeader className="flex flex-col md:flex-row items-center justify-between border-b pb-6 mb-6 gap-6">
          <div className="flex flex-col gap-1">
            <DialogTitle className="flex items-center gap-2 text-xl font-headline">
              <FileText className="h-5 w-5 text-primary" />
              Professional Resume Designer
            </DialogTitle>
            <p className="text-xs text-muted-foreground">Select a technical aesthetic for your professional profile</p>
          </div>
          
          <div className="flex items-center gap-4 bg-background/50 p-2 rounded-2xl border">
            <div className="flex gap-2">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTheme(t.id)}
                  title={t.name}
                  className={cn(
                    "w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center",
                    activeTheme === t.id ? "scale-110 border-foreground ring-2 ring-primary/20" : "border-transparent opacity-50 hover:opacity-100",
                    t.color
                  )}
                >
                  {activeTheme === t.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </button>
              ))}
            </div>
            <div className="w-px h-6 bg-border mx-2" />
            <Button onClick={handleDownload} disabled={isGenerating} className="gap-2 rounded-full px-6">
              {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              Download PDF
            </Button>
          </div>
        </DialogHeader>

        <div className="flex justify-center pb-10">
          <div 
            ref={resumeRef}
            className={cn(
              "bg-white text-[#111827] p-12 shadow-2xl mx-auto w-[210mm] min-h-[297mm] flex flex-col transition-all duration-500",
              styles.fontFamily
            )}
            style={{ color: '#111827' }}
          >
            {/* Professional Header */}
            <header className={cn("mb-10 text-center p-8 rounded-2xl", styles.headerBg)}>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2 uppercase">{PERSONAL_INFO.name}</h1>
              <p className={cn("text-lg font-bold mb-6", styles.primaryText)}>{PERSONAL_INFO.title}</p>
              
              <div className="flex flex-wrap justify-center gap-y-2 gap-x-6 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> {PERSONAL_INFO.location}</span>
                <span className="flex items-center gap-1.5"><Phone className="h-3 w-3" /> {PERSONAL_INFO.phone}</span>
                <span className="flex items-center gap-1.5"><Mail className="h-3 w-3" /> {PERSONAL_INFO.email}</span>
                <span className="flex items-center gap-1.5"><Globe className="h-3 w-3" /> LINKEDIN.COM/IN/MARIFULISLAM</span>
              </div>
            </header>

            <div className="grid grid-cols-1 gap-10">
              {/* Profile Summary */}
              <section>
                <h2 className={cn("text-xs font-bold uppercase tracking-[0.25em] border-b-2 pb-1 mb-4", styles.accentBorder)}>Professional Profile</h2>
                <p className="text-[11px] leading-[1.8] text-slate-600 font-medium">
                  {PERSONAL_INFO.subtext}
                </p>
              </section>

              {/* Experience */}
              <section>
                <h2 className={cn("text-xs font-bold uppercase tracking-[0.25em] border-b-2 pb-1 mb-6", styles.accentBorder)}>Professional Experience</h2>
                <div className="space-y-8">
                  {EXPERIENCE.map((exp, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-[13px] text-slate-900">{exp.company}</h3>
                          <p className={cn("text-[11px] font-bold italic", styles.primaryText)}>{exp.role}</p>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-50 px-3 py-1 rounded-full">{exp.period}</span>
                      </div>
                      <p className="text-[10px] font-bold text-slate-500 mb-3 uppercase tracking-tighter">{exp.focus}</p>
                      <ul className="list-disc list-outside ml-4 space-y-1.5">
                        {exp.highlightProject.responsibilities.map((res, j) => (
                          <li key={j} className="text-[11px] text-slate-600 leading-normal font-medium">{res}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <div className="grid grid-cols-2 gap-10">
                {/* Education */}
                <section>
                  <h2 className={cn("text-xs font-bold uppercase tracking-[0.25em] border-b-2 pb-1 mb-5", styles.accentBorder)}>Education</h2>
                  <div className="space-y-5">
                    {EDUCATION.map((edu, i) => (
                      <div key={i}>
                        <h3 className="font-bold text-[11px] text-slate-900 leading-tight">{edu.degree}</h3>
                        <p className={cn("text-[10px] font-bold", styles.primaryText)}>{edu.school}</p>
                        <p className="text-[9px] text-slate-400 font-bold mb-1 italic">{edu.period}</p>
                        <p className="text-[9px] text-slate-500 leading-relaxed">{edu.focus}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Skills */}
                <section>
                  <h2 className={cn("text-xs font-bold uppercase tracking-[0.25em] border-b-2 pb-1 mb-5", styles.accentBorder)}>Technical Expertise</h2>
                  <div className="grid grid-cols-1 gap-y-4">
                    {SKILLS.slice(0, 4).map((group, i) => (
                      <div key={i}>
                        <h3 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{group.category}</h3>
                        <p className="text-[10px] text-slate-700 leading-relaxed font-bold">{group.items.join(' • ')}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Impact */}
              <section>
                <h2 className={cn("text-xs font-bold uppercase tracking-[0.25em] border-b-2 pb-1 mb-5", styles.accentBorder)}>Leadership & Social Impact</h2>
                <div className="grid grid-cols-2 gap-8">
                  {IMPACT.map((imp, i) => (
                    <div key={i} className="p-4 rounded-xl border border-slate-50">
                      <h3 className="font-bold text-[11px] text-slate-900 mb-1">{imp.role}</h3>
                      <p className={cn("text-[10px] font-bold mb-2", styles.primaryText)}>{imp.organization}</p>
                      <ul className="list-disc list-outside ml-4 space-y-1">
                        {imp.achievements.slice(0, 2).map((ach, j) => (
                          <li key={j} className="text-[9px] text-slate-600 font-medium leading-relaxed">{ach}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <footer className="mt-auto pt-16 flex justify-end items-center gap-4">
              <div className="text-right">
                <p className={cn("text-xl font-bold italic mb-1", styles.primaryText)}>
                  {PERSONAL_INFO.name}
                </p>
                <div className={cn("w-32 h-[1px] ml-auto", styles.accentBorder.replace('border-', 'bg-'))} />
                <p className="text-[8px] uppercase tracking-[0.3em] text-slate-400 mt-2 font-bold">Authorized Digital Signature</p>
              </div>
            </footer>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};