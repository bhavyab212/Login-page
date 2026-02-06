import { useState, useEffect } from 'react';
import { InteractiveNebulaShader } from './ui/liquid-shader';

interface LoadingPageProps {
    onLoadComplete?: () => void;
}

const LoadingPage: React.FC<LoadingPageProps> = ({
    onLoadComplete
}) => {
    const [displayText, setDisplayText] = useState('');
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
    const [isCompleting, setIsCompleting] = useState(false);

    const loadingMessages = [
        'Authenticating credentials...',
        'Verifying account details...',
        'Setting up your profile...',
        'Configuring preferences...',
        'Almost there...',
        'Just a few seconds more...',
        'Good things are coming...',
        'Done!'
    ];

    // Typewriter and backspace effect - shows each message once
    useEffect(() => {
        // If we've shown all messages, don't continue
        if (currentMessageIndex >= loadingMessages.length) {
            return;
        }

        const currentMessage = loadingMessages[currentMessageIndex];
        let charIndex = displayText.length;
        let typingInterval: number;

        if (isTyping) {
            // Typing effect
            if (charIndex < currentMessage.length) {
                typingInterval = setTimeout(() => {
                    setDisplayText(currentMessage.substring(0, charIndex + 1));
                }, 100); // Typing speed
            } else {
                // Finished typing current message
                if (currentMessageIndex < loadingMessages.length - 1) {
                    // Not the last message, wait then backspace
                    typingInterval = setTimeout(() => {
                        setIsTyping(false);
                    }, 1500); // Pause before backspacing
                } else {
                    // Last message "Done!" - trigger zoom animation then complete
                    typingInterval = setTimeout(() => {
                        setIsCompleting(true);
                        // Wait for animation to complete before calling onLoadComplete
                        setTimeout(() => {
                            if (onLoadComplete) {
                                onLoadComplete();
                            }
                        }, 1500); // Duration of zoom-in fade animation
                    }, 1500); // Show "Done!" for 1.5 seconds
                }
            }
        } else {
            // Backspace effect
            if (displayText.length > 0) {
                typingInterval = setTimeout(() => {
                    setDisplayText((prev) => prev.substring(0, prev.length - 1));
                }, 60); // Backspace speed
            } else {
                // Finished backspacing, move to next message
                setCurrentMessageIndex((prev) => prev + 1);
                setIsTyping(true);
            }
        }

        return () => clearTimeout(typingInterval);
    }, [displayText, currentMessageIndex, isTyping, loadingMessages, onLoadComplete]);

    return (
        <div className={`relative w-full h-screen overflow-hidden transition-all duration-1000 ${isCompleting ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
            }`}>
            {/* Liquid Nebula Shader Background */}
            <InteractiveNebulaShader disableCenterDimming={true} />

            {/* Loading Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="flex flex-col items-center space-y-12 px-4">
                    {/* Typewriter Text with Glassmorphism */}
                    <div className="text-center space-y-6 min-h-[120px] flex flex-col items-center justify-center">
                        <div className={`relative group transition-all duration-1000 ${isCompleting ? 'scale-125' : 'scale-100'
                            }`}>
                            {/* Glassmorphic container */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl animate-pulse"
                                style={{ animationDuration: '3s' }}
                            />

                            {/* Text content */}
                            <div className="relative px-12 py-8 flex items-center justify-center min-h-[80px] min-w-[400px]">
                                <p className="text-3xl md:text-4xl font-bold tracking-wide bg-gradient-to-r from-purple-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent animate-fadeIn">
                                    {displayText}
                                    {!isCompleting && (
                                        <span className="inline-block w-1 h-9 bg-gradient-to-b from-cyan-400 to-purple-400 ml-2 animate-pulse shadow-lg shadow-cyan-500/50"></span>
                                    )}
                                </p>
                            </div>

                            {/* Glow effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-cyan-600/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                    </div>

                    {/* Minimal Progress Dots */}
                    <div className="flex gap-2">
                        {loadingMessages.map((_, index) => (
                            <div
                                key={index}
                                className={`h-1.5 rounded-full transition-all duration-300 ${index === currentMessageIndex
                                        ? 'w-8 bg-white/60'
                                        : index < currentMessageIndex
                                            ? 'w-1.5 bg-white/40'
                                            : 'w-1.5 bg-white/15'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Vignette Effect */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50 pointer-events-none z-5" />
        </div>
    );
};

export default LoadingPage;
