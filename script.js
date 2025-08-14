// Charge les témoignages depuis le fichier JSON
async function loadTestimonials() {
  const response = await fetch('temoignages.json');
  const data = await response.json();
  const container = document.getElementById('testimonialTrack');
  container.innerHTML = '';
  data.forEach(t => {
    const div = document.createElement('div');
    div.classList.add('testimonial');
    div.innerHTML = `<p>"${t.message}"</p><div class="stars">${'⭐'.repeat(t.stars)}</div><span>- ${t.name}</span>`;
    container.appendChild(div);
  });
}

// Soumission du formulaire
document.getElementById('testimonialForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const stars = document.getElementById('stars').value;

  // Ici tu peux envoyer par email via backend ou API
  alert(`Merci ${name}, votre témoignage a été envoyé !`);

  // Reset formulaire
  this.reset();
});

// Initialisation
loadTestimonials();
