<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ChaOz</title>
  <link rel="stylesheet" href="styles.css">
  <link href="https://fonts.googleapis.com/css2?family=Parisienne&family=Dancing+Script&family=Poppins:wght@400;600&display=swap" rel="stylesheet">
</head>
<body>

  <!-- HEADER -->
  <header>
    <div class="header-center">
      <div class="title-logo">
        <img src="image/chaoz.logo.w.png" alt="ChaOz Logo" class="header-logo">
        <h1 class="site-title">ChaOz</h1>
      </div>
      <p class="slogan">Bake with Grace, Serve with Love</p>
    </div>

    <nav class="menu">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Recipes</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  </header>

  <!-- MAIN CONTENT -->
  <div class="main-content">
    
    <!-- LEFT COLUMN : Images -->
    <section class="latest-recipes">
      <h2>Latest Creations</h2>
      <div class="big-image side-by-side">
        <div class="big-image-block">
          <img src="image/pic.temp.0.png" alt="Big Recipe 1">
          <p class="image-desc">Chicken Avocado Pasta</p>
        </div>
        <div class="big-image-block">
          <img src="image/pic.temp.1.png" alt="Big Recipe 2">
          <p class="image-desc">Sausage and Veg Tray Bake</p>
        </div>
      </div>

      <div class="small-images">
        <div class="image-block"><img src="image/pic.temp.6.png" alt="Small Recipe 1"><p class="image-desc">Banana Bread</p></div>
        <div class="image-block"><img src="image/pic.temp.3.png" alt="Small Recipe 2"><p class="image-desc">Veggie Salad</p></div>
        <div class="image-block"><img src="image/pic.temp.4.png" alt="Small Recipe 3"><p class="image-desc">Fruit Tart</p></div>
        <div class="image-block"><img src="image/pic.temp.5.png" alt="Small Recipe 4"><p class="image-desc">Chocolate Muffin</p></div>
        <div class="image-block"><img src="image/pic.temp.7.png" alt="Small Recipe 5"><p class="image-desc">Pancakes</p></div>
        <div class="image-block"><img src="image/pic.temp.8.png" alt="Small Recipe 6"><p class="image-desc">Cinnamon Roll</p></div>
        <div class="image-block"><img src="image/pic.temp.9.png" alt="Small Recipe 7"><p class="image-desc">Quiche</p></div>
        <div class="image-block"><img src="image/pic.temp.10.png" alt="Small Recipe 8"><p class="image-desc">Brownies</p></div>
      </div>
    </section>

    <!-- RIGHT COLUMN : Charlotte + Témoignages + Formulaire -->
    <aside class="welcome-box">
      <h3>Welcome, I'm Charlotte</h3>
      <img src="image/Charlotte.jpg" alt="Charlotte" class="new-charlotte-photo">
      <p>As a passionate pastry chef, I blend taste with originality to create desserts that not only please the palate but also tell a story. Every creation is crafted with love and care.</p>
      
      <!-- Logos sociaux -->
      <div class="social-links">
        <a href="#"><img src="image/fb.png" alt="Facebook"></a>
        <a href="#"><img src="image/wa.png" alt="Whatsapp"></a>
        <a href="#"><img src="image/tk.png" alt="TikTok"></a>
        <a href="#"><img src="image/mail.png" alt="Mail"></a>
        <a href="#"><img src="image/in.png" alt="LinkedIn"></a>
      </div>

      <!-- Témoignages -->
      <div class="testimonials">
        <h4>Ce que disent nos clients</h4>
        <div class="testimonial-track" id="testimonialTrack"></div>
      </div>

      <!-- Formulaire -->
      <div class="testimonial-form">
        <h4>Laissez votre témoignage</h4>
        <input type="text" id="userName" placeholder="Votre nom">
        <input type="email" id="userEmail" placeholder="Votre email">
        <textarea id="userMessage" placeholder="Votre témoignage"></textarea>
        <select id="userStars">
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>
        <button id="submitTestimonial">Envoyer</button>
      </div>
    </aside>

  </div>

  <footer>
    <p>© 2025 ChaOz — Crafted with Love</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>
