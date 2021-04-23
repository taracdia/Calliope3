import React, { useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { TriangleColorPicker, fromHsv } from "react-native-color-picker";
import { useNavigation } from "@react-navigation/native";

const ColorPicker = ({ route }) => {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	//TODO: make the oldColor actually be the previously set color
	//TODO: popup instead of screen?

	const changeColor = color => {
		dispatch({ type: route.params.action, payload: color });
		navigation.pop();
	};

	const oldColor = useSelector(state => state)[route.params.whatChanges];

	const [newColor, setNewColor] = useState(oldColor);

	return (
		<View style={{ flex: 1 }}>
			<TriangleColorPicker
				onColorSelected={color => changeColor(fromHsv(color))}
				onColorChange={color => setNewColor(fromHsv(color))}
				oldColor={oldColor}
				style={{ flex: 1 }}
			/>
			<TouchableOpacity
				style={{
					backgroundColor: newColor,
					flex: 1,
					borderColor: "blue",
					borderWidth: 1,
				}}
				onPress={() => changeColor(newColor)}
			>
				<Text style={{ backgroundColor: "white" }}>SELECT</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ColorPicker;
