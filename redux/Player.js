// import TrackPlayer, {
// 	TrackPlayerEvents,
// 	STATE_PLAYING,
// } from "react-native-track-player";
// import {
// 	useTrackPlayerProgress,
// 	useTrackPlayerEvents,
// } from "react-native-track-player/lib/hooks";

// export const CHANGE_PRIMARY = "CHANGE_PRIMARY";

// const initialState = {
// 	//THEME HERE TODO
// 	//primary
// 	//background
// 	player: "black",
// };

// const PlayerReducer = (state = initialState, action) => {
// 	switch (action.type) {
// 		case CHANGE_PRIMARY:
// 			return { ...state, primary: action.payload };
// 		default:
// 			return state;
// 	}
// };

// export default PlayerReducer;

// const trackPlayerInit = async () => {
// 	await TrackPlayer.setupPlayer();
// 	TrackPlayer.updateOptions({
// 		stopWithApp: true,
// 		capabilities: [
// 			TrackPlayer.CAPABILITY_PLAY,
// 			TrackPlayer.CAPABILITY_PAUSE,
// 			TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
// 			TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
// 			TrackPlayer.CAPABILITY_SEEK_TO,
// 		],
// 		compactCapabilities: [
// 			TrackPlayer.CAPABILITY_PLAY,
// 			TrackPlayer.CAPABILITY_PAUSE,
// 			TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
// 			TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
// 			TrackPlayer.CAPABILITY_SEEK_TO,
// 		],
// 	});
// 	await TrackPlayer.add(songs).catch(e => console.log(e.message));
// 	return true;
// };

// const ControlBar = () => {
// 	const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
// 	const [isPlaying, setIsPlaying] = useState(false);
// 	const [seekValue, setSeekValue] = useState(0);
// 	const [isSeeking, setIsSeeking] = useState(false);
// 	const { position } = useTrackPlayerProgress(1000);
// 	const [track, setTrack] = useState(song);

// 	const theme = useSelector(state => state);
// 	const primary = Theme().primary;
// 	useEffect(() => {
// 		const startPlayer = async () => {
// 			let isInit = await trackPlayerInit();
// 			setIsTrackPlayerInit(isInit);
// 		};
// 		startPlayer();
// 	}, []);

// 	//this hook updates the value of the slider whenever the current position of the song changes
// 	useEffect(() => {
// 		if (!isSeeking && position && track.duration) {
// 			setSeekValue(position / track.duration);
// 		}
// 	}, [position, track]);

// 	useEffect(() => {
// 		let mounted = true;

// 		// Set the initial track:
// 		(async () => {
// 			const trackId = await TrackPlayer.getCurrentTrack();
// 			if (!mounted || !trackId) return;
// 			const track = await TrackPlayer.getTrack(trackId);
// 			if (!mounted || !track) return;
// 			setTrack(track);
// 		})();

// 		// Set the track whenever the track changes:
// 		const listener = TrackPlayer.addEventListener(
// 			"playback-track-changed",
// 			async data => {
// 				const track = await TrackPlayer.getTrack(data.nextTrack);
// 				if (!mounted || !track) return;

// 				setTrack(track);
// 				//Start from the beginning
// 				TrackPlayer.seekTo(0);
// 				//set slider to 0
// 			}
// 		);
// 		return () => {
// 			mounted = false;
// 			listener.remove();
// 		};
// 	}, []);

// 	const playPausePressed = () => {
// 		if (!isPlaying) {
// 			TrackPlayer.play();
// 		} else {
// 			TrackPlayer.pause();
// 		}
// 	};

// 	const slidingStarted = () => {
// 		setIsSeeking(true);
// 	};

// 	const slidingCompleted = async value => {
// 		await TrackPlayer.seekTo(value * track.duration);
// 		setSeekValue(value);
// 		setIsSeeking(false);
// 	};

// 	const nextButton = async () => {
// 		await TrackPlayer.skipToNext().catch(e => console.log(e));
// 	};

// 	const prevButton = async () => {
// 		await TrackPlayer.skipToPrevious().catch(e => console.log(e));
// 	};

// 	const skipBackward = async () => {
// 		let newPosition = await TrackPlayer.getPosition();
// 		newPosition -= 10;
// 		if (newPosition < 0) {
// 			newPosition = 0;
// 		}
// 		TrackPlayer.seekTo(newPosition);
// 	};

// 	const skipForward = async () => {
// 		let newPosition = await TrackPlayer.getPosition();
// 		const duration = await TrackPlayer.getDuration();
// 		newPosition += 10;
// 		if (newPosition > duration) {
// 			newPosition = duration;
// 		}
// 		TrackPlayer.seekTo(newPosition);
// 	};
