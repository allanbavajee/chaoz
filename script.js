document.addEventListener("DOMContentLoaded", async () => {
  const track = document.querySelector(".testimonial-track");
  if (!track) return console.error("Pas de testimonial-track trouvé");

  try {
    const response = await fetch("temoignages.json");
    const temoignages = await response.json();

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

    // carrousel auto
    let index = 0;
    const items = document.querySelectorAll(".testimonial-item");
    setInterval(() => {
      index = (index + 1) % items.length;
      track.style.transform = `translateX(-${index * 100}%)`;
    }, 4000);

  } catch (err) {
    console.error("Erreur chargement JSON:", err);
  }
});
