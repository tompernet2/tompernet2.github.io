document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carouseImagesUnProjet");
    const images = document.querySelectorAll(".carouseImagesUnProjet img");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    
    let index = 0;
    
    const imageWidth = images[0].clientWidth + 30 * 2; // Largeur de l'image + marges
    
    nextButton.addEventListener("click", function () {
        if (index < images.length - 1) {
            index++;
            images.forEach(img => {
                img.style.transform = `translateX(-${index * imageWidth}px)`;
            });
        }
    });
    
    prevButton.addEventListener("click", function () {
        if (index > 0) {
            index--;
            images.forEach(img => {
                img.style.transform = `translateX(-${index * imageWidth}px)`;
            });
        }
    });
    
    // Ajoute une transition pour un effet fluide
    images.forEach(img => {
        img.style.transition = "transform 0.5s ease-in-out";
    });
});