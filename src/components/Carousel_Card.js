import React from "react";
import { Animated, StyleSheet, View } from "react-native";
import theme from "../theme/theme";
import AnimeCard from "./Anime_Card";

const Carousel = (props) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        decelerationRate={"fast"}
        data={props.anime}
        keyExtractor={(item) => item.key}
        horizontal
        contentContainerStyle={{
          alignItems: "center",
        }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        snapToInterval={theme.CARD_DIMENSION.width + theme.SPACING * 2}
        renderItem={({ item, index }) => {
          if (!item.title) {
            return <View style={styles.dummy} />;
          }
          const inputRange = [
            (index - 2) * (theme.CARD_DIMENSION.width + theme.SPACING * 2),
            (index - 1) * (theme.CARD_DIMENSION.width + theme.SPACING * 2),
            index * (theme.CARD_DIMENSION.width + theme.SPACING * 2),
          ];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -50, 0],
          });
          return (
            <AnimeCard
              anime={item}
              navigation={props.navigation}
              translateY={translateY}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: theme.height * 0.5,
    top: theme.height * 0.3,
  },
  dummy: {
    width: (theme.width - theme.CARD_DIMENSION.width - theme.SPACING * 2) / 2,
  },
});

export default Carousel;
