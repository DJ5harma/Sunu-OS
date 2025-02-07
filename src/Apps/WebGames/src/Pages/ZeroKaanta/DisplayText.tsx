export default function DisplayText({
	gameNumber,
	winnerIsThere,
	drawn,
	turnOf,
}: {
	gameNumber: number;
	winnerIsThere: boolean;
	drawn: boolean;
	turnOf: "X" | "O";
}) {
	return (
		<h2
			style={{
				backgroundColor: "black",
				padding: "10px 20px",
				borderRadius: 20,
				userSelect: "none",
				textAlign: "center",
				display: "flex",
				flexDirection: "row",
			}}
		>
			<pre style={{ color: "rgb(140, 255, 140)" }}>
				Game {gameNumber} |{" "}
			</pre>
			<p>
				{(() => {
					if (winnerIsThere)
						return `Winner is ${turnOf === "O" ? "X" : "O"}`;
					else if (drawn) return "DRAW!";
					else return `Turn of ${turnOf}`;
				})()}
			</p>
		</h2>
	);
}
