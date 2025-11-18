function initEasterEggHunt() {
  const bubbles = Array.from(document.querySelectorAll(".bubble"));
  if (bubbles.length === 0) return;

  // Pick 4 bubbles that are nicely spaced out (no overlaps)
  // These are nth-child(2), (8), (13), (19) in your CSS positions.
  const eggs = [];
  if (bubbles[1]) eggs.push(bubbles[1]);   // bubble 2
  if (bubbles[7]) eggs.push(bubbles[7]);   // bubble 8
  if (bubbles[12]) eggs.push(bubbles[12]); // bubble 13
  if (bubbles[18]) eggs.push(bubbles[18]); // bubble 19

  if (!eggs.length) return;

  let found = 0;

  // HUD at the top
  const hud = document.createElement("div");
  hud.id = "egg-hud";
  hud.innerHTML = `
    <strong>Hidden hearts:</strong>
    <span id="egg-count">0</span> / ${eggs.length}
  `;
  document.body.appendChild(hud);

  // Toast for feedback
  const toast = document.createElement("div");
  toast.id = "egg-toast";
  document.body.appendChild(toast);

  const countSpan = hud.querySelector("#egg-count");

  function showToast(text) {
    toast.textContent = text;
    toast.classList.add("visible");
    setTimeout(() => {
      toast.classList.remove("visible");
    }, 1500);
  }

  // Mark chosen bubbles as eggs
  eggs.forEach((egg, index) => {
    egg.classList.add("egg");
    egg.setAttribute("aria-label", "Hidden heart");

    egg.addEventListener("click", () => {
      if (egg.classList.contains("egg--found")) return;

      egg.classList.add("egg--found");
      found++;
      countSpan.textContent = found;
      showToast(`You found heart #${index + 1}!`);

      if (found === eggs.length) {
        showToast("You found them all! 💐");
        setTimeout(showFinalMessage, 800);
      }
    });
  });
}
