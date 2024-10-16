import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <Image
          className='dark:invert'
          src='https://nextjs.org/icons/next.svg'
          // src='https://nextjs.org/icons/vercel.svg'
          alt='Next.js logo'
          width={180}
          height={38}
          priority
        />
        <h1 className='text-3xl font-medium'>Customer Support Assistant</h1>
        <ul className='list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]'>
          <li className='mb-2'>
            Get started by clicking on the{' '}
            <code className='bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold'>
              &quot;talk to us&quot;
            </code>{' '}
            button .
          </li>
          <li>
            {' '}
            Review our Privacy Policy to understand how we handle your data
          </li>
        </ul>

        <div className='flex gap-4 items-center flex-col sm:flex-row'>
          <Link
            className='rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'
            href='/chat'
          >
            <Image
              className='dark:invert'
              src='https://nextjs.org/icons/vercel.svg'
              alt='Vercel logomark'
              width={20}
              height={20}
            />
            Talk to us
          </Link>
          <a
            className='rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44'
            href='#'
          >
            Privacy Policy
          </a>
        </div>
      </main>
    </div>
  );
}
