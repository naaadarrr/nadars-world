import React, { useState } from 'react';
import { MacOSWindow, MacOSThemeProvider } from '../index';

const BasicExample: React.FC = () => {
  const [windows, setWindows] = useState([
    { id: 1, title: 'Finder', isForeground: true },
    { id: 2, title: 'TextEdit', isForeground: false },
    { id: 3, title: 'Calculator', isForeground: false },
  ]);

  const bringToForeground = (id: number) => {
    setWindows((prev) =>
      prev.map((window) => ({
        ...window,
        isForeground: window.id === id,
      })),
    );
  };

  const closeWindow = (id: number) => {
    setWindows((prev) => prev.filter((window) => window.id !== id));
  };

  return (
    <MacOSThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-8">
        {windows.map((window, index) => (
          <div
            key={window.id}
            style={{
              position: 'absolute',
              left: 100 + index * 50,
              top: 100 + index * 50,
              zIndex: window.isForeground ? 10 : 1,
            }}
            onClick={() => bringToForeground(window.id)}
          >
            <MacOSWindow
              title={window.title}
              onClose={() => closeWindow(window.id)}
              onMinimize={() => console.log(`${window.title} minimized`)}
              onMaximize={() => console.log(`${window.title} maximized`)}
              isForeground={window.isForeground}
              windowConstraints={{
                minWidth: 300,
                minHeight: 200,
              }}
            >
              <div className="p-6 h-full">
                <h2 className="text-xl font-semibold mb-4">{window.title}</h2>
                <p className="text-gray-600 mb-4">
                  This is a sample {window.title.toLowerCase()} window with macOS styling.
                </p>
                <div className="space-y-2">
                  <button className="macos-button">Sample Button</button>
                  <input
                    type="text"
                    placeholder="Type something..."
                    className="macos-input w-full"
                  />
                  <div className="p-3 bg-gray-50 rounded border">
                    <p className="text-sm">
                      Window ID: {window.id}
                      <br />
                      Foreground: {window.isForeground ? 'Yes' : 'No'}
                    </p>
                  </div>
                </div>
              </div>
            </MacOSWindow>
          </div>
        ))}

        {windows.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-white text-center">
              <h1 className="text-4xl font-bold mb-4">macOS Window Demo</h1>
              <p className="text-xl">All windows have been closed.</p>
              <button
                onClick={() =>
                  setWindows([{ id: Date.now(), title: 'New Window', isForeground: true }])
                }
                className="mt-4 px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Create New Window
              </button>
            </div>
          </div>
        )}
      </div>
    </MacOSThemeProvider>
  );
};

export default BasicExample;
