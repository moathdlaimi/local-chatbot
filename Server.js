const express = require("express");

const app = express();
app.use(express.json());

app.get("/api/health", function (request, response) {
  response.json({
    message: "Backend is running! (Browsers)"
  });
});

app.post("/api/analyze", function (request, response) {
    const { ticket } = request.body;
  
    if (typeof ticket !== "string" || ticket.trim() === "") {
      return response.status(400).json({
        error: "Please provide a ticket."
      });
    }
  
    response.json({
      analysis: `Backend received your ticket: ${ticket.trim()}`
    });
  });

app.listen(3000, "127.0.0.1", function () {
  console.log("Mo, Backend running at http://127.0.0.1:3000");
});