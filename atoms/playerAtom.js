import { atom } from "recoil";

export const playState = atom({
	key: "playState",
	default: false,
});

export const playingTrackState = atom({
	key: "playingTrackState",
	default: "",
});

// export const currentTrackIdState = atom({
// 	key:"currenTrackIdState",
// 	default: null
// })

// export const isPlayingState = atom({
// 	key: "isPlayingState",
// 	default: false,
// });
