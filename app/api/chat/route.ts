import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.NEXT_PUBLIC_API_KEYS as string
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

let chatHistory = [
    {
        role: "user",
        parts: [{ text: "Hello" }],
    },
    {
        role: 'model',
        parts: [{ text: 'Great to meet you. What would you like to know?' }],
    },
];

// POST method for sending a chat message
export async function POST(request: NextRequest) {
    const { userMessage } = await request.json();  // Parse the request body

    if (!userMessage) {
        return NextResponse.json({ error: 'Message cannot be empty' }, { status: 400 });
    }

    try {
        // Start the chat if not already initialized
        let chat = model.startChat({
            history: chatHistory,
        });

        // Send the user's message and get the response from Gemini
        let result = await chat.sendMessage(userMessage);

        // Update chat history
        chatHistory.push({ role: 'user', parts: [{ text: userMessage }] });
        chatHistory.push({ role: 'model', parts: [{ text: result.response.text() }] });

        // Return the AI's response
        return NextResponse.json({ response: result.response.text() });
    } catch (error) {
        console.error('Error interacting with Gemini API:', error);
        return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
    }
}
