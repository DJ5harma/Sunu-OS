import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";

const Nav = ({
	popCount,
	clickCount,
}: {
	popCount: number;
	clickCount: number;
}) => {
	const [timeRemaining, setTimeRemaining] = useState(60);
	const navigate = useNavigate();
	useEffect(() => {
		setInterval(() => {
			setTimeRemaining(timeRemaining - 1);
		}, 1000);
	}, [timeRemaining]);

	if (timeRemaining <= 0) {
		navigate("/pebble-popper-scoreboard", {
			state: {
				data: {
					clickCount,
					popCount,
					misses: clickCount - popCount,
					accuracy: `${((popCount / clickCount) * 100).toFixed(
						2
					)} % `,
				},
			},
		});
	}

	return (
		<nav
			style={{
				display: "flex",
				justifyContent: "space-around",
				position: "fixed",
				top: 15,
				width: "100vw",
				userSelect: "none",
			}}
		>
			<p style={{ fontSize: isMobile ? 16 : 22 }}>Pops: {popCount}</p>
			{/* <p style={{ fontSize: isMobile ? 16 : 22 }}>Clicks: {clickCount}</p> */}
			<p style={{ fontSize: isMobile ? 16 : 22 }}>
				Misses: {clickCount - popCount}
			</p>
			<p style={{ fontSize: isMobile ? 16 : 22 }}>
				Acc: {((popCount / clickCount) * 100).toFixed(2)} %{" "}
			</p>
			<p
				style={{
					color: "rgb(255, 50, 50)",
					fontSize: isMobile ? 16 : 22,
				}}
			>
				Time: {timeRemaining}s
			</p>
		</nav>
	);
};

export default Nav;
