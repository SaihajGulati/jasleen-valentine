"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useValentine } from "@/context/ValentineContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function PlanningPage() {
    const router = useRouter();
    const { schedule, setPreferences, preferences } = useValentine();
    const [localPrefs, setLocalPrefs] = useState(preferences);
    const [loading, setLoading] = useState(false);

    const getSurpriseText = (val: number) => {
        if (val < 20) return "just tell me when to be ready ⏰";
        if (val < 40) return "i need just a packing or dressing list... 🧳";
        if (val < 60) return "give me hints, but keep it a secret! 🤫";
        if (val < 80) return "tell me some things but not others 🫣";
        return "tell me exactly where we're going and when.📍";
    };

    const getInputText = (val: number) => {
        if (val < 20) return "you got it saihaj! i am good with anything 🎁";
        if (val < 40) return "give me a few options for overall plans to approve ✅";
        if (val < 60)
            return "let me pick between specific vibes or foods or activities 🍝";
        if (val < 80) return "let's brainstorm ideas together first 🧠";
        return "i want to plan everything together! 🤝";
    };

    const handleSubmit = async () => {
        setLoading(true);
        // Calculate text values before saving
        const finalInputText = getInputText(localPrefs.inputLevel);
        const finalSurpriseText = getSurpriseText(localPrefs.surpriseLevel);

        const prefsToSave = {
            ...localPrefs,
            inputText: finalInputText,
            surpriseText: finalSurpriseText,
        };

        setPreferences(prefsToSave);

        try {
            const { error } = await supabase.from("valentine_responses").insert([
                {
                    friday_plan: schedule.friday,
                    saturday_plan: schedule.saturday,
                    sunday_plan: schedule.sunday,
                    monday_plan: schedule.monday,
                    surprise_level: localPrefs.surpriseLevel,
                    surprise_text: finalSurpriseText,
                    input_level: localPrefs.inputLevel,
                    input_text: finalInputText,
                    anything_else: localPrefs.anythingElse,
                },
            ]);

            if (error) {
                console.error("Error submitting:", error.message, error.details, error.hint);
                alert(`Error: ${error.message || "Unknown error"}. Please take a screenshot!`);
            }
        } catch (err) {
            console.error("Unexpected error:", err);
        } finally {
            setLoading(false);
            router.push("/success");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[90vh] px-4 py-8">
            <Card className="max-w-xl w-full">
                <div className="space-y-8">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold text-black">
                            how involved do you want to be with
                        </h1>
                    </div>

                    <div className="space-y-8">
                        {/* Input Slider */}
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-purple-700">
                                planning?
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm font-medium text-black">
                                    <span className="w-1/3 text-left">Not at all</span>
                                    <span className="w-1/3 text-right">Let's co-plan</span>
                                </div>
                                <div className="relative w-full h-6 flex items-center">
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={localPrefs.inputLevel}
                                        onChange={(e) =>
                                            setLocalPrefs({
                                                ...localPrefs,
                                                inputLevel: parseInt(e.target.value),
                                            })
                                        }
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--primary)] z-20 relative"
                                    />
                                    <div
                                        className="absolute top-6 transform -translate-x-1/2 text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-full pointer-events-none z-10"
                                        style={{
                                            left: `calc(${localPrefs.inputLevel}% + (${8 - localPrefs.inputLevel * 0.15
                                                }px))`,
                                        }}
                                    >
                                        {localPrefs.inputLevel}%
                                    </div>
                                </div>
                            </div>
                            <motion.div
                                key={getInputText(localPrefs.inputLevel)}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center p-3 bg-purple-50 rounded-xl border border-purple-100 italic text-black mt-8"
                            >
                                {getInputText(localPrefs.inputLevel)}
                            </motion.div>
                        </div>

                        {/* Surprise Slider */}
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-purple-700">
                                knowing?
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm font-medium text-black">
                                    <span className="w-1/3 text-left">Total Surprise</span>
                                    <span className="w-1/3 text-right">Tell me everything</span>
                                </div>
                                <div className="relative w-full h-6 flex items-center">
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={localPrefs.surpriseLevel}
                                        onChange={(e) =>
                                            setLocalPrefs({
                                                ...localPrefs,
                                                surpriseLevel: parseInt(e.target.value),
                                            })
                                        }
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--primary)] z-20 relative"
                                    />
                                    <div
                                        className="absolute top-6 transform -translate-x-1/2 text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-full pointer-events-none z-10"
                                        style={{
                                            left: `calc(${localPrefs.surpriseLevel}% + (${8 - localPrefs.surpriseLevel * 0.15
                                                }px))`,
                                        }}
                                    >
                                        {localPrefs.surpriseLevel}%
                                    </div>
                                </div>
                            </div>
                            <motion.div
                                key={getSurpriseText(localPrefs.surpriseLevel)}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center p-3 bg-purple-50 rounded-xl border border-purple-100 italic text-black mt-8"
                            >
                                {getSurpriseText(localPrefs.surpriseLevel)}
                            </motion.div>
                        </div>

                        {/* Optional Text Area */}
                        <div className="space-y-4">
                            <Textarea
                                label="Anything else? (Optional)"
                                placeholder="Anything you really want to do or eat? Or the opposite? Or just general thoughts on life, liberty, and the pursuite of happiness?!"
                                value={localPrefs.anythingElse}
                                onChange={(e) =>
                                    setLocalPrefs({
                                        ...localPrefs,
                                        anythingElse: e.target.value,
                                    })
                                }
                                className="min-h-[80px]"
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <Button
                            onClick={handleSubmit}
                            size="lg"
                            className="w-full md:w-auto"
                            disabled={loading}
                        >
                            {loading ? "saving... 💓" : "it's all up to you now saihaj ✨"}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
