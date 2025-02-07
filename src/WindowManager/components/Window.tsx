import { ReactNode } from "react";
import { FiMaximize2 } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { VscChromeMinimize } from "react-icons/vsc";
import { Rnd } from "react-rnd";
import { useWindowManager } from "../WindowManager";

export default function Window({
	children,
	myKey,
	z_index,
}: {
	children: ReactNode;
	myKey: number;
	z_index: number;
}) {
	const { destroyEntity, pushEntityForward } = useWindowManager();

	return (
		<Rnd
			default={{
				x: window.innerWidth / 4,
				y: window.innerHeight / 4,
				width: window.innerWidth / 2,
				height: window.innerHeight / 2,
			}}
			dragHandleClassName="drag-handler"
			style={{ border: "red solid", zIndex: z_index }}
			onMouseDown={() => pushEntityForward(myKey)}
		>
			<nav
				style={{
					background: "#333",
					color: "#fff",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					userSelect: "none",
					height: 50,
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
				>
					<p>Component Name</p>
				</div>
				<div style={{ display: "flex", gap: 15, alignItems: "center" }}>
					<VscChromeMinimize
						size={20}
						style={{ cursor: "pointer" }}
						onClick={() => alert("Minimize clicked!")}
					/>
					<FiMaximize2 size={20} style={{ cursor: "pointer" }} />
					<RxCross2
						size={20}
						style={{ cursor: "pointer" }}
						onClick={() => destroyEntity(myKey)}
					/>
				</div>
			</nav>
			{children}
		</Rnd>
	);
}
