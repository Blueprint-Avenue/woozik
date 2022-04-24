import LeftSideBar from "./LeftSideBar";
import Body from "./Body";
import RightSideBar from "./RightSideBar";
import { useRecoilState } from "recoil";
import { playingTrackState, playState } from "../atoms/playerAtom";
import { useSession } from "next-auth/react";
import useSpotify from "./hooks/useSpotify";
import spotifyApi from "../lib/spotify";
import { useState, useEffect } from "react";
import Player from "./Player";

function Dashboard() {
	const { data: session } = useSession();
	const spotifyApi = session;

	const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
	const [showPlayer, setShowPlayer] = useState(false);

	useEffect(() => {
		setShowPlayer(true);
	}, []);

	const chooseTrack = (track) => {
		setPlayingTrack(track);
	};

	return (
		<main className="flex min-h-screen min-w-max bg-[#C84B31] lg:pb-24">
			<LeftSideBar />
			<Body chooseTrack={chooseTrack} />
			<RightSideBar chooseTrack={chooseTrack} />

			{showPlayer && (
				<div className="fixed bottom-0 left-0 right-0 z-50">
					<Player
						spotifyApi={spotifyApi}
						trackUri={playingTrack?.uri}
						chooseTrack={chooseTrack}
					/>
				</div>
			)}
		</main>
	);
}

export default Dashboard;
