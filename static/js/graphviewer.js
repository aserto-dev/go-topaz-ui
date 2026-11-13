(() => {
	const minScale = 0.25;
	const maxScale = 4;
	const zoomStep = 1.2;
	const states = new WeakMap();
	const viewportStates = new Map();

	const clamp = (value) => Math.min(maxScale, Math.max(minScale, value));

	const svgPoint = (svg, clientX, clientY) => {
		const point = svg.createSVGPoint();
		point.x = clientX;
		point.y = clientY;
		return point.matrixTransform(svg.getScreenCTM().inverse());
	};

	const setTransform = (state) => {
		state.viewport.setAttribute("transform", `translate(${state.tx} ${state.ty}) scale(${state.scale})`);
	};

	const reveal = (state) => {
		state.root.classList.remove("graph-viewer-pending");
	};

	const clearHighlight = (state) => {
		state.root.classList.remove("is-highlighting");
		state.root.querySelectorAll(".is-highlighted").forEach((element) => {
			element.classList.remove("is-highlighted");
		});
	};

	const highlight = (state, node) => {
		if (!node) {
			clearHighlight(state);
			return;
		}

		const activeNodes = new Set(node.dataset.highlightNodes.split(" ").filter(Boolean));
		state.root.classList.add("is-highlighting");
		state.nodes.forEach((item) => item.classList.toggle("is-highlighted", activeNodes.has(item.dataset.node)));
		state.edges.forEach((edge) => {
			const active = activeNodes.has(edge.dataset.from) && activeNodes.has(edge.dataset.to);
			edge.classList.toggle("is-highlighted", active);
		});
	};

	const fit = (state) => {
		const bounds = state.content.getBBox();
		const viewBox = state.svg.viewBox.baseVal;
		const svgBounds = state.svg.getBoundingClientRect();
		if (!bounds.width || !bounds.height || !viewBox.width || !viewBox.height || !svgBounds.width || !svgBounds.height) {
			return false;
		}

		const padding = 48;
		const unitPerPixel = Math.max(
			viewBox.width / svgBounds.width,
			viewBox.height / svgBounds.height,
		);
		const visibleWidth = state.canvas.clientWidth * unitPerPixel;
		const visibleHeight = state.canvas.clientHeight * unitPerPixel;
		const visibleX = viewBox.x + state.canvas.scrollLeft * unitPerPixel;
		const visibleY = viewBox.y + state.canvas.scrollTop * unitPerPixel;
		const scale = clamp(Math.min(
			(visibleWidth - padding * 2) / bounds.width,
			(visibleHeight - padding * 2) / bounds.height,
		));
		state.scale = scale;
		state.tx = visibleX + (visibleWidth - bounds.width * scale) / 2 - bounds.x * scale;
		state.ty = visibleY + (visibleHeight - bounds.height * scale) / 2 - bounds.y * scale;
		state.fitOnResize = true;
		setTransform(state);
		reveal(state);

		return true;
	};

	const graphIsVisible = (state) => {
		const bounds = state.content.getBBox();
		const viewBox = state.svg.viewBox.baseVal;
		const svgBounds = state.svg.getBoundingClientRect();
		if (!bounds.width || !bounds.height || !viewBox.width || !viewBox.height || !svgBounds.width || !svgBounds.height) {
			return false;
		}

		const unitPerPixel = Math.max(
			viewBox.width / svgBounds.width,
			viewBox.height / svgBounds.height,
		);
		const visibleX = viewBox.x + state.canvas.scrollLeft * unitPerPixel;
		const visibleY = viewBox.y + state.canvas.scrollTop * unitPerPixel;
		const visibleWidth = state.canvas.clientWidth * unitPerPixel;
		const visibleHeight = state.canvas.clientHeight * unitPerPixel;
		const left = bounds.x * state.scale + state.tx;
		const top = bounds.y * state.scale + state.ty;
		const right = (bounds.x + bounds.width) * state.scale + state.tx;
		const bottom = (bounds.y + bounds.height) * state.scale + state.ty;

		return right >= visibleX && left <= visibleX + visibleWidth &&
			bottom >= visibleY && top <= visibleY + visibleHeight;
	};

	const zoom = (state, factor, clientX, clientY) => {
		const before = svgPoint(state.svg, clientX, clientY);
		const nextScale = clamp(state.scale * factor);
		if (nextScale === state.scale) {
			return;
		}

		state.tx = before.x - (before.x - state.tx) * nextScale / state.scale;
		state.ty = before.y - (before.y - state.ty) * nextScale / state.scale;
		state.scale = nextScale;
		state.fitOnResize = false;
		setTransform(state);
	};

	const init = (root) => {
		if (root.dataset.graphViewerReady === "true") {
			return;
		}

		const svg = root.querySelector(".graph-viewer-svg");
		const canvas = root.querySelector(".graph-viewer-canvas");
		const viewport = root.querySelector("#graph-viewer-viewport");
		const content = root.querySelector("#graph-viewer-content");
		if (!svg || !canvas || !viewport || !content) {
			return;
		}

		const state = {
			root,
			key: root.dataset.graphKey || root.id || "default",
			svg,
			canvas,
			viewport,
			content,
			nodes: [...root.querySelectorAll("[data-node]")],
			edges: [...root.querySelectorAll("[data-from][data-to]")],
			scale: 1,
			tx: 0,
			ty: 0,
			fitOnResize: true,
			drag: null,
			selected: null,
			resizeObserver: null,
		};
		states.set(root, state);
		root.dataset.graphViewerReady = "true";

		const saved = viewportStates.get(state.key);
		if (saved) {
			state.scale = clamp(saved.scale);
			state.tx = saved.tx;
			state.ty = saved.ty;
			state.fitOnResize = false;
			viewportStates.delete(state.key);
			setTransform(state);
		} else {
			setTransform(state);
		}

		root.addEventListener("pointerover", (event) => {
			if (state.selected) {
				return;
			}
			const node = event.target.closest?.("[data-node]");
			if (node && root.contains(node)) {
				highlight(state, node);
			}
		});
		root.addEventListener("pointerout", (event) => {
			if (!state.selected && event.target.closest?.("[data-node]") &&
				(!event.relatedTarget || !event.relatedTarget.closest?.("[data-node]"))) {
				clearHighlight(state);
			}
		});
		root.addEventListener("click", (event) => {
			const node = event.target.closest?.("[data-node]");
			if (node && root.contains(node)) {
				state.selected = node;
				highlight(state, node);
				return;
			}
			if (!event.target.closest?.("button") && !state.drag) {
				state.selected = null;
				clearHighlight(state);
			}
		});
		root.addEventListener("pointerdown", (event) => {
			if (event.button !== 0 || event.target.closest?.("[data-node], button")) {
				return;
			}
			state.drag = { pointerID: event.pointerId, point: svgPoint(svg, event.clientX, event.clientY) };
			root.classList.add("is-panning");
			svg.setPointerCapture(event.pointerId);
		});
		root.addEventListener("pointermove", (event) => {
			if (!state.drag || state.drag.pointerID !== event.pointerId) {
				return;
			}
			const point = svgPoint(svg, event.clientX, event.clientY);
			state.tx += point.x - state.drag.point.x;
			state.ty += point.y - state.drag.point.y;
			state.drag.point = point;
			state.fitOnResize = false;
			setTransform(state);
		});
		const stopDrag = (event) => {
			if (!state.drag || state.drag.pointerID !== event.pointerId) {
				return;
			}
			state.drag = null;
			root.classList.remove("is-panning");
			if (svg.hasPointerCapture(event.pointerId)) {
				svg.releasePointerCapture(event.pointerId);
			}
		};
		root.addEventListener("pointerup", stopDrag);
		root.addEventListener("pointercancel", stopDrag);
		root.addEventListener("wheel", (event) => {
			event.preventDefault();
			zoom(state, event.deltaY < 0 ? zoomStep : 1 / zoomStep, event.clientX, event.clientY);
		}, { passive: false });
		root.addEventListener("click", (event) => {
			const button = event.target.closest?.("[data-graph-action]");
			if (!button) {
				return;
			}
			if (button.dataset.graphAction === "fit") {
				fit(state);
			} else {
				const rect = svg.getBoundingClientRect();
				zoom(state, button.dataset.graphAction === "zoom-in" ? zoomStep : 1 / zoomStep, rect.left + rect.width / 2, rect.top + rect.height / 2);
			}
		});

		window.requestAnimationFrame(() => {
			if (saved && graphIsVisible(state)) {
				reveal(state);
				return;
			}
			fit(state);
		});
		if (window.ResizeObserver) {
			state.resizeObserver = new ResizeObserver(() => {
				if (state.fitOnResize) {
					fit(state);
				}
			});
			state.resizeObserver.observe(canvas);
		}
	};

	const captureRoot = (root) => {
		const state = states.get(root);
		if (!state) {
			return;
		}
		viewportStates.set(state.key, { scale: state.scale, tx: state.tx, ty: state.ty });
		clearHighlight(state);
		state.selected = null;
		state.drag = null;
		root.classList.remove("is-panning");
		if (state.resizeObserver) {
			state.resizeObserver.disconnect();
			state.resizeObserver = null;
		}
	};

	const captureForTarget = (target) => {
		const roots = [];
		if (target.matches?.(".graph-viewer")) {
			roots.push(target);
		}
		target.querySelectorAll?.(".graph-viewer").forEach((root) => roots.push(root));
		roots.forEach(captureRoot);
	};

	const initAll = () => document.querySelectorAll(".graph-viewer").forEach(init);
	initAll();
	document.body.addEventListener("htmx:before:swap", (event) => {
		if (event.detail?.target) {
			captureForTarget(event.detail.target);
		}
	});
	document.body.addEventListener("htmx:after:settle", initAll);
})();
