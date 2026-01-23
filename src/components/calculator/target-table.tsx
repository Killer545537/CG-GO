import { Badge } from '@/components/ui/badge';

interface TargetRow {
    target: number;
    required: number;
    status: 'achievable' | 'difficult' | 'impossible';
}

interface TargetTableProps {
    targets: TargetRow[];
}

export function TargetTable({ targets }: TargetTableProps) {
    const getStatusColor = (status: TargetRow['status']) => {
        switch (status) {
            case 'achievable':
                return 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/20';
            case 'difficult':
                return 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border-amber-500/20';
            case 'impossible':
                return 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border-rose-500/20';
            default:
                return '';
        }
    };

    return (
        <div className='overflow-x-auto'>
            <table className='w-full text-left text-sm'>
                <thead>
                    <tr className='border-b border-neutral-800'>
                        <th className='h-12 px-4 font-medium text-neutral-400'>
                            Target CGPA
                        </th>
                        <th className='h-12 px-4 font-medium text-neutral-400'>
                            Required SGPA
                        </th>
                        <th className='h-12 px-4 font-medium text-neutral-400'>
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-neutral-800'>
                    {targets.map((row) => (
                        <tr
                            key={row.target}
                            className='hover:bg-neutral-900/50 transition-colors'
                        >
                            <td className='p-4 font-medium text-neutral-50 text-base'>
                                {row.target.toFixed(2)}
                            </td>
                            <td className='p-4 text-neutral-300 font-mono'>
                                {row.status === 'impossible'
                                    ? '> 10.00'
                                    : row.required.toFixed(2)}
                            </td>
                            <td className='p-4'>
                                <Badge
                                    variant='outline'
                                    className={getStatusColor(row.status)}
                                >
                                    {row.status.charAt(0).toUpperCase() +
                                        row.status.slice(1)}
                                </Badge>
                            </td>
                        </tr>
                    ))}
                    {targets.length === 0 && (
                        <tr>
                            <td
                                colSpan={3}
                                className='p-4 text-center text-neutral-500'
                            >
                                No targets generated.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
