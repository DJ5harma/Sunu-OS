import { createContext, ReactNode, useState } from "react";
import Window from "./components/Window";

const context = createContext<{
	entities: { [key: number]: ReactNode };
	addEntity: (_component: ReactNode) => void;
}>({
	entities: {},
	addEntity: (_component: ReactNode) => {},
});

export default function WindowManager() {
	const [window_counter, setWindowCounter] = useState(0);

	const [entities, setEntities] = useState<{ [key: number]: ReactNode }>({});

	function addEntity(component: ReactNode) {
		setWindowCounter(window_counter + 1);
		entities[window_counter] = component;
		setEntities({ ...entities });

		console.log(entities);
	}

	function destroyEntity(key: number) {
		delete entities[window_counter];
		setEntities({ ...entities });
	}

	function renderEntities() {}

	return (
		<div>
			<button onClick={() => addEntity(<div>Hello {window_counter}</div>)}>
				Click
			</button>

			{Object.values(entities).map((component, key) => {
				return (
					<Window key={key}>
						<div>{component}</div>;
					</Window>
				);
			})}
		</div>
	);
}
