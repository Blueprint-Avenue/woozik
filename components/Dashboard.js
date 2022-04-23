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
		<main>
			<LeftSideBar />
			<Body chooseTrack={chooseTrack} />
			<RightSideBar />
		</main>
	);
}

export default Dashboard;
