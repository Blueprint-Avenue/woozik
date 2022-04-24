import { ThreeBounce } from "better-react-spinkit";
import Image from "next/image";
import img from "../Assets/Wu.png";

function Loader() {
	return (
		<div className="h-screen bg-[#346751]">
			<div className="pt-40 flex flex-col items-center space-y-4">
				<span className="relative w-[400px] h-[250px] lg:w-[550px] lg:h-[240px]">
					<Image
						src={img}
						width={300}
						height={600}
						objectFit="contain"
						className="animate-pulse"
					/>
				</span>
				<ThreeBounce size={23} color="#C84B31" />
			</div>
		</div>
	);
}

export default Loader;
