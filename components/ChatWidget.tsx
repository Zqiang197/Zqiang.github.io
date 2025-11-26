import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage, Language } from '../types';
import { STATIC_TEXT } from '../constants';

interface ChatWidgetProps {
  lang: Language;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  // Initialize the greeting message when the component mounts or lang changes, 
  // but only if it's the first message or if we want to reset.
  // For simplicity, we just ensure the first message matches the language if it's the "init" one.
  useEffect(() => {
    if (!hasInitialized.current) {
      setMessages([
        { id: 'init', role: 'model', text: STATIC_TEXT[lang].chatWelcome }
      ]);
      hasInitialized.current = true;
    } else {
        // If language changes, we could update the initial message if it's still visible,
        // but preserving chat history is usually better.
        // We will just leave existing messages as is.
    }
  }, []); // Run once on mount

  // Watch for language changes to update the initial message if we haven't started chatting yet
  useEffect(() => {
      setMessages(prev => {
          if (prev.length === 1 && prev[0].id === 'init') {
              return [{ id: 'init', role: 'model', text: STATIC_TEXT[lang].chatWelcome }];
          }
          return prev;
      });
  }, [lang]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(userMsg.text);

    const modelMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText
    };

    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const labels = STATIC_TEXT[lang];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none print:hidden">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800 flex flex-col overflow-hidden pointer-events-auto"
          >
            {/* Header */}
            <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-100">AI Resume Assistant</h3>
                  <p className="text-xs text-gray-400">Powered by Gemini 2.5</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-zinc-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-950/30">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-zinc-800 text-gray-200 border border-zinc-700 rounded-bl-none shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800 p-3 rounded-2xl rounded-bl-none border border-zinc-700 shadow-sm">
                    <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-zinc-900 border-t border-zinc-800">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={labels.chatInput}
                  className="w-full bg-zinc-800 text-gray-100 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !inputValue.trim()}
                  className="absolute right-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg flex items-center justify-center pointer-events-auto transition-colors z-50 relative"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {!isOpen && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-zinc-900"></span>
        )}
      </motion.button>
    </div>
  );
};