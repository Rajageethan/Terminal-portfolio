import React, { useState, useEffect, useCallback, Component } from 'react';
import Terminal from './components/terminal/Terminal';
import './App.css';

// ===== Error Boundary =====
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Portfolio error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          background: '#000', color: '#ff4444', padding: '40px',
          fontFamily: "'Fira Code', 'Courier New', monospace", minHeight: '100vh'
        }}>
          <h1 style={{ color: '#00ff41', marginBottom: '16px' }}>System Error</h1>
          <p style={{ marginBottom: '8px' }}>ERROR: An unexpected error occurred</p>
          <p style={{ color: '#888', marginBottom: '16px' }}>{this.state.error?.message}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#333', color: '#00ff41', border: '1px solid #00ff41',
              padding: '8px 20px', cursor: 'pointer', fontFamily: 'inherit',
              borderRadius: '4px'
            }}
          >
            reboot system
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ===== Boot Sequence Lines =====
const BOOT_LINES = [
  { text: '[BIOS] Rajageethan Portfolio System v1.0', type: 'highlight', delay: 100 },
  { text: '[POST] Running diagnostics...', type: 'info', delay: 200 },
  { text: 'progress', type: 'progress', delay: 800 },
  { text: 'Memory Check: 16384 MB .................. OK', type: 'ok', delay: 150 },
  { text: 'CPU: Developer Brain @ 3.0 GHz .......... OK', type: 'ok', delay: 150 },
  { text: 'GPU: Creativity Engine v2.0 ............. OK', type: 'ok', delay: 150 },
  { text: '', type: 'info', delay: 50 },
  { text: 'Loading modules:', type: 'info', delay: 100 },
  { text: '  [✓] react@19.1.1', type: 'ok', delay: 100 },
  { text: '  [✓] vite@7.1', type: 'ok', delay: 80 },
  { text: '  [✓] terminal-emulator', type: 'ok', delay: 80 },
  { text: '  [✓] command-processor', type: 'ok', delay: 80 },
  { text: '  [✓] portfolio-engine', type: 'ok', delay: 80 },
  { text: '', type: 'info', delay: 50 },
  { text: 'Starting services:', type: 'info', delay: 100 },
  { text: '  [✓] Portfolio Service', type: 'ok', delay: 100 },
  { text: '  [✓] Project Database', type: 'ok', delay: 80 },
  { text: '  [✓] Skills Registry', type: 'ok', delay: 80 },
  { text: '  [✓] Game Engine', type: 'ok', delay: 80 },
  { text: '', type: 'info', delay: 50 },
  { text: 'All systems nominal.', type: 'highlight', delay: 200 },
  { text: 'Starting terminal...', type: 'highlight', delay: 400 },
];

