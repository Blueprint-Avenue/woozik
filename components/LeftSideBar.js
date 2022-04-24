import Image from "next/image";
import img from "../Assets/Wu.png";
import {
	ChartBarIcon,
	ClockIcon,
	DotsHorizontalIcon,
	HomeIcon,
} from "@heroicons/react/solid";
import { FaMicrophoneAlt } from "react-icons/fa";
import { RiCompassFill } from "react-icons/ri";

function LeftSideBar() {
	return (
		<section className="fixed top-0 z-40 flex flex-col p-4 items-center bg-[#346751] w-[90px] h-screen space-y-8 border-r-2 border-[#161616]">
			<Image src={img} width={56} height={56} objectFit="contain" />
			<div className="flex flex-col space-y-8">
				<HomeIcon className="sidebarIcon text-[#C84B31] opacity-[0.85]" />
				<RiCompassFill className="sidebarIcon text-2xl" />
				<FaMicrophoneAlt className="sidebarIcon ml-1" />
				<ChartBarIcon className="sidebarIcon" />
				<ClockIcon className="sidebarIcon " />
				<DotsHorizontalIcon className="sidebarIcon " />
			</div>
		</section>
	);
}

export default LeftSideBar;
