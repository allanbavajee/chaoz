document.addEventListener('DOMContentLoaded', () => {
  // ⭐ Gestion des étoiles
  const stars = document.querySelectorAll('#starRating .star');
  const hiddenInput = document.getElementById('userStars');

  stars.forEach((star, idx) => {
    star.addEventListener('click', () => {
      // Réinitialiser toutes les étoiles
      stars.forEach(s => s.classList.remove('selected'));

      // Sélectionner les étoiles de gauche jusqu'à celle cliquée
      for (let i = 0; i <= idx; i++) {
        stars[i].classList.add('selected');
      }

      // Mettre à jour la valeur cachée
      hiddenInput.value = idx + 1;
    });
  });

  // 📄 Gestion du formulaire testimonial
  const form = document.getElementById('testimonialForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert(`Thanks for your feedback, ${document.getElementById('userName').value}!`);
    form.reset();
    // Réinitialiser les étoiles
    stars.forEach(s => s.classList.remove('selected'));
    hiddenInput.value = 5; // Valeur par défaut
  });

  // 🌟 Texte client-friendly
  document.querySelector('.testimonial-form').insertAdjacentHTML(
    'beforebegin',
    '<h4 class="testimonial-header">Share your feedback</h4>'
  );
});
