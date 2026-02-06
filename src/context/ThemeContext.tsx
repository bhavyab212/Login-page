import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
    isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme') as Theme;
            if (saved) return saved;
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'dark';
    });
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
    }, [theme]);

    const toggleTheme = () => {
        setIsTransitioning(true);

        // Quick transition - 300ms
        setTimeout(() => {
            setThemeState(prev => prev === 'dark' ? 'light' : 'dark');

            setTimeout(() => {
                setIsTransitioning(false);
            }, 300);
        }, 150);
    };

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isTransitioning }}>
            {/* Theme transition overlay */}
            <div
                className={`fixed inset-0 z-[200] pointer-events-none transition-opacity duration-300
                    ${isTransitioning
                        ? 'opacity-100'
                        : 'opacity-0'
                    }`}
                style={{
                    background: theme === 'dark'
                        ? 'radial-gradient(circle at center, rgba(0, 240, 255, 0.3), rgba(0,0,0,0.8))' // Cyan for dark mode
                        : 'radial-gradient(circle at center, rgba(37, 99, 235, 0.3), rgba(255,255,255,0.9))' // Blue for light mode
                }}
            />
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
