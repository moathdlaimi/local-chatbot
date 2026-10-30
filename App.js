const ticketInput = document.getElementById("ticket");
const analyzeButton = document.getElementById("analyze");
const results = document.getElementById("results");

analyzeButton.addEventListener("click", function () {
  const ticketText = ticketInput.value.trim();

  if (ticketText === "") {
    results.textContent = "Please enter a support ticket.";
    return;
  }

  results.textContent = `You entered: ${ticketText}`;
});