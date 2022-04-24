import useSpotify from "./useSpotify";
import { playingTrackState } from "../../atoms/playerAtom";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";

function useSongInfo() {
	const spotifyApi = useSpotify();
	const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
	const [songInfo, setSongInfo] = useState(null);

	useEffect(() => {
		const fetchSongInfo = async () => {
			if (playingTrack) {
				const trackInfo = await fetch(
					`https://api.spotify.com/v1/tracks/${playingTrack}`,
					{
						headers: {
							Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
						},
					}
				).then((res) => res.json());
				setSongInfo(trackInfo);
			}
		};
		fetchSongInfo();
	}, [playingTrack, spotifyApi]);

	return songInfo;
}

export default useSongInfo;
