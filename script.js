function openEnvelope() {
  // Hide envelope and show the message
  document.getElementById("envelope").classList.add("hidden");
  document.getElementById("message").classList.remove("hidden");
}

function goToPage2() {
  // Navigate to the second page
  window.location.href = "page2.html"; // You need to create page2.html
}
