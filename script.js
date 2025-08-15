document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('testimonialTrack');

  if (!track) return console.error('Le container testimonialTrack est introuvable.');

  fetch('temoignages.json')
    .then(res => res.json())
    .then(data => {
      const list = document.createElement('div');
      list.className = 'testimonial-list';

      data.forEach(t => {
        const item = document.createElement('div');
        item.className = 'testimonial-item';
        item.innerHTML = `
          <p>"${t.texte}"</p>
          <div class="stars">${'★'.repeat(t.stars)}</div>
          <span>- ${t.auteur}</span>
        `;
        list.appendChild(item);
      });

      track.appendChild(list);

      const items = list.querySelectorAll('.testimonial-item');
      let index = 0;

      function showNext() {
        index = (index + 1) % items.length;
        const offset = -index * track.clientWidth;
        list.style.transform = `translateX(${offset}px)`;
      }

      // Défiler tous les 4 secondes
      setInterval(showNext, 4000);
    })
    .catch(err => console.error('Erreur chargement JSON:', err));
});
