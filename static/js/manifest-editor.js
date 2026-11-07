(function () {
	"use strict";

	var editor;
	var editorContainer;
	var initialValue = "";
	var yamlLanguageConfigured = false;
	var yamlThemeDefined = false;
	var yamlLanguageID = "planbee-yaml";

	function configureYAMLEditor(monaco, yaml) {
		if (!yamlLanguageConfigured) {
			if (!monaco.languages.getLanguages().some(function (language) {
				return language.id === yamlLanguageID;
			})) {
				monaco.languages.register({ id: yamlLanguageID, extensions: [".yaml", ".yml"], aliases: ["Planbee YAML"] });
			}
			monaco.languages.setLanguageConfiguration(yamlLanguageID, yaml.conf);
			monaco.languages.setMonarchTokensProvider(yamlLanguageID, yaml.language);
			yamlLanguageConfigured = true;
		}

		if (!yamlThemeDefined) {
			var lightTheme = document.documentElement.dataset.theme === "light";
			monaco.editor.defineTheme("planbee-yaml", {
				base: lightTheme ? "vs" : "vs-dark",
				inherit: true,
				rules: [
					{ token: "type", foreground: "00BFFF" },
					{ token: "type.yaml", foreground: "00BFFF" },
					{ token: "string", foreground: "57E36F" },
					{ token: "string.yaml", foreground: "57E36F" },
					{ token: "number", foreground: "F59E0B" },
					{ token: "number.yaml", foreground: "F59E0B" },
					{ token: "keyword", foreground: "D8A7FF" },
					{ token: "keyword.yaml", foreground: "D8A7FF" },
					{ token: "comment", foreground: "A8B3BD", fontStyle: "italic" },
					{ token: "comment.yaml", foreground: "A8B3BD", fontStyle: "italic" },
					{ token: "operators", foreground: "C7D0D9" },
					{ token: "operators.yaml", foreground: "C7D0D9" },
					{ token: "delimiter", foreground: "C7D0D9" },
					{ token: "delimiter.yaml", foreground: "C7D0D9" },
					{ token: "tag", foreground: "8CC8FF" },
					{ token: "tag.yaml", foreground: "8CC8FF" },
					{ token: "namespace", foreground: "F0A6CA" }
				],
				colors: {
					"editor.background": lightTheme ? "#FFFFFF" : "#121212",
					"editor.foreground": lightTheme ? "#20252B" : "#E7E7E7",
					"editorLineNumber.foreground": lightTheme ? "#7A8490" : "#8A8F98",
					"editorLineNumber.activeForeground": lightTheme ? "#20252B" : "#E7E7E7",
					"editorIndentGuide.background": lightTheme ? "#D7DDE4" : "#414141",
					"editorIndentGuide.activeBackground": lightTheme ? "#B8C1CB" : "#5B5B5B",
					"editorCursor.foreground": lightTheme ? "#20252B" : "#E7E7E7",
					"editor.selectionBackground": lightTheme ? "#BBD7F2" : "#264F78"
				}
			});
			yamlThemeDefined = true;
		}

		monaco.editor.setTheme("planbee-yaml");
	}

	function setResizeHandleVisibility(editing) {
		var handle = document.querySelector("[data-model-resize-handle]");
		if (handle) {
			handle.hidden = !editing;
		}
	}

	function resizeManifestPanel(event) {
		var layout = document.querySelector(".model-detail-layout.model-editing");
		if (!layout) {
			return;
		}

		var bounds = layout.getBoundingClientRect();
		var styles = getComputedStyle(layout);
		var minimumGraphWidth = parseFloat(styles.getPropertyValue("--model-graph-min-width"));
		var minimumEditorWidth = parseFloat(styles.getPropertyValue("--model-editor-min-width"));
		var resizeGutterWidth = parseFloat(styles.getPropertyValue("--model-resize-gutter-width"));
		var editorWidth = Math.min(
			Math.max(minimumEditorWidth, bounds.right - event.clientX),
			bounds.width - minimumGraphWidth - resizeGutterWidth
		);

		layout.style.setProperty("--manifest-editor-width", editorWidth + "px");
		if (editor) {
			editor.layout();
		}
	}

	function initializeResizeHandle() {
		var handle = document.querySelector("[data-model-resize-handle]");
		if (!handle || handle.dataset.resizeInitialized === "true") {
			return;
		}

		handle.dataset.resizeInitialized = "true";
		handle.addEventListener("pointerdown", function (event) {
			if (handle.hidden || event.button !== 0) {
				return;
			}

			var layout = document.querySelector(".model-detail-layout.model-editing");
			if (!layout) {
				return;
			}

			handle.setPointerCapture(event.pointerId);
			layout.classList.add("is-resizing");
			handle.addEventListener("pointermove", resizeManifestPanel);
		});

		handle.addEventListener("pointerup", function (event) {
			var layout = document.querySelector(".model-detail-layout.model-editing");
			if (layout) {
				layout.classList.remove("is-resizing");
			}
			handle.removeEventListener("pointermove", resizeManifestPanel);
			if (handle.hasPointerCapture(event.pointerId)) {
				handle.releasePointerCapture(event.pointerId);
			}
		});

		handle.addEventListener("keydown", function (event) {
			var layout = document.querySelector(".model-detail-layout.model-editing");
			if (!layout || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) {
				return;
			}

			event.preventDefault();
			var bounds = layout.getBoundingClientRect();
			var currentWidth = bounds.right - layout.querySelector(".model-manifest-panel").getBoundingClientRect().left;
			var nextWidth = currentWidth + (event.key === "ArrowLeft" ? 16 : -16);
			resizeManifestPanel({ clientX: bounds.right - nextWidth });
		});
	}

	function setEditing(editing) {
		var form = document.querySelector("[data-manifest-editor-form]");
		var startButton = document.querySelector("[data-manifest-start-edit]");
		var actions = document.querySelector("[data-manifest-editor-actions]");

		if (form) {
			form.dataset.manifestEditing = editing ? "true" : "false";
		}
		if (startButton) {
			startButton.hidden = editing;
		}
		if (actions) {
			actions.hidden = !editing;
		}
		setResizeHandleVisibility(editing);
		if (editor) {
			editor.updateOptions({ readOnly: !editing });
		}
	}

	function openEditor() {
		var form = document.querySelector("[data-manifest-editor-form]");
		var source = document.getElementById("manifest-source");
		var panel = document.querySelector(".model-manifest-panel");
		var layout = document.querySelector(".model-detail-layout");

		if (!form) {
			return;
		}
		if (source) {
			initialValue = source.value;
		}

		form.hidden = false;
		if (panel) {
			panel.hidden = false;
		}
		if (layout) {
			layout.classList.add("model-editing");
		}
		setEditing(true);

		if (editor) {
			editor.layout();
			editor.focus();
		} else {
			document.getElementById("manifest-source").focus();
		}
	}

	function closeEditor() {
		var form = document.querySelector("[data-manifest-editor-form]");
		var panel = document.querySelector(".model-manifest-panel");
		var layout = document.querySelector(".model-detail-layout");

		if (!form) {
			return;
		}

		if (editor) {
			editor.setValue(initialValue);
		} else {
			document.getElementById("manifest-source").value = initialValue;
		}
		form.hidden = false;
		if (panel) {
			panel.hidden = true;
		}
		if (layout) {
			layout.classList.remove("model-editing");
		}
		setEditing(false);
	}

	function initManifestEditor() {
		var container = document.getElementById("manifest-editor");
		var source = document.getElementById("manifest-source");
		var form = document.getElementById("manifest-form");

		if (!container || !source || !form) {
			return;
		}

		initialValue = source.value;
		var editing = form.dataset.manifestEditing === "true";
		setEditing(editing);

		if (!window.require) {
			return;
		}
		if (container.dataset.monacoLoading === "true" || container.dataset.monacoInitialized === "true") {
			return;
		}
		container.dataset.monacoLoading = "true";

		window.require.config({
			paths: {
				vs: "/static/vendor/monaco/min/vs"
			}
		});

		window.require(["vs/editor/editor.main"], function (monaco) {
			window.require(["vs/basic-languages/yaml/yaml"], function (yaml) {
			if (!container.isConnected || document.getElementById("manifest-editor") !== container) {
				return;
			}
			if (editor && editorContainer !== container) {
				editor.dispose();
				editor = null;
			}
			if (editor) {
				return;
			}
			container.replaceChildren();
			configureYAMLEditor(monaco, yaml);

			editor = monaco.editor.create(container, {
				value: source.value,
				language: yamlLanguageID,
				readOnly: !editing,
				automaticLayout: true,
				minimap: { enabled: false },
				scrollBeyondLastLine: false,
				scrollbar: { vertical: "visible", horizontal: "auto" },
				theme: "planbee-yaml"
			});
			monaco.editor.setModelLanguage(editor.getModel(), yamlLanguageID);
			editorContainer = container;
			container.dataset.monacoInitialized = "true";
			delete container.dataset.monacoLoading;

			source.hidden = true;
			editor.onDidChangeModelContent(function () {
				source.value = editor.getValue();
			});
			form.addEventListener("submit", syncSource);
			}, function () {
				delete container.dataset.monacoLoading;
				console.error("Unable to load the Monaco YAML language");
			});
		}, function () {
			delete container.dataset.monacoLoading;
			console.error("Unable to load the Monaco editor");
		});
	}

	function syncSource(event) {
		if (editor) {
			document.getElementById("manifest-source").value = editor.getValue();
		}

		if (event) {
			event.currentTarget.removeEventListener("submit", syncSource);
		}
	}

	function initialize() {
		initManifestEditor();
		initializeResizeHandle();
		document.addEventListener("click", function (event) {
		var startButton = event.target.closest("[data-manifest-start-edit]");
		if (startButton) {
			openEditor();
			return;
		}

		var cancelButton = event.target.closest("[data-manifest-cancel]");
		if (cancelButton) {
			closeEditor();
		}
		});
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", initialize, { once: true });
	} else {
		initialize();
	}
	document.body.addEventListener("htmx:after:swap", function () {
		initManifestEditor();
		initializeResizeHandle();
	});
	document.body.addEventListener("htmx:config:request", function (event) {
		var context = event.detail.ctx;
		if (!context?.sourceElement?.matches("[data-model-refresh]")) {
			return;
		}

		var form = document.querySelector("[data-manifest-editor-form]");
		if (form?.dataset.manifestEditing === "true") {
			var action = new URL(context.request.action, document.baseURI);
			action.searchParams.set("edit", "1");
			context.request.action = action.pathname + action.search;
		}
	});
}());
