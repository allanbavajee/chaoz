document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  
  // Dupliquer les éléments pour un défilement infini
  track.innerHTML += track.innerHTML;

  let position = 0;
  function animate() {
    position -= 0.5; // vitesse
    if (Math.abs(position) >= track.scrollWidth / 2) {
      position = 0;
    }
    track.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
  }

  animate();
});
