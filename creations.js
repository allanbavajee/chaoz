// Automatic horizontal scroll for carousel
document.addEventListener('DOMContentLoaded', () => {
  const rows = document.querySelectorAll('.carousel-row');

  rows.forEach((row, index) => {
    const track = row.querySelector('.carousel-track');
    let scrollPos = 0;
    const speed = 1 + index * 0.5; // vitesse différente par rangée

    function scroll() {
      scrollPos += speed;
      if (scrollPos >= track.scrollWidth - row.offsetWidth) scrollPos = 0;
      track.scrollLeft = scrollPos;
      requestAnimationFrame(scroll);
    }

    scroll();
  });
});
