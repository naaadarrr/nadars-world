import React, { useState, useEffect } from "react";

import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "../theme-provider";

function Header() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Add effect to handle theme transition
  useEffect(() => {
    // Add transition class to body when component mounts
    document.documentElement.classList.add("theme-transition");

    // Remove transition after changes are complete to prevent unwanted transitions
    const handleTransitionEnd = () => {
      document.documentElement.classList.remove("theme-transition");
    };

    document.documentElement.addEventListener(
      "transitionend",
      handleTransitionEnd
    );

    return () => {
      document.documentElement.removeEventListener(
        "transitionend",
        handleTransitionEnd
      );
    };
  }, []);

  // Add transition class before theme change and remove it after
  const handleThemeChange = () => {
    document.documentElement.classList.add("theme-transition");
    setTheme(theme === "light" ? "dark" : "light");
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Get the viewport height
      const viewportHeight = window.innerHeight;
      // Get the element's position relative to the viewport
      const elementRect = element.getBoundingClientRect();
      // Calculate the scroll position to center the element
      const scrollPosition =
        window.scrollY +
        elementRect.top -
        viewportHeight / 2 +
        elementRect.height / 2;

      // Special handling for first and last sections
      if (sectionId === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (sectionId === "newsletter") {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      } else {
        window.scrollTo({ top: scrollPosition, behavior: "smooth" });
      }
      setIsMenuOpen(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center p-3 bg-background w-full z-20">
        <div className="flex items-center">
          <div className="text-base text-[var(--primary)]">Nadar</div>
        </div>

        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          <ul className="hidden sm:flex items-center gap-4 social-link">
            <li>
              <button
                onClick={() => scrollToSection("hero")}
                className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                Projects
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("work")}
                className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                Work
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("moments")}
                className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                Moments
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("newsletter")}
                className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                Newsletter
              </button>
            </li>
          </ul>

          {/* Theme Toggle */}
          <button
            onClick={handleThemeChange}
            className="p-2 rounded-md bg-transparent hover:bg-[var(--accent)] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-[18px] w-[18px] text-[var(--muted-foreground)]" />
            ) : (
              <Sun className="h-[18px] w-[18px] text-[var(--muted-foreground)]" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden p-2 rounded-md hover:bg-[var(--accent)] transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-[18px] w-[18px] text-[var(--muted-foreground)]" />
            ) : (
              <Menu className="h-[18px] w-[18px] text-[var(--muted-foreground)]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="sm:hidden fixed inset-0 top-[57px] bg-background z-50">
          <ul className="flex flex-col items-center gap-6 pt-8">
            <li>
              <button
                onClick={() => scrollToSection("hero")}
                className="text-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                Projects
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("work")}
                className="text-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                Work
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("moments")}
                className="text-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                Moments
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("newsletter")}
                className="text-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                Newsletter
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Full width divider that breaks out of container */}
      <hr className="border-t border-[var(--border)] relative w-screen left-[50%] right-[50%] -translate-x-[50%]" />
    </div>
  );
}

export default Header;
