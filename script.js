document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('testimonialTrack');

  // Charger les témoignages depuis JSON
  fetch('temoignages.json')
    .then(response => response.json())
    .then(data => {
      // Créer les éléments HTML
      data.forEach(t => {
        const item = document.createElement('div');
        item.className = 'testimonial-item';
        item.innerHTML = `
          <p>"${t.texte}"</p>
          <div class="stars">${'★'.repeat(t.stars)}</div>
          <span>- ${t.auteur}</span>
        `;
        track.appendChild(item);
      });

      const items = track.querySelectorAll('.testimonial-item');
      let index = 0;

      // Fonction pour afficher un seul témoignage
      function showTestimonial(i) {
        items.forEach((el, idx) => {
          el.style.display = idx === i ? 'block' : 'none';
        });
      }

      showTestimonial(index);

      // Changer tous les 4 secondes
      setInterval(() => {
        index = (index + 1) % items.length;
        showTestimonial(index);
      }, 4000);
    })
    .catch(err => console.error('Erreur chargement JSON:', err));
});
