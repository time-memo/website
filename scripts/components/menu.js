export function menuToggle() {
	let togglerElement = document.getElementById("main-menu-toggler");
	let menuElement = document.getElementById("main-menu");
	let clickHandler = function (event) {
		event.preventDefault();

		if (menuElement.classList.contains("show")) {
			menuElement.classList.remove("show");
		} else {
			menuElement.classList.add("show");
		}
	};

	togglerElement.addEventListener("click", clickHandler);

	let menuItemElement1 = document.getElementById("menu-1");
	let menuItemElement2 = document.getElementById("menu-2");
	let menuItemElement3 = document.getElementById("menu-3");
	let menuCloseHandler = function () {
		menuElement.classList.remove("show");
	};

	menuItemElement1.addEventListener("click", menuCloseHandler);
	menuItemElement2.addEventListener("click", menuCloseHandler);
	menuItemElement3.addEventListener("click", menuCloseHandler);
}
