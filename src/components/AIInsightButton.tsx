"use client"

import React, { useState } from 'react';
import { generateProjectInsight } from '@/ai/flows/project-insight-generator';
import { Button } from './ui/button';
import { Sparkles, Loader2, Info, Brain, Layers, Cpu, Terminal, BarChart3, ArrowRight, FileText, Database, ShieldCheck, Microscope } from 'lucide-react';
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

interface AIInsightButtonProps {
  projectName: string;
  projectDescription: string;
  projectTags: string[];
}

export const AIInsightButton = ({ projectName, projectDescription, projectTags }: AIInsightButtonProps) => {
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

  const chartData = [
    { model: "SE-CNN", accuracy: 88.55, fill: "hsl(var(--primary))" },
    { model: "MobileNetV2", accuracy: 51.56, fill: "hsl(var(--muted-foreground)/0.3)" },
    { model: "DenseNet121", accuracy: 48.20, fill: "hsl(var(--muted-foreground)/0.3)" },
    { model: "ResNet50", accuracy: 45.10, fill: "hsl(var(--muted-foreground)/0.3)" },
    { model: "EfficientNetB0", accuracy: 42.80, fill: "hsl(var(--muted-foreground)/0.3)" },
  ];

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
          className="gap-2 text-xs font-headline border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Technical Report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-5xl h-[95vh] max-h-[95vh] bg-card border-primary/20 shadow-2xl p-0 overflow-hidden flex flex-col">
        <DialogHeader className="p-8 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-4 text-3xl font-headline font-bold">
              <div className="p-3 rounded-xl bg-primary/10">
                <Microscope className="h-8 w-8 text-primary" />
              </div>
              <div>
                <span className="block text-primary text-xs uppercase tracking-[0.3em] font-bold mb-1">Scientific Documentation</span>
                {projectName}
              </div>
            </DialogTitle>
            <div className="flex flex-col items-end gap-2">
              <div className="flex gap-2">
                <Badge variant="outline" className="text-[10px] font-mono border-primary/30">ID: PROJECT_THESIS_2024</Badge>
                <Badge variant="outline" className="text-[10px] font-mono border-primary/30">REF: SE_CNN_v2</Badge>
              </div>
              <Badge variant="secondary" className="text-[10px] font-mono bg-primary/20 text-primary">STATUS: VERIFIED_RESEARCH</Badge>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-6">
            {projectTags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-[10px] uppercase font-headline tracking-widest bg-muted text-muted-foreground border-transparent">
                {tag}
              </Badge>
            ))}
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 px-8 py-6">
          <div className="space-y-12 pb-12">
            
            {/* 01. Abstract & Textual Explanation */}
            <section className="relative">
              <h4 className="text-xs font-headline font-bold uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
                <FileText size={14} /> 01. Research Abstract & System Methodology
              </h4>
              <div className="grid md:grid-cols-12 gap-8">
                <div className="md:col-span-8">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ScrollArea className="h-[450px] w-full rounded-2xl bg-muted/30 border border-primary/5 shadow-inner">
                      <div className="p-8 leading-relaxed font-body text-base text-foreground/90 whitespace-pre-wrap relative">
                        <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none">
                          <Database size={120} />
                        </div>
                        <p className="relative z-10 first-letter:text-4xl first-letter:font-bold first-letter:text-primary first-letter:mr-2 first-letter:float-left">
                          {projectDescription}
                        </p>
                      </div>
                    </ScrollArea>
                  </div>
                </div>
                <div className="md:col-span-4 space-y-6">
                  <div className="p-6 border rounded-2xl bg-primary/5 border-primary/20">
                    <h5 className="text-[10px] font-headline font-bold uppercase tracking-widest text-primary mb-4">Core Specifications</h5>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold">Architecture</p>
                        <p className="text-sm font-bold">SE-CNN Custom</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold">Dataset Size</p>
                        <p className="text-sm font-bold">68,568 Images</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold">Validation Classes</p>
                        <p className="text-sm font-bold">23 Clinical Categories</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold">Framework</p>
                        <p className="text-sm font-bold">TensorFlow / Keras</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 border rounded-2xl bg-muted/20 border-border/50">
                    <h5 className="text-[10px] font-headline font-bold uppercase tracking-widest text-muted-foreground mb-4">Peak Performance</h5>
                    <div className="text-center">
                      <p className="text-4xl font-bold text-primary">88.55%</p>
                      <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-tighter">Test Set Accuracy</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 02. Neural Pipeline Flowchart */}
            <section className="bg-muted/10 p-8 rounded-3xl border border-primary/5">
              <h4 className="text-xs font-headline font-bold uppercase tracking-widest text-primary mb-12 text-center flex items-center justify-center gap-2">
                <Cpu size={14} /> 02. Neural Architecture Pipeline
              </h4>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-20 h-20 rounded-2xl bg-card border-2 border-primary/10 flex items-center justify-center shadow-xl group hover:border-primary/40 transition-colors">
                    <Database size={32} className="text-primary/60 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase">Data Input</span>
                    <p className="text-[9px] text-muted-foreground">Kaggle Repository</p>
                  </div>
                </div>
                <ArrowRight className="hidden md:block text-primary/30 animate-pulse" />
                <div className="flex flex-col items-center gap-3">
                  <div className="w-20 h-20 rounded-2xl bg-card border-2 border-primary/10 flex items-center justify-center shadow-xl group hover:border-primary/40 transition-colors">
                    <Layers size={32} className="text-primary/60 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase">Preprocessing</span>
                    <p className="text-[9px] text-muted-foreground">Resizing & Norm</p>
                  </div>
                </div>
                <ArrowRight className="hidden md:block text-primary/30 animate-pulse" />
                <div className="flex flex-col items-center gap-3 relative">
                  <div className="absolute -inset-4 bg-primary/5 rounded-full blur-xl animate-pulse" />
                  <div className="w-24 h-24 rounded-full bg-primary/20 border-2 border-primary border-dashed flex items-center justify-center shadow-2xl relative z-10">
                    <Brain size={40} className="text-primary animate-pulse-soft" />
                  </div>
                  <div className="space-y-1 relative z-10">
                    <span className="text-xs font-bold uppercase text-primary">SE-CNN Engine</span>
                    <p className="text-[9px] text-primary/60">Recalibration Block</p>
                  </div>
                </div>
                <ArrowRight className="hidden md:block text-primary/30 animate-pulse" />
                <div className="flex flex-col items-center gap-3">
                  <div className="w-20 h-20 rounded-2xl bg-card border-2 border-primary/10 flex items-center justify-center shadow-xl group hover:border-primary/40 transition-colors">
                    <BarChart3 size={32} className="text-primary/60 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase">Evaluation</span>
                    <p className="text-[9px] text-muted-foreground">ROC / AUC Analysis</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 03. Comparative Benchmarks */}
            <section className="grid md:grid-cols-12 gap-12">
              <div className="md:col-span-7">
                <h4 className="text-xs font-headline font-bold uppercase tracking-widest text-primary mb-8 flex items-center gap-2">
                  <BarChart3 size={14} /> 03. Performance Benchmark (SOTA Comparison)
                </h4>
                <div className="h-[300px] w-full">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 40 }}>
                        <XAxis type="number" hide domain={[0, 100]} />
                        <YAxis 
                          dataKey="model" 
                          type="category" 
                          axisLine={false} 
                          tickLine={false} 
                          width={110}
                          style={{ fontSize: '11px', fontWeight: 'bold' }}
                        />
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Bar dataKey="accuracy" radius={[0, 6, 6, 0]} barSize={32}>
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                <p className="text-[10px] text-muted-foreground mt-4 italic">
                  * Benchmarked under identical hyperparameter conditions (Batch: 32, Epochs: 50, Learning Rate: 0.001). Comparison includes MobileNetV2, DenseNet121, ResNet50, and EfficientNetB0.
                </p>
              </div>

              <div className="md:col-span-5 space-y-6">
                <h4 className="text-xs font-headline font-bold uppercase tracking-widest text-primary mb-4">Key Research Findings</h4>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <div className="p-2 rounded-lg bg-primary/20 text-primary">
                      <Sparkles size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">~9% Ablation Gain</p>
                      <p className="text-xs text-muted-foreground">Improvement strictly attributed to the Squeeze-and-Excitation attention mechanism.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start p-4 rounded-xl bg-muted/30 border border-border/50">
                    <div className="p-2 rounded-lg bg-muted text-muted-foreground">
                      <ShieldCheck size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">AUC &gt; 0.90 Discriminative Power</p>
                      <p className="text-xs text-muted-foreground">High sensitivity and specificity across major diagnostic classes verified by ROC analysis.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start p-4 rounded-xl bg-muted/30 border border-border/50">
                    <div className="p-2 rounded-lg bg-muted text-muted-foreground">
                      <Terminal size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Deployable Complexity</p>
                      <p className="text-xs text-muted-foreground">Optimized ~5M parameter footprint suitable for edge-device telemedicine integration.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 04. AI Analysis */}
            <section className="pt-12 border-t border-primary/10">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xs font-headline font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                  <Brain size={14} /> 04. Deep AI Technical Analysis
                </h4>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleGenerate} 
                  disabled={loading}
                  className="text-[10px] font-headline hover:bg-primary hover:text-primary-foreground border-primary/30"
                >
                  {loading ? <Loader2 className="h-3 w-3 animate-spin mr-2" /> : <Sparkles className="h-3 w-3 mr-2" />}
                  {insight ? "Re-Run Comprehensive Analysis" : "Generate Deep Evaluation"}
                </Button>
              </div>
              
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-6 text-muted-foreground bg-muted/10 rounded-3xl border border-dashed">
                  <div className="relative">
                    <Loader2 className="h-12 w-12 animate-spin text-primary opacity-50" />
                    <Brain size={24} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" />
                  </div>
                  <p className="text-xs font-headline animate-pulse tracking-widest uppercase text-center">
                    Processing Neural Weights & Comparative Datasets...<br/>
                    <span className="text-[10px] opacity-60">Synthesizing Technical Peer Review</span>
                  </p>
                </div>
              ) : insight ? (
                <div className="p-10 rounded-3xl bg-primary/5 border border-primary/10 leading-relaxed font-body text-base text-foreground/90 whitespace-pre-wrap shadow-inner border-l-4 border-l-primary">
                  {insight}
                </div>
              ) : (
                <div className="py-12 text-center text-xs text-muted-foreground border border-dashed rounded-3xl bg-muted/5">
                  <p className="mb-4">No AI summary generated.</p>
                  <Button variant="ghost" size="sm" onClick={handleGenerate} className="text-[10px] font-headline uppercase tracking-widest">
                    Begin Technical Synthesis
                  </Button>
                </div>
              )}
            </section>
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-primary/10 bg-muted/50 backdrop-blur-md">
          <div className="flex items-center justify-between max-w-full overflow-hidden">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Info size={12} />
              <span className="text-[10px] italic">Proprietary Research Asset · Applied AI & ML Systems · Md. Ariful Islam</span>
            </div>
            <p className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] font-bold">
              SynapticFolio v2.0 // Core ML Engine // {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};