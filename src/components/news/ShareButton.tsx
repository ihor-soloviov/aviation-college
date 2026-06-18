"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Share2 } from "lucide-react";

type Props = {
    title?: string;
};

export const ShareButton = ({ title }: Props) => {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const url = typeof window !== "undefined" ? window.location.href : "";

        if (typeof navigator !== "undefined" && navigator.share) {
            try {
                await navigator.share({ title, url });
                return;
            } catch {
                // користувач скасував share — мовчки виходимо
                return;
            }
        }

        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // clipboard недоступний — нічого не робимо
        }
    };

    return (
        <Button
            variant="outline"
            size="sm"
            className="ml-auto bg-transparent cursor-pointer"
            onClick={handleShare}
        >
            {copied ? (
                <Check className="h-4 w-4 mr-2" />
            ) : (
                <Share2 className="h-4 w-4 mr-2" />
            )}
            {copied ? "Скопійовано" : "Поділитися"}
        </Button>
    );
};
