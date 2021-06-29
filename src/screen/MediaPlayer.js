import React, { useEffect, useState } from "react";
import {
  Linking,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";

import theme from "../theme/theme";
import { Icon } from "react-native-elements/dist/icons/Icon";

const useScreenDimensions = () => {
  const [screenData, setScreenData] = useState(Dimensions.get("screen"));

  useEffect(() => {
    const onChange = (result) => {
      setScreenData(result.screen);
    };

    Dimensions.addEventListener("change", onChange);

    return () => Dimensions.removeEventListener("change", onChange);
  });

  return {
    ...screenData,
    isLandscape: screenData.width > screenData.height,
  };
};
const MediaPlayer = ({ navigation, route }) => {
  const screenData = useScreenDimensions();
  const { mp4, episode } = route.params;

  useEffect(() => {
    ScreenOrientation.unlockAsync();
  }, []);
  function goBack() {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    navigation.goBack();
  }
  function handleError() {
    Linking.openURL(episode);
  }
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => goBack()}>
        <Icon
          name="arrow-left"
          type="font-awesome-5"
          color={"#ffffff"}
          size={theme.FONT_SIZE_BIG - 15}
          style={styles.button}
        ></Icon>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => handleError()}>
        <Icon
          name="globe-europe"
          type="font-awesome-5"
          color={"#ffffff"}
          size={theme.FONT_SIZE_BIG - 15}
          style={styles.internet}
        ></Icon>
      </TouchableWithoutFeedback>
      <Video
        style={[
          styles.video,
          {
            top: screenData.height * 0.5 - 150,
            width: screenData.isLandscape
              ? screenData.width * 0.5
              : screenData.width,
            left: screenData.isLandscape ? screenData.width * 0.23 : 0,
          },
        ]}
        source={{
          uri: mp4,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onError={() => handleError()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.BACKGROUND_COLOR,
    flexDirection: "row",
  },
  video: {
    height: 300,
    position: "absolute",
  },
  button: {
    width: 50,
    height: 50,
    margin: theme.SPACING,
    justifyContent: "center",
    alignItems: "center",
  },
  internet: {
    width: 50,
    height: 50,
    margin: theme.SPACING,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: theme.FONT_SIZE_TINY,
    fontWeight: theme.FONT_WEIGHT,
    color: theme.TEXT_COLOR,
  },
});

export default MediaPlayer;
