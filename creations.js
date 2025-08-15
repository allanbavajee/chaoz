document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('testimonialTrack');

  if (!track) {
    console.error('Le container testimonialTrack est introuvable.');
    return;
  }

  fetch('temoignage.json')
    .then(response => response.json())
    .then(data => {
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

      function showTestimonial(i) {
        items.forEach((el, idx) => {
          el.style.display = idx === i ? 'block' : 'none';
        });
      }

      showTestimonial(index);

      setInterval(() => {
        index = (index + 1) % items.length;
        showTestimonial(index);
      }, 4000);
    })
    .catch(err => console.error('Erreur chargement JSON:', err));
});
