import { createContext, ReactNode, useContext, useState } from "react";
import Window from "./components/Window";

const context = createContext<{
	entities: {
		[key: number]: {
			minimized: boolean;
			component: ReactNode;
			z_index: number;
		};
	};
	addEntity: (component: ReactNode) => void;
	destroyEntity: (key: number) => void;
	pushEntityForward: (key: number) => void;
}>({
	entities: {},
	addEntity: (_component: ReactNode) => {},
	destroyEntity: (_key: number) => {},
	pushEntityForward: (_key: number) => {},
});
export const useWindowManager = () => useContext(context);

export default function WindowManager() {
	const [window_counter, set_window_counter] = useState(0);

	const [entities, setEntities] = useState<{
		[key: number]: {
			minimized: boolean;
			component: ReactNode;
			z_index: number;
		};
	}>({});

	function addEntity(component: ReactNode) {
		setEntities((prevEntities) => ({
			...prevEntities,
			[window_counter]: {
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
		console.log(entities);
	}

	return (
		<context.Provider
			value={{ entities, addEntity, destroyEntity, pushEntityForward }}
		>
			<div>
				<button onClick={() => addEntity(<div>Hello {window_counter}</div>)}>
					Click
				</button>

				{Object.entries(entities).map(([key, value]) => (
					<Window myKey={Number(key)} z_index={value.z_index}>
						{value.component}
					</Window>
				))}
			</div>
		</context.Provider>
	);
}
