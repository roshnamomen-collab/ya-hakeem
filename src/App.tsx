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
  { id: 'problem', en: '01 Problem', ku: '٠١ کێشەکە' },
  { id: 'solution', en: '02 Solution', ku: '٠٢ چارەسەرەکە' },
  { id: 'principles', en: '03 Principles', ku: '٠٣ پرەنسیپەکان' },
  { id: 'roadmap', en: '04 Roadmap', ku: '٠٤ نەخشەی ڕێگا' },
  { id: 'hikmat', en: '05 Hikmat', ku: '٠٥ الحكمة', gold: true }
];

const PILLARS_CONTENT = [
  { 
    id: 'directory',
    icon: <Search size={28} />, 
    en: 'Doctor Directory',
    ku: 'ڕێبەرى پزیشکان',
    en_desc: 'A live Kurdistan-wide directory that ranks doctors by merit, not marketing.',
    ku_desc: 'ڕێبەرێکی زیندووی سەرانسەری کوردستان کە پزیشکان بەپێی لێهاتوویی ڕیزبەند دەکات، نەک مارکێتینگ.'
  },
  { 
    id: 'knowledge',
    icon: <BookOpen size={28} />, 
    en: 'Health Knowledge Base',
    ku: 'بنکەی زانیاری تەندروستی',
    en_desc: 'A structured knowledge base that rescues clinical wisdom from the noise.',
    ku_desc: 'بنکەیەکی زانیاری ڕێکخراو کە حیکمەتی پزیشکی لە ژاوەژاو ڕزگار دەکات.'
  },
  { 
    id: 'advocacy',
    icon: <ShieldCheck size={28} />, 
    en: 'Advocacy Portal',
    ku: 'پۆرتاڵی داکۆکیکاری',
    en_desc: 'A safe space for doctors to grow, not suffer in silence.',
    ku_desc: 'شوێنێکی سەلامەت بۆ پزیشکان بۆ گەشەکردن، نەک ئازارچێژان لە بێدەنگیدا.'
  },
  { 
    id: 'education',
    icon: <Activity size={28} />, 
    en: 'Patient Education Layer',
    ku: 'چینی پەروەردەی نەخۆش',
    en_desc: 'Visual guides to help patients understand and stick to their treatment plans with confidence.',
    ku_desc: 'ڕێنمایی بینراو بۆ یارمەتیدانی نەخۆش لە تێگەیشتن و پابەندبوون بە پلانی چارەسەرەکانیان بە متمانەوە.'
  },
  { 
    id: 'ehr',
    icon: <FileText size={28} />, 
    en: 'Stream EHR',
    ku: 'تۆماری ئەلیکترۆنی',
    en_desc: 'An EHR that fits how doctors actually think. Frictionless input, AI organizes silently.',
    ku_desc: 'تۆمارێکی پزیشکی ئەلیکترۆنی کە لەگەڵ شێوازی بیرکردنەوەی پزیشکان دەگونجێت. تێکردنی بێ ئاستەنگ، AI بە بێدەنگی ڕێکی دەخات.'
  },
  { 
    id: 'hikmat',
    icon: <Heart size={28} className="text-amber-500" />, 
    en: 'The Meaning of Healing',
    ku: 'مانای چاکبوونەوە',
    en_desc: 'Medicine sees the pages. Risale-i Nur reads the meaning.',
    ku_desc: 'پزیشکی لاپەڕەکان دەبینێت. نامەکانی نور ماناکەی دەخوێنێتەوە.',
    gold: true
  }
];

// --- Shared Components ---

