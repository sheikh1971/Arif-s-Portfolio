
import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { Contact } from '@/components/sections/Contact';
import { Terminal } from '@/components/sections/Terminal';
import { EDUCATION, IMPACT } from '@/lib/portfolio-data';
import { GraduationCap, Heart } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      <Hero />
      
      <div className="space-y-4 md:space-y-8">
        <About />
        <Projects />
        <Terminal />
        <Experience />
        <Skills />

        {/* Education & Impact - Combined Section */}
        <section id="impact" className="py-24 bg-muted/5">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-20">
            {/* Education */}
            <div className="animate-reveal">
              <h2 className="text-2xl md:text-3xl font-headline font-bold mb-10 flex items-center gap-3">
                <GraduationCap className="text-primary" /> Education
              </h2>
              <div className="space-y-6">
                {EDUCATION.map((edu, i) => (
                  <div key={i} className="p-6 md:p-8 border rounded-[2rem] bg-card/40 backdrop-blur-sm hover:border-primary/30 transition-all">
                    <h3 className="font-headline font-bold text-lg leading-tight">{edu.degree}</h3>
                    <p className="text-primary font-medium text-sm mt-1">{edu.school}</p>
                    <p className="text-xs text-muted-foreground mt-2">{edu.period}</p>
                    <div className="mt-6 pt-6 border-t border-border/40">
                      <p className="text-[10px] font-headline uppercase tracking-widest text-muted-foreground mb-2">Focus Areas</p>
                      <p className="text-sm text-foreground/80 leading-relaxed">{edu.focus}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Impact */}
            <div className="animate-reveal [animation-delay:0.2s]">
              <h2 className="text-2xl md:text-3xl font-headline font-bold mb-10 flex items-center gap-3">
                <Heart className="text-red-400" /> Social Impact
              </h2>
              <div className="space-y-6">
                {IMPACT.map((imp, i) => (
                  <div key={i} className="p-6 md:p-8 border rounded-[2rem] bg-card/40 backdrop-blur-sm hover:border-primary/30 transition-all">
                    <h3 className="font-headline font-bold text-lg">{imp.organization}</h3>
                    <p className="text-primary font-medium mb-6 text-sm">{imp.role}</p>
                    <ul className="space-y-4">
                      {imp.achievements.map((a, j) => (
                        <li key={j} className="text-sm text-muted-foreground flex items-start gap-3 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" /> {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Contact />
      </div>

      <footer className="py-12 border-t border-border/40 text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-headline font-bold uppercase tracking-widest text-muted-foreground">
            © {new Date().getFullYear()} SynapticFolio. Crafted by Md. Ariful Islam.
          </p>
          <div className="flex gap-8">
            <a href="#about" className="text-[10px] font-headline font-bold uppercase tracking-widest hover:text-primary transition-colors">About</a>
            <a href="#projects" className="text-[10px] font-headline font-bold uppercase tracking-widest hover:text-primary transition-colors">Projects</a>
            <a href="#contact" className="text-[10px] font-headline font-bold uppercase tracking-widest hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
