document.addEventListener("DOMContentLoaded", () => {
  const testimonialTrack = document.getElementById("testimonialTrack");

  // Charger les témoignages depuis le fichier JSON
  fetch("temoignages.json")
    .then(response => {
      if (!response.ok) throw new Error("Erreur de chargement des témoignages");
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data)) {
        data.forEach(t => {
          const card = document.createElement("div");
          card.classList.add("testimonial-card");

          card.innerHTML = `
            <p class="testimonial-message">"${t.message}"</p>
            <p class="testimonial-name">— ${t.name}</p>
            <p class="testimonial-stars">${"★".repeat(t.stars)}</p>
          `;

          testimonialTrack.appendChild(card);
        });
      } else {
        testimonialTrack.innerHTML = "<p>Aucun témoignage trouvé.</p>";
      }
    })
    .catch(err => {
      console.error("Erreur:", err);
      testimonialTrack.innerHTML = "<p>Impossible de charger les témoignages.</p>";
    });
});


  // -------------------------------
  // ⭐ Formulaire testimonial + étoiles
  // -------------------------------
  const stars = document.querySelectorAll('#starRating .star');
  const hiddenInput = document.getElementById('userStars');

  stars.forEach((star, idx) => {
    star.addEventListener('click', () => {
      stars.forEach((s,i) => s.classList.toggle('selected', i <= idx));
      hiddenInput.value = idx + 1;
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
