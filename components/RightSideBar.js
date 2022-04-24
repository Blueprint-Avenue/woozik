import { HiOutlineShieldCheck } from "react-icons/hi";
import { MdOutlineSettings } from "react-icons/md";
import { BiBell } from "react-icons/bi";
import { ViewGridIcon } from "@heroicons/react/solid";
import Dropdown from "./Dropdown";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import RecentlyPlayed from "./RecentlyPlayed";
import useSpotify from "./hooks/useSpotify";
import spotifyApi from "../lib/spotify";

function RightSideBar({ chooseTrack }) {
	const { data: session } = useSession();
	spotifyApi = useSpotify();
	const [recentlyPlayed, setRecentlyPlayed] = useState([]);

	useEffect(() => {
		if (!spotifyApi) return;

		spotifyApi.getMyRecentlyPlayedTracks({ limit: 20 }).then((res) => {
			setRecentlyPlayed(
				res.body.items.map(({ track }) => {
					return {
						id: track.id,
						artist: track.artists[0].name,
						title: track.name,
						uri: track.uri,
						albumUrl: track.album.images[0].url,
					};
				})
			);
		});
	}, [session, spotifyApi]);

	console.log(recentlyPlayed);

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
			{/* Recent Played Tracks */}
			<div className="bg-[#346751] border-2 border-[#161616] p-4 rounded-xl space-y-4">
				<div className="flex items-center justify-between">
					<h4 className="text-[#ECDBBA] text-sm text-semibold">
						Recently Played
					</h4>
					<ViewGridIcon className="text-[#C84B31] h-6" />
				</div>
				{/* Song Components - recently played */}
				<div className="space-y-4 overflow-y-scroll overflow-x-hidden h-[250px] md:h-[400px] scrollbar-hide">
					{recentlyPlayed.map((track, index) => (
						<RecentlyPlayed
							key={index}
							track={track}
							chooseTrack={chooseTrack}
						/>
					))}
				</div>
				<button className="text-[#ECDBBA] bg-[#C84B31] text-[13px] py-3.5 px-4 rounded-2xl w-full font-bold bg-opacity-80 hover:bg-opacity-100 transition ease-out">
					View All
				</button>
			</div>
		</section>
	);
}

export default RightSideBar;
