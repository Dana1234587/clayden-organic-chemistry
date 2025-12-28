'use client';

import React, { ReactNode } from 'react';

interface ContentRendererProps {
    content: string;
}

// Check if content contains HTML tags
const containsHTML = (text: string): boolean => {
    return /<[a-z][\s\S]*>/i.test(text);
};

// Simple markdown-like renderer with HTML support
export default function ContentRenderer({ content }: ContentRendererProps) {

    // If content contains HTML, render it directly
    if (containsHTML(content)) {
        return (
            <div
                className="content-renderer html-content"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        );
    }

    // Otherwise, process as plain text (original logic)
    const processContent = (text: string): ReactNode[] => {
        const lines = text.split('\n');
        const result: ReactNode[] = [];
        let currentParagraph: string[] = [];
        let inList = false;
        let listItems: string[] = [];
        let keyCounter = 0;

        const flushParagraph = () => {
            if (currentParagraph.length > 0) {
                const text = currentParagraph.join(' ');
                result.push(
                    <p key={keyCounter++} style={{
                        color: 'var(--neutral-300)',
                        lineHeight: 1.8,
                        marginBottom: '1rem'
                    }}>{processInlineFormatting(text)}</p>
                );
                currentParagraph = [];
            }
        };

        const flushList = () => {
            if (listItems.length > 0) {
                result.push(
                    <ul key={keyCounter++} style={{
                        paddingLeft: '1.5rem',
                        marginBottom: '1rem'
                    }}>
                        {listItems.map((item, i) => (
                            <li key={i} style={{
                                color: 'var(--neutral-300)',
                                marginBottom: '0.5rem',
                                lineHeight: 1.7
                            }}>{processInlineFormatting(item)}</li>
                        ))}
                    </ul>
                );
                listItems = [];
                inList = false;
            }
        };

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // Empty line - flush current content
            if (line === '') {
                flushList();
                flushParagraph();
                continue;
            }

            // Heading with Unicode box characters
            if (line.startsWith('═══')) {
                flushList();
                flushParagraph();
                // Next line might be heading title
                if (i + 1 < lines.length) {
                    const nextLine = lines[i + 1].trim();
                    if (nextLine && !nextLine.startsWith('═══')) {
                        result.push(
                            <h3 key={keyCounter++} style={{
                                fontSize: '1.2rem',
                                fontWeight: 600,
                                color: 'var(--primary-300)',
                                marginBottom: '0.75rem',
                                marginTop: '1.5rem',
                                borderBottom: '2px solid rgba(139, 92, 246, 0.3)',
                                paddingBottom: '0.5rem'
                            }}>{processInlineFormatting(nextLine)}</h3>
                        );
                        i++; // Skip the heading text line
                        // Skip the closing === line if present
                        if (i + 1 < lines.length && lines[i + 1].trim().startsWith('═══')) {
                            i++;
                        }
                    }
                }
                continue;
            }

            // Bullet points with • or *
            if (line.startsWith('• ') || line.startsWith('* ') || line.startsWith('- ')) {
                flushParagraph();
                inList = true;
                listItems.push(line.substring(2));
                continue;
            }

            // Numbered lists (1. 2. etc)
            const numberedMatch = line.match(/^(\d+)\.\s+(.+)$/);
            if (numberedMatch) {
                flushParagraph();
                if (!inList) {
                    inList = true;
                }
                listItems.push(numberedMatch[2]);
                continue;
            }

            // Regular paragraph line
            if (inList) {
                flushList();
            }
            currentParagraph.push(line);
        }

        // Flush remaining content
        flushList();
        flushParagraph();

        return result;
    };

    // Process inline formatting (bold, emojis, etc.)
    const processInlineFormatting = (text: string): ReactNode => {
        // Handle special characters and formatting
        const parts: ReactNode[] = [];
        let remaining = text;
        let partKey = 0;

        // Split by common patterns and style appropriately
        while (remaining.length > 0) {
            // Check for **bold** markdown
            const boldMatch = remaining.match(/^\*\*(.+?)\*\*/);
            if (boldMatch) {
                parts.push(
                    <strong key={partKey++} style={{
                        color: 'var(--primary-300)',
                        fontWeight: 600
                    }}>{boldMatch[1]}</strong>
                );
                remaining = remaining.substring(boldMatch[0].length);
                continue;
            }

            // Check for *italic* markdown
            const italicMatch = remaining.match(/^\*(.+?)\*/);
            if (italicMatch) {
                parts.push(
                    <em key={partKey++} style={{ color: 'var(--neutral-200)' }}>{italicMatch[1]}</em>
                );
                remaining = remaining.substring(italicMatch[0].length);
                continue;
            }

            // Check for emoji patterns at start
            const emojiMatch = remaining.match(/^([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|⚠️|❗|✓|✗|💡|→|←|═)/u);
            if (emojiMatch) {
                parts.push(<span key={partKey++} style={{ marginRight: '0.25rem' }}>{emojiMatch[0]}</span>);
                remaining = remaining.substring(emojiMatch[0].length);
                continue;
            }

            // Check for UPPERCASE WORDS (treat as emphasis)
            const uppercaseMatch = remaining.match(/^([A-Z]{2,}(?:\s+[A-Z]{2,})*)/);
            if (uppercaseMatch && uppercaseMatch[0].length > 3) {
                parts.push(
                    <strong key={partKey++} style={{
                        color: 'var(--neutral-100)',
                        fontWeight: 600
                    }}>{uppercaseMatch[0]}</strong>
                );
                remaining = remaining.substring(uppercaseMatch[0].length);
                continue;
            }

            // Check for chemical formulas (subscript numbers)
            const formulaMatch = remaining.match(/^([A-Z][a-z]?)([₀₁₂₃₄₅₆₇₈₉]+)/);
            if (formulaMatch) {
                parts.push(
                    <span key={partKey++} style={{ fontFamily: 'monospace', color: 'var(--primary-300)' }}>
                        {formulaMatch[1]}{formulaMatch[2]}
                    </span>
                );
                remaining = remaining.substring(formulaMatch[0].length);
                continue;
            }

            // Regular text - take until next special character
            const nextSpecialIndex = remaining.search(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|⚠️|❗|✓|✗|💡|→|[A-Z]{3,}|[A-Z][a-z]?[₀-₉]/u);
            if (nextSpecialIndex > 0) {
                parts.push(remaining.substring(0, nextSpecialIndex));
                remaining = remaining.substring(nextSpecialIndex);
            } else if (nextSpecialIndex === -1) {
                parts.push(remaining);
                break;
            } else {
                // nextSpecialIndex is 0 but no match above, take one character
                parts.push(remaining[0]);
                remaining = remaining.substring(1);
            }
        }

        return parts.length === 1 ? parts[0] : <>{parts}</>;
    };

    return (
        <div className="content-renderer">
            {processContent(content)}
        </div>
    );
}

