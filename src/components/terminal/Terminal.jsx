import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import CommandProcessor from './CommandProcessor';
import TerminalOutput from './TerminalOutput';

// Unique ID generator for output items
let _outputId = 0;
const genId = () => `out-${Date.now()}-${++_outputId}`;
const tagOutput = (items) => items.map(item => ({ ...item, _id: genId() }));

// Max output items to prevent memory leak
const MAX_OUTPUT = 500;
const trimOutput = (arr) => arr.length > MAX_OUTPUT ? arr.slice(arr.length - MAX_OUTPUT) : arr;

// Persistent history helpers
const HISTORY_KEY = 'terminal-cmd-history';
const loadHistory = () => {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; }
  catch { return []; }
};
const saveHistory = (h) => {
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(h.slice(-100))); }
  catch {}
};

// Available themes
const THEMES = [
  { name: 'matrix', label: 'Matrix Green' },
  { name: 'dracula', label: 'Dracula' },
  { name: 'monokai', label: 'Monokai' },
  { name: 'solarized', label: 'Solarized Dark' },
  { name: 'amber', label: 'Amber CRT' },
  { name: 'cyberpunk', label: 'Cyberpunk' },
];

// Mobile suggestion commands
const MOBILE_CMDS = ['help', 'about', 'skills', 'projects', 'contact', 'fun', 'neofetch', 'theme'];

const ALL_COMMANDS = [
  'help', 'clear', 'whoami', 'about', 'education', 'experience', 'skills',
  'projects', 'achievements', 'contact', 'resume', 'fun', 'dino', 'matrix',
  'joke', 'quote', 'coffee', 'weather', 'time', 'fortune', 'morse', 'ascii',
  'neofetch', 'social', 'theme', 'crt', 'history', 'reboot', 'man', 'project'
];

