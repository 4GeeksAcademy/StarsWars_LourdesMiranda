import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ACTION_TYPES } from "../store";
import {
	buildFallbackImage,
	getCardHighlights,
	getResourceImageUrl,
	RESOURCE_CONFIG
} from "../services/swapi";

const Card = ({ item }) => {
	const { store, dispatch } = useGlobalReducer();
	const isFavorite = store.favorites.some(
		(favorite) => favorite.uid === item.uid && favorite.type === item.type
	);
	const highlights = getCardHighlights(item.type, item.properties).slice(0, 3);

	const handleToggleFavorite = () => {
		dispatch({
			type: ACTION_TYPES.toggleFavorite,
			payload: {
				uid: item.uid,
				type: item.type,
				name: item.name
			}
		});
	};

	return (
		<article className="resource-card h-100">
			<img
				src={getResourceImageUrl(item.type, item.uid)}
				className="card-media"
				alt={item.name}
				onError={(event) => {
					event.currentTarget.src = buildFallbackImage(item.name);
				}}
			/>

			<div className="card-body p-4 d-flex flex-column">
				<p className="eyebrow text-warning mb-2">
					{RESOURCE_CONFIG[item.type]?.label || item.type}
				</p>
				<h2 className="h4 text-light mb-3">{item.name}</h2>

				{highlights.length > 0 ? (
					<ul className="resource-meta">
						{highlights.map((highlight) => (
							<li key={highlight.label}>
								<span>{highlight.label}</span>
								<strong>{highlight.value}</strong>
							</li>
						))}
					</ul>
				) : (
					<p className="text-light-emphasis small mb-0">
						Open the detail page to inspect this resource.
					</p>
				)}

				<div className="card-footer d-flex justify-content-between align-items-center bg-transparent border-0 px-0 pt-4 mt-auto">
					<Link to={`/${item.type}/${item.uid}`} className="btn btn-star-wars">
						See detail
					</Link>

					<button
						type="button"
						className={`btn btn-favorite ${isFavorite ? "is-active" : ""}`}
						onClick={handleToggleFavorite}
						aria-pressed={isFavorite}
						aria-label={
							isFavorite
								? `Remove ${item.name} from favorites`
								: `Add ${item.name} to favorites`
						}
					>
						<FontAwesomeIcon
							icon={faHeart}
							className={isFavorite ? "text-danger" : "text-warning"}
						/>
					</button>
				</div>
			</div>
		</article>
	);
};

Card.propTypes = {
	item: PropTypes.shape({
		uid: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		description: PropTypes.string,
		properties: PropTypes.object
	}).isRequired
};

export default Card;
