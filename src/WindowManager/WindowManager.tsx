import { createContext, ReactNode, useContext, useState } from "react";
import Window from "./Window/Window";
import { TASKBAR_HEIGHT } from "./constants";
import Taskbar from "./Taskbar/Taskbar";
import Desktop from "./Desktop/Desktop";
import app_list from "../app_list.json";

type EntityMap = {
	[key: number]: {
		app_list_index: number;
		minimized: boolean;
		component: ReactNode;
		z_index: number;
	};
};
export type Entity = {
	app_list_index: number;
	minimized: boolean;
	component: ReactNode;
	z_index: number;
};

const context = createContext<{
	entities: EntityMap;
	loadComponent: (index_in_app_list: number) => void;
	destroyEntity: (key: number) => void;
	pushEntityForward: (key: number) => void;
	minimizeEntitySwitch: (key: number, minimize: boolean) => void;
}>({
	entities: {},
	loadComponent: (_index_in_app_list: number) => {},
	destroyEntity: (_key: number) => {},
	pushEntityForward: (_key: number) => {},
	minimizeEntitySwitch: (_key: number, _minimize: boolean) => {},
});

export const UseWindowManager = () => useContext(context);

export default function WindowManager() {
	const [window_counter, set_window_counter] = useState(0);

	const [entities, setEntities] = useState<EntityMap>({});

	async function loadComponent(app_list_index: number) {
		if (app_list_index >= app_list.length) return;

		const project = app_list[app_list_index];

		if (project.iframe) {
			addEntity(<iframe src={project.iframe}></iframe>, app_list_index);
		}
	}

	function addEntity(component: ReactNode, app_list_index: number) {
		setEntities((prevEntities) => ({
			...prevEntities,
			[window_counter]: {
				app_list_index,
				component,
				minimized: false,
				z_index: window_counter,
			},
		}));
		set_window_counter((prev) => prev + 1);
	}

	function destroyEntity(key: number) {
		setEntities((prevEntities) => {
			const newEntities = { ...prevEntities };
			delete newEntities[key]; // a fresh object is created
			return newEntities;
		});
	}

	function pushEntityForward(key: number) {
		setEntities((prevEntities) => {
			prevEntities[key].z_index = window_counter;
			return { ...prevEntities };
		});

		set_window_counter((prev) => prev + 1);
	}

	function minimizeEntitySwitch(key: number, minimize: boolean) {
		setEntities((prevEntities) => {
			const newEntities = { ...prevEntities };
			newEntities[key].minimized = minimize;
			return { ...newEntities };
		});
	}

	return (
		<context.Provider
			value={{
				entities,
				loadComponent,
				destroyEntity,
				pushEntityForward,
				minimizeEntitySwitch,
			}}
		>
			<div
				style={{
					color: "white",
					backgroundColor: "#242424",
				}}
			>
				<div
					style={{
						width: `100vw`,
						height: `calc(100vh - ${TASKBAR_HEIGHT}px)`,
						top: 0,
						left: 0,
						// border: "solid green",
						overflow: "hidden",
					}}
				>
					<Desktop />
					{Object.entries(entities).map(([key, value]) => {
						if (value.minimized) return null;
						return (
							<Window
								key={key}
								myKey={Number(key)}
								myEntity={value}
								z_index={value.z_index}
							>
								{value.component}
							</Window>
						);
					})}
				</div>
				<Taskbar />
			</div>
		</context.Provider>
	);
}
