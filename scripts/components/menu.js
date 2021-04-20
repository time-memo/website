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
}
