document.addEventListener('DOMContentLoaded', () => {
  const testimonialTrack = document.getElementById('testimonialTrack');
  const testimonialForm = document.getElementById('testimonialForm');
  const thankYou = document.getElementById('thankYouMessage');
  const stars = Array.from(document.querySelectorAll('#starRating .star'));
  const hiddenInput = document.getElementById('userStars');

  // carousel state
  let items = [];
  let current = 0;
  let carouselInterval = null;

  function startCarousel() {
    if (carouselInterval) clearInterval(carouselInterval);
    if (items.length === 0) return;
    items.forEach(item => item.style.opacity = 0);
    current = current % items.length;
    items[current].style.opacity = 1;
    if (items.length > 1) {
      carouselInterval = setInterval(() => {
        items[current].style.opacity = 0;
        current = (current + 1) % items.length;
        items[current].style.opacity = 1;
      }, 4000);
    }
  }

  function createTestimonialElement({texte, auteur, stars: nbStars}) {
    const div = document.createElement('div');
    div.className = 'testimonial-item';
    div.innerHTML = `<p>"${escapeHtml(texte || '')}"</p><div class="stars">${'★'.repeat(Number(nbStars) || 0)}</div><span>- ${escapeHtml(auteur || 'Anonyme')}</span>`;
    div.style.opacity = 0;
    testimonialTrack.appendChild(div);
    items.push(div);
    startCarousel();
  }

  // Load existing testimonials (temoignages.json)
  fetch('temoignages.json')
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        data.forEach(t => {
          createTestimonialElement({
            texte: t.texte || t.message || t.text || '',
            auteur: t.auteur || t.name || 'Anonyme',
            stars: t.stars || t.rating || 5
          });
        });
      }
      startCarousel();
    })
    .catch(err => {
      console.error('Impossible de charger temoignages.json :', err);
      // on garde items vide, l'utilisateur pourra ajouter des témoignages manuellement
    });

  // STAR rating behavior (hover + click)
  function clearHover() { stars.forEach(s => s.classList.remove('hover')); }
  function applySelected(idx) { stars.forEach((s, i) => s.classList.toggle('selected', i <= idx)); }

  stars.forEach((star, idx) => {
    star.addEventListener('mouseenter', () => {
      stars.forEach((s, i) => s.classList.toggle('hover', i <= idx));
    });
    star.addEventListener('mouseleave', () => {
      clearHover();
    });
    star.addEventListener('click', () => {
      applySelected(idx);
      hiddenInput.value = idx + 1;
    });
  });

  // Helper to escape simple HTML (safety when injecting texte)
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Form submit -> send JSON to Formspree and update carousel locally
  testimonialForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(testimonialForm);
    const payload = Object.fromEntries(formData.entries()); // { name, email, message, stars }

    try {
      const response = await fetch(testimonialForm.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        // add to carousel immediately
        createTestimonialElement({
          texte: payload.message,
          auteur: payload.name || 'Anonyme',
          stars: payload.stars || 5
        });

        // reset form + stars UI + hidden input
        testimonialForm.reset();
        applySelected(-1);
        hiddenInput.value = 5;

        // show thank you
        if (thankYou) {
          thankYou.style.display = 'block';
          setTimeout(() => { thankYou.style.display = 'none'; }, 5000);
        }
      } else {
        // read response body (Formspree often returns JSON with error details)
        let text;
        try { text = await response.text(); } catch (_) { text = response.statusText; }
        alert('Erreur lors de l\'envoi: ' + text);
        console.error('Formspree error:', response.status, text);
      }
    } catch (err) {
      alert('Erreur réseau: ' + err.message);
      console.error(err);
    }
  });

});
