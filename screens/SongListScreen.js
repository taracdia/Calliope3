import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import ScreenChanger from "../components/ScreenChanger";
import songs from "../songs.json";
import { Styles, Theme } from "../Styles";

const SongList = () => {
	const theme = Theme().theme;
	return (
		<View>
			<FlatList
				data={songs}
				keyExtractor={item => item.id.toString()}
				// ItemSeparatorComponent={() => Separator()}
				renderItem={({ item }) => (
					<View style={{ flexDirection: "row" }}>
						<TouchableOpacity>
							<Text style={theme}>{item.title}</Text>
							<Text style={theme}>{item.artist}</Text>
						</TouchableOpacity>
						{/* TODO: add other parts */}
						{/* TODO: set up click on a song and it's new track nowPlaying */}
					</View>
				)}
			/>
			<ScreenChanger />
		</View>
	);
};

export default SongList;
