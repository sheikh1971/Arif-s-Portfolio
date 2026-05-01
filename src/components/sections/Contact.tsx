
"use client"

import React, { useState } from 'react';
import { PERSONAL_INFO } from '@/lib/portfolio-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, Phone, Send } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    window.location.href = mailtoLink;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <section id="contact" className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="animate-reveal">
            <h2 className="text-4xl lg:text-5xl font-headline font-bold mb-8">Let's build something intelligent.</h2>
            <p className="text-lg text-muted-foreground mb-12">
              Interested in collaborating on AI/ML systems or have a project in mind? Reach out and let's create real-world impact together.
            </p>
            
            <div className="space-y-6">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  < Mail className="text-primary h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-headline uppercase tracking-widest text-muted-foreground">Email</p>
                  <p className="font-medium">{PERSONAL_INFO.email}</p>
                </div>
              </a>
              <a href={`tel:${PERSONAL_INFO.phone}`} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="text-primary h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-headline uppercase tracking-widest text-muted-foreground">Phone</p>
                  <p className="font-medium">{PERSONAL_INFO.phone}</p>
                </div>
              </a>
              <div className="flex gap-4 pt-6">
                <Button variant="outline" size="icon" className="rounded-xl" asChild>
                  <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" className="rounded-xl" asChild>
                  <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="animate-reveal [animation-delay:0.2s]">
            <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-headline uppercase tracking-widest text-muted-foreground pl-1">Name</label>
                  <Input 
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe" 
                    className="bg-background/50" 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-headline uppercase tracking-widest text-muted-foreground pl-1">Email</label>
                  <Input 
                    id="email"
                    type="email" 
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com" 
                    className="bg-background/50" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-headline uppercase tracking-widest text-muted-foreground pl-1">Subject</label>
                <Input 
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry" 
                  className="bg-background/50" 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-headline uppercase tracking-widest text-muted-foreground pl-1">Message</label>
                <Textarea 
                  id="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can I help you?" 
                  className="min-h-[150px] bg-background/50" 
                />
              </div>
              <Button type="submit" size="lg" className="w-full rounded-xl gap-2 font-headline">
                <Send className="h-4 w-4" /> Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
