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

  stars.forEach((star, idx) => {
    star.addEventListener('click', () => {
      stars.forEach((s,i) => s.classList.toggle('selected', i >= idx));
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
document.addEventListener("DOMContentLoaded", function () {
 const form = document.getElementById("testimonialForm");
const thankYou = document.getElementById("thankYouMessage");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" }
    });

    if (response.ok) {
      form.reset();
      stars.forEach(s => s.classList.remove('selected'));
      hiddenInput.value = 5; // reset étoiles
      thankYou.style.display = "block";
      setTimeout(() => { thankYou.style.display = "none"; }, 5000);
    } else {
      alert("Oops! Something went wrong. Please try again.");
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
});
