import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export const Footer = () => (
	<footer className="site-footer py-4 text-center">
		<p className="mb-0 text-light-emphasis">
			Made with <FontAwesomeIcon icon={faHeart} className="text-danger mx-1" /> by{" "}
			<a
				href="https://www.4geeksacademy.com"
				target="_blank"
				rel="noreferrer"
				className="footer-link fw-semibold"
			>
				Lourdes Miranda
			</a>
		</p>
	</footer>
);
