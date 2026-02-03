"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Schedule {
    friday: string;
    saturday: string;
    sunday: string;
    monday: string;
}

interface Preferences {
    surpriseLevel: number; // 0-100
    surpriseText: string;
    inputLevel: number; // 0-100
    inputText: string;
    anythingElse: string;
}

interface ValentineContextType {
    schedule: Schedule;
    setSchedule: (schedule: Schedule) => void;
    preferences: Preferences;
    setPreferences: (preferences: Preferences) => void;
}

const defaultSchedule = {
    friday: "",
    saturday: "",
    sunday: "",
    monday: "",
};

const defaultPreferences = {
    surpriseLevel: 50,
    surpriseText: "",
    inputLevel: 50,
    inputText: "",
    anythingElse: "",
};

const ValentineContext = createContext<ValentineContextType | undefined>(
    undefined
);

export function ValentineProvider({ children }: { children: ReactNode }) {
    const [schedule, setSchedule] = useState<Schedule>(defaultSchedule);
    const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);

    return (
        <ValentineContext.Provider
            value={{ schedule, setSchedule, preferences, setPreferences }}
        >
            {children}
        </ValentineContext.Provider>
    );
}

export function useValentine() {
    const context = useContext(ValentineContext);
    if (context === undefined) {
        throw new Error("useValentine must be used within a ValentineProvider");
    }
    return context;
}
