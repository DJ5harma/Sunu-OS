import { ReactNode } from "react";
import { Link } from "react-router-dom";

import bloopAudio from "../../assets/bloop.mp3";
import { isMobile } from "react-device-detect";

const GameSnippet = ({
	linkPath,
	name,
	description,
	bgColor,
	image,
}: {
	linkPath: string;
	name: string;
	description: string;
	bgColor: string;
	image: ReactNode;
}) => {
	const clickAudio = new Audio(bloopAudio);

	return (
		<div
			style={{
				// border: "solid",
				padding: 20,
				borderRadius: 10,
				alignItems: "center",
				gap: 10,
				width: "100%",
				display: "flex",
				flexDirection: "column",
				backgroundColor: bgColor,
			}}
		>
			<div style={{ display: "flex", alignItems: "center" }}>
				<h2 style={{ display: "inline", marginRight: 10 }}>{name}</h2>
				<Link to={linkPath} onClick={() => clickAudio.play()}>
					<button>Play!</button>
				</Link>
				<div style={{ marginLeft: 8 }}>{image}</div>
			</div>
			<p style={{ fontSize: isMobile ? 14 : 20 }}>{description}</p>
		</div>
	);
};

export default GameSnippet;
