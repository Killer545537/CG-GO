import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { calculateCurrentCGPA, findTargetCGPAs } from '@/lib/calculator-utils';
import type { CalculatorState } from '@/types';
import { CurrentCredits } from './current-credits';
import { ResultsView } from './results-view';
import { SemesterList } from './semester-list';

export function CalculatorForm() {
    const [resultData, setResultData] = useState<{
        currentCGPA: number;
        completedCredits: number;
        targetTable: {
            target: number;
            required: number;
            status: 'achievable' | 'difficult' | 'impossible';
        }[];
    } | null>(null);

    const [isCalculating, setIsCalculating] = useState(false);

    const form = useForm({
        defaultValues: {
            semesters: [{ credits: '20', sgpa: '' }],
            dropped: [],
            currentCredits: '',
        } as CalculatorState,
        onSubmit: async ({ value }) => {
            setIsCalculating(true);

            // Simulate delay
            await new Promise((resolve) => setTimeout(resolve, 300));

            // Extract credits and CGPAs from input
            const completedCredits = value.semesters.map(
                (s) => parseFloat(s.credits) || 0,
            );
            const completedCGPAs = value.semesters.map(
                (s) => parseFloat(s.sgpa) || 0,
            );

            const droppedCredits = value.dropped.map(
                (s) => parseFloat(s.credits) || 0,
            );
            const droppedCGPAs = value.dropped.map(
                (s) => parseFloat(s.sgpa) || 0,
            );

            const currentSemCredits = parseFloat(value.currentCredits) || 0;

            // Use utility functions
            const currentCGPA = calculateCurrentCGPA(
                completedCredits,
                completedCGPAs,
                droppedCredits,
                droppedCGPAs,
            );

            const targetResults = findTargetCGPAs(
                completedCredits,
                completedCGPAs,
                droppedCredits,
                droppedCGPAs,
                currentSemCredits,
            );

            // Map to UI format
            const targets = targetResults
                .filter((t) => t.targetCGPA >= currentCGPA) // Only show future targets
                .map((t) => {
                    let status: 'achievable' | 'difficult' | 'impossible' =
                        'achievable';

                    if (t.requiredSemesterCGPA === 'Not Possible') {
                        status = 'impossible';
                    } else if (t.requiredSemesterCGPA > 9.0) {
                        status = 'difficult';
                    }

                    return {
                        target: t.targetCGPA,
                        required:
                            t.requiredSemesterCGPA === 'Not Possible'
                                ? 10.01
                                : t.requiredSemesterCGPA,
                        status,
                    };
                });

            // Calculate effective completed credits (completed - dropped)
            const totalCompleted = completedCredits.reduce((a, b) => a + b, 0);
            const totalDropped = droppedCredits.reduce((a, b) => a + b, 0);
            const effectiveCredits = totalCompleted - totalDropped;

            setResultData({
                currentCGPA,
                completedCredits: effectiveCredits,
                targetTable: targets,
            });

            setIsCalculating(false);

            setTimeout(() => {
                document
                    .getElementById('results-section')
                    ?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        },
    });

    return (
        <div className='max-w-2xl mx-auto px-4 py-12 md:px-0 space-y-12'>
            {/* Header */}
            <header className='text-center md:text-left'>
                <h1 className='text-3xl font-bold text-neutral-50'>
                    CGPA Calculator
                </h1>
                <p className='text-neutral-400 mt-2'>
                    Calculate your current standing and see what grades you need
                    to hit your targets.
                </p>
            </header>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                className='space-y-12'
            >
                {/* Previous Semesters */}
                <form.Field name='semesters' mode='array'>
                    {(field) => (
                        <SemesterList
                            field={field}
                            form={form}
                            label='Previous Semesters'
                            helperText=''
                            showLabels={true}
                        />
                    )}
                </form.Field>

                {/* Dropped Courses */}
                <form.Field name='dropped' mode='array'>
                    {(field) => (
                        <div className='bg-neutral-900/50 rounded-lg p-6 border border-neutral-800'>
                            <h3 className='text-sm font-medium text-neutral-400 mb-4'>
                                Dropped / Backlog Courses
                            </h3>
                            <SemesterList
                                field={field}
                                form={form}
                                label=''
                                helperText='Add courses here only if they are not included in your semester results but still impact your credit calculation.'
                                showLabels={false}
                                defaultEmpty={true}
                            />
                        </div>
                    )}
                </form.Field>

                {/* Current Semester Credits */}
                <form.Field name='currentCredits'>
                    {(field) => <CurrentCredits field={field} />}
                </form.Field>

                {/* Action */}
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                    {([canSubmit]) => (
                        <Button
                            type='submit'
                            size='lg'
                            className='w-full h-12 text-base font-semibold'
                            disabled={!canSubmit || isCalculating}
                        >
                            {isCalculating ? (
                                <span className='flex items-center gap-2'>
                                    Calculating...
                                </span>
                            ) : (
                                'Calculate Results'
                            )}
                        </Button>
                    )}
                </form.Subscribe>
            </form>

            {/* Results */}
            {resultData && (
                <div id='results-section'>
                    <ResultsView data={resultData} />
                </div>
            )}
        </div>
    );
}
