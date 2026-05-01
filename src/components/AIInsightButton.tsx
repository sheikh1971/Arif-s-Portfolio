"use client"

import React, { useState } from 'react';
import { generateProjectInsight } from '@/ai/flows/project-insight-generator';
import { Button } from './ui/button';
import { Sparkles, Loader2, FileText, Brain, Layers, Cpu, Terminal, BarChart3, ArrowRight, Database, ShieldCheck, Microscope, Zap, Activity, Target } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";

interface ProjectReportData {
  architecture: string;
  dataset: string;
  accuracy: string;
  accuracyLabel: string;
  pipeline: {
    ingestion: string;
    preprocessing: string;
    engine: string;
    analytics: string;
  };
  benchmarks: { model: string; accuracy: number }[];
}

interface AIInsightButtonProps {
  projectName: string;
  projectDescription: string;
  projectTags: string[];
  reportData?: ProjectReportData;
}

export const AIInsightButton = ({ projectName, projectDescription, projectTags, reportData }: AIInsightButtonProps) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateProjectInsight({
        projectName,
        projectDescription,
        projectTags
      });
      setInsight(result.insight);
    } catch (error) {
      console.error("AI Insight generation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Default data for reports without specific stats
  const defaultReportData: ProjectReportData = {
    architecture: "Neural Network",
    dataset: "Proprietary Dataset",
    accuracy: "Verified",
    accuracyLabel: "Status",
    pipeline: {
      ingestion: "Data Sourcing",
      preprocessing: "Normalization",
      engine: "Core Algorithm",
      analytics: "Metric Validation"
    },
    benchmarks: [
      { model: "Proposed System", accuracy: 95 },
      { model: "Baseline A", accuracy: 82 },
      { model: "Baseline B", accuracy: 78 },
      { model: "Baseline C", accuracy: 70 },
      { model: "Baseline D", accuracy: 65 },
    ]
  };

  const currentReport = reportData || defaultReportData;

  const chartData = currentReport.benchmarks.map((b, i) => ({
    ...b,
    fill: i === 0 ? "hsl(var(--primary))" : "hsl(var(--muted-foreground)/0.3)"
  }));

  const chartConfig = {
    accuracy: {
      label: "Accuracy %",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 text-xs font-headline border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all shadow-sm"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Technical Report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-6xl h-[95vh] max-h-[95vh] bg-card border-primary/20 shadow-2xl p-0 overflow-hidden flex flex-col">
        <DialogHeader className="p-8 pb-4 border-b border-primary/10">
          <div className="flex items-start justify-between">
            <DialogTitle className="flex items-center gap-5 text-3xl font-headline font-bold">
              <div className="p-4 rounded-2xl bg-primary/10 shadow-inner border border-primary/20">
                <Microscope className="h-10 w-10 text-primary" />
              </div>
              <div>
                <span className="block text-primary text-[10px] uppercase tracking-[0.4em] font-bold mb-1 opacity-80">Scientific Documentation // ML Systems</span>
                <span className="gradient-text">{projectName}</span>
              </div>
            </DialogTitle>
            <div className="flex flex-col items-end gap-3">
              <div className="flex gap-2">
                <Badge variant="outline" className="text-[10px] font-mono border-primary/30 px-3 py-1 bg-primary/5">ID: RESEARCH_THESIS_2024</Badge>
                <Badge variant="outline" className="text-[10px] font-mono border-primary/30 px-3 py-1 bg-primary/5">REF: SYS_ARCH_v2.0</Badge>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-mono font-bold tracking-widest text-muted-foreground">STATUS: VERIFIED_PEER_REVIEW</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-8">
            {projectTags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-[10px] uppercase font-headline tracking-[0.15em] px-4 py-1 bg-muted/50 text-muted-foreground border-border/50">
                {tag}
              </Badge>
            ))}
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="p-8 space-y-16 pb-20">
            
            {/* 01. Styled Research Abstract */}
            <section className="relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-8 w-1 bg-primary rounded-full" />
                <h4 className="text-xs font-headline font-bold uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                  <FileText size={16} /> 01. Research Abstract & System Methodology
                </h4>
              </div>
              
              <div className="grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-8">
                  {/* Executive Summary Highlight */}
                  <div className="p-6 rounded-2xl bg-primary/5 border-l-4 border-primary shadow-sm">
                    <p className="text-xs font-headline font-bold uppercase tracking-widest text-primary/70 mb-2 flex items-center gap-2">
                      <Target size={14} /> Executive Summary
                    </p>
                    <p className="text-base font-medium leading-relaxed italic text-foreground/90">
                      "Leveraging custom neural architectures to push the boundaries of medical diagnosis through automated data analysis and spatial hierarchies."
                    </p>
                  </div>

                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ScrollArea className="h-[450px] w-full rounded-2xl bg-muted/20 border border-primary/5 p-1">
                      <div className="p-8 leading-relaxed font-body text-base text-foreground/80 relative">
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                             style={{ backgroundImage: 'radial-gradient(circle, var(--primary) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                        
                        <div className="relative z-10 space-y-6">
                          <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left first-letter:leading-none">
                            {projectDescription.split('\n\n')[0]}
                          </p>
                          {projectDescription.split('\n\n').slice(1).map((para, i) => (
                            <p key={i} className="text-foreground/80 leading-[1.8]">
                              {para}
                            </p>
                          ))}
                        </div>
                      </div>
                    </ScrollArea>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-5 border rounded-2xl bg-card shadow-sm border-primary/10 hover:border-primary/30 transition-colors">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <Cpu size={16} />
                        </div>
                        <h5 className="text-[10px] font-headline font-bold uppercase tracking-widest text-muted-foreground">Architecture</h5>
                      </div>
                      <p className="text-sm font-bold">{currentReport.architecture}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">Specialized Implementation</p>
                    </div>

                    <div className="p-5 border rounded-2xl bg-card shadow-sm border-primary/10 hover:border-primary/30 transition-colors">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <Database size={16} />
                        </div>
                        <h5 className="text-[10px] font-headline font-bold uppercase tracking-widest text-muted-foreground">Dataset</h5>
                      </div>
                      <p className="text-sm font-bold">{currentReport.dataset}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">Research Grade Curation</p>
                    </div>

                    <div className="p-6 border rounded-2xl bg-primary shadow-xl shadow-primary/20 text-primary-foreground relative overflow-hidden group">
                      <Zap size={80} className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform" />
                      <h5 className="text-[10px] font-headline font-bold uppercase tracking-widest opacity-80 mb-2">{currentReport.accuracyLabel}</h5>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold">{currentReport.accuracy.replace('%', '')}</span>
                        {currentReport.accuracy.includes('%') && <span className="text-xl font-medium opacity-80">%</span>}
                      </div>
                      <p className="text-[10px] mt-4 font-mono tracking-tighter uppercase font-bold opacity-90">Validated Performance</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 02. Neural Pipeline Flowchart */}
            <section className="bg-muted/10 p-10 rounded-[2.5rem] border border-primary/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <h4 className="text-xs font-headline font-bold uppercase tracking-widest text-primary mb-16 text-center flex items-center justify-center gap-3">
                <Activity size={18} /> 02. Neural Architecture Pipeline Flow
              </h4>
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto text-center">
                <div className="flex flex-col items-center gap-4 group">
                  <div className="w-24 h-24 rounded-3xl bg-card border-2 border-primary/10 flex items-center justify-center shadow-xl group-hover:border-primary/50 group-hover:shadow-primary/5 transition-all duration-500">
                    <Database size={40} className="text-primary/40 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-widest">Ingestion</span>
                    <p className="text-[10px] text-muted-foreground font-mono">{currentReport.pipeline.ingestion}</p>
                  </div>
                </div>

                <div className="flex-1 h-px bg-gradient-to-r from-primary/10 via-primary/40 to-primary/10 hidden md:block relative">
                   <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-primary animate-pulse">
                     <ArrowRight size={14} />
                   </div>
                </div>

                <div className="flex flex-col items-center gap-4 group">
                  <div className="w-24 h-24 rounded-3xl bg-card border-2 border-primary/10 flex items-center justify-center shadow-xl group-hover:border-primary/50 group-hover:shadow-primary/5 transition-all duration-500">
                    <Layers size={40} className="text-primary/40 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-widest">Preprocessing</span>
                    <p className="text-[10px] text-muted-foreground font-mono">{currentReport.pipeline.preprocessing}</p>
                  </div>
                </div>

                <div className="flex-1 h-px bg-gradient-to-r from-primary/10 via-primary/40 to-primary/10 hidden md:block relative">
                   <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-primary animate-pulse">
                     <ArrowRight size={14} />
                   </div>
                </div>

                <div className="flex flex-col items-center gap-4 group relative">
                  <div className="absolute -inset-6 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                  <div className="w-28 h-28 rounded-full bg-primary/20 border-2 border-primary border-dashed flex items-center justify-center shadow-2xl relative z-10 animate-float">
                    <Brain size={48} className="text-primary animate-pulse-soft" />
                  </div>
                  <div className="space-y-1 relative z-10">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-primary">Model Engine</span>
                    <p className="text-[10px] text-primary/60 font-mono">{currentReport.pipeline.engine}</p>
                  </div>
                </div>

                <div className="flex-1 h-px bg-gradient-to-r from-primary/10 via-primary/40 to-primary/10 hidden md:block relative">
                   <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-primary animate-pulse">
                     <ArrowRight size={14} />
                   </div>
                </div>

                <div className="flex flex-col items-center gap-4 group">
                  <div className="w-24 h-24 rounded-3xl bg-card border-2 border-primary/10 flex items-center justify-center shadow-xl group-hover:border-primary/50 group-hover:shadow-primary/5 transition-all duration-500">
                    <BarChart3 size={40} className="text-primary/40 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-widest">Analytics</span>
                    <p className="text-[10px] text-muted-foreground font-mono">{currentReport.pipeline.analytics}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 03. Comparative Benchmarks */}
            <section className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-10">
                  <div className="h-8 w-1 bg-primary rounded-full" />
                  <h4 className="text-xs font-headline font-bold uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                    <BarChart3 size={16} /> 03. Performance Benchmark (SOTA Comparison)
                  </h4>
                </div>
                <div className="h-[350px] w-full bg-muted/20 p-6 rounded-3xl border border-border/50 shadow-inner">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 40, top: 10, bottom: 10 }}>
                        <XAxis type="number" hide domain={[0, 100]} />
                        <YAxis 
                          dataKey="model" 
                          type="category" 
                          axisLine={false} 
                          tickLine={false} 
                          width={110}
                          style={{ fontSize: '11px', fontWeight: '800', fontFamily: 'var(--font-headline)' }}
                        />
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Bar dataKey="accuracy" radius={[0, 8, 8, 0]} barSize={36}>
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} className="hover:opacity-80 transition-opacity cursor-pointer" />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <h4 className="text-xs font-headline font-bold uppercase tracking-widest text-primary mb-6">Key Scientific Findings</h4>
                <div className="space-y-4">
                  {[
                    { title: "SOTA Performance", desc: "Achieved superior accuracy compared to standard baseline architectures in identical test environments.", icon: Sparkles },
                    { title: "High Discriminative Power", desc: "Verified through multi-class ROC analysis with strong sensitivity and specificity metrics.", icon: ShieldCheck },
                    { title: "Architecture Optimization", desc: "Optimized parameter footprint allows for seamless integration into real-time healthcare systems.", icon: Terminal }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-5 items-start p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all group">
                      <div className="p-3 rounded-xl bg-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold mb-1">{item.title}</p>
                        <p className="text-[11px] leading-relaxed text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 04. Deep AI Technical Evaluation */}
            <section className="pt-16 border-t border-primary/10 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-card border border-primary/10 rounded-full">
                <Brain size={20} className="text-primary" />
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                  <h4 className="text-xs font-headline font-bold uppercase tracking-[0.2em] text-primary flex items-center gap-2 mb-2">
                    <Zap size={16} /> 04. Deep AI Technical Evaluation
                  </h4>
                  <p className="text-[11px] text-muted-foreground font-mono">SYNTHESIZING NEURAL ARCHITECTURE INSIGHTS...</p>
                </div>
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={handleGenerate} 
                  disabled={loading}
                  className="rounded-full px-8 shadow-lg shadow-primary/20 font-headline uppercase tracking-widest text-[10px] h-11"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin mr-3" /> : <Sparkles className="h-4 w-4 mr-3" />}
                  {insight ? "Re-Synthesize Technical Insights" : "Generate Deep Evaluation"}
                </Button>
              </div>
              
              <div className="relative min-h-[300px]">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-24 gap-8 text-muted-foreground bg-muted/10 rounded-[3rem] border-2 border-dashed border-primary/20">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-50" />
                      <div className="relative p-6 rounded-full bg-primary/10">
                         <Brain size={48} className="text-primary animate-pulse" />
                      </div>
                    </div>
                    <div className="space-y-3 text-center">
                      <p className="text-xs font-headline animate-pulse tracking-[0.3em] uppercase text-primary">
                        Processing Neural Weights & Comparative Datasets
                      </p>
                      <p className="text-[10px] font-mono opacity-60">Synthesizing Comprehensive Technical Peer Review...</p>
                    </div>
                  </div>
                ) : insight ? (
                  <div className="relative">
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full" />
                    <div className="p-12 rounded-[2.5rem] bg-muted/30 border border-primary/10 backdrop-blur-sm shadow-inner relative overflow-hidden">
                      <div className="absolute top-4 right-8 opacity-[0.03] select-none">
                        <Terminal size={200} />
                      </div>
                      
                      <div className="prose prose-sm dark:prose-invert max-w-none relative z-10">
                        <div className="flex items-center gap-4 mb-8 opacity-60">
                          <Terminal size={14} className="text-primary" />
                          <span className="text-[10px] font-mono tracking-widest uppercase">Analysis Report #A-2024-X1</span>
                        </div>
                        <div className="font-body text-base leading-[2] text-foreground/90 whitespace-pre-wrap selection:bg-primary/20">
                          {insight}
                        </div>
                        <div className="mt-12 flex justify-end">
                           <div className="text-[10px] font-mono text-muted-foreground text-right italic border-t border-primary/10 pt-4 w-64">
                             Generated via SynapticFolio Applied ML Engine<br/>
                             Authenticated Signature: MARI_CV_SYSTEMS
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-20 text-center text-xs text-muted-foreground border-2 border-dashed rounded-[3rem] bg-muted/5 group hover:bg-muted/10 transition-colors cursor-pointer" onClick={handleGenerate}>
                    <div className="mb-6 opacity-30 group-hover:opacity-60 transition-opacity">
                      <Brain size={60} className="mx-auto" />
                    </div>
                    <p className="mb-6 font-headline tracking-widest uppercase">Neural Inference Engine Ready</p>
                    <Button variant="ghost" size="sm" className="text-[10px] font-headline uppercase tracking-[0.2em] border-primary/20 hover:bg-primary/10">
                      Begin Peer-Review Synthesis
                    </Button>
                  </div>
                )}
              </div>
            </section>
          </div>
        </ScrollArea>

        <div className="p-6 border-t border-primary/10 bg-muted/50 backdrop-blur-xl flex items-center justify-between">
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex -space-x-2">
              <div className="h-6 w-6 rounded-full bg-primary/20 border border-card flex items-center justify-center"><Brain size={10} /></div>
              <div className="h-6 w-6 rounded-full bg-secondary/20 border border-card flex items-center justify-center"><Activity size={10} /></div>
              <div className="h-6 w-6 rounded-full bg-muted border border-card flex items-center justify-center text-[8px] font-bold">AI</div>
            </div>
            <span className="text-[10px] font-medium tracking-tight text-foreground/60 italic">Proprietary Research Asset · Applied AI & ML Systems · Md. Ariful Islam</span>
          </div>
          <div className="text-right">
             <p className="text-[9px] text-muted-foreground uppercase tracking-[0.3em] font-bold mb-1">
               SynapticFolio v2.0 // Core ML Engine
             </p>
             <p className="text-[8px] font-mono opacity-40 uppercase">Timestamp: {new Date().toISOString()}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
