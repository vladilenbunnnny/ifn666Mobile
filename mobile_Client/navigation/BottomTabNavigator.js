import * as React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Local imports

import Stocks from "../screens/Stocks";
import WatchList from "../screens/WatchList";
import Profile from "../screens/Profile";
import { scaleSize } from "../constants/Layout";

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "rgb(0, 147, 129)",
        inactiveTintColor: "rgb(172, 179, 173)",
        style: { backgroundColor: "#1B1D22" },
        labelStyle: { fontSize: scaleSize(15) },
        labelPosition: "beside-icon",
      }}
    >
      <Tab.Screen
        name="Stocks"
        component={Stocks}
        options={{
          tabBarLabel: "Stocks",
          tabBarIcon: ({ color = "black" }) => (
            <MaterialCommunityIcons
              name="chart-areaspline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Watchlist"
        component={WatchList}
        options={{
          tabBarLabel: "Watch List",
          tabBarIcon: ({ color = "black" }) => (
            <MaterialCommunityIcons
              name="star-box-multiple"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color = "black" }) => (
            <MaterialCommunityIcons
              name="account-box-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
