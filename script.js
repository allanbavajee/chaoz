document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------
  // ⭐ Témoignages carousel (gauche → droite)
  // -------------------------------
  const testimonialTrack = document.getElementById('testimonialTrack');

  fetch('temoignages.json')
    .then(res => res.json())
    .then(data => {
      data.forEach(t => {
        const div = document.createElement('div');
        div.className = 'testimonial-item';
        div.innerHTML = `<p>"${t.texte}"</p><div class="stars">${'★'.repeat(t.stars)}</div><span>- ${t.auteur}</span>`;
        testimonialTrack.appendChild(div);
      });

      const items = Array.from(testimonialTrack.children);
      let current = 0;

      // initialisation
      items.forEach((item,i) => item.style.opacity = 0);
      if(items[0]) items[0].style.opacity = 1;

      setInterval(() => {
        items[current].style.opacity = 0;
        current = (current + 1) % items.length;
        items[current].style.opacity = 1;
      }, 4000);
    })
    .catch(err => console.error(err));

  // -------------------------------
  // ⭐ Formulaire testimonial + étoiles
  // -------------------------------
  const stars = document.querySelectorAll('#starRating .star');
const hiddenInput = document.getElementById('userStars');

stars.forEach(star => {
  star.addEventListener('click', () => {
    const value = parseInt(star.getAttribute('data-value')); // ex: 3

    // activer/désactiver les étoiles
    stars.forEach(s => {
      const sValue = parseInt(s.getAttribute('data-value'));
      s.classList.toggle('selected', sValue <= value);
    });

    // mettre la valeur choisie dans le hidden input
    hiddenInput.value = value;
  });
});

  const form = document.getElementById('testimonialForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert(`Thanks for your feedback, ${document.getElementById('userName').value}!`);
    form.reset();
    stars.forEach(s => s.classList.remove('selected'));
    hiddenInput.value = 5;
  });
});
