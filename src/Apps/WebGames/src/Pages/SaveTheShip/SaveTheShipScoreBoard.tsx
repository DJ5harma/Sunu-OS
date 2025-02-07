import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// import happyPopAudio from "../../assets/happy-pop.mp3";

export default function PopGameScoreBoard() {
	const location = useLocation();

	const { data } = location.state;
	const { polesObserved } = data;

	// const popAudio = new Audio(happyPopAudio);

	useEffect(() => {
		// popAudio.play();
		document.title = "Save the Ship Score";
	}, []);

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
			<h3>Poles observed: {polesObserved}</h3>

			<Link to="/save-the-ship">
				<button>Play Again!</button>
			</Link>
		</div>
	);
}
