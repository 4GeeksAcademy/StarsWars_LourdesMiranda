import { ACTION_TYPES } from "../store";

const API_BASE_URL = (
	import.meta.env.VITE_API_URL || "https://www.swapi.tech/api"
).replace(/\/$/, "");

export const RESOURCE_CONFIG = {
	people: {
		label: "Characters",
		imagePath: "characters",
		cardFields: ["gender", "hair_color", "eye_color"]
	},
	films: {
		label: "Films",
		imagePath: "films",
		cardFields: ["director", "release_date", "episode_id"]
	},
	planets: {
		label: "Planets",
		imagePath: "planets",
		cardFields: ["climate", "terrain", "population"]
	},
	vehicles: {
		label: "Vehicles",
		imagePath: "vehicles",
		cardFields: ["model", "manufacturer", "cost_in_credits"]
	}
};

const DETAIL_FIELDS_TO_HIDE = new Set(["created", "edited", "url", "homeworld"]);

const requestJson = async (url) => {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`SWAPI responded with status ${response.status}`);
	}

	const payload = await response.json();

	if (!payload) {
		throw new Error("SWAPI returned an empty payload.");
	}

	return payload;
};

const readCollectionResults = (payload) => {
	if (Array.isArray(payload.results)) {
		return payload.results;
	}

	if (Array.isArray(payload.result)) {
		return payload.result;
	}

	return [];
};

const normalizeSummary = (type, resource) => ({
	uid: String(resource?.uid ?? ""),
	type,
	name:
		resource?.name ??
		resource?.properties?.title ??
		resource?.properties?.name ??
		"Unknown resource",
	description: resource?.description ?? "",
	properties: resource?.properties ?? {}
});

const normalizeDetail = (type, result) => ({
	uid: String(result?.uid ?? ""),
	type,
	name: result?.properties?.name ?? result?.properties?.title ?? "Unknown resource",
	description: result?.description ?? "",
	properties: result?.properties ?? {}
});

export const isSupportedType = (type) =>
	Object.prototype.hasOwnProperty.call(RESOURCE_CONFIG, type);

export const buildFallbackImage = (label = "Star Wars") => {
	const safeLabel = String(label).slice(0, 28);
	const svg = `
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 340">
			<rect width="600" height="340" fill="#040712" />
			<circle cx="80" cy="64" r="3" fill="#f8f9fa" />
			<circle cx="220" cy="44" r="2" fill="#f8f9fa" />
			<circle cx="500" cy="92" r="2.5" fill="#f8f9fa" />
			<circle cx="430" cy="46" r="1.8" fill="#f8f9fa" />
			<text x="50%" y="47%" text-anchor="middle" font-size="42" fill="#ffe81f" font-family="Arial, sans-serif">STAR WARS</text>
			<text x="50%" y="62%" text-anchor="middle" font-size="24" fill="#d9e2f2" font-family="Arial, sans-serif">${safeLabel}</text>
		</svg>
	`;

	return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const getResourceImageUrl = (type, uid) => {
	if (!isSupportedType(type)) {
		return buildFallbackImage("Unknown resource");
	}

	return `https://starwars-visualguide.com/assets/img/${RESOURCE_CONFIG[type].imagePath}/${uid}.jpg`;
};

export const fetchCollection = async (type, limit = 10) => {
	if (!isSupportedType(type)) {
		throw new Error(`Unsupported resource type: ${type}`);
	}

	const payload = await requestJson(`${API_BASE_URL}/${type}?page=1&limit=${limit}`);

	return readCollectionResults(payload).map((resource) => normalizeSummary(type, resource));
};

export const fetchCatalog = async (limit = 10) => {
	const [people, films, planets, vehicles] = await Promise.all([
		fetchCollection("people", limit),
		fetchCollection("films", limit),
		fetchCollection("planets", limit),
		fetchCollection("vehicles", limit)
	]);

	return { people, films, planets, vehicles };
};

export const fetchResourceDetail = async (type, uid) => {
	if (!isSupportedType(type)) {
		throw new Error(`Unsupported resource type: ${type}`);
	}

	const payload = await requestJson(`${API_BASE_URL}/${type}/${uid}`);

	return normalizeDetail(type, payload.result);
};

export const loadCatalog = async (
	dispatch,
	{ hasLoaded = false, forceReload = false } = {}
) => {
	if (hasLoaded && !forceReload) {
		return;
	}

	dispatch({
		type: ACTION_TYPES.loadCatalogStart
	});

	try {
		const catalog = await fetchCatalog();

		dispatch({
			type: ACTION_TYPES.loadCatalogSuccess,
			payload: catalog
		});
	} catch (error) {
		dispatch({
			type: ACTION_TYPES.loadCatalogError,
			payload: error.message || "Unable to load the Star Wars catalog."
		});
	}
};

export const loadDetail = async (
	dispatch,
	{ type, uid, cachedDetail = null, forceReload = false }
) => {
	if (!isSupportedType(type)) {
		dispatch({
			type: ACTION_TYPES.loadDetailError,
			payload: `Unsupported resource type: ${type}`
		});
		return;
	}

	dispatch({
		type: ACTION_TYPES.loadDetailStart,
		payload: `${type}:${uid}`
	});

	if (cachedDetail && !forceReload) {
		dispatch({
			type: ACTION_TYPES.loadDetailSuccess,
			payload: cachedDetail
		});
		return;
	}

	try {
		const detail = await fetchResourceDetail(type, uid);

		dispatch({
			type: ACTION_TYPES.loadDetailSuccess,
			payload: detail
		});
	} catch (error) {
		dispatch({
			type: ACTION_TYPES.loadDetailError,
			payload: error.message || "Unable to load this resource."
		});
	}
};

export const formatPropertyLabel = (propertyName) =>
	propertyName
		.replace(/_/g, " ")
		.replace(/\b\w/g, (character) => character.toUpperCase());

export const getCardHighlights = (type, properties = {}) => {
	const config = RESOURCE_CONFIG[type];

	if (!config) {
		return [];
	}

	return config.cardFields
		.filter((fieldName) => properties[fieldName])
		.map((fieldName) => ({
			label: formatPropertyLabel(fieldName),
			value: properties[fieldName]
		}));
};

export const getDetailEntries = (properties = {}) =>
	Object.entries(properties)
		.filter(
			([key, value]) =>
				key !== "name" &&
				key !== "title" &&
				!DETAIL_FIELDS_TO_HIDE.has(key) &&
				value !== null &&
				value !== undefined &&
				value !== ""
		)
		.map(([key, value]) => ({
			key,
			label: formatPropertyLabel(key),
			value
		}));
