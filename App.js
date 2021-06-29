import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import theme from "./src/theme/theme";
import SearchScreen from "./src/screen/SearchScreen";
import AnimeScreen from "./src/screen/AnimeScreen";
import MediaPlayer from "./src/screen/MediaPlayer";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Search"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Anime" component={AnimeScreen} />
          <Stack.Screen name="MediaPlayer" component={MediaPlayer} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.BACKGROUND_COLOR,
  },
});
