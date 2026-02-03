"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useValentine } from "@/context/ValentineContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { motion } from "framer-motion";

export default function SchedulePage() {
    const router = useRouter();
    const { schedule, setSchedule } = useValentine();
    const [localSchedule, setLocalSchedule] = useState(schedule);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLocalSchedule((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSchedule(localSchedule);
        router.push("/planning");
    };

    const days = [
        { key: "friday", label: "Friday (Feb 13)" },
        { key: "saturday", label: "Saturday (Feb 14) 💘" },
        { key: "sunday", label: "Sunday (Feb 15)" },
        { key: "monday", label: "Monday (Feb 16)" },
    ];

    return (
        <div className="flex items-center justify-center min-h-[90vh] px-4 py-8">
            <Card className="max-w-xl w-full">
                <div className="space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold text-black">
                            soooo when are you free? 🎉
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {days.map((day) => (
                            <motion.div
                                key={day.key}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * days.indexOf(day) }}
                            >
                                <Input
                                    label={day.label}
                                    name={day.key}

                                    value={localSchedule[day.key as keyof typeof localSchedule]}
                                    onChange={handleChange}
                                    placeholder={day.key === "friday" ? "e.g. Free after 5pm, free all day, busy all day..." : ""}
                                    required
                                />
                            </motion.div>
                        ))}

                        <div className="pt-4 flex justify-end">
                            <Button type="submit" size="lg" className="w-full md:w-auto">
                                nexttt
                            </Button>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    );
}
