window.addEventListener("load", () => {
  // original behavior
  document.body.classList.remove("container");

  // start the heart hunt
  initEasterEggHunt();
});

function initEasterEggHunt() {
  const bubbles = Array.from(document.querySelectorAll(".bubble"));
  if (!bubbles.length) return;

  const totalEggs = Math.min(5, bubbles.length);

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
  // ...
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
