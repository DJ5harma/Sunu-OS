import { useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import app_list from "../../app_list.json";
import { FiEyeOff } from "react-icons/fi";
import { WINDOW_TOPBAR_HEIGHT } from "../constants";

export default function Contributor({
	app_list_index,
}: {
	app_list_index: number;
}) {
	const { contributor } = app_list[app_list_index];

	const [isHovered, setIsHovered] = useState(false);

	return (
		<>
			<div className="cursor-pointer" onClick={() => setIsHovered((p) => !p)}>
				<IoMdInformationCircleOutline size={WINDOW_TOPBAR_HEIGHT - 20} />
			</div>

			{isHovered && (
				<div className="flex items-center gap-2">
					<p>
						by {contributor.good_name} :{" "}
						<a
							href={"https://" + contributor.url}
							target="_blank"
							className="text-blue-400"
						>
							{contributor.url}
						</a>
					</p>
					<FiEyeOff
						size={20}
						onClick={() => setIsHovered(false)}
						className="cursor-pointer"
					/>
				</div>
			)}
		</>
	);
}
