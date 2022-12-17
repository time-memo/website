export const PREVIOUS = "previous";
export const NEXT = "next";
const INTERVAL = 500;


export function carouselHandler() {
  // directions
  const previous = document.getElementsByClassName("carousel-control-prev")[0];
  const next = document.getElementsByClassName("carousel-control-next")[0];

  const handleCarouselClick = (direction) => {
    const allItems = document.getElementsByClassName("carousel-item");
    const last = allItems.length - 1;

    if (direction === NEXT) {
      for (let i = 0; i < allItems.length; i = i + 1) {
        const isActive = allItems[i].classList.contains("active");
        if (isActive) {
          allItems[i].classList.add("carousel-item-left");
          if (i === last) {
            allItems[0].classList.add("carousel-item-next");
            setTimeout(function () {
              allItems[0].classList.add("carousel-item-left");
            }, 0);
          } else {
            allItems[i + 1].classList.add("carousel-item-next");
            setTimeout(function () {
              allItems[i + 1].classList.add("carousel-item-left");
            }, 0);
          }

          setTimeout(function () {
            allItems[i].classList.remove("active", "carousel-item-left");

            if (i === last) {
              allItems[0].classList.remove("carousel-item-next", "carousel-item-left");
              allItems[0].classList.add("active");
            } else {
              allItems[i + 1].classList.remove("carousel-item-next", "carousel-item-left");
              allItems[i + 1].classList.add("active");
            }
          }, INTERVAL);
        }
      }
    } else {
      for (let i = last; i >= 0; i = i - 1) {
        const isActive = allItems[i].classList.contains("active");
        if (isActive) {
          allItems[i].classList.add("carousel-item-right");

          if (i === 0) {
            allItems[last].classList.add("carousel-item-prev");
            setTimeout(function () {
              allItems[last].classList.add("carousel-item-right");
            }, 0);
          } else {
            allItems[i - 1].classList.add("carousel-item-prev");
            setTimeout(function () {
              allItems[i - 1].classList.add("carousel-item-right");
            }, 0);
          }

          setTimeout(function () {
            allItems[i].classList.remove("active", "carousel-item-right");

            if (i === 0) {
              allItems[last].classList.remove("carousel-item-prev", "carousel-item-right");
              allItems[last].classList.add("active");
            } else {
              allItems[i - 1].classList.remove("carousel-item-prev", "carousel-item-right");
              allItems[i - 1].classList.add("active");
            }
          }, INTERVAL);
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