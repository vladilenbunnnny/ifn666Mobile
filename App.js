import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, useColorScheme, Button } from "react-native";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Local imports
import HomeScreen from "./navigation/Home";
import SignIn from "./screens/SignIn";

const Stack = createStackNavigator();

export default function App() {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#009381",
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Navigator>
      {/* <StatusBar style="auto" /> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