export default function Terminal({ user, projects, skills, theme, setTheme, crtEnabled, setCrtEnabled }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState(loadHistory);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [output, setOutput] = useState([]);
  const [currentPath, setCurrentPath] = useState('~');
  const [isLoading, setIsLoading] = useState(false);
  const [copyToast, setCopyToast] = useState(false);
  const [autocompleteHints, setAutocompleteHints] = useState([]);
  const [showKeyHints, setShowKeyHints] = useState(false);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const scrollRef = useRef(null);

  // Memoize the command processor
  const commandProcessor = useMemo(
    () => new CommandProcessor(user, projects, skills, currentPath, setCurrentPath),
    [user, projects, skills, currentPath]
  );

  // Show keyboard hints on first ever visit
  useEffect(() => {
    if (!localStorage.getItem('keyboard-hints-dismissed')) {
      const timer = setTimeout(() => setShowKeyHints(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismissKeyHints = useCallback(() => {
    setShowKeyHints(false);
    localStorage.setItem('keyboard-hints-dismissed', 'true');
  }, []);

  // Welcome message
  useEffect(() => {
    const showWelcome = async () => {
      const welcomeOutput = await commandProcessor.processCommand('welcome');
      setOutput(tagOutput(welcomeOutput));
    };
    showWelcome();
    if (inputRef.current) inputRef.current.focus();
  }, []);

  // Smooth scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  }, [output]);

  // Copy handler
  const handleCopy = useCallback((text) => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopyToast(true);
      setTimeout(() => setCopyToast(false), 1500);
    });
  }, []);

  const getPrompt = useCallback(() => {
    const username = user?.name?.toLowerCase().replace(/\s+/g, '') || 'user';
    if (typeof window !== 'undefined' && window.innerWidth < 480) {
      return `${username}$`;
    }
    return `${username}@portfolio:${currentPath}$`;
  }, [user, currentPath]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setAutocompleteHints([]);
    const cmd = input.trim();
    const cmdLower = cmd.toLowerCase();

    // Add command to output
    const commandLine = tagOutput([{ type: 'command', content: `${getPrompt()} ${cmd}` }]);
    setOutput(prev => trimOutput([...prev, ...commandLine]));
    setIsLoading(true);

    // Save to history
    const newHistory = [...history, cmd];
    setHistory(newHistory);
    saveHistory(newHistory);
    setHistoryIndex(-1);

    // Handle special commands locally
    if (cmdLower === 'clear') {
      setOutput([]);
      setInput('');
      setIsLoading(false);
      return;
    }

    if (cmdLower === 'history') {
      const historyOutput = history.length === 0
        ? [{ type: 'text', content: 'No command history yet.' }]
        : [
            { type: 'text', content: 'COMMAND HISTORY' },
            { type: 'text', content: '═'.repeat(15) },
            { type: 'text', content: '' },
            ...history.slice(-20).map((h, i) => ({
              type: 'text',
              content: `  ${String(i + 1).padStart(3)}  ${h}`
            })),
            { type: 'text', content: '' },
            { type: 'text', content: `Showing last ${Math.min(history.length, 20)} of ${history.length} commands` },
            { type: 'text', content: '' },
          ];
      setOutput(prev => trimOutput([...prev, ...tagOutput(historyOutput)]));
      setInput('');
      setIsLoading(false);
      return;
    }

    if (cmdLower.startsWith('theme')) {
      const parts = cmdLower.split(/\s+/);
      if (parts.length >= 2) {
        const themeName = parts[1];
        const found = THEMES.find(t => t.name === themeName);
        if (found) {
          setTheme(found.name);
          const result = tagOutput([
            { type: 'success', content: `Theme switched to: ${found.label}` },
            { type: 'text', content: '' },
          ]);
          setOutput(prev => trimOutput([...prev, ...result]));
        } else {
          const result = tagOutput([
            { type: 'error', content: `Unknown theme: ${themeName}` },
            { type: 'text', content: '' },
            { type: 'text', content: 'Available themes:' },
            ...THEMES.map(t => ({ type: 'text', content: `  ${t.name.padEnd(12)} - ${t.label}` })),
            { type: 'text', content: '' },
            { type: 'text', content: 'Usage: theme <name>' },
            { type: 'text', content: '' },
          ]);
          setOutput(prev => trimOutput([...prev, ...result]));
        }
      } else {
        const result = tagOutput([
          { type: 'text', content: 'TERMINAL THEMES' },
          { type: 'text', content: '═'.repeat(15) },
          { type: 'text', content: '' },
          { type: 'text', content: `Current: ${theme}` },
          { type: 'text', content: '' },
          ...THEMES.map(t => ({
            type: 'text',
            content: `  ${t.name === theme ? '▸' : ' '} ${t.name.padEnd(12)} - ${t.label}`
          })),
          { type: 'text', content: '' },
          { type: 'text', content: 'Usage: theme <name>' },
          { type: 'text', content: 'Example: theme dracula' },
          { type: 'text', content: '' },
        ]);
        setOutput(prev => trimOutput([...prev, ...result]));
      }
      setInput('');
      setIsLoading(false);
      return;
    }

    if (cmdLower === 'crt') {
      const newVal = !crtEnabled;
      setCrtEnabled(newVal);
      localStorage.setItem('crt-enabled', String(newVal));
      const result = tagOutput([
        { type: 'success', content: `CRT scanline effect: ${newVal ? 'ON' : 'OFF'}` },
        { type: 'text', content: newVal ? 'Retro mode activated! Toggle off with "crt"' : 'Clean mode restored.' },
        { type: 'text', content: '' },
      ]);
      setOutput(prev => trimOutput([...prev, ...result]));
      setInput('');
      setIsLoading(false);
      return;
    }

    if (cmdLower === 'reboot') {
      sessionStorage.removeItem('booted');
      window.location.reload();
      return;
    }

    // Process via CommandProcessor
    const result = await commandProcessor.processCommand(cmd);
    setOutput(prev => trimOutput([...prev, ...tagOutput(result)]));
    setInput('');
    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    // Clear autocomplete hints on any key except Tab
    if (e.key !== 'Tab') {
      setAutocompleteHints([]);
    }

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
      const matches = ALL_COMMANDS.filter(cmd => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
        setAutocompleteHints([]);
      } else if (matches.length > 1) {
        setAutocompleteHints(matches);
      }
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      setOutput([]);
    }
  };

  const handleMobileSuggestion = useCallback((cmd) => {
    setInput(cmd);
    // Auto-submit for mobile
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.form?.requestSubmit();
      }
    }, 50);
  }, []);

  const handleTerminalClick = useCallback(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <>
      <div className="terminal-container" onClick={handleTerminalClick}>
        {/* Terminal Chrome (Title Bar) */}
        <div className="terminal-chrome">
          <div className="chrome-buttons">
            <span className="chrome-btn close" />
            <span className="chrome-btn minimize" />
            <span className="chrome-btn maximize" />
          </div>
          <span className="chrome-title">
            rajageethan — portfolio — bash
          </span>
        </div>

        {/* Terminal Output Area */}
        <div className="terminal" ref={scrollRef}>
          <div className="terminal-content" ref={terminalRef}>
            {output.map((item) => (
              <TerminalOutput
                key={item._id}
                item={item}
                onCopy={handleCopy}
              />
            ))}

            {/* Autocomplete hints */}
            {autocompleteHints.length > 0 && (
              <div className="autocomplete-hints">
                {autocompleteHints.map(h => (
                  <span key={h} className="autocomplete-hint">{h}</span>
                ))}
              </div>
            )}

            {/* Loading spinner */}
            {isLoading && (
              <div className="loading-spinner">
                <span className="spinner-dots"></span>
                <span>Processing...</span>
              </div>
            )}

            {/* Input line */}
            <form onSubmit={handleSubmit} className="input-line">
              <span className="prompt">{getPrompt()}</span>
              <div className="terminal-input-wrapper">
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
                  autoCapitalize="off"
                  autoCorrect="off"
                  enterKeyHint="send"
                />
                <span className="cursor-block" />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Mobile Command Suggestions */}
      <div className="mobile-suggestions">
        {MOBILE_CMDS.map(cmd => (
          <button key={cmd} onClick={() => handleMobileSuggestion(cmd)}>
            {cmd}
          </button>
        ))}
      </div>

      {/* Copy Toast */}
      <div className={`copy-toast ${copyToast ? 'visible' : ''}`}>
        ✓ Copied to clipboard
      </div>

      {/* First-Visit Keyboard Hints */}
      {showKeyHints && (
        <div className="keyboard-hints">
          <h4>⌨️ Keyboard Shortcuts</h4>
          <p><span className="hint-key">↑</span> <span className="hint-key">↓</span> Command history</p>
          <p><span className="hint-key">Tab</span> Auto-complete</p>
          <p><span className="hint-key">Ctrl+L</span> Clear screen</p>
          <p>Type <span className="hint-key">help</span> to start</p>
          <button className="dismiss-btn" onClick={dismissKeyHints}>Got it</button>
        </div>
      )}
    </>
  );
}