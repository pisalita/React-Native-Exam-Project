import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import ChatStackNavigator from "./ChatStackNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Chat" component={ChatStackNavigator} />
      <Tab.Screen name="Posts" component={ChatStackNavigator} />
      <Tab.Screen name="Home" component={ChatStackNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
