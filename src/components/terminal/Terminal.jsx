import React, { useState, useRef, useEffect } from 'react';
import CommandProcessor from './CommandProcessor';
import TerminalOutput from './TerminalOutput';

export default function Terminal({ user, projects, skills }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [output, setOutput] = useState([]);
  const [currentPath, setCurrentPath] = useState('~');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const commandProcessor = new CommandProcessor(user, projects, skills, currentPath, setCurrentPath);

  useEffect(() => {
    const showWelcome = async () => {
      // Show welcome message on load
      const welcomeOutput = await commandProcessor.processCommand('welcome');
      setOutput(welcomeOutput);
    };

    showWelcome();
    
    // Focus input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Auto scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add command to output
    const newOutput = [
      ...output,
      { type: 'command', content: `${getPrompt()} ${input}` }
    ];
    
    setOutput(newOutput);
    setIsLoading(true);

    // Add to history
    setHistory(prev => [...prev, input]);
    setHistoryIndex(-1);

    // Process command
    const result = await commandProcessor.processCommand(input.trim());
    
    if (input.trim().toLowerCase() === 'clear') {
      setOutput([]);
    } else {
      setOutput(prev => [...prev, ...result]);
    }
    setInput('');
    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Enhanced autocomplete with fun commands
      const commands = [
        'help', 'clear', 'whoami', 'about', 'education', 'experience', 'skills', 
        'projects', 'achievements', 'contact', 'resume', 'fun', 'dino', 'matrix', 
        'joke', 'quote', 'coffee', 'weather', 'time', 'fortune', 'morse', 'ascii'
      ];
      const matches = commands.filter(cmd => cmd.startsWith(input));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      setOutput([]);
    }
  };

  const getPrompt = () => {
    const username = user?.name?.toLowerCase().replace(/\s+/g, '') || 'user';
    return `${username}@portfolio:${currentPath}$`;
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div 
      ref={terminalRef}
      className="terminal-container"
      onClick={handleTerminalClick}
    >
      <div className="terminal">
        <div className="terminal-content">
          {/* Output */}
          {output.map((item, index) => (
            <TerminalOutput key={index} item={item} index={index} />
          ))}

          {/* Input */}
          <form onSubmit={handleSubmit} className="input-line">
            <span className="prompt">
              {getPrompt()}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="terminal-input"
              disabled={isLoading}
              autoComplete="off"
              spellCheck="false"
            />
          </form>

          {isLoading && (
            <div className="output-line">
              Processing...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}