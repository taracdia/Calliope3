import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Styles, Theme } from "../Styles";

const ScreenChanger = () => {
	const navigation = useNavigation();
	const primary = Theme().primary;
	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "space-between",
			}}
		>
			<TouchableOpacity
				onPress={() => navigation.navigate("Song Details")}
			>
				<Text style={primary}>Song Details</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate("List")}>
				<Text style={primary}>List</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate("Theme")}>
				<Text style={primary}>Theme</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate("About")}>
				<Text style={primary}>About</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ScreenChanger;
