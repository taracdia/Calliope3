import React from "react";
import { View, Text } from "react-native";
import ScreenChanger from "../components/ScreenChanger";
import { Styles, Theme } from "../Styles";

const About = () => {
	const primary = Theme().primary;
	return (
		<View>
			<Text style={primary}>Icons from Icons8</Text>
			<ScreenChanger />
		</View>
	);
};

export default About;
