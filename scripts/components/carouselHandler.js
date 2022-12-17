export const PREVIOUS = "previous";
export const NEXT = "next";
const ONE_SECOND = 1000;


export function carouselHandler() {
  // directions
  const previous = document.getElementsByClassName("carousel-control-prev")[0];
  const next = document.getElementsByClassName("carousel-control-next")[0];

  const handleCarouselClick = (direction) => {
    const allItems = document.getElementsByClassName("carousel-item");

    if (direction === NEXT) {
      for (let i = 0; i < allItems.length; i = i + 1) {
        const isActive = allItems[i].classList.contains("active");
        if (isActive) {
          allItems[i].classList.add("carousel-item-left");
          allItems[i + 1].classList.add("carousel-item-next", "carousel-item-left");

          setTimeout(function () {
            allItems[i].classList.remove("active", "carousel-item-left");
            allItems[i + 1].classList.remove("carousel-item-next", "carousel-item-left");
            allItems[i + 1].classList.add("active");
          }, ONE_SECOND);
        }
      }
    } else {
      for (let i = allItems.length - 1; i >= 0; i = i - 1) {
        const isActive = allItems[i].classList.contains("active");
        if (isActive) {
          allItems[i].classList.add("carousel-item-right");
          allItems[i - 1].classList.add("carousel-item-prev", "carousel-item-right");

          setTimeout(function () {
            allItems[i].classList.remove("active", "carousel-item-right");
            allItems[i - 1].classList.remove("carousel-item-prev", "carousel-item-right");
            allItems[i - 1].classList.add("active");
          }, ONE_SECOND);
        }
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