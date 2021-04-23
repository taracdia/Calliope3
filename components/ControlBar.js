import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import TrackPlayer, {
	TrackPlayerEvents,
	STATE_PLAYING,
} from "react-native-track-player";
import {
	useTrackPlayerProgress,
	useTrackPlayerEvents,
} from "react-native-track-player/lib/hooks";
import Slider from "@react-native-community/slider";
import { useSelector } from "react-redux";
import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions";

import { Styles, Theme } from "../Styles";
const songs = require("../songs.json");

const requestPermission = () => {
	request("storage")
		.then(response => {
			if (response !== RESULTS.GRANTED) {
				requestPermission();
			}
		})
		.catch(e => console.log(e));
};

const trackPlayerInit = async () => {
	await TrackPlayer.setupPlayer();
	TrackPlayer.updateOptions({
		stopWithApp: true,
		capabilities: [
			TrackPlayer.CAPABILITY_PLAY,
			TrackPlayer.CAPABILITY_PAUSE,
			TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
			TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
			TrackPlayer.CAPABILITY_SEEK_TO,
		],
		compactCapabilities: [
			TrackPlayer.CAPABILITY_PLAY,
			TrackPlayer.CAPABILITY_PAUSE,
			TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
			TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
			TrackPlayer.CAPABILITY_SEEK_TO,
		],
	});

	check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
		.then(result => {
			if (result === RESULTS.GRANTED) {
				console.log("granted");
			} else {
				requestPermission();
			}
		})
		.catch(e => {
			console.log(e);
		});

	await TrackPlayer.add(songs).catch(e => console.log(e.message));
	return true;
};

const song = {
	id: 0,
	url:
		"https://audio-previews.elements.envatousercontent.com/files/103682271/preview.mp3",
	title: "Song 0",
	album: "Great Album",
	artist: "A Great Dude",
	artwork: "https://picsum.photos/300",
};

const ControlBar = () => {
	const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [seekValue, setSeekValue] = useState(0);
	const [isSeeking, setIsSeeking] = useState(false);
	const { position } = useTrackPlayerProgress(1000);
	const [track, setTrack] = useState(song);

	const theme = useSelector(state => state);
	const primary = Theme().primary;
	useEffect(() => {
		const startPlayer = async () => {
			let isInit = await trackPlayerInit();
			setIsTrackPlayerInit(isInit);
		};
		startPlayer();
	}, []);

	//this hook updates the value of the slider whenever the current position of the song changes
	useEffect(() => {
		if (!isSeeking && position && track.duration) {
			setSeekValue(position / track.duration);
		}
	}, [position, track]);

	useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], event => {
		if (event.state === STATE_PLAYING) {
			setIsPlaying(true);
		} else {
			setIsPlaying(false);
		}
	});

	useEffect(() => {
		let mounted = true;

		// Set the initial track:
		(async () => {
			const trackId = await TrackPlayer.getCurrentTrack();
			if (!mounted || !trackId) return;
			const track = await TrackPlayer.getTrack(trackId);
			if (!mounted || !track) return;
			setTrack(track);
		})();

		// Set the track whenever the track changes:
		const listener = TrackPlayer.addEventListener(
			"playback-track-changed",
			async data => {
				const track = await TrackPlayer.getTrack(data.nextTrack);
				if (!mounted || !track) return;

				setTrack(track);
				//Start from the beginning
				TrackPlayer.seekTo(0);
				setSeekValue(0);
			}
		);
		return () => {
			mounted = false;
			listener.remove();
		};
	}, []);

	const playPausePressed = () => {
		if (!isPlaying) {
			TrackPlayer.play();
		} else {
			TrackPlayer.pause();
		}
	};

	const slidingStarted = () => {
		setIsSeeking(true);
	};

	const slidingCompleted = async value => {
		await TrackPlayer.seekTo(value * track.duration);
		setSeekValue(value);
		setIsSeeking(false);
	};

	const nextButton = async () => {
		await TrackPlayer.skipToNext().catch(e => console.log(e));
	};

	const prevButton = async () => {
		await TrackPlayer.skipToPrevious().catch(e => console.log(e));
	};

	const skipBackward = async () => {
		let newPosition = await TrackPlayer.getPosition();
		newPosition -= 10;
		if (newPosition < 0) {
			newPosition = 0;
		}
		TrackPlayer.seekTo(newPosition);
	};

	const skipForward = async () => {
		let newPosition = await TrackPlayer.getPosition();
		const duration = await TrackPlayer.getDuration();
		newPosition += 10;
		if (newPosition > duration) {
			newPosition = duration;
		}
		TrackPlayer.seekTo(newPosition);
	};

	const convertTime = input => {
		const minutes = Math.floor(input / 60);
		let secs = Math.floor(input % 60);
		if (secs < 10) {
			secs = "0" + secs;
		}
		return `${minutes}:${secs}`;
	};

	return (
		<View
			style={[
				{ alignSelf: "center", justifyContent: "center" },
				Styles.flex,
			]}
		>
			<View style={[Styles.flex, Styles.row, Styles.center]}>
				<Text style={primary}>{convertTime(position)}</Text>
				<Slider
					style={{ width: 300 }}
					minimumValue={0}
					maximumValue={1}
					value={seekValue}
					minimumTrackTintColor={theme.primary}
					maximumTrackTintColor={theme.primary}
					onSlidingStart={slidingStarted}
					onSlidingComplete={slidingCompleted}
					thumbTintColor={theme.primary}
				/>
				<Text style={primary}>{convertTime(track.duration)}</Text>
			</View>
			<View style={[Styles.center, Styles.flex, Styles.row]}>
				<TouchableOpacity
					onPress={prevButton}
					disabled={!isTrackPlayerInit}
				>
					<Image
						source={require("../icons/prev.png")}
						tintColor={theme.primary}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={skipBackward}
					disabled={!isTrackPlayerInit}
				>
					<Image
						source={require("../icons/backward10.png")}
						tintColor={theme.primary}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={playPausePressed}
					disabled={!isTrackPlayerInit}
				>
					<Image
						source={
							isPlaying
								? require("../icons/pause.png")
								: require("../icons/play.png")
						}
						tintColor={theme.primary}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={skipForward}
					disabled={!isTrackPlayerInit}
				>
					<Image
						source={require("../icons/forward10.png")}
						tintColor={theme.primary}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={nextButton}
					disabled={!isTrackPlayerInit}
				>
					<Image
						source={require("../icons/next.png")}
						tintColor={theme.primary}
					/>
				</TouchableOpacity>
				{/* TODO: volume and shuffle/sort and repeat */}
			</View>
		</View>
	);
};

export default ControlBar;
