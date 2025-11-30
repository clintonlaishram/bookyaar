/* eslint-disable no-unused-vars */
import React, { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Trash2 } from "lucide-react";
import { IconCameraBolt, IconCameraFilled, IconCameraX, IconCancel } from "@tabler/icons-react";

export default function SelfieCapture({ onCapture }) {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [capturedFile, setCapturedFile] = useState(null);

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);

    const startCamera = useCallback(async () => {
        try {
            setError(null);
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                setError("Camera is not supported on this device.");
                return;
            }

            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: "environment",
                },
            });

            streamRef.current = stream;

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                await videoRef.current.play();
            }
        } catch (err) {
            console.error(err);
            setError("Unable to access camera. Please check permissions.");
        }
    }, []);

    const stopCamera = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
    }, []);

    // Cleanup on unmount only
    useEffect(() => {
        return () => {
            stopCamera();
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [stopCamera, previewUrl]);

    const handleOpen = async () => {
        setIsOpen(true);
        await startCamera();
    };

    const handleClose = () => {
        stopCamera();
        setIsOpen(false);
    };

    const handleCapture = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
            (blob) => {
                if (!blob) return;
                const file = new File([blob], `aadhaar-selfie-${Date.now()}.jpg`, {
                    type: "image/jpeg",
                });

                const url = URL.createObjectURL(file);

                // Clear old preview URL if exists
                if (previewUrl) {
                    URL.revokeObjectURL(previewUrl);
                }

                setCapturedFile(file);
                setPreviewUrl(url);
                onCapture && onCapture(file);
                handleClose();
            },
            "image/jpeg",
            0.9
        );
    };

    const handleRemove = () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
        setCapturedFile(null);
        onCapture && onCapture(null);
    };

    const handleRecapture = () => {
        // Keep previous image until a new one is captured, or clear it now:
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
        setCapturedFile(null);
        onCapture && onCapture(null);
        handleOpen();
    };

    return (
        <div className="space-y-3 mt-2">
            {/* Open camera / preview card – hidden when camera is open */}
            {!isOpen && (
                <>
                    <div className="h-64 w-full max-w-md bg-gray-50 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-3 p-4 rounded-xl transition-all duration-300 ease-out">
                        {previewUrl ? (
                            <img
                                src={previewUrl}
                                alt="Captured Aadhaar selfie"
                                className="w-full h-full object-contain rounded-lg transition-all duration-300 ease-out"
                            />
                        ) : (
                            <button
                                type="button"
                                onClick={handleOpen}
                                className="flex flex-col items-center justify-center gap-3 focus:outline-none"
                            >
                                <div className="w-12 h-12 rounded-full border flex items-center justify-center">
                                    <Camera className="w-5 h-5 text-gray-600" />
                                </div>
                                <p className="text-sm font-normal text-foreground mb-1">
                                    Click to open camera
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Align your face and Aadhaar card inside the box, then capture.
                                </p>
                            </button>
                        )}
                    </div>

                    {previewUrl && (
                        <div className="mt-3 flex items-center gap-2">
                            <Button
                                type="button"
                                size="sm"
                                variant={"secondary"}
                                onClick={handleRecapture}
                            >
                               <IconCameraBolt/> Recapture
                            </Button>
                            <Button
                                type="button"
                                size="sm"
                                variant="destructive"
                                onClick={handleRemove}
                            >
                               <IconCameraX/> Remove
                            </Button>
                        </div>
                    )}
                </>
            )}

            {/* Camera view */}
            {isOpen && (
                <div className="relative mt-3 w-full max-w-xl transition-all duration-300 ease-out">
                    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden">
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover scale-x-[-1]"
                            autoPlay
                            playsInline
                        />

                        {/* Aadhaar overlay area - smaller, landscape, top-left */}
                        <div className="pointer-events-none absolute inset-0 flex items-start justify-start">
                            <div className="border-2 border-white/90 rounded-md w-4/5  h-4/5 mt-[5%] ml-[10%] bg-black/20 shadow-[0_0_0_9999px_rgba(0,0,0,0.4)] transition-all duration-300 ease-out" />
                        </div>
                    </div>

                    {error && (
                        <p className="mt-2 text-xs text-red-500">{error}</p>
                    )}

                    <div className="absolute bottom-4 left-[40%] mt-3 flex items-center gap-3">
                        <Button type="button" variant={"outline"} onClick={handleCapture} className={"h-12 rounded-full bg-muted/60 backdrop-blur text-white hover:bg-muted/80"}>
                            <IconCameraFilled className="!w-6 !h-6" />
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            className={"h-12 rounded-full backdrop-blur bg-red-500/60 text-white hover:bg-red-600/90"}
                            onClick={handleClose}
                        >
                            <IconCancel className="!w-6 !h-6" />
                        </Button>
                    </div>

                    {/* Hidden canvas for capture */}
                    <canvas ref={canvasRef} className="hidden" />
                </div>
            )}
        </div>
    );
}
