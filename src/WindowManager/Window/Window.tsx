import { ReactNode, useRef, useState } from "react";
import { FiMaximize2 } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { VscChromeMinimize } from "react-icons/vsc";
import { Rnd } from "react-rnd";
import { Entity, UseWindowManager } from "../WindowManager";
import {
	TASKBAR_HEIGHT,
	WINDOW_TOPBAR_BUTTONS_WIDTH,
	WINDOW_TOPBAR_HEIGHT,
} from "../constants";

import "./Window.css";
import app_list from "../../app_list.json";

export default function Window({
	children,
	myKey,
	myEntity,
	z_index,
}: {
	children: ReactNode;
	myKey: number;
	myEntity: Entity;
	z_index: number;
}) {
	const { destroyEntity, pushEntityForward, minimizeEntitySwitch } =
		UseWindowManager();

	const [in_fullscreen, set_in_fullscreen] = useState(false);

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
				// border: in_fullscreen
				// 	? "1px yellow solid"
				// 	: "rgb(255, 255, 255) solid 1px",
				boxShadow: "0 0 3px 0.5px white",
				zIndex: z_index,
				borderRadius: in_fullscreen ? 0 : 10,
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
			onMouseDown={() => pushEntityForward(myKey)}
			// disableDragging={in_fullscreen}
			onResize={() => set_in_fullscreen(false)}
		>
			<nav
				style={{
					background: "black",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					userSelect: "none",
					height: WINDOW_TOPBAR_HEIGHT,
					width: "100%",
				}}
			>
				<div
					className="drag-handler"
					style={{
						width: "100%",
						height: "100%",
						display: "flex",
						alignItems: "center",
						gap: 6,
					}}
					onDoubleClick={toggleFullscreen}
				>
					<img
						src={app_list[myEntity.app_list_index].icon}
						alt=""
						style={{
							height: WINDOW_TOPBAR_HEIGHT - 4,
							padding: 4,
						}}
					/>
					<p>{app_list[myEntity.app_list_index].name}</p>
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						height: "100%",
					}}
				>
					<div
						className="MinimizeButton"
						style={{
							height: "100%",
							width: WINDOW_TOPBAR_BUTTONS_WIDTH,
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							cursor: "pointer",
						}}
						onClick={() => minimizeEntitySwitch(myKey, true)}
					>
						<VscChromeMinimize size={20} />
					</div>
					<div
						className="FullscreenButton"
						style={{
							height: "100%",
							width: WINDOW_TOPBAR_BUTTONS_WIDTH,
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							cursor: "pointer",
						}}
						onClick={() => toggleFullscreen()}
					>
						<FiMaximize2 size={20} />
					</div>
					<div
						className="CrossButton"
						style={{
							height: "100%",
							width: WINDOW_TOPBAR_BUTTONS_WIDTH,
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							cursor: "pointer",
							// backgroundColor: "green",
						}}
						onClick={() => destroyEntity(myKey)}
					>
						<RxCross2 size={20} />
					</div>
				</div>
			</nav>
			<div
				style={{
					height: `calc(100% - ${WINDOW_TOPBAR_HEIGHT}px)`,
				}}
				className="w-full h-full [&>*]:w-full [&>*]:h-full"
			>
				{children}
			</div>
		</Rnd>
	);
}
