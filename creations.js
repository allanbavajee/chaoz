document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.carousel-row');

  carousels.forEach(row => {
    const track = row.querySelector('.carousel-track');
    const direction = row.classList.contains('right-to-left') ? -1 : 1;
    let position = 0;

    // Dupliquer les items pour un défilement infini
    track.innerHTML += track.innerHTML;

    function animate() {
      position += 0.5 * direction; // vitesse
      if(Math.abs(position) >= track.scrollWidth/2) position = 0;
      track.style.transform = `translateX(${ -position }px)`;
      requestAnimationFrame(animate);
    }

    animate();
  });
});
