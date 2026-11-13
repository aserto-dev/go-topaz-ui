// Sidebar navigation targets #content, so HTMX leaves the sidebar mounted while
// must keep here unfortunately.
// It means keeping the sidebar highlight in sync after HTMX replaces only the page content.
// Example:
// 1. You are on Directory → Model.
// 2. You click Directory → Relations.
// 3. HTMX replaces only #content.
// 4. The sidebar is not re-rendered, so it still has Model marked active.
const activateMenuPath = (selectedPath) => {
	document.querySelectorAll(".menu-item").forEach((menuItem) => {
		menuItem.classList.toggle("active", menuItem.getAttribute("hx-get") === selectedPath);
	});
};
document.body.addEventListener("click", (event) => {
	const openObjectsDialog = event.target.closest("[data-open-objects-dialog]");
	if (openObjectsDialog) {
		event.preventDefault();
		document.querySelector(openObjectsDialog.dataset.dialog)?.showModal();
		return;
	}

	const closeObjectsDialog = event.target.closest("[data-close-objects-dialog]");
	if (closeObjectsDialog) {
		closeObjectsDialog.closest("dialog")?.close();
		return;
	}

	const objectsDialog = event.target.closest("dialog[id^=\"objects-\"]");
	if (objectsDialog && event.target === objectsDialog) {
		objectsDialog.close();
		return;
	}

	const openDeleteDirectory = event.target.closest("[data-open-delete-directory]");
	if (openDeleteDirectory) {
		document.querySelector(openDeleteDirectory.dataset.dialog)?.showModal();
		return;
	}

	const closeDeleteDirectory = event.target.closest("[data-close-delete-directory]");
	if (closeDeleteDirectory) {
		closeDeleteDirectory.closest("dialog")?.close();
		return;
	}

	const deleteDirectoryDialog = event.target.closest("[data-delete-directory-dialog]");
	if (deleteDirectoryDialog && event.target === deleteDirectoryDialog) {
		deleteDirectoryDialog.close();
		return;
	}

	const appSwitch = event.target.closest(".app-switch[hx-get]");
	if (appSwitch) {
		document.querySelectorAll(".app-switch").forEach((switchButton) => {
			switchButton.classList.toggle("active", switchButton === appSwitch);
		});
	}

	const item = event.target.closest(".menu-item[hx-get]");
	if (!item) {
		return;
	}

	const selectedPath = item.getAttribute("hx-get");
	activateMenuPath(selectedPath);

});
