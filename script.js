// Chargement des témoignages depuis un fichier JSON
fetch('temoignages.json')
  .then(res => res.json())
  .then(data => {
    const slider = document.getElementById('testimonialSlider');
    data.forEach(t => {
      const div = document.createElement('div');
      div.classList.add('testimonial');
      div.innerHTML = `
        <p>"${t.message}"</p>
        <div class="stars">${'⭐'.repeat(t.stars)}</div>
        <span>- ${t.name}</span>
      `;
      slider.appendChild(div);
    });

    // Animation slide horizontal
    let index = 0;
    setInterval(() => {
      index = (index + 1) % data.length;
      slider.style.transform = `translateX(-${index * 100}%)`;
      slider.style.transition = "transform 0.5s ease";
    }, 3000);
  });

// Gestion du formulaire
document.getElementById('testimonialForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;
  const stars = document.getElementById('stars').value;

  // Envoi par email (mailto)
  window.location.href = `mailto:allan.bavajee@gmail.com?subject=Témoignage&body=Nom: ${name}%0AStars: ${stars}%0AMessage: ${message}`;
});
