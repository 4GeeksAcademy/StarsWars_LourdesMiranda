import { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { RESOURCE_CONFIG, loadCatalog } from "../services/swapi";

const HOME_SECTIONS = [
	{
		type: "people",
		eyebrow: "The iconic cast",
		description: "Heroes, villains and smugglers pulled from the Jedi archives."
	},
	{
		type: "planets",
		eyebrow: "Worlds to explore",
		description: "Climate, terrain and population snapshots from the galaxy."
	},
	{
		type: "vehicles",
		eyebrow: "Ships and speeders",
		description: "Technical specs for the most famous rides in the saga."
	},
	{
		type: "films",
		eyebrow: "Stories that shaped the saga",
		description: "Episode data and directors for the major Star Wars films."
	}
];

const PREVIEW_LIMIT = 4;

const Home = () => {
	const { store, dispatch } = useGlobalReducer();
	const { catalog, status } = store;
	const hasCatalogContent = HOME_SECTIONS.some(
		({ type }) => catalog[type].length > 0
	);

	useEffect(() => {
		loadCatalog(dispatch, {
			hasLoaded: status.catalog.hasLoaded
		});
	}, [dispatch, status.catalog.hasLoaded]);

	if (status.catalog.isLoading && !hasCatalogContent) {
		return (
			<div className="container page-shell">
				<section className="hero-panel text-center">
					<div
						className="spinner-border text-warning"
						role="status"
						style={{ width: "3rem", height: "3rem" }}
					>
						<span className="visually-hidden">Loading...</span>
					</div>
					<p className="mt-3 mb-0 text-light-emphasis">
						Loading the Star Wars catalog from SWAPI...
					</p>
				</section>
			</div>
		);
	}

	return (
		<div className="container page-shell">
			<section className="hero-panel">
				<div className="row align-items-center g-4">
					<div className="col-lg-8">
						<p className="eyebrow text-warning mb-2">Lourdes Miranda project</p>
						<h1 className="display-5 fw-bold text-light mb-3 home-title">
							Star Wars reading list with global favorites, reusable routes and
							cached detail pages.
						</h1>
						<p className="lead text-light-emphasis mb-0">
							The home page now loads the catalog once, stores it globally and
							reuses the same source of truth across the rest of the app.
						</p>
					</div>

					<div className="col-lg-4">
						<div className="status-panel">
							<p className="mb-1 text-uppercase small text-warning fw-semibold">
								Global state snapshot
							</p>
							<p className="mb-2 text-light">
								Favorites saved: <strong>{store.favorites.length}</strong>
							</p>
							<p className="mb-0 text-light-emphasis">
								Catalog cached: {status.catalog.hasLoaded ? "Yes" : "No"}
							</p>
						</div>
					</div>
				</div>
			</section>

			{status.catalog.error ? (
				<div className="alert alert-danger d-flex justify-content-between align-items-center flex-wrap gap-3">
					<span>{status.catalog.error}</span>
					<button
						type="button"
						className="btn btn-outline-danger btn-sm"
						onClick={() =>
							loadCatalog(dispatch, {
								hasLoaded: status.catalog.hasLoaded,
								forceReload: true
							})
						}
					>
						Try again
					</button>
				</div>
			) : null}

			{HOME_SECTIONS.map((section) => (
				<section key={section.type} className="section-panel mb-4">
					<div className="d-flex justify-content-between align-items-end flex-wrap gap-3 mb-4">
						<div>
							<p className="eyebrow text-warning mb-1">{section.eyebrow}</p>
							<h2 className="section-title mb-2">
								{RESOURCE_CONFIG[section.type].label}
							</h2>
							<p className="text-light-emphasis mb-0">{section.description}</p>
						</div>

						<Link to={`/${section.type}`} className="btn btn-star-wars">
							Open full collection
						</Link>
					</div>

					{catalog[section.type].length === 0 ? (
						<div className="empty-panel">
							No {RESOURCE_CONFIG[section.type].label.toLowerCase()} available
							right now.
						</div>
					) : (
						<div className="resource-grid">
							{catalog[section.type]
								.slice(0, PREVIEW_LIMIT)
								.map((item) => (
									<Card key={`${item.type}-${item.uid}`} item={item} />
								))}
						</div>
					)}
				</section>
			))}
		</div>
	);
};

export default Home;
