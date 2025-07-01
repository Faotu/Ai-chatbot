// import Message from "@/app/models/Message";
// import { dbConnect } from "@/lib/mongodb";
// import { OpenAI } from "openai";

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).end();

//   await dbConnect();
//   const { userId, messages } = req.body;

//   const chatResponse = await openai.chat.completions.create({
//     model: "gpt-4",
//     messages,
//   });

//   const assistantMessage = chatResponse.choices[0].message;

//   await Message.create({
//     userId,
//     role: "user",
//     content: messages[messages.length - 1].content,
//   });
//   await Message.create({
//     userId,
//     role: "assistant",
//     content: assistantMessage.content,
//   });

//   res.status(200).json({ reply: assistantMessage.content });
// }

// import type { NextApiRequest, NextApiResponse } from "next";
// import Message from "@/app/models/Message";
// import { dbConnect } from "@/lib/mongodb";
// import { OpenAI } from "openai";

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") return res.status(405).end();

//   await dbConnect();
//   const { userId, messages } = req.body;

//   const chatResponse = await openai.chat.completions.create({
//     model: "gpt-4",
//     messages,
//   });

//   const assistantMessage = chatResponse.choices[0].message;

//   await Message.create({
//     userId,
//     role: "user",
//     content: messages[messages.length - 1].content,
//   });
//   await Message.create({
//     userId,
//     role: "assistant",
//     content: assistantMessage.content,
//   });

//   res.status(200).json({ reply: assistantMessage.content });
// }

// // app/api/chat/route.ts
// import { NextResponse } from "next/server";
// import { OpenAI } from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in .env
// });

// export async function POST(req: Request) {
//   const body = await req.json();
//   const { messages } = body;

//   try {
//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo", // or "gpt-4"
//       messages,
//     });

//     const reply = completion.choices[0].message.content;
//     return NextResponse.json({ reply });
//   } catch (error) {
//     console.error("OpenAI Error:", error);
//     return NextResponse.json(
//       { reply: "Something went wrong." },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { messages } = body;

//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo", // or gpt-4
//       messages,
//     });

//     const reply = completion.choices[0].message.content;
//     return NextResponse.json({ reply });
//   } catch (error) {
//     console.error("OpenAI API Error:", error);
//     return NextResponse.json(
//       { reply: "Error processing your request." },
//       { status: 500 }
//     );
//   }
// }

// import OpenAI from "openai";
// const client = new OpenAI();

// const response = await client.responses.create({
//   model: "gpt-4.1",
//   input: "Write a one-sentence bedtime story about a unicorn.",
// });

// console.log(response.output_text);

// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const body = await req.json();
//   const { messages } = body;

//   // Optional: simulate delay
//   await new Promise((res) => setTimeout(res, 1000));

//   // Return mock data
//   const mockReply = {
//     id: "chatcmpl-mock123",
//     object: "chat.completion",
//     created: Date.now(),
//     model: "gpt-4-mock",
//     choices: [
//       {
//         index: 0,
//         message: {
//           role: "assistant",
//           content:
//             "This is a mock response. Replace this with real OpenAI output when ready.",
//         },
//         finish_reason: "stop",
//       },
//     ],
//   };

//   return NextResponse.json(mockReply);
// // }

// import { NextResponse } from "next/server";

// const dummyReplies = [
//   "Sure! How can I help you today?",
//   "That's an interesting question.",
//   "Let me think about that for a second...",
//   "I'm just a mock AI, but here's something smart-sounding!",
//   "Can you rephrase that?",
//   "Here's a quick tip: stay curious!",
//   "You're doing great. Keep going.",
//   "This is a placeholder response. Imagine something amazing here!",
// ];

// export async function POST(req: Request) {
//   const body = await req.json();
//   const { messages } = body;

//   // Simulate delay
//   await new Promise((res) => setTimeout(res, 1200));

//   // Pick a random response
//   const randomIndex = Math.floor(Math.random() * dummyReplies.length);
//   const mockReply = dummyReplies[randomIndex];

//   return NextResponse.json({
//     reply: mockReply,
//   });
// }

import { NextResponse } from "next/server";

// Intent-based mock response map
const intentResponses: { [key: string]: string } = {
  hello: "Hi there! How can I assist you today?",
  courses: "You are offering 8 courses this semester.",
  javascript:
    "JavaScript is a versatile programming language used for web development.",
  python:
    "Python is a powerful programming language known for its simplicity and readability.",
  react:
    "React is a JavaScript library for building user interfaces, maintained by Facebook.",
  node: "Node.js is a JavaScript runtime built on Chrome's V8 engine, allowing you to run JavaScript on the server.",
  computer:
    "A computer is an electronic device that processes data and performs tasks according to a set of instructions.",
  programming:
    "Programming is the process of creating a set of instructions that tell a computer how to perform a task.",
  youtube:
    "you can grow your YouTube channel by creating engaging content, optimizing your videos for search, and promoting them on social media.",
  help: "Sure! What do you need help with?",
  name: "I'm just a friendly mock assistant.",
  nigeria: "Bola Ahmed Tinubu is the current president of Nigeria.",
  greeting: "Hello! How can I help you today?",
  ai: "AI is an Artificial Intelligence system designed to assist you.",
  weather:
    "I'm not connected to live weather data, but it’s always sunny in mockland!",
  time: `It's mock time! Let's pretend it's always 2:00 PM.`,
  joke: "Why don't developers like nature? It has too many bugs.",
  bye: "Goodbye! Hope to chat again soon.",
  default:
    "Hmm, I'm not sure how to respond to that. Try asking something else?",
};

function getRelevantReply(userInput: string): string {
  const lowerInput = userInput.toLowerCase();

  for (const key in intentResponses) {
    if (lowerInput.includes(key)) {
      return intentResponses[key];
    }
  }

  return intentResponses["default"];
}

export async function POST(req: Request) {
  const body = await req.json();
  const { messages } = body;

  // Get the last user message
  const lastMessage = messages[messages.length - 1]?.content || "";

  // Simulate delay
  await new Promise((res) => setTimeout(res, 1000));

  // Get contextual response
  const reply = getRelevantReply(lastMessage);

  return NextResponse.json({ reply });
}
