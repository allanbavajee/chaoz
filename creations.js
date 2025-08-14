document.addEventListener('DOMContentLoaded',()=>{

  const rows = document.querySelectorAll('.carousel-row');

  rows.forEach(row=>{
    const track = row.querySelector('.carousel-track');
    let scrollAmount = 0;
    const speed = 1; // px per frame
    const direction = row.classList.contains('right-to-left')?-1:1;

    function animate(){
      scrollAmount += speed*direction;
      if(scrollAmount > track.scrollWidth/2) scrollAmount = 0;
      if(scrollAmount < -track.scrollWidth/2) scrollAmount = 0;
      track.style.transform = `translateX(${scrollAmount}px)`;
      requestAnimationFrame(animate);
    }
    animate();
  });

});
