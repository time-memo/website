var togglerElement = document.getElementById("main-menu-toggler");
var menuElement = document.getElementById("main-menu");
var clickHandler = function (event) {
    event.preventDefault();

    if (menuElement.classList.contains("show")) {
        menuElement.classList.remove("show");
    } else {
        menuElement.classList.add("show");
    }
};

togglerElement.addEventListener("click", clickHandler);