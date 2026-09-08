export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  links: {
    github: string;
    live?: string;
  };
  caseStudy: {
    summary: string;
    role: string;
    timeline: string;
    problem: string;
    approach: string;
    engineering: string;
    challenges: string;
    outcome?: string;
    learned: string;
  };
}

export const projects: Project[] = [
  {
    id: 'foraz',
    number: '01',
    title: 'FORAZ',
    category: 'AI / Windows / Automation',
    description: 'An AI-powered Windows assistant designed to interact with the desktop environment and automate everyday workflows.',
    technologies: ['Python', 'AI', 'Windows', 'Automation'],
    links: {
      github: '#', // TODO: Add GitHub link
      live: '#',   // TODO: Add Live link if any
    },
    caseStudy: {
      summary: 'FORAZ bridges the gap between AI and desktop operations, automating routine Windows tasks.',
      role: 'Creator & Lead Developer',
      timeline: '2024 - Present',
      problem: 'Windows users spend significant time on repetitive desktop tasks that could be automated. Existing AI assistants lack deep desktop integration.',
      approach: 'Built a Python-based intelligent agent that leverages system hooks and AI to interpret user commands and execute native Windows actions.',
      engineering: 'The architecture uses Python for system-level operations, hooking into Windows APIs. It integrates an LLM to parse natural language into actionable scripts.',
      challenges: 'Handling the variability of desktop environments and ensuring safe execution of AI-generated actions required robust sandboxing and validation mechanisms.',
      outcome: 'Successfully automated numerous desktop workflows, reducing manual effort significantly.',
      learned: 'Gained deep insights into Windows internals, AI prompt engineering, and building resilient automation pipelines.'
    }
  },
  {
    id: 'karigarai',
    number: '02',
    title: 'KarigarAI',
    category: 'AI / Mobile / Social Impact',
    description: 'An AI-powered mobile platform designed to help Indian artisans digitize, organize and grow their craft businesses.',
    technologies: ['React Native', 'Expo', 'Node.js', 'AI'],
    links: {
      github: '#',
      live: '#',
    },
    caseStudy: {
      summary: 'Empowering Indian artisans with digital tools to manage and scale their traditional businesses.',
      role: 'Mobile & Backend Developer',
      timeline: '2024',
      problem: 'Many talented artisans lack the digital literacy and tools to manage inventory, price their goods properly, and reach a wider market.',
      approach: 'Designed a mobile-first platform tailored for non-tech-savvy users, integrating AI to help with pricing and inventory categorization.',
      engineering: 'Built with React Native and Expo for cross-platform support. The backend uses Node.js with an AI API to assist users in vernacular languages.',
      challenges: 'Designing an intuitive UI for users with limited digital experience and ensuring the AI responses were culturally and contextually accurate.',
      outcome: 'Won accolades at hackathons and received positive feedback from initial user testing.',
      learned: 'Learned the importance of accessibility, vernacular support, and deploying React Native applications effectively.'
    }
  },
  {
    id: 'streakguard',
    number: '03',
    title: 'StreakGuard',
    category: 'Productivity / Mobile / Backend',
    description: 'A productivity platform combining habit tracking with developer-focused progress monitoring.',
    technologies: ['React Native', 'Expo', 'Node.js', 'REST API'],
    links: {
      github: '#',
      live: '#',
    },
    caseStudy: {
      summary: 'A developer-centric habit tracker that integrates coding streaks with daily routines.',
      role: 'Full Stack Developer',
      timeline: '2023 - 2024',
      problem: 'Developers often struggle to balance coding practice (like LeetCode or GitHub contributions) with healthy personal habits.',
      approach: 'Created a unified dashboard that tracks API-fetched developer metrics alongside custom personal habits.',
      engineering: 'React Native frontend interacting with a custom Node.js REST API. Uses cron jobs to sync data from external developer platforms.',
      challenges: 'Managing reliable background syncs and building a robust state management system in the mobile app.',
      outcome: 'A smooth, functional app that helps maintain a balanced developer lifestyle.',
      learned: 'Advanced REST API design, React Native animations, and background job scheduling.'
    }
  },
  {
    id: 'next-project-1',
    number: '04',
    title: 'Next Project',
    category: 'Category / Domain',
    description: 'An editable placeholder project description goes here.',
    technologies: ['Tech 1', 'Tech 2'],
    links: { github: '#' },
    caseStudy: {
      summary: 'Project summary placeholder.',
      role: 'Role',
      timeline: 'Timeline',
      problem: 'Problem statement placeholder.',
      approach: 'Approach description placeholder.',
      engineering: 'Engineering details placeholder.',
      challenges: 'Challenges faced placeholder.',
      learned: 'Learnings placeholder.'
    }
  },
  {
    id: 'next-project-2',
    number: '05',
    title: 'Next Project',
    category: 'Category / Domain',
    description: 'Another editable placeholder project description goes here.',
    technologies: ['Tech 1', 'Tech 2'],
    links: { github: '#' },
    caseStudy: {
      summary: 'Project summary placeholder.',
      role: 'Role',
      timeline: 'Timeline',
      problem: 'Problem statement placeholder.',
      approach: 'Approach description placeholder.',
      engineering: 'Engineering details placeholder.',
      challenges: 'Challenges faced placeholder.',
      learned: 'Learnings placeholder.'
    }
  }
];
