import { Link } from "react-router-dom";
import StarWarsImageUrl from "../assets/img/Star_Wars_Logo.png";
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export const Navbar = () => {
	<Link to="/add">
		<button className="btn btn-primary">Check the Context in action</button>
	</Link>
	return (
		<div className="d-flex justify-content-between">
			<div>
				<img className="logoSW" src={StarWarsImageUrl} />
			</div>
			<nav className="navbar navbar-expand-lg bg-black shadow" data-bs-theme="dark">
				<div className="container-fluid">
					<div className="collapse navbar-collapse" id="navbarNavDropdown">
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link className="nav-link" to="/">Home</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/Character">Character</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/Films">Films</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/Vehicles">Vehicles</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/Planets">Planets</Link>
							</li>
							<li className="nav-item dropdown">
								<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
									Favorites
									<FontAwesomeIcon
										icon={faHeart}
										style={{ color: "red", fontSize: "20px", pointerEvents: "none" }}
									/>

								</a>
								<ul className="dropdown-menu">
									<li><a className="dropdown-item" href="#">Action</a></li>
									<li><a className="dropdown-item" href="#">Another action</a></li>
									<li><a className="dropdown-item" href="#">Something else here</a></li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
};