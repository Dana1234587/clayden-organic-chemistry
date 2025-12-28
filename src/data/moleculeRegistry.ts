/**
 * Molecule Registry
 * Central registry that aggregates all molecules from chapter-specific files
 */

import { MoleculeData, MoleculeRegistry } from './moleculeTypes';
import { chapter1Molecules } from './chapters/chapter1/molecules';
import { chapter2Molecules } from './chapters/chapter2/molecules';
import { chapter3Molecules } from './chapters/chapter3/molecules';

// Merge all chapter molecules into a single registry
// Later chapters will be added here as they are created
export const moleculeRegistry: MoleculeRegistry = {
    ...chapter1Molecules,
    ...chapter2Molecules,
    ...chapter3Molecules,
};

/**
 * Get molecule data by name (case-insensitive)
 * @param name - The molecule name to look up
 * @returns The molecule data or undefined if not found
 */
export function getMolecule(name: string): MoleculeData | undefined {
    return moleculeRegistry[name.toLowerCase()];
}

/**
 * Check if a molecule exists in the registry
 * @param name - The molecule name to check
 * @returns true if the molecule exists
 */
export function hasMolecule(name: string): boolean {
    return name.toLowerCase() in moleculeRegistry;
}

/**
 * Get all available molecule names
 * @returns Array of all registered molecule names
 */
export function getAllMoleculeNames(): string[] {
    return Object.keys(moleculeRegistry);
}
