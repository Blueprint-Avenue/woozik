import { useEffect, useState, useCallback } from "react";
import { useRecoilState } from "recoil";
import { playingTrackState, playState } from "../atoms/playerAtom";
import useSpotify from "./hooks/useSpotify";
import { useSession } from "next-auth/react";
import {
	FastForwardIcon,
	PauseIcon,
	PlayIcon,
	ReplyIcon,
	RewindIcon,
	SwitchHorizontalIcon,
	VolumeOffIcon,
	VolumeUpIcon,
} from "@heroicons/react/solid";
import { debounce } from "lodash";

function Player({ trackUri, chooseTrack }) {
	const { data: session } = useSession();
	const spotifyApi = useSpotify();
	const [play, setPlay] = useRecoilState(playState);
	const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
	const [volume, setVolume] = useState(50);

	useEffect(() => {
		if (trackUri) {
			setPlay(true);
		}
	}, [trackUri]);

	if (!spotifyApi) return null;

	const fetchCurrentSong = () => {
		spotifyApi.getMyCurrentPlayingTrack().then((data) => {
			console.log("Now playing: ", data.body?.item);
			setPlayingTrack(data.body?.item?.id);

			spotifyApi.getMyCurrentPlaybackState().then((data) => {
				setPlay(data.body?.play);
			});
		});
	};

	const handlePlay = () => {
		spotifyApi.getMyCurrentPlaybackState().then((data) => {
			if (data.body?.play) {
				spotifyApi.pause();
				setPlay(false);
			} else {
				spotifyApi.play();
				setPlay(true);
			}
		});
	};

	useEffect(() => {
		if (spotifyApi.getAccessToken() && !playingTrack) {
			fetchCurrentSong();
			setVolume(50);
		}
	}, [playingTrackState, spotifyApi, session]);

	useEffect(() => {
		if (volume > 0 && volume < 100) {
			debouncedAdjustVolume(volume);
		}
	}, [volume]);

	const debouncedAdjustVolume = useCallback(
		debounce((volume) => {
			spotifyApi.setVolume(volume).catch((err) => {});
		}, 500),
		[]
	);
	return (
		<div className="bg-[#346751] flex items-center justify-between px-5 py-2.5 relative space-x-20 md:space-x-0 overflow-x-scroll md:overflow-x-hidden scrollbar-hide rounded-t-2xl  border-t-2 border-r-2 border-l-2 border-[#161616]">
			{/* Left Side */}
			<div className="flex items-center space-x-4">
				<img
					className="h-14 rounded-xl mr-3"
					src={playingTrack?.albumUrl}
					alt=""
				/>
				<div>
					<h3 className="text-[#ECDBBA] text-sm max-w-[150px] md:max-w-[250px] truncate">
						{playingTrack?.title}
					</h3>
					<h4 className="text-[#ECDBBA] text-xs">{playingTrack?.artist}</h4>
				</div>
			</div>
			{/* Center */}
			<div className="flex flex-col space-y-2 items-center md:absolute inset-x-auto w-full">
				<div className="flex items-center text-xl space-x-4">
					<SwitchHorizontalIcon className="button" />
					<RewindIcon className="button" />
					{play ? (
						<PauseIcon onClick={handlePlay} className="button w-10 h-10" />
					) : (
						<PlayIcon onClick={handlePlay} className="button w-10 h-10" />
					)}
					<FastForwardIcon className="button" />
					<ReplyIcon className="button" />
				</div>
			</div>

			{/* Right */}
			<div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
				<VolumeOffIcon
					onClick={() => volume > 0 && setVolume(volume - 10)}
					className="button"
				/>
				<input
					className="w-14"
					type="range"
					value={volume}
					min={0}
					max={100}
					onChange={(e) => setVolume(Number(e.target.value))}
				/>
				<VolumeUpIcon
					onClick={() => volume < 100 && setVolume(volume + 10)}
					className="button"
				/>
			</div>
		</div>
	);
}
export default Player;
