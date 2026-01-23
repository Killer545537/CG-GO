import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/calculator')({
    component: RouteComponent,
});

import { CalculatorForm } from '@/components/calculator/calculator-form';

import { motion } from 'framer-motion';

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
