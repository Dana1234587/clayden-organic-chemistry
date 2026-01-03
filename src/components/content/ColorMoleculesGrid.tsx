import { motion } from 'framer-motion';

interface ColorExample {
    name: string;
    description: string;
    color: string;
    type: 'liquid' | 'solid' | 'gas' | 'crystal';
}

interface ColorMoleculesGridProps {
    examples: ColorExample[];
}

export default function ColorMoleculesGrid({ examples }: ColorMoleculesGridProps) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem',
            marginBottom: '2rem'
        }}>
            {examples.map((example, index) => (
                <motion.div
                    key={example.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '20px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative'
                    }}
                >
                    {/* Header with Color Glow */}
                    <div style={{
                        padding: '1.5rem',
                        background: `linear-gradient(180deg, ${example.color}20 0%, transparent 100%)`,
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <h3 style={{
                            margin: 0,
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            color: 'white',
                            textShadow: `0 0 20px ${example.color}80`
                        }}>
                            {example.name}
                        </h3>

                        {/* State Badge */}
                        <span style={{
                            fontSize: '0.75rem',
                            padding: '4px 10px',
                            borderRadius: '12px',
                            background: 'rgba(0,0,0,0.4)',
                            color: 'rgba(255,255,255,0.7)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            fontWeight: 600,
                            border: `1px solid ${example.color}40`
                        }}>
                            {example.type}
                        </span>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '1.5rem' }}>
                        <p style={{
                            color: '#cbd5e1',
                            margin: 0,
                            lineHeight: 1.6,
                            fontSize: '0.95rem'
                        }}>
                            {example.description}
                        </p>
                    </div>

                    {/* Decorative Color Orb */}
                    <div style={{
                        position: 'absolute',
                        top: '-20px',
                        right: '-20px',
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        background: example.color,
                        filter: 'blur(50px)',
                        opacity: 0.15,
                        pointerEvents: 'none'
                    }} />

                    {/* Bottom accent line */}
                    <div style={{
                        height: '3px',
                        width: '100%',
                        background: `linear-gradient(90deg, transparent, ${example.color}, transparent)`,
                        opacity: 0.8
                    }} />
                </motion.div>
            ))}
        </div>
    );
}