const ScrollReveal = ({ children, className = "", delay = 0, id }: { children: React.ReactNode, className?: string, delay?: number, key?: React.Key, id?: string }) => (
  <motion.div
    id={id}
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
          
          {/* Main Action Group: Logo & Hamburger */}
          <div className="flex items-center gap-4">
            {/* Hamburger */}
            <button 
              onClick={() => setIsOpen(true)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all
                ${isDark ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-black/5 text-gray-600 hover:bg-black/10'}`}
            >
              <Menu size={20} />
            </button>

            {/* Logo */}
            <a href="#" className={`text-xl font-bold text-teal transition-transform hover:scale-105 active:scale-95 ${isRtl ? 'font-ku' : 'font-playfair'}`}>
              {isRtl ? 'يا حەکیم' : 'Ya Hakeem'}
            </a>
          </div>

          {/* Center Space for Desktop Links if needed, but keeping it clean for now */}

          {/* Secondary Action Group: Toggles */}
          <div className="flex items-center gap-3">
             {/* Lang Toggle - Desktop Only here */}
             <div className={`p-1 rounded-full border hidden sm:flex ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                <button onClick={() => setLang('ku')} className={`text-[10px] font-bold px-3 py-1.5 rounded-full transition-all ${isRtl ? 'bg-teal text-white shadow-md' : 'text-gray-500 hover:text-teal'}`}>کوردی</button>
                <button onClick={() => setLang('en')} className={`text-[10px] font-bold px-3 py-1.5 rounded-full transition-all ${!isRtl ? 'bg-teal text-white shadow-md' : 'text-gray-500 hover:text-teal'}`}>EN</button>
             </div>

             {/* Theme Toggle */}
             <button 
              onClick={toggleTheme}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-90
                ${isDark ? 'bg-white/5 text-teal border border-white/10 shadow-lg shadow-black/20' : 'bg-black/5 text-teal border border-black/10 shadow-sm'}`}
             >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
             </button>
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
              className="fixed inset-0 bg-black/90 z-[70] backdrop-blur-md"
            />
            <motion.div 
              initial={{ x: isRtl ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? '100%' : '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={`fixed top-0 bottom-0 w-80 bg-white dark:bg-[#0a0a0a] z-[80] p-10 flex flex-col shadow-2xl border-teal/20
                ${isRtl ? 'right-0 border-l' : 'left-0 border-r'}`}
            >
              <div className={`flex items-center justify-between mb-12 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`text-2xl font-bold text-teal ${isRtl ? 'font-ku' : 'font-playfair'}`}>
                  {isRtl ? 'یا حەکیم' : 'Ya Hakeem'}
                </div>
                <button onClick={() => setIsOpen(false)} className="p-3 rounded-full bg-black/5 dark:bg-white/5 hover:scale-110 transition-all">
                  <X size={24} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                </button>
              </div>

              {/* Mobile Language Toggle - Easy to find */}
              <div className="mb-10">
                <div className={`text-[10px] font-bold text-teal tracking-[0.2em] uppercase opacity-50 mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                  {isRtl ? 'زمان' : 'Language'}
                </div>
                <div className={`flex p-1.5 rounded-2xl border ${isDark ? 'bg-white/5 border-white/20' : 'bg-black/5 border-black/10'}`}>
                  <button onClick={() => setLang('ku')} className={`flex-1 py-4 rounded-xl text-sm font-bold transition-all ${isRtl ? 'bg-teal text-white shadow-lg' : 'text-gray-500'}`}>{isRtl ? 'کوردی' : 'Kurdish'}</button>
                  <button onClick={() => setLang('en')} className={`flex-1 py-4 rounded-xl text-sm font-bold transition-all ${!isRtl ? 'bg-teal text-white shadow-lg' : 'text-gray-500'}`}>{isRtl ? 'ئینگلیزی' : 'English'}</button>
                </div>
              </div>

              <div className="flex flex-col gap-2 overflow-y-auto">
                <div className={`text-[10px] font-bold text-teal tracking-[0.2em] uppercase opacity-50 mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                  {isRtl ? '٦ کۆڵەکەکە' : 'The 6 Pillars'}
                </div>
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`py-4 px-6 rounded-2xl text-lg font-bold transition-all flex items-center justify-between group
                      ${isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-teal hover:bg-teal/5'}`}
                  >
                    <span>{isRtl ? link.ku : link.en}</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {isRtl ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-auto pt-10">
                <p className="text-[10px] text-center opacity-30 uppercase tracking-widest font-bold">
                  Slemani, Kurdistan
                </p>
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

      {/* Floating Buttons */}
      <div className={`fixed bottom-8 z-50 flex flex-col gap-4 ${isRtl ? 'left-8' : 'right-8'}`}>
        <AnimatePresence>
          {showTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-14 h-14 rounded-full bg-teal text-white shadow-2xl transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center"
            >
              <ArrowUp size={24} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

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
               {t('پێشکەشکردنی یا حەکیم', 'Introducing Ya Hakeem')}
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="mb-6">
            <h1 className={`text-7xl md:text-9xl font-black mb-4 leading-none tracking-tight
               ${isRtl ? 'font-ku' : 'font-playfair'}
               ${isDark ? 'text-white' : 'text-[#0a0a0a]'}`}>
              {t('يا حكيم', 'Ya Hakeem')}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.4} className="max-w-2xl mx-auto mt-10">
             <p className={`text-lg md:text-xl font-light leading-relaxed mb-10
                ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
               {t(
                 'سیستەمێکی لێپرسینەوە و داکۆکیکاری پزیشکی بۆ هەرێمی کوردستان — بونیاد نراوە بۆ بەخشینی ڕاستی بە نەخۆش، شکۆ بۆ پزیشک، و ڕێگایەک بۆ چاکبوونەوەی ڕاستەقینە بۆ ئازارچێژان.',
                 'A Medical Accountability & Advocacy Ecosystem for the Kurdistan Region — built to give patients truth, doctors dignity, and the ailing a path to true healing.'
               )}
             </p>
          </ScrollReveal>

          <ScrollReveal delay={0.6} className="flex flex-col items-center gap-6">
             <div className="flex flex-col items-center gap-4">
                <a
                  href="https://rzgartmi.github.io/ya-hakeem"
                  target="_blank"
                  className="px-10 py-5 rounded-full bg-amber-500 text-white shadow-2xl transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center font-black text-sm uppercase tracking-widest"
                >
                  {t('ئەپەکە بکەوە', 'Open App')}
                </a>
                <p className={`text-xs font-bold uppercase tracking-widest opacity-60 ${isDark ? 'text-amber-200' : 'text-amber-700'}`}>
                   {t('لە قۆناغی پەرەپێدانی سەرەتاییدایە', 'In early development phase')}
                </p>
             </div>
              <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.3em] opacity-40 mt-4">
                {t('بۆ دۆزینەوە کلیک بکە', 'Scroll to explore')}
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

      {/* --- THE PROBLEM --- */}
      <section id="problem" className={`py-32 px-6 border-t ${isDark ? 'bg-black border-white/5' : 'bg-white border-black/5'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight text-red-500">{t('کێشەکە', 'The Problem')}</h2>
              <p className={`text-xl font-light max-w-2xl mx-auto ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {t(
                  'تەندروستی لە کوردستان بە چوار شێوازی دیار تێکچووە — و دانەیەکی نادیار.',
                  'Healthcare in Kurdistan is broken in four visible ways — and one invisible one.'
                )}
              </p>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ScrollReveal className={`p-8 rounded-[40px] border ${isDark ? 'bg-zinc-900 border-white/5' : 'bg-zinc-50 border-black/5'}`}>
               <div className="text-4xl mb-6">🏥</div>
               <h3 className="text-xl font-bold mb-4">{t('مارکێتینگ لە پێش لێهاتوویی', 'Marketing over merit')}</h3>
               <p className={`text-sm font-light leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {t(
                    'کۆمەڵە پزیشکییە گەورەکان بەهۆی بودجەکەیانەوە دەبینرێن، نەک بەهۆی کوالێتی پزیشکییان. پزیشکە سەربەخۆکان لە نێو ئەو ژاوەژاوەدا ون دەبن.',
                    'Large complexes dominate visibility through budget, not clinical quality. Independent doctors disappear into the noise.'
                  )}
               </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1} className={`p-8 rounded-[40px] border ${isDark ? 'bg-zinc-900 border-white/5' : 'bg-zinc-50 border-black/5'}`}>
               <div className="text-4xl mb-6">📱</div>
               <h3 className="text-xl font-bold mb-4">{t('زانیاری پزیشکی پەرش و بڵاو', 'Scattered health information')}</h3>
               <p className={`text-sm font-light leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {t(
                    'ناوەرۆکە پزیشکییە متمانەپێکراوەکان لە نێوان پۆستەکانی فەیسبووک و پرۆگرامە تەلەفزیۆنییەکاندا ون بوون کە تەنها بۆ ڕاکێشانی بینەر دروستکراون، نەک بۆ پەروەردە.',
                    'Reliable medical content is buried under clickbait on Facebook and TV programs designed for engagement, not education.'
                  )}
               </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2} className={`p-8 rounded-[40px] border ${isDark ? 'bg-zinc-900 border-white/5' : 'bg-zinc-50 border-black/5'}`}>
               <div className="text-4xl mb-6">💊</div>
               <h3 className="text-xl font-bold mb-4">{t('نەخۆشەکان پلانە باشەکان جێ دەهێڵن', 'Patients abandon good plans')}</h3>
               <p className={`text-sm font-light leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {t(
                    'بەبێ تێگەیشتن لە چارەسەرەکەیان، نەخۆشەکان دەرمانە کاریگەرەکان زوو ڕادەگرن — ئەمەش وایان لێدەکات پەنا ببەنە بەر چارەسەری ساختە و سەر شەقامەکان.',
                    'Without understanding their treatment, patients stop effective medication too early — leaving them vulnerable to fake and street healers.'
                  )}
               </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3} className={`p-8 rounded-[40px] border ${isDark ? 'bg-zinc-900 border-white/5' : 'bg-zinc-50 border-black/5'}`}>
               <div className="text-4xl mb-6">🩺</div>
               <h3 className="text-xl font-bold mb-4">{t('پزیشکان لە بێدەنگیدا کار دەکەن', 'Doctors work in silence')}</h3>
               <p className={`text-sm font-light leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {t(
                    'پزیشکانی نوێ هەست بە تاوان دەکەن بەهۆی کەمی زانیارییانەوە بە تەنیا، بەبێ بوونی شوێنێکی سەلامەت بۆ داننان بە هەڵەکانیان یان گەڕان بەدوای ڕێنمایی.',
                    'Newer doctors carry guilt from knowledge gaps alone, with no safe space to acknowledge errors or seek mentorship.'
                  )}
               </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* --- THE SOLUTION / PILLARS --- */}
      <section id="solution" className={`py-32 px-6 ${isDark ? 'bg-zinc-900/40' : 'bg-zinc-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-black mb-6">{t('چارەسەرەکە', 'The Solution')}</h2>
              <p className={`text-xl font-light max-w-2xl mx-auto ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {t(
                  'یا حەکیم شەش کۆڵەکەیە کە لەلایەن یەک پەیامەوە یەکخراون — چاکبوونەوەی ماددی و ڕۆحی پێکەوە.',
                  'Ya Hakeem is six pillars unified by one mission — material and spiritual healing together.'
                )}
              </p>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
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
                <p className={`text-base font-light leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {isRtl ? pillar.ku_desc : pillar.en_desc}
                </p>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="flex flex-col items-center gap-6">
            <a
              href="https://rzgartmi.github.io/ya-hakeem"
              target="_blank"
              className="px-10 py-5 rounded-full bg-teal text-white shadow-2xl transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center font-black text-sm uppercase tracking-widest"
            >
              {t('ئەپەکە بکەوە', 'Open App')}
            </a>
            <p className={`text-sm opacity-60 font-light ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
               {t('ئەلفا تاقی بکەرەوە و ببینە چۆن ئەم شەش کۆڵەکەیە بنیاد دەنێین.', 'Try the alpha and see how we build these six pillars.')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* --- VISION QUOTE --- */}
      <section className={`py-40 px-6 text-center shadow-inner ${isDark ? 'bg-zinc-900/20' : 'bg-zinc-50'}`}>
         <div className="max-w-4xl mx-auto">
            <ScrollReveal>
               <h3 className={`text-2xl md:text-4xl font-black leading-tight mb-12
                  ${isRtl ? 'font-ku' : 'font-playfair italic'}`}>
                  {t(
                    'ئێمە بەدوای دەرمانە ماددییەکانماندا دەگەڕێین لە دەرمانخانەی خودایی زەوی، و بەدوای دەرمانە ڕۆحییەکانماندا دەگەڕێین لە دەرمانخانەی خودایی قورئان.',
                    'We seek our material remedies in the divine pharmacy of earth, and our spiritual remedies in the divine pharmacy of the Quran.'
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

      {/* --- PRINCIPLES --- */}
      <section id="principles" className={`py-32 px-6 border-t ${isDark ? 'bg-black border-white/5' : 'bg-white border-black/5'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal>
              <h2 className="text-3xl font-black mb-4 uppercase tracking-tight text-teal">{t('پرەنسیپەکانمان', 'Our Principles')}</h2>
              <p className={`text-xl font-light ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {t(
                  'ئەوەی یا حەکیم جیاواز دەکات تەنها تەکنەلۆژیا نییە، بەڵکو ئەو پرەنسیپانەیە کە کارەکانمانی پێ دەپارێزین.',
                  'What makes Ya Hakeem different is not just the technology, but the principles we protect our work with.'
                )}
              </p>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ScrollReveal className={`p-8 rounded-[40px] border ${isDark ? 'bg-zinc-900 border-white/5' : 'bg-zinc-50 border-black/5'}`}>
               <div className="text-3xl mb-6">⚖️</div>
               <h3 className="text-xl font-bold mb-4">{t('شایستەیی نەک بازاڕکردن', 'Merit over marketing')}</h3>
               <p className={`text-sm font-light leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {t(
                    'نمرەکان رەنگدانەوەی بەشداری پەروەردەیین، نەک ژمارەی فۆڵۆوەر یان بودجەی ڕیکلام.',
                    'Scores reflect educational contribution, never follower count or advertising budgets.'
                  )}
               </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1} className={`p-8 rounded-[40px] border ${isDark ? 'bg-zinc-900 border-white/5' : 'bg-zinc-50 border-black/5'}`}>
               <div className="text-3xl mb-6">✍️</div>
               <h3 className="text-xl font-bold mb-4">{t('ژیری دەستکرد وەک ئامراز', 'AI as a tool')}</h3>
               <p className={`text-sm font-light leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {t(
                    'ژیری دەستکرد تەنها بۆ وەرگێڕان و رێکخستن بەکاردێت. هەرگیز ناوەرۆکی پزیشکی نانووسێت یان دەستکاری ناکات. هەر بابەتێک نووسەرێکی پزیشکی مرۆیی هەیە.',
                    'AI is used only for translation and organization. It never writes or edits medical content. Every article has a human doctor author.'
                  )}
               </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2} className={`p-8 rounded-[40px] border ${isDark ? 'bg-zinc-900 border-white/5' : 'bg-zinc-50 border-black/5'}`}>
               <div className="text-3xl mb-6">🔗</div>
               <h3 className="text-xl font-bold mb-4">{t('ئاماژەکردن بە سەرچاوە', 'Full attribution')}</h3>
               <p className={`text-sm font-light leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {t(
                    'هەموو ناوەرۆکێک بەستراوەتەوە بە سەرچاوە سەرەکییەکەیەوە. ئێمە ئاماژە بە سەرچاوە دەکەین، هەرگیز بانگەشەی خاوەندارێتی ناکەین.',
                    'Every piece of content links to its original source. We credit, never claim ownership.'
                  )}
               </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3} className={`p-8 rounded-[40px] border ${isDark ? 'bg-zinc-900 border-white/5' : 'bg-zinc-50 border-black/5'}`}>
               <div className="text-3xl mb-6">🙏</div>
               <h3 className="text-xl font-bold mb-4">{t('ئێمە دادوەر نین', 'We are not judges')}</h3>
               <p className={`text-sm font-light leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {t(
                    'ئێمە ناوی کەس ناهێنین و کەس شەرمەزار ناکەین. ئێمە تەنها نموونەی ڕەوشتی کاری پزیشکی نیشان دەدەین.',
                    'We do not name or shame. We simply model what ethical medical conduct looks like.'
                  )}
               </p>
            </ScrollReveal>
          </div>
          
          <ScrollReveal delay={0.4} className="mt-12 p-8 rounded-[40px] border border-teal/20 bg-teal/5 text-center">
             <p className={`text-lg font-light leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                {t(
                  'یا حەکیم بەدوای حیکمەتی قووڵتری قورئان و نامەکانی نوردا دەگەڕێت، چونکە لاشەیەکی چاکبووەوە بەبێ ڕۆحێکی ئارام تەنها نیوەی چارەسەرە.',
                  'Ya Hakeem seeks the deeper wisdom of the Quran and Risale-i Nur, because a healed body without a peaceful soul is only half a cure.'
                )}
             </p>
          </ScrollReveal>
        </div>
      </section>

      {/* --- ROADMAP --- */}
      <section id="roadmap" className={`py-32 px-6 border-t ${isDark ? 'bg-black border-white/5' : 'bg-white border-black/5'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight text-teal">{t('نەخشەی رێگا', 'Roadmap')}</h2>
              <p className={`text-xl font-light ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {t('بەرەو سیستەمێکی تەندروستی گشتگیر بۆ هەرێمی کوردستان.', 'Towards a comprehensive health ecosystem for the Kurdistan Region.')}
              </p>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[
               { phase: 1, date: 'August 2026', en: 'Foundation', ku: 'قۆناغی یەکەم: بناغە', desc_en: '• Database and Cloud Setup\n• AI Translation Pipeline\n• CORE System Architecture', desc_ku: '• پلانی بنکەی زانیاری و سیستەمی کڵاود\n• هێڵی وەرگێڕانی زیرەک (AI Pipeline)\n• داڕشتنی کۆدی سەرەکی سیستەم' },
               { phase: 2, date: 'Nov 2026', en: 'Directory Launch', ku: 'قۆناغی دووەم: دەستپێکی ڕێبەر', desc_en: '• Kurdistan-wide Doctor Profiles\n• Hospital & Pharmacy Registry\n• KCS Scoring system Live', desc_ku: '• پڕۆفایلەکانی سەرانسەری کوردستان\n• ڕێبەری نەخۆشخانە و دەرمانخانەکان\n• چالاککردنی نمرەی کارایی (KCS)' },
               { phase: 3, date: 'Feb 2026', en: 'Knowledge Base', ku: 'قۆناغی سێیەم: بنکەی زانیاری', desc_en: '• Medical Condition Hubs\n• 500+ Curated Articles\n• Patient Education Handouts', desc_ku: '• ناوەندەکانی زانیاری نەخۆشییەکان\n• زیاتر لە ٥٠٠ بابەتی هەڵبژێردراو\n• بڵاوکراوەی پەروەردەیی بۆ نەخۆش' },
               { phase: 4, date: 'May 2026', en: 'Community & Media', ku: 'قۆناغی چوارەم: کۆمەڵگە و میدیا', desc_en: '• Medical Webinars\n• Content Creators Network\n• Health Advocacy Campaigns', desc_ku: '• وێبینار و سیمیناری پزیشکی\n• تۆڕی دروستکەرانی ناوەڕۆک\n• هەڵمەتەکانی هۆشیاری تەندروستی' },
               { phase: 5, date: 'Aug 2026', en: 'Stream EHR', ku: 'قۆناغی پێنجەم: تۆماری ئەلیکترۆنی', desc_en: '• Stream UI Beta Launch\n• AI Voice Parsing layer\n• Mobile App integration', desc_ku: '• دەستپێکی وەشانى تاقیکاری ستریم\n• شیکردنەوەی دەنگی بە زیرەکی دەستکرد\n• یەکخستنی ئەپی مۆبایل' },
               { phase: 6, date: 'Nov 2026', en: 'Hikmat Layer', ku: 'قۆناغی شەشەم: چینی حیکمەت', desc_en: '• Meaning of Health Series\n• Risale-i Nur Integration\n• Spiritual Wellbeing Circles', desc_ku: '• زنجیرەی مانای تەندروستی\n• یەکخستنی نامەکانی نور\n• کۆڕەکانی تەندروستی ڕۆحی' },
             ].map((item) => (
                <ScrollReveal key={item.phase} className={`p-8 rounded-[40px] border relative overflow-hidden ${isDark ? 'bg-zinc-900 border-white/5' : 'bg-zinc-50 border-black/5'}`}>
                   <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl -mr-4 -mt-4">{item.phase}</div>
                   <div className="text-teal font-black text-xs uppercase tracking-widest mb-2">{item.date}</div>
                   <h3 className="text-xl font-black mb-6">{t(item.ku, item.en)}</h3>
                   <div className={`text-sm font-light space-y-2 whitespace-pre-line ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      {t(item.desc_ku, item.desc_en).split('\n').map((line, idx) => (
                        <div key={idx} className="flex gap-2">
                           <span className="text-teal">•</span>
                           <span>{line.replace('• ', '')}</span>
                        </div>
                      ))}
                   </div>
                </ScrollReveal>
             ))}
          </div>
          
          <ScrollReveal delay={0.4} className="mt-16 flex flex-col items-center gap-6">
             <a
                href="https://rzgartmi.github.io/ya-hakeem"
                target="_blank"
                className="px-10 py-5 rounded-full bg-teal text-white shadow-2xl transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center font-black text-sm uppercase tracking-widest"
             >
                {t('ئەپەکە بکەوە', 'Open App')}
             </a>
             <p className={`text-sm opacity-60 font-light ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {t('نەخشەی ڕێگاکەمان ببینە لە کرداردا بە بەکارهێنانی وەشانى تاقیکاری.', 'See our vision in action by using the beta version.')}
             </p>
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

           <div className="space-y-6">
              <div className={`text-xs opacity-40 font-light ${isRtl ? 'font-ku' : 'font-en'}`}>
                 © 2026 Ya Hakeem Project · Slemani, Kurdistan
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
