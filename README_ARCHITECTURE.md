# Clayden Modular Architecture

This project follows the structure of **"Organic Chemistry" by Clayden, Greeves, and Warren**. To ensure scalability for 40+ chapters, we use a **folder-based module pattern**.

## Directory Structure (`src/data/chapters/`)

Each chapter is a self-contained directory (e.g., `chapter2/`) containing specialized files.

### 1. `index.ts`
- **Purpose**: The Aggregator.
- **Responsibility**: Imports all sub-modules and exports a single `ChapterData` object.
- **Why**: Keeps the import path clean (`import { chapter2 } from '@/data/chapters/chapter2'`).

### 2. `metadata.ts`
- **Purpose**: Chapter Identity & Graph Connections.
- **Content**:
    - `id`, `title`, `subtitle`, `estimatedTime`.
    - **Connections Box**: `buildingOn` (Prerequisites), `arrivingAt` (Objectives), `lookingForward` (Future links).

### 3. `content.ts`
- **Purpose**: The Main Text.
- **Content**: `introduction` and `sections`.
- **Format**: Sections contain markdown `content`, `keyPoints` boxes, and references to interactive elements.

### 4. `mid_chapter.ts` (Optional)
- **Purpose**: Interactive checks during reading.
- **Content**: `miniQuizzes` and `interactiveElements` (like "Box 2.1" in Clayden).

### 5. `quiz.ts`
- **Purpose**: End-of-Chapter Problems.
- **Content**: The main `quiz` array. Matches "Problems" section in Clayden.

### 6. `activities.ts`
- **Purpose**: Review & Consolidation.
- **Content**: `flashcards`, `glossary`, `games`. Matches "Check your understanding".

### 7. `molecules.ts`
- **Purpose**: 3D Visualization Data.
- **Content**: Definitions for `MoleculeViewer` instances (PDB data or descriptions).

## How to Add a New Chapter
1.  Create folder `src/data/chapters/chapterX`.
2.  Copy files from `chapter2` as a template.
3.  Fill in content from Clayden.
4.  Register in `src/app/chapter/[id]/page.tsx` map.
