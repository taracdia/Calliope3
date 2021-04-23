import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as MediaLibrary from "expo-media-library";
import RNMusicMetadata from "react-native-music-metadata";

export default function App() {
	const getAudioFiles = async () => {
		const permission = await MediaLibrary.requestPermissionsAsync();
		if (permission.granted) {
			await MediaLibrary.getAssetsAsync({ mediaType: "audio" })
				.then(media => {
					// const Urls = media.assets.map(song => {});
					RNMusicMetadata.getMetadata([
						"file:///storage/emulated/0/Music/YMCA.mp3",
					])
						.then(tracks => {
							console.log(tracks);
							tracks.forEach(track => {
								console.log(
									`${track.title} by ${track.artist}`
								);
							});
						})
						.catch(err => {
							console.error(err);
						});
					console.log(media);
				})
				.catch(err => console.log(err));
		}
	};

	useEffect(() => {
		getAudioFiles();
	});
	return (
		<View style={styles.container}>
			<Text>Open up App.js to start working on your arp!</Text>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

// import React from "react";
// import MainStackNavigator from "./navigation/AppNavigator";
// import { Provider as StoreProvider } from "react-redux";
// import store from "./redux/store";

// const App = () => {
// 	return (
// 		<StoreProvider store={store}>
// 			<MainStackNavigator />
// 		</StoreProvider>
// 	);
// };

// export default App;
