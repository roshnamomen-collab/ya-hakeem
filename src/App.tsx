import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ArrowUp, 
  Search, 
  FileText, 
  Stethoscope, 
  BookOpen, 
  Activity, 
  ShieldCheck,
  Heart,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';

// --- Types & Constants ---

type Language = 'ku' | 'en';

const NAV_LINKS = [
  { id: 'directory', en: '01 Directory', ku: '٠١ ڕێبەر' },
  { id: 'knowledge', en: '02 Knowledge', ku: '٠٢ زانیاری' },
  { id: 'advocacy', en: '03 Advocacy', ku: '٠٣ داکۆکی' },
  { id: 'education', en: '04 Education', ku: '٠٤ پەروەردە' },
  { id: 'ehr', en: '05 EHR', ku: '٠٥ EHR' },
  { id: 'hikmat', en: '06 Hikmat', ku: '٠٦ الحكمة', gold: true }
];

const PILLARS_CONTENT = [
  { 
    id: 'directory',
    icon: <Search size={28} />, 
    en: 'Doctor Directory',
    ku: 'ڕێبەری پزیشکان',
    en_desc: 'A merit-based directory ranking doctors by quality and verified education, not marketing budget.',
    ku_desc: 'ڕێبەرێکی زیندووی سەرانسەری کوردستان کە پزیشکان بەپێی لێهاتوویی و متمانە ڕیزبەند دەکات.'
  },
  { 
    id: 'knowledge',
    icon: <BookOpen size={28} />, 
    en: 'Health Knowledge',
    ku: 'زانیاری تەندروستی',
    en_desc: 'Curated, evidence-based medical articles translated and localized for the Kurdish context.',
    ku_desc: 'بنکەی زانیاری تەندروستی متمانەپێکراو کە بە زمانی کوردی و بۆ پزیشک و نەخۆش ئامادەکراوە.'
  },
  { 
    id: 'advocacy',
    icon: <ShieldCheck size={28} />, 
    en: 'Advocacy Portal',
    ku: 'پۆرتاڵی داکۆکیکاری',
    en_desc: 'Empowering patients to understand their rights and providing a platform for medical accountability.',
    ku_desc: 'پۆرتاڵێک بۆ هۆشیارکردنەوەی نەخۆش لە مافەکانی و داکۆکیکردن لە شکۆ و لێپرسینەوەی پزیشکی.'
  },
  { 
    id: 'education',
    icon: <Activity size={28} />, 
    en: 'Patient Education',
    ku: 'پەروەردەی نەخۆش',
    en_desc: 'Visual guides and short explainers to help patients stick to their treatment plans with confidence.',
    ku_desc: 'کەناڵێکی فێرکاری کە ئاڵۆزییە پزیشکییەکان دەگۆڕێت بۆ ڕێنمایی سادە و بینراو بۆ نەخۆش.'
  },
  { 
    id: 'ehr',
    icon: <FileText size={28} />, 
    en: 'Stream EHR',
    ku: 'تۆماری ئەلیکترۆنی',
    en_desc: 'A frictionless electronic health record system designed specifically for the way doctors think.',
    ku_desc: 'تۆماری پزیشکی ئەلیکترۆنی (EHR) کە لەگەڵ شێوازی کارکردنی پزیشکاندا دەگونجێت.'
  },
  { 
    id: 'hikmat',
    icon: <Heart size={28} className="text-amber-500" />, 
    en: 'Meaning of Healing',
    ku: 'مانای چاکبوونەوە',
    en_desc: 'Exploring the spiritual dimension of health through the lens of Risale-i Nur and true wisdom.',
    ku_desc: 'گەڕان بەدوای مانا ڕۆحییەکانی تەندروستی و چاکبوونەوە لە ڕێگەی حیکمەتی ڕاستەقینەوە.',
    gold: true
  }
];

// --- Shared Components ---

