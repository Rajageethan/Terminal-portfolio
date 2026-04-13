export default class CommandProcessor {
  constructor(user, projects, skills, currentPath, setCurrentPath) {
    this.user = user;
    this.projects = projects;
    this.skills = skills;
    this.currentPath = currentPath;
    this.setCurrentPath = setCurrentPath;
  }

  async processCommand(command) {
    const [cmd, ...args] = command.toLowerCase().split(' ');

    switch (cmd) {
      case 'welcome':
        return this.welcome();
      case 'help':
        return this.help();
      case 'whoami':
        return this.whoami();
      case 'about':
        return this.about();
      case 'education':
        return this.education();
      case 'experience':
        return this.experience();
      case 'skills':
        return this.skills_command();
      case 'projects':
        return this.projects_command();
      case 'achievements':
        return this.achievements();
      case 'contact':
        return this.contact();
      case 'resume':
        return this.resume();
      case 'clear':
        return [];
      // Fun commands
      case 'fun':
      case 'games':
        return this.funCommands();
      case 'dino':
        return this.dino();
      case 'matrix':
        return this.matrix();
      case 'coffee':
        return this.coffee();
      case 'joke':
        return this.joke();
      case 'quote':
        return this.motivationalQuote();
      case 'morse':
        return this.morseCode(args);
      case 'ascii':
        return this.asciiArt(args);
      case 'weather':
        return this.weather();
      case 'time':
        return this.currentTime();
      case 'fortune':
        return this.fortune();
      case 'hack':
      case 'sudo':
        return this.funnyResponses(cmd);
      // New commands
      case 'neofetch':
        return this.neofetch();
      case 'social':
        return this.social();
      case 'project':
        return this.projectDetail(args);
      case 'man':
        return this.manPage(args);
      default:
        return this.commandNotFound(command);
    }
  }

  welcome() {
    const asciiFull = `██████╗  █████╗      ██╗ █████╗  ██████╗ ███████╗███████╗████████╗██╗  ██╗ █████╗ ███╗   ██╗
██╔══██╗██╔══██╗     ██║██╔══██╗██╔════╝ ██╔════╝██╔════╝╚══██╔══╝██║  ██║██╔══██╗████╗  ██║
██████╔╝███████║     ██║███████║██║  ███╗█████╗  █████╗     ██║   ███████║███████║██╔██╗ ██║
██╔══██╗██╔══██║██   ██║██╔══██║██║   ██║██╔══╝  ██╔══╝     ██║   ██╔══██║██╔══██║██║╚██╗██║
██║  ██║██║  ██║╚█████╔╝██║  ██║╚██████╔╝███████╗███████╗   ██║   ██║  ██║██║  ██║██║ ╚████║
╚═╝  ╚═╝╚═╝  ╚═╝ ╚════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝`;

    return [
      { type: 'ascii-desktop', content: asciiFull },
      { type: 'mobile-name', content: 'RAJAGEETHAN A' },
      { type: 'text', content: '' },
      { type: 'header', content: 'SOFTWARE DEVELOPER | COMPUTER SCIENCE STUDENT' },
      { type: 'text', content: 'Builder, Dreamer, Problem Solver' },
      { type: 'text', content: 'Thanjavur, Tamil Nadu, India' },
      { type: 'text', content: '' },
      { type: 'success', content: 'Welcome to my interactive terminal portfolio' },
      { type: 'text', content: `Type 'help' for professional info or 'fun' for interactive features` },
      { type: 'text', content: '' },
    ];
  }

  help() {
    return [
      { type: 'text', content: 'RAJAGEETHAN A - SOFTWARE DEVELOPER' },
      { type: 'text', content: '═'.repeat(40) },
      { type: 'text', content: '' },
      { type: 'text', content: 'Professional Commands:' },
      { type: 'text', content: '─'.repeat(22) },
      { type: 'text', content: '  whoami             - Personal introduction' },
      { type: 'text', content: '  about              - Professional summary' },
      { type: 'text', content: '  education          - Academic background' },
      { type: 'text', content: '  experience         - Work experience' },
      { type: 'text', content: '  skills             - Technical competencies' },
      { type: 'text', content: '  projects           - Portfolio showcase' },
      { type: 'text', content: '  project <name>     - Deep dive into project' },
      { type: 'text', content: '  achievements       - Awards & certifications' },
      { type: 'text', content: '  contact            - Get in touch' },
      { type: 'text', content: '  social             - All social links' },
      { type: 'text', content: '  resume             - Download CV' },
      { type: 'text', content: '' },
      { type: 'text', content: 'Fun & Interactive:' },
      { type: 'text', content: '─'.repeat(18) },
      { type: 'text', content: '  fun                - Show all fun commands' },
      { type: 'text', content: '  dino               - Play Chrome dino game' },
      { type: 'text', content: '  matrix             - Enter the Matrix' },
      { type: 'text', content: '  joke               - Programming joke' },
      { type: 'text', content: '  quote              - Motivational quote' },
      { type: 'text', content: '  coffee             - Brew some coffee' },
      { type: 'text', content: '  neofetch           - System info display' },
      { type: 'text', content: '' },
      { type: 'text', content: 'System Commands:' },
      { type: 'text', content: '─'.repeat(16) },
      { type: 'text', content: '  help               - Show this help' },
      { type: 'text', content: '  man <cmd>          - Detailed command manual' },
      { type: 'text', content: '  clear              - Clear terminal' },
      { type: 'text', content: '  history            - Command history' },
      { type: 'text', content: '  theme              - Change color theme' },
      { type: 'text', content: '  crt                - Toggle CRT effect' },
      { type: 'text', content: '  reboot             - Replay boot sequence' },
      { type: 'text', content: '' },
      { type: 'text', content: 'Navigation:' },
      { type: 'text', content: '  ↑/↓ arrows        - Command history' },
      { type: 'text', content: '  Tab                - Auto-complete' },
      { type: 'text', content: '  Ctrl+L             - Clear screen' },
      { type: 'text', content: '  Click output       - Copy to clipboard' },
      { type: 'text', content: '' },
      { type: 'success', content: 'Type any command to get started!' },
      { type: 'text', content: '' },
    ];
  }

  about() {
    return [
      { type: 'text', content: 'PROFESSIONAL SUMMARY' },
      { type: 'text', content: '═'.repeat(20) },
      { type: 'text', content: '' },
      { type: 'text', content: 'Passionate Computer Science student and self-taught developer with' },
      { type: 'text', content: 'proven expertise in AI/ML, mobile development, and full-stack' },
      { type: 'text', content: 'web applications. Successfully delivered 6+ production-ready' },
      { type: 'text', content: 'projects across diverse technology domains.' },
      { type: 'text', content: '' },
      { type: 'text', content: 'CORE COMPETENCIES:' },
      { type: 'text', content: '• AI/ML Development: RAG pipelines, LangChain, NLP processing' },
      { type: 'text', content: '• Mobile Development: React Native, Expo, cross-platform apps' },
      { type: 'text', content: '• Backend Development: FastAPI, Flask, real-time systems' },
      { type: 'text', content: '• Frontend Development: React, responsive design, modern UI/UX' },
      { type: 'text', content: '• Database & Cloud: Firebase, MongoDB, authentication systems' },
      { type: 'text', content: '• System Integration: APIs, real-time notifications, geolocation' },
      { type: 'text', content: '' },
      { type: 'text', content: 'TECHNICAL PHILOSOPHY:' },
      { type: 'text', content: '"Building strong foundations before specialization"' },
      { type: 'text', content: '' },
      { type: 'text', content: 'PERSONAL INTERESTS:' },
      { type: 'text', content: '• FPV drone technology and racing' },
      { type: 'text', content: '• Automotive engineering and mechanics' },
      { type: 'text', content: '• Artificial Intelligence and Machine Learning research' },
      { type: 'text', content: '• Tamil literature and cultural preservation' },
      { type: 'text', content: '' },
    ];
  }

  ls(args) {
    const path = this.currentPath;
    let items = [];

    if (path === '~') {
      items = [
        { name: 'about.txt', type: 'file', color: 'text-white' },
        { name: 'projects/', type: 'dir', color: 'text-blue-400' },
        { name: 'skills/', type: 'dir', color: 'text-blue-400' },
        { name: 'contact.txt', type: 'file', color: 'text-white' },
        { name: 'resume.pdf', type: 'file', color: 'text-red-400' },
      ];
    } else if (path === '~/projects') {
      items = this.projects.map(project => ({
        name: `${project.name.toLowerCase().replace(/\s+/g, '-')}.md`,
        type: 'file',
        color: 'text-green-400'
      }));
    } else if (path === '~/skills') {
      const categories = ['frontend', 'backend', 'database', 'tools'];
      items = categories.map(cat => ({
        name: `${cat}.txt`,
        type: 'file',
        color: 'text-yellow-400'
      }));
    }

    const output = [];
    items.forEach(item => {
      output.push({ type: 'text', content: item.name });
    });

    return output.length ? output : [{ type: 'text', content: 'Directory is empty.' }];
  }

  cat(args) {
    if (!args.length) {
      return [{ type: 'text', content: 'cat: missing file operand' }];
    }

    const filename = args[0];

    if (filename === 'about.txt') {
      return this.about();
    }

    if (filename === 'contact.txt') {
      return this.contact();
    }

    if (filename === 'resume.pdf') {
      return [
        { type: 'text', content: 'Opening resume.pdf...' },
        { type: 'text', content: 'This would typically open your PDF resume.' },
        { type: 'text', content: '' },
      ];
    }

    return [{ type: 'text', content: `cat: ${filename}: No such file or directory` }];
  }

  cd(args) {
    if (!args.length || args[0] === '~') {
      this.setCurrentPath('~');
      return [];
    }

    const dir = args[0];
    const currentPath = this.currentPath;

    if (dir === '..') {
      if (currentPath !== '~') {
        this.setCurrentPath('~');
      }
      return [];
    }

    if (currentPath === '~') {
      if (dir === 'projects' || dir === 'projects/') {
        this.setCurrentPath('~/projects');
        return [];
      } else if (dir === 'skills' || dir === 'skills/') {
        this.setCurrentPath('~/skills');
        return [];
      }
    }

    return [{ type: 'text', content: `cd: ${dir}: No such file or directory` }];
  }

  pwd() {
    return [{ type: 'text', content: this.currentPath }];
  }

  whoami() {
    return [
      { type: 'text', content: 'RAJAGEETHAN A' },
      { type: 'text', content: '═'.repeat(13) },
      { type: 'text', content: '' },
      { type: 'text', content: 'Role:        Software Developer' },
      { type: 'text', content: 'Education:   Computer Science Student' },
      { type: 'text', content: 'Location:    Thanjavur, Tamil Nadu, India' },
      { type: 'text', content: 'Focus:       Backend Development & System Design' },
      { type: 'text', content: '' },
      { type: 'text', content: 'PHILOSOPHY:' },
      { type: 'text', content: '"Building strong foundations before specialization"' },
      { type: 'text', content: '' },
      { type: 'text', content: 'Currently focused on mastering core programming concepts' },
      { type: 'text', content: 'and building reliable, scalable software systems.' },
      { type: 'text', content: '' },
    ];
  }

  contact() {
    return [
      { type: 'text', content: 'PROFESSIONAL CONTACT' },
      { type: 'text', content: '═'.repeat(20) },
      { type: 'text', content: '' },
      {
        type: 'table',
        headers: ['Platform', 'Contact Information', 'Purpose'],
        rows: [
          ['Email', 'rajageethan18@gmail.com', 'Professional inquiries'],
          ['Phone', '+91 95666 32717', 'Direct communication'],
          ['LinkedIn', 'linkedin.com/in/rajageethan-a', 'Professional network'],
          ['GitHub', 'github.com/rajageethan', 'Code repositories'],
          ['Portfolio', 'rajageethan.dev', 'Complete showcase']
        ]
      },
      { type: 'text', content: '' },
      { type: 'text', content: 'BEST WAYS TO REACH ME:' },
      { type: 'text', content: '─'.repeat(23) },
      { type: 'text', content: '1. Email for formal communications and opportunities' },
      { type: 'text', content: '2. LinkedIn for professional networking' },
      { type: 'text', content: '3. GitHub to view my code and contributions' },
      { type: 'text', content: '4. Phone for urgent matters' },
      { type: 'text', content: '' },
      { type: 'text', content: 'AVAILABILITY:' },
      { type: 'text', content: '• Open to internship opportunities' },
      { type: 'text', content: '• Available for freelance projects' },
      { type: 'text', content: '• Interested in collaborative learning' },
      { type: 'text', content: '• Happy to discuss technology and development' },
      { type: 'text', content: '' },
      { type: 'success', content: 'I respond to professional inquiries within 24 hours' },
      { type: 'text', content: '' },
    ];
  }

  skills_command() {
    return [
      { type: 'text', content: 'TECHNICAL COMPETENCIES' },
      { type: 'text', content: '═'.repeat(21) },
      { type: 'text', content: '' },
      { type: 'text', content: 'PROGRAMMING LANGUAGES:' },
      { type: 'text', content: '─'.repeat(22) },
      { type: 'progress', label: 'JavaScript/ES6+', value: 90 },
      { type: 'progress', label: 'Python', value: 85 },
      { type: 'progress', label: 'TypeScript', value: 75 },
      { type: 'progress', label: 'HTML5/CSS3', value: 85 },
      { type: 'text', content: '' },
      { type: 'text', content: 'FRONTEND & WEB:' },
      { type: 'text', content: '─'.repeat(15) },
      { type: 'progress', label: 'React.js', value: 90 },
      { type: 'progress', label: 'Component Design', value: 85 },
      { type: 'progress', label: 'Responsive Design', value: 85 },
      { type: 'progress', label: 'Modern CSS', value: 80 },
      { type: 'text', content: '' },
      { type: 'text', content: 'MOBILE DEVELOPMENT:' },
      { type: 'text', content: '─'.repeat(19) },
      { type: 'progress', label: 'React Native', value: 90 },
      { type: 'progress', label: 'Expo Framework', value: 90 },
      { type: 'progress', label: 'Cross-platform', value: 85 },
      { type: 'progress', label: 'Mobile UI/UX', value: 80 },
      { type: 'text', content: '' },
      { type: 'text', content: 'BACKEND & APIs:' },
      { type: 'text', content: '─'.repeat(15) },
      { type: 'progress', label: 'FastAPI', value: 85 },
      { type: 'progress', label: 'Flask', value: 75 },
      { type: 'progress', label: 'Node.js', value: 70 },
      { type: 'progress', label: 'REST APIs', value: 80 },
      { type: 'text', content: '' },
      { type: 'text', content: 'AI/ML & DATA:' },
      { type: 'text', content: '─'.repeat(13) },
      { type: 'progress', label: 'LangChain', value: 75 },
      { type: 'progress', label: 'ChromaDB', value: 70 },
      { type: 'progress', label: 'RAG Pipelines', value: 75 },
      { type: 'progress', label: 'NLP Processing', value: 70 },
      { type: 'text', content: '' },
      { type: 'text', content: 'DATABASE & CLOUD:' },
      { type: 'text', content: '─'.repeat(17) },
      { type: 'progress', label: 'Firebase', value: 90 },
      { type: 'progress', label: 'MongoDB', value: 70 },
      { type: 'progress', label: 'Real-time DB', value: 85 },
      { type: 'progress', label: 'Authentication', value: 85 },
      { type: 'text', content: '' },
      { type: 'text', content: 'DEVELOPMENT TOOLS:' },
      { type: 'text', content: '─'.repeat(18) },
      { type: 'progress', label: 'Git/GitHub', value: 95 },
      { type: 'progress', label: 'VS Code', value: 95 },
      { type: 'progress', label: 'Project Management', value: 85 },
      { type: 'progress', label: 'Documentation', value: 80 },
      { type: 'text', content: '' },
      { type: 'success', content: 'Proven expertise through 6+ completed projects across AI, mobile, and web domains' },
      { type: 'text', content: '' },
    ];
  }

  projects_command() {
    return [
      { type: 'text', content: 'PROJECT PORTFOLIO' },
      { type: 'text', content: '═'.repeat(17) },
      { type: 'text', content: '' },
      {
        type: 'table',
        headers: ['Project', 'Primary Tech', 'Domain', 'Status'],
        rows: [
          ['AI Legal Assistant', 'FastAPI, LangChain, ChromaDB', 'AI/ML', 'Completed'],
          ['ShareWheels', 'React Native, Firebase', 'Mobile', 'Completed'],
          ['Blood Donor App', 'React Native, Firebase', 'Mobile', 'Completed'],
          ['Telegraph Simulator', 'React Native, Expo', 'Mobile', 'Completed'],
          ['Thirukkural Daily', 'Flask, Firebase', 'Web', 'Completed'],
          ['Terminal Portfolio', 'React, JavaScript', 'Web', 'Live']
        ]
      },
      { type: 'text', content: '' },
      { type: 'text', content: 'FEATURED PROJECTS:' },
      { type: 'text', content: '─'.repeat(18) },
      { type: 'text', content: '' },
      { type: 'success', content: 'AI Legal Assistant' },
      { type: 'text', content: '   Tech Stack: FastAPI, LangChain, ChromaDB, Firebase' },
      { type: 'text', content: '   • Developed AI-powered legal assistant with RAG pipelines' },
      { type: 'text', content: '   • Implemented intelligent document search and analysis' },
      { type: 'text', content: '   • Integrated NLP models for legal text processing' },
      { type: 'text', content: '   • Firebase authentication and data management' },
      { type: 'text', content: '' },
      { type: 'success', content: 'ShareWheels - Carpooling Platform' },
      { type: 'text', content: '   Tech Stack: Expo, React Native, Firebase' },
      { type: 'text', content: '   • Unified app for city and long-distance carpooling' },
      { type: 'text', content: '   • Real-time ride listings and matching system' },
      { type: 'text', content: '   • Driver verification and secure trip management' },
      { type: 'text', content: '   • Cross-platform mobile application' },
      { type: 'text', content: '' },
      { type: 'success', content: 'Blood Donor Application' },
      { type: 'text', content: '   Tech Stack: Expo, React Native, Firebase' },
      { type: 'text', content: '   • Emergency blood donation platform' },
      { type: 'text', content: '   • Real-time notifications for urgent requests' },
      { type: 'text', content: '   • Proximity-based donor-seeker matching' },
      { type: 'text', content: '   • Geolocation and emergency response features' },
      { type: 'text', content: '' },
      { type: 'text', content: 'OTHER NOTABLE PROJECTS:' },
      { type: 'text', content: '─'.repeat(23) },
      { type: 'text', content: '• Telegraph Machine Simulator - Morse code with authentic sound' },
      { type: 'text', content: '• Thirukkural Daily App - Tamil literature promotion platform' },
      { type: 'text', content: '• Terminal Portfolio - Interactive command-line interface' },
      { type: 'text', content: '' },
      { type: 'text', content: 'TECHNICAL HIGHLIGHTS:' },
      { type: 'text', content: '• AI/ML integration with RAG pipelines' },
      { type: 'text', content: '• Cross-platform mobile development' },
      { type: 'text', content: '• Real-time systems and notifications' },
      { type: 'text', content: '• Firebase backend integration' },
      { type: 'text', content: '• Modern web frameworks and APIs' },
      { type: 'text', content: '' },
    ];
  }

  education() {
    return [
      { type: 'text', content: 'EDUCATIONAL BACKGROUND' },
      { type: 'text', content: '═'.repeat(22) },
      { type: 'text', content: '' },
      {
        type: 'table',
        headers: ['Degree', 'Institution', 'Year', 'Status'],
        rows: [
          ['B.Tech Computer Science', 'Engineering College', '2020-2024', 'Pursuing'],
          ['Higher Secondary', 'State Board', '2018-2020', 'Completed'],
          ['Secondary School', 'CBSE/State Board', '2017-2018', 'Completed']
        ]
      },
      { type: 'text', content: '' },
      { type: 'text', content: 'RELEVANT COURSEWORK:' },
      { type: 'text', content: '• Data Structures and Algorithms' },
      { type: 'text', content: '• Database Management Systems' },
      { type: 'text', content: '• Operating Systems' },
      { type: 'text', content: '• Computer Networks' },
      { type: 'text', content: '• Software Engineering' },
      { type: 'text', content: '• Object-Oriented Programming' },
      { type: 'text', content: '' },
      { type: 'success', content: 'Strong academic foundation in computer science fundamentals' },
      { type: 'text', content: '' },
    ];
  }

  experience() {
    return [
      { type: 'text', content: 'PROFESSIONAL EXPERIENCE' },
      { type: 'text', content: '═'.repeat(23) },
      { type: 'text', content: '' },
      { type: 'text', content: 'PROJECT DEVELOPMENT EXPERIENCE:' },
      { type: 'text', content: '─'.repeat(32) },
      { type: 'text', content: '' },
      { type: 'text', content: 'AI/ML Developer' },
      { type: 'text', content: '   Project: AI Legal Assistant' },
      { type: 'text', content: '   Duration: 2024' },
      { type: 'text', content: '   • Developed AI-powered legal document analysis system' },
      { type: 'text', content: '   • Implemented RAG pipelines using LangChain and ChromaDB' },
      { type: 'text', content: '   • Integrated NLP models for intelligent text processing' },
      { type: 'text', content: '   • Built FastAPI backend with Firebase authentication' },
      { type: 'text', content: '' },
      { type: 'text', content: 'Mobile App Developer' },
      { type: 'text', content: '   Projects: ShareWheels, Blood Donor App, Telegraph Simulator' },
      { type: 'text', content: '   Duration: 2023 - 2024' },
      { type: 'text', content: '   • Developed 3+ cross-platform mobile applications' },
      { type: 'text', content: '   • Implemented real-time features and notifications' },
      { type: 'text', content: '   • Created location-based matching algorithms' },
      { type: 'text', content: '   • Integrated Firebase for backend services' },
      { type: 'text', content: '' },
      { type: 'text', content: 'Full-Stack Developer' },
      { type: 'text', content: '   Projects: Thirukkural Daily, Terminal Portfolio' },
      { type: 'text', content: '   Duration: 2023 - Present' },
      { type: 'text', content: '   • Built web applications using Flask and React' },
      { type: 'text', content: '   • Designed responsive user interfaces' },
      { type: 'text', content: '   • Implemented modern web development practices' },
      { type: 'text', content: '   • Focused on performance optimization and UX' },
      { type: 'text', content: '' },
      { type: 'text', content: 'KEY ACHIEVEMENTS:' },
      { type: 'text', content: '• Successfully delivered 6+ production-ready applications' },
      { type: 'text', content: '• Demonstrated expertise across AI/ML, mobile, and web domains' },
      { type: 'text', content: '• Self-taught advanced technologies through hands-on projects' },
      { type: 'text', content: '• Built scalable systems with modern architecture patterns' },
      { type: 'text', content: '' },
      { type: 'warning', content: 'Actively seeking internship and full-time opportunities' },
      { type: 'text', content: '' },
    ];
  }

  achievements() {
    return [
      { type: 'text', content: 'ACHIEVEMENTS & CERTIFICATIONS' },
      { type: 'text', content: '═'.repeat(29) },
      { type: 'text', content: '' },
      { type: 'text', content: 'TECHNICAL ACHIEVEMENTS:' },
      { type: 'text', content: '─'.repeat(23) },
      { type: 'text', content: '• Built responsive terminal portfolio from scratch' },
      { type: 'text', content: '• Mastered React development with modern hooks' },
      { type: 'text', content: '• Implemented complex state management systems' },
      { type: 'text', content: '• Created reusable component architectures' },
      { type: 'text', content: '' },
      { type: 'text', content: 'LEARNING MILESTONES:' },
      { type: 'text', content: '─'.repeat(20) },
      { type: 'text', content: '• Deep understanding of JavaScript fundamentals' },
      { type: 'text', content: '• Proficient in version control with Git' },
      { type: 'text', content: '• Experience with modern development tools' },
      { type: 'text', content: '• Strong problem-solving and debugging skills' },
      { type: 'text', content: '' },
      { type: 'text', content: 'PERSONAL INTERESTS:' },
      { type: 'text', content: '─'.repeat(19) },
      { type: 'text', content: '• FPV Drone Racing and Technology' },
      { type: 'text', content: '• Automotive Engineering and Mechanics' },
      { type: 'text', content: '• AI/ML and Emerging Technologies' },
      { type: 'text', content: '' },
      { type: 'success', content: 'Continuously learning and building strong technical foundations' },
      { type: 'text', content: '' },
    ];
  }

  resume() {
    return [
      { type: 'text', content: 'RESUME / CV DOWNLOAD' },
      { type: 'text', content: '═'.repeat(20) },
      { type: 'text', content: '' },
      { type: 'text', content: 'My complete resume is available for download:' },
      { type: 'text', content: '' },
      {
        type: 'link',
        content: 'Download CV (PDF)',
        url: './resume.pdf',
        ariaLabel: 'Download Rajageethan A resume PDF'
      },
      { type: 'text', content: '' },
      { type: 'text', content: 'RESUME HIGHLIGHTS:' },
      { type: 'text', content: '• Professional summary and contact information' },
      { type: 'text', content: '• Complete educational background' },
      { type: 'text', content: '• Technical skills and competencies' },
      { type: 'text', content: '• Project portfolio and achievements' },
      { type: 'text', content: '• References and recommendations' },
      { type: 'text', content: '' },
      { type: 'success', content: 'Feel free to download and review my complete professional profile' },
      { type: 'text', content: '' },
    ];
  }



  // Fun Commands
  funCommands() {
    return [
      { type: 'text', content: 'FUN & INTERACTIVE COMMANDS' },
      { type: 'text', content: '═'.repeat(26) },
      { type: 'text', content: '' },
      { type: 'text', content: 'Games & Entertainment:' },
      { type: 'text', content: '─'.repeat(22) },
      { type: 'text', content: '  dino               - Play the classic Chrome dino game' },
      { type: 'text', content: '  matrix             - Experience the digital rain' },
      { type: 'text', content: '' },
      { type: 'text', content: 'Utilities & Fun:' },
      { type: 'text', content: '─'.repeat(16) },
      { type: 'text', content: '  joke               - Random programming joke' },
      { type: 'text', content: '  quote              - Inspirational developer quote' },
      { type: 'text', content: '  coffee             - Brew some virtual coffee' },
      { type: 'text', content: '  weather            - Check current weather' },
      { type: 'text', content: '  time               - Display current time' },
      { type: 'text', content: '  fortune            - Get your fortune' },
      { type: 'text', content: '' },
      { type: 'text', content: 'Text Tools:' },
      { type: 'text', content: '─'.repeat(11) },
      { type: 'text', content: '  morse <text>       - Convert text to Morse code' },
      { type: 'text', content: '  ascii <text>       - Generate ASCII art' },
      { type: 'text', content: '' },
      { type: 'text', content: 'Easter Eggs:' },
      { type: 'text', content: '─'.repeat(12) },
      { type: 'text', content: '  Try: sudo, vim, exit, rm -rf' },
      { type: 'text', content: '  And discover more hidden commands...' },
      { type: 'text', content: '' },
      { type: 'success', content: 'Have fun exploring! These showcase my creative side 🎮' },
      { type: 'text', content: '' },
    ];
  }

  dino() {
    return [
      { type: 'text', content: 'CHROME DINO GAME' },
      { type: 'text', content: '═'.repeat(16) },
      { type: 'text', content: '' },
      { type: 'text', content: 'Get ready for some nostalgic gaming!' },
      { type: 'text', content: '' },
      { type: 'game', content: 'dino-runner' },
      { type: 'text', content: '' },
      { type: 'text', content: 'Controls: SPACEBAR or ↑ to jump!' },
      { type: 'text', content: 'Avoid the cacti and beat your high score!' },
      { type: 'text', content: '' },
      { type: 'text', content: 'Fun fact: This is the same game that appears when' },
      { type: 'text', content: 'your internet is down in Chrome browser!' },
      { type: 'text', content: '' },
    ];
  }

  matrix() {
    return [
      { type: 'text', content: 'ENTERING THE MATRIX...' },
      { type: 'text', content: '█'.repeat(25) },
      { type: 'text', content: '' },
      { type: 'success', content: 'Connection established.' },
      { type: 'text', content: '' },
      { type: 'game', content: 'matrix-rain' },
      { type: 'text', content: '' },
      { type: 'text', content: 'Wake up, Neo...' },
      { type: 'text', content: 'The Matrix has you...' },
      { type: 'text', content: 'Follow the white rabbit.' },
      { type: 'text', content: '' },
      { type: 'text', content: 'Just kidding! This is a portfolio terminal.' },
      { type: 'text', content: 'But the digital rain above is real code!' },
      { type: 'text', content: '' },
      { type: 'text', content: 'Red pill: Type "projects" to see my real Matrix (code)' },
      { type: 'text', content: 'Blue pill: Type "clear" to return to reality' },
      { type: 'text', content: '' },
    ];
  }



  coffee() {
    const coffeeArt = `
      ( (
       ) )
    ............
    |          |]
    \\          /
     \\________/
    `;

    return [
      { type: 'ascii', content: coffeeArt },
      { type: 'text', content: 'BREWING VIRTUAL COFFEE...' },
      { type: 'text', content: '═'.repeat(25) },
      { type: 'text', content: '' },
      { type: 'success', content: 'Coffee ready! Productivity +100%' },
      { type: 'text', content: '' },
      { type: 'text', content: 'Fun fact: I built my AI Legal Assistant' },
      { type: 'text', content: 'after consuming approximately 47 cups of coffee.' },
      { type: 'text', content: '' },
      { type: 'text', content: 'Coffee-driven development is a real thing!' },
      { type: 'text', content: 'Now back to coding... ☕' },
      { type: 'text', content: '' },
    ];
  }

  joke() {
    const jokes = [
      "Why do programmers prefer dark mode? Because light attracts bugs!",
      "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
      "Why don't programmers like nature? It has too many bugs.",
      "I would tell you a joke about UDP, but you might not get it.",
      "There are only 10 types of people: those who understand binary and those who don't.",
      "Why did the programmer quit his job? He didn't get arrays (a raise).",
      "A SQL query goes into a bar, walks up to two tables and asks: 'Can I join you?'",
      "Why do Java developers wear glasses? Because they can't C#!",
    ];

    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

    return [
      { type: 'text', content: 'PROGRAMMING HUMOR' },
      { type: 'text', content: '═'.repeat(17) },
      { type: 'text', content: '' },
      { type: 'text', content: randomJoke },
      { type: 'text', content: '' },
      { type: 'text', content: 'Type "joke" again for another one!' },
      { type: 'text', content: 'Or "quote" for some motivation instead.' },
      { type: 'text', content: '' },
    ];
  }

  motivationalQuote() {
    const quotes = [
      "\"First, solve the problem. Then, write the code.\" - John Johnson",
      "\"Code is like humor. When you have to explain it, it's bad.\" - Cory House",
      "\"Experience is the name everyone gives to their mistakes.\" - Oscar Wilde",
      "\"The best error message is the one that never shows up.\" - Thomas Fuchs",
      "\"Simplicity is the ultimate sophistication.\" - Leonardo da Vinci",
      "\"Programs must be written for people to read, and only incidentally for machines to execute.\" - Harold Abelson",
      "\"The only way to learn a new programming language is by writing programs in it.\" - Dennis Ritchie",
      "\"It's not a bug – it's an undocumented feature.\" - Anonymous",
    ];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    return [
      { type: 'text', content: 'DEVELOPER WISDOM' },
      { type: 'text', content: '═'.repeat(16) },
      { type: 'text', content: '' },
      { type: 'text', content: randomQuote },
      { type: 'text', content: '' },
      { type: 'success', content: 'Keep coding, keep learning!' },
      { type: 'text', content: '' },
    ];
  }

  morseCode(args) {
    if (!args.length) {
      return [
        { type: 'text', content: 'MORSE CODE CONVERTER' },
        { type: 'text', content: '═'.repeat(20) },
        { type: 'text', content: '' },
        { type: 'text', content: 'Usage: morse <text>' },
        { type: 'text', content: 'Example: morse hello world' },
        { type: 'text', content: '' },
        { type: 'text', content: 'Inspired by my Telegraph Machine Simulator project!' },
        { type: 'text', content: '' },
      ];
    }

    const morseMap = {
      'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.', 'f': '..-.',
      'g': '--.', 'h': '....', 'i': '..', 'j': '.---', 'k': '-.-', 'l': '.-..',
      'm': '--', 'n': '-.', 'o': '---', 'p': '.--.', 'q': '--.-', 'r': '.-.',
      's': '...', 't': '-', 'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-',
      'y': '-.--', 'z': '--..', ' ': '/'
    };

    const text = args.join(' ').toLowerCase();
    const morse = text.split('').map(char => morseMap[char] || char).join(' ');

    return [
      { type: 'text', content: 'MORSE CODE CONVERSION' },
      { type: 'text', content: '═'.repeat(21) },
      { type: 'text', content: '' },
      { type: 'text', content: `Input:  ${text}` },
      { type: 'text', content: `Morse:  ${morse}` },
      { type: 'text', content: '' },
      { type: 'text', content: 'Fun fact: This is similar to the logic I used in my' },
      { type: 'text', content: 'Telegraph Machine Simulator React Native app!' },
      { type: 'text', content: '' },
    ];
  }

  asciiArt(args) {
    if (!args.length) {
      return [
        { type: 'text', content: 'ASCII ART GENERATOR' },
        { type: 'text', content: '═'.repeat(18) },
        { type: 'text', content: '' },
        { type: 'text', content: 'Usage: ascii <text>' },
        { type: 'text', content: 'Example: ascii CODE' },
        { type: 'text', content: '' },
      ];
    }

    const text = args.join(' ').toUpperCase();
    // Simple ASCII art - you could expand this with a proper ASCII art library
    const asciiText = text.split('').map(char => `[${char}]`).join(' ');

    return [
      { type: 'text', content: 'ASCII ART RESULT' },
      { type: 'text', content: '═'.repeat(16) },
      { type: 'text', content: '' },
      { type: 'ascii', content: asciiText },
      { type: 'text', content: '' },
      { type: 'text', content: 'Simple ASCII conversion complete!' },
      { type: 'text', content: '' },
    ];
  }

  weather() {
    const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Coding Weather', 'Perfect for Development'];
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];

    return [
      { type: 'text', content: 'WEATHER REPORT' },
      { type: 'text', content: '═'.repeat(14) },
      { type: 'text', content: '' },
      { type: 'text', content: `Thanjavur, Tamil Nadu: ${randomCondition}` },
      { type: 'text', content: `Temperature: ${Math.floor(Math.random() * 15) + 25}°C` },
      { type: 'text', content: `Humidity: ${Math.floor(Math.random() * 30) + 60}%` },
      { type: 'text', content: `Code Productivity: High` },
      { type: 'text', content: '' },
      { type: 'text', content: 'Perfect weather for coding!' },
      { type: 'text', content: '' },
    ];
  }

  currentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const dateString = now.toLocaleDateString();

    return [
      { type: 'text', content: 'CURRENT TIME' },
      { type: 'text', content: '═'.repeat(12) },
      { type: 'text', content: '' },
      { type: 'text', content: `Date: ${dateString}` },
      { type: 'text', content: `Time: ${timeString}` },
      { type: 'text', content: `Timezone: IST (Indian Standard Time)` },
      { type: 'text', content: '' },
      { type: 'text', content: 'Time flies when you\'re coding!' },
      { type: 'text', content: '' },
    ];
  }

  fortune() {
    const fortunes = [
      "Your next commit will be bug-free!",
      "A great coding opportunity awaits you.",
      "Your AI projects will change the world.",
      "Stack Overflow will have the answer you seek.",
      "Your code will compile on the first try today.",
      "A senior developer will review your code positively.",
      "Your mobile app will trend on the app store.",
      "The deployment will go smoothly this time.",
    ];

    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];

    return [
      { type: 'text', content: 'DEVELOPER FORTUNE' },
      { type: 'text', content: '═'.repeat(17) },
      { type: 'text', content: '' },
      { type: 'text', content: randomFortune },
      { type: 'text', content: '' },
      { type: 'success', content: 'May your code be bug-free and your deployments smooth!' },
      { type: 'text', content: '' },
    ];
  }

  funnyResponses(cmd) {
    const responses = {
      'sudo': [
        { type: 'text', content: 'Nice try! But this isn\'t a real Linux terminal.' },
        { type: 'text', content: 'However, I do have sudo access to my own projects!' },
        { type: 'text', content: '' },
        { type: 'text', content: 'Try "projects" to see what I\'ve built with full control.' },
        { type: 'text', content: '' },
      ],
      'hack': [
        { type: 'text', content: 'Nice try! But I prefer ethical coding.' },
        { type: 'text', content: 'Real hacking = problem-solving with code!' },
        { type: 'text', content: '' },
        { type: 'text', content: 'Check out my AI and mobile projects instead!' },
        { type: 'text', content: '' },
      ]
    };

    return responses[cmd] || [{ type: 'text', content: 'Command not found, but nice try!' }];
  }

  commandNotFound(command) {
    const easterEggs = {
      'vim': 'Vim detected! Great choice. I use VS Code though. 😄',
      'emacs': 'Emacs user spotted! Respect the classics! 🫡',
      'exit': 'There\'s no escape from this portfolio! Try "clear" instead.',
      'rm': 'rm -rf is dangerous! This portfolio must survive! 😅',
      'ls': 'This isn\'t a file system, but try "projects" to list my work!',
      'cd': 'No directories to change to, but you can navigate with commands!',
      'pwd': 'You\'re in Rajageethan\'s terminal portfolio! 📍',
      'cat': 'No files to cat here, but try "resume" to see my CV!',
      'nano': 'nano is nice, but this is read-only! Try VS Code for editing. 📝',
      'python': 'Python is awesome! I used it in my AI Legal Assistant project.',
      'node': 'Node.js is great! Check out my backend skills with "skills".',
      'react': 'React Native expert here! See my mobile projects with "projects".',
    };

    if (easterEggs[command.toLowerCase()]) {
      return [
        { type: 'text', content: easterEggs[command.toLowerCase()] },
        { type: 'text', content: '' },
        { type: 'text', content: 'Type "fun" to see all interactive commands!' },
        { type: 'text', content: '' },
      ];
    }

    return [
      { type: 'error', content: `Command '${command}' not found` },
      { type: 'text', content: '' },
      { type: 'text', content: 'Try these commands:' },
      { type: 'text', content: 'Professional: whoami, about, skills, projects, contact' },
      { type: 'text', content: 'Fun: fun, dino, joke, coffee, matrix, neofetch' },
      { type: 'text', content: 'System: theme, crt, history, reboot' },
      { type: 'text', content: '' },
      { type: 'text', content: `Type 'help' for the complete list!` },
      { type: 'text', content: '' },
    ];
  }

  // ===== NEOFETCH =====
  neofetch() {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const h = typeof window !== 'undefined' ? window.innerHeight : 1080;
    const uptime = this._getUptime();

    const logo = [
      '       ██████╗  ██████╗ ',
      '       ██╔══██╗██╔══██╗',
      '       ██████╔╝██████╔╝',
      '       ██╔══██╗██╔══██║',
      '       ██║  ██║██║  ██║',
      '       ╚═╝  ╚═╝╚═╝  ╚═╝',
    ];

    const info = [
      `rajageethan@portfolio`,
      `─────────────────────`,
      `OS: Terminal Portfolio v1.0`,
      `Host: rajageethan.dev`,
      `Kernel: React 19.1.1`,
      `Shell: Portfolio CLI v1.0`,
      `Uptime: ${uptime}`,
      `Packages: 195 (npm)`,
      `Resolution: ${w}x${h}`,
      `Terminal: Custom React Terminal`,
      `CPU: JavaScript ES2024`,
      `GPU: CSS Animations Engine`,
    ];

    const combined = logo.map((line, i) => {
      const infoLine = info[i] || '';
      const paddedLogo = line.padEnd(28);
      return paddedLogo + infoLine;
    });

    // Handle extra info lines beyond logo
    for (let i = logo.length; i < info.length; i++) {
      combined.push(' '.repeat(28) + info[i]);
    }

    return [
      { type: 'ascii', content: combined.join('\n') },
      { type: 'text', content: '' },
    ];
  }

  _getUptime() {
    const start = new Date('2024-04-01');
    const now = new Date();
    const diff = now - start;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    if (months > 12) {
      const years = Math.floor(months / 12);
      const rem = months % 12;
      return `${years} year${years > 1 ? 's' : ''}, ${rem} month${rem !== 1 ? 's' : ''}`;
    }
    return `${months} months, ${days % 30} days`;
  }

  // ===== SOCIAL =====
  social() {
    return [
      { type: 'text', content: 'SOCIAL LINKS' },
      { type: 'text', content: '═'.repeat(12) },
      { type: 'text', content: '' },
      { type: 'text', content: '  📧  Email' },
      { type: 'link', content: '      rajageethan18@gmail.com', url: 'mailto:rajageethan18@gmail.com' },
      { type: 'text', content: '' },
      { type: 'text', content: '  💻  GitHub' },
      { type: 'link', content: '      github.com/rajageethan', url: 'https://github.com/rajageethan' },
      { type: 'text', content: '' },
      { type: 'text', content: '  🔗  LinkedIn' },
      { type: 'link', content: '      linkedin.com/in/rajageethan-a', url: 'https://linkedin.com/in/rajageethan-a' },
      { type: 'text', content: '' },
      { type: 'text', content: '  🌐  Portfolio' },
      { type: 'link', content: '      rajageethan.dev', url: 'https://rajageethan.dev' },
      { type: 'text', content: '' },
      { type: 'text', content: '  📱  Phone' },
      { type: 'text', content: '      +91 95666 32717' },
      { type: 'text', content: '' },
      { type: 'success', content: 'Available for opportunities — reach out anytime!' },
      { type: 'text', content: '' },
    ];
  }

  // ===== PROJECT DETAIL =====
  projectDetail(args) {
    if (!args.length) {
      return [
        { type: 'text', content: 'PROJECT DEEP DIVE' },
        { type: 'text', content: '═'.repeat(17) },
        { type: 'text', content: '' },
        { type: 'text', content: 'Usage: project <name>' },
        { type: 'text', content: '' },
        { type: 'text', content: 'Available projects:' },
        { type: 'text', content: '  project legal      - AI Legal Assistant' },
        { type: 'text', content: '  project wheels     - ShareWheels' },
        { type: 'text', content: '  project blood      - Blood Donor App' },
        { type: 'text', content: '  project telegraph  - Telegraph Simulator' },
        { type: 'text', content: '  project kural      - Thirukkural Daily' },
        { type: 'text', content: '  project terminal   - This Portfolio' },
        { type: 'text', content: '' },
      ];
    }

    const key = args.join(' ').toLowerCase();
    const projectDetails = {
      'legal': {
        name: 'AI Legal Assistant',
        role: 'AI/ML Developer',
        duration: '2024',
        stack: 'FastAPI · LangChain · ChromaDB · Firebase · React',
        problem: 'Legal professionals spend hours searching through documents manually. There was a need for an intelligent system that could understand legal context and retrieve relevant information quickly.',
        solution: 'Built an AI-powered assistant using RAG (Retrieval Augmented Generation) pipelines that processes legal documents, creates vector embeddings, and provides contextually accurate responses to legal queries.',
        features: [
          'RAG pipeline with LangChain for intelligent document retrieval',
          'ChromaDB vector database for semantic search',
          'NLP models for legal text processing and understanding',
          'Firebase authentication and session management',
          'React frontend with real-time chat interface',
          'Context-aware search across multiple legal documents'
        ],
        impact: 'Reduced legal document search time significantly with AI-powered contextual retrieval',
        github: 'https://github.com/rajageethan/ai-legal-assistant'
      },
      'wheels': {
        name: 'ShareWheels',
        role: 'Mobile App Developer',
        duration: '2023-2024',
        stack: 'React Native · Expo · Firebase · Geolocation',
        problem: 'Existing carpooling apps separated city and long-distance rides, forcing users to install multiple apps. No unified solution existed for the Indian commuter.',
        solution: 'Created a unified carpooling platform that handles both city commutes and long-distance rides in a single app with real-time ride matching.',
        features: [
          'Unified ride listings for city and intercity travel',
          'Real-time ride matching with proximity algorithms',
          'Driver verification and trust rating system',
          'Secure trip management with live tracking',
          'Push notifications for ride updates',
          'Cross-platform mobile app (iOS + Android)'
        ],
        impact: 'Unified two separate use-cases into one seamless user experience',
        github: 'https://github.com/rajageethan/sharewheels'
      },
      'blood': {
        name: 'Blood Donor Application',
        role: 'Full-Stack Mobile Developer',
        duration: '2023-2024',
        stack: 'React Native · Expo · Firebase · Geolocation',
        problem: 'During emergencies, finding compatible blood donors nearby is time-critical. Traditional methods (phone calls, social media) are too slow.',
        solution: 'Built a real-time platform that instantly connects blood seekers with nearby compatible donors using geolocation and push notifications.',
        features: [
          'Proximity-based donor-seeker matching',
          'Real-time emergency notifications',
          'Blood type compatibility filtering',
          'Geolocation-based nearest donor search',
          'Donor profile and availability management',
          'Emergency SOS broadcast to nearby donors'
        ],
        impact: 'Potential to save lives by reducing blood donor discovery time from hours to minutes',
        github: 'https://github.com/rajageethan/blood-donor-app'
      },
      'telegraph': {
        name: 'Telegraph Machine Simulator',
        role: 'Mobile Developer',
        duration: '2023',
        stack: 'React Native · Expo · Audio APIs',
        problem: 'Wanted to create an immersive, educational tool exploring historical Morse code communication with authentic interaction.',
        solution: 'Built a war-film-inspired Morse code simulator with realistic telegraph sounds and touch-based input.',
        features: [
          'Touch-based Morse code input (tap for dot, hold for dash)',
          'Authentic telegraph sound effects',
          'Real-time Morse to text translation',
          'War-film-inspired visual design',
          'Haptic feedback for immersive experience',
          'Educational mode with Morse code reference'
        ],
        impact: 'Unique creative project showcasing audio integration and immersive UX design',
        github: 'https://github.com/rajageethan/telegraph-simulator'
      },
      'kural': {
        name: 'Thirukkural Daily App',
        role: 'Full-Stack Developer',
        duration: '2023',
        stack: 'Flask · Firebase · HTML · CSS · JavaScript',
        problem: 'Tamil literary heritage is underrepresented in modern digital platforms. Wanted to make Thirukkural (ancient Tamil literature) accessible daily.',
        solution: 'Built a minimal web app that delivers one Thirukkural per day with explanations in a clean, modern interface.',
        features: [
          'Daily rotating Thirukkural with explanations',
          'Clean, minimalist reading interface',
          'Firebase backend for content management',
          'Flask server with efficient caching',
          'Responsive design for all devices',
          'Cultural promotion through technology'
        ],
        impact: 'Promoting Tamil literary heritage through modern web technology',
        github: 'https://github.com/rajageethan/thirukkural-daily'
      },
      'terminal': {
        name: 'Interactive Terminal Portfolio',
        role: 'Frontend Developer',
        duration: '2024 - Present',
        stack: 'React · Vite · CSS · GitHub Pages',
        problem: 'Standard portfolio websites are forgettable. Needed something that demonstrates creativity and technical skill simultaneously.',
        solution: 'Built a fully functional terminal emulator as a portfolio site with 25+ commands, games, themes, and mobile responsiveness.',
        features: [
          'Full terminal emulation with command processing',
          'Tab autocomplete and command history',
          '6 color themes (Matrix, Dracula, Monokai, etc.)',
          'Embedded games (Dino Runner, Matrix Rain)',
          'CRT scanline retro effect',
          'Boot sequence animation',
          'Mobile responsive with touch support',
          'PWA installable on mobile devices'
        ],
        impact: 'A unique, memorable portfolio that showcases both creativity and engineering skill',
        github: 'https://github.com/rajageethan/terminal-portfolio'
      }
    };

    const detail = projectDetails[key];
    if (!detail) {
      return [
        { type: 'error', content: `Project '${key}' not found` },
        { type: 'text', content: '' },
        { type: 'text', content: 'Available: legal, wheels, blood, telegraph, kural, terminal' },
        { type: 'text', content: 'Usage: project <name>' },
        { type: 'text', content: '' },
      ];
    }

    return [
      { type: 'text', content: `${detail.name.toUpperCase()}` },
      { type: 'text', content: '═'.repeat(detail.name.length) },
      { type: 'text', content: '' },
      { type: 'text', content: `Role:     ${detail.role}` },
      { type: 'text', content: `Duration: ${detail.duration}` },
      { type: 'text', content: `Stack:    ${detail.stack}` },
      { type: 'text', content: '' },
      { type: 'text', content: 'THE PROBLEM:' },
      { type: 'text', content: `  ${detail.problem}` },
      { type: 'text', content: '' },
      { type: 'text', content: 'THE SOLUTION:' },
      { type: 'text', content: `  ${detail.solution}` },
      { type: 'text', content: '' },
      { type: 'text', content: 'KEY FEATURES:' },
      ...detail.features.map(f => ({ type: 'text', content: `  • ${f}` })),
      { type: 'text', content: '' },
      { type: 'success', content: `Impact: ${detail.impact}` },
      { type: 'text', content: '' },
      { type: 'link', content: `View on GitHub →`, url: detail.github },
      { type: 'text', content: '' },
    ];
  }

  // ===== MAN PAGES =====
  manPage(args) {
    if (!args.length) {
      return [
        { type: 'text', content: 'MANUAL PAGES' },
        { type: 'text', content: '═'.repeat(12) },
        { type: 'text', content: '' },
        { type: 'text', content: 'Usage: man <command>' },
        { type: 'text', content: 'Example: man skills' },
        { type: 'text', content: '' },
        { type: 'text', content: 'Shows detailed usage information for any command.' },
        { type: 'text', content: '' },
      ];
    }

    const cmd = args[0].toLowerCase();
    const manPages = {
      'help': { syn: 'help', desc: 'Display a list of all available commands with brief descriptions.', usage: 'help', notes: 'This is a good starting point for new visitors.' },
      'whoami': { syn: 'whoami', desc: 'Display personal introduction including name, role, location, and philosophy.', usage: 'whoami', notes: 'Inspired by the Unix whoami command.' },
      'about': { syn: 'about', desc: 'Show detailed professional summary including core competencies and interests.', usage: 'about', notes: 'A comprehensive overview of professional capabilities.' },
      'skills': { syn: 'skills', desc: 'Display technical competencies across programming, frontend, backend, mobile, AI/ML, database, and tools categories with visual progress bars.', usage: 'skills', notes: 'Progress bars indicate relative proficiency levels.' },
      'projects': { syn: 'projects', desc: 'Show portfolio of all completed projects in a table format with featured project details.', usage: 'projects\nproject <name>', notes: 'Use "project <name>" for detailed case study. Available: legal, wheels, blood, telegraph, kural, terminal' },
      'contact': { syn: 'contact', desc: 'Display all contact information including email, phone, LinkedIn, GitHub, and portfolio links.', usage: 'contact\nsocial', notes: 'Also try the "social" command for a quick links view.' },
      'theme': { syn: 'theme [name]', desc: 'View available themes or switch to a specific theme. Themes persist across sessions via localStorage.', usage: 'theme\ntheme dracula\ntheme matrix', notes: 'Available: matrix, dracula, monokai, solarized, amber, cyberpunk' },
      'crt': { syn: 'crt', desc: 'Toggle the CRT scanline overlay effect for a retro terminal look.', usage: 'crt', notes: 'This applies a visual overlay with scanlines and subtle flicker.' },
      'neofetch': { syn: 'neofetch', desc: 'Display system information in the style of the popular Linux neofetch command.', usage: 'neofetch', notes: 'Shows portfolio "system" details like React version, uptime, resolution, etc.' },
      'dino': { syn: 'dino', desc: 'Launch the Chrome Dino Runner game. Jump over cacti to score points.', usage: 'dino', notes: 'Controls: Space/↑ to jump. Click/tap on mobile. Speed increases every 100 points.' },
      'matrix': { syn: 'matrix', desc: 'Display the iconic Matrix digital rain effect.', usage: 'matrix', notes: 'Renders animated falling characters in a canvas element.' },
      'clear': { syn: 'clear', desc: 'Clear all terminal output. Also available via Ctrl+L.', usage: 'clear', notes: 'Shortcut: Ctrl+L' },
      'history': { syn: 'history', desc: 'Show the last 20 commands you have entered. History persists across sessions.', usage: 'history', notes: 'Navigate history with ↑/↓ arrow keys.' },
      'reboot': { syn: 'reboot', desc: 'Replay the boot sequence animation and reload the terminal.', usage: 'reboot', notes: 'The boot sequence normally only plays on first visit per session.' },
    };

    const page = manPages[cmd];
    if (!page) {
      return [
        { type: 'error', content: `No manual entry for '${cmd}'` },
        { type: 'text', content: '' },
        { type: 'text', content: 'Try: man help, man skills, man theme, man dino' },
        { type: 'text', content: '' },
      ];
    }

    return [
      { type: 'text', content: `MAN: ${cmd.toUpperCase()}` },
      { type: 'text', content: '═'.repeat(5 + cmd.length) },
      { type: 'text', content: '' },
      { type: 'text', content: 'NAME' },
      { type: 'text', content: `    ${page.syn}` },
      { type: 'text', content: '' },
      { type: 'text', content: 'DESCRIPTION' },
      { type: 'text', content: `    ${page.desc}` },
      { type: 'text', content: '' },
      { type: 'text', content: 'USAGE' },
      ...page.usage.split('\n').map(u => ({ type: 'text', content: `    $ ${u}` })),
      { type: 'text', content: '' },
      { type: 'text', content: 'NOTES' },
      { type: 'text', content: `    ${page.notes}` },
      { type: 'text', content: '' },
    ];
  }
}