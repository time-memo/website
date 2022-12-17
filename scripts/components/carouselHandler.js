export const PREVIOUS = "previous";
export const NEXT = "next";
const INTERVAL = 500;


export function carouselHandler() {
  // directions
  const previous = document.getElementsByClassName("carousel-control-prev")[0];
  const next = document.getElementsByClassName("carousel-control-next")[0];

  const handleCarouselClick = (direction) => {
    const allItems = document.getElementsByClassName("carousel-item");
    const allIndicators = document.getElementsByClassName("carousel-indicator");
    const last = allItems.length - 1;

    if (direction === NEXT) {
      for (let i = 0; i < allItems.length; i = i + 1) {
        const next = i + 1;
        const isActive = allItems[i].classList.contains("active");
        // find active
        if (isActive) {
          // move current left
          allItems[i].classList.add("carousel-item-left");
          if (i === last) {
            // move first left if last
            setNextAndMove(allItems[0], NEXT);
          } else {
            // move next left
            setNextAndMove(allItems[next], NEXT);
          }

          setTimeout(function () {
            // remove moved out classes
            allItems[i].classList.remove("active", "carousel-item-left");
            allIndicators[i].classList.remove("active");

            // add active classes
            if (i === last) {
              removeMovingClasses(allItems[0], NEXT);
              addActive([ allItems[0], allIndicators[0] ]);
            } else {
              removeMovingClasses(allItems[next], NEXT);
              addActive([ allItems[next], allIndicators[next] ]);
            }
          }, INTERVAL);
        }
      }
    } else {
      for (let i = last; i >= 0; i = i - 1) {
        const previous = i - 1
        const isActive = allItems[i].classList.contains("active");
        if (isActive) {
          allItems[i].classList.add("carousel-item-right");

          if (i === 0) {
            setNextAndMove(allItems[last], PREVIOUS)
          } else {
            setNextAndMove(allItems[previous], PREVIOUS)
          }

          setTimeout(function () {
            allItems[i].classList.remove("active", "carousel-item-right");
            allIndicators[i].classList.remove("active");
            if (i === 0) {
              removeMovingClasses(allItems[last], PREVIOUS)
              addActive([allItems[last], allIndicators[last]])
            } else {
              removeMovingClasses(allItems[previous], PREVIOUS)
              addActive([allItems[previous], allIndicators[previous]])
            }
          }, INTERVAL);
        }
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

  function removeMovingClasses (element, direction) {
    if (direction === NEXT) {
      element.classList.remove("carousel-item-next", "carousel-item-left");
    } else {
      element.classList.remove("carousel-item-prev", "carousel-item-right");
    }
  };

  previous.addEventListener("click", (event) => {
    event.preventDefault();
    handleCarouselClick(PREVIOUS);
  });

  next.addEventListener("click", (event) => {
    event.preventDefault();
    handleCarouselClick(NEXT);
  });
}