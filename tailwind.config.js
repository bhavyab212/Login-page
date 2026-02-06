/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                }
            },
            animation: {
                "gradient-slow": "gradient-slow 15s ease infinite",
                "breathe": "breathe 120s ease-in-out infinite",
            },
            keyframes: {
                "gradient-slow": {
                    "0%, 100%": { "background-position": "0% 50%", "background-size": "200% 200%" },
                    "50%": { "background-position": "100% 50%", "background-size": "200% 200%" },
                },
                "breathe": {
                    "0%": { "background-color": "#ef4444", filter: "brightness(0.6)" },
                    "10%": { "background-color": "#ef4444", filter: "brightness(1.4)" },
                    "20%": { "background-color": "#f97316", filter: "brightness(0.6)" },
                    "30%": { "background-color": "#f97316", filter: "brightness(1.4)" },
                    "40%": { "background-color": "#eab308", filter: "brightness(0.6)" },
                    "50%": { "background-color": "#22c55e", filter: "brightness(1.4)" },
                    "60%": { "background-color": "#06b6d4", filter: "brightness(0.6)" },
                    "70%": { "background-color": "#3b82f6", filter: "brightness(1.4)" },
                    "80%": { "background-color": "#8b5cf6", filter: "brightness(0.6)" },
                    "90%": { "background-color": "#ec4899", filter: "brightness(1.4)" },
                    "100%": { "background-color": "#ef4444", filter: "brightness(0.6)" },
                },
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}
