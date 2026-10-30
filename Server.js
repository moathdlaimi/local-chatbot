const express = require("express");

const app = express();
app.use(express.json());

app.get("/api/health", function (request, response) {
  response.json({
    message: "Backend is running! (Browsers)"
  });
});

app.post("/api/chat", function (request, response) {
  const { message } = request.body;

  if (typeof message !== "string" || message.trim() === "") {
    return response.status(400).json({
      error: "Please enter a message."
    });
  }

  const text = message.trim().toLowerCase();
  let reply;

  if (["hi", "hello", "hey"].includes(text)) {
    reply = "Hello! How can I help you?";
  } else if (text.includes("your name")) {
    reply = "I'm Mo's chatbot.";
  } else if (text.includes("help")) {
    reply = "Try saying hello or asking my name.";
  } else {
    reply = "I don't have a rule for that yet.";
  }

  response.json({ reply });
});

app.listen(3000, "127.0.0.1", function () {
  console.log("Mo, Backend running at http://127.0.0.1:3000");
});