import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import ChatStackNavigator from "./ChatStackNavigator";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  // useEffect that populates the SecureStorage data

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={ChatStackNavigator} />
      <Tab.Screen name="Posts" component={ChatStackNavigator} />
      <Tab.Screen name="Chat" component={ChatStackNavigator} />
      <Tab.Screen name="Test" component={ChatStackNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
