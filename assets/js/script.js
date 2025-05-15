/* jshint esversion: 6 */

document.addEventListener("DOMContentLoaded", () => {
  const revealBtn = document.getElementById("revealBtn");
  const backBtn = document.getElementById("backBtn");
  const cards = document.querySelectorAll(".card");
  const cardContainer = document.querySelector(".card-container");

  revealBtn.addEventListener("click", () => {
    cardContainer.classList.remove("hidden");
    revealBtn.style.display = "none";
    backBtn.style.display = "inline-block";
  });

  cards.forEach(card => {
    card.addEventListener("click", () => {
      if (document.querySelector(".card.flipped")) return;
      card.classList.add("flipped");
    });
  });

  backBtn.addEventListener("click", () => {
    // Reset UI
    cardContainer.classList.add("hidden");
    revealBtn.style.display = "inline-block";
    revealBtn.disabled = false;
    backBtn.style.display = "none";

    // Reset all cards
    cards.forEach(card => card.classList.remove("flipped"));
  });
});


  
  