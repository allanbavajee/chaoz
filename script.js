// Charger les témoignages depuis le fichier JSON
async function loadTestimonials() {
  try {
    const response = await fetch('temoignages.json');
    const testimonials = await response.json();
    const track = document.getElementById('testimonialTrack');

    testimonials.forEach(t => {
      const div = document.createElement('div');
      div.className = 'testimonial-item';
      div.innerHTML = `
        <p>"${t.message}"</p>
        <div class="stars">${'⭐'.repeat(t.stars)}</div>
        <span>- ${t.name}</span>
      `;
      track.appendChild(div);
    });

    startSlideAnimation();
  } catch (err) {
    console.error('Erreur lors du chargement des témoignages:', err);
  }
}

// Animation slide de gauche à droite avec pause 4s
function startSlideAnimation() {
  const track = document.getElementById('testimonialTrack');
  const items = Array.from(track.children);
  if(items.length === 0) return;

  let index = 0;
  const itemWidth = items[0].offsetWidth + 30;

  function showNext() {
    track.style.transition = 'transform 1s ease-in-out';
    track.style.transform = `translateX(-${index * itemWidth}px)`;
    index++;
    if(index >= items.length) index = 0;
    setTimeout(showNext, 4000); // pause 4s
  }

  setTimeout(showNext, 4000);
}

//  Formulaire témoignage
document.getElementById('submitTestimonial').addEventListener('click', () => {
  const name = document.getElementById('userName').value;
  const email = document.getElementById('userEmail').value;
  const message = document.getElementById('userMessage').value;
  const stars = parseInt(document.getElementById('userStars').value);

  if(!name || !email || !message){
    alert('Veuillez remplir tous les champs.');
    return;
  }

  console.log({name,email,message,stars});
  alert('Merci pour votre témoignage !');

  document.getElementById('userName').value = '';
  document.getElementById('userEmail').value = '';
  document.getElementById('userMessage').value = '';
  document.getElementById('userStars').value = '5';
});

// Lancer le chargement des témoignages
loadTestimonials();
