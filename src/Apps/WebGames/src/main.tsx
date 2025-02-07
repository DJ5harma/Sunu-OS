import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

export default function main() {
	return (
		<BrowserRouter>
			<App />
		</BrowserRouter>
	);
}
