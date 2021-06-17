import React from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { SharedElement } from "react-navigation-shared-element";

import theme from "../theme/theme";

const AnimeCard = (props) => {
  const navigation = props.navigation;

  let translateY = props.translateY;
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.push("Anime", { anime: props.anime })}
    >
      <Animated.View
        style={[styles.cardContainer, { transform: [{ translateY }] }]}
      >
        <Image
          source={{
            uri: props.anime.locandina,
          }}
          resizeMode="cover"
          style={styles.card}
        />

        <LinearGradient
          colors={["transparent", "#000000"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          locations={[0.2, 0.75]}
          style={styles.lineralGradient}
        />
        <SharedElement id={`item.${props.anime.title}.title`}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {props.anime.title}
          </Text>
        </SharedElement>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  lineralGradient: {
    width: theme.CARD_DIMENSION.width,
    height: theme.CARD_DIMENSION.height,
    position: "absolute",
  },
  cardContainer: {
    width: theme.CARD_DIMENSION.width,
    height: theme.CARD_DIMENSION.height,
    borderRadius: theme.BORDER_RADIUS,
    overflow: "hidden",
    marginHorizontal: theme.SPACING,
  },
  card: {
    width: theme.CARD_DIMENSION.width,
    height: theme.CARD_DIMENSION.height,
  },
  title: {
    fontSize: theme.FONT_SIZE_TINY,
    fontWeight: "bold",
    color: "#FFFFFF",
    position: "absolute",
    bottom: 0,
    padding: theme.SPACING,
  },
});

export default AnimeCard;
