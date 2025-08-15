document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------
  // ⭐ Témoignages carousel (glissement gauche → droite)
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

      // initialisation
      items.forEach((item, idx) => {
        item.style.position = 'absolute';
        item.style.left = '0';
        item.style.top = '0';
        item.style.width = '100%';
        item.style.transition = 'transform 0.8s ease';
        item.style.transform = 'translateX(100%)'; // hors de l'écran à droite
      });
      if (items[0]) items[0].style.transform = 'translateX(0)';

      setInterval(() => {
        const prev = current;
        current = (current + 1) % total;
        items[prev].style.transform = 'translateX(-100%)'; // sort à gauche
        items[current].style.transform = 'translateX(0)';   // entre
        // Reset celui d’avant pour prochaine boucle
        setTimeout(() => {
          items[prev].style.transform = 'translateX(100%)'; 
        }, 800);
      }, 4000);

    })
    .catch(err => console.error('Erreur chargement JSON:', err));

  // -------------------------------
  // ⭐ Formulaire testimonial + étoiles
  // -------------------------------
  const stars = document.querySelectorAll('#starRating .star');
  const hiddenInput = document.getElementById('userStars');

  stars.forEach((star, idx) => {
    star.addEventListener('click', () => {
      stars.forEach((s, i) => {
        if (i <= idx) s.classList.add('selected');
        else s.classList.remove('selected');
      });
      hiddenInput.value = idx + 1;
    });
  });

  const form = document.getElementById('testimonialForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert(`Thanks for your feedback, ${document.getElementById('userName').value}!`);
    form.reset();
    stars.forEach(s => s.classList.remove('selected'));
    hiddenInput.value = 5;
  });

  // Ajouter le titre au-dessus du formulaire
  const formContainer = document.querySelector('.testimonial-form');
  const header = document.createElement('h4');
  header.textContent = 'Share your feedback';
  header.style.color = '#ff6f61';
  header.style.fontSize = '1.15rem';
  header.style.marginBottom = '10px';
  formContainer.parentNode.insertBefore(header, formContainer);

});
