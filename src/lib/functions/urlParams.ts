function getParams() {
	const queryString = window.location.search;
	return new URLSearchParams(queryString);
}

export const getParam = (param) => {
	const urlParams = getParams();
	return urlParams.get(param);
};

export const setParam = (values: Record<string, string>) => {
	const url = new URL(window.location.toString());
	for (const [k, v] of Object.entries(values)) {
		if (v) {
			url.searchParams.set(encodeURIComponent(k), encodeURIComponent(v));
		} else {
			url.searchParams.delete(k);
		}
	}
	history.replaceState({}, '', url);
};

export const isParamSet = (param) => {
	const urlParams = getParams();
	return urlParams.has(param);
};