const ScrollReveal = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number, key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const Navbar = ({ lang, setLang, isDark, toggleTheme }: { lang: Language, setLang: (l: Language) => void, isDark: boolean, toggleTheme: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isRtl = lang === 'ku';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[60] h-16 border-b transition-all duration-300 backdrop-blur-md
        ${isDark ? 'bg-[#0a0a0a]/80 border-white/10' : 'bg-white/80 border-black/5 shadow-sm'}`}>
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6 md:px-12">
          
          {/* Logo */}
          <a href="#" className={`text-xl font-bold text-teal transition-transform hover:scale-105 active:scale-95 ${isRtl ? 'font-ku' : 'font-playfair'}`}>
            {isRtl ? 'يا حەکیم' : 'Ya Hakeem'}
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-all
                  ${isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-teal hover:bg-teal/5'}`}
              >
                {isRtl ? link.ku : link.en}
              </a>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
             {/* Lang Toggle */}
             <div className={`p-1 rounded-full border hidden sm:flex ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                <button onClick={() => setLang('ku')} className={`text-[10px] font-bold px-3 py-1.5 rounded-full transition-all ${isRtl ? 'bg-teal text-white shadow-md' : 'text-gray-500 hover:text-teal'}`}>کوردی</button>
                <button onClick={() => setLang('en')} className={`text-[10px] font-bold px-3 py-1.5 rounded-full transition-all ${!isRtl ? 'bg-teal text-white shadow-md' : 'text-gray-500 hover:text-teal'}`}>EN</button>
             </div>

             {/* Theme Toggle */}
             <button 
              onClick={toggleTheme}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-90
                ${isDark ? 'bg-white/5 text-teal border border-white/10' : 'bg-black/5 text-teal border border-black/10'}`}
             >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
             </button>

             {/* Hamburger */}
             <button 
              onClick={() => setIsOpen(true)}
              className={`lg:hidden w-9 h-9 rounded-full flex items-center justify-center transition-all
                ${isDark ? 'bg-white/5 text-gray-400' : 'bg-black/5 text-gray-600'}`}
             >
                <Menu size={20} />
             </button>

             {/* Call to Action */}
             <a 
              href="https://rzgartmi.github.io/ya-hakeem" 
              target="_blank"
              className="hidden md:flex bg-teal text-white text-[11px] font-bold px-6 py-2.5 rounded-full shadow-lg shadow-teal/20 hover:scale-[1.02] active:scale-95 transition-all"
             >
               {isRtl ? 'ئەپەکە بکەوە' : 'Open App'}
             </a>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 z-[70] backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: isRtl ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 bottom-0 w-80 bg-white dark:bg-[#0a0a0a] z-[80] p-10 flex flex-col shadow-2xl
                ${isRtl ? 'left-0 border-r border-teal/20' : 'right-0 border-l border-teal/20'}`}
            >
              <div className={`flex items-center justify-between mb-12 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`text-2xl font-bold text-teal ${isRtl ? 'font-ku' : 'font-playfair'}`}>
                  {isRtl ? 'یا حەکیم' : 'Ya Hakeem'}
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <X size={24} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <div className={`text-[10px] font-bold text-teal tracking-[0.2em] uppercase opacity-50 mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                  {isRtl ? '٦ کۆڵەکەکە' : 'The 6 Pillars'}
                </div>
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`py-4 px-6 rounded-2xl text-lg font-bold transition-all flex items-center justify-between
                      ${isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-teal hover:bg-teal/5'}`}
                  >
                    <span>{isRtl ? link.ku : link.en}</span>
                    {isRtl ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                  </a>
                ))}
              </div>

              <div className="mt-auto pt-10 space-y-4">
                <a 
                  href="https://rzgartmi.github.io/ya-hakeem" 
                  target="_blank"
                  className="flex items-center justify-center w-full bg-teal text-white py-4 rounded-2xl font-bold text-base shadow-xl shadow-teal/20"
                >
                  {isRtl ? 'ئەپەکە بکەوە' : 'Open App'}
                </a>
                
                <div className={`flex p-1 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                  <button onClick={() => setLang('ku')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${isRtl ? 'bg-teal text-white' : 'text-gray-500'}`}>کوردی</button>
                  <button onClick={() => setLang('en')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${!isRtl ? 'bg-teal text-white' : 'text-gray-500'}`}>English</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// --- Main Application ---

export default function App() {
  const [lang, setLang] = useState<Language>('ku');
  const [isDark, setIsDark] = useState(true);
  const [showTop, setShowTop] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ku' ? 'rtl' : 'ltr';
  }, [lang]);

  useEffect(() => {
    const checkScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const t = (ku: string, en: string) => (lang === 'ku' ? ku : en);
  const isRtl = lang === 'ku';

  return (
    <div className={`min-h-screen transition-colors duration-500 antialiased
      ${isDark ? 'bg-[#0a0a0a] text-white' : 'bg-white text-zinc-900'}
      ${isRtl ? 'font-ku' : 'font-en'}`}>
      
      {/* Progress Bar */}
      <motion.div 
        className={`fixed top-0 left-0 right-0 h-1 bg-teal z-[100] shadow-[0_0_10px_rgba(13,124,112,0.5)] ${isRtl ? 'origin-right' : 'origin-left'}`} 
        style={{ scaleX }} 
      />

      <Navbar lang={lang} setLang={setLang} isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />

      {/* Back to Top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`fixed bottom-8 z-50 p-4 rounded-full bg-teal text-white shadow-2xl transition-all hover:-translate-y-2 active:scale-95
              ${isRtl ? 'left-8' : 'right-8'}`}
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
           <div className={`absolute top-0 w-full h-full opacity-40 blur-[120px] transition-all duration-1000
              ${isDark 
                ? 'bg-[radial-gradient(circle_at_50%_0%,#0D7C70,transparent_60%)]' 
                : 'bg-[radial-gradient(circle_at_50%_0%,rgba(13,124,112,0.1),transparent_60%)]'}`} 
           />
           <div className={`absolute bottom-0 w-full h-1/2 opacity-20 blur-[100px] transition-all duration-1000
              ${isDark ? 'bg-amber-900/20' : 'bg-amber-100/30'}`} 
           />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <ScrollReveal className="mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal/10 text-teal text-[10px] uppercase font-bold tracking-[0.2em] border border-teal/20">
               {t('پڕۆژەی یا حەکیم بۆ هەرێمی کوردستان', 'Ya Hakeem Project · Kurdistan Region')}
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="mb-6">
            <h1 className={`text-7xl md:text-9xl font-black mb-4 leading-none tracking-tight
               ${isRtl ? 'font-ku' : 'font-playfair'}
               ${isDark ? 'text-white' : 'text-[#0a0a0a]'}`}>
              {t('يا حكيم', 'Ya Hakeem')}
            </h1>
            <p className="text-teal/60 text-lg md:text-xl font-bold tracking-[0.4em] uppercase">
              The Divine Witness
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4} className="max-w-2xl mx-auto mt-10">
             <p className={`text-lg md:text-xl font-light leading-relaxed mb-10
                ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
               {t(
                 'سیستەمێکی لێپرسینەوە و داکۆکیکاری پزیشکی مۆدێرن — بونیاد نراوە بۆ بەخشینی لێپرسینەوە بە پزیشک، شکۆ بۆ نەخۆش، و ڕێگایەک بۆ چاکبوونەوەی ڕاستەقینە.',
                 'A modern medical accountability and advocacy ecosystem — built to restore dignity to patients, discipline to medicine, and a path to holistic healing.'
               )}
             </p>
          </ScrollReveal>

          <ScrollReveal delay={0.6} className="flex flex-col items-center gap-6">
             <a 
              href="https://rzgartmi.github.io/ya-hakeem" 
              target="_blank"
              className="px-14 py-5 bg-teal text-white rounded-2xl font-bold text-xl shadow-2xl shadow-teal/30 hover:scale-105 active:scale-95 transition-all"
             >
               {t('ئەپەکە بکەوە', 'Open App')}
             </a>
             <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest opacity-40">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                {t('وەشانی ئەزموونی - ٢٠٢٤', 'Live Beta - 2024')}
             </div>
          </ScrollReveal>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 hidden md:block"
        >
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-current rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* --- THE MISSION --- */}
      <section className={`py-32 px-6 ${isDark ? 'bg-zinc-900/40' : 'bg-zinc-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-0.5 bg-amber-500" />
                <span className="text-amber-500 text-xs font-bold uppercase tracking-widest">{t('پەیامەکەمان', 'Our Mission')}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                {t(
                  'شکاندنی بێدەنگی پزیشکی و گۆڕینی سیستەمەکە لە بەرژەوەندی مرۆڤ.',
                  'Breaking the medical silence and re-engineering the system for human dignity.'
                )}
              </h2>
              <div className={`space-y-6 text-lg font-light leading-loose ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                <p>
                  {t(
                    'لە کوردستان، زانیاری پزیشکی پەرش و بڵاوە، لێپرسینەوە کەمە، و نەخۆشەکان لە ژاوەژاوی مارکێتینگدا ون بوون. یا حەکیم لێرەیە بۆ گۆڕینی ئەوە.',
                    'In the Kurdistan Region, medical information is fragmented, accountability is minimal, and patients are lost in the marketing noise. Ya Hakeem is here to change that.'
                  )}
                </p>
                <div className="grid grid-cols-2 gap-8 pt-8">
                  <div className="p-6 rounded-2xl bg-teal/5 border border-teal/10">
                    <div className="text-3xl font-black text-teal mb-1">98%</div>
                    <div className="text-[10px] uppercase font-bold opacity-50 tracking-widest">{t('بێ هیوابوونی نەخۆش', 'Patient Frustration')}</div>
                  </div>
                  <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10">
                    <div className="text-3xl font-black text-amber-500 mb-1">0%</div>
                    <div className="text-[10px] uppercase font-bold opacity-50 tracking-widest">{t('لێپرسینەوەی شەفاف', 'Transparent Audits')}</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3} className="relative">
              <div className="aspect-square bg-gradient-to-br from-teal/20 to-amber-500/10 rounded-[64px] border border-white/10 relative overflow-hidden flex items-center justify-center group">
                 <div className="absolute inset-0 bg-teal/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                 <Stethoscope size={160} strokeWidth={1} className="text-teal/40 group-hover:scale-110 transition-transform duration-700" />
                 
                 {/* Floating UI Elements */}
                 <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="absolute top-10 right-10 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl"
                 >
                    <div className="flex gap-2 mb-2">
                       {[1,2,3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-teal" />)}
                    </div>
                    <div className="w-32 h-2 bg-white/20 rounded-full mb-2" />
                    <div className="w-20 h-2 bg-white/10 rounded-full" />
                 </motion.div>

                 <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="absolute bottom-10 left-10 bg-teal text-white p-6 rounded-3xl shadow-teal/40 shadow-2xl"
                 >
                    <ShieldCheck size={32} />
                 </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* --- THE 6 PILLARS --- */}
      <section id="directory" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <ScrollReveal>
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                {t('٦ کۆڵەکەی یا حەکیم', 'The 6 Pillars of Ya Hakeem')}
              </h2>
              <p className={`max-w-2xl mx-auto text-lg font-light ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {t(
                  'ستراتیژییەتێکی گشتگیر بۆ چارەسەرکردنی قەیرانی تەندروستی لە هەرێمی کوردستان.',
                  'A comprehensive strategy to address the healthcare crisis in the Kurdistan Region.'
                )}
              </p>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PILLARS_CONTENT.map((pillar, i) => (
              <ScrollReveal 
                key={pillar.id} 
                delay={i * 0.1}
                className={`group p-10 rounded-[48px] border transition-all hover:-translate-y-2
                  ${isDark ? 'bg-zinc-900 border-white/5 hover:border-teal/30 hover:bg-zinc-800' : 'bg-zinc-50 border-black/5 hover:border-teal/30 hover:bg-white hover:shadow-2xl'}
                  ${pillar.gold ? 'border-amber-500/20 bg-amber-500/[0.02]' : ''}`}
              >
                <div id={pillar.id} className="scroll-mt-32" />
                <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-8 transition-all group-hover:scale-110 group-hover:rotate-3
                  ${pillar.gold ? 'bg-amber-500/10 text-amber-500' : 'bg-teal/10 text-teal'}`}>
                  {pillar.icon}
                </div>
                <h3 className={`text-2xl font-black mb-4 ${pillar.gold ? 'text-amber-500' : ''}`}>
                  {isRtl ? pillar.ku : pillar.en}
                </h3>
                <p className={`text-base font-light leading-relaxed mb-10 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {isRtl ? pillar.ku_desc : pillar.en_desc}
                </p>
                <a 
                  href="https://rzgartmi.github.io/ya-hakeem" 
                  target="_blank"
                  className={`inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] transition-colors
                    ${pillar.gold ? 'text-amber-500 hover:text-amber-400' : 'text-teal hover:text-teal-400'}`}
                >
                  {isRtl ? 'بینینی زیاتر' : 'Explore Platform'}
                  {isRtl ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- VISION QUOTE --- */}
      <section className={`py-40 px-6 text-center shadow-inner ${isDark ? 'bg-zinc-900/20' : 'bg-zinc-50'}`}>
         <div className="max-w-4xl mx-auto">
            <ScrollReveal>
               <h3 className={`text-3xl md:text-5xl font-black leading-tight mb-12
                  ${isRtl ? 'font-ku' : 'font-playfair italic'}`}>
                  {t(
                    '«ئێمە بەدوای دەرمانە ماددییەکانماندا دەگەڕێین لە دەرمانخانەی خودایی زەوی — و بەدوای دەرمانە ڕۆحییەکانماندا دەگەڕێین لە دەرمانخانەی خودایی قورئان.»',
                    '“We seek our material remedies in the divine pharmacy of earth — and our spiritual remedies in the divine pharmacy of the Quran.”'
                  )}
               </h3>
               <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-px bg-teal/30" />
                  <span className="text-teal text-xs font-bold uppercase tracking-[0.3em]">
                    {t('دیدگای یا حەکیم', 'The Vision Of Ya Hakeem')}
                  </span>
                  <div className="w-12 h-px bg-teal/30" />
               </div>
            </ScrollReveal>
         </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className={`py-20 px-6 border-t ${isDark ? 'bg-black border-white/5' : 'bg-white border-black/5'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-start">
           <div className={`space-y-4 ${isRtl ? 'md:text-right' : 'md:text-left'}`}>
              <div className={`text-4xl font-black text-teal ${isRtl ? 'font-ku' : 'font-playfair'}`}>
                 {t('يا حكيم', 'Ya Hakeem')}
              </div>
              <p className={`max-w-xs text-sm font-light leading-relaxed ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                {t(
                  'سیستەمێکی تەندروستی گشتگیر بۆ داهاتووی هەرێمی کوردستان.',
                  'A comprehensive health ecosystem for the future of the Kurdistan Region.'
                )}
              </p>
           </div>

           <div className="flex flex-wrap justify-center gap-10">
              <div className="space-y-4">
                 <div className="text-[10px] uppercase font-bold tracking-widest text-teal">{t('کۆڵەکەکان', 'Pillars')}</div>
                 <div className={`grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {NAV_LINKS.map(l => (
                      <a key={l.id} href={`#${l.id}`} className="hover:text-teal transition-colors">
                        {isRtl ? l.ku : l.en}
                      </a>
                    ))}
                 </div>
              </div>
           </div>

           <div className="space-y-6">
              <a 
                href="https://rzgartmi.github.io/ya-hakeem" 
                target="_blank"
                className="inline-block px-10 py-4 bg-teal text-white rounded-xl font-bold hover:shadow-xl hover:shadow-teal/20 transition-all"
              >
                {isRtl ? 'ئەپەکە بکەوە' : 'Open App'}
              </a>
              <div className={`text-xs opacity-40 font-light ${isRtl ? 'font-ku' : 'font-en'}`}>
                 © 2024 Ya Hakeem Project · Slemani, Kurdistan
              </div>
           </div>
        </div>
      </footer>

      {/* Utility Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        html { scroll-behavior: smooth; }
        .font-ku { font-family: "IBM Plex Arabic", sans-serif; }
        .font-en { font-family: "DM Sans", sans-serif; }
        .font-playfair { font-family: "Playfair Display", serif; }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${isDark ? '#0a0a0a' : '#f4f4f5'}; }
        ::-webkit-scrollbar-thumb { 
          background: #0D7C70; 
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover { background: #085950; }
      `}} />
    </div>
  );
}
