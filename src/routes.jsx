import {
	createBrowserRouter,
	createRoutesFromElements,
	Route
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import Home from "./pages/Home";
import CollectionPage from "./pages/CollectionPage";
import Detail from "./pages/Detail";

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path="/"
			element={<Layout />}
			errorElement={
				<div className="container page-shell">
					<div className="alert alert-danger mt-4">
						This page does not exist in the Jedi archives.
					</div>
				</div>
			}
		>
			<Route index element={<Home />} />
			<Route path=":type" element={<CollectionPage />} />
			<Route path=":type/:uid" element={<Detail />} />
			<Route path="single/:type/:uid" element={<Detail />} />
		</Route>
	)
);
