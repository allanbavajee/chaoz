document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  let position = 0;

  // Dupliquer les items pour un effet infini
  track.innerHTML += track.innerHTML;

  function animate() {
    position += 0.5; // vitesse
    if (position >= track.scrollWidth / 2) {
      position = 0;
    }
    track.style.transform = `translateX(${-position}px)`;
    requestAnimationFrame(animate);
  }

  animate();
});
