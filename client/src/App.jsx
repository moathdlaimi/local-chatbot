import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const conversationRef = useRef(null);

  async function handleSend(event) {
    event.preventDefault();

    const text = input.trim();

    if (text === "" || isSending) {
      return;
    }

    setMessages(previous => [
      ...previous,
      { role: "user", content: text }
    ]);

    setInput("");
    setError("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: text })
      });

      if (!response.ok) {
        throw new Error(`Request failed: HTTP ${response.status}`);
      }

      const data = await response.json();

      if (typeof data.reply !== "string") {
        throw new Error("The backend did not return a reply.");
      }

      setMessages(previous => [
        ...previous,
        { role: "assistant", content: data.reply }
      ]);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSending(false);
    }
  }

useEffect(() => {
  const conversation = conversationRef.current;

  if (conversation) {
    conversation.scrollTop = conversation.scrollHeight;
  }
}, [messages]);

  return (
    <main>
      <h1>Local Chatbot</h1>

      <section ref={conversationRef} className="conversation" aria-label="Conversation" role="log">
        {messages.length === 0 && (
          <p className="empty-chat">Say hello to start a conversation.</p>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role}`}
          >
            <strong>
              {message.role === "user" ? "You" : "Chatbot"}
            </strong>
            <p>{message.content}</p>
          </div>
        ))}

        {isSending && <p>Chatbot is replying...</p>}
      </section>

      <form onSubmit={handleSend}>
        <label htmlFor="message">Your message</label>

        <input
          id="message"
          type="text"
          value={input}
          onChange={event => setInput(event.target.value)}
          placeholder="Type a message..."
          autoComplete="off"
        />

        <button type="submit" disabled={isSending || input.trim() === ""}>
          {isSending ? "Sending..." : "Send"}
        </button>
      </form>

      {error && <p role="alert">{error}</p>}
    </main>
  );
}

export default App;