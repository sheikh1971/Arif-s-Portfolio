"use client"

import React, { useState } from 'react';
import { generateProjectInsight } from '@/ai/flows/project-insight-generator';
import { Button } from './ui/button';
import { Sparkles, Loader2, Info, Brain, Layers, Cpu, Terminal } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from './ui/badge';

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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 text-xs font-headline border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all"
          onClick={() => { if (!insight) handleGenerate(); }}
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Technical Insight
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-card border-primary/20 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Brain size={120} className="text-primary" />
        </div>
        
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl font-headline font-bold">
            <div className="p-2 rounded-lg bg-primary/10">
              <Cpu className="h-6 w-6 text-primary" />
            </div>
            {projectName}
          </DialogTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            {projectTags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-[10px] uppercase font-headline tracking-widest bg-primary/5 text-primary border-primary/10">
                {tag}
              </Badge>
            ))}
          </div>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 border rounded-xl bg-muted/30">
              <div className="flex items-center gap-2 mb-1 text-primary">
                <Layers size={14} />
                <span className="text-[10px] font-headline font-bold uppercase tracking-wider">Architecture</span>
              </div>
              <p className="text-xs font-medium">SE-CNN Custom Pipeline</p>
            </div>
            <div className="p-3 border rounded-xl bg-muted/30">
              <div className="flex items-center gap-2 mb-1 text-primary">
                <Terminal size={14} />
                <span className="text-[10px] font-headline font-bold uppercase tracking-wider">Framework</span>
              </div>
              <p className="text-xs font-medium">TensorFlow / Keras</p>
            </div>
            <div className="p-3 border rounded-xl bg-primary/10 border-primary/20">
              <div className="flex items-center gap-2 mb-1 text-primary">
                <Sparkles size={14} />
                <span className="text-[10px] font-headline font-bold uppercase tracking-wider">Core Metric</span>
              </div>
              <p className="text-xs font-bold text-primary">88.55% Test Accuracy</p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 to-transparent rounded-full" />
            <h4 className="text-sm font-headline font-bold uppercase tracking-widest text-primary mb-3 pl-2">AI Technical Analysis</h4>
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4 text-muted-foreground">
                <Loader2 className="h-10 w-10 animate-spin text-primary opacity-50" />
                <p className="text-xs font-headline animate-pulse tracking-widest uppercase">Processing Neural Weights...</p>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-muted/20 border border-primary/10 leading-relaxed font-body text-sm text-foreground/90 whitespace-pre-wrap">
                {insight || "Generating analytical summary based on technical specifications..."}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-primary/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Info size={12} />
                <span className="text-[10px] italic">Verified Research Component</span>
              </div>
              <p className="text-[9px] text-muted-foreground uppercase tracking-tighter">
                System: SynapticFolio v2.0 · Genkit ML Engine
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};