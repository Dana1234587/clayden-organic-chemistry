'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TextToSpeechProps {
    text: string;
    sectionId: string;
    title?: string;
}

export default function TextToSpeech({ text, sectionId, title }: TextToSpeechProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [isSupported, setIsSupported] = useState(true);
    const [showControls, setShowControls] = useState(false);
    const [progress, setProgress] = useState(0);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const textRef = useRef(text);

    // Check if Web Speech API is supported
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsSupported('speechSynthesis' in window);
        }
    }, []);

    // Update text ref when text changes
    useEffect(() => {
        textRef.current = text;
    }, [text]);

    // Clean text for speech (remove markdown, special characters)
    const cleanTextForSpeech = useCallback((rawText: string) => {
        return rawText
            .replace(/[•●◆▪]/g, '') // Remove bullet points
            .replace(/\*\*/g, '') // Remove bold markdown
            .replace(/\*/g, '') // Remove italic markdown
            .replace(/#{1,6}\s/g, '') // Remove headers
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Replace links with text
            .replace(/`[^`]+`/g, '') // Remove code blocks
            .replace(/[_~]/g, '') // Remove underscores and tildes
            .replace(/\s+/g, ' ') // Normalize whitespace
            .trim();
    }, []);

    const speak = useCallback(() => {
        if (!isSupported || !textRef.current) return;

        // Cancel any existing speech
        window.speechSynthesis.cancel();

        const cleanedText = cleanTextForSpeech(textRef.current);
        const utterance = new SpeechSynthesisUtterance(cleanedText);

        // Configure speech
        utterance.lang = 'en-US';
        utterance.rate = speed;
        utterance.pitch = 1;
        utterance.volume = 1;

        // Select a good English voice
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(
            voice => voice.lang.startsWith('en') && voice.name.includes('Google')
        ) || voices.find(
            voice => voice.lang.startsWith('en')
        );

        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        // Event handlers
        utterance.onstart = () => {
            setIsPlaying(true);
            setIsPaused(false);
        };

        utterance.onend = () => {
            setIsPlaying(false);
            setIsPaused(false);
            setProgress(0);
        };

        utterance.onerror = () => {
            setIsPlaying(false);
            setIsPaused(false);
            setProgress(0);
        };

        // Track progress
        let progressInterval: NodeJS.Timeout;
        utterance.onstart = () => {
            setIsPlaying(true);
            setIsPaused(false);
            const totalDuration = cleanedText.length / (speed * 15); // Rough estimate
            let elapsed = 0;
            progressInterval = setInterval(() => {
                elapsed += 0.1;
                setProgress(Math.min((elapsed / totalDuration) * 100, 100));
            }, 100);
        };

        utterance.onend = () => {
            setIsPlaying(false);
            setIsPaused(false);
            setProgress(100);
            clearInterval(progressInterval);
            setTimeout(() => setProgress(0), 500);
        };

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
    }, [speed, isSupported, cleanTextForSpeech]);

    const pause = useCallback(() => {
        if (isSupported && window.speechSynthesis.speaking) {
            window.speechSynthesis.pause();
            setIsPaused(true);
        }
    }, [isSupported]);

    const resume = useCallback(() => {
        if (isSupported && window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
            setIsPaused(false);
        }
    }, [isSupported]);

    const stop = useCallback(() => {
        if (isSupported) {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
            setIsPaused(false);
            setProgress(0);
        }
    }, [isSupported]);

    const togglePlayPause = useCallback(() => {
        if (isPlaying && !isPaused) {
            pause();
        } else if (isPaused) {
            resume();
        } else {
            speak();
        }
    }, [isPlaying, isPaused, pause, resume, speak]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    // Load voices
    useEffect(() => {
        if (isSupported) {
            window.speechSynthesis.getVoices();
            window.speechSynthesis.onvoiceschanged = () => {
                window.speechSynthesis.getVoices();
            };
        }
    }, [isSupported]);

    if (!isSupported) {
        return null;
    }

    return (
        <div className="tts-container" data-section={sectionId}>
            <motion.button
                className={`tts-main-btn ${isPlaying ? 'playing' : ''} ${isPaused ? 'paused' : ''}`}
                onClick={togglePlayPause}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => !isPlaying && setShowControls(false)}
                title={isPlaying ? (isPaused ? 'Resume' : 'Pause') : 'Listen to this section'}
            >
                <span className="tts-icon">
                    {isPlaying && !isPaused ? (
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <rect x="6" y="4" width="4" height="16" rx="1" />
                            <rect x="14" y="4" width="4" height="16" rx="1" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    )}
                </span>
                {!isPlaying && <span className="tts-label">Listen</span>}
            </motion.button>

            <AnimatePresence>
                {(showControls || isPlaying) && (
                    <motion.div
                        className="tts-controls"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        onMouseEnter={() => setShowControls(true)}
                        onMouseLeave={() => !isPlaying && setShowControls(false)}
                    >
                        {/* Speed Control */}
                        <div className="tts-speed-control">
                            <label>Speed</label>
                            <div className="speed-buttons">
                                {[0.75, 1, 1.25, 1.5].map((s) => (
                                    <button
                                        key={s}
                                        className={`speed-btn ${speed === s ? 'active' : ''}`}
                                        onClick={() => setSpeed(s)}
                                    >
                                        {s}x
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Stop Button */}
                        {isPlaying && (
                            <motion.button
                                className="tts-stop-btn"
                                onClick={stop}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                title="Stop"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                                    <rect x="6" y="6" width="12" height="12" rx="2" />
                                </svg>
                            </motion.button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Progress Bar */}
            {isPlaying && (
                <motion.div
                    className="tts-progress-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div
                        className="tts-progress-bar"
                        style={{ width: `${progress}%` }}
                    />
                </motion.div>
            )}

            <style jsx>{`
                .tts-container {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    position: relative;
                }

                .tts-main-btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 14px;
                    border: none;
                    border-radius: 20px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    cursor: pointer;
                    font-size: 13px;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
                }

                .tts-main-btn:hover {
                    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                }

                .tts-main-btn.playing {
                    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                    animation: pulse 2s infinite;
                }

                .tts-main-btn.paused {
                    background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
                    color: #333;
                }

                @keyframes pulse {
                    0%, 100% { box-shadow: 0 2px 8px rgba(240, 147, 251, 0.3); }
                    50% { box-shadow: 0 4px 20px rgba(240, 147, 251, 0.5); }
                }

                .tts-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .tts-label {
                    font-size: 13px;
                }

                .tts-controls {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 8px 14px;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                }

                .tts-speed-control {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .tts-speed-control label {
                    font-size: 11px;
                    color: #666;
                    font-weight: 500;
                }

                .speed-buttons {
                    display: flex;
                    gap: 4px;
                }

                .speed-btn {
                    padding: 4px 8px;
                    border: 1px solid #e0e0e0;
                    border-radius: 6px;
                    background: white;
                    color: #666;
                    font-size: 11px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .speed-btn:hover {
                    border-color: #667eea;
                    color: #667eea;
                }

                .speed-btn.active {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border-color: transparent;
                }

                .tts-stop-btn {
                    padding: 6px;
                    border: none;
                    border-radius: 6px;
                    background: #ff4757;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .tts-progress-container {
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: rgba(102, 126, 234, 0.2);
                    border-radius: 2px;
                    overflow: hidden;
                }

                .tts-progress-bar {
                    height: 100%;
                    background: linear-gradient(90deg, #667eea, #764ba2);
                    border-radius: 2px;
                    transition: width 0.1s linear;
                }
            `}</style>
        </div>
    );
}
