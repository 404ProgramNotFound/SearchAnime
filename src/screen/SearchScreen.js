import React, { useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import Carousel from "../components/Carousel_Card";
import Search_Bar from "../components/Search_Bar";
import theme from "../theme/theme";

function SearchScreen({ navigation }) {
  const [anime, setAnime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //function for handle
  handleSearch = () => {
    if (isLoading) {
      return (
        <ActivityIndicator
          size="large"
          color={theme.TEXT_COLOR}
          style={styles.text}
        />
      );
    }
    return anime != null ? (
      Object.keys(anime).length > 2 ? (
        <Carousel anime={anime} navigation={navigation}></Carousel>
      ) : (
        <Text style={styles.text}>no result</Text>
      )
    ) : null;
  };

  return (
    <View style={styles.container}>
      <Search_Bar
        anime={(animeObj) => setAnime(animeObj)}
        isLoading={(loading) => setIsLoading(loading)}
      />
      {handleSearch()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.BACKGROUND_COLOR,
    alignItems: "center",
  },
  text: {
    top: theme.height * 0.4,
    color: "#ffff",
    fontSize: theme.FONT_SIZE,
    fontWeight: theme.FONT_WEIGHT,
  },
});

export default SearchScreen;
