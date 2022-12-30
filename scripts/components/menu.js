export function menuToggle() {
	let togglerElement = document.getElementById("main-menu-toggler");
	let menuElement = document.getElementById("main-menu");
	let menuItems = document.querySelectorAll("#main-menu a");

	let clickHandler = function (event) {
		event.preventDefault();

		if (menuElement.classList.contains("show")) {
			menuElement.classList.remove("show");
		} else {
			menuElement.classList.add("show");
		}
	};

	let menuCloseHandler = function () {
		menuElement.classList.remove("show");
	};

	togglerElement.addEventListener("click", clickHandler);

	for(let menuItemElement of menuItems){
		menuItemElement.addEventListener("click", menuCloseHandler);
	}
}
