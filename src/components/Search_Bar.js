import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import { search } from "../services/api/AnimeSaturn";
import theme from "../theme/theme";

const Search_Bar = (props) => {
  const [SearchQuery, setSearchQuery] = useState("");
  const [anime, setAnime] = useState("");

  const animationVal = useRef(new Animated.Value(0)).current;

  const onSearch = () => {
    Keyboard.dismiss();
    if (SearchQuery != "" && SearchQuery != anime) {
      props.isLoading(true);
      setAnime(SearchQuery);
      Animated.spring(animationVal, {
        toValue: theme.height * 0.2 - theme.height * 0.5 - 50,
        useNativeDriver: true,
      }).start();
    }
  };

  useEffect(() => {
    anime != ""
      ? search(anime, function (res) {
          props.anime(res);
          props.isLoading(false);
        })
      : null;
  }, [anime]);

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: animationVal }] }]}
    >
      <TextInput
        style={styles.search}
        onChangeText={setSearchQuery}
        placeholder="Anime"
        onSubmitEditing={onSearch}
      />
      <TouchableOpacity style={styles.button} onPress={onSearch}>
        <Icon
          name="search"
          type="font-awesome-5"
          color={theme.DARK_COLOR}
          size={theme.FONT_SIZE}
        ></Icon>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Search_Bar;

const styles = StyleSheet.create({
  container: {
    top: theme.height * 0.5 - 25,
    height: 50,
    width: theme.width * 0.7,
    display: "flex",
    flexDirection: "row",
    borderRadius: 25,
    overflow: "hidden",
  },
  search: {
    backgroundColor: theme.DARK_COLOR,
    paddingHorizontal: theme.SPACING,
    height: "100%",
    width: "100%",
    flexShrink: 1,
    color: theme.TEXT_COLOR,
    fontSize: theme.FONT_SIZE,
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: theme.MAIN_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
});
