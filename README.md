# Organic Chemistry Viz

An interactive, visual learning platform for Organic Chemistry, structured according to the "Clayden Modular Architecture". This project aims to make complex organic chemistry concepts accessible through 3D visualizations, interactive quizzes, and structured learning paths.

## 📚 Clayden Modular Architecture

This project is organized to scale to 40+ chapters, mimicking the structure of the "Organic Chemistry" textbook by Clayden, Greeves, and Warren.

### Directory Structure (`src/data/chapters/`)

Each chapter is a self-contained module within its own directory (e.g., `chapter1/`, `chapter2/`), containing the following standardized files:

*   **`index.ts`**: The main entry point that aggregates and exports all chapter data.
*   **`metadata.ts`**: Contains the chapter ID, title, subtitle, learning objectives, and graph connections.
*   **`content.ts`**: The core textual content, divided into sections with key points, fun facts, and real-world connections.
*   **`quiz.ts`**: The main end-of-chapter quiz questions.
*   **`activities.ts`**: Interactive elements like Flashcards, Glossary terms, and Mini-Quizzes (embedded within sections).
*   **`molecules.ts`**: Definitions for 3D molecule visualizations used in the chapter.

### Adding a New Chapter

1.  Create a new directory: `src/data/chapters/chapterX/`
2.  Create the standard files (`metadata.ts`, `content.ts`, etc.) adhering to the types in `src/data/types.ts`.
3.  Create an `index.ts` to export the aggregated `ChapterData`.
4.  Register the new chapter in the central index: `src/data/chapters/index.ts`.

## 🛠️ Tech Stack

*   **Framework**: Next.js 14 (App Router)
*   **Language**: TypeScript
*   **Styling**: Vanilla CSS (CSS Modules/Global CSS) with a custom design system
*   **Animation**: Framer Motion
*   **3D Visualization**: React Three Fiber / Drei (planned/in-progress)

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 Contributing

When adding content, ensure you follow the "Clayden" learning philosophy:
*   **Structure before Detail**: Teach the framework first.
*   **Mechanism is Key**: Explain *why* reactions happen (curly arrows).
*   **Visual Logic**: Use diagrams and 3D models over rote memorization.
