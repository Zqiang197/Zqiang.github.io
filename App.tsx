import React, { useState } from 'react';
import { RESUME_DATA, STATIC_TEXT } from './constants';
import { Language } from './types';
import { motion, useScroll, useSpring, Variants } from 'framer-motion';
import { 
  Download, 
  ExternalLink, 
  Mail, 
  Phone, 
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
  <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none select-none print:hidden">
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
  const [lang, setLang] = useState<Language>('zh');
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
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
    <div className="min-h-screen transition-colors duration-700 bg-zinc-950 text-white overflow-hidden print:bg-white print:text-black">
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-500 origin-left z-50 print:hidden"
        style={{ scaleX }}
      />

      {/* Dynamic Background */}
      <BackgroundGradient />
      
      {/* Navigation / Header */}
      <nav className="fixed top-0 w-full z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50 transition-colors duration-500 supports-[backdrop-filter]:bg-opacity-60 print:hidden">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={smoothTransition}
            className="font-bold text-xl tracking-tight text-white"
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
              className="hidden sm:flex text-sm font-medium text-gray-200 hover:text-indigo-400 transition-colors items-center gap-1 group"
            >
              {uiLabels.navPortfolio} 
              <ExternalLink size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
            
            <button 
              onClick={toggleLang}
              className="p-2 rounded-full hover:bg-zinc-800 transition-colors flex items-center gap-1 text-sm font-medium active:scale-95 duration-200 text-gray-200"
              aria-label="Toggle Language"
            >
              <Languages size={20} />
              <span className="uppercase">{lang}</span>
            </button>
          </motion.div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24 relative z-10 print:pt-10 print:pb-0">
        
        {/* Force re-render on language change for animation */}
        <div key={lang} className="space-y-32 print:space-y-12">
          
          {/* Hero Section */}
          <motion.section 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-8 min-h-[60vh] flex flex-col justify-center print:min-h-0 print:block"
          >
            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm border border-indigo-500/20 print:hidden">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                {uiLabels.available}
              </div>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] bg-clip-text text-transparent bg-gradient-to-br from-white via-zinc-200 to-zinc-500 pb-2 print:text-black print:bg-none print:text-4xl">
                {uiLabels.heroTitlePrefix} <br className="print:hidden"/>
                <span className="text-indigo-500 drop-shadow-sm print:text-black print:drop-shadow-none">{uiLabels.heroTitleHighlight}</span>
              </h1>
              <p className="max-w-2xl text-lg sm:text-xl text-gray-300 leading-relaxed font-light print:text-gray-800 print:text-sm">
                {uiLabels.heroDesc}
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 print:hidden">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={currentData.portfolioLink}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 bg-white text-black rounded-full font-medium shadow-lg hover:shadow-xl hover:shadow-white/20 transition-shadow flex items-center gap-2"
              >
                {uiLabels.viewPortfolio} <ExternalLink size={18} />
              </motion.a>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-zinc-800 text-gray-100 rounded-full font-medium hover:bg-zinc-700 transition-colors flex items-center gap-2 backdrop-blur-sm bg-opacity-80"
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
             className="print:break-inside-avoid"
          >
             <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-10 print:mb-4">
              <h2 className="text-3xl font-bold tracking-tight text-white print:text-xl">{uiLabels.skills}</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent print:bg-gray-200"></div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 print:grid-cols-3 print:gap-4">
              {currentData.skills.map((skill, idx) => (
                <motion.div 
                  key={idx} 
                  variants={scaleIn}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="p-8 rounded-3xl bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 print:p-4 print:border-gray-300 print:shadow-none print:bg-transparent"
                >
                  <div className="mb-6 p-3 bg-indigo-500/10 w-fit rounded-2xl text-indigo-400 print:hidden">
                    {idx === 0 && <Music size={28} />}
                    {idx === 1 && <Headphones size={28} />}
                    {idx === 2 && <Cpu size={28} />}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white print:text-lg print:mb-2">{skill.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, i) => (
                      <span key={i} className="px-3 py-1 bg-zinc-800/80 rounded-lg text-sm text-gray-300 font-medium print:bg-gray-100 print:text-black print:text-xs">
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
            className="space-y-12 print:space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-4">
              <h2 className="text-3xl font-bold tracking-tight text-white print:text-xl">{uiLabels.experience}</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent print:bg-gray-200"></div>
            </motion.div>

            <div className="space-y-16 print:space-y-8">
              {currentData.experience.map((job, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeInUp}
                  className="relative pl-8 md:pl-0 group print:pl-0 print:break-inside-avoid"
                >
                  <div className="hidden md:block absolute left-[-29px] top-2 w-3 h-3 rounded-full bg-zinc-800 border-4 border-zinc-950 z-10 group-hover:bg-indigo-500 transition-colors duration-300 print:hidden"></div>
                  
                  <div className="md:grid md:grid-cols-4 gap-8 print:block">
                    <div className="md:col-span-1 mb-2 md:mb-0 print:mb-1">
                      <div className="text-sm font-medium text-gray-400 flex flex-col sticky top-24 print:static print:flex-row print:gap-4 print:text-gray-600">
                        <span className="text-base text-gray-100 font-bold mb-1 print:text-black print:text-sm">{job.period}</span>
                        <span className="flex items-center gap-1 text-xs uppercase tracking-wide opacity-80 print:text-xs">
                          <MapPin size={10} className="print:hidden"/> {job.location}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-3 space-y-4 p-6 rounded-3xl transition-colors duration-300 hover:bg-zinc-900/40 border border-transparent hover:border-zinc-800/50 print:p-0 print:hover:bg-transparent print:border-none">
                      <div>
                        <h3 className="text-xl font-bold text-gray-100 print:text-black print:text-lg">{job.role}</h3>
                        <div className="text-indigo-400 font-medium text-lg mt-1 print:text-gray-800 print:text-base">{job.company}</div>
                      </div>
                      <ul className="space-y-3 print:space-y-1">
                        {job.description.map((desc, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-300 leading-relaxed text-[15px] print:text-black print:text-sm print:gap-2">
                            <CheckCircle2 size={18} className="mt-[3px] flex-shrink-0 text-indigo-400/50 print:hidden" />
                            <span className="print:list-disc print:ml-4">{desc}</span>
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
             className="print:break-inside-avoid"
          >
             <div className="bg-zinc-900 rounded-[2rem] p-10 sm:p-20 text-center space-y-8 relative overflow-hidden shadow-2xl print:bg-white print:shadow-none print:p-0 print:border-t print:border-gray-200 print:rounded-none">
                {/* Decorative background blur */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none print:hidden">
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

                <div className="relative z-10 space-y-8 print:space-y-4">
                  <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight print:text-black print:text-xl">{uiLabels.contactTitle}</h2>
                  <p className="text-gray-200 max-w-xl mx-auto text-lg leading-relaxed font-light print:text-gray-600 print:text-sm">
                    {uiLabels.contactDesc}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 pt-6 print:flex-row print:gap-8 print:pt-2">
                     <motion.a 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={`mailto:${currentData.contact.email}`} 
                        className="group flex items-center justify-center gap-3 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl transition-all print:text-black print:bg-transparent print:p-0 print:shadow-none"
                     >
                       <Mail size={20} className="text-indigo-400 group-hover:text-white transition-colors print:text-black print:w-4 print:h-4" />
                       <span className="font-medium print:text-sm">{currentData.contact.email}</span>
                     </motion.a>
                     <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="group flex items-center justify-center gap-3 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl transition-all cursor-default print:text-black print:bg-transparent print:p-0 print:shadow-none"
                     >
                        <Phone size={20} className="text-green-400 group-hover:text-white transition-colors print:text-black print:w-4 print:h-4" />
                        <span className="font-medium print:text-sm">{currentData.contact.phone}</span>
                     </motion.div>
                     <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="group flex items-center justify-center gap-3 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl transition-all cursor-default print:text-black print:bg-transparent print:p-0 print:shadow-none"
                     >
                        <Mic2 size={20} className="text-purple-400 group-hover:text-white transition-colors print:text-black print:w-4 print:h-4" />
                        <span className="font-medium print:text-sm">WeChat: {currentData.contact.wechat}</span>
                     </motion.div>
                  </div>
                </div>
             </div>
          </motion.section>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 text-center text-sm text-gray-400 border-t border-zinc-900 bg-zinc-950/50 backdrop-blur-sm print:hidden">
        <p>© {new Date().getFullYear()} {currentData.name}. {uiLabels.rights}</p>
        <p className="mt-3 text-xs opacity-75 font-medium">{uiLabels.builtWith}</p>
      </footer>

      {/* AI Chat Widget */}
      <ChatWidget lang={lang} />
    </div>
  );
}

export default App;