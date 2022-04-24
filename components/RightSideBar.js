import { HiOutlineShieldCheck } from "react-icons/hi";
import { MdOutlineSettings } from "react-icons/md";
import { BiBell } from "react-icons/bi";
import { ViewGridIcon } from "@heroicons/react/solid";
import Dropdown from "./Dropdown";
// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import RecentlyPlayed from "./RecentlyPlayed";

function RightSideBar() {
	return (
		<section className="p-4 space-y-8 pr-8">
			<div className="flex space-x-2 items-center justify-between">
				{/* Home Icons */}
				<div className="flex items-center space-x-4 border-2 border-[#161616] rounded-full h-12 py-3 px-4">
					<HiOutlineShieldCheck className="text-[#ECDBBA] text-xl" />
					<MdOutlineSettings className="text-[#ECDBBA] text-xl" />
					<BiBell className="text-[#ECDBBA] text-xl" />
				</div>
				{/* Profile Login/Logout */}
				<Dropdown />
			</div>
		</section>
	);
}

export default RightSideBar;
