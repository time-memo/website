export const PREVIOUS = "previous";
export const NEXT = "next";
const INTERVAL = 500;

export const handleCarouselClick = (direction) => {
    const allItems = document.getElementsByClassName("carousel-item");
    const allIndicators = document.getElementsByClassName("carousel-indicator");

    let start;
    let increment;
    let last;
    let carouselClass;

    if (direction === NEXT) {
        start = 0;
        increment = 1;
        last = allItems.length - 1;
        carouselClass = 'carousel-item-left';
    } else {
        start = allItems.length - 1;
        increment = -1;
        last = 0;
        carouselClass = 'carousel-item-right';
    }
    handleMove(direction, allItems, allIndicators, start, last, increment, carouselClass);
};

const handleMove = (direction, allItems, allIndicators, start, last, increment, carouselClass) => {
    for (let i = start; direction === NEXT ? i < allItems.length : i >= 0; i = i + increment) {
        const next = i + increment;
        const isActive = allItems[i].classList.contains("active");
        // find active
        if (isActive) {
            // move current left
            allItems[i].classList.add(carouselClass);
            if (i === last) {
                // move first left if last
                setNextAndMove(allItems[start], direction);
            } else {
                // move next left
                setNextAndMove(allItems[next], direction);
            }

            setTimeout(function () {
                // remove moved out classes
                allItems[i].classList.remove("active", carouselClass);
                allIndicators[i].classList.remove("active");

                // add active classes
                if (i === last) {
                    removeMovingClasses(allItems[start], direction);
                    addActive([allItems[start], allIndicators[start]]);
                } else {
                    removeMovingClasses(allItems[next], direction);
                    addActive([allItems[next], allIndicators[next]]);
                }
            }, INTERVAL);
        }
    }
};


const setNextAndMove = (carouselItem, direction) => {
    let classDirection;
    let classOrientation;
    if (direction === NEXT) {
        classDirection = "carousel-item-next";
        classOrientation = "carousel-item-left";
    } else {
        classDirection = "carousel-item-prev";
        classOrientation = "carousel-item-right";
    }
    carouselItem.classList.add(classDirection);
    setTimeout(function () {
        carouselItem.classList.add(classOrientation);
    }, 0);
};

const addActive = (elements) => {
    elements.forEach(element => element.classList.add("active"));
};

const removeMovingClasses = (element, direction) => {
    if (direction === NEXT) {
        element.classList.remove("carousel-item-next", "carousel-item-left");
    } else {
        element.classList.remove("carousel-item-prev", "carousel-item-right");
    }
};

export function carouselHandler() {
    // directions
    const previous = document.getElementsByClassName("carousel-control-prev")[0];
    const next = document.getElementsByClassName("carousel-control-next")[0];

    previous.addEventListener("click", (event) => {
        event.preventDefault();
        handleCarouselClick(PREVIOUS);
    });

    next.addEventListener("click", (event) => {
        event.preventDefault();
        handleCarouselClick(NEXT);
    });
}