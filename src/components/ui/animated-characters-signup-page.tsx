"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Sparkles } from "lucide-react";
import { Boxes } from "@/components/ui/background-boxes";
import { WavyBackground } from "@/components/ui/wavy-background";
import { AnimatedFormCard } from "@/components/ui/animated-form-card";
import { Spinner } from "@/components/ui/spinner";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "@/context/ThemeContext";


interface PupilProps {
    size?: number;
    maxDistance?: number;
    pupilColor?: string;
    forceLookX?: number;
    forceLookY?: number;
}

const Pupil = ({
    size = 12,
    maxDistance = 5,
    pupilColor = "black",
    forceLookX,
    forceLookY
}: PupilProps) => {
    const [mouseX, setMouseX] = useState<number>(0);
    const [mouseY, setMouseY] = useState<number>(0);
    const pupilRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMouseX(e.clientX);
            setMouseY(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const calculatePupilPosition = () => {
        if (!pupilRef.current) return { x: 0, y: 0 };

        if (forceLookX !== undefined && forceLookY !== undefined) {
            return { x: forceLookX, y: forceLookY };
        }

        const pupil = pupilRef.current.getBoundingClientRect();
        const pupilCenterX = pupil.left + pupil.width / 2;
        const pupilCenterY = pupil.top + pupil.height / 2;

        const deltaX = mouseX - pupilCenterX;
        const deltaY = mouseY - pupilCenterY;
        const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

        const angle = Math.atan2(deltaY, deltaX);
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        return { x, y };
    };

    const pupilPosition = calculatePupilPosition();

    return (
        <div
            ref={pupilRef}
            className="rounded-full"
            style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: pupilColor,
                transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
                transition: 'transform 0.1s ease-out',
            }}
        />
    );
};




interface EyeBallProps {
    size?: number;
    pupilSize?: number;
    maxDistance?: number;
    eyeColor?: string;
    pupilColor?: string;
    isBlinking?: boolean;
    forceLookX?: number;
    forceLookY?: number;
}

