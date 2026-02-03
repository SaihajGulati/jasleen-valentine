import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
}

export function Card({ children, className }: CardProps) {
    return (
        <div
            className={cn(
                "bg-white border border-white/20 rounded-3xl p-8 shadow-2xl text-slate-900",
                className
            )}
        >
            {children}
        </div>
    );
}
