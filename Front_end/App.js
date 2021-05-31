import React, { useState, useEffect, useMemo, useReducer } from "react";
import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  Button,
  ActivityIndicator,
} from "react-native";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtdecode from "jwt-decode";

//Local imports
import SignUp from "./screens/SignUp";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import LogIn from "./screens/LogIn";
import StockDetail from "./screens/StockDetail";
import { AuthContext } from "./contexts/AuthContext";

const Stack = createStackNavigator();
// const isLoggedIn = true;

const loginReducer = (prevState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.user, isLoading: false };
    case "LOGOUT":
      return { user: null, isLoading: false };
    case "SET_LOADING":
      return { ...prevState, isLoading: action.isLoading };
  }
};

export default function App() {
  // const [isLoading, setIsLoading] = useState(true);
  // const [userToken, setUserToken] = useState(null);

  const scheme = useColorScheme();

  //<Global states and reducer>
  const initialLoginState = {
    isLoading: true,
    user: null,
  };

  const [{ isLoading, user }, dispatch] = useReducer(
    loginReducer,
    initialLoginState
  );

  //<Global states and reducer/>

  const authContext = useMemo(
    () => ({
      logIn: async token => {
        try {
          await AsyncStorage.setItem("accessToken", token);
        } catch (err) {
          alert(err);
        }
        const { userId, email } = jwtdecode(token);
        dispatch({ type: "LOGIN", user: { id: userId, email, token } });
      },
      logOut: async () => {
        try {
          await AsyncStorage.removeItem("accessToken");
        } catch (err) {
          alert(err);
        }
        dispatch({ type: "LOGOUT" });
      },
    }),
    []
  );

  useEffect(() => {
    async function retrieveToken() {
      try {
        let token = await AsyncStorage.getItem("accessToken");
        const { userId, email } = jwtdecode(token);
        dispatch({ type: "LOGIN", user: { id: userId, email, token } });
      } catch (err) {
        // alert(err);
        // console.log("HERE");
      } finally {
        // console.log("FINALLY");
        dispatch({ type: "SET_LOADING", isLoading: false });
      }
    }
    retrieveToken();
  }, []);

  // While it verifies the userToken the spinner is shown
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        ...authContext,
        user,
      }}
    >
      <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
        {/* If logged in the bottom tab navigator is shown */}
        {user ? (
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
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(40, 44, 52)",
    alignItems: "center",
    justifyContent: "center",
  },
});
