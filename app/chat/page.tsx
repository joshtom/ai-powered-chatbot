/**
 * ✅❌
 * TODO:
 * - Fetch the Chat Conversation with FETCH API ❌
 * - Update Conversation with Model's response ❌
 * - Render model / user chat based on condition ❌
 */

'use client';
import clsx from 'clsx';
import { ArrowLeftCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ChatBot() {
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // ... Code goes here
  };

  return (
    <div className='min-h-screen relative mx-auto w-full md:max-w-[750px] pt-5'>
      <div className='flex items-center gap-2' onClick={() => router.push('/')}>
        <ArrowLeftCircleIcon />
        <h1 className='text-xl font-bold'>Welcome to our Customer Support</h1>
      </div>
      <div className='border p-3 max-h-[600px] overflow-auto mt-4 rounded-lg px-7 py-10'>
        <div className={clsx('mb-[10px] text-left')}>
          <strong>You:</strong> : Hello
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className='mt-[20px] absolute bottom-4 right-0 left-0 flex gap-3 '
      >
        <input
          type='text'
          placeholder='Type your message here...'
          className='w-full border rounded-lg p-[10px]'
        />
        <button
          type='submit'
          className='px-8 py-3 bg-black text-white rounded-lg'
        >
          Send
        </button>
      </form>
    </div>
  );
}
