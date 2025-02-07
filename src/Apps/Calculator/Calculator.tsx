// src/Calculator.tsx
import React, { useState } from "react";

const Calculator: React.FC = () => {
	const [input, setInput] = useState<string>("");
	const [history, setHistory] = useState<string[]>([]);

	const handleButtonClick = (value: string) => {
		setInput((prev) => prev + value);
	};

	const handleClear = () => {
		setInput("");
	};

	const handleCalculate = () => {
		try {
			const result = eval(input);
			setHistory((prev) => [input + " = " + result, ...prev]); // Store the calculation in history
			setInput(result.toString());
		} catch (error) {
			setInput("Error");
		}
	};

	const handleHistoryClick = (item: string) => {
		const expression = item.split(" = ")[0]; // Get the expression part
		setInput(expression); // Set the input to the expression
	};

	return (
		<div className="flex flex-col items-center justify-center h-full p-4 bg-gradient-to-br from-blue-200 to-blue-500 rounded-lg shadow-lg">
			<div className="bg-white shadow-md rounded-lg p-4 w-full h-full max-w-md flex flex-col">
				<div className="text-right text-4xl font-bold mb-4 text-gray-800 flex-grow">
					{input || "0"}
				</div>
				<div className="grid grid-cols-4 gap-2">
					{["7", "8", "9", "/"].map((item) => (
						<button
							key={item}
							className="bg-blue-600 text-white rounded-lg p-4 hover:bg-blue-700 transition duration-200 text-xl"
							onClick={() => handleButtonClick(item)}
						>
							{item}
						</button>
					))}
					{["4", "5", "6", "*"].map((item) => (
						<button
							key={item}
							className="bg-blue-600 text-white rounded-lg p-4 hover:bg-blue-700 transition duration-200 text-xl"
							onClick={() => handleButtonClick(item)}
						>
							{item}
						</button>
					))}
					{["1", "2", "3", "-"].map((item) => (
						<button
							key={item}
							className="bg-blue-600 text-white rounded-lg p-4 hover:bg-blue-700 transition duration-200 text-xl"
							onClick={() => handleButtonClick(item)}
						>
							{item}
						</button>
					))}
					{["0", ".", "=", "+"].map((item) => (
						<button
							key={item}
							className="bg-blue-600 text-white rounded-lg p-4 hover:bg-blue-700 transition duration-200 text-xl"
							onClick={
								item === "=" ? handleCalculate : () => handleButtonClick(item)
							}
						>
							{item}
						</button>
					))}
					<button
						className="col-span-4 bg-red-600 text-white rounded-lg p-4 hover:bg-red-700 transition duration-200 text-xl"
						onClick={handleClear}
					>
						Clear
					</button>
				</div>
				<div className="mt-4">
					<h2 className="text-lg font-semibold text-gray-800">History</h2>
					<div className="max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-2">
						{history.map((item, index) => (
							<button
								key={index}
								className="block text-left w-full text-blue-600 hover:bg-blue-100 p-1 rounded transition duration-200"
								onClick={() => handleHistoryClick(item)}
							>
								{item}
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Calculator;
