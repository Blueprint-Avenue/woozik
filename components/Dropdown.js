import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { LogoutIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import useSpotify from "./hooks/useSpotify";
import react from "react";

export default function Dropdown() {
	const { data: session } = useSession();

	return (
		<Menu as="div" className="w-24 h-12 relative flex items-center">
			<div className="w-full absolute right-1 group">
				<Menu.Button className="flex items-center w-full px-4 py-3 text-sm font-medium text-white bg-[#161616] rounded-full hover:bg-[#346751]">
					<ChevronDownIcon className="h-6 text-[#ECDBBA]" aria-hidden="true" />
					<img
						src={session.user.image}
						alt="profile image"
						className="rounded-full w-11 h-11 absolute -right-1 object-cover"
					/>
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute right-0 w-56 mt-24 origin-top-right bg-[#346751] divide-y divide-gray-400 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="px-1 py-1 ">
						<Menu.Item>
							{({ active }) => (
								<button
									className={`${
										active && "bg-[#346751]/10"
									} group flex rounded-md items-center w-full px-2 py-2 text-sm font-semibold tracking-wide text-[#ECDBBA] cursor-default`}
									onClick={() => signOut({ redirect: false })}
								>
									<LogoutIcon className="w-5 h-5 mr-2" aria-hidden="true" />
									Log out
								</button>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
