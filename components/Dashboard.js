import SpotifyWebApi from "spotify-web-api-node";
import LeftSideBar from "./LeftSideBar";
import Body from "./Body";
import RightSideBar from "./RightSideBar";

const spotifyApi = new SpotifyWebApi({
	clientId: process.env.SPOTIFY_CLIENT_ID,
});

function Dashboard() {
	return (
		<main>
			<LeftSideBar />
			<Body spotifyApi={spotifyApi} />
			<RightSideBar />
		</main>
	);
}

export default Dashboard;
