import app_list from "../../Apps/app_list.json";
import { useWindowManager } from "../WindowManager";

export default function Desktop() {
	const { loadComponent } = useWindowManager();

	return (
		<div
			style={{
				border: "black solid 2px",
				width: "100%",
				height: "100%",
			}}
		>
			{app_list.map(({ name }, i) => {
				return (
					<div
						style={{
							backgroundColor: "black",
							padding: 20,
							width: "fit-content",
						}}
						onDoubleClick={() => loadComponent(i)}
						key={i}
					>
						{name}
					</div>
				);
			})}
		</div>
	);
}
