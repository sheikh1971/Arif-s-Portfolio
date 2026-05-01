
"use client"

import React, { useState } from 'react';
import { generateProjectInsight } from '@/ai/flows/project-insight-generator';
import { Button } from './ui/button';
import { FileText, Loader2, Brain, Layers, Cpu, Terminal, BarChart3, ArrowRight, Database, ShieldCheck, Microscope, Zap, Activity, Target } from 'lucide-react';
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
import { cn } from '@/lib/utils';

interface ProjectReportData {
  architecture: string;
  dataset: string;
  accuracy: string;
  accuracyLabel: string;
  summary?: string;
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
      console.error("Insight generation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const defaultReportData: ProjectReportData = {
    architecture: "Neural Network",
    dataset: "Proprietary Dataset",
    accuracy: "Verified",
    accuracyLabel: "Status",
    summary: "Leveraging custom neural architectures for high-precision diagnostic systems.",
    pipeline: { ingestion: "Data Source", preprocessing: "Normalization", engine: "Core Model", analytics: "Validation" },
    benchmarks: [
      { model: "Proposed", accuracy: 95 },
      { model: "Baseline A", accuracy: 82 },
      { model: "Baseline B", accuracy: 78 },
    ]
  };

  const currentReport = reportData || defaultReportData;
  const chartData = currentReport.benchmarks.map((b, i) => ({
    ...b,
    fill: i === 0 ? "hsl(var(--primary))" : "hsl(var(--muted-foreground)/0.2)"
  }));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full gap-2 text-[10px] font-headline uppercase tracking-widest border-primary/20 hover:bg-primary/5 rounded-full h-10 md:h-9"
        >
          <FileText size={12} className="text-primary" />
          Technical Report
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[100vw] sm:max-w-6xl h-full md:h-[92vh] p-0 border-none shadow-2xl flex flex-col overflow-hidden bg-background md:rounded-[2.5rem]">
        <DialogHeader className="p-6 md:p-8 border-b border-border/40 shrink-0 bg-background/95 backdrop-blur-md sticky top-0 z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <DialogTitle className="flex items-center gap-4 text-xl md:text-2xl font-headline font-bold">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary shrink-0">
                <Microscope size={24} />
              </div>
              <div className="min-w-0">
                <span className="block text-primary text-[8px] uppercase tracking-[0.4em] font-bold mb-0.5 opacity-80">Scientific Documentation</span>
                <span className="gradient-text truncate block">{projectName}</span>
              </div>
            </DialogTitle>
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {projectTags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="secondary" className="text-[8px] uppercase tracking-widest font-bold px-3 py-0.5 bg-muted/40 whitespace-nowrap">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="p-6 md:p-10 space-y-12">
            
            <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
              <div className="lg:col-span-8 space-y-6">
                <div className="p-6 rounded-3xl bg-primary/5 border-l-4 border-primary shadow-inner">
                  <p className="text-[10px] font-headline font-bold uppercase tracking-widest text-primary/70 mb-2">Executive Summary</p>
                  <p className="text-sm font-medium leading-relaxed italic text-foreground/90">
                    "{currentReport.summary || projectDescription.split('.')[0] + '.'}"
                  </p>
                </div>

                <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/80 leading-relaxed text-sm space-y-4">
                  {projectDescription.split('\n\n').map((para, i) => (
                    <p key={i} className="animate-reveal" style={{ animationDelay: `${i * 0.1}s` }}>{para}</p>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 space-y-4">
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                  <div className="p-5 border rounded-3xl bg-card/40 backdrop-blur-sm">
                    <h5 className="text-[9px] font-headline font-bold uppercase tracking-widest text-muted-foreground mb-3">Architecture</h5>
                    <p className="text-sm font-bold">{currentReport.architecture}</p>
                  </div>
                  <div className="p-5 border rounded-3xl bg-card/40 backdrop-blur-sm">
                    <h5 className="text-[9px] font-headline font-bold uppercase tracking-widest text-muted-foreground mb-3">Dataset</h5>
                    <p className="text-sm font-bold">{currentReport.dataset}</p>
                  </div>
                </div>
                <div className="p-6 border rounded-3xl bg-primary text-primary-foreground shadow-xl shadow-primary/20">
                  <h5 className="text-[9px] font-headline font-bold uppercase tracking-widest opacity-80 mb-2">{currentReport.accuracyLabel}</h5>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">{currentReport.accuracy}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-muted/20 border border-primary/10 overflow-hidden">
              <h4 className="text-[10px] font-headline font-bold uppercase tracking-widest text-primary mb-12 text-center flex items-center justify-center gap-3">
                <Activity size={16} /> Neural Architecture Pipeline
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center relative">
                {/* Connecting lines for desktop */}
                <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                
                {[
                  { icon: Database, label: "Ingestion", sub: currentReport.pipeline.ingestion },
                  { icon: Layers, label: "Preprocessing", sub: currentReport.pipeline.preprocessing },
                  { icon: Brain, label: "Engine", sub: currentReport.pipeline.engine, highlight: true },
                  { icon: BarChart3, label: "Analytics", sub: currentReport.pipeline.analytics },
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 relative z-10 group">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 group-hover:scale-110",
                      step.highlight ? "bg-primary/20 border-primary text-primary animate-pulse" : "bg-card border-border/40 text-muted-foreground"
                    )}>
                      <step.icon size={28} />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider">{step.label}</span>
                      <p className="text-[9px] text-muted-foreground font-mono max-w-[100px] truncate">{step.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
               <div className="space-y-6">
                  <h4 className="text-[10px] font-headline font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    <BarChart3 size={14} /> Performance Benchmark
                  </h4>
                  <div className="h-[250px] w-full bg-card/40 p-6 rounded-3xl border border-border/40 backdrop-blur-sm">
                    <ChartContainer config={{ accuracy: { label: "Accuracy %", color: "hsl(var(--primary))" } }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 30 }}>
                          <XAxis type="number" hide domain={[0, 100]} />
                          <YAxis dataKey="model" type="category" axisLine={false} tickLine={false} width={80} style={{ fontSize: '9px', fontWeight: 'bold', fill: 'currentColor' }} />
                          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                          <Bar dataKey="accuracy" radius={[0, 4, 4, 0]} barSize={24}>
                            {chartData.map((entry, index) => <Cell key={index} fill={entry.fill} />)}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
               </div>
               
               <div className="space-y-6 pb-12 md:pb-0">
                  <h4 className="text-[10px] font-headline font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    <Brain size={14} /> Technical Evaluation
                  </h4>
                  <Button 
                    variant="default" 
                    className="w-full rounded-2xl gap-3 py-8 shadow-xl shadow-primary/20 text-xs font-bold uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98]" 
                    onClick={handleGenerate} 
                    disabled={loading}
                  >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : <Brain size={18} />}
                    {insight ? "Re-Synthesize Insights" : "Generate Deep Evaluation"}
                  </Button>
                  
                  {insight && (
                    <div className="p-8 rounded-[2rem] bg-muted/40 border border-primary/20 text-sm leading-relaxed whitespace-pre-wrap animate-reveal shadow-inner overflow-hidden relative">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Zap size={64} className="text-primary" />
                      </div>
                      <span className="relative z-10">{insight}</span>
                    </div>
                  )}
               </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
