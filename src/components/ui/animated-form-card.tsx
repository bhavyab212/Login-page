import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedFormCardProps {
    children: ReactNode;
    className?: string;
    pageKey: string;
}

export const AnimatedFormCard = ({ children, className, pageKey }: AnimatedFormCardProps) => {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pageKey}
                className={className}
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{
                    duration: 0.3,
                    ease: [0.25, 0.1, 0.25, 1],
                }}
                style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};
