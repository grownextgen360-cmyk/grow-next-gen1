
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ChevronRight, 
  ArrowUpRight, 
  MessageCircle,
  Mail,
  Calendar,
  Instagram,
  Twitter,
  Linkedin,
  Star,
  Check
} from 'lucide-react';
import { SERVICES, WHY_CHOOSE_US, PORTFOLIO, TESTIMONIALS, PRICING_PLANS } from './constants';
import { GoogleGenAI } from "@google/genai";

// Reusable Components
const SectionHeader = ({ title, subtitle, centered = false }: { title: string; subtitle?: string; centered?: boolean }) => (
  <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-4xl md:text-5xl font-montserrat font-bold mb-4 tracking-tight"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-slate-400 text-lg max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
    <div className={`mt-4 h-1 w-20 bg-[#ccff00] ${centered ? 'mx-auto' : ''}`} />
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-montserrat font-black tracking-tighter text-white flex items-center">
          GROW<span className="text-[#ccff00]">NEXT</span>GEN
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {['About', 'Services', 'Portfolio', 'Process', 'Pricing'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium hover:text-[#ccff00] transition-colors">{item}</a>
          ))}
          <a href="#contact" className="bg-[#ccff00] text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#b3e600] transition-colors">
            Let's Talk
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {['About', 'Services', 'Portfolio', 'Process', 'Pricing', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse('');
    try {
      // Create fresh instance before each call to ensure latest API key access
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Using systemInstruction for better task framing as per Gemini series best practices
      const res = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: query,
        config: {
          systemInstruction: 'You are an AI growth assistant for "Grow Next Gen" digital marketing agency. Answer the following client query professionally and persuasively. Keep it concise. Highlight our services: Performance Ads, SMM, Content, Funnels.',
        }
      });
      // res.text is a getter, so we access it directly
      setResponse(res.text || 'I am having trouble connecting right now, but our team would love to talk!');
    } catch (e) {
      setResponse('Please contact our human specialists at hello@grownextgen.com for immediate help.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-[#0f0f0f] border border-white/10 w-80 mb-4 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="bg-[#ccff00] p-4 text-black font-bold flex justify-between items-center">
              <span>Growth Assistant</span>
              <button onClick={() => setIsOpen(false)} aria-label="Close Chat"><X size={18} /></button>
            </div>
            <div className="p-4 h-64 overflow-y-auto text-sm space-y-3">
              <div className="bg-white/5 p-3 rounded-lg">Hello! How can I help you scale your business today?</div>
              {response && <div className="bg-[#ccff00]/10 border border-[#ccff00]/20 p-3 rounded-lg text-slate-200">{response}</div>}
              {loading && <div className="animate-pulse">Analyzing growth potential...</div>}
            </div>
            <div className="p-4 border-t border-white/10 flex space-x-2">
              <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about our ROI..."
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm flex-1 focus:outline-none focus:border-[#ccff00]"
                onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              />
              <button onClick={handleAsk} className="bg-[#ccff00] text-black p-2 rounded-lg hover:scale-105 transition-transform">
                <ArrowUpRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#ccff00] text-black w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all"
        aria-label="Toggle Growth Assistant"
      >
        <MessageCircle size={28} />
      </button>
    </div>
  );
};

const App = () => {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <ChatBot />

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-[#ccff00]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] px-4 py-1.5 rounded-full text-sm font-bold mb-6 tracking-wide">
              NEXT GEN MARKETING
            </div>
            <h1 className="text-6xl md:text-8xl font-montserrat font-black leading-[1.1] mb-8 tracking-tighter">
              SCALING <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#ccff00]">BRANDS</span> WITH DATA.
            </h1>
            <p className="text-xl text-slate-400 mb-10 max-w-lg leading-relaxed">
              We help high-ticket businesses and e-commerce brands explode their revenue using performance ads, precision content & conversion-optimized systems.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#portfolio" className="bg-[#ccff00] text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#b3e600] transition-all flex items-center gap-2 group shadow-lg shadow-[#ccff00]/10">
                View Portfolio <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className="glass-card text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
                Let's Talk
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="https://picsum.photos/seed/agency/800/1000" 
                alt="Grow Next Gen Team" 
                className="w-full grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            </div>
            {/* Floating Stats */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -bottom-6 -left-6 glass-card p-6 rounded-2xl border border-white/10"
            >
              <div className="text-3xl font-montserrat font-black text-[#ccff00]">250+</div>
              <div className="text-xs uppercase tracking-widest text-slate-400 font-bold">Campaigns Managed</div>
            </motion.div>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, delay: 1 }}
              className="absolute -top-6 -right-6 glass-card p-6 rounded-2xl border border-white/10"
            >
              <div className="text-3xl font-montserrat font-black text-[#ccff00]">97%</div>
              <div className="text-xs uppercase tracking-widest text-slate-400 font-bold">Client Retention</div>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-24 bg-black relative">
        <div className="container mx-auto px-6">
          <SectionHeader 
            title="Core Services" 
            subtitle="Premium solutions designed to take your brand from established to market-leading."
            centered
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-8 rounded-3xl border border-white/10 hover:border-[#ccff00]/40 transition-all group"
              >
                <div className="mb-6 p-4 bg-white/5 inline-block rounded-2xl group-hover:bg-[#ccff00]/10 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-montserrat font-bold mb-4 group-hover:text-[#ccff00] transition-colors">{service.title}</h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider font-black px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <SectionHeader title="Case Studies" subtitle="Tangible results for world-class brands." />
            </div>
            <a href="#" className="flex items-center gap-2 text-[#ccff00] font-bold text-lg hover:gap-4 transition-all mb-8">
              Explore All Work <ArrowUpRight />
            </a>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {PORTFOLIO.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative rounded-3xl overflow-hidden aspect-[4/5] mb-6">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-xs uppercase tracking-[0.2em] font-black text-[#ccff00] mb-2">{item.category}</div>
                    <h4 className="text-2xl font-montserrat font-bold text-white">{item.title}</h4>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {item.results.map(res => (
                    <div key={res.label} className="glass-card p-4 rounded-2xl">
                      <div className="text-xs text-slate-400 uppercase tracking-wider mb-1 font-bold">{res.label}</div>
                      <div className="text-2xl font-montserrat font-black text-white flex items-center gap-2">
                        {res.value}
                        {res.trend === 'up' && <ArrowUpRight size={16} className="text-[#ccff00]" />}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <SectionHeader title="Why Choose Us" subtitle="We build infrastructures that scale with your ambition." centered />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div key={idx} className="flex gap-6 p-6 rounded-3xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 group">
                <div className="text-[#ccff00] mt-1 group-hover:scale-110 transition-transform">{item.icon}</div>
                <div>
                  <h4 className="text-xl font-montserrat font-bold mb-2">{item.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 bg-zinc-950">
        <div className="container mx-auto px-6">
          <SectionHeader title="Our Growth Process" centered />
          <div className="max-w-4xl mx-auto space-y-12">
            {[
              { step: '01', title: 'Audit & Research', desc: 'We dive deep into your current funnels, ad accounts, and competitor landscape to find hidden opportunities.' },
              { step: '02', title: 'Strategy Planning', desc: 'Custom roadmaps designed for your specific KPIs. No cookie-cutter templates.' },
              { step: '03', title: 'Creative Production', desc: 'Our in-house team produces high-converting assets (reels, copy, static ads) built to convert.' },
              { step: '04', title: 'Campaign Launch', desc: 'Precision setup of tracking and multi-channel launch with aggressive testing phases.' },
              { step: '05', title: 'Optimization & Scaling', desc: 'We kill the losers and double down on the winners. Relentless scaling of profitable segments.' }
            ].map((p, i) => (
              <motion.div 
                key={p.step}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex flex-col md:flex-row items-center gap-8 glass-card p-10 rounded-3xl border border-white/10"
              >
                <div className="text-6xl font-montserrat font-black text-[#ccff00] opacity-20">{p.step}</div>
                <div>
                  <h4 className="text-2xl font-montserrat font-bold mb-3">{p.title}</h4>
                  <p className="text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <SectionHeader title="Transparent Packages" subtitle="Simple, results-based pricing for different growth stages." centered />
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PRICING_PLANS.map((plan, idx) => (
              <motion.div 
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className={`relative p-8 rounded-3xl border ${plan.recommended ? 'border-[#ccff00] bg-[#ccff00]/5' : 'border-white/10 bg-white/5'} flex flex-col`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ccff00] text-black text-[10px] font-black uppercase px-4 py-1.5 rounded-full tracking-widest">Most Popular</div>
                )}
                <h4 className="text-2xl font-montserrat font-bold mb-2">{plan.name}</h4>
                <div className="text-4xl font-montserrat font-black mb-4">{plan.price} <span className="text-sm font-medium text-slate-500">/mo</span></div>
                <p className="text-slate-400 text-sm mb-8">{plan.description}</p>
                <div className="space-y-4 mb-10 flex-1">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-start gap-3 text-sm text-slate-300">
                      <Check size={16} className="text-[#ccff00] mt-0.5" />
                      {f}
                    </div>
                  ))}
                </div>
                <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.recommended ? 'bg-[#ccff00] text-black hover:bg-[#b3e600]' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                  Select {plan.name}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-6">
          <SectionHeader title="What Our Clients Say" centered />
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="glass-card p-10 rounded-3xl border border-white/10">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-[#ccff00] text-[#ccff00]" />)}
                </div>
                <p className="text-lg italic text-slate-200 mb-8 leading-relaxed">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full border-2 border-[#ccff00]/20" />
                  <div>
                    <div className="font-bold font-montserrat">{t.name}</div>
                    <div className="text-sm text-slate-400">{t.role}, {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-black relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#ccff00]/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHeader title="Ready to Scale?" subtitle="Book a free strategy call or send us a message to see if we're a fit." />
              <div className="space-y-8 mt-12">
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[#ccff00] transition-colors group-hover:text-black">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 uppercase font-bold tracking-widest mb-1">Email Us</div>
                    <div className="text-xl font-bold">hello@grownextgen.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[#ccff00] transition-colors group-hover:text-black">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 uppercase font-bold tracking-widest mb-1">WhatsApp</div>
                    <div className="text-xl font-bold">+1 (555) 987-0000</div>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[#ccff00] transition-colors group-hover:text-black">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 uppercase font-bold tracking-widest mb-1">Book a Call</div>
                    <div className="text-xl font-bold text-[#ccff00] underline cursor-pointer">View Calendly</div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="glass-card p-10 rounded-[40px] border border-white/10"
            >
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-black text-slate-400">Name</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-[#ccff00] transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-black text-slate-400">Email</label>
                    <input type="email" placeholder="john@company.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-[#ccff00] transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-black text-slate-400">Current Monthly Revenue</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-[#ccff00] transition-colors">
                    <option>$0 - $10k</option>
                    <option>$10k - $50k</option>
                    <option>$50k - $250k</option>
                    <option>$250k+</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-black text-slate-400">Message</label>
                  <textarea rows={4} placeholder="How can we help you grow?" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-[#ccff00] transition-colors"></textarea>
                </div>
                <button type="submit" className="w-full bg-[#ccff00] text-black py-5 rounded-xl font-black text-lg hover:bg-[#b3e600] transition-all flex items-center justify-center gap-3">
                  Send Message <ArrowUpRight />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="text-3xl font-montserrat font-black tracking-tighter">
              GROW<span className="text-[#ccff00]">NEXT</span>GEN
            </div>
            <div className="flex gap-8 text-sm font-bold text-slate-500">
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#services" className="hover:text-white transition-colors">Services</a>
              <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
              <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#ccff00] hover:text-black transition-all cursor-pointer" aria-label="Instagram"><Instagram size={20} /></div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#ccff00] hover:text-black transition-all cursor-pointer" aria-label="Twitter"><Twitter size={20} /></div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#ccff00] hover:text-black transition-all cursor-pointer" aria-label="LinkedIn"><Linkedin size={20} /></div>
            </div>
          </div>
          <div className="text-center text-slate-600 text-xs">
            © {new Date().getFullYear()} Grow Next Gen Digital Marketing. All rights reserved. Designed for scale.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;