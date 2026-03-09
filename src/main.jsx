import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { StoreProvider } from "./hooks/useGlobalReducer";
import "./index.css";
import { router } from "./routes";

const Main = () => {
	return (
		<StrictMode>
			<StoreProvider>
				<div className="stars-container" aria-hidden="true"></div>
				<RouterProvider router={router} />
			</StoreProvider>
		</StrictMode>
	);
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
