'use client';

import { useState } from 'react';
import Navigation from './Navigation';
import FloatingToolbar from './FloatingToolbar';

interface LayoutWrapperProps {
    children: React.ReactNode;
    progress?: number;
    currentSection?: string;
    sections?: { id: string; title: string }[];
    onSectionClick?: (sectionId: string) => void;
    showToolbar?: boolean;
}

export default function LayoutWrapper({
    children,
    progress = 0,
    currentSection = '',
    sections = [],
    onSectionClick = () => { },
    showToolbar = false,
}: LayoutWrapperProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            <Navigation
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <main className="main-content-full">
                {children}
            </main>

            {showToolbar && (
                <FloatingToolbar
                    progress={progress}
                    currentSection={currentSection}
                    sections={sections}
                    onSectionClick={onSectionClick}
                    onToggleSidebar={() => setIsSidebarOpen(true)}
                />
            )}
        </>
    );
}
