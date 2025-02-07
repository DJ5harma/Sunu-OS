import { TASKBAR_HEIGHT } from "../constants";

export default function Taskbar() {
	return (
		<div
			style={{
				height: TASKBAR_HEIGHT,
				width: "100vw",
				backgroundColor: "beige",
			}}
		>
			Taskbar
		</div>
	);
}
