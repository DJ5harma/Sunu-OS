import { useEffect } from "react";
import GameSnippet from "./GameSnippet";

import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
	const imageWidth = 30;
	useEffect(() => {
		document.title = "WebGames";
	}, []);
	return (
		<div id="Home">
			<h1>Games... by Dhananjay </h1>
			<p>( More to be added )</p>
			<div style={{ width: "100vw", margin: "10px 0" }}>
				<GameSnippet
					linkPath="/save-the-ship"
					name="Save the Ship"
					description="Avoid ship crash by changing the path onTap"
					bgColor="rgb(0,0,100)"
					image={
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
							width={imageWidth}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
							/>
						</svg>
					}
				/>
				<GameSnippet
					linkPath="/zero-kaanta"
					name="Zero Kaanta"
					description="Just another Tic-Tac-Toe..."
					bgColor="rgb(0,100,0)"
					image={
						<svg
							width={imageWidth}
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M9 21h2l1-5h4l-1 5h2l1-5h3v-2h-3.6l1-5H21V7h-3.6l1-5h-2l-1 5h-4l1-5h-2l-1 5H6v2h3.6l-1 5H3v2h3.6l-1 5zm3-7l1-5h4l-1 5h-4z"
								fill="white"
							/>
						</svg>
					}
				/>
				<GameSnippet
					linkPath="/pebble-popper"
					name="Pebble Popper"
					description="Accurately pop pebbles asap for satisfaction!"
					bgColor="rgb(100,0,0)"
					image={
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
							width={imageWidth}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59"
							/>
						</svg>
					}
				/>
			</div>
			<button>
				<Link to="/about" style={{ textDecoration: "none" }}>
					About me
				</Link>
			</button>
		</div>
	);
}
