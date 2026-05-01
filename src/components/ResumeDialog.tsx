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
import { Download, Loader2, FileText, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCE, EDUCATION, SKILLS, IMPACT } from '@/lib/portfolio-data';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Image from 'next/image';

export const ResumeDialog = () => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

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
      pdf.save(`Resume_${PERSONAL_INFO.name.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="rounded-full gap-2 px-8">
          <Download className="h-4 w-4" /> Resume
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto bg-slate-50 dark:bg-slate-900">
        <DialogHeader className="flex flex-row items-center justify-between border-b pb-4 mb-6">
          <DialogTitle className="flex items-center gap-2 text-xl font-headline">
            <FileText className="h-5 w-5 text-primary" />
            Standard Professional Resume
          </DialogTitle>
          <Button onClick={handleDownload} disabled={isGenerating} className="gap-2 rounded-full px-6">
            {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            Download PDF
          </Button>
        </DialogHeader>

        <div className="flex justify-center pb-10">
          <div 
            ref={resumeRef}
            className="bg-white text-[#111827] p-12 shadow-sm mx-auto w-[210mm] min-h-[297mm] font-sans flex flex-col"
            style={{ color: '#111827' }}
          >
            <header className="mb-10 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">{PERSONAL_INFO.name.toUpperCase()}</h1>
              <p className="text-lg font-medium text-primary mb-6">{PERSONAL_INFO.title}</p>
              
              <div className="flex flex-wrap justify-center gap-y-2 gap-x-6 text-[11px] text-slate-500 font-medium uppercase tracking-wider">
                <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> {PERSONAL_INFO.location}</span>
                <span className="flex items-center gap-1.5"><Phone className="h-3 w-3" /> {PERSONAL_INFO.phone}</span>
                <span className="flex items-center gap-1.5"><Mail className="h-3 w-3" /> {PERSONAL_INFO.email}</span>
                <span className="flex items-center gap-1.5"><Globe className="h-3 w-3" /> LINKEDIN.COM/IN/MARIFULISLAM</span>
              </div>
            </header>

            <div className="grid grid-cols-1 gap-10">
              <section>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-[0.2em] border-b-2 border-slate-900 pb-1 mb-4">Professional Profile</h2>
                <p className="text-xs leading-[1.6] text-slate-600 font-normal">
                  {PERSONAL_INFO.subtext}
                </p>
              </section>

              <section>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-[0.2em] border-b-2 border-slate-900 pb-1 mb-6">Professional Experience</h2>
                <div className="space-y-8">
                  {EXPERIENCE.map((exp, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-[13px] text-slate-900">{exp.company}</h3>
                          <p className="text-[11px] font-bold text-primary italic">{exp.role}</p>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{exp.period}</span>
                      </div>
                      <p className="text-[10px] font-medium text-slate-500 mb-3">{exp.focus}</p>
                      <ul className="list-disc list-outside ml-4 space-y-1.5">
                        {exp.highlightProject.responsibilities.map((res, j) => (
                          <li key={j} className="text-[11px] text-slate-600 leading-normal">{res}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <div className="grid grid-cols-2 gap-10">
                <section>
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-[0.2em] border-b-2 border-slate-900 pb-1 mb-5">Education</h2>
                  <div className="space-y-5">
                    {EDUCATION.map((edu, i) => (
                      <div key={i}>
                        <h3 className="font-bold text-[11px] text-slate-900 leading-tight">{edu.degree}</h3>
                        <p className="text-[10px] text-primary font-bold">{edu.school}</p>
                        <p className="text-[9px] text-slate-400 font-bold mb-1">{edu.period}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-[0.2em] border-b-2 border-slate-900 pb-1 mb-5">Technical Expertise</h2>
                  <div className="grid grid-cols-1 gap-y-4">
                    {SKILLS.slice(0, 4).map((group, i) => (
                      <div key={i}>
                        <h3 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{group.category}</h3>
                        <p className="text-[10px] text-slate-700 leading-relaxed font-medium">{group.items.join(' • ')}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <section>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-[0.2em] border-b-2 border-slate-900 pb-1 mb-5">Leadership & Impact</h2>
                <div className="grid grid-cols-2 gap-8">
                  {IMPACT.map((imp, i) => (
                    <div key={i}>
                      <h3 className="font-bold text-[11px] text-slate-900 mb-1">{imp.role}</h3>
                      <p className="text-[10px] font-bold text-primary mb-2">{imp.organization}</p>
                      <ul className="list-disc list-outside ml-4 space-y-1">
                        {imp.achievements.slice(0, 1).map((ach, j) => (
                          <li key={j} className="text-[10px] text-slate-600">{ach}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <footer className="mt-auto pt-12 flex justify-end">
              <div className="text-right">
                <p className="text-[14px] font-headline italic text-primary mb-1">
                  {PERSONAL_INFO.name}
                </p>
                <div className="w-32 h-[1px] bg-slate-200 ml-auto" />
                <p className="text-[8px] uppercase tracking-widest text-slate-400 mt-2 font-bold">Authorized Digital Signature</p>
              </div>
            </footer>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};