interface SummaryCardProps {
    cgpa: number;
    credits: number;
}

export function SummaryCard({ cgpa, credits }: SummaryCardProps) {
    return (
        <div className='bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-8 text-center md:text-left shadow-lg'>
            <h3 className='text-sm font-medium uppercase tracking-wider text-neutral-500 mb-2'>
                Current CGPA
            </h3>
            <div className='text-5xl font-mono font-bold tracking-tighter text-neutral-50 mb-2'>
                {cgpa.toFixed(2)}
            </div>
            <p className='text-neutral-400 text-sm'>
                Based on{' '}
                <span className='text-neutral-200 font-semibold'>
                    {credits}
                </span>{' '}
                completed credits.
            </p>
        </div>
    );
}
