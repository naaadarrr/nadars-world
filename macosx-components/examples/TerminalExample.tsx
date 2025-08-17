import React, { useState, useRef, useEffect } from 'react';
import { MacOSWindow, MacOSThemeProvider } from '../index';

const TerminalExample: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ command: string; output: string }>>([
    {
      command: '',
      output: `     __  __ 
 _  /  \\(_  
| \\/\\__/__) 
  /         

last login: ${new Date().toLocaleTimeString()}
type 'help' to see available commands

`,
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    let output = '';
    const cmd = input.toLowerCase().trim();

    switch (cmd) {
      case 'help':
        output = `Available commands:
  help     - Show this help message
  clear    - Clear the terminal
  date     - Show current date and time
  echo     - Echo back the input
  whoami   - Show current user
  pwd      - Show current directory`;
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'date':
        output = new Date().toString();
        break;
      case 'whoami':
        output = 'user';
        break;
      case 'pwd':
        output = '/Users/user';
        break;
      default:
        if (cmd.startsWith('echo ')) {
          output = cmd.substring(5);
        } else {
          output = `command not found: ${cmd}`;
        }
    }

    setHistory((prev) => [...prev, { command: input, output }]);
    setInput('');
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [history]);

  return (
    <MacOSThemeProvider>
      <div className="min-h-screen bg-gray-100 p-8">
        <MacOSWindow
          title="Terminal"
          onClose={() => console.log('Terminal closed')}
          onMinimize={() => console.log('Terminal minimized')}
          onMaximize={() => console.log('Terminal maximized')}
          isForeground={true}
          windowConstraints={{
            minWidth: 400,
            minHeight: 300,
          }}
        >
          <div className="terminal-content macos-scrollbar h-full">
            <div className="space-y-1">
              {history.map((entry, index) => (
                <div key={index}>
                  {entry.command && (
                    <div className="flex">
                      <span className="text-green-400">$ </span>
                      <span className="text-white">{entry.command}</span>
                    </div>
                  )}
                  {entry.output && (
                    <pre className="text-green-400 whitespace-pre-wrap">{entry.output}</pre>
                  )}
                </div>
              ))}
              <form onSubmit={handleSubmit} className="flex">
                <span className="text-green-400">$ </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="terminal-input flex-1"
                  autoComplete="off"
                  spellCheck={false}
                />
              </form>
            </div>
          </div>
        </MacOSWindow>
      </div>
    </MacOSThemeProvider>
  );
};

export default TerminalExample;
