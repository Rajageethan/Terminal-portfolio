 import React, { useState, useEffect } from 'react';
import Terminal from './components/terminal/Terminal';
import './App.css'

function App() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

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
            <div className="output-line">Loading terminal...</div>
          </div>
        </div>
      </div>
    );
  }

  return <Terminal user={user} projects={projects} skills={skills} />;
}

export default App
