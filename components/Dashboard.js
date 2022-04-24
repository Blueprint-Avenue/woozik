import LeftSideBar from "./LeftSideBar";
import Body from "./Body";
import RightSideBar from "./RightSideBar";
import { useRecoilState } from "recoil";
import { playingTrackState, playState } from "../atoms/playerAtom";

function Dashboard() {
	const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

	const chooseTrack = (track) => {
		setPlayingTrack(track);
	};

	return (
		<main className="flex min-h-screen min-w-max bg-[#C84B31] lg:pb-24">
			<LeftSideBar />
			<Body chooseTrack={chooseTrack} />
			<RightSideBar chooseTrack={chooseTrack} />
		</main>
	);
}

export default Dashboard;
