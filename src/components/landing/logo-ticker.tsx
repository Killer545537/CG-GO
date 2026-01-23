export function LogoTicker() {
    return (
        <section className='flex flex-col items-center justify-center mt-16 md:mt-24 px-4'>
            <p className='text-xs uppercase tracking-widest text-neutral-600 mb-6 text-center'>
                Compatible with grading systems of:
            </p>

            <div className='flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-80 select-none pointer-events-none'>
                {/* DTU Logo Placeholder */}
                <svg
                    height='32'
                    viewBox='0 0 100 40'
                    fill='currentColor'
                    className='h-8 w-auto text-neutral-700'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <text
                        x='50'
                        y='28'
                        fontSize='24'
                        fontWeight='bold'
                        textAnchor='middle'
                        fontFamily='sans-serif'
                    >
                        DTU
                    </text>
                </svg>

                {/* NSUT Logo Placeholder */}
                <svg
                    height='32'
                    viewBox='0 0 100 40'
                    fill='currentColor'
                    className='h-8 w-auto text-neutral-700'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <text
                        x='50'
                        y='28'
                        fontSize='24'
                        fontWeight='bold'
                        textAnchor='middle'
                        fontFamily='sans-serif'
                    >
                        NSUT
                    </text>
                </svg>

                {/* IGDTUW Logo Placeholder */}
                <svg
                    height='32'
                    viewBox='0 0 120 40'
                    fill='currentColor'
                    className='h-8 w-auto text-neutral-700'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <text
                        x='60'
                        y='28'
                        fontSize='24'
                        fontWeight='bold'
                        textAnchor='middle'
                        fontFamily='sans-serif'
                    >
                        IGDTUW
                    </text>
                </svg>
            </div>
        </section>
    );
}
