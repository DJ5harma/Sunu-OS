import { Link, Route, Routes, useLocation } from "react-router-dom";
import PebblePopper from "./Pages/PebblePopper/PebblePopper";
import PebblePopperScoreBoard from "./Pages/PebblePopper/PebblePopperScoreboard";
import Home from "./Pages/Home/Home";
import { useState } from "react";
import SaveTheShipScoreBoard from "./Pages/SaveTheShip/SaveTheShipScoreBoard";
import SaveTheShip from "./Pages/SaveTheShip/SaveTheShip";
import NotFound from "./Pages/NotFound/NotFound";
import About from "./Pages/About/About";
import ZeroKaanta from "./Pages/ZeroKaanta/ZeroKaanta";

function App() {
	const [verifyGoingToHome, setVerifyGoingToHome] = useState(false);

	const location = useLocation();
	return (
		<div style={{ width: "100vw", height: "100vh" }}>
			<Routes>
				<Route index element={<Home />} />
				<Route path="/pebble-popper" element={<PebblePopper />} />
				<Route
					path="/pebble-popper-scoreboard"
					element={<PebblePopperScoreBoard />}
				/>
				<Route path="/save-the-ship" element={<SaveTheShip />} />
				<Route
					path="/save-the-ship-scoreboard"
					element={<SaveTheShipScoreBoard />}
				/>
				<Route path="/zero-kaanta" element={<ZeroKaanta />} />
				<Route path="/about" element={<About />} />
				<Route path="*" element={<NotFound />} />
			</Routes>

			{!verifyGoingToHome && location.pathname !== "/" && (
				<button
					style={{ position: "fixed", bottom: 0, left: 0 }}
					onClick={() => {
						setVerifyGoingToHome(true);
					}}
				>
					Go Home
				</button>
			)}
			{verifyGoingToHome && (
				<Link to="/" style={{ position: "fixed", bottom: 0, left: 0 }}>
					<button
						onClick={() => {
							setVerifyGoingToHome(false);
						}}
					>
						Tap to confirm
					</button>
				</Link>
			)}
		</div>
	);
}

export default App;
