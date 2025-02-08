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
			className="flex flex-col justify-center items-center"
			style={{
				boxShadow: "0 0 3px 0.5px white",
				zIndex: z_index,
				borderRadius: in_fullscreen ? 0 : 10,
			}}
			onMouseDown={() => pushEntityForward(myKey)}
			// disableDragging={in_fullscreen}
			onResize={() => set_in_fullscreen(false)}
		>
			<nav
				className="bg-black flex justify-between items-center select-none w-full"
				style={{
					height: WINDOW_TOPBAR_HEIGHT,
				}}
			>
				<div
					className="drag-handler w-full h-full flex items-center gap-1.5"
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
				<div className="flex items-center h-full [&>div]:h-full [&>div]:flex [&>div]:items-center [&>div]:justify-center [&>div]:cursor-pointer">
					<div
						className="MinimizeButton"
						style={{
							width: WINDOW_TOPBAR_BUTTONS_WIDTH,
						}}
						onClick={() => minimizeEntitySwitch(myKey, true)}
					>
						<VscChromeMinimize size={20} />
					</div>
					<div
						className="FullscreenButton"
						style={{
							width: WINDOW_TOPBAR_BUTTONS_WIDTH,
						}}
						onClick={toggleFullscreen}
					>
						<FiMaximize2 size={20} />
					</div>
					<div
						className="CrossButton"
						style={{
							width: WINDOW_TOPBAR_BUTTONS_WIDTH,
						}}
						onClick={() => destroyEntity(myKey)}
					>
						<RxCross2 size={20} />
					</div>
				</div>
			</nav>
			<div
				className="w-full h-full [&>*]:w-full [&>*]:h-full"
				style={{
					height: `calc(100% - ${WINDOW_TOPBAR_HEIGHT}px)`,
				}}
			>
				{children}
			</div>
		</Rnd>
	);
}
