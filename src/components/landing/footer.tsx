import { Github, Linkedin } from 'lucide-react';

export function Footer() {
    return (
        <footer className='w-full py-6 mt-auto'>
            <div className='max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-4'>
                <p className='text-sm text-neutral-500 order-2 md:order-1'>
                    Built with care by Srijan
                </p>

                <div className='flex items-center gap-4 order-1 md:order-2'>
                    <a
                        href='https://github.com/Killer545537'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-neutral-500 hover:text-neutral-300 transition-colors duration-200'
                        aria-label='GitHub'
                    >
                        <Github className='w-5 h-5' />
                    </a>
                    <a
                        href='https://www.linkedin.com/in/srijan-mahajan-035680294/'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-neutral-500 hover:text-neutral-300 transition-colors duration-200'
                        aria-label='LinkedIn'
                    >
                        <Linkedin className='w-5 h-5' />
                    </a>
                </div>
            </div>
        </footer>
    );
}
