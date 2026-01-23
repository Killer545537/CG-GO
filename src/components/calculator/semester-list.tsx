import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Semester } from '@/types';
import { CourseRow } from './course-row';

// Define minimal types needed for props without using 'any'
interface FieldState<T> {
    value: T;
    meta: {
        errors?: string[];
    };
}

interface FieldInstance<T = unknown> {
    name: string;
    state: FieldState<T>;
    handleChange: (value: T) => void;
    handleBlur: () => void;
    pushValue: T extends (infer U)[] ? (value: U) => void : never;
    removeValue: T extends (infer _U)[] ? (index: number) => void : never;
}

interface FormInstance {
    Field: React.ComponentType<{
        name: string;
        validators?: {
            onChange?: (ctx: { value: unknown }) => string | undefined;
        };
        children: (field: FieldInstance) => React.ReactNode;
    }>;
    handleSubmit: () => void;
}

interface SemesterListProps {
    field: FieldInstance<Semester[]>;
    form: FormInstance;
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
                            <span className='w-[40%] text-sm font-medium text-neutral-400'>
                                Credits
                            </span>
                            <span className='w-[40%] text-sm font-medium text-neutral-400'>
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
                className='w-full border border-dashed border-neutral-700 text-neutral-400 hover:text-neutral-50 hover:bg-neutral-800 hover:border-neutral-600 h-10 mt-2'
                onClick={() => field.pushValue({ credits: '', sgpa: '' })}
            >
                <Plus className='w-4 h-4 mr-2' />
                Add Semester
            </Button>
        </div>
    );
}
