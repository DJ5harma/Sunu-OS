import app_list from "../../Apps/app_list.json";
import { useWindowManager } from "../WindowManager";

export default function Desktop() {
	const { loadComponent } = useWindowManager();

	function extract_icon(i: number) {
		const icon = app_list[i].icon;
		if (icon.external_source)
			return <img src={icon.external_source} width={50} height={50} alt="" />;
	}

	return (
		<div
			style={{
				border: "black solid 2px",
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
						{extract_icon(i)}
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
