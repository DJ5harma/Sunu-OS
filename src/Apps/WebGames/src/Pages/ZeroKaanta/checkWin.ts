import { Dispatch, SetStateAction } from "react";

export default function checkWin(
	array: (" " | "O" | "X")[],
	setWinningBoxes: Dispatch<SetStateAction<number[]>>
) {
	function areEqual(n1: number, n2: number, n3: number) {
		if (array[n1] === " ") return false;
		if (
			array[n1] === array[n2] &&
			array[n2] === array[n3] &&
			array[n3] === array[n1]
		) {
			setWinningBoxes([n1, n2, n3]);
			return true;
		}
	}
	if (
		areEqual(0, 1, 2) ||
		areEqual(3, 4, 5) ||
		areEqual(6, 7, 8) ||
		//
		areEqual(0, 3, 6) ||
		areEqual(1, 4, 7) ||
		areEqual(2, 5, 8) ||
		//
		areEqual(0, 4, 8) ||
		areEqual(2, 4, 6)
	)
		return true;
	return false;
}
