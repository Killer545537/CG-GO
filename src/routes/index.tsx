import { createFileRoute } from '@tanstack/react-router';
import { BackgroundVeil } from '../components/landing/background-veil';
import { Footer } from '../components/landing/footer';
import { HeroSection } from '../components/landing/hero-section';
import { LogoTicker } from '../components/landing/logo-ticker';

export const Route = createFileRoute('/')({
    component: LandingPage,
});

function LandingPage() {
    return (
        <div className='relative min-h-screen flex flex-col overflow-hidden selection:bg-neutral-800 selection:text-neutral-50'>
            <BackgroundVeil />

            <main className='flex-1 flex flex-col items-center justify-center w-full max-w-4xl mx-auto z-10 pt-20 pb-16'>
                <HeroSection />
                <LogoTicker />
            </main>

            <div className='relative z-10 w-full'>
                <Footer />
            </div>
        </div>
    );
}
