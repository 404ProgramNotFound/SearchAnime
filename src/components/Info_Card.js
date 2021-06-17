import React from "react";
import { StyleSheet, Text, View } from "react-native";
import theme from "../theme/theme";

const InfoCard = (props) => {
  return (
    <View style={styles.card}>
      {props.animeInfo.map((info) =>
        info.info != null ? (
          <Text
            key={info.info[0]}
            style={styles.info}
          >{`${info.info[0]} : ${info.info[1]}`}</Text>
        ) : null
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: theme.SPACING,
    width: theme.width * 0.75,
    height: 250,
    backgroundColor: theme.DARK_COLOR,
    borderRadius: theme.BORDER_RADIUS,
    display: "flex",
    justifyContent: "space-evenly",
  },
  info: {
    paddingHorizontal: theme.SPACING,
    color: theme.LIGHT_COLOR,
    fontSize: theme.FONT_SIZE_TINY - 2,
    fontWeight: theme.FONT_WEIGHT,
  },
});

export default InfoCard;
