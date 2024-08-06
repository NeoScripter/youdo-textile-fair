$(document).ready(function() {
    const carouselInner = $('.carousel-inner');
    const carouselItems = $('.carousel-item');
    const totalItems = carouselItems.length;
    const itemWidth = carouselItems.outerWidth();

    // Clone the first and last items
    const firstItemClone = carouselItems.first().clone();
    const lastItemClone = carouselItems.last().clone();

    // Append and prepend clones
    carouselInner.append(firstItemClone);
    carouselInner.prepend(lastItemClone);

    let currentIndex = 1; // Start from the first actual item

    // Set initial position to the first actual item
    carouselInner.css('transform', `translateX(-${currentIndex * itemWidth + currentIndex * 16}px)`);

    function updateCarouselPosition() {
        carouselInner.css('transform', `translateX(-${currentIndex * itemWidth + currentIndex * 16}px)`);
        carouselInner.css('transition', 'transform 0.5s ease-in-out');
    }

    function moveToNext() {
        currentIndex++;
        updateCarouselPosition();
        if (currentIndex === totalItems + 1) {
            setTimeout(() => {
                carouselInner.css('transition', 'none');
                currentIndex = 1;
                updateCarouselPosition();
            }, 500);
        }
    }

    function moveToPrev() {
        currentIndex--;
        updateCarouselPosition();
        if (currentIndex === 0) {
            setTimeout(() => {
                carouselInner.css('transition', 'none');
                currentIndex = totalItems;
                updateCarouselPosition();
            }, 500);
        }
    }

    $('.carousel-button-right').click(moveToNext);
    $('.carousel-button-left').click(moveToPrev);
});