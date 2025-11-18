onload = () => {
  document.body.classList.remove("container");
};

// Easter egg for the secret heart
document.addEventListener("DOMContentLoaded", () => {
  const secret = document.querySelector(".secret-heart");

  if (!secret) return;

  const showEggFinale = () => {
    // If it's already open, don't stack multiple
    if (document.getElementById("egg-finale")) return;

    const message = document.createElement("div");
    message.id = "egg-finale";
    message.innerHTML = `
      <div class="egg-finale-card">
        <h2>All hearts found 💖</h2>
        <p>You didn’t miss a single one.</p>
        <p>That’s how carefully I want to look after your heart too.</p>
      </div>
    `;

    // Click anywhere on the overlay to close
    message.addEventListener("click", () => message.remove());
    document.body.appendChild(message);
  };

  // Desktop click
  secret.addEventListener("click", showEggFinale);

  // Mobile touch
  secret.addEventListener("touchstart", showEggFinale, { passive: true });
});
