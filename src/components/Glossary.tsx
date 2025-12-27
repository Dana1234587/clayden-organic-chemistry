'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface GlossaryTerm {
    id: string;
    term: string;
    definition: string;
    category: string;
    relatedTerms?: string[];
    example?: string;
}

interface GlossaryProps {
    terms: GlossaryTerm[];
    title?: string;
}

export default function Glossary({ terms, title = "Glossary" }: GlossaryProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [expandedTermId, setExpandedTermId] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    // Get unique categories
    const categories = useMemo(() => {
        const cats = new Set(terms.map(t => t.category));
        return Array.from(cats).sort();
    }, [terms]);

    // Filter terms
    const filteredTerms = useMemo(() => {
        return terms.filter(term => {
            const matchesSearch = searchQuery === '' ||
                term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                term.definition.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = !selectedCategory || term.category === selectedCategory;
            return matchesSearch && matchesCategory;
        }).sort((a, b) => a.term.localeCompare(b.term));
    }, [terms, searchQuery, selectedCategory]);

    // Group terms by first letter
    const groupedTerms = useMemo(() => {
        const groups: { [key: string]: GlossaryTerm[] } = {};
        filteredTerms.forEach(term => {
            const firstLetter = term.term[0].toUpperCase();
            if (!groups[firstLetter]) {
                groups[firstLetter] = [];
            }
            groups[firstLetter].push(term);
        });
        return groups;
    }, [filteredTerms]);

    const toggleTerm = useCallback((termId: string) => {
        setExpandedTermId(prev => prev === termId ? null : termId);
    }, []);

    const findRelatedTerm = useCallback((termName: string) => {
        const found = terms.find(t => t.term.toLowerCase() === termName.toLowerCase());
        if (found) {
            setExpandedTermId(found.id);
            // Scroll to the term
            const element = document.getElementById(`glossary-term-${found.id}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [terms]);

    if (!isOpen) {
        return (
            <motion.button
                className="glossary-toggle-btn"
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <span className="glossary-icon">📚</span>
                <span>Open Glossary</span>
                <span className="glossary-count">{terms.length} terms</span>

                <style jsx>{`
                    .glossary-toggle-btn {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        width: 100%;
                        padding: 16px 20px;
                        background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%);
                        border: 1px solid rgba(16, 185, 129, 0.3);
                        border-radius: 16px;
                        color: var(--neutral-100);
                        font-size: 1rem;
                        font-weight: 500;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        margin-top: 1rem;
                    }

                    .glossary-toggle-btn:hover {
                        background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%);
                        border-color: rgba(16, 185, 129, 0.5);
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(16, 185, 129, 0.2);
                    }

                    .glossary-icon {
                        font-size: 1.5rem;
                    }

                    .glossary-count {
                        margin-left: auto;
                        padding: 4px 10px;
                        background: rgba(16, 185, 129, 0.2);
                        border-radius: 12px;
                        font-size: 0.85rem;
                        color: var(--accent-emerald);
                    }
                `}</style>
            </motion.button>
        );
    }

    return (
        <motion.div
            className="glossary-container"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
        >
            {/* Header */}
            <div className="glossary-header">
                <h4>
                    <span>📚</span> {title}
                </h4>
                <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
            </div>

            {/* Search Bar */}
            <div className="search-container">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    placeholder="Search terms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                {searchQuery && (
                    <button
                        className="clear-btn"
                        onClick={() => setSearchQuery('')}
                    >
                        ✕
                    </button>
                )}
            </div>

            {/* Category Filters */}
            <div className="category-filters">
                <button
                    className={`category-btn ${!selectedCategory ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(null)}
                >
                    All ({terms.length})
                </button>
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        {cat} ({terms.filter(t => t.category === cat).length})
                    </button>
                ))}
            </div>

            {/* Results Count */}
            <div className="results-count">
                {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''} found
            </div>

            {/* Terms List */}
            <div className="terms-list">
                {Object.keys(groupedTerms).sort().map(letter => (
                    <div key={letter} className="letter-group">
                        <div className="letter-header">{letter}</div>
                        {groupedTerms[letter].map(term => (
                            <motion.div
                                key={term.id}
                                id={`glossary-term-${term.id}`}
                                className={`term-card ${expandedTermId === term.id ? 'expanded' : ''}`}
                                onClick={() => toggleTerm(term.id)}
                                layout
                            >
                                <div className="term-header">
                                    <span className="term-name">{term.term}</span>
                                    <span className="term-category">{term.category}</span>
                                </div>

                                <AnimatePresence>
                                    {expandedTermId === term.id && (
                                        <motion.div
                                            className="term-details"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <p className="term-definition">{term.definition}</p>

                                            {term.example && (
                                                <div className="term-example">
                                                    <strong>Example:</strong> {term.example}
                                                </div>
                                            )}

                                            {term.relatedTerms && term.relatedTerms.length > 0 && (
                                                <div className="related-terms">
                                                    <strong>Related:</strong>
                                                    {term.relatedTerms.map(rt => (
                                                        <button
                                                            key={rt}
                                                            className="related-term-btn"
                                                            onClick={() => findRelatedTerm(rt)}
                                                        >
                                                            {rt}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                ))}

                {filteredTerms.length === 0 && (
                    <div className="no-results">
                        <span>🔍</span>
                        <p>No terms found matching "{searchQuery}"</p>
                    </div>
                )}
            </div>

            <style jsx>{`
                .glossary-container {
                    margin-top: 1rem;
                    padding: 1.5rem;
                    background: rgba(30, 30, 46, 0.8);
                    border: 1px solid rgba(16, 185, 129, 0.3);
                    border-radius: 20px;
                    backdrop-filter: blur(10px);
                    max-height: 600px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }

                .glossary-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }

                .glossary-header h4 {
                    margin: 0;
                    color: var(--neutral-100);
                    font-size: 1.1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .close-btn {
                    width: 36px;
                    height: 36px;
                    border: none;
                    border-radius: 10px;
                    background: rgba(255, 255, 255, 0.1);
                    color: var(--neutral-300);
                    cursor: pointer;
                    font-size: 1rem;
                    transition: all 0.2s ease;
                }

                .close-btn:hover {
                    background: rgba(255, 255, 255, 0.15);
                    color: var(--neutral-100);
                }

                .search-container {
                    position: relative;
                    margin-bottom: 1rem;
                }

                .search-icon {
                    position: absolute;
                    left: 14px;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 1rem;
                    opacity: 0.6;
                }

                .search-input {
                    width: 100%;
                    padding: 12px 40px;
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    color: var(--neutral-100);
                    font-size: 0.95rem;
                    outline: none;
                    transition: all 0.2s ease;
                }

                .search-input:focus {
                    border-color: rgba(16, 185, 129, 0.5);
                    background: rgba(255, 255, 255, 0.1);
                }

                .search-input::placeholder {
                    color: var(--neutral-500);
                }

                .clear-btn {
                    position: absolute;
                    right: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 24px;
                    height: 24px;
                    border: none;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.1);
                    color: var(--neutral-400);
                    cursor: pointer;
                    font-size: 0.8rem;
                    transition: all 0.2s ease;
                }

                .clear-btn:hover {
                    background: rgba(255, 255, 255, 0.2);
                    color: var(--neutral-100);
                }

                .category-filters {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                }

                .category-btn {
                    padding: 6px 12px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    color: var(--neutral-400);
                    font-size: 0.8rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .category-btn:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: var(--neutral-200);
                }

                .category-btn.active {
                    background: rgba(16, 185, 129, 0.2);
                    border-color: rgba(16, 185, 129, 0.4);
                    color: var(--accent-emerald);
                }

                .results-count {
                    font-size: 0.8rem;
                    color: var(--neutral-500);
                    margin-bottom: 0.75rem;
                }

                .terms-list {
                    flex: 1;
                    overflow-y: auto;
                    padding-right: 0.5rem;
                }

                .terms-list::-webkit-scrollbar {
                    width: 6px;
                }

                .terms-list::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 3px;
                }

                .terms-list::-webkit-scrollbar-thumb {
                    background: rgba(16, 185, 129, 0.3);
                    border-radius: 3px;
                }

                .letter-group {
                    margin-bottom: 1rem;
                }

                .letter-header {
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: var(--accent-emerald);
                    padding: 4px 0;
                    margin-bottom: 0.5rem;
                    border-bottom: 1px solid rgba(16, 185, 129, 0.2);
                }

                .term-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 12px;
                    margin-bottom: 0.5rem;
                    padding: 12px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .term-card:hover {
                    background: rgba(255, 255, 255, 0.06);
                    border-color: rgba(16, 185, 129, 0.3);
                }

                .term-card.expanded {
                    background: rgba(16, 185, 129, 0.08);
                    border-color: rgba(16, 185, 129, 0.4);
                }

                .term-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .term-name {
                    font-weight: 600;
                    color: var(--neutral-100);
                }

                .term-category {
                    font-size: 0.75rem;
                    padding: 2px 8px;
                    background: rgba(16, 185, 129, 0.15);
                    border-radius: 10px;
                    color: var(--accent-emerald);
                }

                .term-details {
                    margin-top: 0.75rem;
                    overflow: hidden;
                }

                .term-definition {
                    color: var(--neutral-300);
                    font-size: 0.9rem;
                    line-height: 1.6;
                    margin: 0 0 0.75rem;
                }

                .term-example {
                    padding: 10px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 8px;
                    font-size: 0.85rem;
                    color: var(--neutral-400);
                    margin-bottom: 0.75rem;
                }

                .related-terms {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.85rem;
                    color: var(--neutral-400);
                }

                .related-term-btn {
                    padding: 4px 10px;
                    background: rgba(139, 92, 246, 0.15);
                    border: 1px solid rgba(139, 92, 246, 0.3);
                    border-radius: 8px;
                    color: var(--primary-300);
                    font-size: 0.8rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .related-term-btn:hover {
                    background: rgba(139, 92, 246, 0.25);
                }

                .no-results {
                    text-align: center;
                    padding: 2rem;
                    color: var(--neutral-500);
                }

                .no-results span {
                    font-size: 2rem;
                    display: block;
                    margin-bottom: 0.5rem;
                }
            `}</style>
        </motion.div>
    );
}
