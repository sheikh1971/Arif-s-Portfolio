"use client"

import React, { useState } from 'react';
import { PERSONAL_INFO } from '@/lib/portfolio-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, Phone, Send, Sparkles } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const mailtoLink = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-headline font-bold uppercase tracking-[0.3em] mb-8">
              <Sparkles size={12} /> Get In Touch
            </div>
            <h2 className="text-4xl lg:text-6xl font-headline font-bold mb-8 leading-tight">
              Let's build something <span className="gradient-text">intelligent.</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 font-light leading-relaxed max-w-md">
              Interested in collaborating on AI/ML systems or have a project in mind? Reach out and let's create real-world impact together.
            </p>
            
            <div className="space-y-8">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-500 border border-primary/10 group-hover:scale-110">
                  <Mail className="text-primary h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-headline uppercase tracking-[0.2em] text-muted-foreground mb-1">Email</p>
                  <p className="font-medium text-lg group-hover:text-primary transition-colors">{PERSONAL_INFO.email}</p>
                </div>
              </a>
              <a href={`tel:${PERSONAL_INFO.phone}`} className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-all duration-500 border border-secondary/10 group-hover:scale-110">
                  <Phone className="text-secondary h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-headline uppercase tracking-[0.2em] text-muted-foreground mb-1">Phone</p>
                  <p className="font-medium text-lg group-hover:text-secondary transition-colors">{PERSONAL_INFO.phone}</p>
                </div>
              </a>
              <div className="flex gap-4 pt-8 border-t border-border/50 max-w-xs">
                <Button variant="outline" size="icon" className="rounded-2xl w-12 h-12 border-primary/20 hover:bg-primary/5 group" asChild>
                  <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5 group-hover:text-primary transition-colors" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" className="rounded-2xl w-12 h-12 border-primary/20 hover:bg-primary/5 group" asChild>
                  <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5 group-hover:text-primary transition-colors" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="reveal [transition-delay:0.2s]">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <form onSubmit={handleSubmit} className="relative glass p-10 rounded-[2.5rem] space-y-6 border-white/5 shadow-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[10px] font-headline font-bold uppercase tracking-[0.2em] text-muted-foreground pl-1">Name</label>
                    <Input 
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Md. Ariful Islam" 
                      className="bg-background/40 border-primary/10 focus:border-primary/50 h-12 rounded-xl transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[10px] font-headline font-bold uppercase tracking-[0.2em] text-muted-foreground pl-1">Email</label>
                    <Input 
                      id="email"
                      type="email" 
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="islam@example.com" 
                      className="bg-background/40 border-primary/10 focus:border-primary/50 h-12 rounded-xl transition-all" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-[10px] font-headline font-bold uppercase tracking-[0.2em] text-muted-foreground pl-1">Subject</label>
                  <Input 
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="ML Project Collaboration" 
                    className="bg-background/40 border-primary/10 focus:border-primary/50 h-12 rounded-xl transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-[10px] font-headline font-bold uppercase tracking-[0.2em] text-muted-foreground pl-1">Message</label>
                  <Textarea 
                    id="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your vision or inquiry..." 
                    className="min-h-[160px] bg-background/40 border-primary/10 focus:border-primary/50 rounded-2xl resize-none transition-all" 
                  />
                </div>
                <Button type="submit" size="lg" className="w-full rounded-2xl gap-3 font-headline font-bold uppercase tracking-widest text-xs h-14 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-500 group">
                  <Send className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
                  Execute Neural Handshake
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};