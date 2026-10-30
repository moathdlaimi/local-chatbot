import { useState } from "react";
import "./App.css";

function App() {
  const [ticket, setTicket] = useState("");
  const [result, setResult] = useState("");

  async function handleAnalyze() {
    const cleanedTicket = ticket.trim();
  
    if (cleanedTicket === "") {
      setResult("Please enter a support ticket.");
      return;
    }
  
    setResult("Analyzing...");
  
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ticket: cleanedTicket
        })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }
  
      setResult(data.analysis);
    } catch (error) {
      setResult(`Analysis failed: ${error.message}`);
    }
  }
  async function checkBackend() {
    try {
      const response = await fetch("/api/health");
  
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
  
      const data = await response.json();
      setResult(data.message);
    } catch (error) {
      setResult(`Could not reach the backend: ${error.message}`);
    }
  }

  return (
    <main>
      <h1>Local Chatbot</h1>

      <label htmlFor="ticket">Enter your support ticket:</label>

      <textarea
        id="ticket"
        rows={8}
        value={ticket}
        onChange={(event) => setTicket(event.target.value)}
        placeholder="Describe the issue..."
      />

      <button onClick={handleAnalyze}>Analyze</button>
      <button onClick={checkBackend}>Check backend</button>

      <h2>Results</h2>
      <p>{result || "Your analysis will appear here."}</p>
    </main>
  );
}

export default App;