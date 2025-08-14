// script.js
document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------
     1) Données initiales (remplaçables)
     ------------------------- */
  const testimonialsData = [
    { name: "Sophie L.", message: "Les créations de Charlotte sont toujours un vrai délice, à la fois pour les yeux et les papilles.", stars: 5 },
    { name: "Marc D.", message: "Chaque gâteau est une œuvre d'art. On sent l'amour dans chaque bouchée.", stars: 5 },
    { name: "Élodie P.", message: "Jamais déçue, toujours émerveillée. Bravo Charlotte !", stars: 5 }
  ];

  /* -------------------------
     2) Références DOM
     ------------------------- */
  const trackContainer = document.getElementById('testimonialTrack');
  // create inner list wrapper (we use a wrapper so trackContainer remains simple)
  const listEl = document.createElement('div');
  listEl.className = 'testimonial-list';
  trackContainer.appendChild(listEl);

  /* -------------------------
     3) Rendu des témoignages (injecte dans .testimonial-list)
     ------------------------- */
  function renderTestimonials() {
    listEl.innerHTML = ''; // clear
    testimonialsData.forEach(t => {
      const item = document.createElement('div');
      item.className = 'testimonial-item';
      item.innerHTML = `
        <p>"${escapeHtml(t.message)}"</p>
        <div class="stars">${'⭐'.repeat(Math.max(0, Math.min(5, t.stars)))}</div>
        <span>- ${escapeHtml(t.name)}</span>
      `;
      listEl.appendChild(item);
    });
    // reset transform to first
    listEl.style.transform = 'translateX(0)';
    currentIndex = 0;
    // refresh items NodeList for sliding calculation
    items = Array.from(listEl.children);
  }

  /* small helper to avoid XSS if any */
  function escapeHtml(s) {
    return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
  }

  /* -------------------------
     4) Carousel contrôlé (pause 4s entre éléments)
     ------------------------- */
  let items = [];
  let currentIndex = 0;
  let slideTimer = null;
  const SLIDE_PAUSE = 4000; // 4s
  const TRANSITION_MS = 600; // 0.6s
  
  function startSliding() {
    stopSliding();
    slideTimer = setTimeout(nextSlideCycle, SLIDE_PAUSE);
  }
  function stopSliding() {
    if (slideTimer) { clearTimeout(slideTimer); slideTimer = null; }
  }

  function nextSlideCycle() {
    if (!items.length) return;
    // increment index
    currentIndex++;
    if (currentIndex >= items.length) currentIndex = 0;
    // compute width + gap
    const itemWidth = items[0].offsetWidth;
    // gap from CSS is 16px, but safer to compute by measuring offsetLeft difference
    const gapPx = computeGap();
    const translateX = (itemWidth + gapPx) * currentIndex;
    listEl.style.transition = `transform ${TRANSITION_MS}ms ease-in-out`;
    listEl.style.transform = `translateX(-${translateX}px)`;
    // schedule next
    slideTimer = setTimeout(nextSlideCycle, SLIDE_PAUSE);
  }

  // compute gap between items (approx)
  function computeGap() {
    if (items.length < 2) return 0;
    const a = items[0].getBoundingClientRect();
    const b = items[1].getBoundingClientRect();
    return Math.round(b.left - a.left - a.width);
  }

  // init render + start
  renderTestimonials();
  startSliding();

  // Recompute on resize (responsive)
  window.addEventListener('resize', () => {
    // reset transform to current index using new sizes
    items = Array.from(listEl.children);
    const itemWidth = items[0] ? items[0].offsetWidth : 0;
    const gapPx = computeGap();
    const translateX = (itemWidth + gapPx) * currentIndex;
    listEl.style.transition = 'none';
    listEl.style.transform = `translateX(-${translateX}px)`;
  });

  /* -------------------------
     5) Formulaire - étoiles cliquables (pas de select)
     ------------------------- */
  const starButtons = document.querySelectorAll('#starRating .star');
  const hiddenStars = document.getElementById('userStars');
  if (starButtons && starButtons.length) {
    // default selection 5
    setStarSelection(5);
    starButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const v = parseInt(btn.dataset.value, 10);
        setStarSelection(v);
      });
      // hover preview
      btn.addEventListener('mouseenter', () => {
        const v = parseInt(btn.dataset.value, 10);
        highlightStars(v);
      });
      btn.addEventListener('mouseleave', () => {
        highlightStars(parseInt(hiddenStars.value, 10));
      });
    });
  }

  function setStarSelection(value) {
    hiddenStars.value = value;
    highlightStars(value);
  }
  function highlightStars(value) {
    starButtons.forEach(b => {
      const v = parseInt(b.dataset.value, 10);
      if (v <= value) b.classList.add('selected'); else b.classList.remove('selected');
    });
  }

  /* -------------------------
     6) Soumission du formulaire
     - On ajoute localement le témoignage dans le carousel (et relance le slider).
     - Tu peux remplacer la partie d'envoi (console/log) par un appel vers ton backend ou e-mail webhook.
     ------------------------- */
  const form = document.getElementById('testimonialForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    const message = document.getElementById('userMessage').value.trim();
    const starsValue = parseInt(document.getElementById('userStars').value, 10) || 5;

    if (!name || !email || !message) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    // Append locally
    testimonialsData.push({ name, message, stars: starsValue });
    renderTestimonials();

    // user feedback
    alert('Merci ! Votre témoignage a bien été reçu.');

    // reset form
    form.reset();
    setStarSelection(5);

    // restart sliding from the new state
    startSliding();

    // Option: envoyer au serveur / mail => remplacer ce console.log par fetch() vers ton backend
    console.log('Nouveau témoignage (à envoyer au backend si besoin):', { name, email, message, stars: starsValue });
  });

});
async function loadTestimonials() {
  try {
    const response = await fetch('temoignages.json');
    const testimonials = await response.json();

    const track = document.getElementById('testimonialTrack');
    track.innerHTML = ''; // nettoyer avant ajout

    // Créer un wrapper flex
    const list = document.createElement('div');
    list.className = 'testimonial-list';
    track.appendChild(list);

    // Ajouter tous les témoignages
    testimonials.forEach(t => {
      const div = document.createElement('div');
      div.className = 'testimonial-item';
      div.innerHTML = `
        <p>"${t.message}"</p>
        <div class="stars">${'⭐'.repeat(t.stars)}</div>
        <span>- ${t.name}</span>
      `;
      list.appendChild(div);
    });

    // Défilement automatique
    let index = 0;
    const items = document.querySelectorAll('.testimonial-item');
    const total = items.length;

    setInterval(() => {
      index++;
      if (index >= total) index = 0;
      list.style.transform = `translateX(-${index * 100}%)`;
    }, 4000);

  } catch (err) {
    console.error('Erreur chargement témoignages:', err);
  }
}

document.addEventListener('DOMContentLoaded', loadTestimonials);
