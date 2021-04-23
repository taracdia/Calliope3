export const CHANGE_PRIMARY = "CHANGE_PRIMARY";

const initialState = {
	//THEME HERE TODO
	//primary
	//background
	primary: "black",
};

const ThemeReducer = (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_PRIMARY:
			return { ...state, primary: action.payload };
		default:
			return state;
	}
};

export default ThemeReducer;
