// Run the Easter egg hunt when the page loads
window.addEventListener("load", () => {
  initEasterEggHunt();
});

function initEasterEggHunt() {
  // Get all the floating heart bubbles
  const bubbles = Array.from(document.querySelectorAll(".bubble"));
  if (!bubbles.length) return;

  // Pick specific bubbles so they are spaced out and not overlapping
  // These numbers are ZERO-BASED indexes in the NodeList of .bubble elements.
  // You can change them if you want different hearts.
  const eggIndices = [1, 4, 7, 10, 14];

  const eggs = eggIndices
    .map((i) => bubbles[i])
    .filter(Boolean); // keep only ones that exist

  if (!eggs.length) return;

  let found = 0;

  // === HUD at the top (shows "Hidden hearts: X / 5") ===
  const hud = document.createElement("div");
  hud.id = "egg-hud";
  hud.innerHTML = `
    <strong>Hidden hearts:</strong>
    <span id="egg-count">0</span> / ${eggs.length}
  `;
  document.body.appendChild(hud);

  const countSpan = hud.querySelector("#egg-count");

  // === Toast at the bottom for feedback ===
  const toast = document.createElement("div");
  toast.id = "egg-toast";
  document.body.appendChild(toast);

  function showToast(text) {
    toast.textContent = text;
    toast.classList.add("visible");
    setTimeout(() => {
      toast.classList.remove("visible");
    }, 1500);
  }

  // === Mark chosen hearts as "eggs" and attach click handler ===
  eggs.forEach((egg, index) => {
    egg.classList.add("egg");
    egg.setAttribute("aria-label", "Hidden heart");

    egg.addEventListener("click", () => {
      // If this one was already found, ignore
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

// === Final overlay message when all hearts are found ===
function showFinalMessage() {
  const message = document.createElement("div");
  message.id = "egg-finale";
  message.innerHTML = `
    <div class="egg-finale-card">
      <h2>All hearts found 💖</h2>
      <p>You didn’t miss a single one.</p>
      <p>That’s how carefully I want to look after your heart too.</p>
    </div>
  `;
  // Tap/click anywhere to close
  message.addEventListener("click", () => message.remove());
  document.body.appendChild(message);
}
