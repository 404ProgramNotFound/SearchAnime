import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableWithoutFeedback,
  ImageBackground,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import theme from "../theme/theme";
import InfoCard from "../components/Info_Card";
import TramaCard from "../components/Trama_Card";
import EpisodeCard from "../components/Episode_Card";

import { getAnimeInfo } from "../services/api/AnimeSaturn";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native";

const AnimeScreen = ({ navigation, route }) => {
  const { anime } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [animeInfoResult, setAnimeInfoResult] = useState(null);

  useEffect(() => {
    getAnimeInfo(anime.link, function (res) {
      setAnimeInfoResult(res);
      setIsLoading(false);
    });
  }, []);

  function handleResults() {
    if (isLoading) {
      return (
        <View style={styles.indicator}>
          <ActivityIndicator size={80} color={theme.TEXT_COLOR} />
        </View>
      );
    }
    return (
      <ScrollView
        style={{
          flex: 1,
          paddingTop: theme.SPACING,
        }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <InfoCard animeInfo={animeInfoResult}></InfoCard>
        <TramaCard animeInfo={animeInfoResult}></TramaCard>
        <EpisodeCard animeInfo={animeInfoResult}></EpisodeCard>
        <View style={{ height: 200 }}></View>
      </ScrollView>
    );
  }

  return (
    <ImageBackground
      style={styles.imgBackground}
      resizeMode="cover"
      source={{
        uri: anime.locandina,
      }}
      blurRadius={0.4}
    >
      <LinearGradient
        colors={["transparent", "#000000"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        locations={[0, 0.75]}
        style={styles.lineralGradient}
      />
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-left"
            type="font-awesome-5"
            color={"#ffffff"}
            size={theme.FONT_SIZE_BIG - 15}
            style={styles.button}
          ></Icon>
        </TouchableWithoutFeedback>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {anime.title}
        </Text>
        {handleResults()}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imgBackground: {
    flex: 1,
  },
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  button: {
    width: 50,
    height: 50,
    margin: theme.SPACING,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: theme.FONT_SIZE_BIG,
    fontWeight: theme.FONT_WEIGHT,
    color: "#ffffff",
    paddingHorizontal: theme.SPACING + 10,
  },
  lineralGradient: {
    flex: 1,
  },
  indicator: {
    top: theme.height * 0.5 - 40,
    left: theme.width * 0.5 - 40,
    position: "absolute",
  },
});

export default AnimeScreen;
