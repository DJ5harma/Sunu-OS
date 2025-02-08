import { MdLinearScale } from "react-icons/md";
import { TASKBAR_HEIGHT } from "../constants";
import { UseWindowManager } from "../WindowManager";
import app_list from "../../app_list.json";

export default function Taskbar() {
	const { entities, minimizeEntitySwitch, pushEntityForward } =
		UseWindowManager();

	const renderable = Object.entries(entities);
	if (renderable.length === 0)
		return (
			<p className="p-4 h-full text-center"> Double click to run an app</p>
		);

	let max_z_index_index = 0;
	for (let i = 1; i < renderable.length; ++i)
		if (renderable[i][1].z_index > renderable[max_z_index_index][1].z_index)
			max_z_index_index = i;

	function handleClick(i: number) {
		if (i === max_z_index_index)
			minimizeEntitySwitch(i, !entities[i].minimized);
		else pushEntityForward(i);
	}

	return (
		<div
			className="w-full flex gap-2.5 justify-center items-center"
			style={{
				height: TASKBAR_HEIGHT,
				backgroundImage:
					"linear-gradient(to up, rgb(36, 29, 35), rgb(109, 109, 109))",
			}}
		>
			{renderable.map(([key, value], i) => {
				return (
					<div
						key={key}
						className="flex flex-col items-center justify-center relative top-1 rounded-lg"
						style={{
							backgroundColor: i === max_z_index_index ? "gray" : "black",
							padding: "4px 6px",
						}}
						onClick={() => handleClick(i)}
					>
						<img
							src={app_list[value.app_list_index].icon}
							width={35}
							height={35}
							alt=""
							className="relative top-0.5"
						/>
						<MdLinearScale className="relative bottom-0.5" />
					</div>
				);
			})}
		</div>
	);
}
