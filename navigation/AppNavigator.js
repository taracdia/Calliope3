import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SingleSong from "../screens/SingleSongScreen";
import SongList from "../screens/SongListScreen";
import ThemeChoose from "../screens/ThemeChooseScreen";
import About from "../screens/AboutScreen";
import ColorPicker from "../screens/ColorPickerScreen";

const Stack = createStackNavigator();

function MainStackNavigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Song Details" component={SingleSong} />
				<Stack.Screen name="List" component={SongList} />
				<Stack.Screen name="Theme" component={ThemeChoose} />
				<Stack.Screen name="About" component={About} />
				<Stack.Screen name="Color Picker" component={ColorPicker} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default MainStackNavigator;
