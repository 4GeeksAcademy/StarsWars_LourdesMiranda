import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../components/Card";
import useGlobalReducer from "../hooks/useGlobalReducer";
import {
	RESOURCE_CONFIG,
	isSupportedType,
	loadCatalog
} from "../services/swapi";

const CollectionPage = () => {
	const { type } = useParams();
	const { store, dispatch } = useGlobalReducer();
	const items = isSupportedType(type) ? store.catalog[type] : [];

	useEffect(() => {
		if (!isSupportedType(type)) {
			return;
		}

		loadCatalog(dispatch, {
			hasLoaded: store.status.catalog.hasLoaded
		});
	}, [dispatch, store.status.catalog.hasLoaded, type]);

	if (!isSupportedType(type)) {
		return (
			<div className="container page-shell">
				<div className="alert alert-danger d-flex justify-content-between align-items-center flex-wrap gap-3">
					<span>Unsupported collection. Choose one of the available archives.</span>
					<Link to="/" className="btn btn-outline-danger btn-sm">
						Back home
					</Link>
				</div>
			</div>
		);
	}

	if (store.status.catalog.isLoading && items.length === 0) {
		return (
			<div className="container page-shell">
				<section className="hero-panel text-center">
					<div className="spinner-border text-warning" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
					<p className="mt-3 mb-0 text-light-emphasis">
						Loading {RESOURCE_CONFIG[type].label.toLowerCase()}...
					</p>
				</section>
			</div>
		);
	}

	return (
		<div className="container page-shell">
			<section className="hero-panel">
				<div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
					<div>
						<p className="eyebrow text-warning mb-1">Collection view</p>
						<h1 className="display-6 fw-bold text-light mb-2">
							{RESOURCE_CONFIG[type].label}
						</h1>
						<p className="text-light-emphasis mb-0">
							All the resources loaded into the global store for this category.
						</p>
					</div>

					<Link to="/" className="btn btn-star-wars">
						Back home
					</Link>
				</div>
			</section>

			{store.status.catalog.error ? (
				<div className="alert alert-danger d-flex justify-content-between align-items-center flex-wrap gap-3">
					<span>{store.status.catalog.error}</span>
					<button
						type="button"
						className="btn btn-outline-danger btn-sm"
						onClick={() =>
							loadCatalog(dispatch, {
								hasLoaded: store.status.catalog.hasLoaded,
								forceReload: true
							})
						}
					>
						Try again
					</button>
				</div>
			) : null}

			{items.length === 0 ? (
				<div className="empty-panel">
					No {RESOURCE_CONFIG[type].label.toLowerCase()} available right now.
				</div>
			) : (
				<div className="resource-grid">
					{items.map((item) => (
						<Card key={`${item.type}-${item.uid}`} item={item} />
					))}
				</div>
			)}
		</div>
	);
};

export default CollectionPage;
