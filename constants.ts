import { ResumeData, UIContent, Language } from './types';

const COMMON_CONTACT = {
  phone: "15735646062",
  email: "645133910@qq.com",
  wechat: "xq128swag"
};

const PORTFOLIO_LINK = "https://fxpn6ttr59g.feishu.cn/wiki/FS7ow727qiJILSknV7wcf9eBnvc?from=from_copylink";

export const RESUME_DATA: Record<Language, ResumeData> = {
  zh: {
    name: "张强",
    age: 27,
    role: "声音设计师 / 音频策划",
    contact: COMMON_CONTACT,
    portfolioLink: PORTFOLIO_LINK,
    summary: [
      "拥有3年游戏音频设计与5年音频行业经验，专注于为移动端及休闲游戏提供高质量、风格化的声音解决方案。",
      "精通从音频策划、音效设计、AI工具辅助创作到Wwise集成与测试的全流程。",
      "擅长运用Reaper、Pro Tools及各类效果器进行高效制作，并能利用Wwise引擎优化游戏内音频表现。",
      "致力于通过富有创意的声音设计，提升游戏的沉浸感与玩家体验。"
    ],
    experience: [
      {
        company: "凡游在线科技（成都）有限公司",
        role: "声音设计师 (S组)",
        period: "2024年02月 - 至今",
        location: "成都",
        description: [
          "主导《Jackpot Fever》《Battle Master》项目的整体音频设计，独立完成超过3000个音效资产的创作与集成，涵盖UI、角色、环境等模块。",
          "引入AI工具（GPT-Sovits）进行语音生成与风格化处理，使用Suno进行配乐的素材制作，将部分配音、配乐素材的制作效率提升了约50%。",
          "参与音效相关的策划工作，给出音频在游戏内所实现效果的具体描述并对接。",
          "策划完成配音需求，脚本的编辑，对接配音演员，审核配音质量并反馈。",
          "参与音频测试工作，确保音频在游戏内的效果能够达到策划预期。"
        ]
      },
      {
        company: "成都帆点创想有限公司 iFun",
        role: "声音设计师 (音效组)",
        period: "2023年06月 - 2024年02月",
        location: "成都",
        description: [
          "主导并独立完成《LavaSlot》等项目的全流程音频制作，负责超过800个音频资产的设计、制作与集成，涵盖音乐、音效、UI反馈及角色配音。",
          "深度参与音频策划，根据游戏世界观与角色设定，撰写配音脚本及音频设计规范，确保声音风格与产品定位高度统一。",
          "作为音频接口人，引入音外包流程，包括演员遴选、录制指导与质量审核，确保配音情感与角色设定100%匹配，并获得项目组好评。"
        ]
      },
      {
        company: "成都嘉谊互娱科技有限公司",
        role: "音效师 (动效组)",
        period: "2021年10月 - 2023年07月",
        location: "成都",
        description: [
          "负责公司多款休闲手游《Winning Slots》《Bingo Riches》的核心音效设计与制作，深度理解休闲游戏“轻量、明快、正向反馈”的音频需求。",
          "为游戏内的核心循环（如合成、消除、点击）设计了一系列具有辨识度且令人愉悦的音效，有效提升了玩家的操作爽感与留存意愿。",
          "通过模块化、可复用的音效设计方法，在保证音频质量的同时，将单项目音效制作周期平均缩短了约15%。"
        ]
      },
      {
        company: "成都爱德米乐教育咨询有限公司",
        role: "录音师 (录音部)",
        period: "2019年08月 - 2021年08月",
        location: "成都",
        description: [
          "负责音频内容的全链路制作，包括前期录音棚设备调试、多轨录制，以及后期的剪辑、降噪、混音与母带处理。",
          "在高压环境下，高效管理录制日程，累计完成超300份高质量音频作业的后期制作，培养了优秀的客户（学员）沟通与需求理解能力。",
          "此经历夯实了在人声处理、音频净化与品质把控方面的坚实基础。"
        ]
      }
    ],
    skills: [
      {
        title: "音频设计 & 制作",
        items: ["声音设计", "音频策划", "互动音频逻辑", "拟音", "MIDI编曲"]
      },
      {
        title: "DAW & 工具",
        items: ["Reaper (精通)", "Pro Tools (熟练)", "Wwise (精通)", "Waves", "Fabfilter", "PA (熟练)"]
      },
      {
        title: "AI 工具应用",
        items: ["GPT-Sovits (语音合成与克隆)", "Sumo-AI (AI编曲辅助)"]
      }
    ]
  },
  en: {
    name: "Zhang Qiang",
    age: 27,
    role: "Sound Designer / Audio Planner",
    contact: COMMON_CONTACT,
    portfolioLink: PORTFOLIO_LINK,
    summary: [
      "3+ years of game audio design and 5+ years of audio industry experience, focusing on high-quality, stylized sound solutions for mobile and casual games.",
      "Proficient in the full pipeline from audio planning, sound design, AI-assisted creation to Wwise integration and testing.",
      "Expert in Reaper, Pro Tools, and various effect plugins for efficient production, optimizing in-game audio performance using Wwise.",
      "Committed to enhancing game immersion and player experience through creative sound design."
    ],
    experience: [
      {
        company: "Fanyou Online Technology (Chengdu)",
        role: "Sound Designer (S Team)",
        period: "Feb 2024 - Present",
        location: "Chengdu",
        description: [
          "Lead sound design for 'Jackpot Fever' and 'Battle Master', independently creating and integrating over 3000 assets (UI, characters, environments).",
          "Introduced AI tools (GPT-Sovits) for voice generation/stylization and Suno for music, improving efficiency by ~50%.",
          "Participated in audio planning, defining specific in-game audio effects and requirements.",
          "Managed voiceover pipeline: script editing, actor coordination, and quality review.",
          "Conducted audio testing to ensure implementation met planning expectations."
        ]
      },
      {
        company: "Chengdu Fantian Creative (iFun)",
        role: "Sound Designer (SFX Team)",
        period: "Jun 2023 - Feb 2024",
        location: "Chengdu",
        description: [
          "Led full audio production for 'LavaSlot', designing and integrating 800+ assets (music, SFX, UI, VO).",
          "Deeply involved in planning, writing VO scripts and design specs based on game lore for style consistency.",
          "Audio lead for outsourcing: managed casting, direction, and QA, achieving 100% character match."
        ]
      },
      {
        company: "Chengdu Jiayi Interactive Entertainment",
        role: "Sound Designer (Motion FX Team)",
        period: "Oct 2021 - Jul 2023",
        location: "Chengdu",
        description: [
          "Core sound design for 'Winning Slots' and 'Bingo Riches', focusing on 'lightweight, bright, positive' casual game audio.",
          "Designed recognizable, pleasing sounds for core loops (synthesis, match, click), enhancing player satisfaction.",
          "Used modular design to shorten production cycles by ~15% while maintaining quality."
        ]
      },
      {
        company: "Chengdu Admire Education Consulting",
        role: "Recording Engineer",
        period: "Aug 2019 - Aug 2021",
        location: "Chengdu",
        description: [
          "Responsible for full-link audio production: studio setup, recording, editing, mixing, and mastering.",
          "Managed tight schedules, completing 300+ high-quality audio tasks under pressure.",
          "Solidified foundation in vocal processing and quality control."
        ]
      }
    ],
    skills: [
      {
        title: "Audio Design & Production",
        items: ["Sound Design", "Audio Planning", "Interactive Logic", "Foley", "MIDI Arrangement"]
      },
      {
        title: "DAW & Tools",
        items: ["Reaper (Expert)", "Pro Tools (Proficient)", "Wwise (Expert)", "Waves", "Fabfilter", "PA (Proficient)"]
      },
      {
        title: "AI Tools",
        items: ["GPT-Sovits (TTS & Cloning)", "Sumo-AI (Composition Assist)"]
      }
    ]
  }
};

