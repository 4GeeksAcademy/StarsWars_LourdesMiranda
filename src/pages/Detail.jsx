import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
	buildFallbackImage,
	getCardHighlights,
	getDetailEntries,
	getResourceImageUrl,
	isSupportedType,
	loadDetail,
	RESOURCE_CONFIG
} from "../services/swapi";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Detail = () => {
	const { type, uid } = useParams();
	const { store, dispatch } = useGlobalReducer();
	const safeUid = String(uid);
	const cachedDetail = isSupportedType(type)
		? store.detailCache[type][safeUid]
		: null;
	const catalogItem = isSupportedType(type)
		? store.catalog[type].find((item) => item.uid === safeUid)
		: null;
	const item = cachedDetail || catalogItem || null;
	const highlights = getCardHighlights(type, item?.properties);
	const detailEntries = getDetailEntries(item?.properties);

	useEffect(() => {
		if (!isSupportedType(type)) {
			return;
		}

		loadDetail(dispatch, {
			type,
			uid: safeUid,
			cachedDetail
		});
	}, [cachedDetail, dispatch, safeUid, type]);

	if (!isSupportedType(type)) {
		return (
			<div className="container page-shell">
				<div className="alert alert-danger d-flex justify-content-between align-items-center flex-wrap gap-3">
					<span>Unsupported resource type. Go back and choose a valid card.</span>
					<Link to="/" className="btn btn-outline-danger btn-sm">
						Back home
					</Link>
				</div>
			</div>
		);
	}

	if (store.status.detail.isLoading && !item) {
		return (
			<div className="container page-shell">
				<section className="hero-panel text-center">
					<div className="spinner-border text-warning" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
					<p className="mt-3 mb-0 text-light-emphasis">
						Loading {RESOURCE_CONFIG[type].label.toLowerCase()} #{safeUid}...
					</p>
				</section>
			</div>
		);
	}

	if (store.status.detail.error && !item) {
		return (
			<div className="container page-shell">
				<div className="alert alert-danger d-flex justify-content-between align-items-center flex-wrap gap-3">
					<span>{store.status.detail.error}</span>
					<button
						type="button"
						className="btn btn-outline-danger btn-sm"
						onClick={() =>
							loadDetail(dispatch, {
								type,
								uid: safeUid,
								cachedDetail,
								forceReload: true
							})
						}
					>
						Retry
					</button>
				</div>
			</div>
		);
	}

	if (!item) {
		return (
			<div className="container page-shell">
				<div className="empty-panel">
					This resource is not available in the archive.
				</div>
			</div>
		);
	}

	return (
		<div className="container page-shell">
			<div className="d-flex gap-3 flex-wrap mb-4">
				<Link to={`/${type}`} className="btn btn-outline-light">
					Back to {RESOURCE_CONFIG[type].label}
				</Link>
				<Link to="/" className="btn btn-star-wars">
					Back home
				</Link>
			</div>

			<section className="detail-panel">
				<div className="row g-4 align-items-start">
					<div className="col-lg-5">
						<img
							src={getResourceImageUrl(type, safeUid)}
							className="img-fluid rounded-4 detail-media"
							alt={item.name}
							onError={(event) => {
								event.currentTarget.src = buildFallbackImage(item.name);
							}}
						/>
					</div>

					<div className="col-lg-7">
						<p className="eyebrow text-warning mb-2">
							{RESOURCE_CONFIG[type].label}
						</p>
						<h1 className="display-6 fw-bold text-light mb-3">{item.name}</h1>
						<p className="lead text-light-emphasis">
							{item.description ||
								"SWAPI does not provide a description for this resource yet."}
						</p>

						{highlights.length > 0 ? (
							<div className="detail-highlights mb-4">
								{highlights.map((highlight) => (
									<div key={highlight.label} className="highlight-chip">
										<span className="text-warning">{highlight.label}</span>
										<strong className="text-light">{highlight.value}</strong>
									</div>
								))}
							</div>
						) : null}

						<div className="row g-3">
							{detailEntries.length > 0 ? (
								detailEntries.map((entry) => (
									<div key={entry.key} className="col-sm-6">
										<div className="detail-stat">
											<p className="detail-label mb-1">{entry.label}</p>
											<p className="detail-value mb-0">{entry.value}</p>
										</div>
									</div>
								))
							) : (
								<div className="col-12">
									<div className="empty-panel">
										No extra fields are available for this resource.
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Detail;
