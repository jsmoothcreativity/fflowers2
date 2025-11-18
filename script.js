window.addEventListener("load", () => {
  // original behavior
  document.body.classList.remove("container");

  // start the heart hunt
  initEasterEggHunt();
});

function initEasterEggHunt() {
  const bubbles = Array.from(document.querySelectorAll(".bubble"));
  if (!bubbles.length) return;

  const totalEggs = Math.min(4, bubbles.length);

  // --- pick eggs that are not overlapping/too close ---
  const selectedEggs = [];
  const minDistance = 15; // "distance" in percent units

  bubbles.forEach((bubble) => {
    if (selectedEggs.length >= totalEggs) return;

    const style = window.getComputedStyle(bubble);
    const top = parseFloat(style.top) || 0;
    const left = parseFloat(style.left) || 0;

    const tooClose = selectedEggs.some((b) => {
      const s = window.getComputedStyle(b);
      const t2 = parseFloat(s.top) || 0;
      const l2 = parseFloat(s.left) || 0;
      const dx = left - l2;
      const dy = top - t2;
      const dist = Math.sqrt(dx * dx + dy * dy);
      return dist < minDistance;
    });

    if (!tooClose) {
      selectedEggs.push(bubble);
    }
  });

  const eggs = selectedEggs;
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
  message.addEventListener("click", () => message.remove());
  document.body.appendChild(message);
}
