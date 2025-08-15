<script>
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".testimonial-track");
  const items = document.querySelectorAll(".testimonial-item");
  let index = 0;

  setInterval(() => {
    index = (index + 1) % items.length;
    track.style.transform = `translateX(-${index * 100}%)`;
  }, 4000); // toutes les 4 secondes
});
</script>
