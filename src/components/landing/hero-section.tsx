import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

export function HeroSection() {
    return (
        <section className='flex flex-col items-center justify-center min-h-[60vh] text-center px-4'>
            <h1 className='text-4xl md:text-6xl font-bold tracking-tight text-neutral-50 mb-4 select-none'>
                CG:GO
            </h1>
            <p className='text-lg md:text-xl text-neutral-400 max-w-lg text-balance mb-8'>
                Track performance and plan your academic targets in seconds.
            </p>

            <Button
                asChild
                size='lg'
                className='bg-neutral-50 text-neutral-950 hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.5)] rounded-full px-10 h-14 text-lg font-semibold ring-offset-neutral-950'
            >
                <Link to='/calculator'>
                    Calculate CGPA
                    <ArrowRight className='ml-2 h-4 w-4' />
                </Link>
            </Button>
        </section>
    );
}
