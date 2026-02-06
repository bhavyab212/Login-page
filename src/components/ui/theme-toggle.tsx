import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export function ThemeToggle() {
    const { theme, toggleTheme, isTransitioning } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            disabled={isTransitioning}
            className={`
                relative p-3 rounded-2xl transition-all duration-200 ease-out
                group overflow-hidden
                ${isTransitioning ? 'scale-90' : 'scale-100'}
                ${theme === 'dark'
                    ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 hover:from-violet-900/50 hover:to-indigo-900/50 border border-white/10 shadow-lg shadow-violet-500/10'
                    : 'bg-gradient-to-br from-amber-50 to-orange-100 hover:from-amber-100 hover:to-orange-200 border border-amber-200/50 shadow-lg shadow-amber-500/20'
                }
            `}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            {/* Glow effect */}
            <div className={`
                absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200
                ${theme === 'dark'
                    ? 'bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-indigo-500/20'
                    : 'bg-gradient-to-r from-amber-300/30 via-orange-300/30 to-yellow-300/30'
                }
            `} />

            {/* Icon container with rotation animation */}
            <div className={`relative z-10 transform transition-all duration-300 
                ${isTransitioning ? 'rotate-180 scale-0' : 'rotate-0 scale-100'}
                group-hover:rotate-12`}
            >
                {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                ) : (
                    <Moon className="w-5 h-5 text-indigo-600 drop-shadow-[0_0_8px_rgba(99,102,241,0.4)]" />
                )}
            </div>

            {/* Ripple effect on click */}
            <span className={`
                absolute inset-0 rounded-2xl transition-all duration-200
                group-active:bg-white/10 group-active:scale-95
            `} />
        </button>
    );
}
