import { ImHeadphones } from "react-icons/im";
import { AiFillHeart } from "react-icons/ai";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { useState } from "react";
import { playingTrackState, playState } from "../atoms/playerAtom";
import { useRecoilState } from "recoil";

function Track({ track, chooseTrack }) {
	const [hasLiked, setHasLiked] = useState(false);

	const [play, setPlay] = useRecoilState(playState);
	const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

	const handlePlay = () => {
		chooseTrack(track);

		if (track.uri === playingTrack.uri) {
			setPlay(!play);
		}
	};

	return (
		<div className="flex items-center justify-between space-x-20 cursor-default hover:bg-[#ECDBBA]/10 py-2 px-4 rounded-lg group transition ease-out">
			{/* Lefthand Side */}
			<div className="flex items-center">
				<img
					className="rounded-xl h-12 w-12 object-cover mr-3"
					src={track.albumUrl}
					alt="Artist Album"
				/>
				<div>
					<h4 className="text-[#ECDBBA] text-sm font-extrabold truncate w-[450px]">
						{track.title}
					</h4>
					<p className="text-[#ECDBBA] text-[13px] font-semibold group-hover:text-white">
						{track.artist}
					</p>
				</div>
			</div>
			{/* Right Side */}
			<div className="md:ml-auto flex items-center space-x-2.5">
				<div className="text-[#ECDBBA] flex space-x-1 text-sm font-semibold">
					<ImHeadphones className="text-lg" />
					<h4>{track.popularity}</h4>
				</div>
				<div className="flex items-center rounded-full border-2 border-[#161616] w-[85px] h-10 relative cursor-pointer group-hover:border-[#ECDBBA]/40">
					<AiFillHeart
						className={`text-xl ml-3 icon ${
							hasLiked ? "text-[#C84B31]" : "text-[#EEEBDD]"
						}`}
						onClick={() => setHasLiked(!hasLiked)}
					/>
					{track.uri === playingTrack.uri && play ? (
						<div className="h-10 w-10 rounded-full border border-[#C84B31] flex items-center justify-center absolute -right-0.5 bg-[#C84B31] icon hover:scale-110 text-[#ECDBBA]">
							<BsFillPauseFill className=" text-[#ECDBBA]text-xl" />
						</div>
					) : (
						<div
							className="h-10 w-10 rounded-full border border-[#ECDBBA]/60 flex items-center justify-center absolute -right-0.5 hover:bg-[#C84B31] hover:border-[#C84B31] icon hover:scale-110 text-[#ECDBBA]"
							onClick={handlePlay}
						>
							<BsFillPlayFill className="text-xl ml-[1px]" />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Track;
