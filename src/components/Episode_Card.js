import React, { useEffect, useState } from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { episode } from "../services/api/AnimeSaturn";
import theme from "../theme/theme";

const EpisodeCard = (props) => {
  const openEpisode = (link) => {
    episode(link, (res) => {
      Linking.openURL(res);
    });
  };

  return (
    <View style={styles.card}>
      {props.animeInfo.map((info) =>
        info.episode != null ? (
          <TouchableWithoutFeedback
            key={info.episode[0]}
            onPress={() => openEpisode(info.episode[1])}
          >
            <View style={styles.episodeContainer}>
              <Text style={styles.episode}>{info.episode[0]}</Text>
            </View>
          </TouchableWithoutFeedback>
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
    paddingBottom: 20,
    paddingTop: 10,
  },
  episodeContainer: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.LIGHT_COLOR,
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 10,
    borderRadius: theme.BORDER_RADIUS,
  },
  episode: {
    fontSize: theme.FONT_SIZE_TINY,
    color: theme.DARK_COLOR,
    fontWeight: theme.FONT_WEIGHT,
  },
});

export default EpisodeCard;
