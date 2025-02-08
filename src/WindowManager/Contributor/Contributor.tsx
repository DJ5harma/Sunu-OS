import { useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import app_list from "../../app_list.json";
import { FiEyeOff } from "react-icons/fi";
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
				<IoMdInformationCircleOutline size={30} />
			</div>

			{isHovered && (
				<div className="flex items-center gap-2">
					<p>
						by {contributor.good_name} :{" "}
						<a
							href={`https://github.com/${contributor.github_username}`}
							target="_blank"
							className="text-blue-400"
						>
							{contributor.github_username}
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
