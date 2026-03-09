import { Link, NavLink } from "react-router-dom";
import StarWarsImageUrl from "../assets/img/Star_Wars_Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ACTION_TYPES } from "../store";
import { RESOURCE_CONFIG } from "../services/swapi";
import "./Navbar.css";

const NAV_ITEMS = ["people", "planets", "vehicles", "films"];

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();

	return (
		<header className="site-header">
			<div className="container py-3">
				<div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
					<Link to="/" className="logo-container">
						<img className="logoSW" src={StarWarsImageUrl} alt="Star Wars Logo" />
					</Link>

					<nav className="nav-shell" aria-label="Primary">
						{NAV_ITEMS.map((type) => (
							<NavLink
								key={type}
								to={`/${type}`}
								className={({ isActive }) =>
									`nav-pill ${isActive ? "active" : ""}`
								}
							>
								{RESOURCE_CONFIG[type].label}
							</NavLink>
						))}

						<div className="dropdown">
							<button
								className="btn favorites-toggle dropdown-toggle"
								type="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								Favorites
								<FontAwesomeIcon icon={faHeart} className="ms-2 text-danger" />
								<span className="badge bg-warning text-black ms-2">
									{store.favorites.length}
								</span>
							</button>

							<ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
								{store.favorites.length > 0 ? (
									store.favorites.map((favorite) => (
										<li key={`${favorite.type}-${favorite.uid}`}>
											<div className="dropdown-item-text d-flex justify-content-between align-items-center gap-3">
												<Link
													to={`/${favorite.type}/${favorite.uid}`}
													className="favorite-link"
												>
													{favorite.name}
												</Link>

												<button
													type="button"
													className="btn btn-link p-0 text-danger"
													aria-label={`Remove ${favorite.name} from favorites`}
													onClick={() =>
														dispatch({
															type: ACTION_TYPES.removeFavorite,
															payload: {
																type: favorite.type,
																uid: favorite.uid
															}
														})
													}
												>
													<FontAwesomeIcon icon={faTrashCan} />
												</button>
											</div>
										</li>
									))
								) : (
									<li className="dropdown-item-text text-secondary small">
										Your reading list is empty.
									</li>
								)}
							</ul>
						</div>
					</nav>
				</div>
			</div>
		</header>
	);
};