export const STATIC_TEXT: Record<Language, UIContent> = {
  zh: {
    navPortfolio: "作品集",
    available: "求职中",
    heroTitlePrefix: "打造沉浸式",
    heroTitleHighlight: "音频体验",
    heroDesc: "拥有3年游戏音频设计与5年音频行业经验。专注于移动端及休闲游戏的音效设计、Wwise集成与AI辅助创作。",
    viewPortfolio: "查看作品",
    downloadResume: "下载简历",
    experience: "工作经历",
    skills: "专业技能",
    contactTitle: "期待与您合作",
    contactDesc: "目前定居成都，正在寻找新的工作机会。欢迎联系。",
    chatWelcome: "您好！我是张强的 AI 助手。关于他的工作经历或技能，您有什么想了解的吗？",
    chatInput: "询问我的经历...",
    builtWith: "基于 React, Tailwind & Gemini AI 构建",
    rights: "保留所有权利"
  },
  en: {
    navPortfolio: "Portfolio",
    available: "Available for hire",
    heroTitlePrefix: "Crafting Immersive",
    heroTitleHighlight: "Audio Experiences",
    heroDesc: "Sound Designer with 3+ years in game audio and 5+ years in the industry. Specializing in sound design, Wwise integration, and AI-assisted workflows.",
    viewPortfolio: "View Portfolio",
    downloadResume: "Download Resume",
    experience: "Experience",
    skills: "Skills",
    contactTitle: "Ready to collaborate?",
    contactDesc: "Based in Chengdu and open to new opportunities. Let's discuss how my sound design can elevate your project.",
    chatWelcome: "Hello! I'm Zhang Qiang's AI assistant. Ask me anything about his experience or skills.",
    chatInput: "Ask about my experience...",
    builtWith: "Built with React, Tailwind & Gemini AI.",
    rights: "All rights reserved."
  }
};