import { UseWindowManager } from "../WindowManager";
import app_list from "../../app_list.json";

export default function Desktop() {
	const { loadComponent } = UseWindowManager();

	return (
		<div
			className="w-full h-full flex flex-col flex-wrap"
			style={{
				backgroundImage:
					"linear-gradient(to right, rgb(151, 19, 129), rgb(200,0,0))",
			}}
		>
			{app_list.map(({ name, icon }, i) => {
				if (name.length > 15) name = name.slice(0, 15) + "...";
				return (
					<div
						className="w-28 h-28 flex flex-col items-center justify-center"
						onDoubleClick={() => loadComponent(i)}
						key={i}
					>
						<img src={icon} width={50} height={50} alt="" />
						<p
							className="max-w-20 break-all text-sm text-center"
							style={{
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
