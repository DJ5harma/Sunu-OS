import { ReactNode } from "react";

export default function Window({ children }: { children: ReactNode }) {
	return (
		<div
			style={{
				width: window.innerWidth / 2,
				height: window.innerHeight / 2,
				position: "absolute",
				top: window.innerHeight / 4,
				left: window.innerWidth / 4,
				//
				border: "solid red",
			}}
		>
			{children}
		</div>
	);
}
