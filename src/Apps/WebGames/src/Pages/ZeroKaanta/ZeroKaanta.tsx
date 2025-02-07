import { useState } from "react";
import "./ZeroKaanta.css";
import { isMobile } from "react-device-detect";
import ScoreBoard from "./ScoreBoard";

import DisplayText from "./DisplayText";
import checkWin from "./checkWin";

import bloopAudio from "../../assets/bloop.mp3";
import popAudio from "../../assets/happy-pop.mp3";
import failAudio from "../../assets/fail.mp3";
import celebrationAudio from "../../assets/celebration.mp3";

export default function ZeroKaanta() {
	const initial: (" " | "O" | "X")[] = [
		" ",
		" ",
		" ",
		" ",
		" ",
		" ",
		" ",
		" ",
		" ",
	];
	const [array, setArray] = useState<(" " | "O" | "X")[]>(initial);
	const [stateStore, setStateStore] = useState<(" " | "O" | "X")[][]>([]);
	const [gameNumber, setGameNumber] = useState(1);
	const [winnerIsThere, setWinnerIsThere] = useState(false);
	const [drawn, setDrawn] = useState(false);

	const [playerStruct, setPlayerStruct] = useState<{
		X: number;
		O: number;
		DRAWS: number;
	}>({
		X: 0,
		O: 0,
		DRAWS: 0,
	});

	const [winningBoxes, setWinningBoxes] = useState<number[]>([]);

	const [clickAudio, resetAudio, winAudio, drawAudio] = [
		new Audio(bloopAudio),
		new Audio(popAudio),
		new Audio(celebrationAudio),
		new Audio(failAudio),
	];

	function turnOf() {
		let filledSpaces = 0;
		array.forEach((item) => {
			if (item !== " ") filledSpaces++;
		});

		if ((gameNumber + filledSpaces) % 2 === 0) return "O";
		return "X";
	}

	const CustomButton = ({ number }: { number: number }) => {
		return (
			<button
				className="clickSpace"
				style={{
					width: isMobile ? "28vw" : "10vw",
					height: isMobile ? "28vw" : "10vw",
					borderRadius: 8,
					backgroundColor: winningBoxes.includes(number)
						? turnOf() === "X"
							? "rgb(255, 150, 150)"
							: "rgb(150, 150, 255)"
						: "white",

					animation:
						array.includes("O") || array.includes("X")
							? "none"
							: "easeIn 0.5s forwards",
				}}
				onClick={() => {
					if (winnerIsThere || drawn || array[number] !== " ") return;
					clickAudio.play();

					stateStore.push(array);
					setStateStore([...stateStore]);

					array[number] = turnOf();
					setArray([...array]);

					if (checkWin(array, setWinningBoxes)) {
						setWinnerIsThere(true);
						playerStruct[turnOf()]++;
						setPlayerStruct({ ...playerStruct });
						winAudio.play();
					} else if (!array.includes(" ")) {
						playerStruct.DRAWS++;
						setPlayerStruct({ ...playerStruct });
						setDrawn(true);
						drawAudio.play();
					}
				}}
			>
				<pre
					style={{
						fontFamily: "monospace",
						fontSize: isMobile ? 30 : 50,
						animation: winningBoxes.includes(number)
							? "zAxisMovement 2s infinite"
							: "none",
					}}
				>
					{array[number]}
				</pre>
			</button>
		);
	};

	// 0 1 2
	// 3 4 5
	// 6 7 8
	return (
		<div
			id="ZeroKaanta"
			style={{
				backgroundColor: (() => {
					if (winnerIsThere)
						return turnOf() === "X" ? "rgb(80, 10, 10)" : "rgb(10, 10, 80)";
					if (drawn) return "rgb(80, 10, 80)";
					if (turnOf() === "X") return "rgb(10, 10, 80)";
					return "rgb(80, 10, 10)";
				})(),
			}}
		>
			<ScoreBoard playerStruct={playerStruct} />

			<DisplayText
				drawn={drawn}
				gameNumber={gameNumber}
				winnerIsThere={winnerIsThere}
				turnOf={turnOf()}
			/>
			<div>
				<div>
					<CustomButton number={0} />
					<CustomButton number={1} />
					<CustomButton number={2} />
				</div>
				<div>
					<CustomButton number={3} />
					<CustomButton number={4} />
					<CustomButton number={5} />
				</div>
				<div>
					<CustomButton number={6} />
					<CustomButton number={7} />
					<CustomButton number={8} />
				</div>
			</div>
			{(drawn || winnerIsThere) && (
				<button
					onClick={() => {
						setGameNumber(gameNumber + 1);
						setArray(initial);
						setStateStore([]);

						setDrawn(false);
						setWinnerIsThere(false);
						setWinningBoxes([]);

						resetAudio.play();
					}}
				>
					Play Again!
				</button>
			)}
			<div id="reset-everything-button">
				<button
					onClick={() => {
						setArray(initial);
						setStateStore([]);
						setGameNumber(1);
						setPlayerStruct({ X: 0, O: 0, DRAWS: 0 });
						setWinningBoxes([]);
						setWinnerIsThere(false);
						setDrawn(false);
						resetAudio.play();
					}}
				>
					Reset everything
				</button>
			</div>
			{stateStore.length > 0 && stateStore.length < 9 && (
				<div
					id="go-to-move"
					style={{
						flexDirection: isMobile ? "row" : "column",
						top: 70,
						width: isMobile ? "100vw" : "default",
						right: isMobile ? "default" : 0,
						borderRadius: isMobile ? 0 : 20,
					}}
				>
					<p>Undo</p>
					{stateStore.map((_, i) => {
						return (
							<button
								key={i}
								onClick={() => {
									setDrawn(false);
									setWinnerIsThere(false);
									setWinningBoxes([]);
									resetAudio.play();
									if (i === 0) {
										setArray(initial);
										setStateStore([]);
										return;
									}
									const newArray = stateStore[i - 1];
									setArray([...newArray]);

									stateStore.splice(i, stateStore.length - i);
									setStateStore([...stateStore]);
								}}
							>
								{i}
							</button>
						);
					})}
				</div>
			)}
		</div>
	);
}
