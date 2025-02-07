import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div
			style={{
				padding: 40,
				display: "flex",
				flexDirection: "column",
				gap: 10,
			}}
		>
			<h1>Error Code: 404 {"=>"} Page Not Found!</h1>
			<h3>It seems like you are on an invalid address.</h3>
			<Link to="/" style={{ textDecoration: "none" }}>
				<button style={{ width: "100%" }}>Go Home</button>
			</Link>
		</div>
	);
}
