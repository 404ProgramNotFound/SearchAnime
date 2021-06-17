import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default {
  width,
  height,
  MAIN_COLOR: "#30a9d1",
  DARK_COLOR: "#202833",
  BACKGROUND_COLOR: "#18191a",
  TEXT_COLOR: "#d7fafc",
  FONT_SIZE: 22,
  FONT_SIZE_TINY: 18,
  FONT_SIZE_BIG: 40,
  FONT_WEIGHT: "500",
  RED_COLOR: "#e63946",
  LIGHT_COLOR: "#a1e0ff",
  SPACING: 20,
  CARD_DIMENSION: {
    width: 200,
    height: 300,
  },
  BORDER_RADIUS: 30,
};
