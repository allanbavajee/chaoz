// Défilement automatique pour chaque carrousel
document.querySelectorAll('.carousel').forEach(carousel => {
  const speed = parseInt(carousel.dataset.speed) || 3000;
  let scrollAmount = 0;

  setInterval(() => {
    scrollAmount += 320;
    if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
      scrollAmount = 0;
    }
    carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  }, speed);
});

// Animation fade-in au scroll
const faders = document.querySelectorAll('.fade-in');
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
