import React, { useEffect, useState } from "react";
import { View, Image, Text } from "react-native";
import { useSelector } from "react-redux";
import TrackPlayer, {
	TrackPlayerEvents,
	STATE_PLAYING,
} from "react-native-track-player";
import {
	useTrackPlayerProgress,
	useTrackPlayerEvents,
} from "react-native-track-player/lib/hooks";

import { Styles, Theme } from "../Styles";
import ScreenChanger from "../components/ScreenChanger";
import ControlBar from "../components/ControlBar";

const SingleSong = () => {
	const theme = useSelector(state => state);
	const primary = Theme().primary;
	const [track, setTrack] = useState({});

	useEffect(() => {
		let mounted = true;

		const listener = TrackPlayer.addEventListener(
			"playback-track-changed",
			async data => {
				const track = await TrackPlayer.getTrack(data.nextTrack);
				if (!mounted || !track) return;
				setTrack(track);
			}
		);
		return () => {
			mounted = false;
			listener.remove();
		};
	});

	return (
		<View
			style={[
				{ alignSelf: "center", justifyContent: "center" },
				Styles.flex,
			]}
		>
			<View style={[Styles.center, Styles.flex]}>
				<Image
					source={{
						uri: track.artwork,
					}}
					resizeMode="contain"
					style={[Styles.center, Styles.flex, Styles.albumImage]}
				/>
			</View>
			<View style={[Styles.center, Styles.flex]}>
				<Text style={[Styles.bigBold, primary]}>{track.title}</Text>
				<Text style={primary}>by {track.artist}</Text>
				<Text style={primary}>from {track.album}</Text>
			</View>
			<ControlBar />
			<ScreenChanger />
		</View>
	);
};

//TODO: display lyrics instead sometimes

export default SingleSong;
