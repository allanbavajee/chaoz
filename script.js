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
        div.style.textAlign = 'center'; // centrer le texte
        div.innerHTML = `
          <p>"${t.texte}"</p>
          <div class="stars">${'★'.repeat(t.stars)}</div>
          <span>- ${t.auteur}</span>
        `;
        testimonialTrack.appendChild(div);
      });

      // Affichage 1 à 1, de gauche vers la droite
      let current = data.length - 1; // commencer à la fin pour faire gauche→droite
      const items = testimonialTrack.children;
      Array.from(items).forEach(item => item.style.display = 'none');
      if (items.length > 0) items[current].style.display = 'block';

      setInterval(() => {
        items[current].style.display = 'none';
        current = (current - 1 + items.length) % items.length; // décrémenter pour gauche→droite
        items[current].style.display = 'block';
      }, 4000); // 4 secondes par témoignage

    })
    .catch(err => console.error('Erreur chargement JSON:', err));

  // -------------------------------
  // ⭐ Formulaire testimonial + étoiles
  // -------------------------------
  const stars = document.querySelectorAll('#starRating .star');
  const hiddenInput = document.getElementById('userStars');

  stars.forEach((star, idx) => {
    star.addEventListener('click', () => {
      stars.forEach(s => s.classList.remove('selected'));
      for (let i = 0; i <= idx; i++) { // remplit de gauche à droite
        stars[i].classList.add('selected');
      }
      hiddenInput.value = idx + 1;
    });
  });

  const form = document.getElementById('testimonialForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert(`Thanks for your feedback, ${document.getElementById('userName').value}!`);
    form.reset();
    stars.forEach(s => s.classList.remove('selected'));
    hiddenInput.value = 5; // valeur par défaut
  });

  // Ajouter le titre client-friendly au-dessus du formulaire
  const formContainer = document.querySelector('.testimonial-form');
  const header = document.createElement('h4');
  header.textContent = 'Tell us what you think';
  header.style.color = '#ff6f61';
  header.style.fontSize = '1.15rem';
  header.style.marginBottom = '10px';
  formContainer.parentNode.insertBefore(header, formContainer);

});
