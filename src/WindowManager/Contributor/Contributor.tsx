import app_list from "../../app_list.json";

export default function Contributor({
	app_list_index,
}: {
	app_list_index: number;
}) {
	if (app_list_index >= app_list.length) return null;

	const { good_name, github_username } = app_list[app_list_index].contributor;

	return (
		<div className="flex gap-2 select-all">
			by <b>{good_name}</b>:
			<a
				href={`https://github.com/${github_username}`}
				className="text-blue-300"
				target="_blank"
			>
				github.com/{github_username}
			</a>
		</div>
	);
}
