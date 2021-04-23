import { StyleSheet } from "react-native";

import { useSelector } from "react-redux";

export const Styles = StyleSheet.create({
	flex: {
		flex: 1,
	},
	center: {
		alignSelf: "center",
		justifyContent: "center",
		alignItems: "center",
	},
	albumImage: {
		width: 250,
		height: 250,
	},
	bigBold: {
		fontSize: 16,
		fontWeight: "bold",
	},
	artist: {
		fontSize: 14,
	},
	row: {
		flexDirection: "row",
	},
});

export const Theme = () => {
	const primary = useSelector(state => state).primary;
	return StyleSheet.create({
		primary: {
			color: primary,
		},
	});
};
