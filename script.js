// 1) Charger les témoignages depuis le JSON et construire les slides
fetch('temoignages.json')
  .then(r => r.json())
  .then(data => {
    const track = document.getElementById('testimonialTrack');
    if (!track) return;

    // Construire chaque slide
    data.forEach(t => {
      const slide = document.createElement('div');
      slide.className = 'testimonial';
      slide.innerHTML = `
        <p>"${t.message}"</p>
        <div class="stars">${'⭐'.repeat(t.stars || t.note || 5)}</div>
        <span>- ${t.name || t.nom}</span>
      `;
      track.appendChild(slide);
    });

    // Dupliquer le premier slide pour une boucle plus douce
    if (data.length > 1) {
      const firstClone = track.firstElementChild.cloneNode(true);
      track.appendChild(firstClone);
    }

    // 2) Animation horizontale simple
    let index = 0;
    const slideCount = track.children.length;
    const advance = () => {
      index++;
      track.style.transition = 'transform 0.6s ease';
      track.style.transform = `translateX(-${index * 100}%)`;

      // Reset à la fin (après l’animation)
      if (index === slideCount - 1) {
        setTimeout(() => {
          track.style.transition = 'none';
          track.style.transform = 'translateX(0)';
          index = 0;
        }, 650);
      }
    };
    // Change de slide toutes les 4s
    setInterval(advance, 4000);
  })
  .catch(err => {
    console.error('Erreur chargement temoignages.json :', err);
  });

// 3) Formulaire : envoi par e-mail (mailto)
document.getElementById('testimonialForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const message = document.getElementById('message').value.trim();
  const stars = document.getElementById('stars').value;

  const subject = encodeURIComponent('Témoignage site ChaOz');
  const body = encodeURIComponent(`Nom: ${name}\nNote: ${stars} étoiles\nMessage:\n${message}`);
  window.location.href = `mailto:allan.bavajee@gmail.com?subject=${subject}&body=${body}`;
});
