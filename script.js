document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const carouselItems = document.querySelector('.carousel-items');
    const items = document.querySelectorAll('.carousel-item');
    const visibleItems = 3; // Nombre d'éléments visibles simultanément
    const totalItems = items.length;

    const maxScrolls = totalItems - visibleItems; // Nombre maximal de défilements autorisés
    let currentIndex = 0;

    // Fonction pour mettre à jour le carousel
    const updateCarousel = () => {
        // Décalage des éléments
        carouselItems.style.transform = `translateX(-${currentIndex * (100 / visibleItems)}%)`;

        // Désactiver les boutons si les limites sont atteintes
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= Math.min(maxScrolls, 6); // Limité à 6 scrolls maximum
    };

    // Bouton "précédent"
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex -= 1;
            updateCarousel();
        }
    });

    // Bouton "suivant"
    nextButton.addEventListener('click', () => {
        if (currentIndex < Math.min(maxScrolls, 6)) {
            currentIndex += 1;
            updateCarousel();
        }
    });

    // Initialisation
    updateCarousel();
});