function BootSequence({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let lineIndex = 0;
    let totalDelay = 0;
    const timers = [];

    BOOT_LINES.forEach((line, i) => {
      totalDelay += line.delay;
      const timer = setTimeout(() => {
        if (line.type === 'progress') {
          // Animate progress bar
          let p = 0;
          const progressTimer = setInterval(() => {
            p += 10;
            setProgress(p);
            if (p >= 100) clearInterval(progressTimer);
          }, 50);
          timers.push(progressTimer);
        }
        setVisibleLines(prev => [...prev, line]);
        lineIndex = i;
      }, totalDelay);
      timers.push(timer);
    });

    // After all lines, fade out and complete
    const finalTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        onComplete();
      }, 600);
    }, totalDelay + 500);
    timers.push(finalTimer);

    return () => timers.forEach(t => clearTimeout(t));
  }, [onComplete]);

  return (
    <div className={`boot-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="boot-content">
        {visibleLines.map((line, i) => (
          line.type === 'progress' ? (
            <div key={i} className="boot-progress">
              <div className="boot-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          ) : (
            <div key={i} className={`boot-line ${line.type}`}>{line.text}</div>
          )
        ))}
      </div>
    </div>
  );
}

// ===== Main App =====
function App() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [booting, setBooting] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('terminal-theme') || 'matrix');
  const [crtEnabled, setCrtEnabled] = useState(() => localStorage.getItem('crt-enabled') === 'true');

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('terminal-theme', theme);
  }, [theme]);

  // Check if boot sequence should play (once per session)
  useEffect(() => {
    if (!sessionStorage.getItem('booted')) {
      setBooting(true);
    }
  }, []);

  const handleBootComplete = useCallback(() => {
    sessionStorage.setItem('booted', 'true');
    setBooting(false);
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Professional profile data
      const userData = {
        name: 'Rajageethan A',
        title: 'Software Developer',
        location: 'Thanjavur, Tamil Nadu, India',
        bio: 'Computer Science student specializing in backend development. Passionate about building reliable, scalable systems with strong technical foundations. Currently seeking internship opportunities to apply and grow my skills.',
        email: 'rajageethan18@gmail.com',
        phone: '+919566632717',
        github_url: 'https://github.com/rajageethan',
        linkedin_url: 'https://linkedin.com/in/rajageethan-a',
        website_url: 'https://rajageethan.dev'
      };
      
      const projectsData = [
        {
          name: 'AI Legal Assistant',
          description: 'AI-powered legal assistant with RAG pipelines using LangChain and ChromaDB for intelligent document search and analysis',
          technologies: ['FastAPI', 'LangChain', 'ChromaDB', 'Firebase', 'NLP'],
          status: 'completed',
          github_url: 'https://github.com/rajageethan/ai-legal-assistant',
          demo_url: null
        },
        {
          name: 'ShareWheels',
          description: 'Unified carpooling app for both city and long-distance rides with real-time ride listings, driver verification, and secure trip management',
          technologies: ['Expo', 'React Native', 'Firebase'],
          status: 'completed',
          github_url: 'https://github.com/rajageethan/sharewheels',
          demo_url: null
        },
        {
          name: 'Blood Donor Application',
          description: 'Emergency blood donation platform connecting donors and seekers via real-time notifications and proximity-based matching',
          technologies: ['Expo', 'React Native', 'Firebase'],
          status: 'completed',
          github_url: 'https://github.com/rajageethan/blood-donor-app',
          demo_url: null
        },
        {
          name: 'Telegraph Machine Simulator',
          description: 'War-film-inspired Morse code simulator with touch-based input and authentic telegraph sound feedback for immersive interaction',
          technologies: ['Expo', 'React Native'],
          status: 'completed',
          github_url: 'https://github.com/rajageethan/telegraph-simulator',
          demo_url: null
        },
        {
          name: 'Thirukkural Daily App',
          description: 'Minimal web app delivering one Thirukkural per day with explanations, promoting Tamil literature through a clean, modern interface',
          technologies: ['Flask', 'Firebase', 'HTML', 'CSS', 'JavaScript'],
          status: 'completed',
          github_url: 'https://github.com/rajageethan/thirukkural-daily',
          demo_url: null
        },
        {
          name: 'Interactive Terminal Portfolio',
          description: 'Professional portfolio website designed as a terminal interface with command-line interaction',
          technologies: ['React', 'JavaScript', 'CSS', 'Vite'],
          status: 'completed',
          github_url: 'https://github.com/rajageethan/terminal-portfolio',
          demo_url: 'https://rajageethan.dev'
        }
      ];
      
      const skillsData = [
        { name: 'JavaScript/ES6+', category: 'programming', level: 'advanced' },
        { name: 'Python', category: 'programming', level: 'advanced' },
        { name: 'TypeScript', category: 'programming', level: 'intermediate' },
        { name: 'React.js', category: 'frontend', level: 'advanced' },
        { name: 'React Native', category: 'mobile', level: 'advanced' },
        { name: 'Expo', category: 'mobile', level: 'advanced' },
        { name: 'HTML5/CSS3', category: 'frontend', level: 'advanced' },
        { name: 'FastAPI', category: 'backend', level: 'advanced' },
        { name: 'Flask', category: 'backend', level: 'intermediate' },
        { name: 'Node.js', category: 'backend', level: 'intermediate' },
        { name: 'LangChain', category: 'ai-ml', level: 'intermediate' },
        { name: 'ChromaDB', category: 'ai-ml', level: 'intermediate' },
        { name: 'NLP', category: 'ai-ml', level: 'intermediate' },
        { name: 'Firebase', category: 'database', level: 'advanced' },
        { name: 'MongoDB', category: 'database', level: 'intermediate' },
        { name: 'Git/GitHub', category: 'tools', level: 'advanced' },
        { name: 'VS Code', category: 'tools', level: 'advanced' },
        { name: 'RAG Pipelines', category: 'ai-ml', level: 'intermediate' }
      ];
      
      setUser(userData);
      setProjects(projectsData);
      setSkills(skillsData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="terminal-container">
        <div className="terminal">
          <div className="terminal-content">
            <div className="loading-spinner">
              <span className="spinner-dots"></span>
              <span>Loading system...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      {booting && <BootSequence onComplete={handleBootComplete} />}
      {crtEnabled && <div className="crt-overlay" />}
      <Terminal
        user={user}
        projects={projects}
        skills={skills}
        theme={theme}
        setTheme={setTheme}
        crtEnabled={crtEnabled}
        setCrtEnabled={setCrtEnabled}
      />
    </ErrorBoundary>
  );
}

export default App;
