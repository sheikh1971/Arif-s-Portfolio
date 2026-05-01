"use client"

import React, { useState, useEffect, useRef } from 'react';
import { PERSONAL_INFO, SKILLS } from '@/lib/portfolio-data';
import { Terminal as TerminalIcon, Shield, Cpu, Github, User, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Command {
  cmd: string;
  output: React.ReactNode;
}

export const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([
    { cmd: 'whoami', output: `Identity verified: ${PERSONAL_INFO.name}. Applied AI & ML Engineer.` },
    { cmd: 'status', output: `Systems Nominal. GitHub integration active: GH/${PERSONAL_INFO.github.split('/').pop()?.toUpperCase()}.` }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.toLowerCase().trim();
    if (!cmd) return;

    let output: React.ReactNode = '';

    switch (cmd) {
      case 'help':
        output = (
          <div className="grid grid-cols-2 gap-2 text-[10px] mt-2">
            <span className="text-primary">whoami</span><span>Display current user identity</span>
            <span className="text-primary">github</span><span>Check GitHub status</span>
            <span className="text-primary">skills</span><span>List core neural stack</span>
            <span className="text-primary">pwd</span><span>Print working directory</span>
            <span className="text-primary">ls</span><span>List technical assets</span>
            <span className="text-primary">contact</span><span>Display secure handshake channels</span>
            <span className="text-primary">clear</span><span>Clear session history</span>
          </div>
        );
        break;
      case 'whoami':
        output = PERSONAL_INFO.subtext;
        break;
      case 'github':
        output = (
          <div className="flex items-center gap-2 text-green-400">
            <Github size={12} />
            <span>Connection Established: {PERSONAL_INFO.github}</span>
          </div>
        );
        break;
      case 'skills':
        output = SKILLS.map(s => s.category).join(', ');
        break;
      case 'pwd':
        output = "/home/synaptic/portfolio/core_research";
        break;
      case 'ls':
        output = "projects/ clinical_cv/ ml_ops/ architecture/ social_impact/";
        break;
      case 'contact':
        output = `EMAIL: ${PERSONAL_INFO.email} | PHONE: ${PERSONAL_INFO.phone}`;
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        output = `Command not recognized: '${cmd}'. Type 'help' for available protocol commands.`;
    }

    setHistory(prev => [...prev, { cmd: input, output }]);
    setInput('');
  };

  return (
    <section id="terminal" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-headline font-bold uppercase tracking-[0.3em] mb-4">
            <TerminalIcon size={12} /> Interactive Shell
          </div>
          <h2 className="text-3xl font-headline font-bold">Neural Command Line</h2>
          <p className="text-muted-foreground text-sm mt-2 font-light">Interact with the synaptic infrastructure via standard terminal protocols.</p>
        </div>

        <div className="relative group reveal [transition-delay:0.2s]">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-[#0d1117] border border-white/5 rounded-2xl shadow-2xl overflow-hidden font-mono text-xs">
            {/* Terminal Header */}
            <div className="bg-[#161b22] px-4 py-2 border-b border-white/5 flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex items-center gap-2 text-muted-foreground/60 text-[9px] uppercase tracking-widest font-bold">
                <Shield size={10} /> secure_session.bash
              </div>
            </div>

            {/* Terminal Content */}
            <div 
              ref={scrollRef}
              className="p-6 h-[320px] overflow-y-auto scrollbar-hide space-y-4 text-foreground/90 leading-relaxed"
            >
              <div className="text-primary/60 text-[10px] mb-4">
                Welcome to SynapticOS v6.0.1 LTS (GNU/Linux 5.15.0-generic)<br />
                * Documentation: https://github.com/sheikh1971<br />
                * Status: All nodes operational.
              </div>

              {history.map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400 font-bold">guest@synaptic:~$</span>
                    <span>{item.cmd}</span>
                  </div>
                  <div className="text-muted-foreground/80 pl-4 border-l border-white/5 italic">
                    {item.output}
                  </div>
                </div>
              ))}

              <form onSubmit={handleCommand} className="flex items-center gap-2">
                <span className="text-green-400 font-bold">guest@synaptic:~$</span>
                <input 
                  type="text" 
                  autoFocus
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="bg-transparent border-none outline-none flex-1 text-foreground"
                  placeholder="type 'help'..."
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
