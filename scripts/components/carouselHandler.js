export const PREVIOUS = "previous";
export const NEXT = "next";
const ONE_SECOND = 1000;


export function carouselHandler() {
  // directions
  const previous = document.getElementsByClassName("carousel-control-prev")[0];
  const next = document.getElementsByClassName("carousel-control-next")[0];

  const handleCarouselClick = (direction) => {
    console.log(direction);
    const allItems = document.getElementsByClassName("carousel-item");

    let start, end, increment, className;
    if (direction === NEXT) {
      start = 0;
      end = allItems.length
      increment = 1
      className = "carousel-item-left"
    } else {
      start = allItems.length - 1;
      end = 0
      increment = -1
      className = "carousel-item-right"
    }

    console.log(start, end, increment);

    for (let i = start; direction === NEXT ? i < end : i >= end; i = i+increment) {
      console.log(i);
      const isActive = allItems[i].classList.contains("active");
      if (isActive) {
        allItems[i].classList.add(className);
        allItems[i + increment].classList.add("carousel-item-next", className);

        setTimeout(function () {
          allItems[i].classList.remove("active", className);
          allItems[i + increment].classList.remove("carousel-item-next", className);
          allItems[i + increment].classList.add("active");
        }, ONE_SECOND)
      }
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
