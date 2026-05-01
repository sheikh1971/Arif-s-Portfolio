import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { Contact } from '@/components/sections/Contact';
import { EDUCATION, IMPACT } from '@/lib/portfolio-data';
import { GraduationCap, Heart } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />

      {/* Education & Impact - Combined Section */}
      <section id="impact" className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          {/* Education */}
          <div className="animate-reveal">
            <h2 className="text-2xl font-headline font-bold mb-8 flex items-center gap-3">
              <GraduationCap className="text-primary" /> Education
            </h2>
            {EDUCATION.map((edu, i) => (
              <div key={i} className="p-6 border rounded-2xl bg-card/50">
                <h3 className="font-headline font-bold text-lg">{edu.degree}</h3>
                <p className="text-primary font-medium">{edu.school}</p>
                <p className="text-sm text-muted-foreground mb-4">{edu.period}</p>
                <div className="pt-4 border-t">
                  <p className="text-xs font-headline uppercase tracking-widest text-muted-foreground mb-2">Focus Areas</p>
                  <p className="text-sm">{edu.focus}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Social Impact */}
          <div className="animate-reveal [animation-delay:0.2s]">
            <h2 className="text-2xl font-headline font-bold mb-8 flex items-center gap-3">
              <Heart className="text-red-400" /> Social Impact
            </h2>
            {IMPACT.map((imp, i) => (
              <div key={i} className="p-6 border rounded-2xl bg-card/50">
                <h3 className="font-headline font-bold text-lg">{imp.organization}</h3>
                <p className="text-primary font-medium mb-4">{imp.role}</p>
                <ul className="space-y-2">
                  {imp.achievements.map((a, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1 shrink-0">•</span> {a}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact />

      <footer className="py-12 border-t text-center text-sm text-muted-foreground">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p>© {new Date().getFullYear()} SynapticFolio. Created by Md. Ariful Islam.</p>
          <div className="flex gap-6">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
