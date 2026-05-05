"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProgressBar } from "../ui/ProgressBar";
import { useRouter } from "next/navigation";

export function DropZone() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const validateAndUpload = async (file: File) => {
    setError(null);
    if (!file.name.endsWith(".txt")) {
      setError("Please upload a .txt file (WhatsApp export).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File exceeds 5MB limit.");
      return;
    }

    setIsUploading(true);
    setProgress(20);

    const formData = new FormData();
    formData.append("chatFile", file);

    try {
      const response = await fetch("http://localhost:3001/api/analyze", {
        method: "POST",
        body: formData,
      });

      setProgress(80);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Analysis failed");
      }

      const data = await response.json();
      setProgress(100);
      
      localStorage.setItem("ghosted_ai_results", JSON.stringify(data));
      
      setTimeout(() => {
        router.push("/results");
      }, 500);

    } catch (err: any) {
      setError(err.message || "An error occurred during upload.");
      setIsUploading(false);
      setProgress(0);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndUpload(file);
    }
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndUpload(file);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <motion.div
        animate={{
          scale: isDragOver ? 1.02 : 1,
          borderColor: error ? "var(--color-red)" : isDragOver ? "var(--color-teal)" : "var(--color-border)",
          backgroundColor: isDragOver ? "rgba(0,229,192,0.05)" : "var(--color-surface)",
        }}
        transition={{ duration: 0.2 }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-3xl backdrop-blur-sm transition-shadow",
          isDragOver && "shadow-[0_0_40px_rgba(0,229,192,0.15)]",
          error && "shadow-[0_0_30px_rgba(255,69,96,0.1)]"
        )}
      >
        <input
          type="file"
          accept=".txt"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          disabled={isUploading}
        />

        <div className="flex flex-col items-center text-center space-y-4 pointer-events-none">
          <motion.div
            animate={{ y: isDragOver ? -8 : 0 }}
            className={cn(
              "p-4 rounded-full bg-bg-secondary border",
              error ? "border-red/20 text-red" : "border-border text-text-secondary"
            )}
          >
            <i className={cn("text-3xl", error ? "fa-solid fa-triangle-exclamation" : "fa-solid fa-file-arrow-up")} />
          </motion.div>

          {!isUploading && !error && (
            <div>
              <p className="text-xl font-medium text-text-primary mb-1">
                Drag & drop your chat export
              </p>
              <p className="text-sm text-text-muted">
                or click to browse (.txt files up to 5MB)
              </p>
            </div>
          )}

          {error && (
            <div>
              <p className="text-lg font-medium text-red mb-1">{error}</p>
              <p className="text-sm text-text-muted">Click to try again</p>
            </div>
          )}

          {isUploading && (
            <div className="w-full max-w-xs space-y-4">
              <p className="text-lg font-medium text-text-primary">
                Analyzing emotional damage... {progress}%
              </p>
              <ProgressBar progress={progress} />
            </div>
          )}
        </div>
      </motion.div>

      <div className="flex items-center justify-center gap-2 text-sm text-text-secondary">
        <i className="fa-solid fa-lock text-text-muted" />
        <p>Your chat is analyzed in-session only. We never store your messages.</p>
      </div>
    </div>
  );
}
