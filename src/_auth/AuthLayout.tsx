import { Outlet, Navigate } from "react-router-dom";

import { useUserContext } from "@/context/AuthContext";

export default function AuthLayout() {
	const { isAuthenticated } = useUserContext();

	return (
		<>
			{isAuthenticated ? (
				<Navigate to="/" />
			) : (
				<>
					<section className="flex flex-1 justify-start items-center flex-col py-7 overflow-scroll no-scrollbar">
						<Outlet />
					</section>

					<img
						src="https://images.squarespace-cdn.com/content/v1/5c439fd8266c07ff148f5765/1600930807127-FF9KFI0HZO6YVLV8AV9R/Top+20+Social+Media+App+Inspiration+%231+-+10.jpg"
						alt="logo"
						className="hidden xl:block h-screen w-1/2 rounded-l-xl object-cover bg-no-repeat"
					/>
				</>
			)}
		</>
	);
}
