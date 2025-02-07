import { Link, useLocation } from "react-router-dom";

export default function PebblePopperScoreBoard() {
	const location = useLocation();

	const { data } = location.state;
	const { popCount, accuracy } = data;
	// const {clickCount, misses} = data;

	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				gap: 20,
			}}
		>
			<h2>!End!</h2>
			{/* <h2>____Your Score____</h2> */}
			{/* <p>Click Count: {clickCount}</p> */}
			<p style={{ fontSize: 20 }}>Pop Count: {popCount}</p>
			<p style={{ fontSize: 20 }}>Accuracy: {accuracy}</p>
			{/* <p>Misses: {misses}</p> */}

			<Link to="/pebble-popper">
				<button>Play Again!</button>
			</Link>
		</div>
	);
}
