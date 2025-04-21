document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel");
    const cards = document.querySelectorAll(".projet-card");
    const nextButton = document.querySelector(".next-button");
    const prevButton = document.querySelector(".prev-button");
  
    if (!carousel || !cards.length) return;
  
    let currentIndex = 0;
  
    const cardWidth = cards[0].offsetWidth + 20;
    const maxIndex = cards.length - Math.floor(document.querySelector('.carousel-container').offsetWidth / cardWidth);
  
    const updateCarousel = () => {
      carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    };
  
    nextButton.addEventListener("click", () => {
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
      }
    });
  
    prevButton.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });
  
    window.addEventListener("resize", () => {
      const visibleCards = Math.floor(document.querySelector('.carousel-container').offsetWidth / cardWidth);
      currentIndex = Math.min(currentIndex, cards.length - visibleCards);
      updateCarousel();
    });
  });
  


  const cards = document.querySelectorAll(".projet-card");
  const overlays = document.querySelectorAll(".projet-overlay");
  
  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      overlays[index].classList.remove("hidden");
      document.body.classList.add("overlay-active"); 
    });
  });
  
  document.querySelectorAll(".close-overlay").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      overlays[index].classList.add("hidden");
      document.body.classList.remove("overlay-active"); 
    });
  });
  
  overlays.forEach((overlay, index) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.add("hidden");
        document.body.classList.remove("overlay-active");
      }
    });
  });
  

  