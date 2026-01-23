import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Semester } from '@/types';

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
    removeValue?: (index: number) => void;
}

interface FormInstance {
    Field: React.ComponentType<{
        name: string;
        validators?: {
            onChange?: (ctx: { value: string }) => string | undefined;
        };
        children: (field: FieldInstance<string>) => React.ReactNode;
    }>;
}

interface CourseRowProps {
    field: FieldInstance<Semester[]>;
    form: FormInstance;
    index: number;
    canRemove: boolean;
}

export function CourseRow({ field, form, index, canRemove }: CourseRowProps) {
    return (
        <div className='flex gap-4 items-start relative group'>
            <form.Field
                name={`${field.name}[${index}].credits`}
                validators={{
                    onChange: ({ value }: { value: string }) => {
                        const num = parseFloat(value);
                        if (Number.isNaN(num) || num <= 0)
                            return 'Required > 0';
                        return undefined;
                    },
                }}
            >
                {(subField: FieldInstance<string>) => (
                    <div className='w-[40%] space-y-1'>
                        <Input
                            placeholder='20'
                            value={subField.state.value}
                            onChange={(e) =>
                                subField.handleChange(e.target.value)
                            }
                            onBlur={subField.handleBlur}
                            className='bg-neutral-900 border-neutral-800 focus:ring-neutral-50 h-11'
                            type='number'
                        />
                        {subField.state.meta.errors ? (
                            <em
                                role='alert'
                                className='text-red-400 text-xs pl-1'
                            >
                                {subField.state.meta.errors.join(', ')}
                            </em>
                        ) : null}
                    </div>
                )}
            </form.Field>

            <form.Field
                name={`${field.name}[${index}].sgpa`}
                validators={{
                    onChange: ({ value }: { value: string }) => {
                        if (value === '') return 'Required';
                        const num = parseFloat(value);
                        if (Number.isNaN(num) || num < 0 || num > 10)
                            return '0-10';
                        return undefined;
                    },
                }}
            >
                {(subField: FieldInstance<string>) => (
                    <div className='w-[40%] space-y-1'>
                        <Input
                            placeholder='8.5'
                            value={subField.state.value}
                            onChange={(e) =>
                                subField.handleChange(e.target.value)
                            }
                            onBlur={subField.handleBlur}
                            className='bg-neutral-900 border-neutral-800 focus:ring-neutral-50 h-11'
                            type='number'
                            step='0.01'
                        />
                        {subField.state.meta.errors ? (
                            <em
                                role='alert'
                                className='text-red-400 text-xs pl-1'
                            >
                                {subField.state.meta.errors.join(', ')}
                            </em>
                        ) : null}
                    </div>
                )}
            </form.Field>

            <Button
                type='button'
                variant='ghost'
                size='icon'
                className='text-neutral-500 hover:text-red-400 hover:bg-neutral-900/50 mt-1'
                onClick={() => {
                    if (field.removeValue) {
                        field.removeValue(index);
                    }
                }}
                disabled={!canRemove && field.name.includes('semesters')}
            >
                <Trash2 className='w-4 h-4' />
            </Button>
        </div>
    );
}
