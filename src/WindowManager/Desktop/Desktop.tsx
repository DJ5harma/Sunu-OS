import app_list from "../../Apps/app_list.json";
import extract_icon_url from "../utils/extract_icon_url";
import { UseWindowManager } from "../WindowManager";

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
			{app_list.map(({ name }, i) => {
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
						<img src={extract_icon_url(i)} width={50} height={50} alt="" />
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
