'use client';
import clsx from 'clsx';
import { ArrowLeftCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

export default function ChatBot() {
  const router = useRouter();
  const [userMessage, setUserMessage] = useState('');
  const [conversation, setConversation] = useState([
    { role: 'model', text: 'Great to meet you. What would you like to know?' },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    // Add the user's message to the conversation
    setConversation((prev) => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      // Use Fetch API to call the Next.js API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userMessage }),
      });

      if (!response.ok) {
        throw new Error('Error fetching the response');
      }

      const data = await response.json();

      // Update the conversation with the model's response
      setConversation((prev) => [
        ...prev,
        { role: 'model', text: data.response },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setConversation((prev) => [
        ...prev,
        { role: 'model', text: 'Error fetching response' },
      ]);
    } finally {
      setLoading(false);
      setUserMessage(''); // Clear input field
    }
  };

  return (
    <div className='min-h-screen relative mx-auto w-full md:max-w-[750px] pt-5'>
      <div className='flex items-center gap-2' onClick={() => router.push('/')}>
        <ArrowLeftCircleIcon />
        <h1 className='text-xl font-bold'>Welcome to our Customer Support</h1>
      </div>
      <div className='border p-3 max-h-[600px] overflow-auto mt-4 rounded-lg px-7 py-10'>
        {conversation.map((entry, index) => (
          <div
            key={index}
            className={clsx(
              'mb-[10px]',
              entry.role === 'user' ? 'text-right' : 'text-left'
            )}
          >
            <strong>{entry.role === 'user' ? 'You' : 'CS'}:</strong>{' '}
            {entry.text}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className='mt-[20px] absolute bottom-4 right-0 left-0 flex gap-3 '
      >
        <input
          type='text'
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder='Type your message here...'
          className='w-full border rounded-lg p-[10px]'
        />
        <button
          type='submit'
          disabled={loading}
          className='px-8 py-3 bg-black text-white rounded-lg'
        >
          {loading ? 'Thinking...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
