import { UseWindowManager } from "../WindowManager";
import app_list from "../../app_list.json";

export default function Desktop() {
	const { loadComponent } = UseWindowManager();

	return (
		<div
			style={{
				// border: "black solid 2px",
				width: "100%",
				height: "100%",
				padding: 0,
				gap: 10,
				display: "flex",
				flexDirection: "column",
				flexWrap: "wrap",
				backgroundImage:
					"linear-gradient(to right, rgb(151, 19, 129), rgb(200,0,0))",
			}}
		>
			{app_list.map(({ name, icon }, i) => {
				if (name.length > 15) name = name.slice(0, 15) + "...";
				return (
					<div
						style={{
							width: 100,
							height: 100,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							// flexWrap: "wrap",
							// backgroundColor: "black",
						}}
						onDoubleClick={() => loadComponent(i)}
						key={i}
					>
						<img src={icon} width={50} height={50} alt="" />
						<p
							style={{
								maxWidth: 70,
								wordBreak: "break-all",
								fontSize: 14,
								textAlign: "center",
								lineHeight: 1,
								marginTop: 5,
							}}
						>
							{name}
						</p>
					</div>
				);
			})}
		</div>
	);
}
