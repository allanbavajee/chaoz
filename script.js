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

      // initialisation
      items.forEach(item => item.classList.remove('active'));
      if(items[0]) items[0].classList.add('active');

      setInterval(() => {
        items[current].classList.remove('active');
        current = (current + 1) % items.length; // avancer vers droite
        items[current].classList.add('active');
      }, 4000); // toutes les 4s
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
        if(i <= idx) s.classList.add('selected');
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
