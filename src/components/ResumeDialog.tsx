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
import { Download, Loader2, FileText } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCE, EDUCATION, SKILLS, IMPACT } from '@/lib/portfolio-data';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Image from 'next/image';

export const ResumeDialog = () => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Resume Preview
          </DialogTitle>
        </DialogHeader>

        <div className="flex justify-end mb-4">
          <Button onClick={handleDownload} disabled={isGenerating} className="gap-2">
            {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            Download PDF
          </Button>
        </div>

        {/* Resume Template for PDF Capture */}
        <div className="bg-muted p-4 md:p-8 rounded-lg overflow-x-auto">
          <div 
            ref={resumeRef}
            className="bg-white text-black p-10 shadow-2xl mx-auto w-[210mm] min-h-[297mm] font-sans selection:bg-blue-100 flex flex-col"
            style={{ color: '#1a1a1a' }}
          >
            {/* Header */}
            <header className="border-b-2 border-primary pb-6 mb-8 flex justify-between items-start">
              <div className="max-w-[70%]">
                <h1 className="text-4xl font-bold uppercase tracking-tight text-primary mb-2">{PERSONAL_INFO.name}</h1>
                <p className="text-xl font-medium text-gray-600 mb-4">{PERSONAL_INFO.title}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500">
                  <span>📍 {PERSONAL_INFO.location}</span>
                  <span>📞 {PERSONAL_INFO.phone}</span>
                  <span>📧 {PERSONAL_INFO.email}</span>
                </div>
              </div>
              <div className="w-24 h-32 relative rounded-lg overflow-hidden border-2 border-primary/20 bg-gray-50">
                <Image 
                  src={PERSONAL_INFO.images.resume} 
                  alt={PERSONAL_INFO.name}
                  fill
                  className="object-contain"
                />
              </div>
            </header>

            {/* Profile */}
            <section className="mb-8">
              <h2 className="text-lg font-bold text-primary uppercase tracking-widest border-l-4 border-primary pl-3 mb-4">Professional Profile</h2>
              <p className="text-sm leading-relaxed text-gray-700">{PERSONAL_INFO.subtext}</p>
            </section>

            {/* Experience */}
            <section className="mb-8">
              <h2 className="text-lg font-bold text-primary uppercase tracking-widest border-l-4 border-primary pl-3 mb-4">Experience</h2>
              <div className="space-y-6">
                {EXPERIENCE.map((exp, i) => (
                  <div key={i} className="relative">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-base">{exp.company} — {exp.role}</h3>
                      <span className="text-xs font-medium text-gray-500">{exp.period}</span>
                    </div>
                    <p className="text-xs font-bold text-primary italic mb-2">{exp.focus}</p>
                    <ul className="list-disc list-outside ml-4 space-y-1">
                      {exp.highlightProject.responsibilities.map((res, j) => (
                        <li key={j} className="text-xs text-gray-700">{res}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="mb-8">
              <h2 className="text-lg font-bold text-primary uppercase tracking-widest border-l-4 border-primary pl-3 mb-4">Education</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EDUCATION.map((edu, i) => (
                  <div key={i} className="border-l border-gray-200 pl-4">
                    <h3 className="font-bold text-sm">{edu.degree}</h3>
                    <p className="text-xs text-primary font-medium">{edu.school}</p>
                    <p className="text-[10px] text-gray-500 mb-1">{edu.period}</p>
                    <p className="text-[10px] text-gray-600 leading-tight">{edu.focus}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section className="mb-8">
              <h2 className="text-lg font-bold text-primary uppercase tracking-widest border-l-4 border-primary pl-3 mb-4">Technical Arsenal</h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {SKILLS.slice(0, 4).map((group, i) => (
                  <div key={i}>
                    <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter mb-1">{group.category}</h3>
                    <p className="text-xs text-gray-700">{group.items.join(', ')}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Impact */}
            <section className="mb-12">
              <h2 className="text-lg font-bold text-primary uppercase tracking-widest border-l-4 border-primary pl-3 mb-4">Social Impact & Leadership</h2>
              <div className="space-y-4">
                {IMPACT.map((imp, i) => (
                  <div key={i}>
                    <h3 className="font-bold text-sm">{imp.role} — <span className="text-gray-600">{imp.organization}</span></h3>
                    <ul className="list-disc list-outside ml-4 mt-1">
                      {imp.achievements.slice(0, 2).map((ach, j) => (
                        <li key={j} className="text-[11px] text-gray-700">{ach}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Footer / Signature */}
            <footer className="mt-auto pt-10 border-t border-gray-100 flex justify-between items-end">
              <div className="text-[10px] text-gray-400">
                <p>Generated via SynapticFolio AI</p>
                <p>Verified Portfolio of {PERSONAL_INFO.name}</p>
              </div>
              <div className="text-center">
                <div className="font-headline italic text-2xl text-primary mb-1" style={{ fontFamily: 'cursive' }}>
                  {PERSONAL_INFO.name}
                </div>
                <div className="w-40 h-[1px] bg-gray-300 mx-auto" />
                <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2">Digital Signature</p>
              </div>
            </footer>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};