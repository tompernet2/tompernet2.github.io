document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carouseImagesUnProjet");
    const images = document.querySelectorAll(".carouseImagesUnProjet img");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    
    let index = 0;
    
    const imageWidth = images[0].clientWidth + 30 * 2; 
    
    const updateBtn = () => {
        prevButton.disabled = index === 0;
        nextButton.disabled = index === images.length - 1;
    };

    nextButton.addEventListener("click", function () {
        if (index < images.length - 1) {
            index++;
            images.forEach(img => {
                img.style.transform = `translateX(-${index * imageWidth}px)`;
            });
            updateBtn();
        }
    });

    prevButton.addEventListener("click", function () {
        if (index > 0) {
            index--;
            images.forEach(img => {
                img.style.transform = `translateX(-${index * imageWidth}px)`;
            });
            updateBtn();
        }
    });

    images.forEach(img => {
        img.style.transition = "transform 0.5s ease-in-out";
    });

    updateBtn();
});
