const RandObject = () => (
	<div
		className="RandObject"
		style={{
			position: "absolute",
			top: `${Math.random() * 80}vh`,
			left: `${Math.random() * 80}vw`,
			backgroundColor: `rgb(${Math.random() * 200 + 55},${
				Math.random() * 200 + 55
			},${Math.random() * 200 + 55})`,
			width: Math.random() * 100 + 20,
			height: Math.random() * 100 + 20,
			borderTopLeftRadius: Math.random() * 100 + 20,
			borderTopRightRadius: Math.random() * 100 + 20,
			borderBottomLeftRadius: Math.random() * 100 + 20,
			borderBottomRightRadius: Math.random() * 100 + 20,
			cursor: "pointer",
		}}
	></div>
);
export default RandObject;
