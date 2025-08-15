document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------
  // ⭐ Témoignages carousel (gauche → droite)
  // -------------------------------
  const testimonialTrack = document.getElementById('testimonialTrack');

  fetch('temoignages.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(t => {
        const div = document.createElement('div');
        div.className = 'testimonial-item';
        div.style.textAlign = 'center';
        div.innerHTML = `
          <p>"${t.texte}"</p>
          <div class="stars">${'★'.repeat(t.stars)}</div>
          <span>- ${t.auteur}</span>
        `;
        testimonialTrack.appendChild(div);
      });

      const items = Array.from(testimonialTrack.children);
      let current = 0;
      const total = items.length;

      // initialisation : tous hors écran à droite
      items.forEach((item, idx) => {
        item.style.positio
