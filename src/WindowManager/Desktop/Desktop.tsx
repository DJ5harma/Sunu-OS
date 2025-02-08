import { UseWindowManager } from "../WindowManager";
import app_list from "../../app_list.json";

const IconWrapper = ({
	name,
	icon,
	i,
}: {
	name: string;
	icon: string;
	i: number;
}) => {
	const { loadComponent } = UseWindowManager();

	return (
		<div
			className="w-28 h-28 flex flex-col items-center justify-center hover:backdrop-grayscale-25 cursor-pointer"
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
};

export default function Desktop() {
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
				return <IconWrapper name={name} icon={icon} i={i} />;
			})}
		</div>
	);
}
