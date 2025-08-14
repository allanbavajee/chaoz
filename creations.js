// Automatic horizontal scroll for carousel
document.addEventListener('DOMContentLoaded', () => {
  const rows = document.querySelectorAll('.carousel-row');
  rows.forEach((row, index) => {
    const track = row.querySelector('.carousel-track');
    let scrollAmount = 0;
    const speed = 1 + index * 0.5; // vary speed for each row
    function scroll() {
      scrollAmount += speed;
      if (scrollAmount >= track.scrollWidth - row.offsetWidth) scrollAmount = 0;
      track.scrollLeft = scrollAmount;
      requestAnimationFrame(scroll);
    }
    scroll();
  });
});
