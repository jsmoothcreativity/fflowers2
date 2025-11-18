onload = () => {
  document.body.classList.remove("container");
};
// Easter egg for the secret heart
document.addEventListener("DOMContentLoaded", () => {
  const secret = document.querySelector(".secret-heart");

  if (secret) {
    secret.addEventListener("click", () => {
      const message = document.createElement("div");
      message.id = "egg-finale";
      message.innerHTML = `
        <div class="egg-finale-card">
          <h2>Heart found 💖</h2>
          <p>That’s how carefully I want to look after your heart too.</p>
        </div>
      `;

      message.addEventListener("click", () => message.remove());
      document.body.appendChild(message);
    });
  }
});
