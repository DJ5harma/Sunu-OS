import { isMobile } from "react-device-detect";

export default function ScoreBoard({
	playerStruct,
}: {
	playerStruct: {
		X: number;
		O: number;
		DRAWS: number;
	};
}) {
	return (
		<div
			style={{
				backgroundColor: "black",
				fontSize: isMobile ? 16 : 25,
				position: "fixed",
				top: 70,
				left: 0,
				padding: isMobile ? 15 : 30,
				borderRadius: 10,
				display: "flex",
				flexDirection: isMobile ? "row" : "column",
				gap: 8,
				width: isMobile ? "100vw" : "fit-content",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<p style={{ fontSize: isMobile ? "default" : 30 }}>Scores: </p>
			<p style={{ color: "rgb(150, 150, 255)" }}>P1 (X): {playerStruct.X}</p>
			{isMobile && "|"}
			<p style={{ color: "rgb(255, 150, 150)" }}>P2 (O): {playerStruct.O}</p>
			{isMobile && "|"}
			<p style={{ color: "rgb(255, 150, 255 )" }}>
				DRAWS: {playerStruct.DRAWS}
			</p>
		</div>
	);
}
