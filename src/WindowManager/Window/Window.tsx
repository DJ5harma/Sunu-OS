import { ReactNode, useRef, useState } from "react";
import { FiMaximize2 } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { VscChromeMinimize } from "react-icons/vsc";
import { Rnd } from "react-rnd";
import { useWindowManager } from "../WindowManager";
import { TASKBAR_HEIGHT, WINDOW_TOPBAR_HEIGHT } from "../constants";

export default function Window({
	children,
	myKey,
	z_index,
}: {
	children: ReactNode;
	myKey: number;
	z_index: number;
}) {
	const { destroyEntity, pushEntityForward, minimizeEntity } =
		useWindowManager();

	const [in_fullscreen, set_in_fullscreen] = useState(false);

	// const [before_fullscreen, set_before_fullscreen] = useState({
	// 	pos: { x: window.innerWidth / 4, y: window.innerHeight / 4 },
	// 	dimensions: {
	// 		width: window.innerWidth / 2,
	// 		height: window.innerHeight / 2,
	// 	},
	// });

	const Rnd_Ref = useRef<Rnd>(null);

	function toggleFullscreen() {
		if (!Rnd_Ref.current) return;
		if (!in_fullscreen) {
			Rnd_Ref.current?.updateSize({
				width: window.innerWidth,
				height: window.innerHeight - TASKBAR_HEIGHT,
			});
			Rnd_Ref.current?.updatePosition({ x: 0, y: 0 });
		} else {
			Rnd_Ref.current?.updateSize({
				width: window.innerWidth / 2,
				height: window.innerHeight / 2,
			});
			Rnd_Ref.current?.updatePosition({
				x: window.innerWidth / 4,
				y: window.innerHeight / 4,
			});
		}

		set_in_fullscreen(!in_fullscreen);
	}

	return (
		<Rnd
			ref={Rnd_Ref}
			default={{
				x: window.innerWidth / 4,
				y: window.innerHeight / 4,
				width: window.innerWidth / 2,
				height: window.innerHeight / 2,
			}}
			dragHandleClassName="drag-handler"
			style={{
				border: in_fullscreen ? "1px yellow solid" : "1px red solid",
				zIndex: z_index,
			}}
			onMouseDown={() => pushEntityForward(myKey)}
			disableDragging={in_fullscreen}
			onResize={() => set_in_fullscreen(false)}
			bounds={"parent"}
		>
			<nav
				style={{
					background: "black",
					color: "#gray",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					userSelect: "none",
					height: WINDOW_TOPBAR_HEIGHT,
					padding: "0 15px 0 0",
				}}
			>
				<div
					className="drag-handler"
					style={{
						width: "100%",
						height: "100%",
						display: "flex",
						alignItems: "center",
						paddingLeft: 15,
					}}
					onDoubleClick={toggleFullscreen}
				>
					<p>Component Name</p>
				</div>
				<div style={{ display: "flex", gap: 15, alignItems: "center" }}>
					<VscChromeMinimize
						size={20}
						style={{ cursor: "pointer" }}
						onClick={() => minimizeEntity(myKey)}
					/>
					<FiMaximize2
						onClick={toggleFullscreen}
						size={20}
						style={{ cursor: "pointer" }}
					/>
					<RxCross2
						size={20}
						style={{ cursor: "pointer" }}
						onClick={() => destroyEntity(myKey)}
					/>
				</div>
			</nav>
			<div style={{ height: `calc(100% - ${WINDOW_TOPBAR_HEIGHT}px)` }}>
				{children}
			</div>
		</Rnd>
	);
}
