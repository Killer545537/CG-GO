import { SummaryCard } from './summary-card';
import { TargetTable } from './target-table';

interface ResultsViewProps {
    data: {
        currentCGPA: number;
        completedCredits: number;
        targetTable: {
            target: number;
            required: number;
            status: 'achievable' | 'difficult' | 'impossible';
        }[];
    };
}

export function ResultsView({ data }: ResultsViewProps) {
    return (
        <div className='space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700'>
            <SummaryCard
                cgpa={data.currentCGPA}
                credits={data.completedCredits}
            />

            {data.targetTable.length > 0 && (
                <div className='space-y-4'>
                    <h3 className='text-xl font-semibold text-neutral-50 px-1'>
                        Target Scenarios
                    </h3>
                    <div className='border border-neutral-800 rounded-lg overflow-hidden bg-neutral-900/20'>
                        <TargetTable targets={data.targetTable} />
                    </div>
                </div>
            )}
        </div>
    );
}
