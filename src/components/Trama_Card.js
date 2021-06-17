import React from "react";
import { StyleSheet, Text, View } from "react-native";
import theme from "../theme/theme";

const TramaCard = (props) => {
  return (
    <View style={styles.card}>
      {props.animeInfo.map((info) =>
        info.tag != null ? (
          <View key={info.tag} style={styles.tagContainer}>
            <Text style={styles.tag}>{info.tag}</Text>
          </View>
        ) : info.trama != null ? (
          <Text key={info.trama} style={styles.trama}>
            {info.trama.replace("Mostra altro", "").replace("\n", "")}
          </Text>
        ) : null
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: theme.SPACING,
    width: theme.width * 0.75,
    backgroundColor: theme.DARK_COLOR,
    borderRadius: theme.BORDER_RADIUS,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  tagContainer: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.LIGHT_COLOR,
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 10,
    borderRadius: theme.BORDER_RADIUS,
  },
  tag: {
    fontSize: theme.FONT_SIZE_TINY,
    color: theme.DARK_COLOR,
  },
  trama: {
    padding: theme.SPACING,
    color: theme.LIGHT_COLOR,
    textAlign: "justify",
    fontWeight: theme.FONT_WEIGHT,
  },
});

export default TramaCard;
