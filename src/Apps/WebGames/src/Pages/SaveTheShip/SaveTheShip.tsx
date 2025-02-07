import { useEffect, useRef, useState } from "react";
import "./SaveTheShip.css";
import Ship from "./Ship";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";

// import bloopAudio from "../../assets/bloop.mp3";
// import happyPopAudio from "../../assets/happy-pop.mp3";

export default function SaveTheShip() {
	const [poleHeights, setPoleHeights] = useState([
		{
			topPoleHeight: 40,
			index: 0,
			color: `rgb(${Math.random() * 200 + 55},${
				Math.random() * 200 + 55
			},${Math.random() * 200 + 55})`,
		},
	]);

	const [shipTopPosition, setShipTopPosition] = useState(1);
	const [shipDirection, setShipDirection] = useState<"up" | "down">("down");

	const shipRef = useRef<HTMLDivElement>(null);
	const poleRefs = useRef<(HTMLDivElement | null)[]>([]);

	const spaceBW = 40;

	const navigate = useNavigate();

	// const clickAudio = new Audio(bloopAudio);
	// const popAudio = new Audio(happyPopAudio);

	function checkCollision() {
		if (!shipRef.current) return;
		const shipRect = shipRef.current.getBoundingClientRect();

		for (const poleRef of poleRefs.current) {
			if (poleRef) {
				const poleRect = poleRef.getBoundingClientRect();

				if (
					shipRect.left < poleRect.left + poleRect.width &&
					shipRect.left + shipRect.width > poleRect.left &&
					shipRect.top < poleRect.top + poleRect.height &&
					shipRect.top + shipRect.height > poleRect.top
				) {
					// popAudio.play();
					navigate("/save-the-ship-scoreboard", {
						state: {
							data: {
								polesObserved:
									poleHeights[poleHeights.length - 1].index,
							},
						},
					});
				}
			}
		}
	}

	useEffect(() => {
		document.title = "Save the Ship";
	}, []);

	useEffect(() => {
		const intervalTime = isMobile ? 1500 : 900;

		const polesInterval = setInterval(() => {
			setPoleHeights((prev) => [
				...prev,
				{
					topPoleHeight: Math.random() * 60,
					index: prev[prev.length - 1].index + 1,
					color: `rgb(${Math.random() * 200 + 55},${
						Math.random() * 200 + 55
					},${Math.random() * 200 + 55})`,
				},
			]);
		}, intervalTime);

		const removePolesInterval = setTimeout(() => {
			const intervalId = setInterval(() => {
				setPoleHeights((prev) => [...prev.slice(1)]);
			}, intervalTime);
			return () => clearInterval(intervalId);
		}, 8000);

		return () => {
			clearInterval(polesInterval);
			clearTimeout(removePolesInterval);
		};
	}, []);

	return (
		<div
			id="Canvas"
			style={{
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				overflow: "hidden",
			}}
			onClick={() => {
				setShipDirection((prev) => (prev === "up" ? "down" : "up"));
				// clickAudio.play();
			}}
		>
			{poleHeights.map(({ topPoleHeight, index, color }) => {
				// Clearing the poleRefs array before adding new references
				poleRefs.current = [];

				return (
					<div
						key={index}
						className="TwoPolesAndSpacing"
						style={{
							width: isMobile ? 30 : 45,
						}}
					>
						<div
							style={{
								backgroundColor: color,
								height: `${topPoleHeight}vh`,
								borderRadius: 40,
							}}
							ref={(ref) => poleRefs.current.push(ref)}
						></div>
						<p
							style={{
								height: `${spaceBW}vh`,
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								fontSize: 25,
								userSelect: "none",
							}}
						>
							{index}
						</p>
						<div
							style={{
								backgroundColor: color,
								borderRadius: 40,
								height: `${100 - topPoleHeight - spaceBW}vh`,
							}}
							ref={(ref) => poleRefs.current.push(ref)}
						></div>
					</div>
				);
			})}
			<Ship
				ref={shipRef}
				shipTopPosition={shipTopPosition}
				shipDirection={shipDirection}
				checkCollision={checkCollision}
				setShipDirection={setShipDirection}
				setShipTopPosition={setShipTopPosition}
			/>
		</div>
	);
}
