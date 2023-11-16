import { useRef } from "react";
import { GridPostList } from ".";

const Stories = ({ items }: any) => {
	const rowRef = useRef<HTMLDivElement>(null);

	const handleClick = (direction: "left" | "right") => {
		if (rowRef.current) {
			const { scrollLeft, clientWidth } = rowRef.current;

			const scrollTo =
				direction === "left"
					? scrollLeft - clientWidth
					: scrollLeft + clientWidth;

			rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
		}
	};

	console.log(items?.documents);

	return (
		<>
			<div className="stories flex items-start justify-between w-full mx-auto  relative">
				<div className="leftNavigate" onClick={() => handleClick("left")}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 19.5L8.25 12l7.5-7.5"
						/>
					</svg>
				</div>

				<div
					className=" flex w-full gap-4 overflow-x-auto no-scrollbar"
					ref={rowRef}
				>
					<GridPostList isStory={true} posts={items.documents} />
				</div>

				<div className="rightNavigate" onClick={() => handleClick("right")}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M8.25 4.5l7.5 7.5-7.5 7.5"
						/>
					</svg>
				</div>
			</div>
		</>
	);
};

export default Stories;
