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

//Local imports
import SignUp from "./screens/SignUp";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import LogIn from "./screens/LogIn";
import StockDetail from "./screens/StockDetail";
import { AuthContext } from "./contexts/AuthContext";

const Stack = createStackNavigator();
// const isLoggedIn = true;

export default function App() {
  // const [isLoading, setIsLoading] = useState(true);
  // const [userToken, setUserToken] = useState(null);

  const scheme = useColorScheme();

  //<Global states and reducer>
  const initialLoginState = {
    isLoading: true,
    userEmail: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userEmail: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userEmail: null,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          userEmail: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  //<Global states and reducer/>

  const authContext = useMemo(
    () => ({
      logIn: async (userEmail, password) => {
        // setUserToken("token");
        // setIsLoading(false);
        let userToken;
        userToken = null;
        if (userEmail == 2 && password == 2) {
          try {
            userToken = "token";
            await AsyncStorage.setItem("userToken", userToken);
          } catch (e) {
            alert(e);
          }
        }
        dispatch({ type: "LOGIN", id: userEmail, token: userToken });
      },
      logOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (e) {
          alert(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: async () => {
        // setUserToken("token");
        // setIsLoading(false);
        let userToken;
        userToken = null;

        try {
          userToken = "token";
          await AsyncStorage.setItem("userToken", userToken);
        } catch (e) {
          alert(e);
        }

        dispatch({ type: "REGISTER", id: userEmail, token: userToken });
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        alert(e);
      }
      dispatch({ type: "RETRIEVE_TOKEN", token: "token" });
    }, 2000);
  }, []);

  // While it verifies the userToken the spinner is shown
  if (loginState.isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
        {/* If logged in the bottom tab navigator is shown */}
        {loginState.userToken !== null ? (
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
