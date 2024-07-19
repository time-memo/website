export function menuToggle() {
	const togglerElement = document.getElementById("main-menu-toggler");
	const menuElement = document.getElementById("main-menu");
	const menuItems = document.querySelectorAll("#main-menu a");

	if (!togglerElement || !menuElement) {
		return;
	}

	const clickHandler = function (event) {

		event.preventDefault();
		if (menuElement.classList.contains("show")) {
			menuElement.classList.remove("show");
		} else {
			menuElement.classList.add("show");
		}
	};

	const menuCloseHandler = function () {
		menuElement.classList.remove("show");
	};


	togglerElement.addEventListener("click", clickHandler);

	for (const menuItemElement of menuItems) {
		menuItemElement.addEventListener("click", menuCloseHandler);
	}
}
