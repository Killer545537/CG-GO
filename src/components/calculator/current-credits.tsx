import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Define minimal types needed for props without using 'any'
interface FieldState<T> {
    value: T;
    meta: {
        errors?: string[];
    };
}

interface FieldInstance<T = unknown> {
    state: FieldState<T>;
    handleChange: (value: T) => void;
    handleBlur: () => void;
}

interface CurrentCreditsProps {
    field: FieldInstance<string>;
}

export function CurrentCredits({ field }: CurrentCreditsProps) {
    return (
        <div className='space-y-2'>
            <Label
                htmlFor='current-credits'
                className='text-neutral-50 font-medium'
            >
                Current Semester Registered Credits
            </Label>
            <Input
                id='current-credits'
                className='bg-neutral-900 border-neutral-800 focus:ring-neutral-50 h-11 text-lg'
                placeholder='24'
                type='number'
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
            />
            {field.state.meta.errors ? (
                <em role='alert' className='text-red-400 text-xs pl-1'>
                    {field.state.meta.errors.join(', ')}
                </em>
            ) : null}
        </div>
    );
}
