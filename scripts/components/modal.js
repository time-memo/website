//@flow

const closeButtonId = 'modal-close-button';
const modalId = 'modal';

function transformResponseToText(response) {
	return response.text();
}

function openModal(title: string, body: string) {
	const closeButtonHtml = `
		<button id="${closeButtonId}" type="button" class="close" data-dismiss="modal" aria-label="Close">
	    <span aria-hidden="true">&times;</span>
	  </button>
	`;

	const modalHtml = `
		<div class="modal" tabindex="-1" role="dialog" style="display: block;">
		  <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h4 class="modal-title">${title}</h4>
		        ${closeButtonHtml}
		      </div>
		      <div class="modal-body">${body}</div>
	      </div>
		  </div>
	  </div>
	`;

	const element = document.createElement('div');
	element.innerHTML = modalHtml;
	element.id = modalId;

	document.body.appendChild(element);
	document.body.classList.add('modal-open');

	registerCloseModalListener();
}

function registerCloseModalListener() {
	const closeButtonElement = document.getElementById(closeButtonId);

	closeButtonElement.addEventListener("click", clickCloseModalHandler);
}

function parseContentForModal(content) {
	const parser = new DOMParser();

	const html = parser.parseFromString(content, "text/html");
	const pageTitle = html.getElementById('page-title');
	const pageBody = html.getElementById('page-body');

	openModal(pageTitle.textContent, pageBody.innerHTML);
}

function clickCloseModalHandler(event: Event) {
	event.preventDefault();

	document.body.classList.remove('modal-open');
	const modalElement = document.getElementById(modalId);

	modalElement.remove();
}

function clickOpenModalHandler(event: Event) {
	event.preventDefault();

	const url = event.target.href;

	fetch(url).then(transformResponseToText).then(parseContentForModal);
}

export function modal(buttonElementName: string): void {
	const buttonElements = document.getElementsByClassName(buttonElementName);

	for (let buttonElement of buttonElements) {
		buttonElement.addEventListener("click", clickOpenModalHandler);
	}
}
