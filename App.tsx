import React, { useState, useEffect } from 'react';
import { RESUME_DATA, STATIC_TEXT } from './constants';
import { Language } from './types';
import { motion } from 'framer-motion';
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

function App() {
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState<Language>('zh');
  
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);
  const toggleLang = () => setLang(prev => prev === 'zh' ? 'en' : 'zh');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const currentData = RESUME_DATA[lang];
  const uiLabels = STATIC_TEXT[lang];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-zinc-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* Navigation / Header */}
      <nav className="fixed top-0 w-full z-40 bg-opacity-70 backdrop-blur-xl border-b border-gray-200 dark:border-zinc-800 transition-colors duration-500">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-bold text-xl tracking-tight"
          >
            {currentData.name}
          </motion.div>
          <div className="flex items-center gap-3 sm:gap-4">
            <a 
              href={currentData.portfolioLink}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex text-sm font-medium hover:text-indigo-500 transition-colors items-center gap-1"
            >
              {uiLabels.navPortfolio} <ExternalLink size={14} />
            </a>
            
            <button 
              onClick={toggleLang}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1 text-sm font-medium"
              aria-label="Toggle Language"
            >
              <Languages size={20} />
              <span className="uppercase">{lang}</span>
            </button>

            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        
        <motion.div 
          key={lang} // Force re-animation on language change
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-24"
        >
          {/* Hero Section */}
          <section className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                {uiLabels.available}
              </div>
              <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-zinc-500">
                {uiLabels.heroTitlePrefix} <br/>
                <span className="text-indigo-600 dark:text-indigo-500">{uiLabels.heroTitleHighlight}</span>
              </h1>
              <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {uiLabels.heroDesc}
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <a 
                href={currentData.portfolioLink}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-medium hover:scale-105 active:scale-95 transition-transform duration-200 flex items-center gap-2"
              >
                {uiLabels.viewPortfolio} <ExternalLink size={18} />
              </a>
              <button 
                className="px-8 py-4 bg-gray-200 dark:bg-zinc-800 rounded-full font-medium hover:bg-gray-300 dark:hover:bg-zinc-700 transition-colors flex items-center gap-2"
                onClick={() => window.print()}
              >
                {uiLabels.downloadResume} <Download size={18} />
              </button>
            </motion.div>
          </section>

          {/* Stats / Skills Grid */}
          <section>
             <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold">{uiLabels.skills}</h2>
              <div className="h-px flex-1 bg-gray-200 dark:bg-zinc-800"></div>
            </motion.div>
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentData.skills.map((skill, idx) => (
                <div key={idx} className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-4 text-indigo-500">
                    {idx === 0 && <Music size={32} />}
                    {idx === 1 && <Headphones size={32} />}
                    {idx === 2 && <Cpu size={32} />}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{skill.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-zinc-800 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </section>

          {/* Experience Section */}
          <section className="space-y-10">
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold">{uiLabels.experience}</h2>
              <div className="h-px flex-1 bg-gray-200 dark:bg-zinc-800"></div>
            </motion.div>

            <div className="space-y-12">
              {currentData.experience.map((job, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  className="relative pl-8 md:pl-0"
                >
                  <div className="md:grid md:grid-cols-4 gap-8">
                    <div className="md:col-span-1 mb-2 md:mb-0">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 flex flex-col">
                        <span>{job.period}</span>
                        <span className="flex items-center gap-1 mt-1 text-xs uppercase tracking-wide opacity-70">
                          <MapPin size={10} /> {job.location}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-3 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{job.role}</h3>
                        <div className="text-indigo-600 dark:text-indigo-400 font-medium text-lg">{job.company}</div>
                      </div>
                      <ul className="space-y-3">
                        {job.description.map((desc, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                            <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-gray-400 dark:text-zinc-600" />
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section>
             <motion.div variants={itemVariants} className="bg-gray-900 dark:bg-zinc-900 rounded-3xl p-10 sm:p-16 text-center space-y-8 relative overflow-hidden">
                {/* Decorative background blur */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                  <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 space-y-6">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white">{uiLabels.contactTitle}</h2>
                  <p className="text-gray-400 max-w-xl mx-auto text-lg">
                    {uiLabels.contactDesc}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 pt-4">
                     <a href={`mailto:${currentData.contact.email}`} className="flex items-center justify-center gap-2 text-white hover:text-indigo-400 transition-colors">
                       <div className="p-3 bg-white/10 rounded-full">
                         <Mail size={20} />
                       </div>
                       <span className="font-medium">{currentData.contact.email}</span>
                     </a>
                     <div className="flex items-center justify-center gap-2 text-white">
                        <div className="p-3 bg-white/10 rounded-full">
                          <Phone size={20} />
                        </div>
                        <span className="font-medium">{currentData.contact.phone}</span>
                     </div>
                     <div className="flex items-center justify-center gap-2 text-white">
                        <div className="p-3 bg-white/10 rounded-full">
                          <Mic2 size={20} />
                        </div>
                        <span className="font-medium">WeChat: {currentData.contact.wechat}</span>
                     </div>
                  </div>
                </div>
             </motion.div>
          </section>

        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-500 dark:text-gray-600 border-t border-gray-200 dark:border-zinc-900">
        <p>© {new Date().getFullYear()} {currentData.name}. {uiLabels.rights}</p>
        <p className="mt-2 text-xs opacity-75">{uiLabels.builtWith}</p>
      </footer>

      {/* AI Chat Widget */}
      <ChatWidget lang={lang} />
    </div>
  );
}

export default App;