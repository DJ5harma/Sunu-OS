import app_list from "../../Apps/app_list.json";
export default function extract_icon_url(app_list_index: number) {
	const icon = app_list[app_list_index].icon;

	return (
		icon.external_source ||
		"https://www.freeiconspng.com/uploads/apps-android-icon-png-10.png"
	);
}
