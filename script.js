function initUpperCarousel() {
    const carouselInner = $(".carousel-inner");
    const carouselItems = $(".carousel-item");
    const totalItems = carouselItems.length;
    const itemWidth = carouselItems.outerWidth();

    const firstItemClone = carouselItems.first().clone();
    const lastItemClone = carouselItems.last().clone();

    carouselInner.append(firstItemClone);
    carouselInner.prepend(lastItemClone);

    let currentIndex = 1;

    carouselInner.css("transform", `translateX(-${currentIndex * (itemWidth + currentIndex)}px)`);

    function updateCarousel() {
        carouselInner.css("transform", `translateX(-${currentIndex * (itemWidth + currentIndex)}px)`);
        carouselInner.css("transition", "transform 0.5s ease-in-out");
    }

    function nextSlide() {
        currentIndex++;
        updateCarousel();
        if (currentIndex === totalItems + 1) {
            setTimeout(() => {
                carouselInner.css("transition", "none");
                currentIndex = 1;
                updateCarousel();
            }, 500);
        }
    }

    function prevSlide() {
        currentIndex--;
        updateCarousel();
        if (currentIndex === 0) {
            setTimeout(() => {
                carouselInner.css("transition", "none");
                currentIndex = totalItems;
                updateCarousel();
            }, 500);
        }
    }

    $(".carousel-button-next").click(nextSlide);
    $(".carousel-button-prev").click(prevSlide);
}

function initBottomCarousel() {
    const carouselInner = $(".hits-carousel-inner");
    const carouselItems = $(".hits-carousel-item");
    const totalItems = carouselItems.length;
    const itemWidth = carouselItems.outerWidth();
    let currentIndex = 0;

    function visibleItems() {
        const wrapperWidth = carouselInner.outerWidth();
        return Math.floor(wrapperWidth / (itemWidth + 16)) - 1;
    }

    function updateCarousel() {
        carouselInner.css("transform", `translateX(-${currentIndex * (itemWidth + 16)}px)`);
        updateButtons();
    }

    function nextSlide() {
        if (currentIndex < totalItems - visibleItems() - 1) {
            currentIndex++;
            updateCarousel();
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }

    function updateButtons() {
        $(".hits-carousel-button-prev").attr("disabled", currentIndex === 0);
        $(".hits-carousel-button-next").attr("disabled", currentIndex === totalItems - visibleItems() - 1);
    }

    $(".hits-carousel-button-next").click(nextSlide);
    $(".hits-carousel-button-prev").click(prevSlide);

    updateButtons();
}

function initSearchPanel() {
    $('#openSearchPanel').click(function() {
        $('#searchPanel').addClass('search-panel-open');
    });

    $(document).click(function(event) {
        if (!$(event.target).closest('#searchPanel, #openSearchPanel').length) {
            $('#searchPanel').removeClass('search-panel-open');
        }
    });

    $('#searchPanel').click(function(event) {
        event.stopPropagation();
    });
}

$(document).ready(function () {
    initUpperCarousel();
    initBottomCarousel();
    initSearchPanel();

    $('#burgerMenu').click(function() {
        $('#sideMenu').addClass('menu-open');
    });

    $('#closeMenu').click(function() {
        $('#sideMenu').removeClass('menu-open');
    });
});
