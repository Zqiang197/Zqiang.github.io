import React, { useState, useEffect } from 'react';
import { RESUME_DATA, STATIC_TEXT } from './constants';
import { Language } from './types';
import { motion, useScroll, useSpring, Variants } from 'framer-motion';
import { 
  Download, 
  ExternalLink, 
  Mail, 
  Phone, 
  Moon, 
  Sun, 
  MapPin, 
  Music, 
  Cpu, 
  Mic2,
  Headphones,
  CheckCircle2,
  Languages
} from 'lucide-react';
import { ChatWidget } from './components/ChatWidget';

const BackgroundGradient = () => (
  <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none select-none">
     <motion.div 
        animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
            opacity: [0.2, 0.15, 0.2]
        }}
        transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear" 
        }}
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-indigo-500/10 blur-[120px]"
     />
     <motion.div 
        animate={{ 
            scale: [1, 1.1, 1],
            x: [0, 50, 0],
            opacity: [0.15, 0.1, 0.15]
        }}
        transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "linear" 
        }}
        className="absolute top-[40%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-purple-500/10 blur-[130px]"
     />
  </div>
);

function App() {
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState<Language>('zh');
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);
  const toggleLang = () => setLang(prev => prev === 'zh' ? 'en' : 'zh');

  const currentData = RESUME_DATA[lang];
  const uiLabels = STATIC_TEXT[lang];

  // Animation Variants with Apple-like smooth easing
  const smoothTransition = { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.1 
      }
    }
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: smoothTransition
    }
  };

  const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: smoothTransition
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 ${isDark ? 'bg-zinc-950 text-white' : 'bg-gray-50 text-gray-900'} overflow-hidden`}>
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Dynamic Background */}
      <BackgroundGradient />
      
      {/* Navigation / Header */}
      <nav className="fixed top-0 w-full z-40 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-md border-b border-gray-200/50 dark:border-zinc-800/50 transition-colors duration-500 supports-[backdrop-filter]:bg-opacity-60">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={smoothTransition}
            className="font-bold text-xl tracking-tight"
          >
            {currentData.name}
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={smoothTransition}
            className="flex items-center gap-3 sm:gap-4"
          >
            <a 
              href={currentData.portfolioLink}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex text-sm font-medium hover:text-indigo-500 transition-colors items-center gap-1 group"
            >
              {uiLabels.navPortfolio} 
              <ExternalLink size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
            
            <button 
              onClick={toggleLang}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1 text-sm font-medium active:scale-95 duration-200"
              aria-label="Toggle Language"
            >
              <Languages size={20} />
              <span className="uppercase">{lang}</span>
            </button>

            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors active:scale-95 duration-200"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </motion.div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24 relative z-10">
        
        {/* Force re-render on language change for animation */}
        <div key={lang} className="space-y-32">
          
          {/* Hero Section */}
          <motion.section 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-8 min-h-[60vh] flex flex-col justify-center"
          >
            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm border border-indigo-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                {uiLabels.available}
              </div>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] bg-clip-text text-transparent bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500 pb-2">
                {uiLabels.heroTitlePrefix} <br/>
                <span className="text-indigo-600 dark:text-indigo-500 drop-shadow-sm">{uiLabels.heroTitleHighlight}</span>
              </h1>
              <p className="max-w-2xl text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                {uiLabels.heroDesc}
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={currentData.portfolioLink}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-medium shadow-lg hover:shadow-xl hover:shadow-indigo-500/20 dark:hover:shadow-white/20 transition-shadow flex items-center gap-2"
              >
                {uiLabels.viewPortfolio} <ExternalLink size={18} />
              </motion.a>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gray-200 dark:bg-zinc-800 rounded-full font-medium hover:bg-gray-300 dark:hover:bg-zinc-700 transition-colors flex items-center gap-2 backdrop-blur-sm bg-opacity-80"
                onClick={() => window.print()}
              >
                {uiLabels.downloadResume} <Download size={18} />
              </motion.button>
            </motion.div>
          </motion.section>

          {/* Stats / Skills Grid */}
          <motion.section
             variants={containerVariants}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
          >
             <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-10">
              <h2 className="text-3xl font-bold tracking-tight">{uiLabels.skills}</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent dark:from-zinc-800 dark:to-transparent"></div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentData.skills.map((skill, idx) => (
                <motion.div 
                  key={idx} 
                  variants={scaleIn}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="p-8 rounded-3xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 dark:hover:shadow-indigo-500/10 transition-all duration-300"
                >
                  <div className="mb-6 p-3 bg-indigo-50 dark:bg-indigo-500/10 w-fit rounded-2xl text-indigo-600 dark:text-indigo-400">
                    {idx === 0 && <Music size={28} />}
                    {idx === 1 && <Headphones size={28} />}
                    {idx === 2 && <Cpu size={28} />}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{skill.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-zinc-800/80 rounded-lg text-sm text-gray-700 dark:text-gray-300 font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Experience Section */}
          <motion.section 
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-4">
              <h2 className="text-3xl font-bold tracking-tight">{uiLabels.experience}</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent dark:from-zinc-800 dark:to-transparent"></div>
            </motion.div>

            <div className="space-y-16">
              {currentData.experience.map((job, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeInUp}
                  className="relative pl-8 md:pl-0 group"
                >
                  <div className="hidden md:block absolute left-[-29px] top-2 w-3 h-3 rounded-full bg-gray-200 dark:bg-zinc-800 border-4 border-white dark:border-zinc-950 z-10 group-hover:bg-indigo-500 transition-colors duration-300"></div>
                  
                  <div className="md:grid md:grid-cols-4 gap-8">
                    <div className="md:col-span-1 mb-2 md:mb-0">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 flex flex-col sticky top-24">
                        <span className="text-base text-gray-900 dark:text-gray-200 font-bold mb-1">{job.period}</span>
                        <span className="flex items-center gap-1 text-xs uppercase tracking-wide opacity-70">
                          <MapPin size={10} /> {job.location}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-3 space-y-4 p-6 rounded-3xl transition-colors duration-300 hover:bg-gray-50 dark:hover:bg-zinc-900/40 border border-transparent hover:border-gray-100 dark:hover:border-zinc-800/50">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{job.role}</h3>
                        <div className="text-indigo-600 dark:text-indigo-400 font-medium text-lg mt-1">{job.company}</div>
                      </div>
                      <ul className="space-y-3">
                        {job.description.map((desc, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-300 leading-relaxed text-[15px]">
                            <CheckCircle2 size={18} className="mt-[3px] flex-shrink-0 text-indigo-500/50 dark:text-indigo-400/50" />
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Contact Section */}
          <motion.section
             variants={scaleIn}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
          >
             <div className="bg-gray-900 dark:bg-zinc-900 rounded-[2rem] p-10 sm:p-20 text-center space-y-8 relative overflow-hidden shadow-2xl">
                {/* Decorative background blur */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                  <motion.div 
                    animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-50%] left-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px]"
                  ></motion.div>
                  <motion.div 
                    animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-50%] right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]"
                  ></motion.div>
                </div>

                <div className="relative z-10 space-y-8">
                  <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">{uiLabels.contactTitle}</h2>
                  <p className="text-gray-300 max-w-xl mx-auto text-lg leading-relaxed font-light">
                    {uiLabels.contactDesc}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 pt-6">
                     <motion.a 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={`mailto:${currentData.contact.email}`} 
                        className="group flex items-center justify-center gap-3 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl transition-all"
                     >
                       <Mail size={20} className="text-indigo-400 group-hover:text-white transition-colors" />
                       <span className="font-medium">{currentData.contact.email}</span>
                     </motion.a>
                     <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="group flex items-center justify-center gap-3 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl transition-all cursor-default"
                     >
                        <Phone size={20} className="text-green-400 group-hover:text-white transition-colors" />
                        <span className="font-medium">{currentData.contact.phone}</span>
                     </motion.div>
                     <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="group flex items-center justify-center gap-3 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl transition-all cursor-default"
                     >
                        <Mic2 size={20} className="text-purple-400 group-hover:text-white transition-colors" />
                        <span className="font-medium">WeChat: {currentData.contact.wechat}</span>
                     </motion.div>
                  </div>
                </div>
             </div>
          </motion.section>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 text-center text-sm text-gray-500 dark:text-gray-600 border-t border-gray-200 dark:border-zinc-900 bg-gray-50/50 dark:bg-zinc-950/50 backdrop-blur-sm">
        <p>© {new Date().getFullYear()} {currentData.name}. {uiLabels.rights}</p>
        <p className="mt-3 text-xs opacity-75 font-medium">{uiLabels.builtWith}</p>
      </footer>

      {/* AI Chat Widget */}
      <ChatWidget lang={lang} />
    </div>
  );
}

export default App;