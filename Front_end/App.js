import React from "react";
import { StyleSheet, Text, View, useColorScheme, Button } from "react-native";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Local imports
import SignUp from "./screens/SignUp";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import LogIn from "./screens/LogIn";
import StockDetail from "./screens/StockDetail";

const Stack = createStackNavigator();
const isLoggedIn = false;

export default function App() {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
      {/* If logged in the bottom tab navigator is shown */}
      {isLoggedIn ? (
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#009381",
            },
          }}
        >
          <Stack.Screen name="Stocks Mobile" component={BottomTabNavigator} />
          <Stack.Screen name="Stock Detail" component={StockDetail} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#009381",
            },
          }}
        >
          <Stack.Screen name="Log In" component={LogIn} />
          <Stack.Screen name="Sign Up" component={SignUp} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
});
