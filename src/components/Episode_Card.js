import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { episode } from "../services/api/AnimeSaturn";
import theme from "../theme/theme";

//testing only
import { useNavigation } from "@react-navigation/native";

const EpisodeCard = (props) => {
  const navigation = useNavigation();

  const openEpisode = (link) => {
    episode(link, (res) => {
      navigation.navigate("MediaPlayer", { mp4: res[1], episode: res[0] });
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
