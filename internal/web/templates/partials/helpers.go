package partials

func ActiveClass(base string, active bool) string {
	if active {
		return base + " active"
	}

	return base
}

func IsObjectsPage(active string) bool {
	return active == "objects"
}