const EyeBall = ({
    size = 48,
    pupilSize = 16,
    maxDistance = 10,
    eyeColor = "white",
    pupilColor = "black",
    isBlinking = false,
    forceLookX,
    forceLookY
}: EyeBallProps) => {
    const [mouseX, setMouseX] = useState<number>(0);
    const [mouseY, setMouseY] = useState<number>(0);
    const eyeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMouseX(e.clientX);
            setMouseY(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const calculatePupilPosition = () => {
        if (!eyeRef.current) return { x: 0, y: 0 };

        if (forceLookX !== undefined && forceLookY !== undefined) {
            return { x: forceLookX, y: forceLookY };
        }

        const eye = eyeRef.current.getBoundingClientRect();
        const eyeCenterX = eye.left + eye.width / 2;
        const eyeCenterY = eye.top + eye.height / 2;

        const deltaX = mouseX - eyeCenterX;
        const deltaY = mouseY - eyeCenterY;
        const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

        const angle = Math.atan2(deltaY, deltaX);
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        return { x, y };
    };

    const pupilPosition = calculatePupilPosition();

    return (
        <div
            ref={eyeRef}
            className="rounded-full flex items-center justify-center transition-all duration-150"
            style={{
                width: `${size}px`,
                height: isBlinking ? '2px' : `${size}px`,
                backgroundColor: eyeColor,
                overflow: 'hidden',
            }}
        >
            {!isBlinking && (
                <div
                    className="rounded-full"
                    style={{
                        width: `${pupilSize}px`,
                        height: `${pupilSize}px`,
                        backgroundColor: pupilColor,
                        transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
                        transition: 'transform 0.1s ease-out',
                    }}
                />
            )}
        </div>
    );
};





interface SignUpPageProps {
    onNavigate?: () => void;
    onSignupSuccess?: (name: string, email: string) => void;
}

function SignUpPage({ onNavigate, onSignupSuccess }: SignUpPageProps) {
    const { theme } = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [mouseX, setMouseX] = useState<number>(0);
    const [mouseY, setMouseY] = useState<number>(0);
    const [isPurpleBlinking, setIsPurpleBlinking] = useState(false);
    const [isBlackBlinking, setIsBlackBlinking] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false);
    const [isPurplePeeking, setIsPurplePeeking] = useState(false);
    const purpleRef = useRef<HTMLDivElement>(null);
    const blackRef = useRef<HTMLDivElement>(null);
    const yellowRef = useRef<HTMLDivElement>(null);
    const orangeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMouseX(e.clientX);
            setMouseY(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Blinking effect for purple character
    useEffect(() => {
        const getRandomBlinkInterval = () => Math.random() * 4000 + 3000;

        const scheduleBlink = () => {
            const blinkTimeout = setTimeout(() => {
                setIsPurpleBlinking(true);
                setTimeout(() => {
                    setIsPurpleBlinking(false);
                    scheduleBlink();
                }, 150);
            }, getRandomBlinkInterval());

            return blinkTimeout;
        };

        const timeout = scheduleBlink();
        return () => clearTimeout(timeout);
    }, []);

    // Blinking effect for black character
    useEffect(() => {
        const getRandomBlinkInterval = () => Math.random() * 4000 + 3000;

        const scheduleBlink = () => {
            const blinkTimeout = setTimeout(() => {
                setIsBlackBlinking(true);
                setTimeout(() => {
                    setIsBlackBlinking(false);
                    scheduleBlink();
                }, 150);
            }, getRandomBlinkInterval());

            return blinkTimeout;
        };

        const timeout = scheduleBlink();
        return () => clearTimeout(timeout);
    }, []);

    // Looking at each other animation when typing starts
    useEffect(() => {
        if (isTyping) {
            setIsLookingAtEachOther(true);
            const timer = setTimeout(() => {
                setIsLookingAtEachOther(false);
            }, 800);
            return () => clearTimeout(timer);
        } else {
            setIsLookingAtEachOther(false);
        }
    }, [isTyping]);

    // Purple sneaky peeking animation when typing password and it's visible
    useEffect(() => {
        if ((password.length > 0 && showPassword) || (confirmPassword.length > 0 && showConfirmPassword)) {
            const schedulePeek = () => {
                const peekInterval = setTimeout(() => {
                    setIsPurplePeeking(true);
                    setTimeout(() => {
                        setIsPurplePeeking(false);
                    }, 800);
                }, Math.random() * 3000 + 2000);
                return peekInterval;
            };

            const firstPeek = schedulePeek();
            return () => clearTimeout(firstPeek);
        } else {
            setIsPurplePeeking(false);
        }
    }, [password, showPassword, confirmPassword, showConfirmPassword, isPurplePeeking]);

    const calculatePosition = (ref: React.RefObject<HTMLDivElement | null>) => {
        if (!ref.current) return { faceX: 0, faceY: 0, bodyRotation: 0 };

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 3;

        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;

        // Face movement with improved smoothness
        const faceX = Math.max(-15, Math.min(15, deltaX / 25));
        const faceY = Math.max(-10, Math.min(10, deltaY / 20));

        // Body lean with smoother response
        const bodySkew = Math.max(-6, Math.min(6, -deltaX / 100));

        return { faceX, faceY, bodySkew };
    };

    const purplePos = calculatePosition(purpleRef);
    const blackPos = calculatePosition(blackRef);
    const yellowPos = calculatePosition(yellowRef);
    const orangePos = calculatePosition(orangeRef);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 800));

        // Validation
        if (password !== confirmPassword) {
            setError("Passwords do not match. Please try again.");
            setIsLoading(false);
            return;
        }

        if (password.length < 4) {
            setError("Password must be at least 4 characters long.");
            setIsLoading(false);
            return;
        }

        console.log("✅ Sign up successful!");
        setIsLoading(false);
        // Call the success callback to trigger loading page
        if (onSignupSuccess) {
            onSignupSuccess(name, email);
        }
    };

    const passwordsVisible = (password.length > 0 && showPassword) || (confirmPassword.length > 0 && showConfirmPassword);
    const passwordsHidden = (password.length > 0 && !showPassword) || (confirmPassword.length > 0 && !showConfirmPassword);

    return (
        <div className={`min-h-screen relative w-full overflow-hidden flex flex-col items-center justify-center transition-colors duration-200
            ${theme === 'dark'
                ? 'bg-slate-900'
                : 'bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50'
            }`}
        >
            {/* Theme Toggle - Fixed Position */}
            <div className="fixed top-6 right-6 z-50 pointer-events-auto">
                <ThemeToggle />
            </div>

            <div className={`absolute inset-0 w-full h-full z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none transition-colors duration-200
                ${theme === 'dark' ? 'bg-slate-900' : 'bg-white/30'}`}
            />
            {theme === 'dark' && <Boxes />}

            {/* Light mode decorative elements */}
            {theme === 'light' && (
                <>
                    <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-violet-200/40 to-purple-300/30 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-amber-200/40 to-orange-300/30 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-rose-200/20 to-pink-200/20 rounded-full blur-3xl" />
                </>
            )}

            <div className="w-full h-full grid lg:grid-cols-2 relative z-30 min-h-screen pointer-events-none">
                {/* Left Content Section */}
                <div className={`relative hidden lg:flex flex-col justify-between p-12 pointer-events-none transition-colors duration-200
                    ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}
                >
                    <div className="relative z-20">
                        <div className="flex items-center gap-2 text-lg font-semibold">
                            <div className={`size-8 rounded-lg backdrop-blur-sm flex items-center justify-center transition-colors duration-200
                                ${theme === 'dark'
                                    ? 'bg-primary-foreground/10'
                                    : 'bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/30'
                                }`}
                            >
                                <Sparkles className={`size-4 ${theme === 'light' ? 'text-white' : ''}`} />
                            </div>
                            <span className={theme === 'light' ? 'bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent font-bold' : ''}>
                                YourBrand
                            </span>
                        </div>
                    </div>

                    <div className="relative z-20 flex items-end justify-center h-[500px]">
                        {/* Cartoon Characters */}
                        <div className="relative" style={{ width: '550px', height: '400px' }}>
                            {/* Purple tall rectangle character - Back layer */}
                            <div
                                ref={purpleRef}
                                className="absolute bottom-0 transition-all duration-700 ease-in-out"
                                style={{
                                    left: '70px',
                                    width: '180px',
                                    height: (isTyping || passwordsHidden) ? '440px' : '400px',
                                    backgroundColor: '#6C3FF5',
                                    borderRadius: '10px 10px 0 0',
                                    zIndex: 1,
                                    transform: passwordsVisible
                                        ? `skewX(0deg)`
                                        : (isTyping || passwordsHidden)
                                            ? `skewX(${(purplePos.bodySkew || 0) - 12}deg) translateX(40px)`
                                            : `skewX(${purplePos.bodySkew || 0}deg)`,
                                    transformOrigin: 'bottom center',
                                }}
                            >
                                {/* Eyes */}
                                <div
                                    className="absolute flex gap-8 transition-all duration-700 ease-in-out"
                                    style={{
                                        left: passwordsVisible ? `${20}px` : isLookingAtEachOther ? `${55}px` : `${45 + purplePos.faceX}px`,
                                        top: passwordsVisible ? `${35}px` : isLookingAtEachOther ? `${65}px` : `${40 + purplePos.faceY}px`,
                                    }}
                                >
                                    <EyeBall
                                        size={18}
                                        pupilSize={7}
                                        maxDistance={5}
                                        eyeColor="white"
                                        pupilColor="#2D2D2D"
                                        isBlinking={isPurpleBlinking}
                                        forceLookX={passwordsVisible ? (isPurplePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined}
                                        forceLookY={passwordsVisible ? (isPurplePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined}
                                    />
                                    <EyeBall
                                        size={18}
                                        pupilSize={7}
                                        maxDistance={5}
                                        eyeColor="white"
                                        pupilColor="#2D2D2D"
                                        isBlinking={isPurpleBlinking}
                                        forceLookX={passwordsVisible ? (isPurplePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined}
                                        forceLookY={passwordsVisible ? (isPurplePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined}
                                    />
                                </div>
                            </div>

                            {/* Black tall rectangle character - Middle layer */}
                            <div
                                ref={blackRef}
                                className="absolute bottom-0 transition-all duration-700 ease-in-out"
                                style={{
                                    left: '240px',
                                    width: '120px',
                                    height: '310px',
                                    backgroundColor: '#2D2D2D',
                                    borderRadius: '8px 8px 0 0',
                                    zIndex: 2,
                                    transform: passwordsVisible
                                        ? `skewX(0deg)`
                                        : isLookingAtEachOther
                                            ? `skewX(${(blackPos.bodySkew || 0) * 1.5 + 10}deg) translateX(20px)`
                                            : (isTyping || passwordsHidden)
                                                ? `skewX(${(blackPos.bodySkew || 0) * 1.5}deg)`
                                                : `skewX(${blackPos.bodySkew || 0}deg)`,
                                    transformOrigin: 'bottom center',
                                }}
                            >
                                {/* Eyes */}
                                <div
                                    className="absolute flex gap-6 transition-all duration-700 ease-in-out"
                                    style={{
                                        left: passwordsVisible ? `${10}px` : isLookingAtEachOther ? `${32}px` : `${26 + blackPos.faceX}px`,
                                        top: passwordsVisible ? `${28}px` : isLookingAtEachOther ? `${12}px` : `${32 + blackPos.faceY}px`,
                                    }}
                                >
                                    <EyeBall
                                        size={16}
                                        pupilSize={6}
                                        maxDistance={4}
                                        eyeColor="white"
                                        pupilColor="#2D2D2D"
                                        isBlinking={isBlackBlinking}
                                        forceLookX={passwordsVisible ? -4 : isLookingAtEachOther ? 0 : undefined}
                                        forceLookY={passwordsVisible ? -4 : isLookingAtEachOther ? -4 : undefined}
                                    />
                                    <EyeBall
                                        size={16}
                                        pupilSize={6}
                                        maxDistance={4}
                                        eyeColor="white"
                                        pupilColor="#2D2D2D"
                                        isBlinking={isBlackBlinking}
                                        forceLookX={passwordsVisible ? -4 : isLookingAtEachOther ? 0 : undefined}
                                        forceLookY={passwordsVisible ? -4 : isLookingAtEachOther ? -4 : undefined}
                                    />
                                </div>
                            </div>

                            {/* Orange semi-circle character - Front left */}
                            <div
                                ref={orangeRef}
                                className="absolute bottom-0 transition-all duration-700 ease-in-out"
                                style={{
                                    left: '0px',
                                    width: '240px',
                                    height: '200px',
                                    zIndex: 3,
                                    backgroundColor: '#FF9B6B',
                                    borderRadius: '120px 120px 0 0',
                                    transform: passwordsVisible ? `skewX(0deg)` : `skewX(${orangePos.bodySkew || 0}deg)`,
                                    transformOrigin: 'bottom center',
                                }}
                            >
                                {/* Eyes - just pupils, no white */}
                                <div
                                    className="absolute flex gap-8 transition-all duration-200 ease-out"
                                    style={{
                                        left: passwordsVisible ? `${50}px` : `${82 + (orangePos.faceX || 0)}px`,
                                        top: passwordsVisible ? `${85}px` : `${90 + (orangePos.faceY || 0)}px`,
                                    }}
                                >
                                    <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={passwordsVisible ? -5 : undefined} forceLookY={passwordsVisible ? -4 : undefined} />
                                    <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={passwordsVisible ? -5 : undefined} forceLookY={passwordsVisible ? -4 : undefined} />
                                </div>
                            </div>

                            {/* Yellow tall rectangle character - Front right */}
                            <div
                                ref={yellowRef}
                                className="absolute bottom-0 transition-all duration-700 ease-in-out"
                                style={{
                                    left: '310px',
                                    width: '140px',
                                    height: '230px',
                                    backgroundColor: '#E8D754',
                                    borderRadius: '70px 70px 0 0',
                                    zIndex: 4,
                                    transform: passwordsVisible ? `skewX(0deg)` : `skewX(${yellowPos.bodySkew || 0}deg)`,
                                    transformOrigin: 'bottom center',
                                }}
                            >
                                {/* Eyes - just pupils, no white */}
                                <div
                                    className="absolute flex gap-6 transition-all duration-200 ease-out"
                                    style={{
                                        left: passwordsVisible ? `${20}px` : `${52 + (yellowPos.faceX || 0)}px`,
                                        top: passwordsVisible ? `${35}px` : `${40 + (yellowPos.faceY || 0)}px`,
                                    }}
                                >
                                    <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={passwordsVisible ? -5 : undefined} forceLookY={passwordsVisible ? -4 : undefined} />
                                    <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={passwordsVisible ? -5 : undefined} forceLookY={passwordsVisible ? -4 : undefined} />
                                </div>
                                {/* Horizontal line for mouth */}
                                <div
                                    className="absolute w-20 h-[4px] bg-[#2D2D2D] rounded-full transition-all duration-200 ease-out"
                                    style={{
                                        left: passwordsVisible ? `${10}px` : `${40 + (yellowPos.faceX || 0)}px`,
                                        top: passwordsVisible ? `${88}px` : `${88 + (yellowPos.faceY || 0)}px`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="relative z-20 flex items-center gap-8 text-sm text-primary-foreground/60 pointer-events-auto">
                        <a href="#" className="hover:text-primary-foreground transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-primary-foreground transition-colors">
                            Terms of Service
                        </a>
                        <a href="#" className="hover:text-primary-foreground transition-colors">
                            Contact
                        </a>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
                    <div className="absolute top-1/4 right-1/4 size-64 bg-primary-foreground/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 left-1/4 size-96 bg-primary-foreground/5 rounded-full blur-3xl" />
                </div>

                {/* Right Sign Up Section */}
                <div className="relative flex items-center justify-center p-8 overflow-hidden pointer-events-none">
                    {/* Wavy Background Effect - Theme aware */}
                    <WavyBackground
                        containerClassName="absolute inset-0"
                        colors={theme === 'dark'
                            ? ["#FFD700", "#FF8C00", "#C71585", "#4B0082", "#4169E1"]
                            : ["#E879F9", "#A78BFA", "#60A5FA", "#34D399", "#FBBF24"]
                        }
                        waveWidth={70}
                        backgroundFill={theme === 'dark' ? "rgba(15, 23, 42, 0.9)" : "rgba(255, 251, 245, 0.6)"}
                        blur={15}
                        speed="slow"
                        waveOpacity={theme === 'dark' ? 0.3 : 0.2}
                    >
                        <div />
                    </WavyBackground>

                    {/* Enhanced Glassmorphic container - Theme aware */}
                    <AnimatedFormCard
                        pageKey="signup"
                        className={`relative w-full max-w-[420px] backdrop-blur-xl rounded-3xl p-9 pointer-events-auto overflow-hidden transition-all duration-200
                            ${theme === 'dark'
                                ? 'bg-white/5 shadow-[0_0_60px_rgba(234,179,8,0.4)] border border-white/20 ring-1 ring-white/10'
                                : 'bg-white/90 shadow-[0_8px_40px_rgba(139,92,246,0.25)] border border-violet-200/50 ring-1 ring-violet-100/50'
                            }`}
                    >
                        {/* Shimmer/Reflection effect */}
                        <div className={`absolute inset-0 pointer-events-none ${theme === 'dark' ? 'bg-white/5' : 'bg-gradient-to-br from-white/40 to-transparent'}`} />
                        <div className={`absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl via-transparent to-transparent opacity-30 pointer-events-none
                            ${theme === 'dark' ? 'from-white/10' : 'from-violet-200/30'}`}
                        />

                        {/* Mobile Logo */}
                        <div className={`lg:hidden flex items-center justify-center gap-2 text-lg font-semibold mb-12
                            ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}
                        >
                            <div className={`size-8 rounded-lg flex items-center justify-center
                                ${theme === 'dark' ? 'bg-primary/10' : 'bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg'}`}
                            >
                                <Sparkles className={`size-4 ${theme === 'dark' ? 'text-primary' : 'text-white'}`} />
                            </div>
                            <span className={theme === 'light' ? 'bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent font-bold' : ''}>
                                YourBrand
                            </span>
                        </div>

                        {/* Header */}
                        <div className="text-center mb-10 relative z-10">
                            <h1 className={`text-4xl font-black tracking-tighter mb-3 drop-shadow-md transition-colors duration-200
                                ${theme === 'dark' ? 'text-white' : 'bg-gradient-to-r from-violet-700 via-purple-600 to-indigo-700 bg-clip-text text-transparent'}`}
                            >
                                Create an account
                            </h1>
                            <p className={`text-sm font-extrabold tracking-wide transition-colors duration-200
                                ${theme === 'dark' ? 'text-white/80' : 'text-slate-500'}`}
                            >
                                GET STARTED WITH YOUR FREE ACCOUNT
                            </p>
                        </div>

                        {/* Sign Up Form */}
                        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="name"
                                    className={`text-sm font-black tracking-wide transition-colors duration-200
                                        ${theme === 'dark' ? 'text-white/90' : 'text-slate-700'}`}
                                >
                                    FULL NAME
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Naruto Usumika"
                                    value={name}
                                    autoComplete="off"
                                    onChange={(e) => setName(e.target.value)}
                                    onFocus={() => setIsTyping(true)}
                                    onBlur={() => setIsTyping(false)}
                                    required
                                    className={`h-12 font-black rounded-xl transition-all duration-200
                                        ${theme === 'dark'
                                            ? 'bg-white/50 border-black/20 text-black placeholder:text-black/60'
                                            : 'bg-white border-violet-200 text-slate-800 placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-200 shadow-sm'
                                        }`}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="email"
                                    className={`text-sm font-black tracking-wide transition-colors duration-200
                                        ${theme === 'dark' ? 'text-white/90' : 'text-slate-700'}`}
                                >
                                    EMAIL ADDRESS
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="sukuna@gmail.com"
                                    value={email}
                                    autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setIsTyping(true)}
                                    onBlur={() => setIsTyping(false)}
                                    required
                                    className={`h-12 font-black rounded-xl transition-all duration-200
                                        ${theme === 'dark'
                                            ? 'bg-white/50 border-black/20 text-black placeholder:text-black/60'
                                            : 'bg-white border-violet-200 text-slate-800 placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-200 shadow-sm'
                                        }`}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="password"
                                    className={`text-sm font-black tracking-wide transition-colors duration-200
                                        ${theme === 'dark' ? 'text-white/90' : 'text-slate-700'}`}
                                >
                                    PASSWORD
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className={`h-12 pr-10 rounded-xl transition-all duration-200
                                            ${theme === 'dark'
                                                ? 'bg-background border-border/60 focus:border-primary'
                                                : 'bg-white border-violet-200 text-slate-800 placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-200 shadow-sm'
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors
                                            ${theme === 'dark'
                                                ? 'text-muted-foreground hover:text-foreground'
                                                : 'text-slate-400 hover:text-violet-600'
                                            }`}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="size-5" />
                                        ) : (
                                            <Eye className="size-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="confirmPassword"
                                    className={`text-sm font-black tracking-wide transition-colors duration-200
                                        ${theme === 'dark' ? 'text-white/90' : 'text-slate-700'}`}
                                >
                                    CONFIRM PASSWORD
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        className={`h-12 pr-10 rounded-xl transition-all duration-200
                                            ${theme === 'dark'
                                                ? 'bg-background border-border/60 focus:border-primary'
                                                : 'bg-white border-violet-200 text-slate-800 placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-200 shadow-sm'
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors
                                            ${theme === 'dark'
                                                ? 'text-muted-foreground hover:text-foreground'
                                                : 'text-slate-400 hover:text-violet-600'
                                            }`}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="size-5" />
                                        ) : (
                                            <Eye className="size-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-start space-x-2">
                                <Checkbox id="terms" required className={theme === 'light' ? 'border-violet-300 data-[state=checked]:bg-violet-600' : ''} />
                                <Label
                                    htmlFor="terms"
                                    className={`text-sm font-extrabold cursor-pointer leading-relaxed transition-colors duration-200
                                        ${theme === 'dark' ? 'text-white' : 'text-slate-600'}`}
                                >
                                    I agree to the{" "}
                                    <a href="#" className={`hover:underline transition-colors
                                        ${theme === 'dark' ? 'text-white hover:text-white/80' : 'text-violet-600 hover:text-violet-700'}`}>
                                        Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a href="#" className={`hover:underline transition-colors
                                        ${theme === 'dark' ? 'text-white hover:text-white/80' : 'text-violet-600 hover:text-violet-700'}`}>
                                        Privacy Policy
                                    </a>
                                </Label>
                            </div>

                            {error && (
                                <div className={`p-3 text-sm rounded-lg transition-colors duration-200
                                    ${theme === 'dark'
                                        ? 'text-red-400 bg-red-950/20 border border-red-900/30'
                                        : 'text-red-600 bg-red-50 border border-red-200'
                                    }`}
                                >
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                className={`relative w-full h-12 text-base font-medium border-0 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden group
                                    ${theme === 'dark'
                                        ? 'bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-700 hover:via-purple-600 hover:to-indigo-700 text-white shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60'
                                        : 'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/40 hover:shadow-xl hover:shadow-violet-500/50'
                                    }`}
                                size="lg"
                                disabled={isLoading}
                            >
                                <span className="relative z-10">{isLoading ? "Creating account..." : "Sign up"}</span>
                                {/* Animated shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                            </Button>
                        </form>

                        {/* Social Sign Up */}
                        <div className="mt-6">
                            <Button
                                variant="outline"
                                className={`relative w-full h-12 backdrop-blur-md transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] group
                                    ${theme === 'dark'
                                        ? 'bg-white/90 border-gray-200 hover:bg-white hover:border-gray-300 shadow-md hover:shadow-lg'
                                        : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-violet-200 shadow-sm hover:shadow-md'
                                    }`}
                                type="button"
                            >
                                {/* Google Logo SVG */}
                                <svg className="mr-3 size-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                <span className={`font-medium ${theme === 'dark' ? 'text-gray-700' : 'text-slate-600'}`}>
                                    Continue with Google
                                </span>
                            </Button>
                        </div>

                        {/* Login Link */}
                        <div className={`text-center text-sm font-extrabold mt-8 relative z-10 transition-colors duration-200
                            ${theme === 'dark' ? 'text-white/70' : 'text-slate-500'}`}
                        >
                            Already have an account?{" "}
                            <a
                                href="#login"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onNavigate?.();
                                }}
                                className={`font-black hover:underline underline-offset-4 transition-colors duration-200
                                    ${theme === 'dark' ? 'text-white' : 'text-violet-600 hover:text-violet-700'}`}
                            >
                                Log in
                            </a>
                        </div>
                    </AnimatedFormCard>
                    {/* End glassmorphic container */}
                </div>
            </div>

            {/* Loading Overlay */}
            {isLoading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md transition-all duration-200">
                    <Spinner />
                </div>
            )}
        </div>
    );
}



export const Component = SignUpPage;
