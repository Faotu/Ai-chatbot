// "use client";

// import { useState } from "react";

// type Message = {
//   role: "user" | "assistant";
//   content: string;
// };

// export default function ChatPage() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");

//   const sendMessage = async () => {
//     const userMsg: Message = { role: "user", content: input };
//     const newMessages = [...messages, userMsg];
//     setMessages(newMessages);
//     setInput("");

//     const res = await fetch("/api/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ userId: "test-user-id", messages: newMessages }),
//     });

//     const data = await res.json();
//     setMessages([...newMessages, { role: "assistant", content: data.reply }]);
//   };

//   return (
//     <div className="p-4 max-w-2xl mx-auto">
//       <div className="space-y-2">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`p-2 rounded ${
//               msg.role === "user" ? "bg-blue-100" : "bg-green-100"
//             }`}
//           >
//             <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.content}
//           </div>
//         ))}
//       </div>
//       <div className="mt-4 flex gap-2">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="border rounded px-4 py-2 flex-grow"
//           placeholder="Type a message..."
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Nav from "../components/nav";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) throw new Error("Network error");

      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <div className="p-4 max-w-2xl mx-auto">
        <div className="space-y-2 min-h-[300px]">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded ${
                msg.role === "user"
                  ? "bg-blue-100 text-left"
                  : "bg-green-100 text-left"
              }`}
            >
              <strong>{msg.role === "user" ? "You" : "AI"}:</strong>{" "}
              {msg.content}
            </div>
          ))}
          {loading && (
            <div className="bg-yellow-100 p-2 rounded text-left animate-pulse">
              <strong>AI:</strong> Typing...
            </div>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border rounded px-4 py-2 flex-grow"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}
