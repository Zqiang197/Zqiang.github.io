import { GoogleGenAI, Chat } from "@google/genai";
import { RESUME_DATA } from "../constants";

// Fix for TypeScript/Deployment: Declare process and import.meta to avoid "Cannot find name" errors during build
declare const process: { env: { [key: string]: string | undefined } };
declare const importMeta: { env: { [key: string]: string | undefined } };

let chatSession: Chat | null = null;

// We use the Chinese data as the ground truth for the AI context
const DATA = RESUME_DATA.zh;

const formatResumeForPrompt = (): string => {
  return `
    Name: ${DATA.name}
    Role: ${DATA.role}
    Contact: Email ${DATA.contact.email}, WeChat ${DATA.contact.wechat}
    Portfolio: ${DATA.portfolioLink}
    
    Summary:
    ${DATA.summary.join('\n')}
    
    Experience:
    ${DATA.experience.map(exp => `
      - ${exp.role} at ${exp.company} (${exp.period}, ${exp.location})
      ${exp.description.map(d => `  * ${d}`).join('\n')}
    `).join('\n')}
    
    Skills:
    ${DATA.skills.map(s => `${s.title}: ${s.items.join(', ')}`).join('\n')}
  `;
};

// Helper to safely get env vars in various environments (Vite, CRA, Next.js, etc.)
const getEnvVar = (key: string): string | undefined => {
  // Check process.env (Standard/CRA)
  try {
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key];
    }
  } catch (e) { /* ignore */ }

  // Check import.meta.env (Vite)
  try {
    // @ts-ignore - Handle Vite types without explicit config
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
      // @ts-ignore
      return import.meta.env[key];
    }
    // Try VITE_ prefixed version commonly used in Vite
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[`VITE_${key}`]) {
        // @ts-ignore
        return import.meta.env[`VITE_${key}`];
      }
  } catch (e) { /* ignore */ }

  return undefined;
};

export const initializeChat = async (): Promise<void> => {
  const apiKey = getEnvVar('API_KEY');

  if (!apiKey) {
    console.warn("API Key not found in environment variables (API_KEY or VITE_API_KEY). Chat functionality will be limited.");
    return;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are a helpful, professional AI assistant representing Zhang Qiang (张强). 
        Your goal is to answer questions about his resume, skills, and experience to potential employers or recruiters.
        
        Here is his full resume context (in Chinese, but you should understand and translate as needed):
        ${formatResumeForPrompt()}
  
        Tone guidelines:
        - Be professional, polite, and concise.
        - Use the first person plural (e.g., "We believe Zhang's experience...") or refer to him as "Zhang" or "Mr. Zhang".
        - If asked about something not in the resume, politely state that the information isn't available in the current profile but offer to provide his contact info.
        - Highlight his expertise in Game Audio, Wwise, and AI tools integration when relevant.
        - If asked about salary expectations, mention he is looking for 17k-20k in Chengdu.
        - Always answer in the language the user asks (Chinese or English). If the user asks in English, reply in English. If they ask in Chinese, reply in Chinese.`,
      },
    });
  } catch (error) {
    console.error("Failed to initialize Gemini AI:", error);
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    await initializeChat();
    if (!chatSession) {
      return "Unable to connect to AI service. Please check API key configuration.";
    }
  }

  try {
    const response = await chatSession.sendMessage({ message });
    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    // If error is related to session validity, try re-initializing once
    if (!chatSession) {
        return "Connection lost. Please try again.";
    }
    return "An error occurred while communicating with the AI. Please try again later.";
  }
};