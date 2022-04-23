import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Search from "./Search";
import Poster from "./Poster";
import useSpotify from "./hooks/useSpotify";

function Body({ chooseTrack }) {
	const spotifyApi = useSpotify();
	const { data: session } = useSession();
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [newReleases, setNewReleases] = useState([]);
	const [playlists, setPlaylists] = useState([]);

	// If I want to add playlists
	// useEffect(() => {
	// 	if (spotifyApi.getAccessToken()) {
	// 		spotifyApi.getUserPlaylists().then((data) => {
	// 			setPlaylists(data.body.items);
	// 		});
	// 	}
	// }, [session, spotifyApi]);

	useEffect(() => {
		if (!search) return setSearchResults([]);
		if (!spotifyApi) return;

		let cancel = false;

		spotifyApi.searchTracks(search).then((res) => {
			if (cancel) return;
			setSearchResults(
				res.body.tracks.items.map((track) => {
					return {
						id: track.id,
						artist: track.artists[0].name,
						title: track.name,
						uri: track.uri,
						albumUrl: track.album.images[0].url,
						popularity: track.popularity,
					};
				})
			);
		});
		return () => (cancel = true);
	}, [search, session, spotifyApi]);
	console.log(searchResults);

	useEffect(() => {
		if (!spotifyApi) return;

		spotifyApi.getNewReleases().then((res) => {
			setNewReleases(
				res.body.albums.items.map((track) => {
					return {
						id: track.id,
						artist: track.artists[0].name,
						title: track.name,
						uri: track.uri,
						albumUrl: track.images[0].url,
					};
				})
			);
		});
	}, [session, spotifyApi]);

	return (
		<section className="bg-[#C84B31] ml-24 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5 ">
			<Search search={search} setSearch={setSearch} />
			<div className="grid overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 p-4">
				{searchResults.length === 0
					? newReleases
							.slice(0, 6)
							.map((track) => (
								<Poster
									key={track.id}
									track={track}
									chooseTrack={chooseTrack}
								/>
							))
					: searchResults
							.slice(0, 6)
							.map((track) => (
								<Poster
									key={track.id}
									track={track}
									chooseTrack={chooseTrack}
								/>
							))}
			</div>
		</section>
	);
}

export default Body;
