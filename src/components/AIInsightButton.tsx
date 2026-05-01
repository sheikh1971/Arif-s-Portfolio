"use client"

import React, { useState } from 'react';
import { generateProjectInsight } from '@/ai/flows/project-insight-generator';
import { Button } from './ui/button';
import { Sparkles, Loader2, Info, Brain, Layers, Cpu, Terminal, BarChart3, ArrowRight, FileText, Database, ShieldCheck } from 'lucide-react';
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
      <DialogContent className="sm:max-w-4xl max-h-[90vh] bg-card border-primary/20 shadow-2xl p-0 overflow-hidden flex flex-col">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3 text-2xl font-headline font-bold">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              {projectName}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] font-mono border-primary/30">THESIS_V2.0</Badge>
              <Badge variant="outline" className="text-[10px] font-mono border-primary/30">CORE_ARCHITECTURE</Badge>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {projectTags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-[10px] uppercase font-headline tracking-widest bg-primary/5 text-primary border-primary/10">
                {tag}
              </Badge>
            ))}
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 p-6 pt-4">
          <div className="space-y-12 pb-8">
            {/* System Core Specifications */}
            <section>
              <h4 className="text-xs font-headline font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                <ShieldCheck size={14} /> System Core Specifications
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-xl bg-muted/30">
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <Layers size={14} />
                    <span className="text-[10px] font-headline font-bold uppercase tracking-wider">Architecture</span>
                  </div>
                  <p className="text-sm font-bold">SE-CNN Custom</p>
                  <p className="text-[10px] text-muted-foreground">Attention-based recalibration</p>
                </div>
                <div className="p-4 border rounded-xl bg-muted/30">
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <Terminal size={14} />
                    <span className="text-[10px] font-headline font-bold uppercase tracking-wider">Framework</span>
                  </div>
                  <p className="text-sm font-bold">TensorFlow / Keras</p>
                  <p className="text-[10px] text-muted-foreground">End-to-end Python pipeline</p>
                </div>
                <div className="p-4 border rounded-xl bg-muted/30">
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <Database size={14} />
                    <span className="text-[10px] font-headline font-bold uppercase tracking-wider">Dataset</span>
                  </div>
                  <p className="text-sm font-bold">68,568 Images</p>
                  <p className="text-[10px] text-muted-foreground">23 Clinical Classes</p>
                </div>
                <div className="p-4 border rounded-xl bg-primary/10 border-primary/20">
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <Sparkles size={14} />
                    <span className="text-[10px] font-headline font-bold uppercase tracking-wider">Peak Accuracy</span>
                  </div>
                  <p className="text-xl font-bold text-primary">88.55%</p>
                  <p className="text-[10px] text-primary/80">Test Set Validation</p>
                </div>
              </div>
            </section>

            {/* System Architecture Flowchart */}
            <section className="bg-muted/10 p-6 rounded-2xl border border-primary/5">
              <h4 className="text-xs font-headline font-bold uppercase tracking-widest text-primary mb-8 text-center">Neural Pipeline Flowchart</h4>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-2xl mx-auto text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-2xl bg-card border flex items-center justify-center shadow-lg">
                    <Database size={24} className="text-primary" />
                  </div>
                  <span className="text-[10px] font-bold uppercase">Data Input</span>
                </div>
                <ArrowRight className="hidden md:block text-muted-foreground/30" />
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-2xl bg-card border flex items-center justify-center shadow-lg">
                    <Cpu size={24} className="text-primary" />
                  </div>
                  <span className="text-[10px] font-bold uppercase">Preprocessing</span>
                </div>
                <ArrowRight className="hidden md:block text-muted-foreground/30" />
                <div className="flex flex-col items-center gap-2">
                  <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary border-dashed flex items-center justify-center shadow-2xl animate-pulse-soft">
                    <Brain size={32} className="text-primary" />
                  </div>
                  <span className="text-[10px] font-bold uppercase text-primary">SE-CNN Engine</span>
                </div>
                <ArrowRight className="hidden md:block text-muted-foreground/30" />
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-2xl bg-card border flex items-center justify-center shadow-lg">
                    <BarChart3 size={24} className="text-primary" />
                  </div>
                  <span className="text-[10px] font-bold uppercase">Evaluation</span>
                </div>
              </div>
            </section>

            {/* Performance Bar Chart */}
            <section className="grid md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-xs font-headline font-bold uppercase tracking-widest text-primary mb-6">Performance Benchmark</h4>
                <div className="h-[250px] w-full">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 20 }}>
                        <XAxis type="number" hide domain={[0, 100]} />
                        <YAxis 
                          dataKey="model" 
                          type="category" 
                          axisLine={false} 
                          tickLine={false} 
                          width={100}
                          style={{ fontSize: '10px', fontWeight: 'bold' }}
                        />
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Bar dataKey="accuracy" radius={[0, 4, 4, 0]} barSize={24}>
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                <p className="text-[10px] text-muted-foreground mt-4 italic text-center">
                  * Benchmarked under identical conditions (Batch: 32, Epochs: 50, Learning Rate: 0.001)
                </p>
              </div>

              <div>
                <h4 className="text-xs font-headline font-bold uppercase tracking-widest text-primary mb-4">Research Overview</h4>
                <div className="text-sm leading-relaxed text-muted-foreground font-body space-y-4">
                  <p>
                    Built from scratch using <strong>TensorFlow/Keras</strong>, the architecture centers on a novel Convolutional Neural Network (CNN) enhanced with <strong>Squeeze-and-Excitation (SE) blocks</strong>.
                  </p>
                  <p>
                    These blocks perform dynamic channel-wise feature recalibration, essentially mimicking the selective focus of a dermatologist when analyzing clinical lesions.
                  </p>
                  <ul className="space-y-2 pt-2">
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">88.55%</span>
                      <span>Peak validation accuracy across 23 classes.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">~9% Gain</span>
                      <span>Improvement solely from attention recalibration.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">Deployable</span>
                      <span>Optimized 5M parameter count for edge devices.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Full Research Abstract Section */}
            <section className="border-t border-primary/10 pt-12">
              <h4 className="text-xs font-headline font-bold uppercase tracking-widest text-primary mb-6">Full Research Abstract</h4>
              <div className="p-8 rounded-2xl bg-muted/20 border border-primary/5 leading-relaxed font-body text-sm text-foreground/90 whitespace-pre-wrap shadow-inner">
                {projectDescription}
              </div>
            </section>

            {/* AI Dynamic Analysis */}
            <section className="pt-8 border-t border-primary/10">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-headline font-bold uppercase tracking-widest text-primary">Deep AI Technical Analysis</h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleGenerate} 
                  disabled={loading}
                  className="text-[10px] font-headline hover:text-primary"
                >
                  {loading ? <Loader2 className="h-3 w-3 animate-spin mr-2" /> : <Sparkles className="h-3 w-3 mr-2" />}
                  {insight ? "Re-analyze System" : "Generate Deep Analysis"}
                </Button>
              </div>
              
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4 text-muted-foreground">
                  <Loader2 className="h-10 w-10 animate-spin text-primary opacity-50" />
                  <p className="text-xs font-headline animate-pulse tracking-widest uppercase">Processing Neural Weights for Deep Insight...</p>
                </div>
              ) : insight ? (
                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 leading-relaxed font-body text-sm text-foreground/90 whitespace-pre-wrap italic">
                  {insight}
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-muted-foreground border border-dashed rounded-2xl">
                  Click the "Generate Deep Analysis" button above to run a comprehensive technical evaluation using the core ML engine.
                </div>
              )}
            </section>
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-primary/10 bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Info size={12} />
              <span className="text-[10px] italic">Verified Research Component · Md. Ariful Islam</span>
            </div>
            <p className="text-[9px] text-muted-foreground uppercase tracking-tighter">
              System: SynapticFolio v2.0 · Core ML Engine · {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};