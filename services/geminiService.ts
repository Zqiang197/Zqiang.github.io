import { GoogleGenAI, Chat } from "@google/genai";
import { RESUME_DATA } from "../constants";

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

export const initializeChat = async (): Promise<void> => {
  // Safely check for API key to avoid "process is not defined" crashes in pure browser builds
  let apiKey: string | undefined;
  try {
    apiKey = process.env.API_KEY;
  } catch (e) {
    // Ignore reference error if process is undefined
  }

  if (!apiKey) {
    console.warn("API Key not found. Chat functionality will be limited.");
    return;
  }

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
    return "An error occurred while communicating with the AI. Please try again later.";
  }
};