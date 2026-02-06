import { useState, useEffect } from "react";
import { Component as LoginPage } from "@/components/ui/animated-characters-login-page";
import { Component as SignUpPage } from "@/components/ui/animated-characters-signup-page";
import LoadingPage from "@/components/LoadingPage";
import { Spinner } from "@/components/ui/spinner";

export default function App() {
    const [currentPage, setCurrentPage] = useState<"login" | "signup" | "loading" | "main">("login");
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isZooming, setIsZooming] = useState(false);
    const [userData, setUserData] = useState<{ name?: string; email: string } | null>(null);

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash === "#signup") {
                setCurrentPage("signup");
            } else if (hash === "#login") {
                setCurrentPage("login");
            }
        };

        // Check initial hash
        const initialHash = window.location.hash;
        if (initialHash === "#signup" && currentPage !== "signup") {
            setCurrentPage("signup");
        }

        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    const handleNavigate = (page: "login" | "signup") => {
        if (currentPage === page) return;

        setIsTransitioning(true);

        // Wait for animation, then change page
        setTimeout(() => {
            window.location.hash = page === "signup" ? "#signup" : "#login";
            // The hash listener will update currentPage

            // Small delay after page switch before removing overlay for smoothness
            setTimeout(() => {
                setIsTransitioning(false);
            }, 500);
        }, 600);
    };

    const handleLoginSuccess = (email: string) => {
        setUserData({ email });
        setIsZooming(true);

        // Wait for zoom animation, then switch to loading page
        setTimeout(() => {
            setCurrentPage("loading");
            setIsZooming(false);
        }, 800);
    };

    const handleSignupSuccess = (name: string, email: string) => {
        setUserData({ name, email });
        setIsZooming(true);

        // Wait for zoom animation, then switch to loading page
        setTimeout(() => {
            setCurrentPage("loading");
            setIsZooming(false);
        }, 800);
    };

    const handleLoadComplete = () => {
        setCurrentPage("main");
    };

    return (
        <div className="relative">
            <div
                className={`transition-all duration-700 ease-in-out ${isZooming ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
                    }`}
            >
                {currentPage === "login" && (
                    <LoginPage
                        onNavigate={() => handleNavigate("signup")}
                        onLoginSuccess={handleLoginSuccess}
                    />
                )}

                {currentPage === "signup" && (
                    <SignUpPage
                        onNavigate={() => handleNavigate("login")}
                        onSignupSuccess={handleSignupSuccess}
                    />
                )}
            </div>

            {currentPage === "loading" && (
                <LoadingPage onLoadComplete={handleLoadComplete} />
            )}

            {currentPage === "main" && (
                <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                    <div className="text-center space-y-6 p-8">
                        <h1 className="text-6xl font-bold text-white">
                            Welcome{userData?.name ? `, ${userData.name}` : ''}! 🎉
                        </h1>
                        <p className="text-2xl text-purple-200">
                            You have successfully logged in
                        </p>
                        <p className="text-lg text-purple-300">
                            Email: {userData?.email}
                        </p>
                        <button
                            onClick={() => {
                                setUserData(null);
                                setCurrentPage("login");
                                window.location.hash = "#login";
                            }}
                            className="mt-8 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}

            {/* Transition Overlay */}
            {isTransitioning && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md transition-all duration-500 animate-in fade-in">
                    <Spinner />
                </div>
            )}
        </div>
    );
}
