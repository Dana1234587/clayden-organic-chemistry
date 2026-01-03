'use client';

import { useParams } from 'next/navigation';
import { chapters } from '@/data/chapters';
import { CourseView } from '@/components/course';

export default function CoursePage() {
    const params = useParams();
    const chapterId = params.id as string;
    const chapter = chapters[chapterId];

    if (!chapter) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--background)',
                color: 'var(--neutral-100)'
            }}>
                <h1>Chapter not found</h1>
            </div>
        );
    }

    return <CourseView chapter={chapter} />;
}
