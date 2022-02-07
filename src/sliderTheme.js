import { createTheme } from "@material-ui/core/styles";

export const muiTheme = createTheme({
    overrides: {
        MuiSlider: {
            thumb: {
                color: "#0097ff",
            },
            track: {
                color: "#0097ff",
            },
            rail: {
                color: "black",
            },
        },
    },
});
