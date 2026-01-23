import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/calculator')({
    component: RouteComponent,
});

import { CalculatorForm } from '@/components/calculator/calculator-form';

function RouteComponent() {
    return (
        <main className='min-h-screen bg-neutral-950'>
            <CalculatorForm />
        </main>
    );
}
