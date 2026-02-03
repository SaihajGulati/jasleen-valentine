"use client";

import { useEffect } from "react";
import { Card } from "@/components/ui/Card";
import confetti from "canvas-confetti";
import { useValentine } from "@/context/ValentineContext";

export default function SuccessPage() {
    const { schedule, preferences } = useValentine();

    useEffect(() => {
        // Big confetti burst
        const end = Date.now() + 1000;

        const colors = ["#6B3FA0", "#ffffff", "#FFC0CB"];

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors,
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors,
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-[90vh] px-4 py-8">
            <Card className="max-w-xl w-full text-center space-y-8">
                <div className="space-y-4">
                    <h1 className="text-3xl md:text-5xl font-bold text-black">
                        it's a date!
                    </h1>
                </div>

                <div className="bg-purple-50 p-6 rounded-2xl text-left space-y-4 border border-purple-100">
                    <h2 className="text-lg font-semibold text-purple-700">
                        Recap
                    </h2>
                    <div className="space-y-2 text-sm text-gray-700">
                        <p>
                            <strong className="text-black">Friday:</strong> {schedule.friday}
                        </p>
                        <p>
                            <strong className="text-black">Saturday:</strong>{" "}
                            {schedule.saturday}
                        </p>
                        <p>
                            <strong className="text-black">Sunday:</strong> {schedule.sunday}
                        </p>
                        <p>
                            <strong className="text-black">Monday:</strong> {schedule.monday}
                        </p>
                        <hr className="border-purple-200 my-2" />
                        <p>
                            <strong className="text-black">Input Level:</strong>{" "}
                            {preferences.inputLevel}% - <span className="text-purple-600 italic">{preferences.inputText}</span>
                        </p>
                        <p>
                            <strong className="text-black">Knowing Level:</strong>{" "}
                            {preferences.surpriseLevel}% - <span className="text-purple-600 italic">{preferences.surpriseText}</span>
                        </p>
                        {preferences.anythingElse && (
                            <p>
                                <strong className="text-black">Anything Else:</strong>{" "}
                                {preferences.anythingElse}
                            </p>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="text-purple-600 font-medium">
                        ✅ Saved!
                    </p>
                    <p className="text-black italic">
                        can't wait to see youuuu
                    </p>
                </div>
            </Card>
        </div>
    );
}
