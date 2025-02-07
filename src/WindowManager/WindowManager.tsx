import { createContext, ReactNode, useContext, useState } from "react";
import Window from "./Window/Window";
import { TASKBAR_HEIGHT } from "./constants";
import Taskbar from "./Taskbar/Taskbar";
import Desktop from "./Desktop/Desktop";
import app_list from "../Apps/app_list.json";

const context = createContext<{
	entities: {
		[key: number]: {
			app_list_index: number;
			minimized: boolean;
			component: ReactNode;
			z_index: number;
		};
	};
	loadComponent: (index_in_app_list: number) => void;
	destroyEntity: (key: number) => void;
	pushEntityForward: (key: number) => void;
	minimizeEntity: (key: number) => void;
}>({
	entities: {},
	loadComponent: (_index_in_app_list: number) => {},
	destroyEntity: (_key: number) => {},
	pushEntityForward: (_key: number) => {},
	minimizeEntity: (_key: number) => {},
});
export const useWindowManager = () => useContext(context);

export default function WindowManager() {
	const [window_counter, set_window_counter] = useState(0);

	const [entities, setEntities] = useState<{
		[key: number]: {
			app_list_index: number;
			minimized: boolean;
			component: ReactNode;
			z_index: number;
		};
	}>({});

	async function loadComponent(app_list_index: number) {
		if (app_list_index >= app_list.length) return;

		const path_from_app_list = app_list[app_list_index].main; // Get path_from_app_list from JSON
		if (path_from_app_list) {
			try {
				const { default: LoadedComponent } = await import(
					"../Apps/" + path_from_app_list
				);
				addEntity(LoadedComponent(), app_list_index);
			} catch (error) {
				console.error("Error loading component:", error);
			}
		} else {
			console.error("Component not found for number:", app_list_index);
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

	function minimizeEntity(key: number) {
		setEntities((prevEntities) => {
			const newEntities = { ...prevEntities };
			newEntities[key].minimized = true;
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
				minimizeEntity,
			}}
		>
			<div>
				<div
					style={{
						position: "relative",
						width: `100vw`,
						height: `calc(100vh - ${TASKBAR_HEIGHT}px)`,
						top: 0,
						left: 0,
						border: "solid green",
						overflow: "hidden",
					}}
				>
					<Desktop />
					{/* <button onClick={() => addEntity(<div>Hello {window_counter}</div>)}>
						Click
					</button> */}
					{Object.entries(entities).map(([key, value]) => {
						if (value.minimized) return null;
						return (
							<Window key={key} myKey={Number(key)} z_index={value.z_index}>
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
