import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/calculator')({
    component: RouteComponent,
});

import { motion } from 'framer-motion';
import { CalculatorForm } from '@/components/calculator/calculator-form';

function RouteComponent() {
    return (
        <motion.main
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='min-h-screen bg-neutral-950'
        >
            <CalculatorForm />
        </motion.main>
    );
}
