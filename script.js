document.addEventListener("DOMContentLoaded", async () => {
  const track = document.querySelector(".testimonial-track");

  // Charger le JSON
  const response = await fetch("temoignages.json");
  const temoignages = await response.json();

  // Créer les éléments HTML
  temoignages.forEach(t => {
    const div = document.createElement("div");
    div.className = "testimonial-item";
    div.innerHTML = `
      <p>"${t.texte}"</p>
      <div class="stars">${'★'.repeat(t.stars)}${'☆'.repeat(5 - t.stars)}</div>
      <span>- ${t.auteur}</span>
    `;
    track.appendChild(div);
  });

  // Défilement automatique 1 par 1
  const items = document.querySelectorAll(".testimonial-item");
  let index = 0;
  setInterval(() => {
    index = (index + 1) % items.length;
    track.style.transform = `translateX(-${index * 100}%)`;
  }, 4000);
});
