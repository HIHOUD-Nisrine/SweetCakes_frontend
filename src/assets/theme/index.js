export const COLORS = {
    purple: {
        primary: "#AB7CF7",
        hover: "#C59BF9"
    },
    red: {
        primary: "#F84267",
        hover: "#FE0135",
    },
    lightPurple:"#E4D8F3",
    gray: "#9F9F9F",
    white: "#ffff",
    inputFocus: "#DFD4F24c",
}

export const FONTS = {
    bigTitle: { fontSize: 25, fontWeight: "bold" },
    mediumTitle: { fontSize: 16, fontWeight: "bold" },
    smallTitle: { fontSize: 13, fontWeight: "100" },
    btnText: { fontSize: 18, fontWeight: "300" },
    label: { fontSize: 15, fontWeight: "500", color: COLORS.gray },
    input: { fontSize: 15, fontWeight: "500" },
    desc: { fontWeight: "lighter", fontSize: 10, color: COLORS.gray },
}

const theme = { COLORS, FONTS }
export default theme;