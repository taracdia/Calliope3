import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ScreenChanger from "../components/ScreenChanger";
import { CHANGE_PRIMARY } from "../redux/Theme";
import { Styles, Theme } from "../Styles";

const ThemeChoose = () => {
	const primary = Theme().primary;
	const navigation = useNavigation();
	return (
		<View style={{ flex: 1 }}>
			<TouchableOpacity
				onPress={() =>
					navigation.push("Color Picker", {
						action: CHANGE_PRIMARY,
						whatChanges: "primary",
					})
				}
			>
				<Text style={primary}>Primary</Text>
			</TouchableOpacity>
			{/* <TouchableOpacity onPress={() => changePrimary("red")}>
				<Text style={primary}>Background</Text>
			</TouchableOpacity> */}
			<ScreenChanger />
		</View>
	);
};

export default ThemeChoose;
