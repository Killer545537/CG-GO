import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { FormApi, Semester, SemesterArrayFieldApi } from '@/types';
import { CourseRow } from './course-row';

interface SemesterListProps {
    field: SemesterArrayFieldApi;
    form: FormApi;
    label: string;
    helperText?: string;
    showLabels?: boolean;
    defaultEmpty?: boolean;
}

export function SemesterList({
    field,
    form,
    label,
    helperText,
    showLabels = true,
}: SemesterListProps) {
    return (
        <div className='space-y-4'>
            {label && (
                <div className='flex justify-between items-center mb-2'>
                    {/* Header Labels for Desktop */}
                    {showLabels && field.state.value.length > 0 && (
                        <div className='hidden md:flex w-full gap-4 pr-12'>
                            <span className='w-[40%] text-base font-medium text-neutral-400'>
                                Credits
                            </span>
                            <span className='w-[40%] text-base font-medium text-neutral-400'>
                                SGPA
                            </span>
                        </div>
                    )}
                </div>
            )}

            <div className='space-y-4'>
                {field.state.value.map((_: Semester, index: number) => (
                    <CourseRow
                        key={index}
                        field={field}
                        form={form}
                        index={index}
                        canRemove={field.state.value.length > 1}
                    />
                ))}
            </div>

            {helperText && (
                <p className='text-sm text-neutral-500 mt-2'>{helperText}</p>
            )}

            <Button
                variant='ghost'
                type='button'
                className='w-full border border-dashed border-neutral-700 text-neutral-400 hover:text-neutral-50 hover:bg-neutral-800 hover:border-neutral-600 h-12 text-base mt-2'
                onClick={() => field.pushValue({ credits: '', sgpa: '' })}
            >
                <Plus className='w-5 h-5 mr-2' />
                Add Semester
            </Button>
        </div>
    );
}
